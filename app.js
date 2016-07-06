var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongojs = require('mongojs')

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/assets/fonts'));
app.use(express.static(__dirname + 'assets/js'));
app.use(express.static(__dirname + '/assets/sass'));

app.set('view engine', 'ejs');

var databaseUrl = "mongodb://"; // "username:password@example.com/mydb"
var collections = ["pizza","sankey"]
var db = mongojs(databaseUrl,collections);

var sizeObject;
var cheeseObject;
var toppingsObject;
var dataArray=[];

//Get the page
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
});

//Get the page
app.post('/Cheese_Sauce.html', urlencodedParser, function (req, res) {
   sizeObject=req.body;
   res.sendFile( __dirname + "/" + "Cheese_Sauce.html" );
});

app.post('/Toppings.html', urlencodedParser, function (req, res) {
   cheeseObject=req.body;
   res.sendFile( __dirname + "/" + "Toppings.html" );
});

//Get the page
app.get('/Cheese_Sauce.html',  function (req, res) {
   res.sendFile( __dirname + "/" + "Cheese_Sauce.html" );
});

app.get('/Toppings.html',  function (req, res) {
   res.sendFile( __dirname + "/" + "Toppings.html" );
});

app.get('/save',  function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
});

//Post the data to server
app.post('/save', urlencodedParser, function (req, res) {
toppingsObject=req.body;

console.log(toppingsObject);
console.log(cheeseObject);
console.log(sizeObject);


db.pizza.save({size:sizeObject.size,  cheese:cheeseObject.cheese, sauce: cheeseObject.sauce, toppings:toppingsObject.topp}, function(err, saved) {
  if( err || !saved ) 
    console.log("Not saved pie");
  else console.log("Saved pie");
});//end of save


console.log(toppingsObject.topp);
var i;


for(i=0;i<toppingsObject.topp.length;i++)
{

  if(toppingsObject.topp[i].length==1)
  {
    db.sankey.update({cheese:cheeseObject.cheese, topping:toppingsObject.topp},{$inc: {count: 1}},{upsert: true},function(err){
  if(err)
    console.log("Error"+err);
    //console.log("Saved sankey");
    }); //end of update

    break;
}//end of if
else{
//console.log(toppingsObject.topp[i]);


db.sankey.update({cheese:cheeseObject.cheese, topping:toppingsObject.topp[i]},{$inc: {count: 1}},{upsert: true},function(err){
  if(err)
    console.log("Error"+err);
    //console.log("Saved sankey");
}); //end of update
}//end if else
} //end of for



if(i==toppingsObject.topp.length){

db.pizza.find({},{toppings:1,_id:0}, function(err, docs) {
  if (err) throw err;

else{
  // object of all the users
  console.log(docs);
   
   var cheddarData = docs.filter(function(obj) {
    return (obj.toppings.toString().indexOf('Cheddar Cheese') > -1);
  });
    var fetaData = docs.filter(function(obj) {
    return (obj.toppings.toString().indexOf('Feta Cheese') > -1);
  });
   var greenPeppersData = docs.filter(function(obj) {
    return (obj.toppings.toString().indexOf('Green Pepper') > -1);
  });
   var mushroomsData = docs.filter(function(obj) {
    return (obj.toppings.toString().indexOf('Mushrooms') > -1);
  });
   var onionsData = docs.filter(function(obj) {
    return (obj.toppings.toString().indexOf('Onions') > -1);
  });
    var pepperoniData = docs.filter(function(obj) {
    return (obj.toppings.toString().indexOf('Pepperoni') > -1);
  });
    var sausageData = docs.filter(function(obj) {
    return (obj.toppings.toString().indexOf('Italian Sausage') > -1);
  });
    var salamiData = docs.filter(function(obj) {
    return (obj.toppings.toString().indexOf('Salami') > -1);
  });
    var baconData = docs.filter(function(obj) {
    return (obj.toppings.toString().indexOf('Bacon') > -1);
  });
    var hamData = docs.filter(function(obj) {
    return (obj.toppings.toString().indexOf('Ham') > -1);
  });
    var chickData = docs.filter(function(obj) {
    return (obj.toppings.toString().indexOf('Premium Chicken') > -1);
  });
    var pineData = docs.filter(function(obj) {
    return (obj.toppings.toString().indexOf('Pineapple') > -1);
  });
     var hotData = docs.filter(function(obj) {
    return (obj.toppings.toString().indexOf('Hot Sauce') > -1);
  });
      var tomData = docs.filter(function(obj) {
    return (obj.toppings.toString().indexOf('Diced Tomatoes') > -1);
  });
       var garlicData = docs.filter(function(obj) {
    return (obj.toppings.toString().indexOf('Garlic') > -1);
  });
    var spinachData = docs.filter(function(obj) {
    return (obj.toppings.toString().indexOf('Spinach') > -1);
  });
     var redPepData = docs.filter(function(obj) {
    return (obj.toppings.toString().indexOf('Roasted Red Peppers') > -1);
  });
      var oliveData = docs.filter(function(obj) {
    return (obj.toppings.toString().indexOf('Black Olives') > -1);
  });
       var bPepData = docs.filter(function(obj) {
    return (obj.toppings.toString().indexOf('Banana Peppers') > -1);
  });
       var jalapenoData = docs.filter(function(obj) {
    return (obj.toppings.toString().indexOf('Jalapeno Peppers') > -1);
  });
var parmData = docs.filter(function(obj) {
    return (obj.toppings.toString().indexOf('Shredded Parmesan Asiago') > -1);
  });
var provData = docs.filter(function(obj) {
    return (obj.toppings.toString().indexOf('Shredded Provolone Cheese') > -1);
  });
var beefData = docs.filter(function(obj) {
    return (obj.toppings.toString().indexOf('Beef') > -1);
  });
var steakData = docs.filter(function(obj) {
    return (obj.toppings.toString().indexOf('Philly Steak') > -1);
  });
var italianData = docs.filter(function(obj) {
    return (obj.toppings.toString().indexOf('Sliced Italian Sausage') > -1);
  });




db.sankey.find({},function(err,docs1){
    if(err) console.log(err);
    else 
    {
      console.log(docs1);
      
      var j;
    for (j=0; j<docs1.length;j++) {
      console.log(docs1[j]);
      var arr=[];
      arr.push(docs1[j].cheese);
      arr.push(docs1[j].topping);
      arr.push(docs1[j].count);
      console.log(arr);
      dataArray.push(arr);  
} // end of for

console.log(dataArray);
 res.render('Dashboard',{  baconData:baconData,
                            onionsData:onionsData,
                            mushroomsData:mushroomsData,
                            greenPeppersData:greenPeppersData,
                            pepperoniData:pepperoniData,
                            cheddarData:cheddarData,
                            sausageData:sausageData,
                            salamiData:salamiData,
                            hamData: hamData,
                            chickData: chickData,
                            pineData: pineData,
                            italianData: italianData,
                            garlicData: garlicData,
                            spinachData: spinachData,
                            steakData: steakData,
                            beefData: beefData,
                            provData: provData,
                            parmData: parmData,
                            fetaData: fetaData,
                            redPepData: redPepData,
                            oliveData: oliveData,
                            jalapenoData: jalapenoData,
                            bPepData: bPepData,
                            hotData:hotData,
                            tomData: tomData,
                            sankey:dataArray});
}  //end of else

}); //end of find

} // end of else 1


});//end of find outer


}//End of if

});//end of post



var server = app.listen(3001, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Pizza app listening at %s", port)

});