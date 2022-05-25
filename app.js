const cors = require('cors');
const express = require('express');
const userRouter = require('./routes/userRouter');
const propertyRouter = require('./routes/propertyRouter');
const adminRouter = require('./routes/adminRouter');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();
app.use(cors());

app.use(express.json());

app.use('/users', userRouter);
app.use('/property', propertyRouter);
app.use('/admin', adminRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
