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
    require: ["commands", "com", "theme"]
    ,
    setauth:
    {
        aliases: ["auth"]
        ,
        desc: "Set user auth level"
        ,
        options:
        {
            level: "What level to set the user to"
        }
        ,
        perm: function (src)
        {
            return sys.auth(src) == 3;
        }
        ,
        code: function (src, cmd, chan)
        {
            var levels = 
                {
                    "3":3, "owner":3, "root":3,
                    "2":2, "admin":2, "administrator":2,
                    "1":1, "mod":1, "moderator":1,
                    "0":0, "user": 0, "none":0
                };
            var level = null;


            if (cmd.flags.level.toLowerCase() in levels)
            {
                level = levels[cmd.flags.level.toLowerCase()];
            }

            else
            {
                this.com.message([src], "Unknown level", this.theme.WARN);
                return;
            }

            for (var x in cmd.args)
            {
                if (! sys.dbIp(cmd.args[x]))
                {
                    this.com.message([src], "User unknown", this.theme.WARN);
                    continue;
                }
                if (! sys.dbRegistered(cmd.args[x])) 
                {
                    this.com.message([src], "User unregistered", this.theme.WARN);
                    continue;
                }
                var i = sys.id(cmd.args[x]);

                if (i) 
                {
                     sys.changeAuth(i, level);
                }
                else
                {
                    sys.changeDbAuth(cmd.args[x], level);
                }

                this.com.broadcast(sys.name(src) + " set " + cmd.args[x] + " to level " + level, this.theme.INFO);
            }
        }
    }
    ,
    loadModule: function()
    {
        this.commands.registerCommand("setauth", this);
    }
});
