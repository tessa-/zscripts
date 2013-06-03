({
    require: ["text", "theme"]
    ,
    message: function (usrs, msg, type, html, chans, servercode )
    {
        var fmt_msg = this.theme.formatAs(this.escapeHtmlBool(msg, html), type || 0);
        if (!chans)
        {
            for (var x in usrs)
            {
                sys.sendHtmlMessage(usrs[x], fmt_msg );
            }
        }
        else
        {
            for (var x1 in usrs) 
            {
                for (var x2 in chans)
                {
                    sys.sendHtmlMessage(usrs[x1], fmt_msg, chans[x2]);
                }
            }
        }

        if (typeof servercode == "undefined") return;

        print(servercode + " " + this.theme.scriptText + this.stripHtmlBool(msg, html));

        
    }
    ,
    broadcast: function (msg, type, html, chans)
    {
        var usrs = new Object;

        var fmt_msg = this.theme.formatAs(this.escapeHtmlBool(msg, html), type || 0);
        if (chans)
        {
            for (var x1 in chans)
            {
                throw new Error("unimplemented");
                //  var t = sys.getPlayerIdsByChannel()
            }
        }
        else
        {
            var t = sys.playerIds();

            for (var x in t)
            {
                usrs[t[x]] = true;
            }
        }

        usrs = Object.keys(usrs);
        
        if (!chans)
        {
            for (var x in usrs)
            {
                sys.sendHtmlMessage(usrs[x], fmt_msg );
            }
        }
        else
        {
            for (var x1 in usrs) 
            {
                for (var x2 in chans)
                {
                    sys.sendHtmlMessage(usrs[x1], fmt_msg, chans[x2]);
                }
            }
        }

       print((chans ?"C":"") + " " + this.theme.scriptText + this.stripHtmlBool(msg, html));
    }  
    ,
    escapeHtmlBool: function (text, bool)
    {
        if (bool) return text;
        
        return this.text.escapeHTML(text);
    }
    ,
    stripHtmlBool: function (text, bool)
    {
        if (bool) return this.text.stripHTML(text);
        
        return text;
    }
    ,
    loadModule: function ()
    {
    
    }
});

