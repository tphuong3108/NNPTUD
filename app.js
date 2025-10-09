var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const { Response } = require('./utils/responseHandler');

mongoose.connect('mongodb+srv://phuongbeo3108203_db_user:4L3PUu3EbTCFzsQ0@cluster0.idjil18.mongodb.net/NNPTUD-S5?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB Atlas connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var rolesRouter = require('./routes/roles');
var authRouter = require('./routes/auth');
var productRouter = require('./routes/product');
var categoryRouter = require('./routes/category');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/roles', rolesRouter);
app.use('/product', productRouter);
app.use('/category', categoryRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  Response(res, err.status || 500, false, err.message || "Internal Server Error");
});

module.exports = app;
