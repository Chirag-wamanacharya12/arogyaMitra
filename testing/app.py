from flask import Flask, render_template, request, jsonify
import matplotlib.pyplot as plt
import io
import base64
from datetime import datetime

app = Flask(__name__)

# In-memory storage for BMI records
bmi_records = []

@app.route('/')
def index():
    return render_template('index.html', records=bmi_records)

@app.route('/calculate_bmi', methods=['POST'])
def calculate_bmi():
    data = request.json
    age = data['age']
    gender = data['gender']
    height_in_inches = data['height_in_inches']
    weight = data['weight']
    
    # Calculate BMI
    height_in_meters = height_in_inches * 0.0254
    weight_in_kg = weight * 0.453592
    bmi = weight_in_kg / (height_in_meters * height_in_meters)
    bmi = round(bmi, 2)
    
    # Record the BMI with the current date and time
    record = {
        'id': len(bmi_records) + 1,  # Unique ID for each record
        'bmi': bmi,
        'date': datetime.now().strftime('%Y-%m-%d %I:%M %p')
    }
    bmi_records.append(record)
    
    return jsonify({'bmi': bmi, 'date': record['date'], 'id': record['id']})

@app.route('/delete_bmi/<int:record_id>', methods=['POST'])
def delete_bmi(record_id):
    global bmi_records
    bmi_records = [record for record in bmi_records if record['id'] != record_id]
    return jsonify({'status': 'success'})

@app.route('/plot_bmi')
def plot_bmi():
    if len(bmi_records) < 10:
        return "Not have sufficient data"
    
    # Use only the last 10 records
    recent_records = bmi_records[-10:]
    
    # Extract dates and BMI values from the recent records
    dates = [record['date'] for record in recent_records]
    bmis = [record['bmi'] for record in recent_records]
    
    # Plotting the BMI over time
    plt.figure(figsize=(8, 6))
    plt.plot(dates, bmis, marker='o')
    plt.xlabel('Date')
    plt.ylabel('BMI')
    plt.title('BMI Progress Over Time')
    plt.xticks(rotation=45, ha='right')
    plt.tight_layout()
    
    # Convert plot to PNG image and base64 encode it
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    graph_url = base64.b64encode(img.getvalue()).decode()
    
    return f'<img src="data:image/png;base64,{graph_url}" />'

if __name__ == '__main__':
    app.run(debug=True)
