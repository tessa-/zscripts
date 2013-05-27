({
    require: ["sched", "io"]
    ,
    database: null
    ,
    quicksync: {}
    ,
    loadModule: function () 
    {
	var now = +new Date;

        this.database = script.module.io.read("security");
        var _this = this;
        function autosave ()
        {
            script.module.io.write("security", script.module.security.database);
        }
        sys.setTimer(autosave, 60000, true);

	if (!this.database.bans) this.database.bans = new Object;

	if (!this.database.ban_counter) this.database.ban_counter = 0;

        for (var x in this.database.bans)
        {
            if (this.database.bans[x].expires)
            {
		if (this.database.bans[x].expires >= now) this.invalidateBan(x);
                
		else
		{
		    script.module.sched.at(this.database.bans[x].expires, function () {
			if (script.module.security.database.bans[x].expires >= +(new Date) - 1) delete script.module.security.database.bans[x];
                    });
		}
            }
        }
    }
    ,
    unloadModule: function()
    {
        script.module.io.write("security", this.database);
    }
    ,
    registerBan: function (ban)
    {
	database.bans
    }
    
})
