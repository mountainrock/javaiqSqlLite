var revmob = null,appLovin=null;
var revMobId= "50e9fff60a07a50003000005";
var objExists;

function init(){ 
    document.addEventListener("deviceready", onDeviceReady, true);
    setBackButton();
	startApp();
}

function onDeviceReady() {
	//
	jQuery.mobile.defaultPageTransition="none";
	jQuery.mobile.changePage(jQuery('#landing'));

	revmob = new RevMob(revMobId);
	//revmob.showPopup(null, null);
	revmob.showFullscreen(null, null);
	appLovin = new Applovin(null);
	//appLovin.showFullscreen();

}

function startApp(){
	
	objExists = window.localStorage.getItem("javaIQ");	
	if(objExists!=null){
		objExists = JSON.parse(objExists);
	}
	setLocalStorage();
	 //revmob.showPopup(null, null);
	 
}

function setLocalStorage() {
	if (!objExists || objExists == null) {
		var urlJson = "data/data_1-10.json";
		log("Loading json data from "+ urlJson)
        $.ajax({
                    type : "GET",
                    url : urlJson,
                    dataType : "jsonp",
                    success : function(data) {                        
                        window.localStorage.setItem("javaIQ", JSON.stringify(data));
                        // console.log(jQuery.parseJSON(window.localStorage.getItem("javaIQ")));
                        getContent(data);
                        
                        objExists = data;
                    }
                });
    } else {
        getContent(objExists);
    }
    jQuery.mobile.changePage(jQuery('#main'));
}

function getContent(myObject) {

    var categoryHtml="";
    $.each(myObject, function(index) {
		
							categoryHtml += '<li> <a href="#topicsPage" data-val="'+this.category+'">'+this.category +'</a></li>';
			});
					
	$('#categories').html( categoryHtml);
	$('#categories').listview('refresh');
	$('#categories a').click( function(event) {
		 category = $(this).data("val");
		 log("Getting detail for "+category);
         displayTopics(category,myObject);
    });
	
    //revmob.showFullscreen(null, null);
    //appLovin.showFullscreen();
	
};

function displayTopics(category, myObject){
	//alert(category);
	 var topicsHtml="";
	 $.each(myObject, function(index) {
			if(this.category  == category){
							topicsHtml += '<li> <a href="#qaPage" data-val="'+this.subCategory+'">'+this.subCategory +'</a></li>';
			}
	});
	$('#subCategories').html( topicsHtml);
	
	$('#subCategories a').click( function(event) {
		 subCategory = $(this).data("val");
		 log("Getting detail for "+subCategory);
         displayQA(subCategory,myObject);
    });
	
	jQuery.mobile.changePage(jQuery('#topicsPage'));
	$('#subCategories').listview('refresh');
}

function displayQA(subCategory, myObject){
	//alert(category);
	 var qaHtml="";
	 $.each(myObject, function(index) {
			if(this.subCategory  == subCategory){
							qaHtml += '<li><b>'+this.questionTxt.value +'</b><br/>'+this.answerTxt.value +'</li>';
			}
	});
	$('#questions').html( qaHtml);
	
	jQuery.mobile.changePage(jQuery('#qaPage'));
}

function reset() {
    window.localStorage.removeItem("javaIQ");
    jQuery.mobile.changePage(jQuery('#main'));
    $("#main").page('refresh');
}



function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

//back button

/*$(function() {
    document.addEventListener("deviceready", init, false);

});

function init() {
    setBackButton();
}
*/
function setBackButton() {
    document.addEventListener("backbutton", backKeyDown, true);
}

function backKeyDown() {
    var currentpage = $('.ui-page-active').attr('id');

    if (currentpage == "main") {
        navigator.device.exitApp();

    } else {
        goBack();
    }

}
function goBack() {
    history.back();
}

function log(obj){
		if(window.console!=null){
					console.log(obj);
		}
}
