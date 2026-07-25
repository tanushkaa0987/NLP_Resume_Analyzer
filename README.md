# AI Resume Analyzer Website

A modern website with a Flask backend that accepts PDF/DOCX resumes, extracts text, analyzes resume quality with NLP/scoring logic, and returns recommendations to the frontend.

## Features

- Website frontend built with HTML, CSS, and JavaScript
- Flask backend with `/api/analyze`
- PDF extraction with `pdfplumber` and `PyPDF2`
- DOCX extraction with `python-docx`
- Resume scoring for keywords, clarity, impact, and structure
- NLP-friendly analysis using `spaCy` and `scikit-learn`
- Ready for deployment with Gunicorn

## Run Locally

```bash
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
python -m spacy download en_core_web_sm
python app.py
```

Open the website at `http://127.0.0.1:5000` in your browser.

If your virtual environment has a `bin` folder instead of `Scripts`, use `.\.venv\bin\Activate.ps1` and `.\.venv\bin\python.exe app.py`.

If you skip the spaCy model download, the site still runs. If spaCy or scikit-learn are not installed, the backend uses fallback keyword analysis so the website can still start.

## How The Backend Works

1. The website sends the uploaded resume to `POST /api/analyze`.
2. Flask validates that the file is PDF or DOCX.
3. PDF text is extracted with `pdfplumber`, then `PyPDF2` as a fallback.
4. DOCX text is extracted with `python-docx`.
5. The analyzer uses keyword matching, TF-IDF, spaCy, readability checks, impact metrics, and section detection.
6. Flask returns JSON results to the frontend.

## Adding A Real AI Model

The current analyzer is local and free to run. To connect a hosted AI model, add your model call inside `analyze_resume` in `app.py` or create a new helper function such as `run_llm_analysis(text)`.

Keep API keys in environment variables, never in GitHub:

```bash
set OPENAI_API_KEY=your_key_here
```

## Push To GitHub

```bash
git init
git add .
git commit -m "Build AI resume analyzer"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-resume-analyzer.git
git push -u origin main
```

Create the empty repository on GitHub before running the `remote add` command.

## Deploy From GitHub

GitHub Pages only hosts static sites, so it cannot run this Flask backend. Use a Python web host such as Render, Railway, Fly.io, or PythonAnywhere.

### Render Deployment

1. Push this project to GitHub.
2. Go to Render and choose **New Web Service**.
3. Connect your GitHub repository.
4. Use these settings:
   - Build command: `pip install -r requirements.txt && python -m spacy download en_core_web_sm`
   - Start command: `gunicorn app:app`
5. Deploy.

Render will provide a public URL for the full frontend and backend.

## Project Structure

```text
.
├── app.py
├── requirements.txt
├── Procfile
├── templates/
│   └── index.html
└── static/
    ├── css/
    │   └── styles.css
    └── js/
        └── app.js
```
