import CurrencyFormat from "@/configs/curency";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import { useState } from "react";
import nfcIcon from "../../../public/img/nfc.svg";

export const ModalTapNfc = ({
  open,
  handleOpen,
  total,
  handlePayment,
  loadingPayment,
}) => {
  const [nfc, setNfc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [NFCCode, setNFCCode] = useState("");
  const [NFCPin, setNFCPin] = useState("0000");
  const [inquiryData, setInquiryData] = useState({
    name: "name",
    cardId: "0asjdfo3ufoja93f",
    balance: "10000",
  });

  const inquiry = (nfccode = NFCCode) => {
    console.log(nfccode);
    setNfc(true);
  };

  return (
    <Dialog
      open={open}
      handler={() => {
        handleOpen();
        setNFCCode("");
        setNfc(false);
      }}
      size="xs"
    >
      {nfc ? (
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
            <div className=" flex w-full flex-col items-center justify-center rounded-full px-4">
              <img
                src="https://www.mecgale.com/wp-content/uploads/2017/08/dummy-profile.png"
                className=" h-auto w-auto rounded-full object-cover"
              />
            </div>
            <div className="flex w-full justify-between px-6">
              <span className="text-black ">Nama</span>
              <p>{inquiryData.name}</p>
            </div>
            <div className="flex w-full justify-between px-6">
              <span className="text-black ">Id Kartu</span>
              <p>{inquiryData.cardId}</p>
            </div>
            <div className="flex w-full justify-between px-6">
              <span className="text-black ">Saldo</span>
              <p>
                {/* {inquiryData.balance} */}
                <CurrencyFormat value={inquiryData.balance} currency="IDR" />
              </p>
            </div>
            {/* {inquiryData.usedPin && ( */}
            <>
              <div className="flex w-full justify-between px-6">
                <span className="text-black ">PIN</span>
              </div>
              <div className="w-10/12">
                <Input size="lg" className="text-right" type="text" />
              </div>
            </>
            {/* )} */}
          </DialogBody>
          <DialogFooter>
            <div className="flex w-full flex-row justify-between px-6">
              <span>Total</span>

              <span className="font-bold text-purple-300">
                <CurrencyFormat value={total} currency="IDR" />
              </span>
            </div>

            <div className="flex w-full flex-row items-end justify-center ">
              <Button
                className="m-1 rounded-2xl"
                size="lg"
                color="purple"
                variant="outlined"
                onClick={() => setNfc(false)}
              >
                Kembali
              </Button>
              <Button
                className="m-1 rounded-2xl"
                size="lg"
                color="purple"
                variant="gradient"
                disabled={loadingPayment}
                onClick={() => {
                  setLoading(true);
                  handlePayment(NFCPin);
                  // setNFCCode("");
                  // setNfc(false);
                }}
              >
                Lanjut
              </Button>
            </div>
          </DialogFooter>
        </>
      ) : (
        <>
          <DialogHeader>Tap Kartu Anda</DialogHeader>
          <DialogBody>
            <div className=" flex w-full flex-col items-center justify-center px-4">
              <img src={nfcIcon} className=" h-auto w-auto object-cover" />
              <span className="text-center">
                Silahkan Tap Kartu anda untuk melanjutkam pembayaran pos melalui
                kartu
              </span>
              <Input
                color="blue"
                type="text"
                size="lg"
                className="w-full"
                onChange={(e) => {
                  setNFCCode(e.target.value);
                }}
                onKeyPress={(event) => {
                  if (event.key === "Enter" && NFCCode) {
                    console.log("enter");
                    inquiry();
                  }
                }}
                value={NFCCode}
                name="NFC"
                placeholder="NFC"
              />
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
                disabled={!NFCCode}
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
