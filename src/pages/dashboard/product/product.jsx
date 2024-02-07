import { columnProduct } from "@/configs";
import { getCurrentRole, handleCombo, handleTableData } from "@/configs/utils";
import LoadingContext from "@/context/utils"; // import loading
import { CATEGORYLIST, PRODUCTSTATUSLIST, TYPELIST } from "@/data/combo";
import { axiosGet } from "@/services";
import { URL_CONSTANT } from "@/services/constant";
import { Pagination } from "@/widgets/table/pagination";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
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
  FormControl,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem as MuiMenuItem,
  InputLabel,
} from "@mui/material";
import _, { isNaN } from "lodash";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

const ProductList = () => {
  const { t, i18n } = useTranslation();
  const loading = useContext(LoadingContext); // get state & function loading
  const column = [...columnProduct];
  const history = useParams();
  const navigate = useNavigate();
  const [first, setfirst] = useState(true);
  const [data, setData] = useState([]);
  const [page, setpage] = useState(1);
  const [size, setsize] = useState(10);
  const [sort, setsort] = useState("name");
  const [dir, setdir] = useState(1);
  const [pages, setpages] = useState(0);
  const [totalElements, settotalElements] = useState(0);
  const [openFilter, setOpenFilter] = useState(false);
  const [title, settitle] = useState("");
  const [sku, setsku] = useState("");
  const [tags, settags] = useState([]);
  const [tipe, settipe] = useState("");
  const [category, setCategory] = useState("");
  const [status, setstatus] = useState("");
  const [categoryList, setCategoryList] = useState([...CATEGORYLIST]);
  const [tipeList, setTipeList] = useState([...TYPELIST]);
  const [statusList, setStatusList] = useState([...PRODUCTSTATUSLIST]);

  const getData = async () => {
    let query = {};
    query["page"] = page - 1;
    query["size"] = size;
    query["sort"] = sort;
    query["dir"] = dir;
    if (title) query["name"] = title;
    if (sku) query["sku"] = sku;
    if (category) query["categoryId"] = category;
    if (status != null || status != undefined) query["active"] = status;
    if (tipe) query["type"] = tipe;
    if (tags) query["tags"] = tags.join(",");

    try {
      loading.setLoading(true);

      let response = await axiosGet(
        `${URL_CONSTANT.product.all[getCurrentRole()]}`,
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

  const getComboCategory = async (name = "") => {
    try {
      loading.setLoading(true);
      let query = {};
      query["name"] = name;
      let response = await axiosGet(
        `${URL_CONSTANT.category.combo[getCurrentRole()]}`,
        query
      );

      setCategoryList(_.map(response.data, handleCombo));
    } catch (error) {
    } finally {
      loading.setLoading(false);
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => getData(size, 1), 1000);
    return () => clearTimeout(timeOutId);
  }, [title, sku]);

  useEffect(() => {
    const ascynFx = async () => {
      await getData();
      setfirst(false);
    };
    getComboCategory();
    ascynFx();
  }, []);

  useEffect(() => {
    if (!first && !isNaN(page)) {
      getData();
    }
  }, [page, size, tags, category, status, tipe]);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card className="px-2">
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div className="flex flex-row justify-between p-2">
            <div>
              <Typography variant="h5">{t("product")}</Typography>
              <span>{t("productManagement")}</span>
            </div>
            <div>
              <Button
                onClick={() => {
                  navigate(`/dashboard/product/new`);
                }}
                color="purple"
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
            <div className="my-1 flex gap-1 py-1">
              <div className=" w-1/4">
                <Input
                  label={t("productName")}
                  value={title}
                  onChange={(e) => settitle(e.target.value)}
                />
              </div>
              <div className=" w-1/4">
                <Input
                  label={t("sku")}
                  value={sku}
                  onChange={(e) => setsku(e.target.value)}
                />
                {/* <TagsInput
                  className="react-tagsinput h-10 w-full rounded-lg border-blue-gray-200 bg-transparent pt-1"
                  focusedClassName="react-tagsinput--focused border-black "
                  tagProps={{
                    className:
                      "react-tagsinput-tag p-1 text-xs rounded-md bg-purple-100 text-purple-500 border-purple-300",
                    placeholder: "Add a tag",
                  }}
                  value={tags}
                  onChange={(e) => settags(e)}
                /> */}
              </div>
              <div className="w-1/4">
                <FormControl size="small" className="w-full">
                  <InputLabel id="productCategory">
                    {t("productCategory")}
                  </InputLabel>
                  <Select
                    labelId="productCategory"
                    label={t("productCategory")}
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                    value={category}
                  >
                    {categoryList.map((item) => (
                      <MuiMenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MuiMenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="w-1/4">
                <FormControl size="small" className="w-full">
                  <InputLabel id="productStatus">
                    {t("productStatus")}
                  </InputLabel>
                  <Select
                    labelId="productStatus"
                    label={t("productStatus")}
                    onChange={(e) => {
                      setstatus(e.target.value);
                    }}
                    value={status}
                  >
                    {statusList.map((item) => (
                      <MuiMenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MuiMenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="w-1/4">
                <FormControl size="small" className="w-full">
                  <InputLabel id="productType">{t("productType")}</InputLabel>
                  <Select
                    labelId="productType"
                    label={t("productType")}
                    onChange={(e) => {
                      settipe(e.target.value);
                    }}
                    value={tipe}
                  >
                    {tipeList.map((item) => (
                      <MuiMenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MuiMenuItem>
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
                  <TableCell size="small" align="left">
                    No
                  </TableCell>
                  {column.map((head, index) => (
                    <TableCell key={`head${index}`} align={head.align}>
                      {t(head.label)}
                    </TableCell>
                  ))}
                  <TableCell align="center">{t("action")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                    <TableCell align="center" width={80}>
                      {(page - 1) * size + index + 1}
                    </TableCell>
                    {column.map((col, indexcol) => (
                      <TableCell key={`row-col-${indexcol}`} align={col.align}>
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
                              navigate(`/dashboard/product/edit/${item?.id}`);
                            }}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                            &nbsp;{t("edit")}
                          </MenuItem>
                          <MenuItem className="text-red-500">
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
    </div>
  );
};
export default ProductList;
