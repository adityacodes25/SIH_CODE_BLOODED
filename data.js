/**
 * SKILL OUTCOME INTELLIGENCE PORTAL (SOIP)
 * Central Data Store with Multi-Course AI Analysis, Outcome Tracking & Skill Gap Matrix
 * SIH 2026
 */

const SOIP_DATA = {
  sectors: [
    { code: "SKL", name: "General Vocational Skills" },
    { code: "SOL", name: "Renewable Energy & Solar" },
    { code: "ELC", name: "Electronics & Hardware" },
    { code: "IT",  name: "IT & Digital Technologies" },
    { code: "HLT", name: "Healthcare & Life Sciences" },
    { code: "MFG", name: "Automotive & Advanced Manufacturing" },
    { code: "LOG", name: "Logistics & Supply Chain" }
  ],

  schemes: [
    "PMKVY 4.0 (Pradhan Mantri Kaushal Vikas Yojana)",
    "DDU-GKY (Deen Dayal Upadhyaya Grameen Kaushalya Yojana)",
    "NAPS (National Apprenticeship Promotion Scheme)",
    "PM-Vishwakarma Yojana",
    "STRIVE (Skills Strengthening for Industrial Value Enhancement)",
    "State Skill Development Mission (SSDM)"
  ],

  // Macro Automated Follow-Up & Outcome Tracking System (Admin Level Analytics)
  outcomeTrackingEngine: {
    followUpCadence: [
      {
        timeline: "30 Days Post-Training",
        primaryQuestion: "Did you get employment?",
        totalContacted: "85,400 Candidates",
        responseRate: "88.2%",
        verifiedEmployed: "69.4%",
        channels: { smsWhatsapp: "68.4%", ivrAssisted: "21.2%", fieldVerification: "10.4%" }
      },
      {
        timeline: "90 Days (Month 3)",
        primaryQuestion: "Current job role, salary, location & training relevance?",
        totalContacted: "78,200 Candidates",
        responseRate: "84.5%",
        avgSalary: "₹18,400/mo",
        jobRelevance: "81.2% Relevant to trade",
        channels: { smsWhatsapp: "64.1%", ivrAssisted: "23.5%", fieldVerification: "12.4%" }
      },
      {
        timeline: "180 Days (Month 6)",
        primaryQuestion: "Are you still employed or left the job?",
        totalContacted: "72,100 Candidates",
        responseRate: "81.0%",
        retentionStatus: "68.0% Retained (32% Left/Resigned)",
        channels: { smsWhatsapp: "59.3%", ivrAssisted: "27.1%", fieldVerification: "13.6%" }
      },
      {
        timeline: "365 Days (1 Year)",
        primaryQuestion: "Annual retention audit & wage growth check?",
        totalContacted: "64,800 Candidates",
        responseRate: "76.4%",
        retentionStatus: "61.0% Retained @ 12M",
        avgSalaryGrowth: "+34.8% Wage Growth",
        channels: { smsWhatsapp: "54.0%", ivrAssisted: "29.2%", fieldVerification: "16.8%" }
      },
      {
        timeline: "2 Years Horizon",
        primaryQuestion: "Long-term career progression & upskilling?",
        totalContacted: "48,500 Candidates",
        responseRate: "70.2%",
        retentionStatus: "56.4% Retained in sector",
        channels: { smsWhatsapp: "51.2%", ivrAssisted: "31.0%", fieldVerification: "17.8%" }
      },
      {
        timeline: "5 Years Horizon",
        primaryQuestion: "Lifelong livelihood & enterprise growth?",
        totalContacted: "22,000 Candidates",
        responseRate: "62.8%",
        retentionStatus: "51.0% Formal Livelihood",
        channels: { smsWhatsapp: "46.0%", ivrAssisted: "34.5%", fieldVerification: "19.5%" }
      }
    ]
  },

  // Multi-Course AI Outcome Analysis Database
  coursesAnalysis: [
    {
      courseId: "COURSE-SOL-01",
      courseName: "Course X: Industrial Solar & Smart Electrical Automation",
      sector: "Renewable Energy & Solar",
      totalEnrolled: 10000,
      totalCompleted: 8500,
      completionRate: 85.0,
      outcomes: {
        employed: 5900,        // 69.4% of completed
        selfEmployed: 700,      // 8.2%
        apprenticeship: 500,    // 5.9%
        unemployed: 1400        // 16.5%
      },
      aiAnalysisInsights: [
        {
          title: "Post-Placement Retention & Early Exit",
          summary: "32% of trainees who secured employment left/resigned within the first 3–6 months.",
          factors: [
            { name: "Wage vs Living Cost Disparity (< ₹14,000/mo in Tier-1 cities)", value: "48%" },
            { name: "Relocation & Transit Friction (Lack of lodging support)", value: "31%" },
            { name: "Role Expectation Mismatch vs Factory Reality", value: "21%" }
          ],
          recommendation: "Deploy Post-Placement Support Allowance (PPSA) of ₹3,000/month for first 6 months to reduce early attrition."
        },
        {
          title: "Regional Employment Variation",
          summary: "Course X averages 70% state employment, but drops to 40% in District X.",
          factors: [
            { name: "Local industrial cluster demand saturation in District X", value: "62%" },
            { name: "Lack of interstate placement tie-ups by local training centers", value: "38%" }
          ],
          recommendation: "Establish placement corridors with neighboring industrial hubs."
        },
        {
          title: "Gender Participation & Placement Lag",
          summary: "Female trainees in District X had a 28% lower placement rate in technical shifts.",
          factors: [
            { name: "Lack of safe evening transit options", value: "54%" },
            { name: "Workplace amenity constraints", value: "46%" }
          ],
          recommendation: "Provide dedicated safe transport subsidies and partner with verified equal-opportunity employers."
        },
        {
          title: "Foundational Skill Prerequisites",
          summary: "78% of unplaced candidates lacked prior foundational digital literacy.",
          factors: [
            { name: "Absence of a mandatory digital onboarding bridge module", value: "100%" }
          ],
          recommendation: "Introduce a mandatory 20-hour Digital Skills Bridge Module before technical training."
        }
      ]
    },
    {
      courseId: "COURSE-IT-02",
      courseName: "Course Y: Cloud Infrastructure & Python Automation",
      sector: "IT & Digital Technologies",
      totalEnrolled: 8200,
      totalCompleted: 7400,
      completionRate: 90.2,
      outcomes: {
        employed: 6100,        // 82.4%
        selfEmployed: 400,      // 5.4%
        apprenticeship: 300,    // 4.1%
        unemployed: 600         // 8.1%
      },
      aiAnalysisInsights: [
        {
          title: "Post-Placement Retention & Stability",
          summary: "High retention with only 14% attrition within 6 months due to competitive initial wages.",
          factors: [
            { name: "Competitive median starting salary (₹26,000/mo)", value: "72%" },
            { name: "Hybrid / Remote work flexibility", value: "28%" }
          ],
          recommendation: "Scale cohort capacity by 40% to meet corporate cloud transformation demand."
        },
        {
          title: "Tier-1 vs Tier-3 Placement Gap",
          summary: "88% placement in Tier-1 metropolitan hubs vs 52% in Tier-3 regional centers.",
          factors: [
            { name: "Concentration of IT employers in major technology hubs", value: "80%" },
            { name: "English communication confidence in rural cohorts", value: "20%" }
          ],
          recommendation: "Implement remote apprenticeship programs for Tier-2/3 candidates."
        }
      ]
    },
    {
      courseId: "COURSE-MFG-03",
      courseName: "Course Z: Precision CNC Machining & Industrial Tooling",
      sector: "Automotive & Advanced Manufacturing",
      totalEnrolled: 6500,
      totalCompleted: 5200,
      completionRate: 80.0,
      outcomes: {
        employed: 4000,        // 76.9%
        selfEmployed: 300,      // 5.8%
        apprenticeship: 450,    // 8.7%
        unemployed: 450         // 8.6%
      },
      aiAnalysisInsights: [
        {
          title: "Post-Placement Retention Analysis",
          summary: "26% of candidates exited within 6 months due to physical workshop fatigue.",
          factors: [
            { name: "Rigorous 10-hour shift schedules", value: "52%" },
            { name: "Slow initial wage progression in Tier-2 vendor units", value: "48%" }
          ],
          recommendation: "Transition candidates from unorganized vendors to Tier-1 OEM formal apprenticeships."
        },
        {
          title: "Regional Hub Alignment",
          summary: "84% placement success in Pune, Chennai, and Manesar manufacturing belts.",
          factors: [
            { name: "Strong auto-cluster density", value: "90%" }
          ],
          recommendation: "Replicate Pune dual-training model in emerging eastern manufacturing corridors."
        }
      ]
    },
    {
      courseId: "COURSE-HLT-04",
      courseName: "Course W: General Duty Healthcare & Emergency Care Assistant",
      sector: "Healthcare & Life Sciences",
      totalEnrolled: 7800,
      totalCompleted: 7000,
      completionRate: 89.7,
      outcomes: {
        employed: 5800,        // 82.9%
        selfEmployed: 200,      // 2.9%
        apprenticeship: 400,    // 5.7%
        unemployed: 600         // 8.5%
      },
      aiAnalysisInsights: [
        {
          title: "Post-Placement Retention & Progression",
          summary: "18% attrition within 6 months; 44% of retained staff enrolled in advanced nursing upskilling.",
          factors: [
            { name: "Clear clinical ladder progression", value: "65%" },
            { name: "Hospital accreditation standards", value: "35%" }
          ],
          recommendation: "Create bridge certification routes enabling GDA candidates to qualify for ANM/GNM seats."
        }
      ]
    }
  ],

  // SKILL GAP ANALYSIS MATRIX (Industry Demand vs Training Supply)
  skillGapMatrix: [
    {
      sector: "Green Hydrogen & Solar Storage",
      industryDemand: 92,
      trainingSupply: 41,
      deficitIndex: -51,
      status: "CRITICAL DEFICIT",
      statusColor: "danger",
      districtsImpacted: "Rajasthan (Barmer, Jodhpur), Gujarat (Kutch)",
      policyAction: "Launch ₹120 Cr National Green Hydrogen Skilling Curriculum across 40 ITIs."
    },
    {
      sector: "Semiconductor Packaging & Assembly (ATMP)",
      industryDemand: 95,
      trainingSupply: 28,
      deficitIndex: -67,
      status: "EXTREME DEFICIT",
      statusColor: "danger",
      districtsImpacted: "Gujarat (Sanand), Odisha, Karnataka",
      policyAction: "Establish 15 Cleanroom Simulator Labs with India Semiconductor Mission (ISM)."
    },
    {
      sector: "EV Drivetrain & High-Voltage Battery Maintenance",
      industryDemand: 86,
      trainingSupply: 45,
      deficitIndex: -41,
      status: "HIGH DEFICIT",
      statusColor: "warning",
      districtsImpacted: "Maharashtra (Pune), Tamil Nadu (Hosur), Haryana",
      policyAction: "Mandate EV OEM co-certification for all automotive ITI batches."
    },
    {
      sector: "AI Data Annotation & Digital Engineering",
      industryDemand: 94,
      trainingSupply: 52,
      deficitIndex: -42,
      status: "HIGH DEFICIT",
      statusColor: "warning",
      districtsImpacted: "Tier-2/3 Digital Hubs (Indore, Coimbatore, Jaipur)",
      policyAction: "Integrate GenAI tools into FutureSkills PRIME portal."
    },
    {
      sector: "Precision CNC & Aerospace Tooling",
      industryDemand: 80,
      trainingSupply: 58,
      deficitIndex: -22,
      status: "MODERATE GAP",
      statusColor: "info",
      districtsImpacted: "Karnataka (Bengaluru), Telangana (Hyderabad)",
      policyAction: "Upgrade legacy 3-axis machinery with 5-axis CNC simulators."
    },
    {
      sector: "Traditional Retail Cashiering & Data Entry",
      industryDemand: 30,
      trainingSupply: 75,
      deficitIndex: +45,
      status: "OVERSUPPLIED",
      statusColor: "secondary",
      districtsImpacted: "Nationwide urban centers",
      policyAction: "Pivot 50% training capacity from manual cashiering into E-Commerce logistics."
    }
  ],

  // Trainees with Persistent Trainee ID
  trainees: [
    {
      traineeId: "SKL-26#849201",
      name: "Anjali Sharma",
      age: 22,
      gender: "Female",
      category: "OBC",
      state: "Uttar Pradesh",
      district: "Gautam Buddha Nagar",
      pincode: "201301",
      highestEducation: "Diploma in Electrical & Electronics",
      contact: "+91 98712 34509",
      email: "anjali.sharma22@email.gov.in",
      registeredDate: "2024-03-15",
      currentStatus: "Employed & Retained",
      avatar: "assets/images/trainee_woman.jpg",
      trainingRecords: [
        {
          recordId: "TR-2024-01",
          courseName: "Assistant Electrician & Circuit Assembly (NSQF Level 3)",
          scheme: "PMKVY 4.0 (Pradhan Mantri Kaushal Vikas Yojana)",
          providerId: "TP-IND-101",
          providerName: "National Skill Training Institute (NSTI), Noida",
          district: "Gautam Buddha Nagar",
          batchId: "NSTI-ELC-2024-B1",
          enrollmentDate: "2024-04-01",
          completionDate: "2024-07-15",
          attendancePercentage: 94.5,
          assessmentScore: 88.0,
          skills: {
  "Electrical Wiring": 82,
  "Circuit Assembly": 88,
  "Electrical Safety": 91,
  "Equipment Handling": 84,
  "Fault Diagnosis": 68,
  "Industrial Automation": 55
},

          certificationStatus: "Certified (Grade A)",
          completionStatus: "Completed",
          employmentOutcome: "Formal Wage Employment",
          automatedFollowUps: [
            {
              milestone: "30 Days Post-Training",
              question: "Did you get employment?",
              response: "Yes, Employed",
              channel: "WhatsApp Automated Form",
              date: "2024-08-15",
              status: "Verified"
            },
            {
              milestone: "90 Days (Month 3)",
              question: "Current employment details & wage?",
              response: "Employed @ Dixon Tech | ₹16,500/mo | Noida | Role: Assembly Operator",
              channel: "SMS Direct Link",
              date: "2024-10-15",
              status: "Verified (Directly Relevant)"
            },
            {
              milestone: "180 Days (Month 6)",
              question: "Are you still employed or left the job?",
              response: "Still Employed (Promoted to Sr. Operator, ₹18,000/mo)",
              channel: "IVR Call Assisted (Pressed 1: Employed)",
              date: "2025-01-15",
              status: "Retained (Overcame 32% Attrition Window)"
            },
            {
              milestone: "365 Days (1 Year)",
              question: "Annual retention and salary progression audit?",
              response: "Still Employed (Quality QA Tech, ₹21,500/mo)",
              channel: "Assisted Field Verification (District Officer)",
              date: "2025-07-20",
              status: "Retained"
            },
            {
              milestone: "2 Years Horizon",
              question: "Long-term career status & upskilling?",
              response: "Promoted to Line In-Charge (₹26,000/mo) & Enrolled in IoT Course",
              channel: "Web Portal Self-Update",
              date: "2026-07-25",
              status: "Upskilled & Retained"
            }
          ]
        },
        {
          recordId: "TR-2026-02",
          courseName: "Industrial IoT & Smart Automation Technician (NSQF Level 5)",
          skills: {
  "Industrial Automation": 78,
  "PLC & Control Systems": 64,
  "Electrical Systems": 88,
  "IoT Fundamentals": 69,
  "Troubleshooting": 55,
  "Safety Procedures": 91
},

          scheme: "STRIVE (Skills Strengthening for Industrial Value Enhancement)",
          providerId: "TP-IND-101",
          providerName: "National Skill Training Institute (NSTI), Noida",
          district: "Gautam Buddha Nagar",
          batchId: "NSTI-IIOT-2026-B3",
          enrollmentDate: "2026-01-10",
          completionDate: "2026-05-30",
          attendancePercentage: 96.0,
          assessmentScore: 92.5,
          skills: {
  "Solar Installation": 86,
  "Electrical Wiring": 82,
  "Safety Procedures": 90,
  "System Maintenance": 62,
  "Fault Diagnosis": 55,
  "Troubleshooting": 48
},
          certificationStatus: "Certified (Distinction)",
          completionStatus: "Completed",
          employmentOutcome: "Formal Wage Employment (Automation Specialist @ ₹32,000/mo)",
          automatedFollowUps: [
            {
              milestone: "30 Days Post-Training",
              question: "Did you get employment?",
              response: "Yes, Employed @ Schneider Electric",
              channel: "WhatsApp Automated Form",
              date: "2026-06-30",
              status: "Verified"
            },
            {
              milestone: "90 Days (Month 3)",
              question: "Current employment details & wage?",
              response: "Employed @ Schneider Electric | ₹32,000/mo | Junior Automation Lead",
              channel: "SMS Direct Link",
              date: "2026-08-20",
              status: "Verified (Directly Relevant)"
            }
          ]
        }
      ]
    },
    {
      traineeId: "SOL-26#419820",
      name: "Rameshwar Patel",
      age: 24,
      gender: "Male",
      category: "General",
      state: "Rajasthan",
      district: "Jaipur",
      pincode: "302012",
      highestEducation: "12th Science / ITI Wireman",
      contact: "+91 94142 88102",
      email: "rameshwar.patel@email.gov.in",
      registeredDate: "2025-01-08",
      currentStatus: "Self-Employed Solar Contractor",
      avatar: "assets/images/trainee_solar.jpg",
      trainingRecords: [
        {
          recordId: "TR-2025-08",
          courseName: "Solar PV Rooftop Installer - Suryamitra (NSQF Level 4)",
          skills: {
  "Solar Installation": 86,
  "Electrical Wiring": 82,
  "Solar PV Systems": 88,
  "Safety Procedures": 90,
  "System Maintenance": 62,
  "Fault Diagnosis": 55
},
          scheme: "PMKVY 4.0 (Special Green Jobs Window)",
          providerId: "TP-IND-102",
          providerName: "Apex Renewable Energy Skill Academy",
          district: "Jaipur",
          batchId: "APEX-SOL-2025-B4",
          enrollmentDate: "2025-02-01",
          completionDate: "2025-05-15",
          attendancePercentage: 91.0,
          assessmentScore: 85.5,
          skills: {
  "Python": 91,
  "Cloud Fundamentals": 88,
  "Linux": 84,
  "Networking": 86,
  "Cloud Troubleshooting": 72,
  "Automation": 78
},
          certificationStatus: "Certified (Grade A)",
          completionStatus: "Completed",
          employmentOutcome: "Self-Employed (Solar Rooftop Contractor)",
          automatedFollowUps: [
            {
              milestone: "30 Days Post-Training",
              question: "Did you get employment?",
              response: "Yes, Self-Employed (Shree Solar Solutions)",
              channel: "WhatsApp Automated Form",
              date: "2025-06-15",
              status: "Verified"
            },
            {
              milestone: "90 Days (Month 3)",
              question: "Current employment details & wage?",
              response: "Self-Employed Contractor | ₹22,000/mo income | Jaipur",
              channel: "SMS Direct Link",
              date: "2025-08-15",
              status: "Verified"
            },
            {
              milestone: "180 Days (Month 6)",
              question: "Are you still employed or left the job?",
              response: "Still Active (Expanded to 3 staff, ₹28,500/mo)",
              channel: "IVR Call Assisted (Pressed 2: Self-Employed)",
              date: "2025-11-15",
              status: "Retained (Micro-Enterprise)"
            },
            {
              milestone: "365 Days (1 Year)",
              question: "Annual retention and salary progression audit?",
              response: "EPC Contractor | ₹42,000/mo avg income",
              channel: "Assisted Field Verification",
              date: "2026-05-20",
              status: "High Growth"
            }
          ]
        }
      ]
    },
    {
      traineeId: "IT-26#903412",
      name: "Vikas Yadav",
      age: 23,
      gender: "Male",
      category: "OBC",
      state: "Karnataka",
      district: "Bengaluru Urban",
      pincode: "560068",
      highestEducation: "B.Sc Computer Science",
      contact: "+91 80234 56789",
      email: "vikas.yadav26@email.gov.in",
      registeredDate: "2025-06-10",
      currentStatus: "Employed in IT Services",
      avatar: "assets/images/trainee_tech.jpg",
      trainingRecords: [
        {
          recordId: "TR-2025-14",
          courseName: "Junior Cloud Infrastructure Associate & Python (NSQF Level 5)",
          skills: {
  "Python": 91,
  "Cloud Fundamentals": 88,
  "Linux": 84,
  "Networking": 86,
  "Cloud Troubleshooting": 72,
  "Automation": 78
},
          scheme: "NAPS (National Apprenticeship Promotion Scheme)",
          providerId: "TP-IND-104",
          providerName: "Tata STRIVE Skill Development Center",
          district: "Bengaluru Urban",
          batchId: "TATA-CLOUD-2025-B2",
          enrollmentDate: "2025-07-01",
          completionDate: "2025-12-20",
          attendancePercentage: 97.2,
          assessmentScore: 94.0,
          certificationStatus: "Certified (Distinction)",
          completionStatus: "Completed",
          employmentOutcome: "Formal Wage Employment",
          automatedFollowUps: [
            {
              milestone: "30 Days Post-Training",
              question: "Did you get employment?",
              response: "Yes, Employed @ Infosys BPM Ltd",
              channel: "WhatsApp Automated Form",
              date: "2026-01-20",
              status: "Verified"
            },
            {
              milestone: "90 Days (Month 3)",
              question: "Current employment details & wage?",
              response: "Associate Cloud Engineer | ₹28,000/mo | Bengaluru",
              channel: "SMS Direct Link",
              date: "2026-03-20",
              status: "Verified (Directly Relevant)"
            },
            {
              milestone: "180 Days (Month 6)",
              question: "Are you still employed or left the job?",
              response: "Still Employed (Cloud Support Engineer, ₹33,000/mo)",
              channel: "IVR Call Assisted (Pressed 1: Employed)",
              date: "2026-06-20",
              status: "Retained"
            }
          ]
        }
      ]
    }
  ],

  // Providers
  providers: [
    {
      id: "TP-IND-101",
      name: "National Skill Training Institute (NSTI), Noida",
      state: "Uttar Pradesh",
      district: "Gautam Buddha Nagar",
      accreditation: "5-Star Gold (NSDC)",
      centerType: "Govt Institute",
      contactPerson: "Dr. Arvind Shrivastava",
      phone: "+91 98112 34567",
      activeBatches: 8,
      totalTrained: 4250,
      placementRate: 78.4,
      avgSalary: 21500
    },
    {
      id: "TP-IND-102",
      name: "Apex Renewable Energy Skill Academy",
      state: "Rajasthan",
      district: "Jaipur",
      accreditation: "4-Star (Green Jobs Council)",
      centerType: "Private Partner",
      contactPerson: "Er. Rameshwar Meena",
      phone: "+91 94140 88291",
      activeBatches: 5,
      totalTrained: 2180,
      placementRate: 82.1,
      avgSalary: 19800
    },
    {
      id: "TP-IND-103",
      name: "Don Bosco Skill Mission Center",
      state: "Maharashtra",
      district: "Pune",
      accreditation: "5-Star Platinum (NSDC)",
      centerType: "NGO / CSR Hub",
      contactPerson: "Fr. Joseph Mathew",
      phone: "+91 98220 12903",
      activeBatches: 12,
      totalTrained: 6890,
      placementRate: 84.6,
      avgSalary: 24200
    },
    {
      id: "TP-IND-104",
      name: "Tata STRIVE Skill Development Center",
      state: "Karnataka",
      district: "Bengaluru Urban",
      accreditation: "5-Star Platinum (NSDC)",
      centerType: "Corporate CSR Partner",
      contactPerson: "Ms. Anita Deshpande",
      phone: "+91 80255 99441",
      activeBatches: 10,
      totalTrained: 5410,
      placementRate: 89.2,
      avgSalary: 27500
    }
  ]
};

function generateTraineeId(sectorCode = "SKL", year = "26") {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `${sectorCode}-${year}#${randomNum}`;
}
