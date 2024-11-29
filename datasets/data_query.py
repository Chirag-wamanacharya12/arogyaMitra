import pandas as pd

# Load the Excel sheet
df = pd.read_excel('Heart_Disease_Prediction.xlsx', sheet_name='Sheet1')

# Query the data (example: filter where Age > 30)
result = df[df['Age'] > 30]

print(result)
