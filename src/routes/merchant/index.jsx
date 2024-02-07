import { lazy } from "react";

const Product = lazy(() => import("@/pages/dashboard/pos/pos"));
export const routesMerchant = [
  {
    layout: "merchant",
    pages: [
      {
        child: [],
        accessRole: "",
        badge: false,
        collapse: false,
        main: true,
        path: "/pos",
        element: <Product />,
      },
    ],
  },
];

export default routesMerchant;
