from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import spacy

# Load spaCy model
try:
    nlp = spacy.load("en_core_web_sm")
    print("spaCy model loaded successfully in admin chatbot.")
except Exception as e:
    print("Error loading spaCy model in admin chatbot:", e)
    nlp = None

app = Flask(__name__)
CORS(app)

BACKEND_API_URL = "http://localhost:8080/api"

# Admin specific intent keywords and patterns
ADMIN_INTENTS = {
    "list_grievances": ["list", "view", "show", "get", "grievances", "complaints"],
    "greet": ["hello", "hi", "hey"]
    # Add more intents here later, e.g., "update_grievance", "assign_grievance"
}

STATUS_KEYWORDS = ["pending", "in progress", "resolved", "rejected"]

def process_admin_message(message):
    print(f"Received message: {message}") # Debug print
    intent = "unknown"
    status_filter = None
    text = message.lower().strip()
    print(f"Processed text: {text}") # Debug print

    if nlp:
        doc = nlp(text)
        
        # More flexible intent detection using spaCy tokens/lemmas
        # Check for keywords related to listing grievances
        list_keywords_found = any(token.lemma_ in ["list", "view", "show", "get"] for token in doc)
        grievance_keywords_found = any(token.lemma_ in ["grievance", "complaint"] for token in doc)

        if list_keywords_found and grievance_keywords_found:
             intent = "list_grievances"
        elif any(token.lemma_ in ADMIN_INTENTS["greet"] for token in doc):
            intent = "greet"

        # Extract status filter
        for status in STATUS_KEYWORDS:
            if status in text:
                status_filter = status.replace(' ', '').capitalize() # Format for backend API
                break # Assume only one status filter per query for simplicity

    # Fallback to basic keyword matching if NLP model is not loaded or no intent matched with NLP
    if intent == "unknown":
         if any(phrase in text for phrase in ["list all grievances", "view all grievances", "show all grievances", "get all grievances"]):
            intent = "list_grievances"
         elif any(phrase in text for phrase in ADMIN_INTENTS["greet"]):
            intent = "greet"
         
         # Check status filter even in fallback
         for status in STATUS_KEYWORDS:
            if status in text:
                status_filter = status.replace(' ', '').capitalize()
                break
                
    print(f"Detected intent: {intent}, Status filter: {status_filter}") # Debug print
    return intent, status_filter

@app.route("/admin_chat", methods=["POST"])
def admin_chat():
    data = request.json
    user_id = data.get("user_id")
    token = data.get("token")
    message = data.get("message", "")

    if not token:
        return jsonify({"reply": "❌ Authentication token is missing."})

    headers = { "Authorization": f"Bearer {token}" }

    intent, status_filter = process_admin_message(message)

    reply = "🤔 I'm not sure I understood that. You can ask me to 'list all grievances' or 'list all pending grievances'."

    if intent == "greet":
        reply = "👋 Hello Admin! How can I assist you today?"

    elif intent == "list_grievances":
        try:
            endpoint = f"{BACKEND_API_URL}/admin/grievances"
            params = {}
            if status_filter:
                params['status'] = status_filter
                reply = f"Fetching {status_filter.lower()} grievances...\n"
            else:
                 reply = "Fetching all grievances...\n"
                 
            res = requests.get(endpoint, headers=headers, params=params)
            
            if res.status_code == 200:
                grievances = res.json().get("data", [])
                if grievances:
                    reply += "Here are the grievances:\n"
                    for grievance in grievances:
                        reply += f"- ID: {grievance.get('_id')}, Title: {grievance.get('title')}, Status: {grievance.get('status')}, Submitted by: {grievance.get('submittedBy', {}).get('name')}\n"
                else:
                    reply += "No matching grievances found."
            else:
                reply = f"❌ Error fetching grievances: {res.status_code} - {res.text}"

        except Exception as e:
            reply = f"❌ Error fetching grievances: {str(e)}"

    # Save chat log to the backend
    try:
        log_data = {
            "user_id": user_id,
            "message": message,
            "reply": reply
        }
        log_url = f"{BACKEND_API_URL}/chat/log"
        print(f"Attempting to save chat log to {log_url} with data: {log_data}") # Debug print
        # Use a separate headers variable for the chat log endpoint if needed,
        # but assuming the same auth header is sufficient here.
        log_response = requests.post(log_url, json=log_data, headers=headers)
        print(f"Chat log save response status: {log_response.status_code}") # Debug print
        print(f"Chat log save response body: {log_response.text}") # Debug print
        log_response.raise_for_status() # Raise an exception for bad status codes (4xx or 5xx)
        print("Chat log saved successfully.") # Debug print
    except requests.exceptions.RequestException as e:
        print(f"Error saving chat log via HTTP request: {str(e)}") # Debug print for request errors
    except Exception as e:
        print(f"An unexpected error occurred while saving chat log: {str(e)}") # Debug print for other errors

    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True, port=5001) # Use a different port than the student chatbot 