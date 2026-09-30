/**
 * TRAINEE SKILL DASHBOARD — Dynamic JS Controller
 * SOIP | SIH 2026
 */

// ============================================================
// DATA MODEL — Single Trainee (Alex Morgan)
// ============================================================
const TRAINEE = {
  name: "Alex Morgan",
  id: "MFG-26#TR-89421",
  course: "Advanced Manufacturing Technology",
  avatar: "assets/images/trainee_tech.jpg",
  currentCompletion: 85,
  skills: [
    {
      name: "Welding Safety",
      courseLevel: 100,
      employerDemand: 99,
      unit: "Industrial Safety Practices",
    },
    {
      name: "Machine Operation",
      courseLevel: 90,
      employerDemand: 90,
      unit: "Workshop Machinery (Lathe/Mill)",
    },
    {
      name: "CAD Design",
      courseLevel: 50,
      employerDemand: 89,
      unit: "2D/3D Parametric Design (SolidWorks, AutoCAD)",
    },
    {
      name: "CNC Machining",
      courseLevel: 20,
      employerDemand: 100,
      unit: "CNC Programming & Live Operation (5-Axis)",
    },
  ],
  recommendations: [
    {
      skill: "CNC Machining",
      priority: "critical",
      icon: "🚨",
      title: "Critical: CNC Machining Gap — 80% Shortfall",
      desc: 'Employers demand 100% proficiency; your current level is 20%. Enroll in the <strong>3-Day CNC Hands-On Add-On Module</strong> at NSTI to bridge this gap and become industry-ready.',
      badge: "critical",
      badgeText: "Immediate Action Required",
    },
    {
      skill: "CAD Design",
      priority: "minor",
      icon: "⚠️",
      title: "Minor Gap: CAD Design — 39% Shortfall",
      desc: 'Employers expect 89% CAD proficiency; you are at 50%. Complete the <strong>SolidWorks Intermediate 8-Hour Self-Paced Module</strong> available on FutureSkills PRIME portal for free.',
      badge: "minor",
      badgeText: "Recommended within 30 Days",
    },
    {
      skill: "Machine Operation",
      priority: "good",
      icon: "✅",
      title: "Machine Operation — Matches Employer Demand",
      desc: "Your proficiency fully meets or exceeds employer expectations for Machine Operation. Maintain your skills through quarterly hands-on refresher sessions.",
      badge: "good",
      badgeText: "No Action Needed",
    },
    {
      skill: "Welding Safety",
      priority: "good",
      icon: "✅",
      title: "Welding Safety — Matches Employer Demand",
      desc: "Excellent! Your Welding Safety skills are at 100% and exceed the employer benchmark of 99%. This is a strong differentiator in your job applications.",
      badge: "good",
      badgeText: "No Action Needed",
    },
  ],
};

// ============================================================
// STATE
// ============================================================
let currentProgress = TRAINEE.currentCompletion;
let skillGapChart = null;
let readinessGaugeChart = null;

// ============================================================
// INIT
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  updateDashboard(currentProgress);
  setupFormListener();
});

// ============================================================
// MYSQL BACKEND INTEGRATION — SAVE FUNCTIONS
// ============================================================
async function saveTraineeToDatabase(traineeData) {
  try {
    const response = await fetch('http://localhost:5000/api/trainees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(traineeData)
    });

    const result = await response.json();

    if (response.ok) {
      alert('✅ Trainee saved permanently to MySQL database!');
    } else {
      alert('❌ Failed to save to database: ' + (result.error || result.details));
    }
  } catch (error) {
    alert('❌ Error connecting to server! Make sure "node server.js" is running.');
  }
}

function setupFormListener() {
  const form = document.querySelector('form:not(#predictionForm)');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const payload = {
        trainee_id: "TR-" + Math.floor(1000 + Math.random() * 9000),
        name: TRAINEE.name,
        district: "Central",
        state: "Delhi",
        current_status: "Active"
      };

      await saveTraineeToDatabase(payload);
    });
  }
}

