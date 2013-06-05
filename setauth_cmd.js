({

    setauth:
    {
        aliases: ["auth"]
        ,
        desc: "Set user auth level"
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
                if (!);
            }
        }
       
        
    }
