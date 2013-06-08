({
    require: ["security", "profile", "com", "theme", "time", "logs"]
    ,
    loadModule: function()
    {
        script.registerHandler("beforeLogIn", this );
    }
    ,
    beforeLogIn: function(src)
    {
        var profs = this.profile.profileMatches(src);
        
        for (var x in profs)
        {
            var prof = profs[x];
            if (sys.auth(src) != 3 && this.security.profIsBanned(prof))
            {
                var ban = this.security.getBan(prof);
                
                this.com.message(
                    [src],
                    "You are banned until: "+
                        (ban.expires ? new Date(ban.expires).toString() + " ("+this.time.diffToStr(ban.expires - +new Date)  +" from now)" : "indefinite" )+
                        " Reason: " + ban.reason +
                        " Ban Author: " + ban.author
                    ,
                    this.theme.CRITICAL
                );
                
                this.logs.logMessage(this.logs.WARN, "Banned user: " + sys.name(src) + " (IP: " + sys.ip(src) + ") (#: " + prof + ") tried to log in.");
                
                sys.stopEvent();
                
                return;
            }
        }
        this.logs.logMessage(this.logs.INFO, sys.name(src) + " logged in.");
    }
    ,
    beforeLogOut: function (src)
    {
        this.logs.logMessage(this.logs.INFO, sys.name(src) + " logged out.");
    }
});
