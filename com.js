({
    require: ["text", "theme"]
    ,
    message: function (usrs, msg, html, chans, servercode)
    {
        if (!chans)
        {
            for (var x in usrs)
            {
                sys.sendHtmlMessage(usrs[x], script.module.theme.scriptHTML + this.escapeHtmlBool(msg, html));
            }
        }
        else
        {
            for (var x1 in usrs) 
            {
                for (var x2 in chans)
                {
                    sys.sendHtmlMessage(usrs[x1], script.module.theme.scriptHTML + this.escapeHtmlBool(msg, html), chans[x2]);
                }
            }
        }

        if (typeof servercode == "undefined") return;

        print(servercode + " " + script.module.theme.scriptText + this.stripHtmlBool(msg, html));

        
    }
    ,
    broadcast: function (msg, html, chans)
    {
        var usrs = new Object;
        if (chans)
        {
            for (var x1 in chans)
            {
                throw new Error("unimplemented");
//                var t = sys.getPlayerIdsByChannel()
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
                sys.sendHtmlMessage(usrs[x], script.module.theme.scriptHTML + this.escapeHtmlBool(msg, html));
            }
        }
        else
        {
            for (var x1 in usrs) 
            {
                for (var x2 in chans)
                {
                    sys.sendHtmlMessage(usrs[x1], script.module.theme.scriptHTML + this.escapeHtmlBool(msg, html), chans[x2]);
                }
            }
        }

       print((chans ?"C":"G") + " " + script.module.theme.scriptText + this.stripHtmlBool(msg, html));
    }  
    ,
    escapeHtmlBool: function (text, bool)
    {
        if (bool) return text;
        
        return script.module.text.escapeHTML(text);
    }
    ,
    stripHtmlBool: function (text, bool)
    {
        if (bool) return script.module.text.stripHTML(text);
        
        return text;
    }
    ,
    loadModule: function ()
    {
    
    }
});

