import { FaSearch } from "react-icons/fa";

export const FilterInput = ({
  placeholder = "Buscar...",
  filterText = "",
  onFilter,
  max = 50,
}) => {
  return (
    <div className="w-full md:w-1/2  flex gap-1 items-center border-b">
      <FaSearch className="text-gray-400" size={20} />
      <input
        type="search"
        name="search"
        placeholder={placeholder}
        value={filterText}
        onChange={onFilter}
        maxLength={max}
        className="flex items-center p-1 bg-transparent focus:outline-none"
        autoComplete="off"
      />{" "}
    </div>
  );
};
