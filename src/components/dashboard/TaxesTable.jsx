import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaRegEdit } from "react-icons/fa";
import { useTaxes } from "@/hooks";
import { shortDate } from "@/helpers/formatDate";
import { getNumberWithDecimals } from "@/helpers/formatNumbers";
import { FilterInput } from "@/components/shared/FilterInput";
import { Pagination } from "@/components/shared/Pagination";

export const TaxesTable = () => {
  const [filterText, setFilterText] = useState("");
  const [curentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(25);
  const { isLoading, taxes, selectedTax, selectedPeriod, handleSelectTax } =
    useTaxes();

  const indexOfLastData = curentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;

  const periodData =
    taxes?.documents &&
    taxes?.documents?.filter(
      (data) => data?.month === selectedPeriod?.strMonth
    );

  const actualData =
    periodData && periodData?.slice(indexOfFirstData, indexOfLastData);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredData = periodData
    ? periodData?.filter(
        (item) =>
          JSON.stringify(item)
            .toLowerCase()
            .indexOf(filterText.toLowerCase()) !== -1
      )
    : [];

  const FilterComponent = useMemo(
    function subComponent() {
      return (
        <FilterInput
          filterText={filterText}
          onFilter={(e) => setFilterText(e.target.value?.toLowerCase())}
          placeholder="Buscar impuesto..."
          max={30}
        />
      );
    },
    [filterText]
  );

  const dataSet = filterText ? filteredData : actualData;

  return isLoading ? (
    <></>
  ) : (
    <div className="min-w-full bg-white mb-10">
      {FilterComponent}
      <Table className="w-full">
        {periodData?.length > 0 && (
          <TableCaption className="p-4">
            <Pagination
              dataPerPage={dataPerPage}
              totalData={periodData?.length}
              paginate={paginate}
              isLoading={isLoading}
              curentPage={curentPage}
            />
            Tiene {periodData?.length} impuestos registrados
          </TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead># Doc.</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead>Impuesto</TableHead>
            <TableHead>Comercio</TableHead>
            <TableHead>RTN</TableHead>
            <TableHead>A favor</TableHead>
            <TableHead>Editar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataSet?.length > 0 ? (
            dataSet?.map((item) => (
              <TableRow key={item.$id}>
                <TableCell
                  className={`py-2 px-4 border-b ${
                    selectedTax?.document_number === item.document_number
                      ? "text-primary font-semibold"
                      : "text-gray-400 font-normal"
                  }`}
                >
                  {item.document_number}
                </TableCell>
                <TableCell
                  className={`py-2 px-4 border-b ${
                    selectedTax?.document_number === item.document_number
                      ? "text-primary font-semibold"
                      : "text-gray-400 font-normal"
                  }`}
                >
                  {shortDate(item.transaction_date)}
                </TableCell>
                <TableCell
                  className={`py-2 px-4 border-b capitalize ${
                    selectedTax?.document_number === item.document_number
                      ? "text-primary font-semibold"
                      : "text-gray-400 font-normal"
                  }`}
                >
                  {item.transaction_type}
                </TableCell>
                {item?.transaction_type === "compra" && (
                  <TableCell
                    className={`py-2 px-4 border-b ${
                      selectedTax?.document_number === item.document_number
                        ? "text-primary font-semibold"
                        : "text-gray-400 font-normal"
                    }`}
                  >
                    {getNumberWithDecimals(item.purchase_amount)}
                  </TableCell>
                )}
                {item?.transaction_type === "venta" && (
                  <TableCell
                    className={`py-2 px-4 border-b ${
                      selectedTax?.document_number === item.document_number
                        ? "text-primary font-semibold"
                        : "text-gray-400 font-normal"
                    }`}
                  >
                    {getNumberWithDecimals(item.sale_amount)}
                  </TableCell>
                )}
                <TableCell
                  className={`py-2 px-4 border-b ${
                    selectedTax?.document_number === item.document_number
                      ? "text-primary font-semibold"
                      : "text-gray-400 font-normal"
                  }`}
                >
                  {getNumberWithDecimals(item.tax)}
                </TableCell>
                <TableCell
                  className={`py-2 px-4 border-b ${
                    selectedTax?.document_number === item.document_number
                      ? "text-primary font-semibold"
                      : "text-gray-400 font-normal"
                  }`}
                >
                  {item.business?.commerce_name
                    ? item.business?.commerce_name
                    : "pendiente"}
                </TableCell>
                <TableCell
                  className={`py-2 px-4 border-b ${
                    selectedTax?.document_number === item.document_number
                      ? "text-primary font-semibold"
                      : "text-gray-400 font-normal"
                  }`}
                >
                  {item.rtn?.RTN}
                </TableCell>
                <TableCell
                  className={`py-2 px-4 border-b ${
                    selectedTax?.document_number === item.document_number
                      ? "text-primary font-semibold"
                      : "text-gray-400 font-normal"
                  }`}
                >
                  {getNumberWithDecimals(item.credit_tax)}
                </TableCell>
                <TableCell className="py-2 px-4 border-b">
                  <button
                    type="button"
                    disabled={isLoading}
                    className="mr-1"
                    onClick={() => handleSelectTax(item)}
                  >
                    <FaRegEdit size={18} />
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="w-full">
              <TableCell
                colSpan="10"
                className="py-2 px-4 border-b text-center"
              >
                No hay registros aún
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
