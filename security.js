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
    userIsMuted: function (uid)
    {
	if (sys.auth(uid) == 3) return false;

        var p = script.module.profile.profileOpenCreate(uid);

        if (p in this.database.mutes) return true;

	return false;
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
    userIsBanned: function (uid)
    {
	if (sys.auth(uid) == 3) return false;

        var p = script.module.profile.profileOpenCreate(uid);

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
