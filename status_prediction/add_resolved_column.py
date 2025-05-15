import pandas as pd

print("Script started")

# Load the CSV file
df = pd.read_csv('grievances.csv')

# Check the first few rows and columns
print("Columns in CSV:", df.columns.tolist())
print(df.head())

# Create the new column: 1 if status is 'Resolved', else 0
df['will_be_resolved'] = (df['status'].str.lower() == 'resolved').astype(int)

# Save to a new CSV
df.to_csv('grievances_with_target.csv', index=False)
print("Saved grievances_with_target.csv with will_be_resolved column.")