window.saveCurrentTraineeToMySQL = async function() {
  const payload = {
    Trainee_ID: "TR-89421", 
    Full_Name: document.getElementById('trainee-name')?.innerText || 'Alex Morgan',
    Date_Of_Birth: '2000-01-01',
    Gender: 'Male',
    Phone: '9876543210',
    EMail: 'alex@example.com',
    Address: '123 Main Street',
    State: 'Delhi'
  };

  try {
    const res = await fetch('http://localhost:5000/api/trainees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const data = await res.json();
    if (res.ok) {
      alert('✅ Dashboard data saved/updated in MySQL!');
    } else {
      alert('❌ Error: ' + (data.details || data.error));
    }
  } catch (err) {
    alert('❌ Make sure node server.js is running!');
  }
};

window.saveRealTraineeToMySQL = async function() {
  const payload = {
    Trainee_ID: document.getElementById('traineeId')?.value.trim() || "TR-89421",
    Full_Name: document.getElementById('fullName')?.value.trim() || TRAINEE.name,
    Phone: document.getElementById('phone')?.value.trim() || '9876543210',
    EMail: document.getElementById('email')?.value.trim() || 'alex@example.com',
    Date_Of_Birth: '2000-01-01',
    Gender: 'Male',
    Address: 'Default Address',
    State: 'Delhi'
  };

  try {
    const res = await fetch('http://localhost:5000/api/trainees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      alert(`✅ Saved ${payload.Full_Name} to MySQL!`);
    } else {
      alert('❌ Failed to save.');
    }
  } catch (err) {
    alert('❌ Server not connected.');
  }
};

// ============================================================
// SET PROGRESS
// ============================================================
window.setProgress = function (pct) {
  currentProgress = pct;
  document.querySelectorAll(".sim-btn").forEach((b) => b.classList.remove("active"));
  const btn = document.getElementById(`btn-${pct}`);
  if (btn) btn.classList.add("active");
  updateDashboard(pct);
};

// ============================================================
// MAIN DASHBOARD UPDATE FUNCTION
// ============================================================
function updateDashboard(pct) {
  updateProgressBar(pct);
  updateConditionalSection(pct);
}

// ============================================================
// PROGRESS BAR UPDATE
// ============================================================
function updateProgressBar(pct) {
  const fill = document.getElementById("course-progress-fill");
  const numEl = document.getElementById("progress-pct-num");
  const pillEl = document.getElementById("progress-status-pill");
  const labelEl = document.getElementById("progress-pct-label");

  if (fill) {
    fill.style.width = `${pct}%`;
    fill.className = "progress-fill";
    if (pct >= 80) fill.classList.add("success");
    else if (pct < 50) fill.classList.add("danger");
  }

  if (numEl) animateCount(numEl, parseInt(numEl.textContent) || 0, pct, 600);

  if (pillEl) {
    if (pct >= 80) {
      pillEl.className = "progress-status-pill";
      pillEl.innerHTML = `
        <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
        Skill Analysis Unlocked`;
    } else {
      pillEl.className = "progress-status-pill locked";
      pillEl.innerHTML = `
        <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg>
        ${80 - pct}% to Unlock`;
    }
  }

  if (labelEl) {
    labelEl.textContent =
      pct === 100
        ? "Course Completed 🎉"
        : pct >= 80
        ? "Course Completed (Partial — Skill Analysis Active)"
        : "Course In Progress";
  }
}

// ============================================================
// CONDITIONAL SKILL GAP SECTION
// ============================================================
function updateConditionalSection(pct) {
  const lockedEl = document.getElementById("locked-state");
  const unlockedEl = document.getElementById("unlocked-state");
  const hintFill = document.getElementById("hint-bar-fill");
  const hintText = document.getElementById("hint-text");

  if (pct >= 80) {
    if (lockedEl) lockedEl.classList.remove("visible");
    if (unlockedEl) unlockedEl.classList.add("visible");
    renderSkillGapChart();
    renderSkillBars();
    renderJobReadiness(pct);
    renderRecommendations();
  } else {
    if (lockedEl) lockedEl.classList.add("visible");
    if (unlockedEl) unlockedEl.classList.remove("visible");

    const hintPct = Math.min((pct / 80) * 100, 100);
    if (hintFill) hintFill.style.width = `${hintPct}%`;
    if (hintText) hintText.textContent = `${pct}% of 80% threshold reached`;
  }
}

// ============================================================
// SKILL GAP BAR CHART (Chart.js)
// ============================================================
function renderSkillGapChart() {
  const canvas = document.getElementById("skillGapChart");
  if (!canvas) return;

  if (skillGapChart) {
    skillGapChart.destroy();
    skillGapChart = null;
  }

  const labels = TRAINEE.skills.map((s) => s.name);
  const courseData = TRAINEE.skills.map((s) => s.courseLevel);
  const demandData = TRAINEE.skills.map((s) => s.employerDemand);

  const courseBarColors = TRAINEE.skills.map((s) => {
    const gap = s.employerDemand - s.courseLevel;
    if (gap <= 5) return "rgba(16, 185, 129, 0.85)";
    if (gap <= 45) return "rgba(245, 158, 11, 0.85)";
    return "rgba(239, 68, 68, 0.85)";
  });

  skillGapChart = new Chart(canvas, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Course Skill Level (%)",
          data: courseData,
          backgroundColor: courseBarColors,
          borderRadius: 6,
          borderSkipped: false,
          barPercentage: 0.4,
          categoryPercentage: 0.7,
        },
        {
          label: "Employer Demand (%)",
          data: demandData,
          backgroundColor: "rgba(15, 23, 42, 0.75)",
          borderRadius: 6,
          borderSkipped: false,
          barPercentage: 0.4,
          categoryPercentage: 0.7,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: {
          position: "bottom",
          labels: { boxWidth: 14, padding: 18, font: { size: 12, weight: "600" } },
        },
        tooltip: {
          callbacks: {
            afterBody: function (tooltipItems) {
              const idx = tooltipItems[0].dataIndex;
              const skill = TRAINEE.skills[idx];
              const gap = skill.employerDemand - skill.courseLevel;
              if (gap <= 0) return "✅ Meets or exceeds employer demand";
              if (gap <= 45) return `⚠️ Gap: ${gap}% — Minor shortfall`;
              return `🚨 Gap: ${gap}% — Critical shortfall`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { size: 12, weight: "600" } },
        },
        y: {
          beginAtZero: true,
          max: 110,
          ticks: { callback: (v) => v + "%", font: { size: 11 } },
          grid: { color: "#f1f5f9" },
        },
      },
    },
  });
}

