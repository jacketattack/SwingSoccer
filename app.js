var express = require('express');

var app = express();

app.set('views', '.');
app.set('view engine', 'jade');
app.use(express.static('js'));
app.use(express.static('img'));

app.get('/', function(req, res) {
    res.render('swingsoccer');
});

app.listen(5000, function() {
    console.log("Swing Soccer being hosted by Express on port 5000!");
})

