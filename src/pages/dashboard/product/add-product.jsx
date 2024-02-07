import NoImageV from "@/assets/images/No_Image_Vertikal.png";
import { getSessionStorage } from "@/configs/asyncStorage";
import { countTax, getCurrentRole, handleCombo } from "@/configs/utils";
import LoadingContext from "@/context/utils"; // import loading
import { CATEGORYLIST, TYPELIST } from "@/data/combo";
import { axiosGet, axiosPost } from "@/services";
import { URL_CONSTANT } from "@/services/constant";
import InputCurrency from "@/widgets/input-currency";
import {
  faEdit,
  faPlusSquare,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Switch,
  Typography,
} from "@material-tailwind/react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { styled } from "@mui/material/styles";
import _ from "lodash";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AddProduct = () => {
  const [login_data, setLoginData] = useState(
    JSON.parse(getSessionStorage("login_data")) || {}
  );
  const [fileName, setFileName] = useState({
    file1: "",
    file2: "",
    file3: "",
    file4: "",
    file5: "",
  });
  const [fileShow, setFileShow] = useState({
    file1: null,
    file2: null,
    file3: null,
    file4: null,
    file5: null,
  });
  const { t, i18n } = useTranslation();
  const loading = useContext(LoadingContext); // get state & function loading
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState(null);
  const [valid, setValid] = useState({
    name: true,
    category: true,
    type: true,
    title: true,
    stock: true,
    sku: true,
    description: true,
    hpp: true,
    sellingPrice: true,
    tax: true,
    price: true,
  });
  const [invalidMsg, setInvalidMsg] = useState({
    name: "",
    category: "",
    type: "",
    title: "",
    stock: "",
    sku: "",
    description: "",
    hpp: "",
    sellingPrice: "",
    tax: "",
    price: "",
  });
  const [category, setCategory] = useState("");
  const [tipe, settipe] = useState("");
  const [categoryList, setCategoryList] = useState([...CATEGORYLIST]);
  const [tipeList, setTipeList] = useState([...TYPELIST]);

  const getCategory = async (name = "") => {
    try {
      loading.setLoading(true);
      let query = {};
      query["name"] = name;
      let response = await axiosGet(
        `${URL_CONSTANT.category.combo[getCurrentRole()]}`,
        query
      );
      console.log(response.data);
      setCategoryList(_.map(response.data, handleCombo));
    } catch (error) {
    } finally {
      loading.setLoading(false);
    }
  };

  const changeData = (val, key) => {
    let tempData = { ...data };
    _.set(tempData, key, val);
    setData(tempData);
  };

  const saveData = async () => {
    if (!validate()) return;
    let stock = parseInt(formatCurrencyText(_.get(data, "stock")));
    let buyingPrice = parseInt(formatCurrencyText(_.get(data, "hpp")));
    let sellingPrice = parseInt(
      formatCurrencyText(_.get(data, "sellingPrice"))
    );
    let tax = _.get(data, "tax");
    let newData = {
      ...data,
      categoryId: data.category,
      productType: data.type,
      companyId: login_data.companyId,
      merchantId: login_data.companyId,
      sellingPrice,
      stock,
      buyingPrice,
      tax,
    };
    let formdata = new FormData();
    const json = JSON.stringify(newData);
    const blob = new Blob([json], {
      type: "application/json",
    });
    formdata.append("data", blob);
    _.values(fileName).map((item) => item && formdata.append("files", item));
    try {
      loading.setLoading(true);
      let response = await axiosPost(
        `${URL_CONSTANT.product.all[getCurrentRole()]}`,
        formdata
      );
      navigate("/dashboard/product", { replace: true });
    } catch (error) {
    } finally {
      loading.setLoading(false);
    }
  };

  const validate = () => {
    let validTemp = {
      name: true,
      category: true,
      type: true,
      stock: true,
      sku: true,
      description: true,
      hpp: true,
      sellingPrice: true,
      tax: true,
      price: true,
    };
    let invalidMsgTemp = {
      name: "",
      category: "",
      type: "",
      stock: "",
      sku: "",
      description: "",
      hpp: "",
      sellingPrice: "",
      tax: "",
      price: "",
    };
    let ignore = ["description"];
    let arr = _.reject(_.keys(validTemp), (el) => ignore.includes(el));
    _.map(arr, (item) => {
      if (!_.get(data, item)) {
        invalidMsgTemp[item] = `${t(item)} ${t("required")}`;
        validTemp[item] = false;
      }
    });
    setInvalidMsg(invalidMsgTemp);
    setValid(validTemp);
    return _.reduce(_.values(validTemp), (a, b) => a && b, true);
  };

  const changeFile = async (file, key) => {
    let fileReady = file.target.files[0];
    if (fileReady.size > 1000000) return toast.error(t("File To Large"));
    try {
      setFileShow({
        ...fileShow,
        [key]: URL.createObjectURL(file.target.files[0]),
      });

      setFileName({
        ...fileName,
        [key]: file.target.files[0],
      });
    } catch (error) {}
  };

  useEffect(() => {
    changeData(countTax(data?.tax, data?.sellingPrice), "price");
  }, [data?.sellingPrice, data?.tax]);

  useEffect(() => {
    const ascynFx = async () => {
      await getCategory();
    };

    ascynFx();
  }, []);

  return (
    <>
      <Card className="mt-12 ">
        <CardBody className="">
          <div className="flex flex-row justify-between">
            <div>
              <Typography variant="h5">{t("product")}</Typography>{" "}
              <span>{t("addProduct")}</span>
            </div>
          </div>
          <Typography variant="h5" className="mt-4">
            {t("generalInformation")}
          </Typography>
          <div className=" flex w-full flex-row flex-wrap bg-white">
            <div className=" flex w-1/2 flex-col px-2 py-2 ">
              <h3 className=" text-base font-semibold">
                {t("productCategory")}
              </h3>
              <FormControl
                size="small"
                error={!valid["category"] && !_.get(data, "category")}
              >
                <Select
                  onChange={(e) => {
                    changeData(e.target.value, "category");
                  }}
                  value={data?.category}
                >
                  {categoryList.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className=" flex w-1/2 flex-col px-2 py-2 ">
              <h3 className=" text-base font-semibold">{t("productType")}</h3>
              <FormControl
                size="small"
                error={!valid["type"] && !_.get(data, "type")}
              >
                <Select
                  onChange={(e) => {
                    changeData(e.target.value, "type");
                  }}
                  value={data?.type}
                >
                  {tipeList.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className=" flex w-1/2 flex-col px-2 py-2">
              <h3 className=" text-base font-semibold">{t("productName")}</h3>
              <Input
                color="blue"
                type="text"
                size="lg"
                className="w-full"
                onChange={(e) => {
                  changeData(e.target.value, "name");
                }}
                value={data?.name}
                name="column1"
                error={!valid.name && !_.get(data, "name")}
              />
              <Typography className="text-xs text-red-500">
                {!_.get(data, "name") && invalidMsg["name"]}
              </Typography>
            </div>
            <div className=" flex w-1/2 flex-col px-2 py-2">
              <h3 className=" text-base font-semibold">{t("stock")}</h3>
              <InputCurrency
                type="number"
                invalid={!valid.stock && !_.get(data, "stock")}
                value={data?.stock}
                onValueChange={(e) => changeData(e, "stock")}
                error={!valid.stock && !_.get(data, "stock")}
              ></InputCurrency>
              <Typography className="text-xs text-red-500">
                {!_.get(data, "stock") && invalidMsg["stock"]}
              </Typography>
            </div>
            <div className=" flex w-1/2 flex-col px-2 py-2">
              <h3 className=" text-base font-semibold">{t("sku")}</h3>
              <Input
                color="blue"
                type="text"
                size="lg"
                className="w-full"
                onChange={(e) => {
                  changeData(e.target.value, "sku");
                }}
                value={data?.sku}
                name="column1"
                error={!valid.sku && !_.get(data, "sku")}
              />
              <Typography className="text-xs text-red-500">
                {!_.get(data, "sku") && invalidMsg["sku"]}
              </Typography>
            </div>
            <div className=" flex w-1/2 flex-col px-2 py-2">
              <h3 className=" text-base font-semibold">{t("description")}</h3>
              <Input
                color="blue"
                type="text"
                size="lg"
                className="w-full"
                onChange={(e) => {
                  changeData(e.target.value, "description");
                }}
                value={data?.description}
                name="column1"
                error={!valid.description && !_.get(data, "description")}
              />
              <Typography className="text-xs text-red-500">
                {!_.get(data, "description") && invalidMsg["description"]}
              </Typography>
            </div>
          </div>
          <Typography variant="h5">{t("price")}</Typography>

          <div className="mt-4 flex w-full flex-row flex-wrap bg-white">
            <div className=" flex w-1/2 flex-col px-2 py-2">
              <h3 className=" text-base font-semibold">{t("hpp")} </h3>
              <InputCurrency
                invalid={
                  !valid.hpp &&
                  (!_.get(data, "hpp") || parseInt(_.get(data, "hpp")) == 0)
                }
                value={data?.hpp}
                onValueChange={(e) => changeData(e, "hpp")}
              ></InputCurrency>
              <Typography className="text-xs text-red-500">
                {(!_.get(data, "hpp") || parseInt(_.get(data, "hpp")) == 0) &&
                  invalidMsg["hpp"]}
              </Typography>
            </div>
            <div className=" flex w-1/2 flex-col px-2 py-2 ">
              <h3 className=" text-base font-semibold">{t("sellingPrice")}</h3>
              <InputCurrency
                invalid={
                  !valid.sellingPrice &&
                  (!_.get(data, "sellingPrice") ||
                    parseInt(_.get(data, "sellingPrice")) == 0)
                }
                value={data?.sellingPrice}
                onValueChange={(e) => {
                  changeData(e, "sellingPrice");
                }}
              ></InputCurrency>
              <Typography className="text-xs text-red-500">
                {(!_.get(data, "sellingPrice") ||
                  parseInt(_.get(data, "sellingPrice")) == 0) &&
                  invalidMsg["sellingPrice"]}
              </Typography>
            </div>
            <div className=" flex w-1/2 flex-col px-2 py-2">
              <h3 className=" text-base font-semibold">{t("ppn")}</h3>
              <InputCurrency
                invalid={
                  !valid.tax &&
                  (!_.get(data, "tax") || parseInt(_.get(data, "tax")) == 0)
                }
                type="percentage"
                value={data?.tax}
                onValueChange={(e) => {
                  changeData(e, "tax");
                }}
              ></InputCurrency>
              <Typography className="text-xs text-red-500">
                {(!_.get(data, "tax") || parseInt(_.get(data, "tax")) == 0) &&
                  invalidMsg["tax"]}
              </Typography>
              {/* {data?.tax} */}
            </div>
            <div className=" flex w-1/2 flex-col px-2 py-2 ">
              <h3 className=" text-base font-semibold">{t("priceTotal")}</h3>
              <InputCurrency
                disabled
                invalid={
                  !valid.price &&
                  (!_.get(data, "price") || parseInt(_.get(data, "price")) == 0)
                }
                value={data?.price}
                onValueChange={(e) => changeData(e, "price")}
              ></InputCurrency>
              <Typography className="text-xs text-red-500">
                {(!_.get(data, "price") ||
                  parseInt(_.get(data, "price")) == 0) &&
                  invalidMsg["price"]}
              </Typography>
            </div>

            <div className=" flex w-1/2 flex-col px-2 py-2 ">
              <Switch
                color="purple"
                checked={data?.active}
                onChange={() => changeData(!data?.active, "active")}
              />
            </div>
          </div>
          <Typography variant="h5">{t("images")}</Typography>
          <div className="flex flex-row gap-1">
            {_.map(_.toArray("12345"), (item) => (
              <Card
                key={`image-${item}-` + fileName[`file${item}`].fileName}
                className={`group relative flex aspect-square w-1/5 cursor-pointer items-center justify-center overflow-hidden bg-gray-200`}
                onClick={() => {
                  document.getElementById(`file${item}`).click();
                }}
              >
                {!fileShow[`file${item}`] ? (
                  <img className=" w-96" src={NoImageV} alt={"noImage"} />
                ) : (
                  <img
                    className=""
                    src={fileShow[`file${item}`]}
                    alt={fileName[`file${item}`].filename}
                  />
                )}
                <div class="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center bg-black bg-opacity-0 opacity-0 duration-500 group-hover:h-full group-hover:bg-opacity-80 group-hover:opacity-100">
                  {fileShow[`file${item}`] ? (
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="fa-3x text-orange-700"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faPlusSquare}
                      className="fa-3x text-green-700"
                    />
                  )}
                  {fileShow[`file${item}`] && (
                    <FontAwesomeIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        setFileShow({
                          ...fileShow,
                          [`file${item}`]: null,
                        });
                        setFileName({
                          ...fileName,
                          [`file${item}`]: "",
                        });
                      }}
                      icon={faTimesCircle}
                      className="fa-2x absolute top-2 right-2 text-red-500"
                    />
                  )}
                </div>
                <VisuallyHiddenInput
                  id={`file${item}`}
                  type="file"
                  accept=".jpg,.png,.jpeg"
                  onChange={(e) => changeFile(e, `file${item}`)}
                />
              </Card>
            ))}
          </div>
        </CardBody>
        <CardFooter className="flex flex-row-reverse gap-1">
          <Button
            onClick={() => {
              saveData();
            }}
            className=" rounded-3xl"
            size="sm"
            color="purple"
            variant="gradient"
          >
            {t("save")}
          </Button>
          <Button
            onClick={() => navigate("/dashboard/product")}
            className=" rounded-3xl"
            size="sm"
            color="purple"
            variant="outlined"
          >
            {t("back")}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default AddProduct;
