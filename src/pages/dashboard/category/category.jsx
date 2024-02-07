import { columnCategory } from "@/configs";
import { getSessionStorage } from "@/configs/asyncStorage";
import {
  getCurrentRole,
  getLoginData,
  handleSort,
  handleTableData,
} from "@/configs/utils";
import LoadingContext from "@/context/utils"; // import loading
import { axiosDelete, axiosGet, axiosPost, axiosPut } from "@/services";
import { URL_CONSTANT } from "@/services/constant";
import { ModalCategory } from "@/widgets/modal/modal-category";
import ModalDelete from "@/widgets/modal/modal-delete";
import { Pagination } from "@/widgets/table/pagination";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import _ from "lodash";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
const CategoryList = () => {
  const { t, i18n } = useTranslation();
  const loading = useContext(LoadingContext); // get state & function loading
  const column = [...columnCategory];

  const history = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [name, setname] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [companyList, setCompanyList] = useState([]);
  const [merchantId, setMerchantId] = useState("");
  const [merchantList, setMerchantList] = useState([]);
  const [page, setpage] = useState(1);
  const [size, setsize] = useState(10);
  const [sort, setsort] = useState(["name"]);
  const [dir, setdir] = useState(["desc"]);
  const [pages, setpages] = useState(0);
  const [totalElements, settotalElements] = useState(0);

  const [deleteData, setDeleteData] = useState({});
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [detailData, setDetailData] = useState({});
  const [showModalDetail, setShowModalDetail] = useState(false);

  const getCompanyList = async () => {
    try {
      let response = {
        data: {
          content: [
            {
              value: JSON.parse(getSessionStorage("login_data")).companyId,
              label: "Company 1",
            },
          ],
        },
      };
      setCompanyList(response.data.content);
      column[_.findIndex(column, { key: "companyId" })].option =
        response.data.content;
    } catch (error) {}
  };
  const getMerchantList = async () => {
    let query = {};
    query["page"] = page - 1;
    query["size"] = size;
    query["sort"] = handleSort(sort, dir);
    if (name) query["name"] = name;
    try {
      loading.setLoading(true);
      let response = await axiosGet(
        `${URL_CONSTANT.user.all[getCurrentRole()]}`,
        query
      );
      loading.setLoading(false);
      setMerchantList(
        _.map(response.data.content, (item) => ({
          label: item.name,
          value: item.merchantId,
          other: item,
        }))
      );
      column[_.findIndex(column, { key: "merchantId" })].option = _.map(
        response.data.content,
        (item) => ({
          label: item.name,
          value: item.merchantId,
          other: item,
        })
      );
    } catch (error) {
      loading.setLoading(false);
    }
  };

  const getData = async () => {
    let query = {};
    query["page"] = page - 1;
    query["size"] = size;
    query["sort"] = handleSort(sort, dir);
    query["name"] = name;
    query["companyId"] = companyId;
    query["merchantId"] = merchantId;
    try {
      loading.setLoading(true);
      let response = await axiosGet(
        `${URL_CONSTANT.category.all[getCurrentRole()]}`,
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

  const handleDetail = async (data, file) => {
    try {
      let formdata = new FormData();
      formdata.append("file", file);
      const json = JSON.stringify(data);
      const blob = new Blob([json], {
        type: "application/json",
      });
      formdata.append("data", blob);
      loading.setLoading(true);
      if (data.id)
        response = await axiosPut(
          `${URL_CONSTANT.category.all[getCurrentRole()]}/${data.id}`,
          formdata
        );
      else
        var response = await axiosPost(
          `${URL_CONSTANT.category.all[getCurrentRole()]}`,
          formdata
        );
      setDetailData({});
      setShowModalDetail(false);
      getData();
      loading.setLoading(false);
    } catch (error) {
      loading.setLoading(true);
    }
  };

  const handleDelete = async () => {
    try {
      loading.setLoading(true);
      let response = await axiosDelete(
        `${URL_CONSTANT.category.all[getCurrentRole()]}/${deleteData.id}`
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
    getCompanyList();
    getMerchantList();
    const ascynFx = async () => {};

    ascynFx();
  }, []);

  useEffect(() => {
    getData();
  }, [page, size]);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card className="px-2">
        <CardBody className="px-0 pt-0 pb-2">
          <div className="flex flex-row justify-between p-2">
            <div>
              <Typography variant="h5">
                {_.startCase(t("categories"))}
              </Typography>
              <span>{_.startCase(t("categories"))}</span>
            </div>
            <div>
              <Button
                color="purple"
                onClick={() => {
                  let data = {};
                  if (getLoginData("roleType") != "SUPER_ADMIN")
                    data["companyId"] = getLoginData("companyId");
                  else data["companyId"] = "";
                  setDetailData({ ...data });
                  setShowModalDetail(true);
                }}
              >
                {t("add")}
              </Button>
            </div>
          </div>
          <TableContainer className="max-h-[450px]">
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell size="small" align="left">
                    No
                  </TableCell>
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
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={`row-${item.id}`}
                  >
                    <TableCell align="center" width={80}>
                      {(page - 1) * size + index + 1}
                    </TableCell>
                    {column.map((col, indexcol) => (
                      <TableCell align={col.align} key={`row-col-${item.id}`}>
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
                              let data = { ...item };
                              if (getLoginData("roleType") != "SUPER_ADMIN")
                                data["companyId"] = getLoginData("companyId");
                              else data["companyId"] = "";
                              setDetailData(item);
                              setShowModalDetail(true);
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
      <ModalCategory
        key={`${JSON.stringify(detailData)}-${
          JSON.stringify(merchantList).length
        }`}
        showModalDetail={showModalDetail}
        detailData={detailData}
        setDetailData={setDetailData}
        setModalDetail={setShowModalDetail}
        confirmModalDetail={handleDetail}
        merchantList={merchantList}
        companyList={companyList}
      ></ModalCategory>
    </div>
  );
};
export default CategoryList;
