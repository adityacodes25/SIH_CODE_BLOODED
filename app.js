// Connect Frontend to live Express Backend & update UI
async function connectToBackend() {
  try {
    // 1. Fetch live trainees from backend
    const traineeRes = await fetch('http://localhost:5000/api/trainees');
    const liveTrainees = await traineeRes.json();
    
    if (typeof SOIP_DATA !== 'undefined') {
      SOIP_DATA.trainees = liveTrainees;
      console.log('✅ Trainees loaded from Express Backend!');
    }

    // 2. Fetch live stats from backend
    const statsRes = await fetch('http://localhost:5000/api/dashboard/stats');
    const stats = await statsRes.json();
    console.log('✅ Live Stats loaded:', stats);

  } catch (err) {
    console.warn('⚠️ Backend offline. Using local static data fallback.');
  }
}

// Fire connection when page loads
document.addEventListener('DOMContentLoaded', connectToBackend);

// Fire connection when page loads
document.addEventListener('DOMContentLoaded', connectToBackend);
/**
 * SKILL OUTCOME INTELLIGENCE PORTAL (SOIP)
 * Dynamic AI Analysis & Skill Gap Engine
 * Smart India Hackathon 2026
 */

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    trainees: JSON.parse(localStorage.getItem('soip_trainees')) || SOIP_DATA.trainees,
    providers: SOIP_DATA.providers,
    coursesAnalysis: SOIP_DATA.coursesAnalysis,
    skillGapMatrix: SOIP_DATA.skillGapMatrix,
    selectedTraineeId: "SKL-26#849201",
    selectedCourseId: "COURSE-SOL-01",
    activeTab: "home",
    userRole: localStorage.getItem('soip_role') || "admin", // trainee | provider | admin
    fontSizeLevel: 1,
    isHighContrast: false,
    currentLang: "en",
    charts: {}
  };

// =========================================================
// ADMIN DASHBOARD TAB SYSTEM
// =========================================================

const adminTabButtons =
    document.querySelectorAll('.admin-tab-btn');

const adminTabSections =
    document.querySelectorAll('.admin-analysis-section');


adminTabButtons.forEach(button => {

    button.addEventListener('click', () => {

        const targetTab =
            button.dataset.adminTab;


        // Remove active state from all buttons

        adminTabButtons.forEach(btn => {

            btn.classList.remove('active');

        });


        // Activate clicked button

        button.classList.add('active');


        // Hide all sections

        adminTabSections.forEach(section => {

            section.classList.remove('active');

        });


        // Show selected section

        const targetSection =
            document.getElementById(
                `admin-${targetTab}`
            );


        if (targetSection) {

            targetSection.classList.add('active');

        }


        // Run the appropriate analysis

        switch (targetTab) {

            case 'overview':

                initializeAdminOverview();

                break;


            case 'wage-progression':

                initializeWageProgression();

                break;


            case 'retention-analysis':

                initializeRetentionAnalysis();

                break;


            case 'skill-gap':

                initializeSkillGapAnalysis();

                break;


            case 'outcome-diagnosis':

                initializeOutcomeDiagnosis();

                break;


            case 'course-provider':

                initializeCourseProviderAnalysis();

                break;

        }

    });

});

  // DOM Elements
  const navBtns = document.querySelectorAll('.nav-item-btn');
  const tabPanels = document.querySelectorAll('.tab-content-panel');
  const traineeListContainer = document.getElementById('trainee-list');
  const traineeSearchInput = document.getElementById('trainee-search-input');
  const traineeSectorFilter = document.getElementById('trainee-sector-filter');
  const traineeDetailContainer = document.getElementById('trainee-detail-view');

  // Provider Trainee Search
const providerTraineeIdInput =
    document.getElementById('provider-trainee-id-input');

const providerTraineeSearchBtn =
    document.getElementById('provider-trainee-search-btn');

const providerTraineeResult =
    document.getElementById('provider-trainee-result');

const providerTraineeSearchMessage =
    document.getElementById('provider-trainee-search-message');
  
  // Navigation role elements
  const navItemTrainee = document.getElementById('nav-item-trainee');
  const navItemProvider = document.getElementById('nav-item-provider');
  const navItemPolicy = document.getElementById('nav-item-policy');
  const activeRoleBadge = document.getElementById('role-badge-text');

  // Admin Dashboard Elements
  const aiCourseSelect = document.getElementById('ai-course-select');
  const aiCohortStatsView = document.getElementById('ai-cohort-stats-view');
  const aiInsightsContainer = document.getElementById('ai-insights-container');
  const skillGapTableBody = document.getElementById('skill-gap-table-body');

  // Modals
  const roleModal = document.getElementById('role-selection-modal');
  const registerModal = document.getElementById('register-trainee-modal');
  const addCourseModal = document.getElementById('add-course-modal');
  const regForm = document.getElementById('register-trainee-form');
  const addCourseForm = document.getElementById('add-course-form');
  const autoGenIdInput = document.getElementById('reg-trainee-id');
  const regSectorSelect = document.getElementById('reg-sector-code');

  // Accessibility Controls
  const fontDecBtn = document.getElementById('font-dec');
  const fontResetBtn = document.getElementById('font-reset');
  const fontIncBtn = document.getElementById('font-inc');
  const contrastToggleBtn = document.getElementById('contrast-toggle');
  const langToggleBtn = document.getElementById('lang-toggle');

  // =========================================================
// PERSONAL SKILL GAP REQUIREMENTS
// =========================================================

// const traineeSkillRequirements = {

//   "Solar PV Rooftop Installer - Suryamitra (NSQF Level 4)": {
//     "Solar Installation": 80,
//     "Electrical Wiring": 75,
//     "Safety Procedures": 80,
//     "System Maintenance": 75,
//     "Fault Diagnosis": 80,
//     "Troubleshooting": 75
//   },

//   "Assistant Electrician & Circuit Assembly (NSQF Level 3)": {
//     "Electrical Wiring": 75,
//     "Circuit Assembly": 80,
//     "Electrical Safety": 80,
//     "Equipment Handling": 75,
//     "Fault Diagnosis": 75,
//     "Industrial Automation": 70
//   },

//   "Junior Cloud Infrastructure Associate & Python (NSQF Level 5)": {
//     "Python": 80,
//     "Cloud Fundamentals": 80,
//     "Linux": 75,
//     "Networking": 75,
//     "Cloud Troubleshooting": 80,
//     "Automation": 75
//   }

