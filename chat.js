(function () { return {
    require: ["commands", "security", "profile", "com", "theme", "time", "logs", "text"]
    ,
    filters: []
    ,
    capture: new Object
    ,
   /* registerCapture: function (src, func)
    {
        this.cap[src] = func;
    }*/
    //,
    beforeChatMessage: function beforeChatMessage (src, msg, chan)
    {
        if (msg.length == 0) return;

        if (this.capture[src])
        {
            sys.stopEvent();
            var f = this.capture[src];

            delete this.capture[src];

            f.call(new Object, src, msg, chan);
            return;
        }
        
        if (msg[0] == "/")
        {
            this.logs.logMessage(this.logs.INFO, "" + sys.name(src) + "["+chan+"] " + msg);
            sys.stopEvent();
            this.commands.issueCommand(src, msg, chan);
            return;
        }

        var prof = this.profile.profileID(src);
        
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

        if (m) 
        {
            sys.broadcast(m, chan, src, false, -1);
            //this.com.broadcast("<timestamp /><b>" +sys.name(src) + ":</b> " + this.text.escapeHTML(m), -1, true, [chan]);
        }
        sys.stopEvent();
        
    }
    ,
    registerFilter: function (filter)
    {
        this.filters.push(filter);
    }
    ,
    loadModule: function loadModule ()
    {
        script.registerHandler("beforeChatMessage", this);
    }
}})();
