// import React from "react";
// import ReactToPrint from "react-to-print";

// function productPaymentReceipt(data) {
//   const generateOrderDetail = (item) => (
//     <div
//       className="flex w-full flex-row items-end justify-between px-6"
//       key={item.transactionId}
//     >
//       <div className="flex flex-col">
//         <Typography className="text-xs font-light text-[#70717D]">
//           {item.productName}
//           {/* <CurrencyFormat value={item.productName} currency="IDR" /> */}
//         </Typography>
//         <Typography className="text-xs font-light text-[#848383]">
//           {item.quantity} x&nbsp;
//           <CurrencyFormat value={item.price} currency="IDR" />
//         </Typography>
//       </div>
//       <Typography className="text-xs font-light text-[#848383]">
//         <CurrencyFormat value={item.quantity * item.price} currency="IDR" />
//         {/* {item.quantity * item.price} */}
//       </Typography>
//     </div>
//   );

//   const ComponentToPrint = () => (
//     <div className="w-">
//       <div className="flex w-full flex-col ">
//         <div className="flex w-full flex-row justify-between px-6">
//           <Typography className="#1A1A1A text-sm font-normal">
//             Nama Merchant
//           </Typography>
//           <Typography className="text-sm font-light text-[#848383]">
//             {data.merchantName}
//           </Typography>
//         </div>
//         <div className="flex w-full flex-row justify-between px-6">
//           <Typography className="#1A1A1A text-sm font-normal">
//             Nama POS
//           </Typography>
//           <Typography className="text-sm font-light text-[#848383]">
//             {data.posName}
//           </Typography>
//         </div>
//         <div className="flex w-full flex-row justify-between px-6">
//           <Typography className="#1A1A1A text-sm font-normal">
//             Nama Admin
//           </Typography>
//           <Typography className="text-sm font-light text-[#848383]">
//             {data.cashierName}
//           </Typography>
//         </div>
//         <div className="flex w-full flex-row justify-between px-6">
//           <Typography className="#1A1A1A text-sm font-normal">
//             Id Transaksi
//           </Typography>
//           <Typography className="text-sm font-light text-[#848383]">
//             {data.transactionId}
//           </Typography>
//         </div>
//         <div className="flex w-full flex-row justify-between px-6">
//           <Typography className="#1A1A1A text-sm font-normal">
//             WaktuTransaksi
//           </Typography>
//           <Typography className="text-sm font-light text-[#848383]">
//             {moment(new Date(data.transactionTime)).format("DD MMM YYYY HH:mm")}
//           </Typography>
//         </div>
//         <div className="flex w-full flex-row justify-between px-6">
//           <Typography className="#1A1A1A text-sm font-normal">
//             Metode Pembayaran
//           </Typography>
//           <Typography className="text-sm font-light text-[#848383]">
//             {data.paymentMethod}
//           </Typography>
//         </div>
//         <div className="flex w-full flex-row justify-between px-6">
//           <Typography className="#1A1A1A text-sm font-normal">
//             Product
//           </Typography>
//         </div>
//         {_.map(data.orderDetails, generateOrderDetail)}
//       </div>
//       <div className="flex w-full flex-row justify-between px-6">
//         <span>Total</span>

//         <span className="font-bold ">
//           <CurrencyFormat value={data.totalAmount} currency="IDR" />
//         </span>
//       </div>
//       <div className="flex w-full flex-row justify-between px-6">
//         <span>Pembayaran</span>

//         <span className="font-bold ">
//           <CurrencyFormat value={payment} currency="IDR" />
//         </span>
//       </div>
//       <div className="flex w-full flex-row justify-between px-6">
//         <span>Kembalian</span>

//         <span className="font-bold ">
//           <CurrencyFormat value={payment - data.totalAmount} currency="IDR" />
//         </span>
//       </div>
//     </div>
//   );
//   let componentRef = useRef();
//   return (
//     <div>
//       {/* button to trigger printing of target component */}
//       <ReactToPrint
//         trigger={() => <Button>Print this out!</Button>}
//         content={() => componentRef}
//       />

//       {/* component to be printed */}
//       <ComponentToPrint ref={(el) => (componentRef = el)} />
//     </div>
//   );
// }

// export default productPaymentReceipt;
