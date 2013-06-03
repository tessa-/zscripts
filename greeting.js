({
    require: ["com"]
    ,
    loadModule: function ()
    {
        script.registerHandler("afterLogIn", this);
    }
    ,
    afterLogIn: function (src, msg, chan)
    {
        var os = sys.os(src);
        this.com.broadcast("Hello " + sys.name(src) +"! These are new scripts with many WIP features! Not everything works yet." );
        
        if (os === "linux")
        {
            this.com.broadcast(sys.name(src) +", I see you are a linux user! You are enlightened!");
        }
    }
});
