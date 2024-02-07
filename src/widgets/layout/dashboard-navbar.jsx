import { useMaterialTailwindController } from "@/context";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import {
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import {
  Badge,
  Breadcrumbs,
  Button,
  Chip,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import _ from "lodash";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotifList from "../notif-list.jsx";
import { removeSessionStorage } from "@/configs/asyncStorage.jsx";
import LoadingContext from "@/context/utils"; // import loading
import { notifList } from "@/data";
import { useTranslation } from "react-i18next";
import { CheckmarkIcon } from "react-hot-toast";
export function DashboardNavbar() {
  const { t, i18n } = useTranslation();
  const [lngs, setLngs] = useState({
    en: { nativeName: "En" },
    id: { nativeName: "Id" },
  });
  const loading = useContext(LoadingContext); // get state & function loading
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const navigate = useNavigate();
  const locale = "en";
  const [today, setDate] = useState(new Date()); // Save the current date to be able to trigger an update
  const [notif, setNotif] = useState([...notifList]);
  const [modal, setModal] = useState(false);

  const logout = async () => {
    setModal(false);
    loading.setLoading(true);
    let responseToken = await removeSessionStorage("token");
    let responseData = await removeSessionStorage("login_data");
    loading.setLoading(false);
    navigate("/auth/sign-in", { replace: true });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1 * 1000);
    return () => {
      clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
    };
  }, []);

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {t(page)}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {t(page)}
          </Typography>
        </div>
        <div className="flex items-center">
          <div>
            <Button
              variant="gradient"
              color="purple"
              className=" items-center gap-1 rounded-3xl px-4 xl:flex"
            >
              <ShoppingCartIcon className="h-5 w-5 text-white" /> POS
            </Button>
          </div>
          <div className="ml-2 flex justify-end gap-1">
            {Object.keys(lngs).map((lng) => (
              <Chip
                variant="ghost"
                color={`${i18n.language === lng ? "light-green" : "gray"}`}
                icon={
                  i18n.language === lng && (
                    <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />
                  )
                }
                key={lng}
                style={{
                  fontWeight: i18n.language === lng ? "bold" : "normal",
                }}
                type="submit"
                onClick={() => i18n.changeLanguage(lng)}
                value={lngs[lng].nativeName}
              ></Chip>
            ))}
          </div>
          <div>
            <Button
              disabled
              key={today}
              variant="text"
              color="blue-gray"
              className="hidden items-center gap-1 px-4 xl:flex"
            >
              {moment(today).format("hh:mm:ss DD/MM/YYYY")}
            </Button>
            <IconButton
              variant="text"
              color="blue-gray"
              className="grid xl:hidden"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
            </IconButton>
          </div>

          <Menu>
            {/* {notif.length > 0 ? (
              <Badge content={notif.length} overlap="circular">
                <MenuHandler>
                  <IconButton variant="text" color="blue-gray">
                    <UserCircleIcon className="h-10 w-10 text-blue-gray-500" />
                  </IconButton>
                </MenuHandler>
              </Badge>
            ) : ( */}
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <UserCircleIcon className="h-10 w-10 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            {/* )} */}
            <MenuList className="w-max border-0">
              {/* {_.map(notif, (item, index) => (
                <NotifList
                  key={`notif-list-${index}`}
                  imageSrc={item.imageSrc}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  date={item.date}
                ></NotifList>
              ))}
              <hr className="my-3" /> */}
              <MenuItem
                className="flex items-center gap-4"
                onClick={() => setModal(true)}
              >
                <div className="grid h-9 w-9 place-items-center rounded-full bg-red-500">
                  <ArrowRightOnRectangleIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className=" font-normal"
                  >
                    {t("logout")}
                  </Typography>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
        <Dialog size="sm" open={modal} handler={() => setModal(false)}>
          <DialogHeader>Konfirmasi</DialogHeader>
          <DialogBody>
            <h3>Apakah Anda yakin ingin keluar?</h3>
          </DialogBody>
          <DialogFooter>
            <div className="flex justify-end gap-2">
              <Button
                color="deep-orange"
                onClick={() => {
                  logout();
                }}
              >
                {t("confirm")}
              </Button>
              <Button color="deep-purple" onClick={() => setModal(false)}>
                {t("cancel")}
              </Button>
            </div>
          </DialogFooter>
        </Dialog>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
