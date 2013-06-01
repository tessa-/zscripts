({
    require: ["sched", "io", "profile"]
    ,
    database: null
    ,
    quicksync: {}
    ,
    loadModule: function () 
    {
        this.database = script.module.io.read("security");

        if (!this.database.bans) this.database.bans = new Object;

        if (!this.database.mutes) this.database.mutes = new Object;
    }
    ,
    unloadModule: function()
    {
        script.module.io.write("security", this.database);
    }
    ,
    profIsMuted: function (p)
    {
        if (p in this.database.mutes) return true;

	return false;
    } 
    ,
    getBan: function (profid)
    {
	return this.database.bans[profid];
    }
    ,
    getMute: function (profid)
    {
	return this.database.mutes[profid];
    }
    ,
    setMute: function (profid, time, reason)
    {
	this.database.mutes[profid] = 
	    {
		reason: reason
		,
		expires: (time ? time + +new Date : false)
	    }
    }
    ,
    removeMute: function (profid)
    {
	delete this.database.mutes[profid];
    }
    ,
    profIsBanned: function (p)
    {
        if (p in this.database.bans) return true;

	return false;
    } 
    ,
    setBan: function (profid, time, reason)
    {
	this.database.bans[profid] = 
	    {
		reason: reason
		,
		expires: (time ? time + +new Date : false)
	    }
    }  
    ,
    removeBan: function(profid)
    {
	delete this.database.bans[profid];
    }
})