const traineeSkillRequirements = {

  // =====================================================
  // ANJALI - ELECTRICIAN
  // =====================================================

  "Assistant Electrician & Circuit Assembly (NSQF Level 3)": {

    "Electrical Wiring": 80,
    "Circuit Assembly": 80,
    "Electrical Safety": 85,
    "Equipment Handling": 80,
    "Fault Diagnosis": 75,
    "Troubleshooting": 75

  },


  // =====================================================
  // ANJALI - INDUSTRIAL IoT
  // =====================================================

  "Industrial IoT & Smart Automation Technician (NSQF Level 5)": {

    "Industrial Automation": 85,
    "PLC & Control Systems": 80,
    "Electrical Systems": 80,
    "IoT Fundamentals": 75,
    "Troubleshooting": 80,
    "Safety Procedures": 85

  },


  // =====================================================
  // RAMESHWAR - SOLAR
  // =====================================================

  "Solar PV Rooftop Installer - Suryamitra (NSQF Level 4)": {

    "Solar Installation": 85,
    "Electrical Wiring": 80,
    "Solar PV Systems": 85,
    "Safety Procedures": 85,
    "System Maintenance": 75,
    "Fault Diagnosis": 75

  },


  // =====================================================
  // VIKAS - CLOUD & PYTHON
  // =====================================================

  "Junior Cloud Infrastructure Associate & Python (NSQF Level 5)": {

    "Python": 85,
    "Cloud Fundamentals": 85,
    "Linux": 80,
    "Networking": 80,
    "Cloud Troubleshooting": 80,
    "Automation": 80

  }

};

  // =========================================================
  // PERSONAL SKILL GAP CALCULATION
  // =========================================================

  // function calculateTraineeSkillGap(trainee) {

  //   if (!trainee || !trainee.trainingRecords || !trainee.trainingRecords.length) {
  //     return null;
  //   }

  //   // Use the latest training record
  //   const trainingRecord =
  //     trainee.trainingRecords[trainee.trainingRecords.length - 1];

  //   if (!trainingRecord.skills) {
  //     return null;
  //   }

  //   const requiredSkills =
  //     traineeSkillRequirements[trainingRecord.courseName];

  //   if (!requiredSkills) {
  //     return null;
  //   }

  //   const currentSkills = trainingRecord.skills;

  //   const skillResults = [];

  //   let totalCurrent = 0;
  //   let totalRequired = 0;

  //   Object.entries(requiredSkills).forEach(([skill, requiredLevel]) => {

  //     const currentLevel = currentSkills[skill] || 0;

  //     const gap = Math.max(requiredLevel - currentLevel, 0);

  //     let status = "strong";

  //     if (currentLevel < requiredLevel * 0.6) {
  //       status = "critical";
  //     } else if (currentLevel < requiredLevel) {
  //       status = "needs-improvement";
  //     }

  //     skillResults.push({
  //       skill,
  //       currentLevel,
  //       requiredLevel,
  //       gap,
  //       status
  //     });

  //     totalCurrent += currentLevel;
  //     totalRequired += requiredLevel;
  //   });

  //   const readiness = Math.round(
  //     (totalCurrent / totalRequired) * 100
  //   );

  //   const sortedGaps = [...skillResults].sort(
  //     (a, b) => b.gap - a.gap
  //   );

  //   const majorGaps = sortedGaps
  //     .filter(skill => skill.gap > 0)
  //     .slice(0, 3);

  //   let readinessStatus = "Career Ready";

  //   if (readiness < 60) {
  //     readinessStatus = "Needs Significant Upskilling";
  //   } else if (readiness < 75) {
  //     readinessStatus = "Needs Improvement";
  //   } else if (readiness < 90) {
  //     readinessStatus = "Nearly Career Ready";
  //   }

  //   return {
  //     trainee,
  //     trainingRecord,
  //     skillResults,
  //     readiness,
  //     readinessStatus,
  //     majorGaps
  //   };
  // }


  function calculateTraineeSkillGap(trainee) {

  if (
    !trainee ||
    !trainee.trainingRecords ||
    trainee.trainingRecords.length === 0
  ) {
    return null;
  }

  // -----------------------------------------------------
  // Always analyse the trainee's latest training record
  // -----------------------------------------------------

  const trainingRecord =
    trainee.trainingRecords[
      trainee.trainingRecords.length - 1
    ];

  if (!trainingRecord.skills) {
    return null;
  }

  // -----------------------------------------------------
  // Find the skill requirements for this course
  // -----------------------------------------------------

  const requiredSkills =
    traineeSkillRequirements[trainingRecord.courseName];

  if (!requiredSkills) {
    return null;
  }

  const currentSkills =
    trainingRecord.skills;

  const skillResults = [];

  let totalCurrent = 0;
  let totalRequired = 0;

  // -----------------------------------------------------
  // Compare trainee skills vs required skills
  // -----------------------------------------------------

  Object.entries(requiredSkills).forEach(
    ([skill, requiredLevel]) => {

      const currentLevel =
        currentSkills[skill] || 0;

      const gap =
        Math.max(
          requiredLevel - currentLevel,
          0
        );

      let status = "strong";

      if (
        currentLevel <
        requiredLevel * 0.60
      ) {

        status = "critical";

      } else if (
        currentLevel <
        requiredLevel
      ) {

        status = "needs-improvement";

      }

      skillResults.push({

        skill,
        currentLevel,
        requiredLevel,
        gap,
        status

      });

      totalCurrent += currentLevel;
      totalRequired += requiredLevel;

    }
  );

  // -----------------------------------------------------
  // Career readiness
  // -----------------------------------------------------

  const readiness = Math.round(
    (totalCurrent / totalRequired) * 100
  );

  // -----------------------------------------------------
  // Find biggest skill gaps
  // -----------------------------------------------------

  const sortedGaps =
    [...skillResults].sort(
      (a, b) =>
        b.gap - a.gap
    );

  const majorGaps =
    sortedGaps
      .filter(skill => skill.gap > 0)
      .slice(0, 3);

  // -----------------------------------------------------
  // Readiness label
  // -----------------------------------------------------

  let readinessStatus =
    "Career Ready";

  if (readiness < 60) {

    readinessStatus =
      "Needs Significant Upskilling";

  } else if (readiness < 75) {

    readinessStatus =
      "Needs Improvement";

  } else if (readiness < 90) {

    readinessStatus =
      "Nearly Career Ready";

  }

  return {

    trainee,
    trainingRecord,
    skillResults,
    readiness,
    readinessStatus,
    majorGaps

  };

}

  // =========================================================
  // SKILL GAP RECOMMENDATIONS
  // =========================================================

  // function getSkillGapRecommendation(skillGapData) {

  //   if (!skillGapData || !skillGapData.majorGaps.length) {
  //     return {
  //       title: "You are meeting the required skill levels.",
  //       description:
  //         "Continue practical training and maintain your current competency.",
  //       action: "Continue Upskilling"
  //     };
  //   }

  //   const topGap = skillGapData.majorGaps[0];

  //   const recommendations = {
  //     "Fault Diagnosis":
  //       "Complete an advanced fault-diagnosis practical module.",

  //     "Troubleshooting":
  //       "Practice real-world troubleshooting scenarios and supervised field work.",

  //     "System Maintenance":
  //       "Complete additional system-maintenance and preventive-maintenance training.",

  //     "Electrical Wiring":
  //       "Take additional hands-on electrical wiring practice.",

  //     "Solar Installation":
  //       "Complete an advanced solar installation practical module.",

  //     "Safety Procedures":
  //       "Complete additional workplace and electrical safety training.",

  //     "Python":
  //       "Build practical Python automation projects.",

  //     "Cloud Fundamentals":
  //       "Complete an introductory cloud infrastructure project.",

  //     "Linux":
  //       "Practice Linux administration through hands-on lab exercises.",

  //     "Networking":
  //       "Strengthen networking fundamentals through practical lab work.",

  //     "Cloud Troubleshooting":
  //       "Practice diagnosing real-world cloud infrastructure issues.",

  //     "Automation":
  //       "Build additional automation workflows using Python."
  //   };

  //   return {
  //     title: `Improve ${topGap.skill}`,
  //     description:
  //       recommendations[topGap.skill] ||
  //       `Additional training is recommended in ${topGap.skill}.`,
  //     action: "Recommended Upskilling"
  //   };
  // }

  function getSkillGapRecommendation(skillGapData) {

  if (
    !skillGapData ||
    !skillGapData.majorGaps ||
    skillGapData.majorGaps.length === 0
  ) {

    return {

      title:
        "You are meeting the required skill levels.",

      description:
        "Continue practical training and maintain your current competency.",

      action:
        "Continue Upskilling"

    };

  }

  const topGap =
    skillGapData.majorGaps[0];

  const recommendations = {

    "Electrical Wiring":
      "Complete additional supervised electrical wiring practice.",

    "Circuit Assembly":
      "Practice circuit assembly using real-world electrical components.",

    "Electrical Safety":
      "Complete an advanced workplace and electrical safety module.",

    "Equipment Handling":
      "Complete additional hands-on equipment operation training.",

    "Fault Diagnosis":
      "Complete practical fault-diagnosis exercises using real equipment.",

    "Troubleshooting":
      "Practice real-world troubleshooting scenarios under supervision.",

    "Industrial Automation":
      "Complete additional PLC and industrial automation practical training.",

    "PLC & Control Systems":
      "Practice PLC programming and industrial control-system scenarios.",

    "Electrical Systems":
      "Strengthen industrial electrical systems through practical lab work.",

    "IoT Fundamentals":
      "Complete an IoT sensor, connectivity and monitoring project.",

    "Safety Procedures":
      "Complete additional workplace safety and hazard-management training.",

    "Solar Installation":
      "Complete supervised rooftop solar installation practice.",

    "Solar PV Systems":
      "Strengthen practical knowledge of solar PV system design and operation.",

    "System Maintenance":
      "Complete preventive and corrective maintenance training.",

    "Python":
      "Build practical Python automation projects.",

    "Cloud Fundamentals":
      "Complete a hands-on cloud infrastructure project.",

    "Linux":
      "Practice Linux administration through hands-on laboratory exercises.",

    "Networking":
      "Strengthen networking fundamentals using practical lab scenarios.",

    "Cloud Troubleshooting":
      "Practice diagnosing real-world cloud infrastructure problems.",

    "Automation":
      "Build additional Python-based automation workflows."

  };

  return {

    title:
      `Improve ${topGap.skill}`,

    description:
      recommendations[topGap.skill] ||
      `Additional training is recommended in ${topGap.skill}.`,

    action:
      "Recommended Upskilling"

  };

}


  // =========================================================
  // RENDER PERSONAL SKILL GAP CARD
  // =========================================================

  function renderTraineeSkillGap(trainee) {

    const container =
      document.getElementById('trainee-skill-gap-container');

    if (!container) {
      return;
    }

    const skillGapData =
      calculateTraineeSkillGap(trainee);

    if (!skillGapData) {

      container.innerHTML = `
        <div class="skill-gap-empty">
          <div class="skill-gap-empty-icon">🎯</div>

          <h3>Skill Gap & Career Readiness</h3>

          <p>
            Skill competency data is not yet available for this
            training record.
          </p>
        </div>
      `;

      return;
    }

    const recommendation =
      getSkillGapRecommendation(skillGapData);

    const readiness = skillGapData.readiness;

    let readinessClass = "readiness-good";

    if (readiness < 60) {
      readinessClass = "readiness-critical";
    } else if (readiness < 75) {
      readinessClass = "readiness-warning";
    }

    const skillRows =
      skillGapData.skillResults.map(skill => {

        let statusIcon = "✓";

        if (skill.status === "critical") {
          statusIcon = "🔴";
        } else if (skill.status === "needs-improvement") {
          statusIcon = "⚠";
        }

        return `
          <div class="skill-gap-row">

            <div class="skill-gap-name">
              <span class="skill-status-icon">
                ${statusIcon}
              </span>

              <span>${skill.skill}</span>
            </div>

            <div class="skill-gap-level">
              <span>${skill.currentLevel}%</span>
            </div>

            <div class="skill-gap-required">
              <span>${skill.requiredLevel}%</span>
            </div>

            <div class="skill-gap-difference">
              ${
                skill.gap === 0
                  ? `<span class="gap-none">No Gap</span>`
                  : `<span class="gap-value">-${skill.gap}%</span>`
              }
            </div>

          </div>
        `;
      }).join("");

    const majorGapHTML =
      skillGapData.majorGaps.length
        ? skillGapData.majorGaps.map(gap => `
            <div class="major-gap-item">

              <div class="major-gap-icon">
                ⚠
              </div>

              <div>
                <strong>${gap.skill}</strong>

                <div class="major-gap-text">
                  Current ${gap.currentLevel}%
                  · Required ${gap.requiredLevel}%
                  · Gap ${gap.gap}%
                </div>
              </div>

            </div>
          `).join("")
        : `
          <div class="no-major-gap">
            ✓ No major skill gaps detected.
          </div>
        `;

    container.innerHTML = `

      <section class="skill-gap-card">

        <!-- HEADER -->

        <div class="skill-gap-header">

          <div>
            <div class="skill-gap-eyebrow">
              CAREER INTELLIGENCE
            </div>

            <h3>
              🎯 Skill Gap & Career Readiness
            </h3>

            <p>
              Your current competencies compared with the
              skills required for your training pathway.
            </p>
          </div>

          <div class="career-readiness-badge ${readinessClass}">
            <span class="readiness-number">
              ${readiness}%
            </span>

            <span class="readiness-label">
              Career Readiness
            </span>
          </div>

        </div>


        <!-- TRAINING -->

        <div class="skill-gap-course">

          <span>Training Pathway</span>

          <strong>
            ${skillGapData.trainingRecord.courseName}
          </strong>

        </div>


        <!-- COLUMN HEADER -->

        <div class="skill-gap-table">

          <div class="skill-gap-row skill-gap-heading">

            <div>Skill</div>
            <div>Your Level</div>
            <div>Required</div>
            <div>Gap</div>

          </div>

          ${skillRows}

        </div>


        <!-- MAJOR GAPS -->

        <div class="major-gaps-section">

          <div class="major-gaps-title">
            Skills That Need Attention
          </div>

          <div class="major-gaps-list">
            ${majorGapHTML}
          </div>

        </div>


        <!-- RECOMMENDATION -->

        <div class="skill-recommendation">

          <div class="recommendation-icon">
            💡
          </div>

          <div class="recommendation-content">

            <div class="recommendation-label">
              SYSTEM RECOMMENDATION
            </div>

            <h4>
              ${recommendation.title}
            </h4>

            <p>
              ${recommendation.description}
            </p>

            <span class="recommendation-action">
              ${recommendation.action}
            </span>

          </div>

        </div>

      </section>

    `;
  }

    // =========================================================
  // SKILL GAP & CAREER READINESS ENGINE
  // =========================================================

  const skillRequirements = {

    "Solar Technician": {
      "Solar Installation": 80,
      "Electrical Wiring": 75,
      "Safety Procedures": 80,
      "System Maintenance": 75,
      "Fault Diagnosis": 80,
      "Troubleshooting": 75
    },

    "Electrician": {
      "Electrical Wiring": 80,
      "Electrical Safety": 85,
      "Circuit Installation": 75,
      "Fault Diagnosis": 80,
      "Equipment Maintenance": 70,
      "Troubleshooting": 75
    },

    "Data Entry Operator": {
      "Computer Fundamentals": 80,
      "Typing": 75,
      "Data Accuracy": 85,
      "MS Office": 75,
      "Digital Communication": 70
    }

  };


  // ==========================================
  // ROLE-BASED ACCESS CONTROL (RBAC)
  // ==========================================
  window.setUserRole = function(role) {
    state.userRole = role;
    localStorage.setItem('soip_role', role);
    closeModal('role-selection-modal');
    applyRoleAccess();
    
    if (role === 'trainee') {
      switchTab('trainee-portal');
    } else if (role === 'provider') {
      switchTab('provider-portal');
    } else {
      switchTab('policy-admin');
    }
  };

  window.openRoleModal = function() {
    if (roleModal) roleModal.classList.add('active');
  };

  function applyRoleAccess() {
    if (activeRoleBadge) {
      if (state.userRole === 'trainee') {
        activeRoleBadge.textContent = '👤 Trainee Interface';
      } else if (state.userRole === 'provider') {
        activeRoleBadge.textContent = '🏢 Training Provider Interface';
      } else {
        activeRoleBadge.textContent = '🏛️ Admin Dashboard (Supreme)';
      }
    }

    if (state.userRole === 'trainee') {
      if (navItemTrainee) navItemTrainee.style.display = 'block';
      if (navItemProvider) navItemProvider.style.display = 'none';
      if (navItemPolicy) navItemPolicy.style.display = 'none';
    } else if (state.userRole === 'provider') {
      if (navItemTrainee) navItemTrainee.style.display = 'block';
      if (navItemProvider) navItemProvider.style.display = 'block';
      if (navItemPolicy) navItemPolicy.style.display = 'none';
    } else {
      if (navItemTrainee) navItemTrainee.style.display = 'block';
      if (navItemProvider) navItemProvider.style.display = 'block';
      if (navItemPolicy) navItemPolicy.style.display = 'block';
    }
  }

  // ==========================================
  // TAB NAVIGATION
  // ==========================================
  window.switchTab = function(tabId) {
    if (state.userRole === 'trainee' && (tabId === 'provider-portal' || tabId === 'policy-admin')) {
      alert('🔒 Access Restricted: Trainee role only has access to the Trainee Interface.');
      return;
    }
    if (state.userRole === 'provider' && tabId === 'policy-admin') {
      alert('🔒 Access Restricted: Provider role does not have Policy and Admin privileges.');
      return;
    }

    state.activeTab = tabId;
    
    navBtns.forEach(btn => {
      if (btn.dataset.tab === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    tabPanels.forEach(panel => {
      if (panel.id === `tab-${tabId}`) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (tabId === 'trainee-portal') {
      renderTraineeList();
      renderSelectedTrainee();
    } else if (tabId === 'policy-admin') {
      initPolicyAndAdminView();
    } else if (tabId === 'provider-portal') {
    // Provider interface uses Trainee ID search.
}
  };

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  document.querySelectorAll('[data-goto-tab]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab(el.dataset.gotoTab);
    });
  });

  // ==========================================
  // TRAINEE INTERFACE CONTROLLER
  // ==========================================
  function renderTraineeList(query = "", sector = "ALL") {
    if (!traineeListContainer) return;
    traineeListContainer.innerHTML = "";

    const filtered = state.trainees.filter(t => {
      const matchQuery = t.name.toLowerCase().includes(query.toLowerCase()) || 
                         t.traineeId.toLowerCase().includes(query.toLowerCase()) ||
                         t.district.toLowerCase().includes(query.toLowerCase());
      const matchSector = sector === "ALL" || t.traineeId.startsWith(sector);
      return matchQuery && matchSector;
    });

    if (filtered.length === 0) {
      traineeListContainer.innerHTML = `
        <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.875rem;">
          No candidates found.
        </div>
      `;
      return;
    }

    filtered.forEach(t => {
      const isSelected = t.traineeId === state.selectedTraineeId;
      const numCourses = t.trainingRecords ? t.trainingRecords.length : 1;
      
      const item = document.createElement('div');
      item.className = `trainee-item-card ${isSelected ? 'selected' : ''}`;
      item.innerHTML = `
        <img src="${t.avatar || 'assets/images/trainee_woman.jpg'}" alt="${t.name}" class="trainee-avatar-thumb">
        <div class="trainee-meta-info">
          <div class="trainee-meta-name">${t.name}</div>
          <span class="trainee-meta-id">${t.traineeId}</span>
          <div class="trainee-meta-sub">${t.district}, ${t.state} &bull; <strong style="color:#0284c7;">${numCourses} ${numCourses === 1 ? 'Course' : 'Courses'}</strong></div>
        </div>
      `;

      item.addEventListener('click', () => {
        state.selectedTraineeId = t.traineeId;
        renderTraineeList(traineeSearchInput ? traineeSearchInput.value : '', traineeSectorFilter ? traineeSectorFilter.value : 'ALL');
        renderSelectedTrainee();
      });

      traineeListContainer.appendChild(item);
    });
  }

  function renderSelectedTrainee(forProvider = false) {

    const targetContainer =
        forProvider
            ? providerTraineeResult
            : traineeDetailContainer;

    if (!targetContainer) return;

    const trainee =
        state.trainees.find(
            t => t.traineeId === state.selectedTraineeId
        ) || state.trainees[0];
    if (!trainee) return;

    const recordsHtml = trainee.trainingRecords.map((rec) => {
      let followUpTimelineHtml = '';
      if (rec.automatedFollowUps && rec.automatedFollowUps.length > 0) {
        const rows = rec.automatedFollowUps.map(fu => {
          let badgeClass = 'followup-channel-badge';
          if (fu.channel.includes('IVR')) badgeClass += ' ivr';
          else if (fu.channel.includes('Field')) badgeClass += ' field';

          return `
            <div class="followup-step-item">
              <div>
                <strong style="color:var(--gov-navy);">${fu.milestone}</strong>
                <div style="font-size:0.7rem; color:#64748b;">${fu.date}</div>
              </div>
              <div>
                <div style="font-weight:600; color:#0f172a;">${fu.response}</div>
                <div style="font-size:0.72rem; color:#059669; margin-top:2px;">Status: ${fu.status}</div>
              </div>
              <div style="text-align:right;">
                <span class="${badgeClass}">${fu.channel}</span>
              </div>
            </div>
          `;
        }).join('');

        followUpTimelineHtml = `
          <div style="margin-top:16px; border-top:1px dashed var(--border-color); padding-top:14px;">
            <div style="font-size:0.8125rem; font-weight:800; color:var(--gov-navy); margin-bottom:8px; display:flex; align-items:center; gap:6px;">
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Automated Follow-Up Schedule (SMS / WhatsApp / IVR / Field):
            </div>
            <div class="followup-timeline-container">
              ${rows}
            </div>
          </div>
        `;
      }

      return `
        <div class="course-history-card">
          <div class="course-card-header">
            <div>
              <span class="scheme-badge">${rec.scheme}</span>
              <h4 class="course-name-title" style="margin-top:6px;">${rec.courseName}</h4>
              <div style="font-size:0.84rem; color:var(--text-secondary); margin-top:2px;">
                <strong>Center:</strong> ${rec.providerName} &bull; <em>District: ${rec.district}</em>
              </div>
            </div>
            <div style="text-align: right;">
              <span class="role-badge" style="background:#dcfce7; color:#15803d; border-color:#86efac;">
                ${rec.certificationStatus}
              </span>
              <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">Batch: <code>${rec.batchId}</code></div>
            </div>
          </div>

          <div class="course-metrics-row">
            <div>
              <span style="color:#64748b; font-size:0.7rem; display:block;">ENROLLMENT / COMPLETION</span>
              <strong>${rec.enrollmentDate} to ${rec.completionDate}</strong>
            </div>
            <div>
              <span style="color:#64748b; font-size:0.7rem; display:block;">ATTENDANCE</span>
              <strong style="color: ${rec.attendancePercentage >= 90 ? '#16a34a' : '#d97706'}">${rec.attendancePercentage}%</strong>
            </div>
            <div>
              <span style="color:#64748b; font-size:0.7rem; display:block;">ASSESSMENT SCORE</span>
              <strong style="color: #2563eb;">${rec.assessmentScore}%</strong>
            </div>
            <div>
              <span style="color:#64748b; font-size:0.7rem; display:block;">CURRENT OUTCOME</span>
              <strong style="color: #0d9488;">${rec.employmentOutcome}</strong>
            </div>
          </div>

          ${followUpTimelineHtml}
        </div>
      `;
    }).join('');

    targetContainer.innerHTML = `
      <div class="trainee-detail-wrapper">
        <div class="profile-header-strip">
          <div class="profile-identity">
            <img src="${trainee.avatar || 'assets/images/trainee_woman.jpg'}" alt="${trainee.name}" class="profile-photo-large">
            <div class="profile-title-block">
              <h3>${trainee.name}</h3>
              <div class="persistent-id-banner">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path></svg>
                Trainee ID: ${trainee.traineeId}
              </div>
              <div style="font-size:0.8125rem; color:var(--text-secondary);">
                <em>Permanent ID &bull; Unified across all training schemes & lifelong employment records</em>
              </div>
            </div>
          </div>

          <div style="display:flex; gap:10px;">
            <button class="btn-primary btn-sm" id="btn-add-course-trigger">
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg>
              Add Training Record
            </button>
          </div>
        </div>

        <!-- Demographics Grid -->
        <div class="demographics-grid">
          <div class="demo-cell">
            <span class="demo-label">Age & Gender</span>
            <span class="demo-val">${trainee.age} Yrs &bull; ${trainee.gender}</span>
          </div>
          <div class="demo-cell">
            <span class="demo-label">Category</span>
            <span class="demo-val">${trainee.category}</span>
          </div>
          <div class="demo-cell">
            <span class="demo-label">Location (State / District)</span>
            <span class="demo-val">${trainee.district}, ${trainee.state}</span>
          </div>
          <div class="demo-cell">
            <span class="demo-label">Education</span>
            <span class="demo-val">${trainee.highestEducation}</span>
          </div>
          <div class="demo-cell">
            <span class="demo-label">Contact</span>
            <span class="demo-val">${trainee.contact}</span>
          </div>
          <div class="demo-cell">
            <span class="demo-label">Registered Email</span>
            <span class="demo-val">${trainee.email}</span>
          </div>
          <div class="demo-cell">
            <span class="demo-label">Registered Date</span>
            <span class="demo-val">${trainee.registeredDate}</span>
          </div>
          <div class="demo-cell">
            <span class="demo-label">Current Status</span>
            <span class="demo-val" style="color:#0284c7;">${trainee.currentStatus}</span>
          </div>
        </div>

        <!-- Training Journey Flow -->
        <div class="timeline-section-title">
          <span>Training Journey (${trainee.trainingRecords.length} Courses Completed)</span>
          <span style="font-size:0.75rem; color:#64748b; font-weight:normal;">ID: <code>${trainee.traineeId}</code></span>
        </div>

          <div class="training-timeline-flow">
  ${recordsHtml}
</div>

<!-- PERSONAL SKILL GAP & CAREER READINESS -->
<div id="trainee-skill-gap-container"></div>

        <!-- PERSONAL SKILL GAP & CAREER READINESS -->
        <div id="trainee-skill-gap-container"></div>

      </div>
    `;

        // Render Personal Skill Gap Analysis
    renderTraineeSkillGap(trainee);

    const addCourseTrigger = document.getElementById('btn-add-course-trigger');

    if (addCourseTrigger) {
      addCourseTrigger.addEventListener('click', () => {
        openAddCourseModal(trainee);
      });
    }
  }

  // Trainee search & filter event listeners
  if (traineeSearchInput) {
    traineeSearchInput.addEventListener('input', (e) => {
      renderTraineeList(e.target.value, traineeSectorFilter ? traineeSectorFilter.value : 'ALL');
    });
  }

  if (traineeSectorFilter) {
    traineeSectorFilter.addEventListener('change', (e) => {
      renderTraineeList(traineeSearchInput ? traineeSearchInput.value : '', e.target.value);
    });
  }

  // ==========================================
// PROVIDER: SEARCH TRAINEE BY ID
// ==========================================

function searchTraineeForProvider() {

    const enteredId =
        providerTraineeIdInput
            ? providerTraineeIdInput.value.trim()
            : '';

    // Clear previous message
    if (providerTraineeSearchMessage) {
        providerTraineeSearchMessage.innerHTML = '';
    }


    // No ID entered
    if (!enteredId) {

        if (providerTraineeSearchMessage) {
            providerTraineeSearchMessage.innerHTML = `
                <span style="color:#dc2626;">
                    Please enter a Trainee ID.
                </span>
            `;
        }

        return;
    }


    // Find trainee from existing database
    const trainee = state.trainees.find(
        t =>
            t.traineeId.toLowerCase() ===
            enteredId.toLowerCase()
    );


    // Trainee not found
    if (!trainee) {

        if (providerTraineeSearchMessage) {
            providerTraineeSearchMessage.innerHTML = `
                <span style="color:#dc2626;">
                    No trainee found with ID
                    <strong>${enteredId}</strong>.
                    Please check the ID and try again.
                </span>
            `;
        }

        if (providerTraineeResult) {
            providerTraineeResult.innerHTML = `
                <div class="provider-empty-state">

                    <div class="provider-empty-icon">
                        ❌
                    </div>

                    <h3>Trainee Not Found</h3>

                    <p>
                        No record exists for
                        <strong>${enteredId}</strong>.
                    </p>

                </div>
            `;
        }

        return;
    }


    // Trainee found
    state.selectedTraineeId = trainee.traineeId;


    if (providerTraineeSearchMessage) {
        providerTraineeSearchMessage.innerHTML = `
            <span style="color:#059669;">
                ✓ Trainee record found.
            </span>
        `;
    }


    // Render complete trainee record
    renderSelectedTrainee(true);
}
if (providerTraineeSearchBtn) {

    providerTraineeSearchBtn.addEventListener(
        'click',
        searchTraineeForProvider
    );

}
if (providerTraineeIdInput) {

    providerTraineeIdInput.addEventListener(
        'keydown',
        (e) => {

            if (e.key === 'Enter') {
                searchTraineeForProvider();
            }

        }
    );

}
  // ==========================================
  // MODAL LOGIC: REGISTER NEW TRAINEE
  // ==========================================
  function updateGeneratedTraineeId() {
    if (!autoGenIdInput || !regSectorSelect) return;
    const sector = regSectorSelect.value || "SKL";
    autoGenIdInput.value = generateTraineeId(sector, "26");
  }

  if (regSectorSelect) {
    regSectorSelect.addEventListener('change', updateGeneratedTraineeId);
  }

  window.openRegisterTraineeModal = function() {
    updateGeneratedTraineeId();
    if (registerModal) registerModal.classList.add('active');
  };

  window.closeModal = function(modalId) {
    const m = document.getElementById(modalId);
    if (m) m.classList.remove('active');
  };

  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const newId = autoGenIdInput.value || generateTraineeId("SKL", "26");
      const name = document.getElementById('reg-name').value;
      const age = parseInt(document.getElementById('reg-age').value, 10);
      const gender = document.getElementById('reg-gender').value;
      const category = document.getElementById('reg-category').value;
      const stateVal = document.getElementById('reg-state').value;
      const district = document.getElementById('reg-district').value;
      const education = document.getElementById('reg-education').value;
      const contact = document.getElementById('reg-contact').value;
      const email = document.getElementById('reg-email').value;

      const courseName = document.getElementById('reg-course-name').value;
      const scheme = document.getElementById('reg-scheme').value;
      const provider = document.getElementById('reg-provider').value;
      const batchId = document.getElementById('reg-batch-id').value || `BATCH-26-${Math.floor(100+Math.random()*900)}`;

      const newTrainee = {
        traineeId: newId,
        name: name,
        age: age,
        gender: gender,
        category: category,
        state: stateVal,
        district: district,
        pincode: "110001",
        highestEducation: education,
        contact: contact,
        email: email,
        registeredDate: new Date().toISOString().split('T')[0],
        currentStatus: "Enrolled & In Training",
        avatar: gender === "Female" ? "assets/images/trainee_woman.jpg" : "assets/images/trainee_tech.jpg",
        trainingRecords: [
          {
            recordId: `TR-2026-${Math.floor(10+Math.random()*90)}`,
            courseName: courseName,
            scheme: scheme,
            providerId: "TP-IND-101",
            providerName: provider,
            district: district,
            batchId: batchId,
            enrollmentDate: new Date().toISOString().split('T')[0],
            completionDate: "In Progress (Q4 2026)",
            attendancePercentage: 92.0,
            assessmentScore: 85.0,
            certificationStatus: "In Progress",
            completionStatus: "Enrolled",
            employmentOutcome: "Under Skill Training",
            automatedFollowUps: [
              {
                milestone: "30 Days Post-Training",
                question: "Did you get employment?",
                response: "Scheduled",
                channel: "WhatsApp / SMS",
                date: "Pending Completion",
                status: "Pending"
              }
            ]
          }
        ]
      };

      state.trainees.unshift(newTrainee);
      state.selectedTraineeId = newId;
      localStorage.setItem('soip_trainees', JSON.stringify(state.trainees));

      closeModal('register-trainee-modal');
      regForm.reset();
      switchTab('trainee-portal');
      renderTraineeList();
      renderSelectedTrainee();

      alert(`✅ Trainee Registered Successfully!\nPersistent Trainee ID: ${newId}`);
    });
  }

  // ==========================================
  // MODAL LOGIC: ADD COURSE TO EXISTING TRAINEE
  // ==========================================
  function openAddCourseModal(trainee) {
    if (!addCourseModal) return;
    document.getElementById('add-course-trainee-name').textContent = trainee.name;
    document.getElementById('add-course-trainee-id').textContent = trainee.traineeId;
    addCourseModal.classList.add('active');
  }

  if (addCourseForm) {
    addCourseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const trainee = state.trainees.find(t => t.traineeId === state.selectedTraineeId);
      if (!trainee) return;

      const courseName = document.getElementById('add-course-name').value;
      const scheme = document.getElementById('add-course-scheme').value;
      const provider = document.getElementById('add-course-provider').value;
      const district = document.getElementById('add-course-district').value;
      const batchId = document.getElementById('add-course-batch-id').value;
      const attendance = parseFloat(document.getElementById('add-course-attendance').value) || 92.0;
      const score = parseFloat(document.getElementById('add-course-score').value) || 88.0;
      const certStatus = document.getElementById('add-course-cert-status').value;
      const empOutcome = document.getElementById('add-course-emp-outcome').value;

      const newRecord = {
        recordId: `TR-2026-${Math.floor(100+Math.random()*900)}`,
        courseName: courseName,
        scheme: scheme,
        providerId: "TP-IND-103",
        providerName: provider,
        district: district,
        batchId: batchId,
        enrollmentDate: "2026-02-01",
        completionDate: "2026-06-30",
        attendancePercentage: attendance,
        assessmentScore: score,
        certificationStatus: certStatus,
        completionStatus: "Completed",
        employmentOutcome: empOutcome,
        automatedFollowUps: [
          {
            milestone: "30 Days Post-Training",
            question: "Did you get employment?",
            response: "Yes, Employed",
            channel: "WhatsApp Automated Form",
            date: "2026-07-30",
            status: "Verified"
          },
          {
            milestone: "90 Days (Month 3)",
            question: "Current employment details & wage?",
            response: "Employed | Role: Industrial Specialist | Wage: ₹30,000/mo",
            channel: "SMS Direct Link",
            date: "2026-08-20",
            status: "Verified (Directly Relevant)"
          }
        ]
      };

      trainee.trainingRecords.push(newRecord);
      localStorage.setItem('soip_trainees', JSON.stringify(state.trainees));

      closeModal('add-course-modal');
      addCourseForm.reset();
      renderSelectedTrainee();
      renderTraineeList();

      alert(`✅ New Course attached to Trainee ID: ${trainee.traineeId}!`);
    });
  }

  // ==========================================
  // POLICY AND ADMIN: DYNAMIC AI ANALYSIS & SKILL GAP
  // ==========================================
  function initPolicyAndAdminView() {
    populateCourseSelector();
    renderCourseAiAnalysis(state.selectedCourseId);
    renderSkillGapTable();
    initSkillGapCharts();

    initWageProgression();
  initAdminSubTabs();
  }

  function initAdminSubTabs() {

  const adminTabs = document.querySelectorAll('.admin-subtab');

  adminTabs.forEach(tab => {

    if (tab.dataset.bound === 'true') return;

    tab.dataset.bound = 'true';

    tab.addEventListener('click', () => {

      const target = tab.dataset.adminTab;

      document.querySelectorAll('.admin-subtab')
        .forEach(t => t.classList.remove('active'));

      document.querySelectorAll('.admin-subtab-panel')
        .forEach(panel => panel.classList.remove('active'));

      tab.classList.add('active');

      const targetPanel = document.getElementById(target);

      if (targetPanel) {
        targetPanel.classList.add('active');
      }

      if (target === 'admin-wage') {
        renderWageProgression();
      }

    });

  });

}
// ==========================================
// WAGE PROGRESSION ENGINE
// ==========================================

