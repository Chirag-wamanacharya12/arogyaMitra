/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
 
//--------------------------------------- BMI calculation ----------------------------------------------------

document.getElementById('us-btn').addEventListener('click', function() {
    document.getElementById('us-section').style.display = 'block';
    document.getElementById('metric-section').style.display = 'none';
    this.classList.add('active');
    document.getElementById('metric-btn').classList.remove('active');
});

document.getElementById('metric-btn').addEventListener('click', function() {
    document.getElementById('us-section').style.display = 'none';
    document.getElementById('metric-section').style.display = 'block';
    this.classList.add('active');
    document.getElementById('us-btn').classList.remove('active');
});

function calculateBMI(unit) {
  let height, weight, bmi;
  
  if (unit === 'us') {
      let heightFeet = parseFloat(document.getElementById('height-us-feet').value);
      let heightInches = parseFloat(document.getElementById('height-us-inches').value);
      weight = parseFloat(document.getElementById('weight-us').value);

      height = (heightFeet * 12) + heightInches;
      bmi = (weight / (height * height)) * 703;
  } else {
      height = parseFloat(document.getElementById('height-metric').value);
      weight = parseFloat(document.getElementById('weight-metric').value);

      bmi = weight / ((height / 100) ** 2);
  }
  
  bmi = bmi.toFixed(2);
  addToHistory(bmi);
  updateGauge(bmi); // Update the gauge with the calculated BMI
}

function updateGauge(bmi) {
  const rider = document.getElementById('rider');
  const status = document.getElementById('status');
  const bmiValueElement = document.getElementById('bmi-value');
  
  let topPosition;
  let healthStatus;
  let statusColor;

  if (bmi < 18.5) {
      topPosition = '75%';
      healthStatus = 'Underweight';
      statusColor = '#007BFF'; // Blue
  } else if (bmi >= 18.5 && bmi < 24.9) {
      topPosition = '50%';
      healthStatus = 'Normal';
      statusColor = '#28a745'; // Green
  } else if (bmi >= 25 && bmi < 29.9) {
      topPosition = '25%';
      healthStatus = 'Overweight';
      statusColor = '#ffc107'; // Yellow
  } else {
      topPosition = '0%';
      healthStatus = 'Obesity';
      statusColor = '#dc3545'; // Red
  }

  rider.style.top = topPosition;
  status.textContent = `(${healthStatus})`;
  status.style.color = statusColor;
  bmiValueElement.textContent = `BMI = ${bmi} kg/m²`;
  bmiValueElement.style.color = statusColor;
}

function addToHistory(bmi) {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  const date = now.toLocaleDateString();
  
  const historyItem = document.createElement('li');
  historyItem.textContent = `BMI: ${bmi}`;
  const dateTimeSpan = document.createElement('span');
  dateTimeSpan.textContent = `Date: ${date}, Time: ${time}`;
  
  historyItem.appendChild(dateTimeSpan);

  const historyStack = document.getElementById('history-stack');
  historyStack.appendChild(historyItem);
}

//--------------------------------------- Calorie calculation ----------------------------------------------------

function toggleUnits(unit) {
  document.getElementById('us-section').classList.remove('active');
  document.getElementById('metric-section').classList.remove('active');
  document.getElementById('us-button').classList.remove('active');
  document.getElementById('metric-button').classList.remove('active');
  
  if (unit === 'us') {
      document.getElementById('us-section').classList.add('active');
      document.getElementById('us-button').classList.add('active');
  } else {
      document.getElementById('metric-section').classList.add('active');
      document.getElementById('metric-button').classList.add('active');
  }
}

function calculateCalories() {
  let age, height, weight, cal_gend, activity, bmr, maintenanceCalories;
  const activityFactor = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      'very-active': 1.9,
      'extra-active': 2.2
  };

  if (document.getElementById('us-section').classList.contains('active')) {
      age = parseInt(document.getElementById('us-age').value);
      height = parseInt(document.getElementById('us-height').value);
      weight = parseFloat(document.getElementById('us-weight').value);
      gender = document.querySelector('input[name="us-gender"]:checked').value;
  } else {
      age = parseInt(document.getElementById('metric-age').value);
      height = parseFloat(document.getElementById('metric-height').value) / 2.54; // Convert cm to inches
      weight = parseFloat(document.getElementById('metric-weight').value) * 2.205; // Convert kg to pounds
      gender = document.querySelector('input[name="metric-gender"]:checked').value;
  }

  activity = document.getElementById('activity').value;

  // BMR calculation
  if (gender === 'male') {
      bmr = 66 + (6.23 * weight) + (12.7 * height) - (6.8 * age);
  } else {
      bmr = 655 + (4.35 * weight) + (4.7 * height) - (4.7 * age);
  }

  // Maintenance calories
  maintenanceCalories = bmr * activityFactor[activity];

  // Update results
  document.getElementById('maintain-weight').textContent = `${Math.round(maintenanceCalories)} Calories/day`;
  document.getElementById('mild-loss').textContent = `${Math.round(maintenanceCalories * 0.9)} Calories/day`;
  document.getElementById('weight-loss').textContent = `${Math.round(maintenanceCalories * 0.8)} Calories/day`;
  document.getElementById('extreme-loss').textContent = `${Math.round(maintenanceCalories * 0.61)} Calories/day`;
  document.getElementById('mild-gain').textContent = `${Math.round(maintenanceCalories * 1.1)} Calories/day`;
  document.getElementById('weight-gain').textContent = `${Math.round(maintenanceCalories * 1.2)} Calories/day`;
  document.getElementById('fast-gain').textContent = `${Math.round(maintenanceCalories * 1.39)} Calories/day`;

  // Update gauge pointer
  const gaugePointer = document.getElementById('gauge-pointer');
  gaugePointer.style.height = `${(maintenanceCalories / 4000) * 100}%`;

  // Update history stack
  const historyStack = document.getElementById('history-stack');
  const historyItem = document.createElement('div');
  historyItem.classList.add('history-item');
  historyItem.textContent = `Age: ${age}, Gender: ${gender}, Height: ${height.toFixed(1)} in, Weight: ${weight.toFixed(1)} lbs, Activity: ${activity}, Maintenance: ${Math.round(maintenanceCalories)} Calories/day`;
  historyStack.appendChild(historyItem);

  // Update calorie status
  const calorieStatus = document.getElementById('calorie-status');
  calorieStatus.textContent = `Your maintenance calorie estimate is ${Math.round(maintenanceCalories)} Calories/day.`;
}
