export const Pagination = ({
  dataPerPage,
  totalData,
  paginate,
  isLoading,
  curentPage,
}) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumber.push(i);
  }

  const isDisable = totalData <= dataPerPage;

  return (
    <div className="w-full md:w-1/2 flex gap-1">
      {pageNumber.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`h-8 w-8 ${
            number === curentPage ? "bg-gray-700" : "bg-primary/50"
          } text-white rounded-md hover:bg-primary duration-200`}
          disabled={isDisable || isLoading}
        >
          <span>{number}</span>
        </button>
      ))}
    </div>
  );
};
