import { useEffect } from "react";
import { useBusiness, useRtn } from "../hooks";
import { Businesses } from "../components";
import { RTNS } from "../components/maitenance/RTNS";

export const MaintenancePage = () => {
  const { businesses, startGetBusiness } = useBusiness();
  const { rtns, startGetRTNS } = useRtn();

  useEffect(() => {
    if (businesses && rtns) return;

    startGetBusiness();
    startGetRTNS();
  }, []);

  return (
    <>
      <h1 className="text-3xl mb-5 text-primary/50">Mantenimientos</h1>

      <Businesses />
      <RTNS />
    </>
  );
};
