import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import { useTranslation } from "react-i18next";

export const ModalDelete = ({
  showModalDelete,
  description = "",
  setModalDelete,
  confirmModalDelete,
}) => {
  const { t, i18n } = useTranslation();
  return (
    <Dialog
      size="xs"
      handler={() => setModalDelete(false)}
      open={showModalDelete}
    >
      <DialogHeader>{t("delete confirmation")}</DialogHeader>
      <DialogBody className="flex justify-center">
        <div className="w-36">
          <Typography variant="h6">{t("delete this")}&nbsp;?</Typography>
          <Typography variant="lead">{description}</Typography>
        </div>
      </DialogBody>
      <DialogFooter className="gap-1">
        <Button className="bg-red-500" onClick={() => confirmModalDelete()}>
          {t("delete")}
        </Button>
        <Button className="bg-purple-500" onClick={() => setModalDelete(false)}>
          {t("close")}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalDelete;
