({
    require: ["sched", "io"]
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
    userIsBanned: function (uid)
    {
        var p = script.module.profile.userProfile(uid);

        if (p in this.database.bans) return true;
    } 
})
