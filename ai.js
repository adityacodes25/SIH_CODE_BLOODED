const express = require('express');
const router = express.Router();
const { mockTrainees } = require('./trainees');

router.get('/predict/:id', (req, res) => {
  const traineeId = req.params.id;
  const trainee = mockTrainees.find(t => t.id === traineeId);

  if (!trainee) return res.status(404).json({ error: "Trainee not found" });

  const scoreFactor = trainee.score * 0.6;
  const attendanceFactor = trainee.attendance * 0.4;
  const likelihood = Math.min(98, Math.round(scoreFactor + attendanceFactor));

  let skillGaps = [];
  let recommendations = [];
  let riskLevel = "Low";

  if (likelihood < 65) {
    riskLevel = "High";
    skillGaps.push("Practical Hands-on Application", "Core Domain Concepts");
    recommendations.push("Assign 3-week remedial lab practice", "Pair with peer mentor");
  } else if (likelihood < 82) {
    riskLevel = "Medium";
    skillGaps.push("Advanced Technical Nuances", "Soft Skills & Interview Prep");
    recommendations.push("Conduct mock interview session", "Provide advanced elective modules");
  } else {
    skillGaps.push("Industry Specialization");
    recommendations.push("Eligible for premium placement drives", "Enroll in industry internship program");
  }

  res.json({
    traineeId: trainee.id,
    traineeName: trainee.name,
    program: trainee.program,
    aiAnalysis: {
      employmentLikelihoodPct: likelihood,
      riskLevel: riskLevel,
      identifiedSkillGaps: skillGaps,
      recommendedUpskilling: recommendations,
      modelMetadata: {
        engine: "Simulated-Linear-Heuristic-v1",
        status: "AI-Ready Pipeline Layer Active"
      }
    }
  });
});

module.exports = router;