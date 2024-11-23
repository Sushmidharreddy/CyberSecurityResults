const express = require('express');
const db= require('./db');
const router = express.Router();




// Endpoint to upload the Excel file (Merit)
router.post('/upload/merit', (req, res) => {
  const data = req.body; 
  
  data.forEach((row) => {
    // Destructure the fields properly, handling keys with spaces using quotes
    const {
      "Exam ID":ExamID,
      "Rank": Rank,
      "Candidate Name": CandidateName,
      "Email": Email,
      "Group": Group,
      "Exam Name": ExamName,
      "Percentage": Percentage,
      "Exam Status": ExamStatus,
      "Total question":Totalquestion,
      "Time taken": Timetaken,
      "Total correct": Totalcorrect,
      "Total incorrect":TotalIncorrect,
      "Total partially correct":TotalPartiallyCorrect,
      "Total unanswered":TotalUnanswered,
      "Attempt":Attempt
      
    } = row;
    
    // Insert into MySQL table
    const query = `
      INSERT INTO MeritResults (
        \`Exam ID\`, 
        \`Rank\`, 
        \`Candidate Name\`, 
        \`Email\`, 
        \`Group\`, 
        \`Exam Name\`, 
        \`Percentage\`, 
        \`Exam Status\`, 
        \`Total question\`, 
        \`Time taken\`, 
        \`Total correct\`, 
        \`Total incorrect\`, 
        \`Total partially correct\`,
        \`Total unanswered\`, 
        \`Attempt\` 
       
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    
    // Execute the query with all fields included in the correct order
    db.query(query, [
      ExamID, Rank, CandidateName, Email, Group, ExamName, Percentage, ExamStatus, 
      Totalquestion, Timetaken, Totalcorrect, TotalIncorrect, TotalPartiallyCorrect, TotalUnanswered, Attempt
    ], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ error: 'Database error' });
      }
    });
  });
  
  res.status(200).json({ message: 'Data uploaded successfully' });
});



// Endpoint to upload the Excel file (Merit)
router.post('/upload', (req, res) => {
  const data = req.body; 
  
  data.forEach((row) => {
    // Destructure the fields properly, handling keys with spaces using quotes
    const {
      No,
      "Candidate ID": CandidateID,
      "Attempt": Attempt,
      "Candidate Name": CandidateName,
      "Username": Username,
      "GroupName": GroupName,
      "Exam": Exam,
      "Exam ID": ExamID,
      "Marks or Points": MarksOrPoints,
      "Percentage": Percentage,
      "examstatus": ExamStatus,
      "TimeTaken": TimeTaken,
      "Start_DateTime": StartDateTime,
      "Finish_DateTime": FinishDateTime,
      "Mode": Mode,
      "Email": Email,
      "Mobile": Mobile,
      "Phone": Phone,
      "Street": Street,
      "City": City,
      "Zip": Zip,
      "State": State,
      "Country": Country,
      "Certificateid": CertificateID,
      "CandidateRegisteredon": CandidateRegisteredOn,
      "No of suspicious Activity": NoOfSuspiciousActivity,
      "Exam's Remark": ExamsRemark,
      "Hall Ticket Number": HallTicketNumber,
      "Qualification": Qualification,
      "Year of Passed Out": YearOfPassedOut
    } = row;
    
    // Insert into MySQL table
    const query = `
      INSERT INTO Results (
        \`No\`, 
        \`Candidate ID\`, 
        \`Attempt\`, 
        \`Candidate Name\`, 
        \`Username\`, 
        \`GroupName\`, 
        \`Exam\`, 
        \`Exam ID\`, 
        \`Marks or Points\`, 
        \`Percentage\`, 
        \`examstatus\`, 
        \`TimeTaken\`, 
        \`Start_DateTime\`, 
        \`Finish_DateTime\`, 
        \`Mode\`, 
        \`Email\`,
        \`Mobile\`, 
        \`Phone\`, 
        \`Street\`, 
        \`City\`, 
        \`Zip\`, 
        \`State\`, 
        \`Country\`, 
        \`Certificateid\`, 
        \`CandidateRegisteredon\`, 
        \`No of suspicious Activity\`, 
        \`Exam's Remark\`, 
        \`Hall Ticket Number\`, 
        \`Qualification\`, 
        \`Year of Passed Out\`
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    
    // Execute the query with all fields included in the correct order
    db.query(query, [
      No, CandidateID, Attempt, CandidateName, Username, GroupName, Exam, ExamID, MarksOrPoints, 
      Percentage, ExamStatus, TimeTaken, StartDateTime, FinishDateTime, Mode, Email, Mobile, Phone, 
      Street, City, Zip, State, Country, CertificateID, CandidateRegisteredOn, NoOfSuspiciousActivity, 
      ExamsRemark, HallTicketNumber, Qualification, YearOfPassedOut
    ], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ error: 'Database error' });
      }
    });
  });
  
  res.status(200).json({ message: 'Data uploaded successfully' });
});






// Endpoint to search data by column HallTicket
router.get('/search', (req, res) => {
  const query = req.query.query; // Get the search query from the URL parameter

  // Check if query is provided
  if (!query) {
    return res.status(400).json({ error: 'No search query provided' });
  }

  // Get data from the "results" table
  const sqlQuery = 'SELECT * FROM results WHERE Mobile = ?';
  db.query(sqlQuery, [query], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    // Check if results were found
    if (results.length === 0) {
      return res.status(404).json({ error: 'No data found in results table' });
    }

    const email = results[0].Email;

    // Get data from the "MeritResults" table
    const sqlMerit = 'SELECT * FROM MeritResults WHERE Email = ?';
    db.query(sqlMerit, [email], (err, meritResults) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      // Combine both results and return a single response
      res.status(200).json({
        resultsTable: results,
        meritResultsTable: meritResults,
      });
    });
  });
});



module.exports=router;

