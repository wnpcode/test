import CurrencyFormat from "@/configs/curency";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import _ from "lodash";
import moment from "moment";
import { useRef } from "react";
import ReactToPrint, { useReactToPrint } from "react-to-print";

export const ModalPayment = ({ open, handleOpen, data, payment }) => {
  let componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforeGetContent: () => {
      const printStyles = `
    @media print {
      /* Set the width for printing, e.g., 80% of the page */
      width: 80%;
    }
  `;
      // Get the content element and apply print styles
      const contentElement = componentRef.current;
      if (contentElement) {
        contentElement.style = printStyles;
      }
      console.log("Preparing content for printing");
    },
    onAfterPrint: () => {
      // Additional actions after printing (optional)
      console.log("Printing completed");
    },
  });
  const generateOrderDetail = (item) => (
    <div
      className="flex w-full flex-row items-end justify-between "
      key={item.transactionId}
    >
      <div className="flex flex-col">
        <Typography className="text-xs font-light text-[#70717D]">
          {item.productName}
          {/* <CurrencyFormat value={item.productName} currency="IDR" /> */}
        </Typography>
        <Typography className="text-xs font-light text-[#848383]">
          {item.quantity} x&nbsp;
          <CurrencyFormat value={item.price} currency="IDR" />
        </Typography>
      </div>
      <Typography className="text-right text-xs font-light text-[#848383]">
        <CurrencyFormat value={item.quantity * item.price} currency="IDR" />
        {/* {item.quantity * item.price} */}
      </Typography>
    </div>
  );

  return (
    <Dialog
      open={open}
      handler={() => {
        handleOpen();
      }}
      size="xs"
    >
      {/* <DialogHeader>Konfirmasi</DialogHeader> */}
      <DialogBody
        className="m-auto flex w-[219px] flex-col items-center justify-center gap-4 p-1 py-8"
        ref={componentRef}
      >
        <FontAwesomeIcon
          icon={faCheckCircle}
          className="fa-6x text-purple-300"
        ></FontAwesomeIcon>
        <Typography className="#1A1A1A text-xl font-medium">
          Pembayaran Berhasil
        </Typography>
        <Typography className="#70717D text-xs">
          Pembayaran anda telah berhasil
        </Typography>
        <div className=" w-full border-t border-gray-200"></div>
        <div className="flex w-full flex-col">
          <div className="flex w-full flex-row justify-between ">
            <Typography className="#1A1A1A text-xs font-normal">
              Nama Merchant
            </Typography>
            <Typography className="text-right text-xs font-light text-[#848383]">
              {data.merchantName}
            </Typography>
          </div>
          <div className="flex w-full flex-row justify-between ">
            <Typography className="#1A1A1A text-xs font-normal">
              Nama POS
            </Typography>
            <Typography className="text-right text-xs font-light text-[#848383]">
              {data.posName}
            </Typography>
          </div>
          <div className="flex w-full flex-row justify-between ">
            <Typography className="#1A1A1A text-xs font-normal">
              Nama Admin
            </Typography>
            <Typography className="text-right text-xs font-light text-[#848383]">
              {data.cashierName}
            </Typography>
          </div>
          <div className="flex w-full flex-row justify-between ">
            <Typography className="#1A1A1A text-xs font-normal">
              Id Transaksi
            </Typography>
            <Typography className="text-right text-xs font-light text-[#848383]">
              {data.transactionId}
            </Typography>
          </div>
          <div className="flex w-full flex-row justify-between ">
            <Typography className="#1A1A1A text-xs font-normal">
              WaktuTransaksi
            </Typography>
            <Typography className="text-right text-xs font-light text-[#848383]">
              {moment(new Date(data.transactionTime)).format(
                "DD MMM YYYY HH:mm"
              )}
            </Typography>
          </div>
          <div className="flex w-full flex-row justify-between ">
            <Typography className="#1A1A1A text-xs font-normal">
              Metode Pembayaran
            </Typography>
            <Typography className="text-right text-xs font-light text-[#848383]">
              {data.paymentMethod}
            </Typography>
          </div>
          <div className="flex w-full flex-row justify-between ">
            <Typography className="#1A1A1A text-xs font-normal">
              Product
            </Typography>
          </div>
          {_.map(data.orderDetails, generateOrderDetail)}
          <div className="flex w-full flex-row justify-between ">
            <Typography className="text-sm">Total</Typography>

            <Typography className="text-right text-sm font-semibold">
              <CurrencyFormat value={data.totalAmount} currency="IDR" />
            </Typography>
          </div>
          <div className="flex w-full flex-row justify-between ">
            <Typography className="text-sm">Pembayaran</Typography>

            <Typography className="text-right text-sm  font-semibold">
              <CurrencyFormat value={payment} currency="IDR" />
            </Typography>
          </div>
          <div className="flex w-full flex-row justify-between ">
            <Typography className="text-sm">Kembalian</Typography>

            <Typography className="text-right text-sm font-semibold">
              <CurrencyFormat
                value={payment - data.totalAmount}
                currency="IDR"
              />
            </Typography>
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <div className="flex w-full flex-row items-end justify-center ">
          <Button
            className="m-1 rounded-2xl"
            size="lg"
            color="purple"
            variant="outlined"
            onClick={() => handleOpen()}
          >
            Tutup
          </Button>
          <Button
            className="m-1 rounded-2xl"
            size="lg"
            color="purple"
            variant="gradient"
            onClick={() => {
              // handleOpen();
              handlePrint();
            }}
          >
            Cetak
          </Button>
          {/* <ReactToPrint
            onAfterPrint={() => handleOpen()}
            trigger={() => (
              <Button
                className="m-1 rounded-2xl"
                size="lg"
                color="purple"
                variant="gradient"
                onClick={() => {
                  // handleOpen();
                }}
              >
                Cetak
              </Button>
            )}
            content={() => componentRef}
          /> */}
        </div>
      </DialogFooter>
    </Dialog>
  );
};
