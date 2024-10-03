import { Header } from "../shared/Header";
import { FilterInput } from "../shared/FilterInput";
import { TaxesTable } from "./TaxesTable";

export const TaxesDetail = () => {
  return (
    <>
      <Header
        id="taxes"
        title="Detalle de impuestos"
        description="Control de impuestos compras y ventas"
      />

      <TaxesTable />
    </>
  );
};
