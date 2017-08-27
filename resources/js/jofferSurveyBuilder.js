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
    
    /**
     * JQuery
     *
     * @description Check if jQuery is loaded first
     * @param {Object} jQuery Object
     */
    if( !$ ){
        throw new  Error("jQuery not loaded");
    }
    
    /**
     * Default
     *
     * @description set defaults to be used
     */
    var defaults = {
        recentElement: '',
        recentQue: 0,
        isError: 0,
        recentQueOpt: '',
        seqCheck: 0
    };
    
    /**
     * Errors
     *
     * @description set errors to be used
     */
    var errorId = {
        "001": 'Error 001 : Heading Should Be Added On Top Of All Components',
        "002": 'Error 002 : No Question Set For Option',
        "003": 'Error 003 : First Name And Last Name Are Necessary'
    };
    
    /*
     *Initialize the library
     */
    $.JofferSurveyFormBuilderInit = function() {
        
        var self = this;
        
        
        // target element
        
        
        
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
                        var cl = $( ele ).clone( true );
                        cl.appendTo( ".ele-container-cl" );
                        cl.addClass("show-ele");
                        cl.removeClass( ele.substring(1) );
                        
                        /* For demo only  */
                        if( ele === ".star-li-cl" ) {
                            var changeCl = cl.children().children().children();
                            console.log(changeCl);
                            console.log("check cl");
                            changeCl.removeClass("el");
                            changeCl.addClass("c-rating");
                        }
                        /* End demo */
                        
        }
        
        self.runStar = function( classForStar ) {
                        var el = document.querySelector( classForStar );
                        var currentRating = 0;
                        var maxRating= 5;
                        var callback = function(rating) { alert(rating); };
                        var myRating = global.rating(el, currentRating, maxRating, callback, classForStar.substring(1));
        }
        
        $("#form-save-id").click( function( e ){
            var arrEle = $("#ele-container-id");
            
            arrEle.children("li").each( function(ind,ele){
                
                console.log(ele.getAttribute("id")+" "+ele.classList+" "+ele.firstElementChild.classList.contains("survey-Q-cl")+" id "+ele.firstElementChild.getAttribute("id"));
                /*
                 *Check heading
                 */
                if( ind === 0 ) {
                    if( !(ele.firstElementChild.getAttribute("id") === "head-cl") ) {
                        $("#head-cl-err").html( errorId["001"] );
                        $("#head-cl-err").removeClass("err-hide");
                        $("#head-cl-err").addClass("err-show");
                        defaults.isError = 1;
                        throw new Error("Headng Not Added On Top");
                    }
                    else {
                        $("#head-cl-err").removeClass("err-show");
                        $("#head-cl-err").addClass("err-hide");
                        defaults.isError = 0;
                    }
                }
                
                if( ele.firstElementChild.getAttribute("id") === "survey-Q-cl" ) {
                    defaults.recentQue+=1;
                    ele.firstElementChild.firstElementChild.firstElementChild.setAttribute("id","Q"+defaults.recentQue);
                    defaults.seqCheck = ind;
                    defaults.recentQueOpt = "";
                }
                
                if( ele.firstElementChild.getAttribute("id") === "radio-selector-cl" ||
                    ele.firstElementChild.getAttribute("id") === "drop-down-opt-cl" ||
                    ele.firstElementChild.getAttribute("id") === "checkbox-selector-cl" ||
                    ele.firstElementChild.getAttribute("id") === "text-area-cl" ||
                    ele.firstElementChild.getAttribute("id") === "short-text-cl" ||
                    ele.firstElementChild.getAttribute("id") === "long-text-cl" ||
                    ele.firstElementChild.getAttribute("id") === "number-text-cl" ||
                    ele.firstElementChild.getAttribute("id") === "spinner-text-cl" ||
                    ele.firstElementChild.getAttribute("id") === "star-text-cl" ||
                    ele.firstElementChild.getAttribute("id") === "radio-selector-cl" 
                    ){
                    
                        defaults.recentQueOpt = ele.firstElementChild.getAttribute("id");
                        var cnt = ind;
                        while( cnt >= defaults.seqCheck ) {
                            
                            if( (arrEle.children("li").get(cnt).firstElementChild.getAttribute("id") !== defaults.recentQueOpt) && (arrEle.children("li").get(cnt).firstElementChild.getAttribute("id") !== "survey-Q-cl") ) {
                                throw new Error("A Question Can Have One Type Of Options Only");
                            }
                            cnt--;
                        }
                }
                
                
                
            } );
            
        } );
        
        $(".heading-delete-cl").click( function(e){
            var optV = e.currentTarget.parentElement.parentElement.parentElement;
            optV.remove();
            var arrEle = $("#ele-container-id");
            var checkEle = arrEle.children("li").length;
            if( checkEle === 0 ) {
                if ( $("#drag-here-id").hasClass("hide-ele") ) {
                                $("#drag-here-id").removeClass("hide-ele");
                                $("#drag-here-id").addClass("show-ele");
                }
            }
            
        } );
        
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
                        self.attachToBody(".star-li-cl");
                        self.runStar(".c-rating"); //For Demo Only
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
          revert: true,
          handle: ".heading-drag-cl"    
        });
        
        
    };
    
    
}(window, jQuery));


