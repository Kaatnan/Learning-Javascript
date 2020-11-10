var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var session = require('express-session')
const hbs = require('hbs')

const {mongoURI, globalVariable} = require('./config/defaultConfig')
const passport = require('passport');
require("./config/passport")(passport);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let authenticationRouter = require('./routes/authentication/index')
let adminRouter = require('./routes/admin/index')
let categoryRouter = require('./routes/admin/category')
let postRouter = require('./routes/admin/post')

var app = express();

//db connection
mongoose.connect(mongoURI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(() =>{
  console.log('connection was successful')
})
.catch(err =>{
  console.log(err)
})



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(session({cookie:{maxAge: 60000},
  secret: 'woot',
  resave: false,
  saveUninitialized: false
}));


app.use(
  session({
    secret: "secret",
    saveUninitialized: "true",
    resave: "true",
    cookie: {maxAge: 600000}
  })
)

//use conmnect flash hand
app.use(flash());
//passport middle ware
app.use(passport.initialize());
app.use(passport.session());

//globalvariables
app.use(globalVariable)

//registering partials
hbs.registerPartials(__dirname + '/views/partials')
hbs.registerPartials(__dirname + '/views/partials/admin')

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/account', authenticationRouter)
app.use('/admin', adminRouter)
app.use('/category', categoryRouter)
app.use('/post', postRouter)



//saving to the flash

// app.get('/Donald', (req, res) =>{
//   req.flash('Donald', "He is a boy")
//   res.send("Of course Yes")
// })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
