$.JofferSurveyFormBuilderInit();

var car = { myCar:"obone", getCar:frmFunc(), special: spr };
var spr;
console.log( "===>" + car.myCar + "===>" + car.getCar );

function frmFunc( name ) {
    return "ok";
}

function FormG( firstname, lastname ) {
    /* below variable */
    this.firstname = firstname;
    this.lastname = lastname;
    
}

var strone = new FormG( "sam", "remo" );
console.log( "this is var ==> "+strone.firstname+" "+strone.lastname );

function samEx(){
    "use strict";
    var y = 3.14;
}

samEx();