/* 
 *
 * Copyright (C) Joffer Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Alok Dethe <det.alex0110@gmail.com>, July 2017
 *
 *
 *
 */



;(function(global, $){
    "use strict";
    
    /*
     * Check if jquery is loaded first  
     */
    if( !$ ){
        throw new  Error("jQuery not loaded");
    }
    
    /*
     *Default Settings
     */
    const defaults = {
        setone: "fir"
    };
    
    /*
     *Initialize the library
     */
    $.JofferSurveyFormBuilderInit = function() {
           var testVar = 10;
           console.log("test it ==>"+this.testVar+" "+defaults.setone);
           
           
    };
    
    
}(window, jQuery));


