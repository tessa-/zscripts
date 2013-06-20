({
    require: ["com", "theme", "help_command", "uptime"]
    ,
    loadModule: function ()
    {
        script.registerHandler("afterLogIn", this);
    }
    ,
    afterLogIn: function (src, msg, chan)
    {
        var os = sys.os(src);
        this.com.broadcast("Hello " + sys.name(src) +"! Script uptime is " + this.uptime.uptime() + "!", this.theme.INFO );


        this.com.message([src], "If you need help, type /help , also note it's \"/commands --all\" not \"/commands all\"", this.theme.INFO);
        
        if (os === "linux")
        {
            this.com.broadcast(sys.name(src) +", I see you are a linux user! You are enlightened!");
        }

        
    }
});
