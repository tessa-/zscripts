({
    require: ["security", "profile", "com"]
    ,
    loadModule: function()
    {
        var _this = this;
        script.registerHandler("beforeLogIn", function (src) { _this.beforeLogIn(src) } );
    }
    ,
    beforeLogIn: function(src)
    {
        var prof = script.module.profile.profileOpenCreate(src);
	
	if (sys.auth(src) != 3 && script.module.security.profIsBanned(prof))
	{
	    var ban = script.module.security.getBan(prof);
	    
	    script.module.com.message([src], "You are banned until: "+ (ban.expires ? new Date(ban.expires).toString() : "indefinite" )+ " reason: " + ban.reason,
                                 script.module.theme.CRITICAL);
	    
	    sys.stopEvent();
	    
	    return;
	}
    }

});
