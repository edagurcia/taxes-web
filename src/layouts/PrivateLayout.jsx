import { useEffect } from "react";
import { Outlet } from "react-router-dom";
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
    <div className="w-full flex flex-col px-10 md:px-2">
      <Topbar />
      <section className="border border-gray-200 rounded-lg">
        <Outlet />
      </section>
    </div>
  );
};
