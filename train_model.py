import mysql.connector
import pandas as pd
import joblib
import os
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# 1. Database Connection
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'sql_root',
    'database': 'soip'
}

print("Fetching training data from MySQL database...")
conn = mysql.connector.connect(**db_config)

# 2. Extract Data via SQL Join
query = """
SELECT 
    te.Attendance_Percentage,
    te.Assessment_Score,
    c.Duration_Days,
    c.Sector,
    c.Skill_Level,
    IF(er.Employment_Status = 'Employed', 1, 0) AS Placed
FROM training_enrollments te
JOIN courses c ON te.Course_id = c.Course_id
LEFT JOIN employment_records er ON te.Trainee_ID = er.Trainee_ID;
"""

df = pd.read_sql(query, conn)
conn.close()

# Replace NULL values in Placed column with 0 (Unemployed)
df['Placed'] = df['Placed'].fillna(0).astype(int)
df['Attendance_Percentage'] = df['Attendance_Percentage'].astype(float)
df['Assessment_Score'] = df['Assessment_Score'].astype(float)

print(f"Loaded {len(df)} records.")

# 3. One-Hot Encoding for Categorical Features (Sector & Skill_Level)
df_encoded = pd.get_dummies(df, columns=['Sector', 'Skill_Level'], drop_first=True)

X = df_encoded.drop('Placed', axis=1)
y = df_encoded['Placed']

# Save column names to keep prediction input aligned later
feature_columns = X.columns.tolist()

# 4. Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 5. Model Training
print("Training Random Forest Classifier model...")
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 6. Model Evaluation
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print(f"\nModel Training Complete!")
print(f"Accuracy: {accuracy * 100:.2f}%")
print("\nClassification Report:\n", classification_report(y_test, y_pred))

# 7. Save Model & Features Metadata
os.makedirs('ML/saved_models', exist_ok=True)
joblib.dump(model, 'ML/saved_models/placement_model.pkl')
joblib.dump(feature_columns, 'ML/saved_models/model_features.pkl')

print("Saved trained model to 'ML/saved_models/placement_model.pkl'")