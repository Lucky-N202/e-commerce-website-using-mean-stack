const express = require('express');
const cors = require("cors");
var helmet = require('helmet');

const cookieParser = require('cookie-parser');
const connection = require('./app/config/db.config');
const routes = require('./app/routes');

const app = express();

var corsOptions = {
    origin: "http://localhost:4200"
  };

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({extended: true}));

app.use(cors());


app.get("/", (req, res) =>{
    res.json({message: "Welcome!!!!"})
});

//routes
app.use('/api/v1', routes);



const PORT = process.env.PORT || 7700;

app.listen(PORT, async()=>{
    await connection();
    console.log(`Listening on Port ${PORT}`);
});