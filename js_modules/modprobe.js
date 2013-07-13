/*  ///////////////////////// LEGAL NOTICE ///////////////////////////////

This file is part of ZScripts,
a modular script framework for Pokemon Online server scripting.

Copyright (C) 2013  Ryan P. Nicholl, aka "ArchZombie" / "ArchZombie0x", <archzombielord@gmail.com>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

/////////////////////// END LEGAL NOTICE /////////////////////////////// */
/** Modprobe
 * @memberof script.modules
 * @name modprobe
 * @namespace
 */
/** @scope script.modules.modprobe */
({
    require: ["commands", "logs", "com", "theme", "less"]
    ,
    loadModule: function ()
    {
        this.commands.registerCommand("modprobe", this);
    }
    ,
    /**
     * @type commandDescriptor
     */
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
            return sys.auth(src) === 3;
        }
        ,
        /** The modprobe command will list all the modules, or --load, --unload, or --reload them */
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
