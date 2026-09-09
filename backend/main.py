import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'), override=True)

app = Flask(__name__)
CORS(app)  # Allow CORS for local development

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
# Defaulting to llama3-70b-8192 if not provided, as it's a robust available model on Groq
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama3-8b-8192")

if GROQ_API_KEY:
    client = Groq(api_key=GROQ_API_KEY)
else:
    client = None

def build_system_prompt(profile: dict) -> str:
    return f"""You are GramVenture AI, a personalized AI Business Mentor for first-time rural and semi-urban entrepreneurs.

Your primary purpose is to act as a supportive Business Mentor. You have access to the user's business context, which you should use to personalize your advice when they ask about their business. However, you are also a general-purpose helpful AI, and you should freely answer ALL general questions the user asks, regardless of whether they are about business or not.

USER CONTEXT:
Name: {profile.get('name', 'Not available')}
Business Idea: {profile.get('business', 'Not available')}
Village: {profile.get('village', 'Not available')}
District: {profile.get('district', 'Not available')}
Available Margin Capital: {profile.get('capital', 'Not available')}
Estimated Project Cost: {profile.get('projectCost', 'Not available')}
Estimated Potential Loan: {profile.get('potentialLoan', 'Not available')}
Skills: {profile.get('skills', 'Not available')}
Education: {profile.get('education', 'Not available')}

Your communication style:
- Friendly and Clear
- Beginner-friendly and Practical
- Encouraging but honest
- Simple English

IMPORTANT RULES:
1. Personalize answers using the user's business context when applicable.
2. If the user asks a general knowledge question (unrelated to their business), answer it normally and comprehensively.
3. Do not invent exact market statistics or government scheme eligibility.
4. When discussing financial information, use the provided financial values.
5. Keep responses structured and concise."""

@app.route("/api/chat", methods=["POST"])
def chat_endpoint():
    if not client:
        return jsonify({"detail": "GROQ_API_KEY is not configured on the backend."}), 500

    try:
        data = request.json
        user_message = data.get("message", "")
        user_profile = data.get("user_profile", {})
        conversation_history = data.get("conversation_history", [])

        system_prompt = build_system_prompt(user_profile)
        
        # Build messages payload
        messages = [{"role": "system", "content": system_prompt}]
        
        # Add history (ensure it only contains role and content)
        for msg in conversation_history:
            messages.append({"role": msg["role"], "content": msg["content"]})
            
        # Add current message
        messages.append({"role": "user", "content": user_message})

        chat_completion = client.chat.completions.create(
            messages=messages,
            model=GROQ_MODEL,
        )
        
        answer = chat_completion.choices[0].message.content
        return jsonify({"answer": answer})
        
    except Exception as e:
        print(f"Error calling Groq API: {e}")
        return jsonify({"detail": str(e)}), 500

@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000, debug=True)
