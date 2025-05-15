import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import joblib

# 1. Load your data
df = pd.read_csv('grievances.csv')

# 2. Combine text fields into a single feature
df['text'] = (
    df['title'].fillna('') + ' ' +
    df['description'].fillna('') + ' ' +
    df['category'].fillna('') + ' ' +
    df['priority'].fillna('')
)

# 3. Features and labels
X = df['text']
y = df['status']

# 4. Split into train and test sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 5. Vectorize the text
vectorizer = TfidfVectorizer()
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# 6. Train the model
clf = RandomForestClassifier()
clf.fit(X_train_vec, y_train)

# 7. Evaluate the model
y_pred = clf.predict(X_test_vec)
print(classification_report(y_test, y_pred))

# 8. Save the model and vectorizer
joblib.dump(clf, 'status_predictor.pkl')
joblib.dump(vectorizer, 'vectorizer.pkl')

print("Model and vectorizer saved!")