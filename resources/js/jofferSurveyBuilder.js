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
        
        $( "#header-id, #survey-question-id, #image-uploader-id, #radio-option-id, #dropdown-id, #check-box-id, #file-uploader-id, #textarea-id, #full-name-id, #email-id, #address-id, #number-id, #phone-id, #date-picker-id, #time-id, #submit-id, #short-text-entry-id, #long-text-entry-id, #captcha-id, #spinner-id, #star-rating-id, #scale-rating-id" ).draggable({  
           /* connectToSortable: "#ele-container-id", */
            helper: "clone", 
            cursorAt: { top: 4, left: 10 }, 
            containment: "#big-cont", scroll: false, 
            start: function() {
                defaults.recentElement = $( this ).attr("id");
                
             },
            stop: function() {
                
                //console.log( "==>"+$( this ).attr("id")+" ok "+$("#drag-here-id").hasClass("hide-ele") );
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
                        cl.removeClass( ele.substring(1) );
                        console.log("ok got in"+ele);
        }
        
        $( "#droppable" ).droppable({
              accept: "#header-id, #survey-question-id, #image-uploader-id, #radio-option-id, #dropdown-id, #check-box-id, #file-uploader-id, #textarea-id, #full-name-id, #email-id, #address-id, #number-id, #phone-id, #date-picker-id, #time-id, #submit-id, #short-text-entry-id, #long-text-entry-id, #captcha-id, #spinner-id, #star-rating-id, #scale-rating-id",
              drop: function( event, ui ) {
                switch( defaults.recentElement ){
                        
                    case "header-id" : 
                        self.attachToBody(".head-li-cl");
                        break;
                    
                    case "survey-question-id" :
                        self.attachToBody(".survey-Q-li-cl");
                        break;
                    
                    case "image-uploader-id" :
                        self.attachToBody(".image-uploader-Q-li-cl");
                        break;
                        
                    case "radio-option-id" :
                        self.attachToBody(".radio-selector-li-cl");
                        break;
                    
                    case "dropdown-id" :
                        self.attachToBody(".drop-down-opt-li-cl");
                        break;
                    
                    case "check-box-id" :
                        self.attachToBody(".checkbox-selector-li-cl");
                        break;
                    
                    case "file-uploader-id" :
                        self.attachToBody(".file-uploader-li-cl");
                        break;
                    
                    case "textarea-id" :
                        self.attachToBody(".text-area-li-cl");
                        break;
                        
                    case "full-name-id" :
                        self.attachToBody(".full-name-li-cl");
                        break;
                    
                    case "email-id" :
                        self.attachToBody(".email-address-li-cl");
                        break;
                    
                    case "address-id" :
                        self.attachToBody(".postal-address-li-cl");
                        break;
                     
                    case "number-id" :
                        self.attachToBody(".number-li-cl");
                        break;
                    
                    case "phone-id" :
                        self.attachToBody(".Phone-num-li-cl");
                        break;
                
                    case "date-picker-id" :
                        self.attachToBody(".date-li-cl");
                        break;
                    
                    case "time-id" :
                        self.attachToBody(".time-li-cl");
                        break;
                    
                    case "submit-id" :
                        self.attachToBody(".button-li-cl");
                        break;
                    
                    case "short-text-entry-id" :
                        self.attachToBody(".short-text-li-cl");
                        break;
                    
                    case "long-text-entry-id" :
                        self.attachToBody(".long-text-li-cl");
                        break;
                        
                    case "captcha-id" :
                        self.attachToBody(".captcha-li-cl");
                        break;
                    
                    case "spinner-id" :
                        self.attachToBody(".spinner-li-cl");
                        break;
                    
                    case "star-rating-id" :
                        self.attachToBody(".star-rating-li-cl");
                        break;
                    
                    case "scale-rating-id" :
                        self.attachToBody(".scale-rating-li-cl");
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


