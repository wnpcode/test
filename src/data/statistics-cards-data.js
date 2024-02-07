import {
  BanknotesIcon,
  UserPlusIcon,
  UserIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import transIcon from "../../public/img/Arrow.svg";

import totalIcon from "../../public/img/Buy.svg";

import wdIcon from "../../public/img/withdraw.svg";

export const statisticsCardsData = [
  {
    color: "purple",
    icon: transIcon,
    title: "Jumlah Transaksi",
    value: "$53k",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last week",
    },
  },
  {
    color: "pink",
    icon: totalIcon,
    title: "Total Saldo",
    value: "2,300",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
  },
  {
    color: "green",
    icon: wdIcon,
    title: "Pendapatan Bersih",
    value: "3,462",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  },

];

export default statisticsCardsData;
