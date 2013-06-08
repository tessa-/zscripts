({
    require: ["sched", "io", "profile", "com"]
    ,
    database: null
    ,
    loadModule: function () 
    {
        this.database = this.io.read("security");

        if (!this.database.bans) this.database.bans = new Object;

        if (!this.database.mutes) this.database.mutes = new Object;

        var _this = this;

        for (var x in this.database.bans)
        {
            var b = this.profile.trace(x);

            // todo merge bans properly
            if (b != x)
            {
                this.database.bans[b] = this.database.bans[b] || this.database.bans[x];
            }
            var ban = this.database.bans[x];
         
            if (ban.expires)
            {
                (function(x, _this) {
                    _this.sched.at(ban.expires, function () { _this.checkBan(x); });
                })(x, this);
            }
        }

        for (var x in this.database.mutes)
        {
            var mute = this.database.mutes[x];
            var b = this.profile.trace(x);
            if (b != x)
            {
                this.database.mutes[b] = this.database.mutes[b] || this.database.mutes[x];
            }
         
            if (mute.expires)
            {
                (function(x, _this) {
                    _this.sched.at(mute.expires, function () { _this.checkMute(x); });
                })(x, this);
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
        var p = this.profile.profileID(src);

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
    getMute: function (profid)
    {
        return this.database.mutes[profid];
    }
    ,
    setMute: function (profid, mute)
    {
        this.database.mutes[profid] = mute;

        var _this = this;
        if (mute.expires)
        {
            this.sched.at(mute.expires, function () { _this.checkMute(profid); });
        }
    }
    ,

    checkMute: function (profid)
    {
        var mute = this.database.mutes[profid];

        if (!mute) return;

        if (mute.expires && mute.expires <= +new Date)
        {
            this.com.broadcast("Mute on " + this.profile.lastName(profid) + " (#: "+profid+") expired.");
            delete this.database.mutes[profid];
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
    getBan: function (profid)
    {
        return this.database.bans[profid];
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
