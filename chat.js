({
    require: ["commands", "security", "profile", "com", "theme", "time", "logs"]
    ,
    filters: []
    ,
    beforeChatMessage: function (src, msg, chan)
    {
        if (msg.length == 0) return;

        if (msg[0] == "/")
        {
            this.logs.logMessage(this.logs.INFO, "" + sys.name(src) + "["+chan+"] " + msg);
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
            
            this.logs.logMessage(this.logs.INFO, "Muted message from "+sys.name(src)+": " + msg);
            sys.stopEvent();
            
            return;
        }

        var m = msg;

        for (var x in this.filters)
        {
            m = this.filters[x](src, msg, chan);

            if (!m) break;
        }

        if (m) sys.sendHtmlAll("<timestamp /><b>" +sys.name(src) + ":</b> " + m, chan);
        sys.stopEvent();
        
    }
    ,
    loadModule: function ()
    {
        script.registerHandler("beforeChatMessage", this);
    }
});
