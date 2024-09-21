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
import { useRtn } from "@/hooks";
import { FilterInput } from "@/components/maitenance/FilterInput";
import { Pagination } from "@/components/shared/Pagination";

export const TableRTNS = () => {
  const [filterText, setFilterText] = useState("");
  const [curentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(5);

  const { isLoading, rtns, selectedRtn, handleSelectRtn } = useRtn();

  const indexOfLastData = curentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;

  const actualData =
    rtns?.documents && rtns?.documents.slice(indexOfFirstData, indexOfLastData);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredData = rtns?.documents
    ? rtns?.documents?.filter(
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
          placeholder="Buscar RTN..."
          max={30}
        />
      );
    },
    [filterText]
  );

  const dataSet = filterText ? filteredData : actualData;

  return (
    <div className="min-w-full bg-white mb-10">
      {FilterComponent}
      <Table className="w-full">
        <TableCaption>
          <Pagination
            dataPerPage={dataPerPage}
            totalData={rtns?.total}
            paginate={paginate}
            isLoading={isLoading}
            curentPage={curentPage}
          />
          Tiene {rtns?.total} RTN's registrados
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>RTN</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Editar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rtns?.documents.length > 0 ? (
            dataSet.map((item) => (
              <TableRow key={item.$id}>
                <TableCell
                  className={`py-2 px-4 border-b ${
                    selectedRtn?.RTN === item.RTN
                      ? "text-primary font-semibold"
                      : "text-gray-400 font-normal"
                  }`}
                >
                  {item.RTN}
                </TableCell>
                <TableCell
                  className={`py-2 px-4 border-b ${
                    selectedRtn?.RTN_Name === item.RTN_Name
                      ? "text-primary font-semibold"
                      : "text-gray-400 font-normal"
                  }`}
                >
                  {item.RTN_Name}
                </TableCell>
                <TableCell className="py-2 px-4 border-b">
                  <button
                    type="button"
                    disabled={isLoading}
                    className="mr-1"
                    onClick={() => handleSelectRtn(item)}
                  >
                    <FaRegEdit size={18} />
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="4" className="py-2 px-4 border-b text-center">
                No hay registros aún
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
