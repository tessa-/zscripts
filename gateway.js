({
    require: ["security", "profile", "com"]
    ,
    loadModule: function()
    {
        var _this = this;

        script.log(Object.keys(this));
        script.registerHandler("beforeLogIn", function (src) { _this.beforeLogIn(src) } );
    }
    ,
    beforeLogIn: function(src)
    {
        var prof = this.profile.profileOpenCreate(src);
        
        if (sys.auth(src) != 3 && this.security.profIsBanned(prof))
        {
            var ban = this.security.getBan(prof);
            
            this.com.message(
                [src],
                "You are banned until: "+ (ban.expires ? new Date(ban.expires).toString() : "indefinite" )+ " reason: " + ban.reason,
                this.theme.CRITICAL
            );
            
            sys.stopEvent();
            
            return;
        }
    }

});
