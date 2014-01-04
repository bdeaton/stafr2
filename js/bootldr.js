/**
 * bootldr.js
 * 
 * @author Oscar Frowijn
 * @desc Loading basics and check token
 *       Set default AJAX settings
 * 
 */


var gateWay = 'http://gateway.stafr.ozkaa.com';
var sUDID   = '';

document.addEventListener("deviceready", onDeviceReady, false);

$.ajaxSettings = {
        type        : 'POST',
        beforeSend  : function( ) {   },
        error       : function( ) { alert( 'Server error, Please try again later...' ); },
        complete    : function( ) {   },
        context     : undefined,
        timeout     : 0,
        crossDomain : true
};

function onDeviceReady( )
{
	// Device is ready, let's go !
	
	// Grab UDID..
	sUDID = device.uuid;	
	
	// Look for local access token
	if( window.localStorage.getItem("access_token") > '' )
	{
		// Test to see if the access token still works?		
		$.ajax({
			  url  		: gateWay + "/users",
			  type      : "POST",
			  dataType  : "json",
			  data 		: 
			  { 
		                method       : "checkToken",
			  			uuid	 	 : sUDID,
			  			access_token : window.localStorage.getItem( "access_token" ),
			  			user_id      : window.localStorage.getItem( "user_id" )
			  },
			  success 	: function( data ) 
			  {
			      	if( data.success == false )
			      	{
			      		// Drop to login page or again different page depending on if it needs access?
			    		window.location = 'index.html';
			      	}
			          				  
			  }
		}); 		

	} else {
		// Drop to main page
		// This might be excluded from some pages that don't require an access token....
		window.location = 'index.html';
	}
}