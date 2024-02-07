import { getSessionStorage } from "@/configs/asyncStorage";
import routes from "@/routes";
import { axiosPost } from "@/services";
import { URL_CONSTANT } from "@/services/constant";
import { Chip } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes, useNavigate } from "react-router-dom";

export function Auth() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [lngs, setLngs] = useState({
    en: { nativeName: "En" },
    id: { nativeName: "Id" },
  });

  useEffect(() => {
    let token = getSessionStorage("token");
    if (!token) return;
    const asyncFunct = async () => {
      try {
        let response = await axiosPost(`${URL_CONSTANT.auth.check}`);
        navigate("/dashboard/home", { replace: true });
      } catch (error) {}
    };
    asyncFunct();
  }, []);

  return (
    <div className="relative h-full w-full ">
      <div className="fixed right-2 top-2 ml-2 flex justify-end gap-1 ">
        {Object.keys(lngs).map((lng) => (
          <Chip
            variant="small"
            className={`${
              i18n.language === lng ? "bg-orange-500" : "bg-gray-500"
            } ${i18n.language === lng ? "" : "text-purple-500"}`}
            key={lng}
            style={{
              fontWeight: i18n.language === lng ? "bold" : "normal",
            }}
            type="submit"
            onClick={() => i18n.changeLanguage(lng)}
            value={lngs[lng].nativeName}
          >
            {/* {lngs[lng].nativeName} */}
          </Chip>
        ))}
      </div>
      <Routes>
        {routes.map(
          ({ layout, pages }) =>
            layout === "auth" &&
            pages.map(({ path, element }) => (
              <Route exact path={path} element={element} />
            ))
        )}
      </Routes>
    </div>
  );
}

Auth.displayName = "/src/layout/Auth.jsx";

export default Auth;
