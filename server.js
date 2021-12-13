import express, { json, urlencoded } from 'express';
import cors from 'cors';




const app = express();

// var corOptions = {
//     origin: 'http://localhost:8081'
// }


// middleware

// app.use(cors(corOptions))

app.use(json())

app.use(urlencoded({extended:true}))

// routes

import routes from './routes/user-route.js'
app.use('/api/users',routes);


// testing api

app.get('/', (req, res)=>{
    res.json({message:'Hello API'});
   
})


// post

const PORT  = process.env.PORT || 8080

// server
app.listen(PORT, ()=>{
    console.log(`Server is running on port :${PORT}`);
    console.log("Click to view on browser http://localhost:8080/");
})