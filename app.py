import os
import base64
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

app = Flask(__name__)

# Configure Gemini API
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

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
        
        # Create the model
        model = genai.GenerativeModel('gemini-2.0-flash')
        
        # Prepare the prompt for analyzing whiteboard content
        prompt = """
        Analyze this whiteboard image and provide:
        
        1. **Content Summary**: A clear summary of what's written on the whiteboard
        2. **Key Points**: Extract and list the main ideas, tasks, or concepts
        3. **Action Items**: Identify any tasks, to-dos, or action items
        4. **Next Steps**: Suggest logical next steps or recommendations based on the content
        5. **Organization**: Suggest how to better organize or structure the information if applicable
        
        Please be thorough and helpful in your analysis.
        """
        
        # Generate content with the image
        response = model.generate_content([
            prompt,
            {'mime_type': 'image/jpeg', 'data': image_bytes}
        ])
        
        return jsonify({
            'success': True,
            'analysis': response.text
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health')
def health():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)


