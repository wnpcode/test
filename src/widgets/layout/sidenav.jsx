import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Badge,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { Bars3Icon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import _ from "lodash";

export function Sidenav({ brandImg, brandName, routes }) {
  const { t, i18n } = useTranslation();
  const [controller, dispatch] = useMaterialTailwindController();
  const [subMenu, setSubMenu] = useState(-1);
  const [roles, setRoles] = useState("all");
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
    purple: "bg-purple-600",
  };
  useEffect(() => {
    routes.map((item) => {
      if (item.title == "auth pages") return;
      let index = _.findIndex(item.pages, ({ path }) =>
        window.location.hash.includes(path)
      );
      if (index != -1) setSubMenu(index);
    });
  }, []);

  useEffect(() => {}, [openSidenav, subMenu]);
  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav
          ? "translate-x-0 transition-transform duration-500"
          : "-translate-x-44 transition-transform duration-500"
      } fixed inset-0 z-50  h-full w-72 `}
    >
      {openSidenav ? (
        <>
          <div
            className={`relative border-b ${
              sidenavType === "dark" ? "border-white/20" : "border-red-gray-50"
            }`}
          >
            <Link
              to="/dashboard/home"
              className="flex items-center gap-4 py-6 px-8"
            >
              <Avatar src={brandImg} size="sm" />
              <Typography
                variant="h6"
                color={sidenavType === "dark" ? "white" : "blue-gray"}
              >
                {brandName}
              </Typography>
            </Link>
            <IconButton
              variant="text"
              color="white"
              size="sm"
              ripple={false}
              className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none "
              onClick={() => setOpenSidenav(dispatch, !openSidenav)}
            >
              <Bars3Icon
                strokeWidth={3}
                className="h-6 w-6 text-blue-gray-500"
              />
            </IconButton>
          </div>
          <div className="m-4">
            {routes.map(({ layout, title, pages }, key) => (
              <ul key={key} className="mb-4 flex flex-col gap-1">
                {title !== "auth pages" &&
                  pages
                    .filter((item) => item.name)
                    .map(
                      (
                        {
                          icon,
                          name,
                          path,
                          collapse,
                          child,
                          accessRole,
                          badge,
                        },
                        index
                      ) => {
                        const role =
                          typeof accessRole === "string" &&
                          accessRole.includes(roles);
                        return (
                          <li key={index}>
                            {child?.length === 0 ? (
                              name && (
                                <NavLink
                                  to={`/${layout}${path}`}
                                  onClick={() => setSubMenu(index)}
                                >
                                  {({ isActive }) => (
                                    <>
                                      {badge ? (
                                        <Badge
                                          content={notifTotal}
                                          placement=""
                                          className="flex flex-row"
                                        >
                                          <Button
                                            variant={isActive ? "text" : "text"}
                                            color={
                                              isActive
                                                ? sidenavColor
                                                : sidenavType === "dark"
                                                ? "gray"
                                                : "blue"
                                            }
                                            className="flex w-full items-center px-4 capitalize"
                                            fullWidth
                                          >
                                            <img
                                              src={icon}
                                              className="relative mr-4 h-5 w-5 object-fill text-inherit"
                                              color=""
                                            />
                                            <Typography
                                              variant={"small"}
                                              color={
                                                isActive ? "blue" : "black"
                                              }
                                              className="font-medium capitalize"
                                            >
                                              {t(name)}
                                            </Typography>
                                          </Button>
                                        </Badge>
                                      ) : (
                                        <div className="flex flex-row">
                                          <Button
                                            variant={
                                              isActive ? "gradient" : "text"
                                            }
                                            color={
                                              isActive
                                                ? "purple"
                                                : sidenavType === "dark"
                                                ? "purple"
                                                : "white"
                                            }
                                            className="flex w-full items-center px-4 capitalize"
                                            fullWidth
                                          >
                                            <img
                                              src={icon}
                                              className="relative mr-4 h-5 w-5 object-fill text-inherit"
                                              color=""
                                            />
                                            <Typography
                                              variant={"small"}
                                              color={
                                                isActive ? "white" : "black"
                                              }
                                              className="font-medium capitalize"
                                            >
                                              {t(name)}
                                            </Typography>
                                          </Button>
                                          {name === "notifikasi" && (
                                            <div className=" h-7  w-auto rounded-lg bg-red-500 p-2 text-xs text-white">
                                              {notifTotal}
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </>
                                  )}
                                </NavLink>
                              )
                            ) : (
                              <>
                                <div className="flex flex-col">
                                  <Button
                                    variant={
                                      subMenu === index ? "gradient" : "text"
                                    }
                                    color={
                                      subMenu === index ? "purple" : "white"
                                    }
                                    onClick={() => {
                                      if (subMenu === index) {
                                        setSubMenu(-1);
                                      } else {
                                        setSubMenu(index);
                                      }
                                    }}
                                    className="mb-1 flex w-full items-center px-4 capitalize"
                                    fullWidth
                                  >
                                    <div className="flex flex-1  flex-row justify-items-end align-middle">
                                      <div className="flex w-11/12 flex-row  justify-items-stretch">
                                        <img
                                          src={icon}
                                          className="relative mr-4 h-5 w-5 object-fill text-inherit"
                                          color=""
                                        />
                                        <Typography
                                          variant={"small"}
                                          color={
                                            subMenu === index
                                              ? "white"
                                              : "black"
                                          }
                                          className="font-medium capitalize"
                                        >
                                          {t(name)}
                                        </Typography>
                                      </div>
                                      <div
                                        className={`flex flex-1 transform flex-col justify-center transition-transform rotate-${
                                          subMenu !== index ? "0" : "90"
                                        } cursor-pointer`}
                                      >
                                        <ChevronRightIcon className="h-4 w-4 text-black " />
                                      </div>
                                    </div>
                                  </Button>

                                  <div
                                    className={`ml-6 transform transition-transform ${
                                      subMenu !== index ? "hidden" : ""
                                    }`}
                                  >
                                    {child &&
                                      child.map(
                                        (
                                          { name, subPath, accessRoleSub },
                                          ks
                                        ) => {
                                          const subRoleAccess =
                                            typeof accessRoleSub === "string" &&
                                            accessRoleSub.includes(roles);
                                          return (
                                            name &&
                                            subRoleAccess && (
                                              <ul key={ks}>
                                                <NavLink
                                                  to={`/${layout}${subPath}`}
                                                >
                                                  {({ isActive }) => (
                                                    <>
                                                      <Button
                                                        variant={
                                                          isActive
                                                            ? "gradient"
                                                            : "text"
                                                        }
                                                        color={
                                                          isActive
                                                            ? sidenavColor
                                                            : sidenavType ===
                                                              "dark"
                                                            ? "gray"
                                                            : "blue"
                                                        }
                                                        className="flex w-full items-center px-4 capitalize"
                                                        fullWidth
                                                        onClick={() => {}}
                                                      >
                                                        <div
                                                          className={`h-1 w-1 rounded-full ${
                                                            isActive
                                                              ? "bg-blue-700"
                                                              : "bg-black"
                                                          } mr-3`}
                                                        ></div>
                                                        <Typography
                                                          variant={"small"}
                                                          color={
                                                            isActive
                                                              ? "white"
                                                              : "black"
                                                          }
                                                          className="font-medium capitalize"
                                                        >
                                                          {t(name)}
                                                        </Typography>
                                                      </Button>
                                                    </>
                                                  )}
                                                </NavLink>
                                              </ul>
                                            )
                                          );
                                        }
                                      )}
                                  </div>
                                </div>
                              </>
                            )}
                          </li>
                        );
                      }
                    )}
              </ul>
            ))}
          </div>
        </>
      ) : (
        <>
          <div
            className={`relative border-b ${
              sidenavType === "dark" ? "border-white/20" : "border-red-gray-50"
            }`}
          >
            <div className="h-20 w-auto items-center justify-center">
              <IconButton
                variant="text"
                color="white"
                size="sm"
                ripple={false}
                className="absolute right-10 top-5 grid rounded-br-none rounded-tl-none "
                onClick={() => setOpenSidenav(dispatch, !openSidenav)}
              >
                <Bars3Icon
                  strokeWidth={3}
                  className="h-6 w-6 text-blue-gray-500"
                />
              </IconButton>
            </div>
          </div>
          <div className="m-4">
            {routes.map(({ layout, title, pages }, key) => (
              <ul key={key} className="mb-4 flex flex-col gap-1">
                {title !== "auth pages" &&
                  pages
                    .filter((item) => item.name)
                    .map(
                      (
                        {
                          icon,
                          name,
                          path,
                          collapse,
                          child,
                          accessRole,
                          badge,
                        },
                        index
                      ) => {
                        const role =
                          typeof accessRole === "string" &&
                          accessRole.includes(roles);
                        return (
                          // <li key={index}>
                          //   {
                          child?.length === 0 ? (
                            name && (
                              <li key={index}>
                                <NavLink to={`/${layout}${path}`}>
                                  {({ isActive }) => (
                                    <>
                                      {badge ? (
                                        <Badge
                                          content={notifTotal}
                                          placement=""
                                          className="flex flex-row"
                                        >
                                          <Button
                                            variant={isActive ? "text" : "text"}
                                            color={
                                              isActive
                                                ? sidenavColor
                                                : sidenavType === "dark"
                                                ? "gray"
                                                : "blue"
                                            }
                                            className="flex w-full items-center px-4 capitalize"
                                            fullWidth
                                          >
                                            <img
                                              src={icon}
                                              className="relative h-5 w-5 object-fill text-inherit "
                                              color=""
                                            />
                                          </Button>
                                        </Badge>
                                      ) : (
                                        <div className="flex flex-row justify-end">
                                          <Button
                                            variant={
                                              isActive ? "gradient" : "text"
                                            }
                                            title={name.toUpperCase()}
                                            color={
                                              isActive
                                                ? "purple"
                                                : sidenavType === "dark"
                                                ? "purple"
                                                : "white"
                                            }
                                            className="flex w-20 items-center justify-center px-4 capitalize"
                                            fullWidth
                                          >
                                            <img
                                              src={icon}
                                              className="relative h-5 w-5 object-fill text-white text-inherit "
                                              color=""
                                            />
                                          </Button>
                                          {name === "notifikasi" && (
                                            <div className=" h-7  w-auto rounded-lg bg-red-500 p-2 text-xs text-white">
                                              {notifTotal}
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </>
                                  )}
                                </NavLink>
                              </li>
                            )
                          ) : (
                            <li key={index}>
                              <div className="flex flex-col">
                                <div className="flex flex-row justify-end">
                                  <Button
                                    variant={
                                      subMenu === index ? "gradient" : "text"
                                    }
                                    color={
                                      subMenu === index ? "purple" : "white"
                                    }
                                    title={name.toUpperCase()}
                                    onClick={() => {
                                      if (subMenu === index) {
                                        setSubMenu();
                                      } else {
                                        setSubMenu(index);
                                      }
                                    }}
                                    className="flex w-20 items-center justify-start capitalize"
                                  >
                                    <img
                                      src={icon}
                                      className="relative mr-4 h-5 w-5 object-fill text-inherit"
                                      color=""
                                    />

                                    <div
                                      className={`flex flex-1 transform flex-col justify-center transition-transform rotate-${
                                        subMenu !== index ? "0" : "90"
                                      } cursor-pointer`}
                                    >
                                      <ChevronRightIcon className="h-4 w-4 text-black " />
                                    </div>
                                  </Button>
                                </div>

                                <div
                                  className={`ml-6 transform transition-transform ${
                                    subMenu !== index ? "hidden" : ""
                                  }`}
                                >
                                  {child &&
                                    child.map(
                                      (
                                        { name, subPath, accessRoleSub },
                                        ks
                                      ) => {
                                        const subRoleAccess =
                                          typeof accessRoleSub === "string" &&
                                          accessRoleSub.includes(roles);
                                        return (
                                          name &&
                                          subRoleAccess && (
                                            <ul key={ks}>
                                              <NavLink
                                                to={`/${layout}${subPath}`}
                                                className={`flex flex-row justify-end`}
                                              >
                                                {({ isActive }) => (
                                                  <>
                                                    <Button
                                                      variant={
                                                        isActive
                                                          ? "gradient"
                                                          : "text"
                                                      }
                                                      color={
                                                        isActive
                                                          ? sidenavColor
                                                          : sidenavType ===
                                                            "dark"
                                                          ? "gray"
                                                          : "blue"
                                                      }
                                                      className="flex w-20 items-center px-4 capitalize "
                                                      fullWidth
                                                      onClick={() => {}}
                                                    >
                                                      <div
                                                        className={`h-1 w-1 rounded-full ${
                                                          isActive
                                                            ? "bg-blue-700"
                                                            : "bg-black"
                                                        } mr-3`}
                                                      ></div>
                                                      <Typography
                                                        variant={"small"}
                                                        color={
                                                          isActive
                                                            ? "white"
                                                            : "black"
                                                        }
                                                        className="font-medium capitalize"
                                                      >
                                                        {t(name)}
                                                      </Typography>
                                                    </Button>
                                                  </>
                                                )}
                                              </NavLink>
                                            </ul>
                                          )
                                        );
                                      }
                                    )}
                                </div>
                              </div>
                            </li>
                          )
                          //   }
                          // </li>
                        );
                      }
                    )}
              </ul>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Material Tailwind React",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
