import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Typography,
} from "@material-tailwind/react";
import { startCase } from "lodash";
import moment from "moment";
import { useTranslation } from "react-i18next";
const DetailNotification = ({ data, handleOpen, open }) => {
  const { t, i18n } = useTranslation();

  return (
    <Dialog
      size="xl"
      open={open}
      handler={handleOpen}
      className="bg-transparent "
    >
      <Card className="mx-auto w-full ">
        <CardBody className="flex flex-col gap-4">
          <div className="flex justify-between ">
            <Typography className="" variant="h6" color="blue-gray">
              {startCase(data?.title)}
            </Typography>
            <Typography variant="h6" color="blue-gray">
              {moment(data?.date).format("DD/MM/YYYY")}
            </Typography>
          </div>
          <hr />
          <Typography
            className="mb-3 font-normal"
            variant="paragraph"
            color="gray"
          >
            {data?.description || data?.content}
          </Typography>
        </CardBody>
        <CardFooter className="flex flex-row-reverse gap-1 pt-0">
          <Button
            color="purple"
            variant="outlined"
            className="mx-1"
            onClick={handleOpen}
          >
            {t("back")}
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
};
export default DetailNotification;
