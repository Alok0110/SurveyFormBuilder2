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
        seqCheck: 0,
        fnln: '',
        emailid: '',
        addr: '',
        phnum: '',
        subbtn: '',
        headingUni: '',
        starCheck: 0
    };
    
    /**
     * Errors
     *
     * @description set errors to be used
     */
    var errorId = {
        "001": 'Error 001 : Heading Should Be Added On Top Of All Components',
        "002": 'Error 002 : No Question Set For Above Option, Move Or Delete Above Option',
        "003": 'Error 003 : First Name And Last Name Are Necessary',
        "004": 'Error 004 : Type Of Options Do Not Match, Move Or Delete Above Option',
        "005": 'Error 005 : First Name And Last Name Should Be Unique, Delete Above Option',
        "006": 'Error 006 : Email ID Should Be Unique, Delete Above Option',
        "007": 'Error 007 : Address Should Be Unique, Delete Above Option',
        "008": 'Error 008 : Phone Number Should Be Unique, Delete Above Option',
        "009": 'Error 009 : Submit Button Should Be Unique, Delete Above Button',
        "010": 'Error 010 : Heading Should Be Unique, Delete Above Heading'
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
                        
                        
                        console.log("check ele first "+ele);
                        if( ele === ".star-li-cl" ) {
                            defaults.starCheck+=1;
                            cl.attr("id","star-"+defaults.starCheck);
                            var changeCl = cl.children().children().children();
                            var changeEleCl = cl.get(0).firstElementChild.firstElementChild.firstElementChild;
                            console.log(changeCl);
                            console.log("check cl");
                            changeCl.removeClass("el");
                            changeCl.addClass("c-rating");
                            self.runStar("c-rating","star-"+defaults.starCheck, changeEleCl);
                        }
                        
                        
        }
        
        self.runStar = function( classForStar, starHandle, changeEleCl ) {
                        var el = changeEleCl;
                            //document.querySelector( "#"+starHandle );
                        var currentRating = 0;
                        var maxRating= 5;
                        var callback = function(rating) { alert(rating); };
                        var myRating = global.rating(el, currentRating, maxRating, callback);
        }
        
        /*
         *Survey Help 
         */
        $(".help-bth-cl").click( function(e) {
            
            if( $("#help-contents-id").css("width") !== "0px" ) {
                $("#help-contents-id").width("0px");
                $("#help-bth-id").css("margin-left","100%");
                $(".help-bth-cl").css("margin-left","90%");
            } else {
                
                $(".help-bth-cl").css("margin-left","60%");
                $(".help-element-cl").css("width","30%");
                $("#help-contents-id").width("100%");
                $("#help-bth-id").css("margin-left","70%");
            }
            
        } );
        
        /*
         *Reset the form
         */
        $("#form-reset-id").click( function(e){
            global.location.reload();
        } );
        
        /*
         *Start the search
         */
        $("#form-save-id").click( function( e ){
            var arrEle = $("#ele-container-id");
            
            /** Check For Unique Value **/
            defaults.fnln="";
            defaults.emailid="";
            defaults.addr="";
            defaults.phnum="";
            defaults.subbtn="";
            defaults.headingUni="";
            /** End **/
            
            /** Freshly Start The Search **/
            defaults.seqCheck=0;
            /** End **/
            
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
                        //throw new Error("Headng Not Added On Top");
                    }
                    else {
                        $("#head-cl-err").removeClass("err-show");
                        $("#head-cl-err").addClass("err-hide");
                        defaults.isError = 0;
                    }
                }
                
                /*
                 *Add question 
                 */
                if( ele.firstElementChild.getAttribute("id") === "survey-Q-cl" ) {
                    defaults.recentQue+=1;
                    ele.firstElementChild.firstElementChild.firstElementChild.setAttribute("id","Q"+defaults.recentQue);
                    defaults.seqCheck = ind;
                    defaults.recentQueOpt = "";
                }
                
                /*
                 *First name and Last name should be unique
                 */
                if ( ele.firstElementChild.getAttribute("id") === "full-name-cl"  ) {
                    if( defaults.fnln === "" ) {

                            defaults.fnln = ele.firstElementChild.getAttribute("id");
                            setHideDuplicateError();

                    } else {
                            setShowDuplicateError( errorId["005"] );
                    }
                }
                
                /*
                 *Email Address should be unique
                 */
                if ( ele.firstElementChild.getAttribute("id") === "email-address-cl"  ) {
                    if( defaults.emailid === "" ) {

                            defaults.emailid = ele.firstElementChild.getAttribute("id");
                            setHideDuplicateError();

                    } else {
                            setShowDuplicateError( errorId["006"] );
                    }
                }
                
                /*
                 *Address should be unique
                 */
                if ( ele.firstElementChild.getAttribute("id") === "postal-address-cl"  ) {
                    if( defaults.addr === "" ) {

                            defaults.addr = ele.firstElementChild.getAttribute("id");
                            setHideDuplicateError();

                    } else {
                            setShowDuplicateError( errorId["007"] );
                    }
                }
                
                /*
                 *Phone number should be unique
                 */
                if ( ele.firstElementChild.getAttribute("id") === "Phone-num-cl"  ) {
                    if( defaults.phnum === "" ) {

                            defaults.phnum = ele.firstElementChild.getAttribute("id");
                            setHideDuplicateError();

                    } else {
                            setShowDuplicateError( errorId["008"] );
                    }
                }
                
                /*
                 *Submit button should be unique
                 */
                if ( ele.firstElementChild.getAttribute("id") === "button-cl"  ) {
                    if( defaults.subbtn === "" ) {

                            defaults.subbtn = ele.firstElementChild.getAttribute("id");
                            setHideDuplicateError();

                    } else {
                            setShowDuplicateError( errorId["009"] );
                    }
                }
                
                /*
                 *Heading should be unique
                 */
                if ( ele.firstElementChild.getAttribute("id") === "head-cl"  ) {
                    if( defaults.headingUni === "" ) {

                            defaults.headingUni = ele.firstElementChild.getAttribute("id");
                            setHideDuplicateError();

                    } else {
                            setShowDuplicateError( errorId["010"] );
                    }
                }
                
                /*
                 *Common function for showing duplicate error
                 */
                function setHideDuplicateError() {
                    var handleError = arrEle.children("li").get(ind).lastElementChild;
                        if( $( handleError ).hasClass("err-show")  ) {
                            $( handleError ).removeClass("err-show");
                            $( handleError ).addClass("err-hide");
                        }
                }
                
                /*
                 *Common function for hiding duplicate error
                 */
                function setShowDuplicateError( errMessage ) {
                    var handleError = arrEle.children("li").get(ind).lastElementChild;
                                $( handleError ).html( errMessage );
                                $( handleError ).removeClass("err-hide");
                                $( handleError ).addClass("err-show");
                }
                
                /*
                 *Attach option's to their question's
                 */
                if( ele.firstElementChild.getAttribute("id") === "radio-selector-cl" ||
                    ele.firstElementChild.getAttribute("id") === "drop-down-opt-cl" ||
                    ele.firstElementChild.getAttribute("id") === "checkbox-selector-cl" ||
                    ele.firstElementChild.getAttribute("id") === "text-area-cl" ||
                    ele.firstElementChild.getAttribute("id") === "short-text-cl" ||
                    ele.firstElementChild.getAttribute("id") === "long-text-cl" ||
                    ele.firstElementChild.getAttribute("id") === "number-text-cl" ||
                    ele.firstElementChild.getAttribute("id") === "spinner-text-cl" ||
                    ele.firstElementChild.getAttribute("id") === "star-text-cl" 
                    ){
                    
                        if( defaults.recentQueOpt === "" ) {
                            defaults.recentQueOpt = ele.firstElementChild.getAttribute("id");
                        }
                    
                        console.log("show seqCheck Very Imp pppppppppppppppppppppppppppppppppppp "+defaults.seqCheck);
                        if( defaults.seqCheck === 0 ) {
                            
                            var handleError = arrEle.children("li").get(ind).lastElementChild;
                                        $( handleError ).html( errorId["002"] );
                                        $( handleError ).removeClass("err-hide");
                                        $( handleError ).addClass("err-show");
                            
                        }
                       
                        else {
                            
                        
                    
                            var cnt = ind;
                            while( cnt >= defaults.seqCheck ) {

                                if( (arrEle.children("li").get(cnt).firstElementChild.getAttribute("id") !== defaults.recentQueOpt) && (arrEle.children("li").get(cnt).firstElementChild.getAttribute("id") !== "survey-Q-cl") ) {

                                    /*
                                     *Make certain field's immune to error's
                                     */
                                    if( arrEle.children("li").get(cnt).firstElementChild.getAttribute("id") !== "image-uploader-Q-cl" &&
                                      arrEle.children("li").get(cnt).firstElementChild.getAttribute("id") !== "file-uploader-cl" &&
                                    arrEle.children("li").get(cnt).firstElementChild.getAttribute("id") !== "full-name-cl" &&
                                    arrEle.children("li").get(cnt).firstElementChild.getAttribute("id") !== "email-address-cl" &&
                                    arrEle.children("li").get(cnt).firstElementChild.getAttribute("id") !== "postal-address-cl" &&
                                       arrEle.children("li").get(cnt).firstElementChild.getAttribute("id") !== "Phone-num-cl" &&
                                      arrEle.children("li").get(cnt).firstElementChild.getAttribute("id") !==  "date-cl" &&
                                       arrEle.children("li").get(cnt).firstElementChild.getAttribute("id") !== "time-cl" &&
                                        arrEle.children("li").get(cnt).firstElementChild.getAttribute("id") !== "button-cl"
                                      ) {

                                        var handleError = arrEle.children("li").get(cnt).lastElementChild;
                                        $( handleError ).html( errorId["004"] );
                                        $( handleError ).removeClass("err-hide");
                                        $( handleError ).addClass("err-show");
                                        defaults.isError = 1;
                                    }


                                } else {
                                    var handleError = arrEle.children("li").get(cnt).lastElementChild;
                                    if( $( handleError ).hasClass("err-show")  ) {
                                        $( handleError ).removeClass("err-show");
                                        $( handleError ).addClass("err-hide");
                                        defaults.isError = 0;
                                    }
                                }
                                cnt--;
                            }

                        }
                }
                
                
                
            } );
            
                //console.log("  ======> "+$(".err-show").get(0));
                if( $(".err-show").get(0) === undefined ) {
                    alert("The Author Is Working On Final Server Side Work, It Can Be Viewed On ==> http://www.joffer.nz ");
                }
            
        } );
        
        /*
         *Delete handle
         */
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
                if( $("#head-cl-err").hasClass("err-show") ) {
                    $("#head-cl-err").removeClass("err-show");
                    $("#head-cl-err").addClass("err-hide");
                }
            }
            
        } );
        
        /*
         *Choose which elements to drop
         */
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
                        //self.runStar(".c-rating"); //For Demo Only
                        break;
                    
                    case "scale-rating-id" :
                        self.attachToBody(".scale-rating-li-cl");
                        break;
                    
                    
                        
                    default :
                        break;
                        
                }
            
              }
        });
        
        /*
         *Make elements sortable
         */
        $( "#ele-container-id" ).sortable({
          revert: true,
          handle: ".heading-drag-cl"    
        });
        
        
    };
    
    
}(window, jQuery));


