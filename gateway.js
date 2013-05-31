({
    require: ["security", "profile","com", "parsecommand"]
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
        script.log(script.module.profile.profileOpenCreate(src));
        script.module.com.broadcast("Hello " + sys.name(src) +"! You use " + sys.os(src) +  " eh? Commands don't work yet, don't complain the scripts are new!" );
    }

});
