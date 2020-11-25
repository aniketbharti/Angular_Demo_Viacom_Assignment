const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
  next();
});

app.get("/getImage", (req, res, nex) => {
  res.status(200);
  res.json({
    isSuccessful: true,
    data: {
      status: 200,
      url: "https://media.glassdoor.com/sqll/478531/viacom-18-squarelogo-1488216419945.png",
      description: `Following is a dummy application created using Node.js and Angular. It was created as a part of interview process`
    }
  });
});

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status ? error.status : 500);
  res.json({
    isSuccessful: false,
    error: {
      status: error.status ? error.status : 500,
      message: error.message,
      path: error.path,
    }
  });
});


app.listen(3000, console.log(`Server listening on port 3000`))