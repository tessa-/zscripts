({
    require: ["commands", "text"]
    ,
    loadModule: function ()
    {
        this.commands.registerCommand("me", this);
    }
    ,
    "me":
    {
        perm: function() {
            return true;
        }
        // This command is harmless so you may always use it, until mutes are implemented.
        ,
        code: function(src, cmd)
        {
            sys.sendHtmlAll("<font color=blue><timestamp /><i>" + this.text.escapeHTML(sys.name(src) + " " + cmd.input) + "</i></font>"); 
        }
        ,
        bind: this
    }
});
