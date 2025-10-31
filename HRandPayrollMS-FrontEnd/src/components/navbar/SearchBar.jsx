export default function SearchBar({
  placeholder = "Search orders, tasks, team, etc...",
  className = "",
  inputClassName = "",
  onChange,
  value,
  hidden = false,
  showOnAllScreens = false,
}) {
  if (hidden) return null;

  return (
    <form
      className={`w-[390px] min-w-[160px] border border-gray-300 bg-white rounded-lg shadow-md ${
        showOnAllScreens ? "flex" : "lg:flex hidden"
      } items-center ${className}`}
    >
      <div className="flex items-center justify-center pl-3">
        <svg 
          className="w-5 h-5 text-gray-500" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </div>
      <input
        className={`w-full text-black placeholder:text-gray-500 bg-transparent px-3 py-2 focus:outline-none ${inputClassName}`}
        type="search"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </form>
  );
}
