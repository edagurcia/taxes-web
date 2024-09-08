import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { useTaxes } from "../../hooks";

export const TableBusiness = () => {
  const { isLoading, businesses, selectedBusiness, handleSelectBusiness } =
    useTaxes();

  return (
    <table className="min-w-full bg-white mb-10">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Comercio</th>
          <th className="py-2 px-4 border-b"></th>
        </tr>
      </thead>
      <tbody>
        {businesses?.documents.length > 0 ? (
          businesses?.documents.map((item) => (
            <tr key={item.$id}>
              <td
                className={`py-2 px-4 border-b ${
                  selectedBusiness
                    ? "text-primary font-semibold"
                    : "text-gray-400 font-normal"
                }`}
              >
                {item.commerce_name}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  type="button"
                  disabled={isLoading}
                  className="mr-2"
                  onClick={() => handleSelectBusiness(item)}
                >
                  <FaRegEdit size={18} />
                </button>
                <button type="button" disabled={isLoading}>
                  <FaRegTrashAlt size={18} />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="py-2 px-4 border-b text-center">
              No hay registros aún
            </td>
          </tr>
        )}
      </tbody>
      <tfoot>
        <tr>
          <td>Total de comercios registrados: {businesses?.total}</td>
        </tr>
      </tfoot>
    </table>
  );
};
