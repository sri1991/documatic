import json
import sqlite3

# Open the JSON file
with open('path/to/your/json/file.json') as file:
    data = json.load(file)

# Connect to the SQLite database
conn = sqlite3.connect('path/to/your/database.db')
cursor = conn.cursor()

# Create the customers table if it doesn't exist
cursor.execute('''
    CREATE TABLE IF NOT EXISTS customers (
        name TEXT,
        email TEXT,
        phone_number TEXT
    )
''')

# Extract and insert data into the customers table
for item in data:
    name = item['Name']
    email = item['Email']
    phone_number = item['Phone Number']
    
    cursor.execute('''
        INSERT INTO customers (name, email, phone_number)
        VALUES (?, ?, ?)
    ''', (name, email, phone_number))

# Commit the changes and close the database connection
conn.commit()
conn.close()