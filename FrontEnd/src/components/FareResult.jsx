import {assets} from '../assets/asset.js'

const FareResult = ({ result }) => {
  return (
    <div className="mt-8 p-6 bg-gray-700 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">Fare Details</h2>
      <p className="text-lg font-semibold text-gray-300 mb-6 text-center">
        Distance: {result.distance}
      </p>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <img 
            src={assets.bike}
            alt="Bike"
            className="w-17 h-17"
          />
          <div>
            <h3 className="text-xl font-medium text-white">Bike</h3>
            <p className="text-xl font-bold text-indigo-400">{result.bike}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <img
            src={assets.riksha}
            alt="Auto"
            className="w-17 h-17"
          />
          <div>
            <h3 className="text-xl font-medium text-white">Auto</h3>
            <p className="text-xl font-bold text-indigo-400">{result.auto}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <img
            src={assets.car}
            alt="Car"
            className="w-17 h-17"
          />
          <div>
            <h3 className="text-xl font-medium text-white">Car</h3>
            <p className="text-xl font-bold text-indigo-400">{result.car}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FareResult;
