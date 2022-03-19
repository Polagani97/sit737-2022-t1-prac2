console.time("web server started in ");
var express = require("express")
const log = require('log-to-file')
var bodyParser=require('body-parser')
app = express();

// we set the port programmatically, in case we need to change it later
var port = 3000;

//this is where we are going to getch our html from
var root = '/public'

//tell express to use the static middleware,
app.use(express.static(__dirname + root));


const calculator= (num1,num2,operator) =>{

    switch(operator) {

        case '+': 
        return num1+num2;

        case '-':
        return num1-num2;

        case '*':
        return num1*num2;

        case '/':
        return num1/num2;

        case '%':
        return num1%num2;

        default:
        return "-1"
    }
   }

app.use(bodyParser.urlencoded({
    extended: true
   }));
   app.use(bodyParser.json());
   app.use(express.static(__dirname + '/public'));

   app.get("/api/calculator",function(request,response){

    var msg = 'Calculator has been requested';
    logActivities(['Server Activity : ']+[msg]);
    log('Server Activity : '+msg , 'Priyanka_SIT737-2022-T1-PRAC2_log.log');

    var num1  = parseInt(request.query.number1)
    var num2  = parseInt(request.query.number2)
    var operator = request.query.operator
    operator = (operator == ' ')? '+' : operator;

    const result = calculator(num1,num2,operator);
    
    if(result!="-1"){
        msg = 'The result for '+num1+' '+operator+' '+num2+' = '+result;
    }else{
        msg = "Allowed operators {+, -, *, /, %}";
    }
    logActivities(['Server Activity : ']+[msg]);
    log('Server Activity : '+msg , 'Priyanka_SIT737-2022-T1-PRAC2_log.log');

    console.log(msg)
    response.send(msg)
   })

   app.get("/test",function(request,response){
    var param=request.query.username
    msg = 'Get requested by '+param;
    logActivities(['Server Activity : ']+[msg]);
    log('Server Activity : '+msg , 'Priyanka_SIT737-2022-T1-PRAC2_log.log');
    console.log(msg)
    response.send('Thank you for requesting our Get Service, '+ msg)
   })

   app.post('/test',function(request,response){
    console.log(request.body)
    var data=request.body;
    msg = 'Post requested, here is the name :'+data.name+' and lastname : '+data.lastname;
    logActivities(['Server Activity : ']+[msg]);
    log('Server Activity : '+msg , 'Priyanka_SIT737-2022-T1-PRAC2_log.log');
    console.log(msg)
    response.send('Thank you for requesting our Post Service, '+msg)
   })

// add the function that logs activities
var logActivities = function () {
    return console.log.apply(
        console,
        [new Date().toTimeString().slice(0,8)].concat(
            Array.prototype.slice.call(arguments)
        )
    );
};

logActivities(['Server Activity']+[' :  Web server started']);
log('Server Activity : Web server started' , 'Priyanka_SIT737-2022-T1-PRAC2_log.log');

//start the app and listen to the port
app.listen(port);
console.log("Listening on port : ", port);
log('Listening on port : '+port , 'Priyanka_SIT737-2022-T1-PRAC2_log.log');

console.timeEnd("web server started in ");