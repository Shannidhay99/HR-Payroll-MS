const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center pt-[12%]">
      <div className="w-16 h-16 border-4 border-dashed border-brand-base rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
