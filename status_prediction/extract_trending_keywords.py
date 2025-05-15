import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer

print("Script started")

# Load your grievances
df = pd.read_csv('grievances_with_datetime.csv')
recent = df[df['createdAt'] > '2024-05-01']  # or filter by last 7 days

# Combine all descriptions
texts = recent['description'].fillna('').tolist()

# TF-IDF
vectorizer = TfidfVectorizer(stop_words='english', max_features=20)
X = vectorizer.fit_transform(texts)
keywords = vectorizer.get_feature_names_out()

# Save keywords to CSV
pd.DataFrame({'keyword': keywords}).to_csv('trending_keywords.csv', index=False)

print("Top trending keywords:", keywords)