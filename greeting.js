({
    require: ["com"]
    ,
    loadModule: function ()
    {
        script.registerHandler("afterLogIn", this.afterLogIn, this);
    }
    ,
    afterLogIn: function (src, msg, chan)
    {
        var os = sys.os(src);
        this.com.broadcast("Hello " + sys.name(src) +"! Commands don't work yet, don't complain the scripts are new!" );
        
        if (os === "linux")
        {
            this.com.broadcast(sys.name(src) +", I see you are a linux user! You are enlightened!");
        }
    }
});