// ============================================================
// DETAILED SIDE-BY-SIDE SKILL BARS
// ============================================================
function renderSkillBars() {
  const container = document.getElementById("skill-bars-container");
  if (!container) return;

  container.innerHTML = TRAINEE.skills
    .map((s) => {
      const gap = s.employerDemand - s.courseLevel;
      let statusClass, statusLabel, courseColor, gapColor, gapWidth;

      if (gap <= 1) {
        statusClass = "match";
        statusLabel = "✅ Matches Demand";
        courseColor = "#10b981";
        gapColor = "transparent";
        gapWidth = 0;
      } else if (gap <= 45) {
        statusClass = "minor";
        statusLabel = `⚠️ Minor Gap — ${gap}% shortfall`;
        courseColor = "#f59e0b";
        gapColor = "#fde68a";
        gapWidth = gap;
      } else {
        statusClass = "critical";
        statusLabel = `🚨 Critical Gap — ${gap}% shortfall`;
        courseColor = "#ef4444";
        gapColor = "#fecaca";
        gapWidth = gap;
      }

      return `
        <div class="skill-detail-row">
          <div class="skill-row-header">
            <div>
              <div class="skill-name">${s.name}</div>
              <div style="font-size:0.72rem; color:var(--text-muted); margin-top:1px;">${s.unit}</div>
            </div>
            <span class="skill-status-tag ${statusClass}">${statusLabel}</span>
          </div>
          <div class="dual-bar-wrapper">
            <div class="dual-bar-row">
              <span class="dual-bar-label">Course Level</span>
              <div class="dual-bar-track">
                <div class="dual-bar-fill" style="width:${s.courseLevel}%; background:${courseColor};"></div>
              </div>
              <span class="dual-bar-pct">${s.courseLevel}%</span>
            </div>
            <div class="dual-bar-row">
              <span class="dual-bar-label">Employer Demand</span>
              <div class="dual-bar-track">
                <div class="dual-bar-fill" style="width:${s.employerDemand}%; background:#1e3a5f;"></div>
              </div>
              <span class="dual-bar-pct">${s.employerDemand}%</span>
            </div>
            ${
              gapWidth > 0
                ? `<div class="gap-indicator-bar" style="width:${gapWidth}\%; background:${gapColor}; max-width:calc(100% - 140px); margin-right:48px;"></div>`
                : ""
            }
          </div>
        </div>
      `;
    })
    .join("");
}

