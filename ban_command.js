({
    require: ["commands", "security", "profile", "text", "com", "theme"]
    ,
    unbanall:
    {
        desc: "Clears the ban list"
        ,
        perm: function (src) 
        {
            return sys.auth(src) >= 2;
        }
        ,
        code: function (src, cmd)
        {
            if (!(cmd.flags.force))
            {
                this.com.message([src], "Are you sure you want to do this? Retry with --force option.", this.theme.WARN);
                return;
            }
            
            this.com.broadcast(sys.name(src) + " has cleared the server's ban list.");

            this.security.database.bans = new Object;
        }
    }
    ,
    unban: 
    {
        desc: "Removes bans from users"
        ,
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
                var prof = this.profile.profileByName(cmd.args[x]);
                
                if (prof != -1) 
                {
                    profbanlst.push (prof);
                    profnamelst.push(cmd.args[x]);
                }
                else
                {
                    this.com.message([src], "Could not find user: " + cmd.args[x], this.theme.WARN);

                    if (!(cmd.flags.force || cmd.flags.f)) return;
                }
            }

            if (profbanlst.length == 0)
            {
                this.com.message([src], "No users to unban", this.theme.WARN);
                return;
            }

            this.com.broadcast(sys.name(src) + " has unbanned " + profnamelst.join(", ") + ".");

            for (var x in profbanlst)
            {
                this.security.removeBan(profbanlst[x]);
            }
        }
    }
    ,
    ban: 
    {
        desc: "Bans users from the server"
        ,
        options:
        {
            reason: "Specifies a reason for the ban"
        }
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
                var prof = this.profile.profileByName(cmd.args[x]);
                
                if (prof != -1) 
                {
                    profbanlst.push (prof);
                    profnamelst.push(cmd.args[x]);
                }
                else
                {
                    this.com.message([src], "Could not find user: " + cmd.args[x], this.theme.WARN);

                    if (!(cmd.flags.force || cmd.flags.f)) return;
                }
            }

            if (profbanlst.length == 0)
            {
                this.com.message([src], "No users to ban", this.theme.WARN);
                return;
            }

            this.com.broadcast(
                sys.name(src) + " has banned " + profnamelst.join(", ") +
                    (typeof cmd.flags.reason == "string" ? ". Reason: \"" + cmd.flags.reason + "\"" : "."),
                this.theme.CRITICAL
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
                this.security.setBan(profbanlst[x], o);
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
            var profile = this.profile;
            var banlist = this.security.database.bans;

            script.log(JSON.stringify(banlist));

            for (var x in banlist)
            {
                bans.push (
                    "<b>Ban on user:</b> " + profile.lastName(x) + "<br/>" +
                        "Expires: <i>" + (banlist[x].expires ? new Date(banlist[x].expires).toString():"indefinite") + "</i><br/>" +
                        "Reason: <i>" + this.text.escapeHTML(banlist[x].reason || "") + "</i><br/>" +
                        "Author: <i>"+ this.text.escapeHTML(banlist[x].author || "") + "</i>"
                );                                        
            }

            this.com.message([src], bans.join("<br/>"), this.theme.INFO, true);
        }

    }
    ,
    loadModule: function()
    {
        this.commands.registerCommand("ban", this);
        this.commands.registerCommand("unban", this);
        this.commands.registerCommand("banlist", this);
        this.commands.registerCommand("unbanall", this);
    }
});
