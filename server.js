var express = require('express');
var app = express();
const path = require('path')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes=require('./routes/dashboardRoutes')








// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
  
   
     res.render('registration');
   });
   app.get('/loginpage', function(req, res) {
  
   
    res.render('login');
  });


app.use('/auth', authRoutes);
app.use('/dashboard',dashboardRoutes);
app.listen(8080);
console.log('Server is listening on port 8080');