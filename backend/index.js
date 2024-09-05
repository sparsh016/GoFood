const express = require('express');      //to import express 
const app = express();        //to make express executable
const cors = require('cors');
const port = 4000;
const mongoDB=require("./db");       //import all modules of db file
mongoDB();
// Use CORS middleware
app.use(cors());

// Enable pre-flight for all routes
app.options('*', cors());

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type, Accept"
  );
  next();
});
app.get('/', (req, res) => {        //this is used to create a webpage 
  res.send('Hello World!')
})
app.use(express.json());
app.use('/api',require("./Routes/creatUser"));    //app.use() can be used to define middleware that runs only for specific 
//URL paths. If no path is specified, it applies to all routes.
app.use('/api',require("./Routes/DisplayData"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})