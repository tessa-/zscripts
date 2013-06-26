({
    require: ["commands", "logs", "com", "theme", "less"]
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

            if (cmd.args.length == 0)
            {
                this.com.message([src], "Loaded modules:", this.theme.INFO);
                var modlist = [];
                for (var x in script.modules)
                {
                    modlist.push(x);
                }

                this.less.less(src, modlist.join("\n"), false);
                return;
            }
            
            var str = [];

            for (var x in cmd.args)
            {
                
                var test = script.modules[cmd.args[x]];
                
                str.push("<b>Module " + cmd.args[x] + ":</b>");
                if (!test) 
                {
                    str.push("Module not loaded.");
                    continue;
                }
                
                str.push("Requires: " + script.modules[cmd.args[x]].require.join(", "));
                str.push("Required by: " + script.modules[cmd.args[x]].submodules.join(", "));
                str.push("Contains: " + Object.keys(script.modules[cmd.args[x]]).join (", "));
                               
            }
            this.less.less(src, str.join("<br/>"), true);
            


        }
    }
});
