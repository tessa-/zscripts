({
    require: ["commands"]
    ,
    loadModule: function ()
    {
        script.module.commands.registerCommand("me", this.me);
    }
    ,
    "me":
    {
        perm: function() {return true}
        // This command is harmless so you may always use it, until mutes are implemented.
        ,
        code: function(src, cmd)
        {
            sys.sendHtmlAll("<font color=pink><timestamp />" + script.module.text.escapeHTML(sys.name(src) + " " + cmd.input) + "</font>"); 
        }
    }
});
