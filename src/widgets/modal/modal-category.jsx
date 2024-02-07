import NoImageH from "@/assets/images/No_Image_Horizontal.png";
import {
  faEdit,
  faPlusSquare,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import _ from "lodash";
import { useState } from "react";
import { useTranslation } from "react-i18next";

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

export function ModalCategory({
  showModalDetail,
  detailData = {},
  setModalDetail,
  confirmModalDetail,
  companyList,
  merchantList,
}) {
  const [fileName, setFileName] = useState();
  const [fileShow, setFileShow] = useState(detailData.imageUrl);

  const changeFile = (file) => {
    setFileShow(URL.createObjectURL(file.target.files[0]));
    setFileName(file.target.files[0]);
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { t, i18n } = useTranslation();
  const [data, setData] = useState({
    merchantId: "",
    name: "",
    description: "",
    ...detailData,
  });
  const [valid, setValid] = useState({
    name: true,
    description: true,
    companyId: true,
    merchantId: true,
  });
  const [invalidMsg, setInvalidMsg] = useState({
    name: "",
    description: "",
    companyId: "",
    merchantId: "",
  });

  const resetValidation = () => {
    setValid({
      name: true,
      description: true,
      companyId: true,
      merchantId: true,
    });
    setInvalidMsg({
      name: "",
      description: "",
      companyId: "",
      merchantId: "",
    });
  };

  const changeData = (val, key) => {
    let tempData = { ...data };
    _.set(tempData, key, val);
    setData(tempData);
  };

  const handleSubmit = () => {
    if (!validate()) return;
    confirmModalDetail(data, fileName);
  };

  const validate = () => {
    let validTemp = {
      name: true,
      description: true,
      companyId: true,
      merchantId: true,
    };
    let invalidMsgTemp = {
      name: "",
      description: "",
      companyId: "",
      merchantId: "",
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
  return (
    <>
      <Dialog
        open={showModalDetail}
        onClose={() => {
          setModalDetail(false);
          resetValidation();
        }}
        className="bg-transparent"
        fullScreen={fullScreen}
      >
        <DialogTitle>
          {/* <Typography variant="h4" color="blue-gray"> */}
          {t(detailData?.id ? "editCategory" : "addCategory")}
          {/* </Typography> */}
        </DialogTitle>
        <DialogContent className="flex w-96 flex-col gap-4">
          <div>
            <Typography className="mb-0" variant="h6">
              {t("icon")}
            </Typography>
            <Card
              className={`group relative flex aspect-square w-20 cursor-pointer items-center justify-center overflow-hidden bg-gray-200`}
              onClick={() => {
                document.getElementById(`file-upload`).click();
              }}
            >
              {fileShow}
              {!fileShow ? (
                <img className="w-full" src={NoImageH} alt={"noImage"} />
              ) : (
                <img className="" src={fileShow} alt={fileName?.filename} />
              )}
              <div class="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center bg-black bg-opacity-0 opacity-0 duration-500 group-hover:h-full group-hover:bg-opacity-80 group-hover:opacity-100">
                {fileShow ? (
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="fa-2xl text-orange-700"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faPlusSquare}
                    className="fa-2xl text-green-700"
                  />
                )}
                {fileShow && (
                  <FontAwesomeIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      setFileShow(null);
                      setFileName("");
                    }}
                    icon={faTimesCircle}
                    className="fa-md absolute top-2 right-2 text-red-500"
                  />
                )}
              </div>
              <VisuallyHiddenInput
                id="file-upload"
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={(e) => changeFile(e)}
              />
            </Card>
          </div>
          <div>
            <Typography className="mb-0" variant="h6">
              {t("companyName")}
            </Typography>
            <FormControl
              className="w-full"
              size="small"
              error={!valid["companyId"] && !_.get(data, "companyId")}
            >
              <Select
                onChange={(e) => {
                  changeData(e.target.value, "companyId");
                }}
                value={data?.companyId}
              >
                {companyList.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <Typography className="mb-0" variant="h6">
              {t("merchantName")}
            </Typography>
            <FormControl
              className="w-full"
              size="small"
              error={!valid["merchantId"] && !_.get(data, "merchantId")}
            >
              <Select
                onChange={(e) => {
                  changeData(e.target.value, "merchantId");
                }}
                value={data?.merchantId}
              >
                {merchantList.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <Typography className="mb-0" variant="h6">
              {t("name")}
            </Typography>
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
              error={!valid["name"] && !_.get(data, "name")}
            />
            <Typography className="text-xs text-red-500">
              {!_.get(data, "name") && invalidMsg["name"]}
            </Typography>
          </div>
          <div>
            <Typography className="mb-0" variant="h6">
              {t("description")}
            </Typography>
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
              error={!valid["description"] && !_.get(data, "description")}
            />
            <Typography className="text-xs text-red-500">
              {!_.get(data, "description") && invalidMsg["description"]}
            </Typography>
          </div>
        </DialogContent>{" "}
        <DialogActions>
          <Button
            color="purple"
            variant="outlined"
            className="mx-1"
            onClick={() => {
              setModalDetail(false);
              resetValidation();
            }}
          >
            {t("close")}
          </Button>
          <Button
            color="purple"
            variant="gradient"
            className="mx-1"
            onClick={handleSubmit}
          >
            {t("save")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
