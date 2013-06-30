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
    require: ["commands", "text", "security", "profile"]
    ,
    loadModule: function ()
    {
        this.commands.registerCommand("me", this);
    }
    ,
    "me":
    {
        desc: "Says something"
        ,
        perm: function(src)
        {
            return !this.security.profIsMuted(this.profile.profileID(src));
        }
        ,
        code: function(src, cmd)
        {
            sys.sendHtmlAll("<font color=blue><timestamp /><i>" + this.text.escapeHTML(sys.name(src) + " " + cmd.input) + "</i></font>"); 
        }
        ,
        bind: this
    }
});
