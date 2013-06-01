({
    require: ["com"]
    ,
    loadModule: function ()
    {
	script.registerHandler("afterLogIn", this.afterLogIn);
    }
    ,
    afterLogIn: function (src, msg, chan)
    {
	var os = sys.os(src);
	script.module.com.broadcast("Hello " + sys.name(src) +"! Commands don't work yet, don't complain the scripts are new!" );
	
	if (os === "linux")
	{
            script.module.com.broadcast(sys.name(src) +", I see you are a linux user! You are enlightened!");
	}
    }
});