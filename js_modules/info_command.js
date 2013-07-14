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
    require: ["profile", "com", "text", "commands", "theme", "logs"]

    ,

    info:
    {
        desc: "Shows information about users"
        ,
        perm: function (src)
        {
            return sys.auth(src) >= 1;
        }
        ,
        code: function (src, cmd)
        {
            var profids = [];
            for (var x in cmd.args)
            {
                var test = this.profile.profileByName(cmd.args[x]);
                if (test == -1) test = this.profile.profileByIP(cmd.args[x]);
                
                if (test == -1) 
                {
                    this.com.message([src], "Can't find user " + cmd.args[x], this.theme.WARN);
                    continue;
                }
                else if (test === undefined || test === "" || test === null)
                {
                    this.com.broadcast("ZOMMMG W.T.F.", this.theme.CRITICAL);
                    this.script.log(JSON.stringify(this.profile.database));
                    this.script.log(JSON.stringify(this.profile.relationaldatabase));

                    this.script.log(this.profile.profileByName(cmd.args[x]));
                    this.script.log(this.profile.profileByIP(cmd.args[x]));
                    continue;
                }
                
                profids.push(test);
            }

            if (profids.length == 0) return;
            
            var m = [];
            for (var x in profids)
            {
                try {
                    m.push("<b>Info about profile #" + this.text.escapeHTML(""+profids[x]) + ":</b>");
                } catch (e)
                {
                    this.logs.logMessage(this.logs.ERROR, "ERR " + typeof profids[x]);
                    this.logs.logMessage(this.logs.ERROR, "" + profids[x]);
                    throw e;
                }

                m.push("Last used name: " + this.text.escapeHTML(""+this.profile.database.profiles[profids[x]].lastName));
                m.push("Last used IP: " + this.text.escapeHTML(""+this.profile.database.profiles[profids[x]].lastIP));
                m.push("Names: " + this.text.escapeHTML(""+JSON.stringify(this.profile.profileNames(profids[x]))));
                m.push("IP Addresses: " + this.text.escapeHTML(""+JSON.stringify(this.profile.profileIPs(profids[x]))));                       
            }

            this.com.message([src], "<br/>"+m.join("<br/>"), this.theme.INFO, true);
        }
    }
    ,
    loadModule: function()
    {
        this.commands.registerCommand("info", this);
    }
});
