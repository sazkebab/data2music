var fs = require('fs');
var parse = require('csv-parse');
var async = require('async');
var baudio = require('baudio');



var inputFile='data/data.csv';
var minTime = 0;
var maxTime = 1440;
var sessionsByCoutnry = {};


var dataComplete = function (){
    console.log(sessionsByCoutnry);
    var n = 0;
var b = baudio(function (t) {
    var x = Math.sin(t * 262 + Math.sin(n));
    n += Math.sin(t);
    return x;
});
b.play();
};
var parser = parse({delimiter: ','}, function (err, data) {
  for(var i in data){
    if( sessionsByCoutnry[data[i][0]] === undefined){
         sessionsByCoutnry[data[i][0]] = new Array();
    }
    sessionsByCoutnry[data[i][0]].push({"time":data[i][1],"sessions":data[i][2]});
  }
  dataComplete();
});


fs.createReadStream(inputFile).pipe(parser);