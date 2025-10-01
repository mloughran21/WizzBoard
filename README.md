# 🎯 WizzBoard - AI Whiteboard Assistant

A Flask web application that uses your MacBook's webcam to capture whiteboard content. It uses Google Gemini AI for vision (reading the whiteboard) and GPT-4 for deep analysis, providing comprehensive summaries, action items, and strategic recommendations for your notes and project plans.

## ✨ Features

- 📹 **Live Webcam Feed**: Access your MacBook's webcam directly from the browser
- 📸 **Image Capture**: Capture high-quality snapshots of your whiteboard
- 📁 **Image Upload**: Upload existing whiteboard photos for analysis
- 🤖 **Dual AI Analysis**: 
  - **Gemini Vision**: Extracts and reads all content from the whiteboard
  - **GPT-4 Analysis**: Provides deep strategic analysis including:
    - Content summaries
    - Key points and concepts
    - Action items and to-dos
    - Next steps and priorities
    - Strategic recommendations
    - Potential challenges and risks
- 🎨 **Modern UI**: Beautiful, responsive interface with dark mode
- ⚡ **Real-time Processing**: Fast image capture and dual-AI analysis

## 📋 Prerequisites

- Python 3.8 or higher
- MacBook with webcam
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

## 🚀 Installation

1. **Clone the repository**
   ```bash
   cd WizzBoard
   ```

2. **Create a virtual environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On macOS/Linux
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your API keys:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   OPENAI_API_KEY=your_openai_api_key_here
   ```

## 🎮 Usage

1. **Start the Flask application**
   ```bash
   python app.py
   ```

2. **Open your browser**
   Navigate to `http://localhost:5000`

3. **Use the application**
   
   **Option 1: Live Camera Capture**
   - Click "Start Camera" to activate your webcam
   - Position your whiteboard in view
   - Click "Capture & Analyze" to take a snapshot
   - Click "Stop Camera" when done
   
   **Option 2: Upload Image**
   - Click "Upload Image" to select an existing whiteboard photo
   - The image will be automatically analyzed
   
   View the dual AI analysis with summaries, key points, action items, and strategic recommendations!

## 🛠️ Project Structure

```
WizzBoard/
├── app.py                  # Flask application backend
├── templates/
│   └── index.html         # Main HTML template
├── static/
│   ├── css/
│   │   └── style.css      # Styling
│   └── js/
│       └── app.js         # Frontend JavaScript
├── requirements.txt        # Python dependencies
├── .env.example           # Environment variables template
└── README.md              # This file
```

## 🔑 Getting API Keys

### Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to your `.env` file

### OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key and add it to your `.env` file
5. Note: GPT-4 access requires a paid OpenAI account

## 🎨 Features in Detail

### Webcam Capture
- High-resolution capture (1280x720 ideal)
- Real-time video preview
- Flash effect on capture
- Browser-native media access (no external dependencies)

### Dual AI Analysis
**Step 1 - Gemini Vision**: Reads and extracts all content from the whiteboard image
- Transcribes handwritten and printed text
- Describes diagrams and visual elements
- Captures structure and relationships

**Step 2 - GPT-4 Strategic Analysis**: Analyzes the extracted content to provide:
- **Content Summary**: Clear overview of the main topic
- **Key Points**: Organized important ideas and concepts
- **Action Items**: Specific tasks that need to be done
- **Next Steps**: Logical priorities for moving forward
- **Strategic Recommendations**: Insights on organization and approach
- **Potential Challenges**: Risks, dependencies, and blockers to consider

### User Interface
- Dark mode design for reduced eye strain
- Responsive layout for different screen sizes
- Visual feedback for all actions
- Loading indicators during processing
- Side-by-side view of captured image and analysis

## 🔒 Security Notes

- Never commit your `.env` file with the actual API key
- The `.env` file is gitignored by default
- Keep your API key secure and don't share it publicly

## 🐛 Troubleshooting

**Camera not working?**
- Make sure you've granted camera permissions to your browser
- Check if another application is using the camera
- Try refreshing the page

**API errors?**
- Verify your API key is correct in `.env`
- Check your internet connection
- Ensure you haven't exceeded your API quota

**Installation issues?**
- Make sure you're using Python 3.8+
- Try upgrading pip: `pip install --upgrade pip`
- Create a fresh virtual environment

## 📝 License

This project is open source and available for personal and educational use.

## 🤝 Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

## 🙏 Acknowledgments

- Built with [Flask](https://flask.palletsprojects.com/)
- Powered by [Google Gemini AI](https://deepmind.google/technologies/gemini/)
- Uses browser-native WebRTC for camera access

---

Made with ❤️ for better whiteboard productivity


