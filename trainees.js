const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Helper function to generate IDs in the correct TRN00001 format
const generateTraineeId = () => {
  const randomNum = Math.floor(1 + Math.random() * 99999);
  return `TRN${String(randomNum).padStart(5, '0')}`;
};

// 1. GET ROUTE: Fetch all trainees from MySQL
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM trainee');
    res.json(rows);
  } catch (err) {
    console.error('❌ Fetch Error:', err.message);
    res.status(500).json({ error: 'Database query failed', details: err.message });
  }
});

// 2. GET SINGLE TRAINEE (Matches TRN00001 or Name)
router.get('/:identifier', async (req, res) => {
  const { identifier } = req.params;

  try {
    const sql = `
      SELECT 
        t.Trainee_ID, 
        t.Full_Name, 
        t.Gender,
        t.EMail,
        t.Phone,
        t.State,
        t.Sector,
        t.Skill_Level,
        COALESCE(e.Attendance_Percentage, 85) AS Attendance_Percentage,
        COALESCE(o.Score_Percentage, 75) AS Score_Percentage,
        COALESCE(e.Course_Duration_Days, 90) AS Course_Duration_Days
      FROM trainee t
      LEFT JOIN training_enrollments e ON t.Trainee_ID = e.Trainee_ID
      LEFT JOIN outcome_assessment o ON t.Trainee_ID = o.Trainee_ID
      WHERE t.Trainee_ID = ? OR t.Full_Name LIKE ?
      LIMIT 1;
    `;

    const [rows] = await db.query(sql, [identifier, `%${identifier}%`]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Trainee not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('❌ Single Fetch Error:', err.message);
    res.status(500).json({ error: 'Database query failed', details: err.message });
  }
});

// 3. POST ROUTE: Upsert Trainee Record
router.post('/', async (req, res) => {
  console.log('📥 Incoming Request Payload:', req.body);

  const { Trainee_ID, Full_Name, Date_Of_Birth, Gender, Phone, EMail, Address, State, Sector, Skill_Level } = req.body;

  const sql = `
    INSERT INTO trainee (Trainee_ID, Full_Name, Date_Of_Birth, Gender, Phone, EMail, Address, State, Sector, Skill_Level)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      Full_Name = VALUES(Full_Name),
      Date_Of_Birth = VALUES(Date_Of_Birth),
      Gender = VALUES(Gender),
      Phone = VALUES(Phone),
      EMail = VALUES(EMail),
      Address = VALUES(Address),
      State = VALUES(State),
      Sector = VALUES(Sector),
      Skill_Level = VALUES(Skill_Level);
  `;

  try {
    const finalId = Trainee_ID || generateTraineeId();

    await db.query(sql, [
      finalId,
      Full_Name || 'New Trainee',
      Date_Of_Birth || '2000-01-01',
      Gender || 'Not Specified',
      Phone || '0000000000',
      EMail || 'trainee@example.com',
      Address || 'N/A',
      State || 'N/A',
      Sector || 'General',
      Skill_Level || 'Intermediate'
    ]);

    console.log(`✅ Trainee ${finalId} saved/updated successfully!`);
    res.status(200).json({ message: 'Saved/Updated successfully!', trainee_id: finalId });
  } catch (err) {
    console.error('❌ MySQL Save Error:', err.message);
    res.status(500).json({ error: 'Failed to insert/update trainee', details: err.message });
  }
});

// 4. DASHBOARD SAVE ROUTE
router.post('/save-dashboard', async (req, res) => {
  const { trainee_id, name, sector, skill_level } = req.body;
  
  const finalId = trainee_id || generateTraineeId();

  try {
    const sql = `
      INSERT INTO trainee (Trainee_ID, Full_Name, Sector, Skill_Level) 
      VALUES (?, ?, ?, ?) 
      ON DUPLICATE KEY UPDATE 
        Full_Name = VALUES(Full_Name),
        Sector = VALUES(Sector),
        Skill_Level = VALUES(Skill_Level);
    `;
                 
    await db.query(sql, [
      finalId, 
      name || 'New Trainee', 
      sector || 'General', 
      skill_level || 'Intermediate'
    ]);

    res.json({ message: 'Dashboard info saved successfully!', trainee_id: finalId });
  } catch (err) {
    console.error('❌ Dashboard Save Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;