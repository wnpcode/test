import {
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { lazy } from "react";
import icCategory from "../public/img/icon/Category.svg";
import icDoc from "../public/img/icon/Document.svg";
import icStar from "../public/img/icon/Star.svg";
import icBuy from "../public/img/icon/buy.svg";
import icPackage from "../public/img/icon/package.svg";
import icUser from "../public/img/icon/triuser.svg";
import icNotification from "../public/img/svg/notification-icon-dark.svg";
import routesMerchant from "./routes/merchant";
const SignIn = lazy(() => import("@/pages/auth/sign-in"));
const SignUp = lazy(() => import("@/pages/auth/sign-up"));
const Home = lazy(() => import("@/pages/dashboard/home"));
const NotificationList = lazy(() => import("@/pages/dashboard/notification"));
const CategoryList = lazy(() => import("@/pages/dashboard/category/category"));
const Product = lazy(() => import("@/pages/dashboard/pos/pos"));
const EditProduct = lazy(() =>
  import("@/pages/dashboard/product/edit-product")
);
const AddProduct = lazy(() => import("@/pages/dashboard/product/add-product"));
const ProductList = lazy(() => import("@/pages/dashboard/product/product"));
const DetailReport = lazy(() =>
  import("@/pages/dashboard/report/detail-report")
);
const ReportList = lazy(() => import("@/pages/dashboard/report/report"));
const AddUser = lazy(() => import("@/pages/dashboard/user/add-user"));
const EditUser = lazy(() => import("@/pages/dashboard/user/edit-user"));
const UserList = lazy(() => import("@/pages/dashboard/user/user"));

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: icStar,
        name: "dashboard",
        main: true,
        accessRole: "",
        badge: false,
        collapse: false,
        child: [],
        path: "/home",
        element: <Home />,
      },
      {
        icon: icUser,
        name: "user management",
        main: true,
        accessRole: "all",
        badge: false,
        collapse: true,
        path: "/user",
        child: [
          {
            name: "user data",
            subPath: "/user/user-management",
            element: <UserList />,
            accessRoleSub: "all",
          },
        ],
      },
      {
        path: "/user/user-management/edit/:id",
        element: <EditUser />,
        collapse: false,
        badge: false,
        accessRole: "",
        child: [],
      },
      {
        path: "/user/user-management/add",
        element: <AddUser />,
        collapse: false,
        badge: false,
        accessRole: "",
        child: [],
      },
      {
        icon: icCategory,
        name: "category",
        main: true,
        accessRole: "",
        badge: false,
        collapse: false,
        child: [],
        path: "/category",
        element: <CategoryList />,
      },
      {
        icon: icPackage,
        name: "product",
        main: true,
        accessRole: "",
        badge: false,
        collapse: false,
        child: [],
        path: "/product",
        element: <ProductList />,
      },
      {
        path: "/product/new",
        element: <AddProduct />,
        collapse: false,
        badge: false,
        accessRole: "",
        child: [],
      },
      {
        path: "/product/edit/:id",
        element: <EditProduct />,
        collapse: false,
        badge: false,
        accessRole: "",
        child: [],
      },
      {
        icon: icBuy,
        name: "pos",
        child: [],
        accessRole: "",
        badge: false,
        collapse: false,
        main: true,
        path: "/pos",
        element: <Product />,
      },
      {
        icon: icDoc,
        name: "report",
        child: [],
        accessRole: "",
        badge: false,
        collapse: false,
        main: true,
        path: "/report",
        element: <ReportList />,
      },
      {
        path: "/report/detail",
        element: <DetailReport />,
        collapse: false,
        badge: false,
        accessRole: "",
        child: [],
      },
      {
        icon: icNotification,
        name: "notification",
        main: true,
        accessRole: "",
        badge: false,
        collapse: false,
        child: [],
        path: "/notification",
        element: <NotificationList />,
      },
      {
        path: "/notification/detail",
        element: <EditProduct />,
        collapse: false,
        badge: false,
        accessRole: "",
        child: [],
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        main: false,
        child: [],
        path: "/sign-in",
        accessRole: "all",
        badge: false,
        collapse: false,
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        main: false,
        path: "/sign-up",
        accessRole: "all",
        badge: false,
        collapse: false,
        child: [],
        element: <SignUp />,
      },
    ],
  },
  ...routesMerchant,
];

export default routes;
