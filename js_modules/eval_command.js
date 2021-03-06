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

    require: ["com", "commands", "theme", "util", "less"]
    ,
    eval:
    {
        desc: "Executes code on the server"
        ,
        perm: function (src)
        {
            return sys.auth(src) == 3;
        }
        ,
        code: function (src, cmd, chan)
        {
            try 
            {
                this.less.less(src, this.util.inspect(eval(cmd.input), true), false);
            } 
            catch (e)
            {
                this.com.message([src], e.toString(), this.theme.CRITICAL);
                this.com.message([src], e.backtracetext, -1);
            }
        }
    }
    ,
    loadModule: function ()
    {
        this.commands.registerCommand("eval", this);
    }
});
