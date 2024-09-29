export const getNumberWithDecimals = (val) => {
  const value = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);

  return value;
};
