({
    require: ["sched", "io", "profile", "com"]
    ,
    database: null
    ,
    quicksync: {}
    ,
    loadModule: function () 
    {
        this.database = this.io.read("security");

        if (!this.database.bans) this.database.bans = new Object;

        if (!this.database.mutes) this.database.mutes = new Object;

        for (var x in this.database.bans)
        {
            var ban = this.database.bans[x];
            var _this = this;
            if (ban.expires)
            {
                this.sched.at(ban.expires, function () { _this.checkBan(x); });
            }
        }
    }
    ,
    checkUsers: function (src)
    {
        var uids = sys.playerIds();

        for (var x in uids)
        {
            this.checkUser(uids[x]);
        }
    }
    ,
    checkUser: function (src)
    {
        var p = this.profile.profileOpenCreate(src);

        if (sys.auth(src) != 3 && this.profIsBanned(p))
        {
            sys.kick(src);
        }
    }
    ,
    unloadModule: function()
    {
        this.io.write("security", this.database);
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
        var _this = this;
        if (ban.expires)
        {
            this.sched.at(ban.expires, function () { _this.checkBan(profid); });
        }
    }  
    ,
    removeBan: function(profid)
    {
        delete this.database.bans[profid];
    }
    ,
    checkBan: function (profid)
    {
        var ban = this.database.bans[profid];

        if (!ban) return;

        if (ban.expires && ban.expires <= +new Date)
        {
            this.com.broadcast("Ban on " + this.profile.lastName(profid) + " (#: "+profid+") expired.");
            delete this.database.bans[profid];
        }
    }
})