function extractWageFromText(text) {
  if (!text) return null;

  const match = text.match(
    /₹\s*([\d,]+)(?:\s*\/\s*(?:mo|month))?/i
  );

  if (!match) return null;

  return parseInt(
    match[1].replace(/,/g, ''),
    10
  );
}


function extractWageHistory(trainee) {

  const history = [];

  if (!trainee || !Array.isArray(trainee.trainingRecords)) {
    return history;
  }

  trainee.trainingRecords.forEach(record => {

    if (!Array.isArray(record.automatedFollowUps)) {
      return;
    }

    record.automatedFollowUps.forEach(followUp => {

      const wage = extractWageFromText(
        followUp.response
      );

      if (wage !== null) {

        history.push({

          traineeId: trainee.traineeId,

          traineeName: trainee.name,

          courseName:
            record.courseName || "Unknown Course",

          milestone:
            followUp.milestone || "Unspecified",

          date:
            followUp.date || new Date().toISOString(),

          wage: wage,

          response:
            followUp.response || "",

          channel:
            followUp.channel || "Unknown",

          status:
            followUp.status || "Verified"

        });

      }

    });

  });

  history.sort((a, b) => {

    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return dateA - dateB;

  });

  return history;
}

function debugWageProgression() {

  console.log(
    "========== WAGE PROGRESSION DEBUG =========="
  );

  console.log(
    "Total trainees:",
    state.trainees.length
  );

  state.trainees.forEach(trainee => {

    const history =
      extractWageHistory(trainee);

    console.log(
      trainee.name,
      trainee.traineeId,
      history
    );

  });

  console.log(
    "============================================"
  );
}

