//jshint esversion: 6

require('dotenv').config(); // Load environment variables from .env file

const express = require("express");
const https = require("https");
const request = require("request");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
    
    res.sendFile(__dirname + "/signup.html");

    app.post("/", function(req, _res) {

        var firstName = req.body.fName;
        var lastName = req.body.lName;
        var email = req.body.email;
        var password = req.body.password;

        const data = {
            members: [
                {
                    email_address: email,
                    status: "subscribed",
                    merged_field: {
                        FNAME: firstName,
                        LNAME: lastName,
                    }
                }
            ]
        };
        

        const jsonData = JSON.stringify(data);

        const url = "https://us18.api.mailchimp.com/3.0/lists/6650c21115" 

        const options = {
            method: "POST",
            auth: "emislim:" + process.env.API_KEY //environment variable for API key

        };
            
        const request = https.request(url, options, function(response) {
            response.on("data", function(data) {
                console.log(JSON.parse(data));
                
            })
            
        }); 
        
        request.write(jsonData)
        request.end();

    })


})

app.listen(process.env.PORT || 3000, function (req, res) {

    console.log("server is listening on port 3000");
    


});

