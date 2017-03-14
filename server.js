var express = require('express');
var app = express();
var pg = require('pg');
var bodyParser = require('body-parser');

var connectionString = 'postgres://postgres:Tatum@localhost:5432/postgres';
var client = new pg.Client(connectionString);

 var config = {
   user: 'postgres', database: 'postgres', password: 'Tatum', host: 'localhost',
   port: 5432, max: 100, idleTimeoutMillis: 30000
 };

var pool = new pg.Pool(config);

app.use(bodyParser.json({ extended: true }));
app.use(express.static(__dirname + '/public'));

  pg.connect(connectionString, function(err, client, done){
  
    var reviews = [];
    var query = client.query('SELECT * FROM privy');
    query.on('row', function(row){
    results.push(row);
    });

      query.on('end', function(){
      console.log(reviews);
      client.end();
      return reviews;
    });

  });

app.put('/edit-review/:id', function(req, res, next){

  var results = [];
  var id = req.params.id;
  var data = {
    product: req.body.product
  };

  pg.connect(connectionString, function(err, client, done) {

    client.query('UPDATE privy SET product=($1) WHERE id=($2)', [data.product, id]);
    var query = client.query('SELECT * FROM privy ORDER BY id');

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

app.delete('/delete-review/:id', function(req, res, next){

  var results = [];
  var id = req.params.id;

  pg.connect(connectionString, function(err, client, done) {


    client.query('DELETE FROM privy WHERE id=($1)', [id]);
    var query = client.query('SELECT * FROM privy ORDER BY id');

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

app.post('/add-review', function(req, res, next){

  var results = [];
  var data = {
    item: req.body.item
  };

  pg.connect(connectionString, function(err, client, done) {


    client.query('INSERT INTO privy(item) values($1)', [data.item]);
    var query = client.query('SELECT * FROM privy ORDER BY id');

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

app.get('/get-review', function(req, res, next){
  var results = [];
  pg.connect(connectionString, function(err, client, done) {

    var query = client.query('SELECT * FROM privy ORDER BY id');

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


var server = app.listen(3000, function() {
  var port = server.address().port;
  console.log('PostgreSQL server running at http://localhost:%s', port);
});
