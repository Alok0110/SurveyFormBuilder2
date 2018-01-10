var http = require("http");
var sass = require('node-sass');
var fs = require('fs');


http.createServer(function(request,response){
    
    response.writeHead(200, {'Content-Type': 'text/plain'});
    
    response.end('Inside Joffer test run\n');
    
}).listen(8989);

/*
 *calling Sass compiler
 */
sass.render({
    
    file: '../resources/css/jofferSurveyBuilder_sass_.scss',
    outFile: '../resources/css/jofferSurveyBuilder.css'
    
}, function(err, result) {
    
    if( err ) {
        
        console.log("Display error msg =>");
        console.log(err);
        
    } else {
        
        fs.writeFile( '../resources/css/jofferSurveyBuilder.css', result.css, function(err) {
            
            if(err) {
                console.log("show error while writing css file");
                console.log(err);
            } else {
                
            }
            
        } );
        
    }
    
});


