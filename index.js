var express = require('express');
var app = express();
var handlebars = require('express3-handlebars')
  .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
var multer = require('multer');
/*cloudinary.config({
  cloud_name: 'Enter name here',
  api_key: 'Enter key here',
  api_secret: 'Enter secret here'
});*/
app.set('port', (process.env.PORT || 5000));

var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null,__dirname + '/public/check/uploads/');
  },
  filename: function (request, file, callback) {
    console.log(file);
    callback(null, file.originalname);
  }
});

app.use(express.static(__dirname + '/public'));
var upload = multer({storage: storage}).array('photo', 1);

app.get('/', function (req, res){
  res.render('home');
});

app.post('/upload', function(request, response) {
  upload(request, response, function(err) {
    if(err) {
      console.log('Error Occured' + err);
        return;
      }
    console.log(request.files);
    response.end('Your Files Uploaded');
    console.log('Photo Uploaded');
  })
});



// 404 catch-all handler (middleware)
app.use(function(req, res, next){
  res.status(404);
  res.render('404');
});
// 500 error handler (middleware)
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
