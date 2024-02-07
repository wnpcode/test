import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Checkbox,
  Input,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

import { setSessionStorage } from "@/configs/asyncStorage";
import { elispsisText, validateRole } from "@/configs/utils";
import LoadingContext from "@/context/utils"; // import loading
import { axiosPost, login } from "@/services";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import iconDummy from "../../../public/img/Frame (1).svg";
import rightImg from "../../../public/img/Group 3219.svg";
import bottomImg from "../../../public/img/Group 3220.svg";
import loginImage from "../../../public/img/Layer_1.svg";
import { setOpenSidenav, useMaterialTailwindController } from "@/context";
import { URL_CONSTANT } from "@/services/constant";
export function SignIn() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openSidenav } = controller;
  const { t, i18n } = useTranslation();
  const loading = useContext(LoadingContext); // get state & function loading
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("Tes sekolah");
  const doLogin = async () => {
    if (!username || !password)
      return toast.error("Periksa username / password");
    loading.setLoading(true);
    try {
      let response = await login({
        username,
        password,
      });
      setSessionStorage("token", response.data.token);
      let responseCheck = await axiosPost(
        `${URL_CONSTANT.auth.check}`,
        {},
        response.data.token
      );
      await setSessionStorage("login_data", JSON.stringify(responseCheck.data));

      loading.setLoading(false);
      toast.success(response.data.message);
      let redirectUrl = "/dashboard/home";
      if (validateRole("CASHIER", responseCheck.data)) {
        redirectUrl = "/merchant/pos";
        setOpenSidenav(dispatch, false);
      }
      navigate(redirectUrl, { replace: true });
    } catch (error) {
    } finally {
      loading.setLoading(false);
    }
  };
  return (
    <>
      {/* <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      /> */}
      <div className="h-screen w-full bg-gray-200">
        <div className="flex h-full w-full items-center  justify-center object-center lg:w-1/2 ">
          <Card className="min-h-96 z-30 h-auto w-[calc(100vw-100px)] shadow-2xl  md:w-1/2">
            <CardBody className="flex flex-col gap-4">
              <div className="flex max-h-28 flex-row items-center gap-1 overflow-y-hidden">
                <img src={iconDummy} className=" h-auto w-auto object-cover" />
                <div className="flex-grow text-center">
                  {title.length > 50 ? (
                    <Tooltip content={title}>
                      <h4>{elispsisText(title)}</h4>
                    </Tooltip>
                  ) : (
                    <h4>{title}</h4>
                  )}
                </div>
              </div>

              <Typography className="mb-0" variant="h6">
                {t("email")}
              </Typography>
              <Input
                type="email"
                className="login-input w-full"
                size="lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Typography className="mb-0" variant="h6">
                {t("password")}
              </Typography>
              <Input
                type="password"
                className="login-input w-full"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="-ml-2.5">
                <Checkbox label={t("remember me")} />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                color="purple"
                variant="gradient"
                fullWidth
                onClick={() => {
                  doLogin();
                }}
              >
                {t("sign in")}
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="login-container w-1/2">
          <img
            src={loginImage}
            className="absolute bottom-0 right-0 z-20  h-auto w-auto object-cover"
          />
          <img
            src={bottomImg}
            className="absolute bottom-0 right-0 h-auto w-auto object-cover"
          />
          <img
            src={rightImg}
            className="absolute bottom-0 right-0 z-10 h-auto w-auto object-cover"
          />
        </div>
      </div>
    </>
  );
}

export default SignIn;
