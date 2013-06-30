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
({
    require: ["commands", "com","text", "theme", "less"]
    ,
    cmdlist: 
    {
        aliases: ["commands", "commandlist"]
        ,
        desc: "Lists the commands available to the user."
        ,
        options:
        {
            "all": "Also lists commands the user doesn't have permission to use"
        }
        ,
        perm: function ()
        {
            return true;
        }
        ,
        code: function (src, cmd)
        {
            var cmds = this.commands.commands_db;
            var com = this.com;
            var text = this.text;
            var msg = [];
            var sys_auth$src = sys.auth(src);

            for (var x in cmds)
            {

                if (cmds[x].name != x) continue;
                var canuse = sys_auth$src == 3 || cmds[x].perm.apply(cmds[x].bind, [src]);
                if (!cmd.flags.all && sys_auth$src != 3 && !canuse) continue;

                msg.push("<b>/" + text.escapeHTML(x) +"</b>" + (canuse?"":" (NO PERMISSION)") + (cmds[x].desc?" "+cmds[x].desc:"") );

                if (cmds[x].options)
                {
                   // msg.push("Options:");
                    var options = cmds[x].options;

                    for (var x2 in options)
                    {
                        msg.push("&nbsp;&nbsp;&nbsp;&nbsp;--" + text.escapeHTML(x2) + "&nbsp;&nbsp;&nbsp;&nbsp;" + text.escapeHTML(options[x2]));
                    }
                }
            }
            
            com.message([src], "Commands list:", this.theme.INFO, true);
            this.less.less(src, msg.join("<br />"), true);
        }
    }
    ,
    loadModule: function ()
    {
        this.commands.registerCommand("cmdlist", this);
    }
});
