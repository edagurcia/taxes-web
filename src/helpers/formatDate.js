export const shortDate = (val) => {
  const date = new Date(val);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "GMT",
  };

  return date.toLocaleDateString("es-MX", options);
};
