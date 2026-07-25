const form = document.querySelector("#uploadForm");
const resumeInput = document.querySelector("#resumeInput");
const dropZone = document.querySelector("#dropZone");
const fileName = document.querySelector("#fileName");
const statusMessage = document.querySelector("#statusMessage");
const analyzeButton = document.querySelector("#analyzeButton");
const results = document.querySelector("#results");

const scoreMap = {
  keyword_match: ["#keywordScore", "#keywordBar"],
  clarity: ["#clarityScore", "#clarityBar"],
  impact: ["#impactScore", "#impactBar"],
  resume_structure: ["#structureScore", "#structureBar"],
};

function setStatus(message, type = "info") {
  statusMessage.textContent = message;
  statusMessage.classList.toggle("error", type === "error");
}

function setFile(file) {
  if (!file) {
    fileName.textContent = "No file selected";
    return;
  }

  fileName.textContent = file.name;
}

function renderChips(selector, values, emptyText = "None detected") {
  const container = document.querySelector(selector);
  container.innerHTML = "";

  if (!values || values.length === 0) {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = emptyText;
    container.appendChild(chip);
    return;
  }

  values.forEach((value) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = value;
    container.appendChild(chip);
  });
}

function renderList(selector, values) {
  const list = document.querySelector(selector);
  list.innerHTML = "";

  values.forEach((value) => {
    const item = document.createElement("li");
    item.textContent = value;
    list.appendChild(item);
  });
}

function renderScore(selector, barSelector, value) {
  document.querySelector(selector).textContent = `${value}%`;
  document.querySelector(barSelector).style.width = `${value}%`;
}

function renderResults(data) {
  results.classList.remove("hidden");

  document.querySelector("#overallScore").textContent = data.overall_score;
  document.querySelector("#targetRole").textContent = data.target_role;
  document.querySelector("#summaryText").textContent =
    `Found ${data.word_count} words with ${data.matched_keywords.length} matched keywords and ${data.recommendations.length} improvement suggestions.`;

  Object.entries(scoreMap).forEach(([key, selectors]) => {
    renderScore(selectors[0], selectors[1], data.scores[key]);
  });

  renderList("#recommendations", data.recommendations);
  renderChips("#matchedKeywords", data.matched_keywords, "No target keywords found");
  renderChips("#missingKeywords", data.missing_keywords, "No major keyword gaps");
  renderChips("#detectedSkills", data.detected_skills, "No skills detected");

  document.querySelector("#wordCount").textContent = data.word_count;
  document.querySelector("#foundSections").textContent = data.found_sections.length ? data.found_sections.join(", ") : "None";
  document.querySelector("#actionVerbs").textContent = data.action_verbs.length ? data.action_verbs.join(", ") : "None";
  document.querySelector("#impactNumbers").textContent = data.impact_numbers.length ? data.impact_numbers.join(", ") : "None";
  document.querySelector("#textPreview").textContent = data.preview;

  results.scrollIntoView({ behavior: "smooth", block: "start" });
}

resumeInput.addEventListener("change", () => {
  setFile(resumeInput.files[0]);
});

["dragenter", "dragover"].forEach((eventName) => {
  dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropZone.classList.add("drag-over");
  });
});

["dragleave", "drop"].forEach((eventName) => {
  dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropZone.classList.remove("drag-over");
  });
});

dropZone.addEventListener("drop", (event) => {
  const [file] = event.dataTransfer.files;
  if (!file) return;

  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  resumeInput.files = dataTransfer.files;
  setFile(file);
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const [file] = resumeInput.files;
  if (!file) {
    setStatus("Please choose a PDF or DOCX resume first.", "error");
    return;
  }

  const allowedTypes = [".pdf", ".docx"];
  const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  if (!allowedTypes.includes(extension)) {
    setStatus("Only PDF and DOCX files are supported.", "error");
    return;
  }

  const formData = new FormData();
  formData.append("resume", file);

  analyzeButton.disabled = true;
  setStatus("Analyzing resume...");

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Analysis failed.");
    }

    renderResults(data);
    setStatus("Analysis complete.");
  } catch (error) {
    setStatus(error.message, "error");
  } finally {
    analyzeButton.disabled = false;
  }
});
