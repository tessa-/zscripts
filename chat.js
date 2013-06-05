({
    require: ["commands", "security", "profile", "com", "theme", "time"]
    ,
    beforeChatMessage: function (src, msg, chan)
    {
        if (msg.length == 0) return;

        if (msg[0] == "/")
        {
            script.log("" + sys.name(src) + "["+chan+"] " + msg);
            sys.stopEvent();
            this.commands.issueCommand(src, msg, chan);
            return;
        }

        var prof = this.profile.profileOpenCreate(src);
        
        if (sys.auth(src) != 3 && this.security.profIsMuted(prof))
        {
            var mute = this.security.getMute(prof);
            
            this.com.message(
                [src],
                "You are muted. "+
                    (mute.expires ? new Date(mute.expires).toString() + " ("+this.time.diffToStr(mute.expires - +new Date)  +" from now)" : "indefinite" )+
                    " Reason: " + mute.reason +
                    " Mute Author: " + mute.author
                ,
                this.theme.WARN
            );
            
            script.log("muted message: " + msg);
            sys.stopEvent();
            
            return;
        }
        
    }
    ,
    loadModule: function ()
    {
        script.registerHandler("beforeChatMessage", this);
    }
});
