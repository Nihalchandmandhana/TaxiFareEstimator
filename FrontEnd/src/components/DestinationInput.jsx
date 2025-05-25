const DestinationInput = ({ locations, value, onChange, disabled }) => {
  return (
    <div className="mb-6 w-full max-w-md mx-auto text-center">
      <label htmlFor="destination" className="block text-sm font-medium text-gray-300 mb-1">
        Destination Location
      </label>
      <select
        id="destination"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full bg-gray-700 border border-gray-600 text-white py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        disabled={disabled}
      >
        <option value="">-- Select destination location --</option>
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DestinationInput;
