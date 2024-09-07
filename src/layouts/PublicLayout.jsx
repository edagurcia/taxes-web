import { Navigate, Outlet } from "react-router-dom";
import { AuthHeader } from "../components";

export const PublicLayout = () => {
  const token = sessionStorage.getItem("taxestoken");

  return (
    <>
      {token ? (
        <Navigate to="/app" />
      ) : (
        <>
          <img
            src="/images/taxes.jpg"
            alt="imagén de impuestos"
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
          />

          <section className="flex flex-1 justify-center items-center flex-col">
            <AuthHeader />

            <Outlet />
          </section>
        </>
      )}
    </>
  );
};
