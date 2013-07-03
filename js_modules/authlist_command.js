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

    require:
    [
        "commands"
        ,
        "com"
        ,
        "theme"
        ,
        "text"
    ]
    ,
    loadModule: function ()
    {
        this.commands.registerCommand("authlist", this);
    }
    ,
    authlist: 
    {
        desc: "Lists the auth on the server."
        ,
        aliases: ["auths"]
        ,
        perm: function () { return true; }
        ,
        code: function (src) 
        {
            this.com.message([src], "Authlist:", this.theme.INFO);
            var auths = sys.dbAuths();
            
            for (var x in auths)
            {
                this.com.message([src], "<b>" + ([null, "Moderator", "Admin", "Owner"][sys.dbAuth(auths[x])] || "?") + "</b> " + this.text.escapeHTML(auths[x]) +
                                 (sys.id(auths[x])?" <span style='color:green'>online</span>":" <span style='color:red'>offline</span>"), this.theme.RAW, true);                
            }
        }    
    }   
});
