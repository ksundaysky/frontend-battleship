//Install express server
const express = require('express');
const path = require('path');
 
const app = express();
 
// Serve only the static files form the angularapp directory
app.use(express.static(__dirname + '/dist/wkbp-battleship'));
app.listen(process.env.PORT || 8080);
 
app.get('/*', function(req,res) { 
    res.sendFile(path.join(__dirname+'/dist/wkbp-battleship/index.html'));
});
 
console.log("Console listenning")
// Start the app by listening on the default Heroku port