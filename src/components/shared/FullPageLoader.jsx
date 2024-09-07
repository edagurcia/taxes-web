export const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 z-50">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-primary/90 h-24 w-24"></div>
    </div>
  );
};