function getAllWageProgressionData() {

  const allData = [];

  state.trainees.forEach(trainee => {

    const history = extractWageHistory(trainee);

    if (history.length === 0) return;

    const first = history[0];
    const latest = history[history.length - 1];

    const growth =
      first.wage > 0
        ? ((latest.wage - first.wage) / first.wage) * 100
        : 0;

    allData.push({

      traineeId: trainee.traineeId,

      traineeName: trainee.name,

      history: history,

      startingWage: first.wage,

      latestWage: latest.wage,

      growth: growth,

      latestRole: extractRoleFromResponse(
        latest.response
      ),

      courseName: latest.courseName

    });

  });

  return allData;
}

function extractRoleFromResponse(text) {
  if (!text) {
    return "Employment Outcome";
  }

  const roleMatch = text.match(
    /Role\s*:\s*([^|,\n]+)/i
  );

  if (roleMatch) {
    return roleMatch[1].trim();
  }

  const promotedMatch = text.match(
    /Promoted to\s+([^,|\n]+)/i
  );

  if (promotedMatch) {
    return promotedMatch[1].trim();
  }

  return "Employed";
}

function initWageProgression() {

  console.log("WAGE DEBUG - trainees:", state.trainees);
  
  const select = document.getElementById(
    'wage-trainee-select'
  );

  if (!select) return;

  select.innerHTML = `
    <option value="ALL">
      All Trainees — National View
    </option>
  `;

  state.trainees.forEach(trainee => {

    const history = extractWageHistory(trainee);

    if (history.length === 0) return;

    const option = document.createElement('option');

    option.value = trainee.traineeId;

    option.textContent =
      `${trainee.name} — ${trainee.traineeId}`;

    select.appendChild(option);

  });


  select.onchange = () => {

    renderWageProgression();

  };


  const viewSelect =
    document.getElementById('wage-view-select');

  if (viewSelect) {

    viewSelect.onchange = () => {

      renderWageProgression();

    };

  }


  renderWageProgression();
  debugWageProgression();
}


