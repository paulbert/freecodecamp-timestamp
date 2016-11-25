var	express = require('express'),
	app = express();
	
app.set('port',process.env.PORT || 3000);
	
app.get('/',function(req,res) {
	res.sendfile('views/index.html', {root: __dirname })
});

app.get('/favicon.ico', function(req, res) {
    res.sendStatus(200);
});

app.get('/:date',function(req,res) {
	var reqString = req.params.date;
	if(parseInt(reqString) ==  reqString) {
		reqString = parseInt(reqString) * 1000;
	}
	var date = new Date(reqString),
		output = {'unix':null, 'natural':null };
	if(!isNaN(date.getMonth())) {
		console.log(date);
		output = {'unix':Math.round(date.valueOf() / 1000), 'natural':date.toLocaleString('en-us', {month:'long',day:'numeric',year:'numeric',timeZone:'UTC'}) };
	}
	res.send(output);
});

app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'));
});