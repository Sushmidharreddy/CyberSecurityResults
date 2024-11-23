import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { store } from '../Context/ContextApi';


function ResultsFormate() {

    const [value, setValue] = useState(97);

    

    


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    function createData(section, correctP, correct, partially, incorrect, negative, unanswered, total) {
        return { section, correctP, correct, partially, incorrect, negative, unanswered, total };
    }



    const rows = [
        createData('English', 80.00, 16, 0, 4, 0.00, 0, 20),
        createData('Aptitude', 80.00, 16, 0, 4, 0.00, 0, 20),
        createData('Reasoning', 80.00, 16, 0, 4, 0.00, 0, 20),
        createData('Quantitative Ability', 80.00, 16, 0, 4, 0.00, 0, 20),
        

    ];

   const [results,SetResults] = useContext(store);

   console.log(results)
   console.log(results.resultsTable)
   console.log(results.meritResultsTable)



   let data;

try {
  data = {
    candidateName: results.resultsTable[0]["Candidate Name"],
    exam:  results.resultsTable[0].Exam,
    examStatus: results.resultsTable[0].examstatus,
    marks: results.resultsTable[0]["Marks or Points"],
    percentage: results.resultsTable[0].Percentage,
    timeTaken: results.resultsTable[0].TimeTaken,
    //Data from merit table
    rank:results.meritResultsTable[0].Rank,
    totalQuestion:results.meritResultsTable[0]["Total question"],
    // timeTaken:results.meritResultsTable[0]["Time taken"],
    totalCorrect:results.meritResultsTable[0]["Total correct"],
    totalIncorrect:results.meritResultsTable[0]["Total incorrect"],
    totalPartiallyCorrect:results.meritResultsTable[0]["Total partially correct"],
    TotalUnanswered:results.meritResultsTable[0]["Total unanswered"],
    Attempt:results.meritResultsTable[0].Attempt
  };
} catch (err) {
  console.error("Error while constructing data:", err);
}






const getBackgroundColor = () => {
    if (data.Percentage < 30) return  "danger"; // Range: Less than 10
    return "success"; // Default for 30 and above
};



console.log(data)
    return (
        <>
            <div className='container '>

            <div className='d-flex flex-column  justify-content-center align-items-center'>
                      <h5 className=' fw-bold align-middle '>Score {data.percentage}%</h5>
                    <div className="progress w-50 " role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                        <div className={`bg-${getBackgroundColor()} progress-bar-striped progress-bar-animated `} style={{ width: `${data.percentage}%` }}> </div>
                    </div>

               </div>

                <div className='bg-details rounded p-3 mt-4'>

                    <Box
                        component="form"
                        sx={{ '& > :not(style)': { m: 1, width: '40ch' } }}
                        noValidate
                        autoComplete="off"
                    >
      
                        <TextField id="standard-basic" label="Candidate Name" variant="standard" value={data.candidateName} />   
                        <TextField id="standard-basic" label="Exam" variant="standard" value={data.exam} />        
                        <TextField id="standard-basic" label="Exam Status" variant="standard" value={data.examStatus} />
                        <TextField id="standard-basic" label="Score" variant="standard" value={data.marks} />
                        <TextField id="standard-basic" label="Awards" variant="standard" value={data.rank} />
                        <TextField id="standard-basic" label="TimeTaken" variant="standard" value={data.timeTaken} />
                        
                    </Box>

                </div>

             
              
               


{/* 
                <div className='my-5'>
                   
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    
                                    <StyledTableCell align="left">Correct</StyledTableCell>
                                    <StyledTableCell align="left">Incorrect</StyledTableCell>
                                    <StyledTableCell align="left">Partially Correct</StyledTableCell>
                                    <StyledTableCell align="left">Unanswered</StyledTableCell>
                                    <StyledTableCell align="left">Attempt</StyledTableCell>
                                    <StyledTableCell align="left">Total Questions(sec)</StyledTableCell>
                                    

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow key={row.name}>
                                        
                                        
                                        <StyledTableCell align="left">{data.totalCorrect}</StyledTableCell>
                                        <StyledTableCell align="left">{data.totalIncorrect}</StyledTableCell>
                                        <StyledTableCell align="left">{data.totalPartiallyCorrect}</StyledTableCell>
                                        <StyledTableCell align="left">{data.TotalUnanswered}</StyledTableCell>
                                        <StyledTableCell align="left">{data.Attempt}</StyledTableCell>
                                        <StyledTableCell align="left">{data.totalQuestion}</StyledTableCell>
                                        
                                        
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div> */}

            </div>
        </>
    )
}

export default ResultsFormate