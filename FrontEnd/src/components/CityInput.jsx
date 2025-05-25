const CityInput = ({ cities, selectedCity, onCityChange }) => {
  return (
    <div className="mb-6 w-full max-w-md mx-auto text-center">
      <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-1">
        Select City
      </label>
      <select
        id="city"
        value={selectedCity}
        onChange={(e) => onCityChange(e.target.value)}
        className="block w-full bg-gray-700 border border-gray-600 text-white py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
      >
        <option value="">-- Select a city --</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CityInput;
