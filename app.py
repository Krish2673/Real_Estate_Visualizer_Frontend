from flask import Flask, request, jsonify
from catboost import CatBoostRegressor
import pandas as pd
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = CatBoostRegressor()
model.load_model('catboost_model.cbm')

with open('suburban_map.json') as f:
    suburban_map = json.load(f)

with open('avg_price_per_area.json') as f:
    price_area_map = json.load(f)

@app.route('/')
def home():
    return 'Real Estate Price Prediction API (CatBoost) is running!'

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        suburb = data.get("Sub_urban_name")
        latlon = suburban_map.get(suburb)
        price_per_unit_area = price_area_map.get(suburb, 5000)
        if latlon is None or 'Latitude' not in latlon or 'Longitude' not in latlon:
            print(f"[ERROR] Suburb '{suburb}' not found or incomplete in suburban_map.")
            latlon = {"Latitude": 0.0, "Longitude": 0.0}

        input_data = {
            'City_name': str(data.get('City_name')),
            'Property_type': str(data.get('Property_type')),
            'Property_status': str(data.get('Property_status')),
            'Sub_urban_name': str(suburb),
            'is_furnished': str(data.get('is_furnished')),
            'is_ready_to_move': str(data.get('is_ready_to_move', False)),
            'No_of_BHK': str(int(str(data.get('No_of_BHK', '1')).split()[0])),
            'Size': data.get('Size', 0),
            'Latitude': latlon['Latitude'],
            'Longitude': latlon['Longitude'],
            'Price_per_unit_area': price_per_unit_area
        }

        input_df = pd.DataFrame([input_data])

        predicted_price = model.predict(input_df)[0]

        return jsonify({
            'predicted_price': round(predicted_price, 2)
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
