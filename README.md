# 🎯 WhiteBoardo - AI Whiteboard Assistant

A Flask web application that uses your MacBook's webcam to capture whiteboard content and leverages Google Gemini AI to analyze, summarize, and suggest next steps for your notes and project plans.

## ✨ Features

- 📹 **Live Webcam Feed**: Access your MacBook's webcam directly from the browser
- 📸 **Image Capture**: Capture high-quality snapshots of your whiteboard
- 🤖 **AI Analysis**: Powered by Google Gemini to:
  - Summarize whiteboard content
  - Extract key points and action items
  - Identify tasks and to-dos
  - Suggest next steps and recommendations
  - Provide organization tips
- 🎨 **Modern UI**: Beautiful, responsive interface with dark mode
- ⚡ **Real-time Processing**: Fast image capture and analysis

## 📋 Prerequisites

- Python 3.8 or higher
- MacBook with webcam
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

## 🚀 Installation

1. **Clone the repository**
   ```bash
   cd WhiteBoardo
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
   
   Edit `.env` and add your Google Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

## 🎮 Usage

1. **Start the Flask application**
   ```bash
   python app.py
   ```

2. **Open your browser**
   Navigate to `http://localhost:5000`

3. **Use the application**
   - Click "Start Camera" to activate your webcam
   - Position your whiteboard in view
   - Click "Capture & Analyze" to take a snapshot and send it to Gemini AI
   - View the AI analysis with summaries, key points, and next steps
   - Click "Stop Camera" when done

## 🛠️ Project Structure

```
WhiteBoardo/
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

## 🔑 Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to your `.env` file

## 🎨 Features in Detail

### Webcam Capture
- High-resolution capture (1280x720 ideal)
- Real-time video preview
- Flash effect on capture
- Browser-native media access (no external dependencies)

### AI Analysis
The Gemini AI model provides:
- **Content Summary**: Overview of whiteboard content
- **Key Points**: Main ideas and concepts
- **Action Items**: Tasks and to-dos
- **Next Steps**: Recommendations for progression
- **Organization Tips**: Suggestions for better structure

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


