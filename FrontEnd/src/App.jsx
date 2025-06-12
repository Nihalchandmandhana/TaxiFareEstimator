import { useState } from 'react';
import CityInput from './components/CityInput';
import SourceInput from './components/SourceInput';
import DestinationInput from './components/DestinationInput';
import SubmitButton from './components/SubmitButton';
import FareResult from './components/FareResult';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const App = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [fareResult, setFareResult] = useState(null);



  const cities = {
    Mumbai: ["Gateway of India", "Chhatrapati Shivaji Terminus", "Bandra", "Andheri", "Juhu Beach"],
    Delhi: ["India Gate", "Red Fort", "Connaught Place", "Qutub Minar", "Karol Bagh"],
    Bangalore: ["MG Road", "Electronic City", "Whitefield", "Koramangala", "Hebbal"],
    Jaipur: ["Hawa Mahal", "Amber Fort", "Jal Mahal", "Bani Park", "Jaipur Railway Station"]
  };

  const locations = selectedCity ? cities[selectedCity] : [];
  const hostname = window.location.hostname;
  const backendURL = `http://${hostname}:5000`;


  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedCity || !source || !destination) {
    toast.error('Please select all fields.');
    return;
  }

  try {
    const response = await axios.post(`${backendURL}/calculate-fare`, {
      city: selectedCity,
      source,
      destination
    });

    const { distance, bike, auto, car } = response.data;

    setFareResult({
      distance,
      bike,
      auto,
      car,
    });

  } catch (error) {
    console.error(error);
    toast.error('Failed to fetch fare. Please try again.');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4 py-10">
      <div className="w-full max-w-xl bg-gray-800 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-cyan-400 mb-6">Taxi Fare Estimator</h1>
        <form onSubmit={handleSubmit}>
          <CityInput cities={Object.keys(cities)} selectedCity={selectedCity} 
          onCityChange={(city) => {
          setSelectedCity(city);
          setSource('');
          setDestination('');
          }}/>
          
          <SourceInput locations={locations} value={source} onChange={setSource} disabled={!selectedCity}/>
          <DestinationInput locations={locations} value={destination} onChange={setDestination} disabled={!selectedCity}/>
          <SubmitButton disabled={!selectedCity || !source || !destination} />

        </form>
        {fareResult && <FareResult result={fareResult} />}
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
