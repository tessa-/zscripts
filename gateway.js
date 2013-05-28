({
    require: ["security", "profile"]
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
        script.broadcast("hello " + sys.name(src) +"~! You are #" + script.module.profile.getProfileID(src));
    }

});