function renderWageProgression() {

  const data = getAllWageProgressionData();

console.log("WAGE PROGRESSION DATA:", data);

if (!data.length) {
  console.log("WAGE PROGRESSION: No wage data found.");
  return;
}

  const traineeSelect =
    document.getElementById('wage-trainee-select');

  const viewSelect =
    document.getElementById('wage-view-select');

  const selectedId =
    traineeSelect ? traineeSelect.value : 'ALL';

  const view =
    viewSelect ? viewSelect.value : 'individual';


  updateWageKPIs(data);


  if (selectedId === 'ALL') {

  renderNationalWageChart(data);

  renderWageTable(data);

  renderNationalWageSummary(data);

  updateWagePolicyInsight(data);

  } else {

    const traineeData =
      data.find(d => d.traineeId === selectedId);

    if (!traineeData) return;

    renderIndividualWageChart(traineeData);

    renderIndividualWageSummary(traineeData);

    renderWageTable([traineeData]);

  }

}

function updateWageKPIs(data) {

  const avgStart =
    data.reduce(
      (sum, d) => sum + d.startingWage,
      0
    ) / data.length;


  const avgLatest =
    data.reduce(
      (sum, d) => sum + d.latestWage,
      0
    ) / data.length;


  const avgGrowth =
    data.reduce(
      (sum, d) => sum + d.growth,
      0
    ) / data.length;


  const positiveCount =
    data.filter(d => d.growth > 0).length;


  const positiveRate =
    (positiveCount / data.length) * 100;


  const startEl =
    document.getElementById('wage-avg-start');

  const latestEl =
    document.getElementById('wage-avg-latest');

  const growthEl =
    document.getElementById('wage-avg-growth');

  const positiveEl =
    document.getElementById('wage-positive-growth');


  if (startEl) {
    startEl.textContent =
      formatCurrency(avgStart);
  }

  if (latestEl) {
    latestEl.textContent =
      formatCurrency(avgLatest);
  }

  if (growthEl) {
    growthEl.textContent =
      `${avgGrowth.toFixed(1)}%`;
  }

  if (positiveEl) {
    positiveEl.textContent =
      `${positiveRate.toFixed(1)}%`;
  }

}