// ============================================================
// JOB READINESS SCORE
// ============================================================
function renderJobReadiness(pct) {
  const totalDemand = TRAINEE.skills.reduce((a, s) => a + s.employerDemand, 0);
  const totalCourse = TRAINEE.skills.reduce((a, s) => a + Math.min(s.courseLevel, s.employerDemand), 0);
  const baseScore = Math.round((totalCourse / totalDemand) * 100);
  const finalScore = Math.min(Math.round(baseScore * (pct / 100) * 1.15), 99);

  const readinessBar = document.getElementById("readiness-bar-fill");
  const readinessNum = document.getElementById("readiness-score-num");
  const gaugeCenterText = document.getElementById("gauge-center-text");

  if (readinessBar) readinessBar.style.width = `${finalScore}%`;
  if (readinessNum) animateCount(readinessNum, 0, finalScore, 800);
  if (gaugeCenterText) gaugeCenterText.textContent = `${finalScore}%`;

  if (readinessBar) {
    if (finalScore >= 85) {
      readinessBar.style.background = "linear-gradient(90deg, #059669, #10b981)";
    } else if (finalScore >= 65) {
      readinessBar.style.background = "linear-gradient(90deg, #1d4ed8, #0ea5e9)";
    } else {
      readinessBar.style.background = "linear-gradient(90deg, #dc2626, #f59e0b)";
    }
  }

  renderGaugeChart(finalScore);
}

function renderGaugeChart(score) {
  const canvas = document.getElementById("readinessGauge");
  if (!canvas) return;

  if (readinessGaugeChart) {
    readinessGaugeChart.destroy();
    readinessGaugeChart = null;
  }

  let color;
  if (score >= 85) color = "#10b981";
  else if (score >= 65) color = "#1d4ed8";
  else color = "#ef4444";

  readinessGaugeChart = new Chart(canvas, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [score, 100 - score],
          backgroundColor: [color, "#f1f5f9"],
          borderWidth: 0,
          hoverOffset: 0,
        },
      ],
    },
    options: {
      responsive: false,
      cutout: "72%",
      rotation: -90,
      circumference: 180,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      animation: { animateRotate: true, duration: 800 },
    },
  });
}

// ============================================================
// RECOMMENDATIONS
// ============================================================
function renderRecommendations() {
  const container = document.getElementById("recommendations-container");
  if (!container) return;

  container.innerHTML = TRAINEE.recommendations
    .map(
      (r) => `
      <div class="rec-card priority-${r.priority}">
        <div class="rec-icon">${r.icon}</div>
        <div class="rec-content">
          <h4>${r.title}</h4>
          <p>${r.desc}</p>
          <span class="rec-badge ${r.badge}">${r.badgeText}</span>
        </div>
      </div>
    `
    )
    .join("");
}

// ============================================================
// UTILITY: Animated Number Count-Up
// ============================================================
function animateCount(el, from, to, duration) {
  if (!el) return;
  const start = performance.now();
  function step(now) {
    const elapsed = now - start;
    const t = Math.min(elapsed / duration, 1);
    const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    el.textContent = Math.round(from + (to - from) * eased);
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = to;
  }
  requestAnimationFrame(step);
}

// ============================================================
// AI PLACEMENT PREDICTOR — FORM HANDLER
// ============================================================
document.getElementById('predictionForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const predictBtn = document.getElementById('predictBtn');
  predictBtn.innerText = "Analyzing...";
  predictBtn.disabled = true;

  const payload = {
    attendance: Number(document.getElementById('attendance').value),
    assessment_score: Number(document.getElementById('assessment_score').value),
    duration_days: Number(document.getElementById('duration_days').value),
    sector: document.getElementById('sector').value,
    skill_level: document.getElementById('skill_level').value
  };

  try {
    const response = await fetch('http://localhost:5000/api/ml/predict-placement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (data.success) {
      document.getElementById('resultStatus').innerText = data.status;
      document.getElementById('resultProb').innerText = data.placement_probability;
      document.getElementById('predictionResult').style.display = 'block';
    } else {
      alert('Prediction failed: ' + (data.message || 'Unknown error'));
    }
  } catch (error) {
    console.error('Error getting prediction:', error);
    alert('Failed to connect to backend server');
  } finally {
    predictBtn.innerText = "⚡ Calculate Placement Probability";
    predictBtn.disabled = false;
  }
});