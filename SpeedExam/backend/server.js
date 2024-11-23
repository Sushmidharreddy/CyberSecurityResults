const express = require('express');
const cors = require('cors');
const apiRoutes = require('./Results');



const port = 8082;
const app = express();
app.use(cors());


app.use(express.json());

// Optional: Configure specific origins and methods
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  }));

  app.use('/api', apiRoutes);




app.listen(port, ()=>
{
    console.log(`Server Started on port: ${port}`);
})







