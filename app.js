const express = require('express');
// const morgan = require('morgan');
const fs = require('fs');
const morgan = require('morgan');
const app = express();

// Middleware
app.use(express.json()); // Call as a function
app.use(morgan('dev'));
app.use((req, res, next) => {
  console.log('hello first midleware');
  next();
});
app.use((req, res, next) => {
  req.requestTimee = new Date().toISOString();
  next();
});
// Read tours data
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const get_all_tour = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTimee,
    results: tours.length,
    data: { tours },
  });
};

const get_tour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id are you stupid',
    });
  }
  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};

const update_tour = (req, res) => {
  // console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id are you stupid',
    });
  }
  res.status(200).json({
    status: 'success',
    data: { tour: '<updated tour here....>' },
  });
};

const delete_tour = (req, res) => {
  // console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id are you stupid',
    });
  }
  res.status(204).json({
    data: null,
  });
};
const create_tour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTours = Object.assign({ id: newId }, req.body);

  tours.push(newTours);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',

        data: { tours: tours },
      });
    }
  );
};
// GET routeeeeeeeeeeeeeeeee
//fuckkk
app
  .route('/api/v1/tours')
  .get(get_all_tour)
  .post(update_tour);
app
  .route('/api/v1/tours/:id')
  .get(get_tour)
  .patch(update_tour)
  .delete(delete_tour);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// const tourRouter = require('./routes/tourRoutes');
// const userRouter = require('./routes/userRoutes');

// const app = express();

// 1) MIDDLEWARES
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }
// ]
// app.use(express.json());
// app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   console.log('Hello from the middleware 👋');
//   next();
// });

// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });

// // 3) ROUTES
// app.use('/api/v1/tours', tourRouter);
// app.use('/api/v1/users', userRouter);

// module.exports = app;
