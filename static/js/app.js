// DOM Elements
const webcam = document.getElementById('webcam');
const canvas = document.getElementById('canvas');
const startBtn = document.getElementById('startBtn');
const captureBtn = document.getElementById('captureBtn');
const stopBtn = document.getElementById('stopBtn');
const uploadInput = document.getElementById('uploadInput');
const status = document.getElementById('status');
const loading = document.getElementById('loading');
const capturedImageContainer = document.getElementById('capturedImageContainer');
const capturedImage = document.getElementById('capturedImage');
const analysisContainer = document.getElementById('analysisContainer');
const analysisContent = document.getElementById('analysisContent');
const overlay = document.getElementById('overlay');

let stream = null;

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    // Check if browser supports mediaDevices
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        showStatus('Your browser does not support camera access. Please use a modern browser like Chrome, Firefox, or Safari, and ensure you are accessing via localhost or HTTPS.', 'error');
        startBtn.disabled = true;
    }
});

// Start webcam
startBtn.addEventListener('click', async () => {
    try {
        // Check for secure context
        if (!window.isSecureContext && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
            showStatus('Camera access requires HTTPS or localhost. Please access the app via http://localhost:5000', 'error');
            return;
        }
        
        stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                width: { ideal: 1280 },
                height: { ideal: 720 }
            } 
        });
        webcam.srcObject = stream;
        
        startBtn.disabled = true;
        captureBtn.disabled = false;
        stopBtn.disabled = false;
        
        showStatus('Camera started successfully!', 'success');
    } catch (err) {
        showStatus('Error accessing camera: ' + err.message, 'error');
        console.error('Error accessing webcam:', err);
    }
});

// Stop webcam
stopBtn.addEventListener('click', () => {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        webcam.srcObject = null;
        stream = null;
        
        startBtn.disabled = false;
        captureBtn.disabled = true;
        stopBtn.disabled = true;
        
        showStatus('Camera stopped', 'info');
    }
});

// Handle image upload
uploadInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        showStatus('Please upload a valid image file', 'error');
        return;
    }
    
    try {
        showStatus('Processing uploaded image...', 'info');
        
        // Read file as data URL
        const reader = new FileReader();
        reader.onload = async (e) => {
            const imageData = e.target.result;
            
            // Display uploaded image
            capturedImage.src = imageData;
            capturedImageContainer.classList.remove('hidden');
            
            // Analyze the image
            await analyzeImage(imageData);
        };
        
        reader.onerror = () => {
            showStatus('Error reading file', 'error');
        };
        
        reader.readAsDataURL(file);
        
        // Reset input
        event.target.value = '';
        
    } catch (err) {
        showStatus('Error processing image: ' + err.message, 'error');
        console.error('Error:', err);
    }
});

// Analyze image function (used by both capture and upload)
async function analyzeImage(imageData) {
    try {
        // Show loading
        loading.classList.remove('hidden');
        analysisContainer.classList.add('hidden');
        
        showStatus('Analyzing whiteboard...', 'info');
        
        // Send to backend for analysis
        const response = await fetch('/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: imageData })
        });
        
        const result = await response.json();
        
        loading.classList.add('hidden');
        
        if (result.success) {
            // Display analysis results
            analysisContent.innerHTML = formatAnalysis(result.analysis);
            analysisContainer.classList.remove('hidden');
            showStatus('Analysis complete!', 'success');
        } else {
            showStatus('Error: ' + result.error, 'error');
        }
        
    } catch (err) {
        loading.classList.add('hidden');
        showStatus('Error analyzing image: ' + err.message, 'error');
        console.error('Error:', err);
    }
}

// Capture and analyze
captureBtn.addEventListener('click', async () => {
    try {
        // Set canvas dimensions to match video
        canvas.width = webcam.videoWidth;
        canvas.height = webcam.videoHeight;
        
        // Draw current frame to canvas
        const ctx = canvas.getContext('2d');
        ctx.drawImage(webcam, 0, 0);
        
        // Show capture flash effect
        overlay.classList.remove('hidden');
        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 300);
        
        // Get image as base64
        const imageData = canvas.toDataURL('image/jpeg', 0.9);
        
        // Display captured image
        capturedImage.src = imageData;
        capturedImageContainer.classList.remove('hidden');
        
        // Analyze the image
        await analyzeImage(imageData);
        
    } catch (err) {
        loading.classList.add('hidden');
        showStatus('Error capturing image: ' + err.message, 'error');
        console.error('Error:', err);
    }
});

// Format analysis text (convert markdown-like formatting to HTML)
function formatAnalysis(text) {
    // Convert markdown formatting to HTML
    let formatted = text
        // Headers
        .replace(/### (.*?)$/gm, '<h4>$1</h4>')
        .replace(/## (.*?)$/gm, '<h3>$1</h3>')
        .replace(/# (.*?)$/gm, '<h2>$1</h2>')
        // Bold
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Lists
        .replace(/^\* (.*?)$/gm, '<li>$1</li>')
        .replace(/^- (.*?)$/gm, '<li>$1</li>')
        .replace(/^\d+\. (.*?)$/gm, '<li>$1</li>')
        // Line breaks
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');
    
    // Wrap lists in ul tags
    formatted = formatted.replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>');
    
    // Wrap in paragraphs
    formatted = '<p>' + formatted + '</p>';
    
    // Clean up extra paragraph tags
    formatted = formatted.replace(/<p><\/p>/g, '');
    formatted = formatted.replace(/<p>(<h[234]>)/g, '$1');
    formatted = formatted.replace(/(<\/h[234]>)<\/p>/g, '$1');
    formatted = formatted.replace(/<p>(<ul>)/g, '$1');
    formatted = formatted.replace(/(<\/ul>)<\/p>/g, '$1');
    
    return formatted;
}

// Show status message
function showStatus(message, type) {
    status.textContent = message;
    status.className = 'status status-' + type;
    status.style.display = 'block';
    
    if (type === 'success' || type === 'info') {
        setTimeout(() => {
            status.style.display = 'none';
        }, 5000);
    }
}


