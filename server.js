var express = require('express');
var app = express();
var pg = require('pg');
var bodyParser = require('body-parser');

var acquireCount = 0;
var connectCount = 0;

var pool = require('./pg-connection-pool');

app.use(bodyParser.json({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/locationreview/:id', function(req, res, next) {
    var results = [];

    pool.connect(function(err, client, done) {
        var id = req.params.id;

        //SELECT AVG (rating) FROM  privy WHERE googleid =($1), [id]);
        var query = client.query("SELECT * FROM privy WHERE googleid=($1)", [id]);
        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            console.log(results);
            done();
            res.json(results);
        });

    });
});


app.post('/addreview', function(req, res, next) {

    var results = [];
    var review = {
        rating: req.body.rating,
        comment: req.body.comment,
        family: req.body.family,
        separate: req.body.separate,
        neutral: req.body.neutral,
        single: req.body.single,
        handicap: req.body.handicap,
        name: req.body.name,
        type: req.body.type,
        place_id: req.body.id
    };

    console.log(review);
    pool.connect(function(err, client, done) {

        var insertQuery = client.query('INSERT INTO privy(rating, comment, family, separate, neutral, single, handicap, name, type, googleid) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [review.rating, review.comment, review.family, review.separate, review.neutral, review.single, review.handicap, review.name, review.type, review.place_id]);
        insertQuery.on('end', function() {
            var query = client.query('SELECT * FROM privy ORDER BY googleid');

            query.on('row', function(row) {
                results.push(row);
            });

            query.on('end', function() {
                //  console.log(results);
                done();

                res.json(results);
            });

        });

    });

});

app.get('/results', function(req, res, next) {

    var results = [];

    pool.connect(function(err, client, done) {


        var query = client.query('SELECT * FROM privy ORDER BY googleid');

        query.on('row', function(row) {
            results.push(row);

        });

        query.on('end', function() {
            //  console.log(results);
            done();
            return res.json(results);
        });

    });

});

pool.on('acquire', function(client) {
    acquireCount++
})

pool.on('connect', function() {
    connectCount++
})

setTimeout(function() {
    console.log('connect count:', connectCount) // output: connect count: 10
    console.log('acquire count:', acquireCount) // output: acquire count: 200
}, 10000)



var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
    var port = server.address().port;
    console.log('PostgreSQL server running at http://localhost:%s', port);
});
