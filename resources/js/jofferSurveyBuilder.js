function User(firstname,lastname) {
    
    if( typeof User.instance === 'object' ) {
        console.log("inside the if block ==> ");
        return User.instance;
    }
    
    
    
    this.firstname = firstname;
        //"john";
    this.lastname = lastname;
        //"doe";
    
    console.log("outside the if block ==> "+this.firstname+" "+this.lastname);
    
    User.instance = this;
    
    //return this;
    
}

User.remo = "ok";

console.log(" show function object var => "+User.remo);

User("john","doe");
User("john1","doe1");
var v1 = new User("john1","doe1");
console.log("==> fname "+v1.firstname+"==> lname "+v1.lastname);
console.log( v1.prototype );


function Hem() {
    var fname="john", lname="doe";
}

var v2 = new Hem();
console.log("v2 prototype");

var v3 = {
    fi: "john",
    la: "doe"
}

console.log( v2.prototype );
console.log("v3 prototype");
console.log( v3.prototype );

/*
*Singleton with closure
*/
function UserTwo() {
    var instance;
    
    UserTwo.prototype = this;
    instance = new UserTwo();
    
    
    
    UserTwo = function() {
        return instance;
    };
    
    instance.constructor = UserTwo;
    
    
    
    instance.firstname = "john";
    instance.lastname = "doe";
    
    return instance;
}

/*
*Singleton in IIFE
*/
var UserFour;
(function(){
    var instance;
    
    UserFour = function UserFour() {
        if( instance ) {
            return instance;
        }
        
        instance = this;
        
        this.firstname = "john";
        this.lastname = "doe";
        
        return instance;
    };
    
}());
