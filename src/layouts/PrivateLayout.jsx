import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import { FullPageLoader, Topbar } from "../components";

export const PrivateLayout = () => {
  const { isLoading, getActualSession } = useAuth();

  const token = sessionStorage.getItem("taxestoken");

  useEffect(() => {
    getActualSession();
  }, []);

  return !token || isLoading ? (
    <FullPageLoader />
  ) : (
    <div className="w-full flex flex-col px-4">
      <Topbar />
      <div className="flex justify-center items-center">
        <section className="p-4 w-full md:w-[800px] lg:w-[1200px] border border-gray-200 rounded-lg flex flex-col">
          <Outlet />
        </section>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};
