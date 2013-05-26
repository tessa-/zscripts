({
    database: null
    ,
    loadModule: function () 
    {
        this.database = script.module.io.read("security");
        var _this = this;
        function autosave ()
        {
            script.module.io.write("security", _this.database);
        }
        sys.setTimer(autosave, 60000, true);

        for (var x in this.database.ipbans)
        {
            if (this.database.ipbans[x].expires)
            {
                script.module.sched.at(this.database.ipbans[x].expires, function () {
                    if (_this.database.ipbans[x].expires >= +(new Date) - 1) delete _this.database.ipbans[x].expires;
                });
            }
        }
    }
    ,
    unloadModule: function()
    {
        script.module.io.write("security", this.database);
    }
    ,
    isBanned: function (uid)
    {
        if (sys.ip(uid) in this.database.ipbans) return true;

        else if (sys.name(uid).toLowerCase() in this.database.namebans) return true;

        return false;
    }
    ,
    banIP: function (ipaddr, until)
    {
        var o = new Object;

        if (until) o.expires = until;

        script.module.sched.at(tuilfunction () {
                    if (_this.database.ipbans[x].expires >= +(new Date) - 1) delete _this.database.ipbans[x].expires;
                }
        this.database.ipbans[ipaddr] = o;
    }
    
})
