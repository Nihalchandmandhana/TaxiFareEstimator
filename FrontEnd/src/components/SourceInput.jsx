const SourceInput = ({ locations, value, onChange, disabled }) => {
  return (
    <div className="mb-4 w-full max-w-md mx-auto">
      <label htmlFor="source" className="block text-sm font-medium text-gray-300 mb-2 text-center">
        Source Location
      </label>
      <select
        id="source"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        disabled={disabled}
      >
        <option value="">Select source location</option>
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SourceInput;
