var express = require('express');
var app = express();
var pg = require('pg');
var bodyParser = require('body-parser');
var password = require('./password.js');


var connectionString = 'postgres://opxeceunrpgebk:'+password+'@ec2-54-83-25-217.compute-1.amazonaws.com:5432/d4v5g9dp5h91jc?ssl=true';
console.log(connectionString);
var client = new pg.Client(connectionString);

var config = {
  user: 'opxeceunrpgebk', database: 'd4v5g9dp5h91jc', password: password, host: 'ec2-54-83-25-217.compute-1.amazonaws.com',
  port: 5432, max: 100, idleTimeoutMillis: 30000
};

var pool = new pg.Pool(config);

app.use(bodyParser.json({ extended: true }));
app.use(express.static(__dirname + '/public'));

pg.connect(connectionString, function(err, client, done){
 var results = [];
 var query = client.query('SELECT * FROM privy');
 query.on('row', function(row){
   results.push(row);
 });

 query.on('end', function(){
  //  console.log(results);
   client.end();
   return results;
 });

});

app.get('/locationreview', function(req, res, next){
 var results = [];
 pg.connect(connectionString, function(err, client, done) {

   var query = client.query('SELECT * FROM privy ORDER BY rating');

   query.on('row', function(row){
     results.push(row);
   });

   query.on('end', function(){
    //  console.log(results);
     client.end();
     return res.json(results);
   });

 });
});

app.get('/locationreview/{{result.id}}', function(req, res, next){
 var results = [];
 pg.connect(connectionString, function(err, client, done) {

   var query = client.query("SELECT * FROM privy ORDER BY google_id = '{{result.id}}'");

   query.on('row', function(row){
     results.push(row);
   });

   query.on('end', function(){
     console.log(results);
     client.end();
     return res.json(results);
   });

 });
});


app.post('/addreview', function(req, res, next){

 var results = [];
 var review = {
   rating: req.body.rating,
   address: req.body.address,
   comment: req.body.comment,
   family: req.body.family,
   separate: req.body.separate,
   neutral: req.body.neutral,
   single: req.body.single,
   handicap: req.body.handicap,
   name: req.body.name,
   type: req.body.type,
 };

 pg.connect(connectionString, function(err, client, done) {

    client.query('INSERT INTO privy(rating, address, comment, family, separate, neutral, single, handicap, name, type) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [review.rating, review.address, review.comment, review.family, review.separate, review.neutral, review.single, review.handicap, review.name, review.type]);
    var query = client.query('SELECT * FROM privy ORDER BY rating');

   query.on('row', function(row){
     results.push(row);
   });

   query.on('end', function(){
    //  console.log(results);
     client.end();
     return res.json(results);
   });

 });

});

app.get('/results', function(req, res, next){

 var results = [];

 pg.connect(connectionString, function(err, client, done) {


    var query = client.query('SELECT * FROM privy ORDER BY rating');

   query.on('row', function(row){
     results.push(row);
   });

   query.on('end', function(){
    //  console.log(results);
     client.end();
     return res.json(results);
   });

 });

});





var server = app.listen(3000, function() {
 var port = server.address().port;
 console.log('PostgreSQL server running at http://localhost:%s', port);
});
