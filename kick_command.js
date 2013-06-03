({
    require: ["commands", "com", "theme"]
    ,
    kick: 
    {
        desc: "Kicks user(s) off the server"
        ,
        options:
        {
            "force": "Allows a root level administrator to kick users normally immune to kick."
            ,
            silent: "Does not display a message, can only be used by high level admins."
        }
        ,
        perm: function (src)
        {
            return sys.auth(src) >= 2;
        }
        ,
        code: function (src, cmd)
        {
            var kicklist = [];
            var kicknameslist = [];
            var sys_auth$src = sys.auth(src);

            for (var x in cmd.args)
            {
                var i = sys.id(cmd.args[x]);
                
                if (!i)
                {
                    this.com.message([src], "Cant find user: " + cmd.args[x], this.theme.WARN);
                    continue;
                }

                if (sys.auth(i) && !((sys_auth$src == 3 || i == src) && (cmd.flags.f || cmd.flags.force)))
                {
                    this.com.message([src], "Auth is immune to kick.", this.theme.WARN);
                    continue;
                }
                
                kicklist.push(i);
                kicknameslist.push(cmd.args[x]);
            }

            if (kicklist.length == 0) return;

            if (!cmd.flags.silent || sys_auth$src != 3) 
            {
                this.com.broadcast(sys.name(src) + " kicked " + kicknameslist.join(", ") + "!", this.theme.CRITICAL);
            }           

            for (var x in kicklist)
            {
                sys.kick(kicklist[x]);
            }
        }
    }
    ,
    loadModule: function ()
    {
        this.commands.registerCommand("kick", this);
    }
});
