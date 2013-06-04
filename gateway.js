({
    require: ["security", "profile", "com", "theme"]
    ,
    loadModule: function()
    {
        script.registerHandler("beforeLogIn", this );
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

            script.log("Banned user: " + sys.name(src) + " (IP: " + sys.ip(src) + ") (#: " + prof + ") tried to log in.");
            
            sys.stopEvent();
            
            return;
        }
    }

});
