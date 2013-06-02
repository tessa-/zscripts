({
    require: ["commands", "security"]
    ,
    unbanall:
    {
        perm: function (src) 
        {
            return sys.auth(src) >= 2;
        }
        ,
        code: function (src, cmd)
        {
            if (!(cmd.flags.force || cmd.flags.f))
            {
                script.module.com.message([src], "Are you sure you want to do this? Retry with --force | -f option.", script.module.theme.WARN);
                return;
            }
            
            script.module.com.broadcast(sys.name(src) + " has cleared the server's ban list.");

            script.module.security.database.bans = new Object;
        }
    }
    ,
    unban: 
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
                script.module.com.message([src], "No users to unban", script.module.theme.WARN);
                return;
            }

            script.module.com.broadcast(sys.name(src) + " has unbanned " + profnamelst.join(", ") + ".");

            for (var x in profbanlst)
            {
                script.module.security.removeBan(profbanlst[x]);
            }
        }
    }
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

            script.module.com.broadcast(
                sys.name(src) + " has banned " + profnamelst.join(", ") +
                    (typeof cmd.flags.reason == "string" ? ". Reason: \"" + cmd.flags.reason + "\"" : "."),
                script.module.theme.CRITICAL
            );

            for (var x in profbanlst)
            {
                script.log("hi");
                var o =  {
                    expires: false,
                    reason: cmd.flags.reason,
                    author: sys.name(src)
                };

                script.log(o.author);
                script.module.security.setBan(profbanlst[x], o);
            }  
        }
    }
    ,
    banlist: 
    {
        perm: function (src)
        {
            return sys.auth(src) >= 2;
        }
        ,
        code: function (src)
        {
            var bans = [];
            var profile = script.module.profile;
            var banlist = script.module.security.database.bans;

            script.log(JSON.stringify(banlist));

            for (var x in banlist)
            {
                bans.push (
                    "<b>Ban on user:</b> " + profile.lastName(x) + "<br/>" +
                        "Expires: <i>" + (banlist[x].expires ? new Date(banlist[x].expires).toString():"indefinite") + "</i><br/>" +
                        "Reason: <i>" + script.module.text.escapeHTML(banlist[x].reason || "") + "</i><br/>" +
                        "Author: <i>"+ script.module.text.escapeHTML(banlist[x].author || "") + "</i>"
                );                                        
            }

            script.module.com.message([src], bans.join("<br/>"), script.module.theme.INFO, true);
        }

    }
    ,
    loadModule: function()
    {
        script.module.commands.registerCommand("ban", this.ban);
        script.module.commands.registerCommand("unban", this.unban);
        script.module.commands.registerCommand("banlist", this.banlist);
        script.module.commands.registerCommand("unbanall", this.unbanall);
    }
});
