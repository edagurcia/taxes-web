export const FormErrorMessage = ({ error }) => {
  return (
    <p className="p-1 rounded-md text-red-400 text-sm">{error?.message}</p>
  );
};
