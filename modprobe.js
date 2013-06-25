({
    require: ["commands", "logs", "com", "theme"]
    ,
    loadModule: function () 
    {
        this.commands.registerCommand("modprobe", this);
    }
    ,
    modprobe: 
    {
        desc: "Manages loadable modules"
        ,
        options :
        {
            "load": "Loads modules"
            ,
            "unload": "Unloads modules"
            ,
            "reload": "Reloads modules"
        }
        ,
        perm: function (src, cmd, chan)
        {
            sys.auth(src) == 3;
        }
        ,
        code: function (src, cmd, chan)
        {
            if (cmd.flags.load || cmd.flags.l)
            {
                if (cmd.flags.unload || cmd.flags.u || cmd.flags.reload || cmd.flags.r) throw new Error("Modprobe is confused.");

                for (var x in cmd.args)
                {
                    //  this.com.message([src], "Loading module " + 
                    script.loadModule(cmd.args[x]);
                }
                return;
            }


            if (cmd.flags.unload || cmd.flags.u)
            {
                if (cmd.flags.load || cmd.flags.l || cmd.flags.reload || cmd.flags.r) throw new Error("Modprobe is confused.");

                for (var x in cmd.args)
                {
                    script.unloadModule(cmd.args[x]);
                }
                return;
            }

            if (cmd.flags.reload || cmd.flags.r)
            {
                if (cmd.flags.unload || cmd.flags.u || cmd.flags.load || cmd.flags.l) throw new Error("Modprobe is confused.");

                for (var x in cmd.args)
                {
                    script.reloadModule(cmd.args[x]);
                }
                return;
            }

            this.com.message([src], "Loaded modules:", this.theme.INFO);
            for (var x in script.modules)
            {
                this.com.message([src], x, -1);
            }

        }
    }
});
