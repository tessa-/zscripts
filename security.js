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
    setMute: function (profid, mute)
    {
        this.database.mutes[profid] = mute
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
    setBan: function (profid, ban)
    {
        this.database.bans[profid] = ban;
    }  
    ,
    removeBan: function(profid)
    {
        delete this.database.bans[profid];
    }
})
