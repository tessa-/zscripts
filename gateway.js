({
    require: ["security", "profile", "com", "parsecommand"]
    ,
    loadModule: function()
    {
        var _this = this;
        script.registerHandler("beforeLogIn", function (src) { _this.beforeLogIn(src) } );
        script.registerHandler("afterLogIn", function (src) { _this.afterLogIn(src) } );
    }
    ,
    beforeLogIn: function(src)
    {
        
    }
    ,
    afterLogIn: function(src)
    {
        var os = sys.os(src);
        script.log(script.module.profile.profileOpenCreate(src));
        script.module.com.broadcast("Hello " + sys.name(src) +"! Commands don't work yet, don't complain the scripts are new!" );

        if (os === "linux")
        {
            script.module.com.broadcast(sys.name(src) +", I see you are a linux user! You are enlightened!");
        }
    }

});