function formatCurrency(value) {

  return `₹${Math.round(value).toLocaleString('en-IN')}`;

}

function renderNationalWageChart(data) {

  const canvas =
    document.getElementById('wageProgressionChart');

  if (!canvas) return;


  if (state.charts.wageProgression) {

    state.charts.wageProgression.destroy();

  }


  const milestones = [
    "30 Days",
    "90 Days (M3)",
    "180 Days (M6)",
    "365 Days (M12)",
    "2 Years (M24)"
  ];


  const averages = milestones.map(
    milestone => {

      const wages = [];

      data.forEach(trainee => {

        const point =
          trainee.history.find(
            h => h.milestone === milestone
          );

        if (point) {
          wages.push(point.wage);
        }

      });

      if (!wages.length) return null;

      return Math.round(
        wages.reduce(
          (a, b) => a + b,
          0
        ) / wages.length
      );

    }
  );


  state.charts.wageProgression =
    new Chart(canvas, {

      type: 'line',

      data: {

        labels: milestones,

        datasets: [{

          label:
            'Average Monthly Wage',

          data: averages,

          borderColor: '#2563eb',

          backgroundColor:
            'rgba(37, 99, 235, 0.10)',

          fill: true,

          tension: 0.35,

          borderWidth: 3,

          pointRadius: 5,

          pointHoverRadius: 7

        }]

      },

      options: {

        responsive: true,

        maintainAspectRatio: false,

        interaction: {
          intersect: false,
          mode: 'index'
        },

        plugins: {

          legend: {
            position: 'bottom'
          },

          tooltip: {

            callbacks: {

              label: function(context) {

                return ` ${formatCurrency(
                  context.raw
                )} / month`;

              }

            }

          }

        },

        scales: {

          y: {

            beginAtZero: false,

            ticks: {

              callback: function(value) {

                return formatCurrency(value);

              }

            }

          }

        }

      }

    });


  const badge =
    document.getElementById(
      'wage-chart-person'
    );

  if (badge) {
    badge.textContent =
      'National Cohort';
  }

}

function renderIndividualWageChart(traineeData) {

  const canvas =
    document.getElementById('wageProgressionChart');

  if (!canvas) return;


  if (state.charts.wageProgression) {

    state.charts.wageProgression.destroy();

  }


  const labels =
    traineeData.history.map(
      h => h.milestone
    );


  const values =
    traineeData.history.map(
      h => h.wage
    );


  state.charts.wageProgression =
    new Chart(canvas, {

      type: 'line',

      data: {

        labels: labels,

        datasets: [{

          label:
            `${traineeData.traineeName}'s Monthly Wage`,

          data: values,

          borderColor: '#059669',

          backgroundColor:
            'rgba(5, 150, 105, 0.10)',

          fill: true,

          tension: 0.35,

          borderWidth: 3,

          pointRadius: 6,

          pointHoverRadius: 8

        }]

      },

      options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

          legend: {
            position: 'bottom'
          },

          tooltip: {

            callbacks: {

              label: function(context) {

                return ` ${formatCurrency(
                  context.raw
                )} / month`;

              }

            }

          }

        },

        scales: {

          y: {

            beginAtZero: false,

            ticks: {

              callback: function(value) {

                return formatCurrency(value);

              }

            }

          }

        }

      }

    });


  const badge =
    document.getElementById(
      'wage-chart-person'
    );

  if (badge) {

    badge.textContent =
      traineeData.traineeName;

  }

}

