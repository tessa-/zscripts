({
    require: ["commands", "text", "security", "profile"]
    ,
    loadModule: function ()
    {
        this.commands.registerCommand("me", this);
    }
    ,
    "me":
    {
        desc: "Says something"
        ,
        perm: function(src)
        {
            return !this.security.profIsMuted(this.profile.profileID(src));
        }
        ,
        code: function(src, cmd)
        {
            sys.sendHtmlAll("<font color=blue><timestamp /><i>" + this.text.escapeHTML(sys.name(src) + " " + cmd.input) + "</i></font>"); 
        }
        ,
        bind: this
    }
});
