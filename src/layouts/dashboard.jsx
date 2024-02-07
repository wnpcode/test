import { useMaterialTailwindController } from "@/context";
import routes from "@/routes";
import { axiosPost } from "@/services";
import { URL_CONSTANT } from "@/services/constant";
import { Configurator, DashboardNavbar, Sidenav } from "@/widgets/layout";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

export function Dashboard({ loading = false }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType, openSidenav } = controller;
  const loc = useLocation();

  useEffect(() => {
    if (loading) return;
    const asyncFunct = async () => {
      await axiosPost(`${URL_CONSTANT.auth.check}`);
    };
    asyncFunct();
  }, []);
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark"
            ? "/img/svg/logo.svg"
            : "/img/svg/logo-dark.svg"
        }
        brandName="Al-Fatihah"
      />
      <div
        className={`p-4 ${
          openSidenav ? "ml-80" : "ml-36"
        }  transition-transform duration-300`}
      >
        <DashboardNavbar />
        <Configurator />
        {/* <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton> */}
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element, collapse, child }) =>
                collapse === false ? (
                  <Route exact path={path} element={element} />
                ) : (
                  child.map((elSub, index) => (
                    <Route exact path={elSub.subPath} element={elSub.element} />
                  ))
                )
              )
          )}
        </Routes>
        {/* <div className="text-blue-gray-600">
          <Footer />
        </div> */}
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