function renderIndividualWageSummary(data) {

  const container =
    document.getElementById(
      'wage-trainee-summary'
    );

  if (!container) return;


  const first = data.history[0];

  const latest =
    data.history[data.history.length - 1];


  const growth =
    data.growth;


  container.innerHTML = `

    <div class="wage-summary-inner">

      <div class="wage-summary-main">

        <h3>
          ${data.traineeName}
        </h3>

        <p>
          ${data.courseName}
        </p>

        <p>
          Trainee ID:
          <strong>${data.traineeId}</strong>
        </p>

      </div>


      <div class="wage-summary-metric">

        <span>
          Starting Wage
        </span>

        <strong>
          ${formatCurrency(first.wage)}
        </strong>

      </div>


      <div class="wage-summary-metric">

        <span>
          Latest Wage
        </span>

        <strong>
          ${formatCurrency(latest.wage)}
        </strong>

      </div>


      <div class="wage-summary-metric">

        <span>
          Wage Growth
        </span>

        <strong class="${
          growth >= 0
            ? 'wage-growth-positive'
            : 'wage-growth-negative'
        }">

          ${growth >= 0 ? '+' : ''}
          ${growth.toFixed(1)}%

        </strong>

      </div>

    </div>

  `;

}

function renderNationalWageSummary(data) {

  const container =
    document.getElementById(
      'wage-trainee-summary'
    );

  if (!container) return;


  const highest =
    [...data].sort(
      (a, b) => b.growth - a.growth
    )[0];


  const avgGrowth =
    data.reduce(
      (sum, d) => sum + d.growth,
      0
    ) / data.length;


  container.innerHTML = `

    <div class="wage-summary-inner">

      <div class="wage-summary-main">

        <h3>
          National Wage Progression Snapshot
        </h3>

        <p>
          Aggregated from verified employment follow-ups
          available in the current SOIP dataset.
        </p>

      </div>


      <div class="wage-summary-metric">

        <span>
          Cohort Size
        </span>

        <strong>
          ${data.length}
        </strong>

      </div>


      <div class="wage-summary-metric">

        <span>
          Average Growth
        </span>

        <strong class="wage-growth-positive">

          +${avgGrowth.toFixed(1)}%

        </strong>

      </div>


      <div class="wage-summary-metric">

        <span>
          Highest Growth
        </span>

        <strong>

          ${highest
            ? highest.traineeName
            : '—'}

        </strong>

      </div>

    </div>

  `;

}

function renderWageTable(data) {

  const tbody =
    document.getElementById(
      'wage-progression-table-body'
    );

  if (!tbody) return;


  tbody.innerHTML = data.map(d => {

    const growthClass =
      d.growth >= 0
        ? 'wage-growth-positive'
        : 'wage-growth-negative';


    return `

      <tr>

        <td>

          <strong>
            ${d.traineeName}
          </strong>

          <div style="
            font-size:0.68rem;
            color:#64748b;
            margin-top:2px;
            font-family:monospace;
          ">

            ${d.traineeId}

          </div>

        </td>


        <td>
          ${d.courseName}
        </td>


        <td>
          ${formatCurrency(d.startingWage)}
        </td>


        <td>
          <strong>
            ${formatCurrency(d.latestWage)}
          </strong>
        </td>


        <td>

          <span class="${growthClass}">

            ${d.growth >= 0 ? '+' : ''}
            ${d.growth.toFixed(1)}%

          </span>

        </td>


        <td>
          ${d.latestRole}
        </td>


        <td>

          <span class="wage-status-badge">

            ${d.growth > 0
              ? 'Positive Progression'
              : 'Stable'}

          </span>

        </td>

      </tr>

    `;

  }).join('');

}  

