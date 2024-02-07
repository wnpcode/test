import CurrencyFormat from "@/configs/curency";
import { formatCurrencyText } from "@/configs/utils";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import nfcIcon from "../../../public/img/nfc.svg";
import InputCurrency from "../input-currency";

export const ModalPayCash = ({ open, handleOpen, total, handlePayment }) => {
  const [loading, setLoading] = useState(false);
  const [isPay, setIsPay] = useState(false);
  const [valid, setValid] = useState(true);
  const [invalidMsg, setInvalidMsg] = useState("");
  const [nominal, setNominal] = useState(0);
  const [inquiryData, setInquiryData] = useState({});

  const inquiry = (value = nominal) => {
    console.log(value);
    if (value < total) {
      setInvalidMsg("Nominal pembayaran belum sesuai");
      setValid(false);
      return;
    }
    setIsPay(true);
  };

  return (
    <Dialog
      open={open}
      handler={() => {
        handleOpen();
        setIsPay(false);
      }}
      size="xs"
    >
      {isPay ? (
        <>
          {loading && (
            <>
              <div className="absolute top-0 left-0 z-[1000] flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50 ">
                <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-b-4 border-blue-500"></div>
              </div>
            </>
          )}
          <DialogHeader>Konfirmasi</DialogHeader>
          <DialogBody className="flex flex-col items-center">
            <div className="flex w-full flex-row justify-between px-6">
              <span>Total</span>

              <span className="font-bold text-purple-300">
                <CurrencyFormat value={total} currency="IDR" />
              </span>
            </div>
            <div className="flex w-full flex-row justify-between px-6">
              <span>Pembayaran</span>

              <span className="font-bold text-purple-300">
                <CurrencyFormat value={nominal} currency="IDR" />
              </span>
            </div>
            <div className="flex w-full flex-row justify-between px-6">
              <span>Kembalian</span>

              <span className="font-bold text-purple-300">
                <CurrencyFormat value={nominal - total} currency="IDR" />
              </span>
            </div>
          </DialogBody>
          <DialogFooter>
            <div className="flex w-full flex-row items-end justify-center ">
              <Button
                className="m-1 rounded-2xl"
                size="lg"
                color="purple"
                variant="outlined"
                onClick={() => setIsPay(false)}
              >
                Kembali
              </Button>
              <Button
                className="m-1 rounded-2xl"
                size="lg"
                color="purple"
                variant="gradient"
                disabled={loading}
                onClick={() => {
                  setLoading(true);
                  handlePayment({ nominal });
                  // setIsPay(false);
                }}
              >
                Lanjut
              </Button>
            </div>
          </DialogFooter>
        </>
      ) : (
        <>
          <DialogHeader>Pembayaran Manual</DialogHeader>
          <DialogBody>
            <div className=" flex w-full flex-col items-center justify-center px-4">
              <img src={nfcIcon} className=" h-auto w-auto object-cover" />
              <span className="text-center">
                Silahkan masukkan nominal pembayaran
              </span>{" "}
              <InputCurrency
                value={nominal}
                onValueChange={(e) => {
                  console.log(e);
                  if (e.key === "Enter") {
                    console.log("enter");
                    // inquiry();
                  }
                  setNominal(parseInt(formatCurrencyText(e)));
                }}
                invalid={!valid && nominal < total}
              ></InputCurrency>
              <Typography className="text-xs text-red-500">
                {(!nominal || nominal < total) && invalidMsg}
              </Typography>
            </div>
          </DialogBody>
          <DialogFooter>
            <div className="flex w-full flex-row justify-between px-6">
              <span>Total</span>

              <span className="font-bold text-purple-300">
                <CurrencyFormat value={total} currency="IDR" />
              </span>
            </div>

            <div className="w-full">
              <Button
                disabled={!nominal}
                className="w-full"
                onClick={() => {
                  inquiry();
                }}
              >
                Lanjutkan
              </Button>
            </div>
          </DialogFooter>
        </>
      )}
    </Dialog>
  );
};
