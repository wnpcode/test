import { columnUser } from "@/configs";
import {
  checkPhone,
  getCurrentRole,
  handleSort,
  handleTableData,
} from "@/configs/utils";
import LoadingContext from "@/context/utils"; // import loading
import { roleList, statusList } from "@/data/combo";
import { axiosDelete, axiosGet } from "@/services";
import { URL_CONSTANT } from "@/services/constant";
import ModalDelete from "@/widgets/modal/modal-delete";
import { Pagination } from "@/widgets/table/pagination";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  Collapse,
  IconButton,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import {
  MenuItem as CMenuItem,
  FormControl,
  InputLabel,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import _, { isNull } from "lodash";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
const UserList = () => {
  const { t, i18n } = useTranslation();
  const loading = useContext(LoadingContext); // get state & function loading
  const column = [...columnUser];

  const history = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [page, setpage] = useState(1);
  const [size, setsize] = useState(10);
  const [sort, setsort] = useState(["name", "email"]);
  const [dir, setdir] = useState(["desc", "asc"]);
  const [name, setname] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [active, setactive] = useState("");
  const [roleType, setroleType] = useState("");
  const [pages, setpages] = useState(0);
  const [totalElements, settotalElements] = useState(0);
  const [roles, setRoles] = useState([...roleList]);
  const [status, setStatus] = useState([...statusList]);
  const [openFilter, setOpenFilter] = useState(false);

  const [deleteData, setDeleteData] = useState({});
  const [showModalDelete, setShowModalDelete] = useState(false);

  const getData = async () => {
    let query = {};
    query["page"] = page - 1;
    query["size"] = size;
    query["sort"] = handleSort(sort, dir);
    if (roleType) query["roleType"] = roleType;
    if (name) query["name"] = name;
    if (username) query["username"] = username;
    if (email) query["email"] = email;
    if (phone) query["phone"] = phone;
    if (active !== "") query["active"] = active;
    try {
      loading.setLoading(true);
      let response = await axiosGet(
        `${URL_CONSTANT.user.all[getCurrentRole()]}`,
        query
      );
      loading.setLoading(false);
      setData(response.data.content);
      setpage(response.data.number + 1);
      setsize(response.data.size);
      settotalElements(response.data.totalElements);
      setpages(response.data.totalPages);
    } catch (error) {
      loading.setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      loading.setLoading(true);
      let response = await axiosDelete(
        `${URL_CONSTANT.user.all[getCurrentRole()]}/${deleteData.id}`
      );
      setDeleteData({});
      setShowModalDelete(false);
      getData();
      loading.setLoading(false);
    } catch (error) {
      loading.setLoading(true);
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => getData(size, 1), 1000);
    return () => clearTimeout(timeOutId);
  }, [name, username, phone, email]);

  useEffect(() => {
    getData();
  }, [page, size, roleType, active]);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card className="px-2">
        <CardBody className="px-0 pt-0 pb-2">
          <div className="flex flex-row justify-between p-2">
            <div>
              <Typography variant="h5">
                {_.startCase(t("user management"))}
              </Typography>
              <span>{_.startCase(t("user management"))}</span>
            </div>
            <div>
              <Button
                color="purple"
                onClick={() => {
                  navigate("/dashboard/user/user-management/add");
                }}
              >
                {t("add")}
              </Button>
            </div>
          </div>

          <Button
            onClick={() => setOpenFilter(!openFilter)}
            size="sm"
            color="gray"
            variant="gradient"
            className="mx-1 mb-2"
          >
            {t("filter")}
          </Button>
          <Collapse open={openFilter}>
            <div className="my-1 flex flex-wrap py-1">
              <div className=" w-1/4  px-1">
                <Input
                  label={t("name")}
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
              <div className=" w-1/4  px-1">
                <Input
                  label={t("email")}
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
              <div className=" w-1/4  px-1">
                <Input
                  label={t("phone")}
                  value={phone}
                  onKeyPress={checkPhone}
                  onChange={(e) => setphone(e.target.value)}
                />
              </div>
              <div className=" w-1/4  px-1">
                <FormControl size="small" className="w-full">
                  <InputLabel id="roleType">{t("roleType")}</InputLabel>
                  <Select
                    labelId="roleType"
                    label={t("roleType")}
                    placeholder={t("roleType")}
                    key={roleType}
                    onChange={(e) => {
                      setroleType(e.target.value);
                    }}
                    value={roleType}
                  >
                    <CMenuItem key="" value="">
                      {t("-")}
                    </CMenuItem>
                    {roles.map((item) => (
                      <CMenuItem key={item.value} value={item.value}>
                        {item.label}
                      </CMenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className=" w-1/4  px-1">
                <FormControl size="small" className="w-full">
                  <InputLabel id="status">{t("status")}</InputLabel>
                  <Select
                    labelId="status"
                    label={t("status")}
                    placeholder={t("status")}
                    key={active}
                    onChange={(e) => {
                      setactive(e.target.value);
                    }}
                    value={active}
                  >
                    <CMenuItem key="" value="">
                      {t("-")}
                    </CMenuItem>
                    {status.map((item) => (
                      <CMenuItem key={item.value} value={item.value}>
                        {item.label}
                      </CMenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </Collapse>
          <TableContainer className="max-h-[450px]">
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center">No</TableCell>
                  {column.map((head, index) => (
                    <TableCell key={`head${index}`} align={head.align}>
                      {t(head.label)}
                    </TableCell>
                  ))}
                  <TableCell align="right">{t("action")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                    <TableCell align="center" width={80}>
                      {(page - 1) * size + index + 1}
                    </TableCell>
                    {column.map((col, indexcol) => (
                      <TableCell align={col.align}>
                        {handleTableData(item, col.key, col.type, col.option)}
                      </TableCell>
                    ))}
                    <TableCell align="right" width={80}>
                      <Menu placement="left">
                        <MenuHandler>
                          <IconButton variant="text" color="blue-gray">
                            <EllipsisVerticalIcon className="h-10 w-10 text-blue-gray-500" />
                          </IconButton>
                        </MenuHandler>

                        <MenuList className="min-w-[100px]">
                          <MenuItem
                            className="text-orange-500"
                            onClick={() => {
                              navigate(
                                `/dashboard/user/user-management/edit/${item?.id}`
                              );
                            }}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                            &nbsp;{t("edit")}
                          </MenuItem>
                          <MenuItem
                            className="text-red-500"
                            onClick={() => {
                              setDeleteData(item);
                              setShowModalDelete(true);
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                            &nbsp;<span>{t("delete")}</span>
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            key={`${page}-${size}`}
            page={page}
            size={size}
            pages={pages}
            totalElements={totalElements}
            setpage={setpage}
            setsize={setsize}
          ></Pagination>
        </CardBody>
      </Card>
      <ModalDelete
        showModalDelete={showModalDelete}
        description={deleteData.name}
        setModalDelete={setShowModalDelete}
        confirmModalDelete={handleDelete}
      ></ModalDelete>
    </div>
  );
};
export default UserList;