function updateWagePolicyInsight(data) {

  const container =
    document.getElementById(
      'wage-policy-insight'
    );

  if (!container || !data.length) return;


  const avgGrowth =
    data.reduce(
      (sum, d) => sum + d.growth,
      0
    ) / data.length;


  const positive =
    data.filter(
      d => d.growth > 0
    ).length;


  const positiveRate =
    (positive / data.length) * 100;


  container.innerHTML = `

    <h3>
      💡 Outcome Intelligence
    </h3>

    <p>

      Across the currently available verified wage records,
      the average observed wage progression is

      <strong>
        ${avgGrowth.toFixed(1)}%
      </strong>.

      <strong>
        ${positiveRate.toFixed(1)}%
      </strong>

      of tracked trainees show positive wage progression.

      This helps policymakers assess whether training is producing
      not only employment, but improving economic outcomes over time.

    </p>

  `;

}


  function populateCourseSelector() {
    if (!aiCourseSelect) return;
    aiCourseSelect.innerHTML = state.coursesAnalysis.map(c => `
      <option value="${c.courseId}" ${c.courseId === state.selectedCourseId ? 'selected' : ''}>
        ${c.courseName}
      </option>
    `).join('');

    aiCourseSelect.onchange = (e) => {
      state.selectedCourseId = e.target.value;
      renderCourseAiAnalysis(state.selectedCourseId);
    };
  }

  function renderCourseAiAnalysis(courseId) {
    const course = state.coursesAnalysis.find(c => c.courseId === courseId) || state.coursesAnalysis[0];
    if (!course) return;

    // 1. Render Cohort Numbers
    if (aiCohortStatsView) {
      aiCohortStatsView.innerHTML = `
        <div class="ai-cohort-summary-card">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <span class="role-badge" style="background:rgba(59, 130, 246, 0.2); color:#93c5fd; border-color:rgba(59, 130, 246, 0.4);">
                Sector: ${course.sector}
              </span>
              <h3 style="font-family:var(--font-heading); font-size:1.4rem; font-weight:800; margin-top:8px;">
                ${course.courseName}
              </h3>
            </div>
            <div style="text-align:right;">
              <span style="font-size:0.8rem; color:#94a3b8;">Completion Rate</span>
              <div style="font-size:1.6rem; font-weight:800; color:#10b981;">${course.completionRate}%</div>
            </div>
          </div>

          <div class="cohort-stat-row">
            <div class="cohort-metric-box">
              <div class="cohort-metric-val">${course.totalEnrolled.toLocaleString('en-IN')}</div>
              <div class="cohort-metric-lbl">Total Enrolled</div>
            </div>
            <div class="cohort-metric-box">
              <div class="cohort-metric-val" style="color:#60a5fa;">${course.outcomes.employed.toLocaleString('en-IN')}</div>
              <div class="cohort-metric-lbl">Employed (${((course.outcomes.employed / course.totalCompleted)*100).toFixed(1)}%)</div>
            </div>
            <div class="cohort-metric-box">
              <div class="cohort-metric-val" style="color:#f59e0b;">${course.outcomes.selfEmployed.toLocaleString('en-IN')}</div>
              <div class="cohort-metric-lbl">Self-Employed (${((course.outcomes.selfEmployed / course.totalCompleted)*100).toFixed(1)}%)</div>
            </div>
            <div class="cohort-metric-box">
              <div class="cohort-metric-val" style="color:#a78bfa;">${course.outcomes.apprenticeship.toLocaleString('en-IN')}</div>
              <div class="cohort-metric-lbl">Apprenticeship (${((course.outcomes.apprenticeship / course.totalCompleted)*100).toFixed(1)}%)</div>
            </div>
          </div>
        </div>
      `;
    }

    // 2. Render Course-Specific AI Insights
    if (aiInsightsContainer) {
      aiInsightsContainer.innerHTML = course.aiAnalysisInsights.map(insight => {
        let factorsHtml = '';
        if (insight.factors && insight.factors.length > 0) {
          factorsHtml = `
            <div class="factors-chip-list">
              ${insight.factors.map(f => `
                <div class="factor-chip-row">
                  <span>${f.name}</span>
                  <strong>${f.value}</strong>
                </div>
              `).join('')}
            </div>
          `;
        }

        return `
          <div class="ai-insight-card">
            <h4>
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              ${insight.title}
            </h4>
            <div class="ai-insight-summary">
              ${insight.summary}
            </div>
            ${factorsHtml}
            <div class="ai-rec-box">
              <strong>Actionable Policy Recommendation:</strong> ${insight.recommendation}
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // ==========================================
  // SKILL GAP MATRIX TABLE & CHARTS
  // ==========================================
  function renderSkillGapTable() {
    if (!skillGapTableBody) return;
    skillGapTableBody.innerHTML = state.skillGapMatrix.map(row => {
      const isDeficit = row.deficitIndex < 0;
      const indexText = isDeficit ? `${row.deficitIndex}% Deficit` : `+${row.deficitIndex}% Surplus`;

      return `
        <tr>
          <td>
            <strong>${row.sector}</strong>
          </td>
          <td>
            <div class="demand-supply-meter">
              <span style="font-weight:700; width:28px;">${row.industryDemand}</span>
              <div class="meter-bar-track">
                <div class="meter-bar-fill" style="width:${row.industryDemand}%; background:#2563eb;"></div>
              </div>
            </div>
          </td>
          <td>
            <div class="demand-supply-meter">
              <span style="font-weight:700; width:28px;">${row.trainingSupply}</span>
              <div class="meter-bar-track">
                <div class="meter-bar-fill" style="width:${row.trainingSupply}%; background:#f59e0b;"></div>
              </div>
            </div>
          </td>
          <td>
            <span class="deficit-badge ${row.statusColor}">${row.status} (${indexText})</span>
          </td>
          <td>
            <span style="font-size:0.8125rem; color:#475569;">${row.districtsImpacted}</span>
          </td>
          <td>
            <span style="font-size:0.8125rem; font-weight:600; color:#0f172a;">${row.policyAction}</span>
          </td>
        </tr>
      `;
    }).join('');
  }

  function initSkillGapCharts() {
    // 1. Skill Gap Comparison Bar Chart
    const barCtx = document.getElementById('skillGapBarChart');
    if (barCtx && !state.charts.skillGapBar) {
      state.charts.skillGapBar = new Chart(barCtx, {
        type: 'bar',
        data: {
          labels: state.skillGapMatrix.map(s => s.sector.substring(0, 16) + '...'),
          datasets: [
            {
              label: 'Industry Hiring Demand (/100)',
              data: state.skillGapMatrix.map(s => s.industryDemand),
              backgroundColor: '#2563eb',
              borderRadius: 4
            },
            {
              label: 'Training Supply Output (/100)',
              data: state.skillGapMatrix.map(s => s.trainingSupply),
              backgroundColor: '#f59e0b',
              borderRadius: 4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { boxWidth: 12 } }
          },
          scales: {
            y: { beginAtZero: true, max: 100 }
          }
        }
      });
    }

    // 2. Retention Curve Line Chart
    const retentionCtx = document.getElementById('retentionCurveChart');
    if (retentionCtx && !state.charts.retention) {
      state.charts.retention = new Chart(retentionCtx, {
        type: 'line',
        data: {
          labels: ["M0 (Graduation)", "30 Days", "90 Days (M3)", "180 Days (M6)", "365 Days (M12)", "2 Years (M24)"],
          datasets: [
            {
              label: 'Renewable Energy & Solar',
              data: [100, 93, 85, 72, 68, 62],
              borderColor: "#10b981",
              tension: 0.35,
              borderWidth: 2.5
            },
            {
              label: 'IT & Cloud Technologies',
              data: [100, 95, 89, 78, 74, 70],
              borderColor: "#2563eb",
              tension: 0.35,
              borderWidth: 2.5
            },
            {
              label: 'Automotive & Precision Machining',
              data: [100, 88, 76, 58, 52, 46],
              borderColor: "#f59e0b",
              tension: 0.35,
              borderWidth: 2.5
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { boxWidth: 12 } }
          },
          scales: {
            y: { min: 20, max: 105, ticks: { callback: (val) => val + '%' } }
          }
        }
      });
    }
  }

  // ==========================================
  // PROVIDER PORTAL RENDERER
  // ==========================================
  function renderProviderPortal() {
    const pContainer = document.getElementById('providers-grid-view');
    if (!pContainer) return;

    pContainer.innerHTML = state.providers.map(p => `
      <div class="policy-card">
        <div class="policy-card-title">
          <span>${p.name}</span>
          <span class="role-badge" style="background:#eff6ff; color:#1d4ed8; border-color:#bfdbfe;">${p.accreditation}</span>
        </div>
        <div class="policy-card-desc">
          ${p.district}, ${p.state} &bull; Center ID: <code>${p.id}</code> &bull; Type: <strong>${p.centerType}</strong>
        </div>

        <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:10px; background:#f8fafc; padding:12px; border-radius:8px; margin: 12px 0;">
          <div>
            <span style="font-size:0.7rem; color:#64748b; display:block;">ACTIVE BATCHES</span>
            <strong style="font-size:1.1rem; color:#0f172a;">${p.activeBatches}</strong>
          </div>
          <div>
            <span style="font-size:0.7rem; color:#64748b; display:block;">CANDIDATES TRAINED</span>
            <strong style="font-size:1.1rem; color:#2563eb;">${p.totalTrained.toLocaleString('en-IN')}</strong>
          </div>
          <div>
            <span style="font-size:0.7rem; color:#64748b; display:block;">PLACEMENT RATE</span>
            <strong style="font-size:1.1rem; color:#16a34a;">${p.placementRate}%</strong>
          </div>
          <div>
            <span style="font-size:0.7rem; color:#64748b; display:block;">MEDIAN SALARY</span>
            <strong style="font-size:1.1rem; color:#0d9488;">₹${p.avgSalary.toLocaleString('en-IN')}</strong>
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:14px; font-size:0.8125rem;">
          <div>
            <strong>Center Head:</strong> ${p.contactPerson} (${p.phone})
          </div>
          <button class="btn-outline btn-sm" onclick="alert('Batch sync active for center ${p.id}')">
            View Batches
          </button>
        </div>
      </div>
    `).join('');
  }

  // ==========================================
  // ACCESSIBILITY & UTILITIES
  // ==========================================
  const fontSizes = ['14px', '16px', '18px'];
  
  if (fontIncBtn) {
    fontIncBtn.addEventListener('click', () => {
      if (state.fontSizeLevel < 2) {
        state.fontSizeLevel++;
        document.documentElement.style.setProperty('--base-font-size', fontSizes[state.fontSizeLevel]);
      }
    });
  }

  if (fontDecBtn) {
    fontDecBtn.addEventListener('click', () => {
      if (state.fontSizeLevel > 0) {
        state.fontSizeLevel--;
        document.documentElement.style.setProperty('--base-font-size', fontSizes[state.fontSizeLevel]);
      }
    });
  }

  if (fontResetBtn) {
    fontResetBtn.addEventListener('click', () => {
      state.fontSizeLevel = 1;
      document.documentElement.style.setProperty('--base-font-size', fontSizes[1]);
    });
  }

  if (contrastToggleBtn) {
    contrastToggleBtn.addEventListener('click', () => {
      state.isHighContrast = !state.isHighContrast;
      document.body.classList.toggle('high-contrast', state.isHighContrast);
    });
  }

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      state.currentLang = state.currentLang === 'en' ? 'hi' : 'en';
      langToggleBtn.innerHTML = state.currentLang === 'en' ? '🌐 English / हिन्दी' : '🌐 हिन्दी / English';
    });
  }

  // Initial Boot
  applyRoleAccess();
  renderTraineeList();
  renderSelectedTrainee();
});


function initializeAdminOverview() {

    console.log("Admin Overview loaded");

}


function initializeWageProgression() {

    console.log("Wage Progression loaded");

}


function initializeRetentionAnalysis() {

    console.log("Retention Analysis loaded");

}


function initializeSkillGapAnalysis() {

    console.log("Skill Gap Analysis loaded");

}


function initializeOutcomeDiagnosis() {

    console.log("Outcome Diagnosis loaded");

}


function initializeCourseProviderAnalysis() {

    console.log("Course & Provider Analysis loaded");

}
// --- MYSQL BACKEND CONNECTOR ---
const registerForm = document.getElementById('register-trainee-form');

if (registerForm) {
  registerForm.addEventListener('submit', async () => {
    // Give the original registration handler time to process the form.
    // This connector only handles the MySQL save.

    const sector =
      document.getElementById('reg-sector-code')?.value.trim() || 'SKL';

    let traineeId =
      document.getElementById('reg-trainee-id')?.value.trim();

    if (!traineeId) {
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      traineeId = `${sector}-26#${randomNum}`;
    }

    const payload = {
      Trainee_ID: traineeId,
      Full_Name:
        document.getElementById('reg-name')?.value.trim() ||
        'Anonymous Trainee',

      Date_Of_Birth: '2000-01-01',

      Gender:
        document.getElementById('reg-gender')?.value ||
        'Male',

      Phone:
        document.getElementById('reg-contact')?.value.trim() ||
        '9876543210',

      EMail:
        document.getElementById('reg-email')?.value.trim() ||
        'trainee@example.com',

      Address:
        document.getElementById('reg-district')?.value.trim() ||
        'Gautam Buddha Nagar',

      State:
        document.getElementById('reg-state')?.value.trim() ||
        'Uttar Pradesh'
    };

    try {
      const response = await fetch(
        'http://localhost:5000/api/trainees',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log(
          '✅ MYSQL SAVE SUCCESS:',
          result
        );
      } else {
        console.error(
          '❌ MYSQL SAVE FAILED:',
          result
        );
      }

    } catch (err) {
      console.error(
        '❌ Could not connect to backend:',
        err
      );
    }
  });
}