import { notifList } from "@/data";
import {
  faArrowRotateRight,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faCircleExclamation,
  faClone,
  faEllipsisVertical,
  faEnvelopeOpen,
  faFolder,
  faPlay,
  faSliders,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  CardBody,
  Checkbox,
  Input,
  Tooltip,
} from "@material-tailwind/react";
import _ from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import DetailNotification from "./detail";
const CategoryList = () => {
  const { t, i18n } = useTranslation();
  const TABLE_HEAD = ["Nama Produk", "Keterangan", "Aksi"];
  const [data, setData] = useState(
    [...notifList].map((item, index) => ({
      ...item,
      active: index > 1,
    }))
  );
  const history = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [detailData, setDetailData] = useState({});
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    const timeOutId = setTimeout(() => {}, 1000);
    return () => clearTimeout(timeOutId);
  }, [searchKey]);

  useEffect(() => {
    setPage(0);
    setSize(10);
    setTotalElements(data.length);
  }, []);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-4">
      <DetailNotification
        open={open}
        handleOpen={handleOpen}
        data={detailData}
      />
      <Card className="px-2">
        <CardBody className="px-0 pt-2 pb-2">
          <div className="flex flex-row justify-between p-2">
            <div className="flex items-center gap-1">
              <Checkbox
                value={selectAll}
                onChange={(e) => setSelectAll(!selectAll)}
              />
              <Tooltip content={t("select")}>
                <FontAwesomeIcon
                  className="cursor-pointer text-gray-500 hover:text-gray-900"
                  width={24}
                  height={24}
                  icon={faChevronDown}
                ></FontAwesomeIcon>
              </Tooltip>
              <Tooltip content={t("refresh")}>
                <FontAwesomeIcon
                  className="cursor-pointer text-gray-500 hover:text-gray-900"
                  width={24}
                  height={24}
                  icon={faArrowRotateRight}
                ></FontAwesomeIcon>
              </Tooltip>
              <Tooltip content={t("inbox")}>
                <FontAwesomeIcon
                  className="cursor-pointer text-gray-500 hover:text-gray-900"
                  width={24}
                  height={24}
                  icon={faEnvelopeOpen}
                ></FontAwesomeIcon>
              </Tooltip>
              <Tooltip content={t("spam")}>
                <FontAwesomeIcon
                  className="cursor-pointer text-gray-500 hover:text-gray-900"
                  width={24}
                  height={24}
                  icon={faCircleExclamation}
                ></FontAwesomeIcon>
              </Tooltip>
              <Tooltip content={t("trash")}>
                <FontAwesomeIcon
                  className="cursor-pointer text-gray-500 hover:text-gray-900"
                  width={24}
                  height={24}
                  icon={faTrash}
                ></FontAwesomeIcon>
              </Tooltip>
              <Tooltip content={t("copy")}>
                <FontAwesomeIcon
                  className="cursor-pointer text-gray-500 hover:text-gray-900"
                  width={24}
                  height={24}
                  icon={faClone}
                ></FontAwesomeIcon>
              </Tooltip>
              <Tooltip content={t("folder")}>
                <span className="fa-layers fa-fw fa-lg cursor-pointer text-gray-500 hover:text-gray-900">
                  <FontAwesomeIcon width={24} height={24} icon={faFolder} />
                  <FontAwesomeIcon icon={faPlay} transform="shrink-9" inverse />
                </span>
              </Tooltip>
            </div>
            <div>
              <Input
                color="blue"
                type="search"
                size="sm"
                className="w-full"
                placeholder={t("search")}
                onChange={(e) => setSearchKey(e.target.value)}
                value={searchKey}
                name="search"
                label="search"
              />
            </div>
            <div className="flex items-center gap-1">
              <span>
                {page * size + 1}-{data.length} of {totalElements}
              </span>
              <Tooltip content={t("newer")}>
                <FontAwesomeIcon
                  className="cursor-pointer text-gray-500 hover:text-gray-900"
                  width={24}
                  height={24}
                  icon={faChevronLeft}
                ></FontAwesomeIcon>
              </Tooltip>
              <Tooltip content={t("older")}>
                <FontAwesomeIcon
                  className="cursor-pointer text-gray-500 hover:text-gray-900"
                  width={24}
                  height={24}
                  icon={faChevronRight}
                ></FontAwesomeIcon>
              </Tooltip>
              <Tooltip content={t("setting")}>
                <FontAwesomeIcon
                  className="fa-rotate-90 cursor-pointer text-gray-500 hover:text-gray-900"
                  width={24}
                  height={24}
                  icon={faSliders}
                ></FontAwesomeIcon>
              </Tooltip>
              <Tooltip content={t("more")}>
                <FontAwesomeIcon
                  className="fa-rotate-90 cursor-pointer text-gray-500 hover:text-gray-900"
                  width={24}
                  height={24}
                  icon={faEllipsisVertical}
                ></FontAwesomeIcon>
              </Tooltip>
            </div>
          </div>
        </CardBody>
      </Card>
      {_.map(data, (item, index) => (
        <Card
          key={`notif-${index}`}
          onClick={(e) => {
            setOpen(true);
            setDetailData(item);
          }}
          className={`${
            item.active ? "bg-blue-gray-200 font-semibold " : ""
          } cursor-pointer px-2 hover:shadow-md hover:shadow-blue-gray-400`}
        >
          <CardBody className="px-0 pt-2 pb-2">
            <div className="flex flex-row justify-between p-2">
              <div className="flex gap-1">
                <span>{item.actor}</span>
                <span>-</span>
                <span>{item.title}</span>
              </div>
              <div>
                <Tooltip content={moment(item.date).format("DD MMMM YYYY")}>
                  {moment(item.date).fromNow()}
                </Tooltip>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};
export default CategoryList;
