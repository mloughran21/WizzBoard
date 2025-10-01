import os
import base64
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import google.generativeai as genai
from openai import OpenAI

load_dotenv()

app = Flask(__name__)

# Configure Gemini API
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

# Configure OpenAI API
openai_client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze_whiteboard():
    try:
        data = request.get_json()
        image_data = data.get('image')
        
        if not image_data:
            return jsonify({'error': 'No image provided'}), 400
        
        # Remove the data URL prefix if present
        if ',' in image_data:
            image_data = image_data.split(',')[1]
        
        # Decode base64 image
        image_bytes = base64.b64decode(image_data)
        
        # Step 1: Use Gemini to extract/read the whiteboard content
        gemini_model = genai.GenerativeModel('gemini-2.0-flash')
        
        extraction_prompt = """
        Please carefully read and extract ALL text and content from this whiteboard image.
        Include:
        - All written text (even if handwriting is unclear, do your best)
        - Diagrams, drawings, or visual elements described
        - Any structure (lists, bullet points, hierarchies, connections)
        - Notes, arrows, or annotations
        
        Provide a complete, detailed transcription of everything visible on the whiteboard.
        """
        
        # Extract content with Gemini
        gemini_response = gemini_model.generate_content([
            extraction_prompt,
            {'mime_type': 'image/jpeg', 'data': image_bytes}
        ])
        
        extracted_content = gemini_response.text
        
        # Step 2: Use GPT-4 to analyze the extracted content
        analysis_prompt = f"""
You are an expert project manager and strategic analyst. A whiteboard has been captured and its content extracted. Please provide a comprehensive analysis:

**Extracted Whiteboard Content:**
{extracted_content}

**Please provide:**

1. **Content Summary**: A clear, concise summary of the main topic and purpose

2. **Key Points**: Extract and organize the most important ideas, concepts, or information

3. **Action Items**: Identify specific tasks, to-dos, or action items that need to be done

4. **Next Steps**: Suggest logical next steps and priorities for moving forward

5. **Strategic Recommendations**: Provide insights on how to better organize, structure, or approach this work

6. **Potential Challenges**: Identify any risks, dependencies, or blockers that should be considered

Be thorough, actionable, and strategic in your analysis.
"""
        
        gpt_response = openai_client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an expert project manager and strategic analyst who helps people turn whiteboard notes into actionable plans."},
                {"role": "user", "content": analysis_prompt}
            ],
            temperature=0.7,
            max_tokens=2000
        )
        
        analysis = gpt_response.choices[0].message.content
        
        return jsonify({
            'success': True,
            'analysis': analysis,
            'extracted_content': extracted_content
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health')
def health():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)


