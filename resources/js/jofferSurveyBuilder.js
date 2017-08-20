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
    var defaults = {
        recentElement: ''
    };
    
    /*
     *Initialize the library
     */
    $.JofferSurveyFormBuilderInit = function() {
        
        var self = this;
        
        $( "#header-id, #number-id" ).draggable({  
           /* connectToSortable: "#ele-container-id", */
            helper: "clone", 
            cursorAt: { top: 4, left: 10 }, 
            containment: "#big-cont", scroll: false, 
            start: function() {
                defaults.recentElement = $( this ).attr("id");
                
             },
            stop: function() {
                
                console.log( "==>"+$( this ).attr("id")+" ok "+$("#drag-here-id").hasClass("hide-ele") );
            },                      
            revert: "invalid"
       });

        self.attachToBody = function( ele ) {
                        defaults.recentElement = '';
                        if ( !$("#drag-here-id").hasClass("hide-ele") ) {
                                $("#drag-here-id").addClass("hide-ele");
                        }
                        var cl = $( ele ).clone();
                        cl.appendTo( ".ele-container-cl" );
                        cl.addClass("show-ele");
                        cl.removeClass("head-li-cl");
                        console.log("ok got in header-id");
        }
        
        $( "#droppable" ).droppable({
              accept: "#header-id, #number-id",
              drop: function( event, ui ) {
                switch( defaults.recentElement ){
                        
                    case "header-id" : 
                        self.attachToBody(".head-li-cl");
                        break;
                        
                    case "number-id" :
                        self.attachToBody(".number-li-cl");
                        break;
                        
                    default :
                        break;
                        
                }
            
              }
        });
        
        $( "#ele-container-id" ).sortable({
          revert: true
        });
        
        
    };
    
    
}(window, jQuery));


