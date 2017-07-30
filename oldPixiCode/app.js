var express = require('express');
var assets = require('connect-assets');

var app = express();

app.set('views', __dirname + '/lib');
app.set('view engine', 'jade');
app.use(express.static('img'));
app.use(assets({
    paths: [
        './lib',
    ]
}))

app.get('/', function(req, res) {
    res.render('swingsoccer');
});

app.listen(5000, function() {
    console.log("Swing Soccer being hosted by Express on port 5000!");
})

