import { Header } from "../shared/Header";
import { FormRTNS } from "./FormRTNS";
import { TableRTNS } from "./TableRTNS";

export const RTNS = () => {
  return (
    <>
      <Header
        id="rtns"
        title="RTN's registrados"
        description="Mantenimiento de RTN's"
      />

      <FormRTNS />

      <TableRTNS />
    </>
  );
};
