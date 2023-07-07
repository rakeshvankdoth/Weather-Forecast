// const { log } = require("console");
// const express=require("express");
// const { write } = require("fs");
//  const app=express();
//  const https = require("https");
//  const bodyParser = require("body-parser");
//  app.use(bodyParser.urlencoded({extended:true}))
// app.listen(880 , function() {
//     console.log("server started on port 880");
// });
// app.get("/" , function(req,res) {
//     res.sendFile(__dirname +"/wp.html");
// });
//    app.post("/" , function(req,res) {
//     const query= req.body.cityname;
//     const apikey= "7dd297409c3a0a5496a22b87422cb094";
//     const unit = "metric";
    
//     const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit+"";
//     https.get(url,function(response) {
//       console.log(response.statusCode);
//       response.on("data" , function(data) {
        
//        const weatherData=JSON.parse(data);
//        const weatherdescription = weatherData.weather[0].description;
//        const temp = weatherData.main.temp;
//        const icon = weatherData.weather[0].icon;
//        const name = weatherData.name;
//        const imageurl = "https://openweathermap.org/img/wn/" +icon+ "@2x.png";
//        res.write("<h1>The current temp in " +name+" is " + temp + " degree celsius</h1>");
//        res.write("<p>The current weather condition is " + weatherdescription + "</p>");
//        res.write("<img src="+ imageurl +">");
//        res.send();  
//       });
//     });
//});
const { log } = require("console");
const express = require("express");
const app = express();


const https = require("https")
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.listen(900, function(){
    console.log("Server started at 900");
});


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){


        const apikey = "7dd297409c3a0a5496a22b87422cb094";
        const unit = "metric";
        const query = req.body.cityname;

        const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit+"";

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
           const weatherdata = JSON.parse(data)
           const temperature = weatherdata.main.temp;
           const name = weatherdata.name;
           const weatherdescription = weatherdata.weather[0].description;
           const icon = weatherdata.weather[0].icon;
           const imageurl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
           res.write("<h1>The Temp in "+name+" is "+temperature+"Degree celcius</h1>");
           res.write("<p>Description : "+weatherdescription+"</p>");
           res.write("<img src="+imageurl+">");
            res.send();
        });
    })
});



