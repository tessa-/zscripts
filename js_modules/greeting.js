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
    require: ["com", "theme", "help_command", "uptime"]
    ,
    loadModule: function ()
    {
        this.script.registerHandler("afterLogIn", this);
    }
    ,
    afterLogIn: function (src, msg, chan)
    {
        var os = sys.os(src);
        this.com.broadcast("Hello " + sys.name(src) +"! Script uptime is " + this.uptime.uptime() + "!", this.theme.INFO );


        this.com.message([src], "If you need help, type /help , also note it's \"/commands --all\" not \"/commands all\"", this.theme.INFO);
        
        if (os === "linux")
        {
            this.com.broadcast(sys.name(src) +", I see you are a linux user! You are enlightened!");
        }

        
    }
});
