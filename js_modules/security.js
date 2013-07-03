/*  ///////////////////////// LEGAL NOTICE ///////////////////////////////

This file is part of ZScripts,
a modular script framework for Pokemon Online server scripting.

Copyright (C) 2013  Ryan P. Nicholl, aka "ArchZombie" / "ArchZombie0x", <archzombielord@gmail.com>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

/////////////////////// END LEGAL NOTICE /////////////////////////////// */
({
    require: ["sched", "io", "profile", "com"]
    ,
    database: null
    ,
    loadModule: function () 
    {
        this.database = this.io.openDB("security");

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
    unloadModule: function()
    {
        this.io.closeDB("security");
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

        this.io.markDB("security");
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

        this.io.markDB("security");
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

        this.io.markDB("security");
    }  
    ,
    removeBan: function(profid)
    {
        delete this.database.bans[profid];

        this.io.markDB("security");
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
