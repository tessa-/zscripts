({
    require: ["commands"]
    ,
    ban: 
    {
        perm: function (src) 
        {
            return sys.auth(src) >= 2;
        }
        ,
        code: function (src, cmd, chan)
        {
            var b = new Object;
            
            var profbanlst = [];
            var profnamelst = [];

            for (var x in cmd.args)
            {
                var prof = script.module.profile.profileByName(cmd.args[x]);
                
                if (prof != -1) 
                {
                    profbanlst.push (prof);
                    profnamelst.push(cmd.args[x]);
                }
                else
                {
                    script.module.com.message([src], "Could not find user: " + cmd.args[x], script.module.theme.WARN);

                    if (!(cmd.flags.force || cmd.flags.f)) return;
                }
            }

            if (profbanlst.length == 0)
            {
                script.module.com.message([src], "No users to ban", script.module.theme.WARN);
                return;
            }

            script.module.com.broadcast(sys.name(src) + " has banned " + profnamelst.join(", ") + (typeof cmd.flags.reason == "string" ? ". Reason: \"" + cmd.flags.reason + "\"" : "."), script.module.theme.CRITICAL);

            for (var x in profbanlst)
            {
                script.module.security.setBan(profbanlst[x], false, cmd.args.reason);
                //                script.module.security.checkUsers();
            }  

        }
    }
    ,
    loadModule: function()
    {
        script.module.commands.registerCommand("ban", this.ban);
    }
});
