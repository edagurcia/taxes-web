import { Header } from "./Header";
import { FormBusiness } from "./FormBusiness";
import { TableBusiness } from "./TableBusiness";

export const Businesses = () => {
  return (
    <>
      <Header
        id="business"
        title="Comercios registrados"
        description="Mantenimiento de comercios"
      />

      <FormBusiness />

      <TableBusiness />
    </>
  );
};
