function Applovin(appId) {
    this.appId = appId;
    if(cordova==null){
        cordova = PhoneGap;
    }
    cordova.exec(function(successParams){}, function(errorParams){}, "ApplovinPlugin", "start", [ appId ]);

    this.showFullscreen = function(successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "ApplovinPlugin", "load", []);
    }


}