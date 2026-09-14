#  NLP Resume Analyzer

A web-based resume analyzer that allows users to upload **PDF or DOCX resumes** and receive a score with actionable feedback on resume quality.

The project uses a **Flask backend**, document parsing, NLP techniques, and rule-based scoring to analyze different aspects of a resume.

## 🚀 Features

* Upload resumes in **PDF or DOCX** format
* Extract text from uploaded resumes
* Analyze **keywords, clarity, impact, and structure**
* Detect important resume sections
* Generate an overall **resume score**
* Provide actionable recommendations for improvement
* Responsive frontend built with **HTML, CSS, and JavaScript**
* REST API built with **Flask**
* NLP analysis using **spaCy** and **scikit-learn**
* Fallback analysis when NLP dependencies are unavailable

## 🛠️ Tech Stack

**Frontend**

* HTML
* CSS
* JavaScript

**Backend**

* Python
* Flask

**NLP & Analysis**

* spaCy
* scikit-learn
* TF-IDF
* Keyword analysis
* Readability and impact metrics

**Document Processing**

* pdfplumber
* PyPDF2
* python-docx

## 🔍 How It Works

1. User uploads a PDF or DOCX resume.
2. Flask receives the file through the `/api/analyze` endpoint.
3. The backend extracts the resume text.
4. The analyzer evaluates keywords, sections, readability, clarity, and impact.
5. The results are returned to the frontend as JSON.
6. The website displays the resume score and improvement suggestions.

## 📁 Project Structure

```text
AI-Resume-Analyzer/
│
├── app.py
├── requirements.txt
├── Procfile
│
├── templates/
│   └── index.html
│
└── static/
    ├── css/
    │   └── styles.css
    └── js/
        └── app.js
```

## 💻 Run Locally

```bash
git clone https://github.com/YOUR_USERNAME/ai-resume-analyzer.git
cd ai-resume-analyzer

python -m venv .venv
.venv\Scripts\activate

pip install -r requirements.txt
python -m spacy download en_core_web_sm

python app.py
```

Open:

```text
http://127.0.0.1:5000
```

## ☁️ Deployment

The Flask application can be deployed using platforms such as **Render, Railway, Fly.io, or PythonAnywhere**.

For Render:

**Build Command**

```bash
pip install -r requirements.txt && python -m spacy download en_core_web_sm
```

**Start Command**

```bash
gunicorn app:app
```

## 🔮 Future Improvements

* Integrate a real LLM for deeper resume feedback
* Add job-description matching
* Improve ATS compatibility analysis
* Add personalized improvement suggestions
* Support additional resume formats

## 👩‍💻 What This Project Demonstrates

* Building a full-stack web application
* Designing and consuming REST APIs
* PDF/DOCX document processing
* Applying NLP and text-analysis techniques
* Implementing resume scoring logic
* Connecting a JavaScript frontend with a Python backend
* Preparing a Flask application for deployment
