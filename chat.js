(function () { return {
    require: ["commands", "security", "profile", "com", "theme", "time", "logs", "text"]
    ,
    filters: []
    ,
    capture: new Object
    ,
    registerCapture: function (src, name, object)
    {
        if (!this.capture[src]) this.capture[src] = [];

        var capper = object[name];

        this.capture[src].push(capper);
        object.onUnloadModule( this.util.bind(
            this,
            function ()
            {
                this.filters.splice(this.filters.indexOf(capper), 1);
            }
        ));
    }
    ,
    afterChatMessage: function afterChatMessage (src, msg, chan)
    {
        if (this.capture[src] && this.capture[src].length >= 1)
        {
            sys.sendHtmlMessage(src, "<span style=\"background-color:#000000; color:white\">&nbsp;INTERACTIVE MODE&nbsp;</span>");
        }
    }
    ,
    beforeChatMessage: function beforeChatMessage (src, msg, chan)
    {
        if (msg.length == 0) return;

        if (this.capture[src] && this.capture[src].length >= 1)
        {
            sys.sendHtmlMessage(src, this.text.escapeHTML(msg) + "<br/>");
            sys.stopEvent();
            var f = this.capture[src].pop();

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
    registerFilter: function (filter, object)
    {
        var filt = object[filter];
        this.filters.push(filt);
        object.onUnloadModule( this.util.bind(
            this,
            function ()
            {
                this.filters.splice(this.filters.indexOf(filt), 1);
            }
        ));
    }
    ,
    loadModule: function loadModule ()
    {
        script.registerHandler("beforeChatMessage", this);
    }
}})();
