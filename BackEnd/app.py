import os
import joblib
import requests
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv


load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")


app = Flask(__name__)
CORS(app)


model = joblib.load('../Model/fare_model.pkl')


@app.route("/", methods=["GET"])
def home():
    return "Taxi Fare Estimator API is running!"


def get_distance_km(source, destination, city):
    origin = f"{source}, {city}"
    dest = f"{destination}, {city}"
    url = (
    f"https://maps.googleapis.com/maps/api/distancematrix/json"
    f"?origins={origin}&destinations={dest}&mode=driving&key={GOOGLE_API_KEY}"
)


    try:
        response = requests.get(url)
        data = response.json()
        distance_meters = data["rows"][0]["elements"][0]["distance"]["value"]
        return distance_meters / 1000  # Now in KM
    
    except Exception as e:
        print("Distance fetch error:", e)
        return None


@app.route("/calculate-fare", methods=["POST"])
def calculate_fare():
    try:
        data = request.get_json()
        city = data.get("city")
        source = data.get("source")
        destination = data.get("destination")

        if not all([city, source, destination]):
            return jsonify({"error": "Missing required fields"}), 400

        distance_km = get_distance_km(source, destination, city)

        if distance_km is None:
            return jsonify({"error": "Failed to fetch distance"}), 500

        vehicle_types = ["bike", "auto", "car"]
        
        inputs = pd.DataFrame([
            {
                "city": city,
                "source": source,
                "destination": destination,
                "vehicle_type": vt,
                "distance_km": distance_km
            }
            for vt in vehicle_types
        ])

        predictions = model.predict(inputs)
        

        result = {
            vt: f"₹{round(fare, 2)}" if fare >= 0 else "₹0.00"
            for vt, fare in zip(vehicle_types, predictions)
        }
        result["distance"] = f"{round(distance_km, 2)} km"

        return jsonify(result)

    except Exception as e:
        print("Server error:", e)
        return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
