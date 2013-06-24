({

    require:
    [
        "commands"
        ,
        "com"
        ,
        "theme"
        ,
        "text"
    ]
    ,
    loadModule: function ()
    {
        this.commands.registerCommand("authlist", this);
    }
    ,
    authlist: 
    {
        desc: "Lists the auth on the server."
        ,
        aliases: ["auths"]
        ,
        perm: function () { return true; }
        ,
        code: function (src) 
        {
            this.com.message([src], "Authlist:", this.theme.INFO);
            var auths = sys.dbAuths();
            
            for (var x in auths)
            {
                this.com.message([src], "<b>" + ([null, "Moderator", "Admin", "Owner"][sys.dbAuth(auths[x])] || "?") + "</b>" + this.text.escapeHTML(auths[x]) +
                                 (sys.id(auths[x])?" <span style:'color:green'>online</span>":" <span style:'color:red'>offline</span>"), this.theme.RAW, true);                
            }
        }    
    }   
});
