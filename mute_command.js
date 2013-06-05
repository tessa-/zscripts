({
    require: ["commands", "security", "profile", "text", "com", "theme", "time"]
    ,
    unmuteall:
    {
        desc: "Clears the mute list"
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
            
            this.com.broadcast(sys.name(src) + " has cleared the server's mute list.");

            this.security.database.mutes = new Object;
        }
    }
    ,
    unmute: 
    {
        desc: "Removes mutes from users"
        ,
        perm: function (src) 
        {
            return sys.auth(src) >= 1;
        } 

        ,
        code: function (src, cmd, chan)
        {
            var b = new Object;
            
            var profmutelst = [];
            var profnamelst = [];

            for (var x in cmd.args)
            {
                var prof = this.profile.profileByName(cmd.args[x]);
                
                if (prof != -1) 
                {
                    profmutelst.push (prof);
                    profnamelst.push(cmd.args[x]);
                }
                else
                {
                    this.com.message([src], "Could not find user: " + cmd.args[x], this.theme.WARN);

                    if (!(cmd.flags.force || cmd.flags.f)) return;
                }
            }

            if (profmutelst.length == 0)
            {
                this.com.message([src], "No users to unmute", this.theme.WARN);
                return;
            }

            this.com.broadcast(sys.name(src) + " has unmuted " + profnamelst.join(", ") + ".");

            for (var x in profmutelst)
            {
                this.security.removeBan(profmutelst[x]);
            }
        }
    }
    ,
    mute: 
    {
        desc: "Mute users"
        ,
        options:
        {
            reason: "Specifies a reason for the mute"
        }
        ,
        perm: function (src) 
        {
            return sys.auth(src) >= 2;
        }
        ,
        code: function (src, cmd, chan)
        {
            var b = new Object;
            
            var profmutelst = [];
            var profnamelst = [];

            for (var x in cmd.args)
            {
                var prof = this.profile.profileByName(cmd.args[x]);
                
                if (prof != -1) 
                {
                    profmutelst.push (prof);
                    profnamelst.push(cmd.args[x]);
                }
                else
                {
                    this.com.message([src], "Could not find user: " + cmd.args[x], this.theme.WARN);

                    if (!(cmd.flags.force || cmd.flags.f)) return;
                }
            }

            if (profmutelst.length == 0)
            {
                this.com.message([src], "No users to mute", this.theme.WARN);
                return;
            }

            var exp = false;
            var t = null;

            if (cmd.flags.time)
            {
                t = this.time.strToDiff(cmd.flags.time);

                if (t) exp = t + +new Date;
            }

            this.com.broadcast(
                sys.name(src) + " has muted " + profnamelst.join(", ") + "!" +
                    (typeof cmd.flags.reason == "string" ? " Reason: \"" + cmd.flags.reason + "\"" : "")+
                    (t ? " Duration: " + this.time.diffToStr(t) + "" : "")
                ,
                this.theme.CRITICAL
            );

            

            for (var x in profmutelst)
            {
                script.log("hi");
                var o =  {
                    expires: exp,
                    reason: cmd.flags.reason,
                    author: sys.name(src)
                };

                this.security.setMute(profmutelst[x], o);
            } 
        }
    }
    ,
    mutelist: 
    {
        perm: function (src)
        {
            return sys.auth(src) >= 2;
        }
        ,
        code: function (src)
        {
            var mutes = [];
            var profile = this.profile;
            var mutelist = this.security.database.mutes;

            for (var x in mutelist)
            {
                mutes.push (
                    "<b>Mute on user:</b> " + profile.lastName(x) + "<br/>" +
                        "Expires: <i>" + (mutelist[x].expires ? new Date(mutelist[x].expires).toString():"indefinite") + "</i><br/>" +
                        "Reason: <i>" + this.text.escapeHTML(mutelist[x].reason || "") + "</i><br/>" +
                        "Author: <i>"+ this.text.escapeHTML(mutelist[x].author || "") + "</i>"
                );                                        
            }

            this.com.message([src], "Mute list:<br/>" + mutes.join("<br/>"), this.theme.INFO, true);
        }

    }
    ,
    loadModule: function()
    {
        this.commands.registerCommand("mute", this);
        this.commands.registerCommand("unmute", this);
        this.commands.registerCommand("mutelist", this);
        this.commands.registerCommand("unmuteall", this);
    }
});
