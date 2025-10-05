// const express = require('express')
// const NotFoudError = require('./middleware/404Handling')
// const ApiError = require('./utils/ApiError')
// const ValidationMiddleware = require('./middleware/ValidationMiddleware')
// const app = express() 
// const morgan = require("morgan")
// const cors = require("cors")

// // # json parsing
// app.use(express.json({}))
// app.use(express.urlencoded({extended:false}))
// app.use(cors())
// app.use(morgan("dev"))
// app.use("/api/v1",require("./router"))

// app.get('/', (req, res) => {
//   res.send({msg:'Hello World!'})
// })
// app.use("",(req,res,next)=>{
//     next( new ApiError(404,"Not Found"))
// })
// console.log(process.env.FRONTEND_URI)
// app.use(NotFoudError) 
// module.exports = app

const express = require('express');
const NotFoudError = require('./middleware/404Handling');
const ApiError = require('./utils/ApiError');
const ValidationMiddleware = require('./middleware/ValidationMiddleware');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// ✅ CORS setup (important!)
app.use(
  cors({
    origin: [
      'https://orion-app-zeta.vercel.app', // your frontend deployed link
      'http://localhost:3000' // optional: for local testing
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// # json parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// routes
app.use('/api/v1', require('./router'));

// test route
app.get('/', (req, res) => {
  res.send({ msg: 'Orion Bank Backend Working Fine!' });
});

// error handling
app.use('', (req, res, next) => {
  next(new ApiError(404, 'Not Found'));
});

app.use(NotFoudError);

module.exports = app;
