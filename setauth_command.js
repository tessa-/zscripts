({
    require: ["commands", "com", "theme"]
    ,
    setauth:
    {
        aliases: ["auth"]
        ,
        desc: "Set user auth level"
        ,
        options:
        {
            level: "What level to set the user to"
        }
        ,
        perm: function (src)
        {
            return sys.auth(src) == 3;
        }
        ,
        code: function (src, cmd, chan)
        {
            var levels = 
                {
                    "3":3, "owner":3, "root":3,
                    "2":2, "admin":2, "administrator":2,
                    "1":1, "mod":1, "moderator":1,
                    "0":0, "user": 0, "none":0
                };
            var level = null;


            if (cmd.flags.level.toLowerCase() in levels)
            {
                level = levels[cmd.flags.level.toLowerCase()];
            }

            else
            {
                this.com.message([src], "Unknown level", this.theme.WARN);
                return;
            }

            for (var x in cmd.args)
            {
                if (! sys.dbIp(cmd.args[x]))
                {
                    this.com.message([src], "User unknown", this.theme.WARN);
                    continue;
                }
                if (! sys.dbRegistered(cmd.args[x])) 
                {
                    this.com.message([src], "User unregistered", this.theme.WARN);
                    continue;
                }
                var i = sys.id(cmd.args[x]);

                if (i) 
                {
                     sys.changeAuth(i, level);
                }
                else
                {
                    sys.changeDbAuth(cmd.args[x], level);
                }

                this.com.broadcast(sys.name(src) " set " + cmd.args[x] + " to level " + level, this.theme.INFO);
            }
        }
    }
    ,
    loadModule: function()
    {
        this.commands.registerCommand("setauth", this);
    }
});
