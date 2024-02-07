import { Auth, Dashboard, Merchant } from "@/layouts";
import { Suspense, useState } from "react";
import { Toaster } from "react-hot-toast";
import LoadingOverlay from "react-loading-overlay";
import { Navigate, Route, Routes } from "react-router-dom";
import { ClockLoader } from "react-spinners";
import LoadingContext from "./context/utils"; // import loading
LoadingOverlay.propTypes = undefined;
function App() {
  const [loading, setLoading] = useState(false);
  const changeLoadingState = (payload) => {
    setLoading(payload);
  };
  return (
    <>
      <LoadingContext.Provider
        value={{ loading: loading, setLoading: changeLoadingState }}
      >
        <LoadingOverlay
          active={loading}
          spinner={<ClockLoader color="#36d7b7"></ClockLoader>}
        >
          <Toaster />
          <Suspense fallback={<Dashboard loading />}>
            <Routes>
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="/merchant/*" element={<Merchant />} />
              <Route path="/auth/*" element={<Auth />} />
              <Route
                path="*"
                element={<Navigate to="/auth/sign-in" replace />}
              />
            </Routes>
          </Suspense>
        </LoadingOverlay>
      </LoadingContext.Provider>
    </>
  );
}

export default App;
