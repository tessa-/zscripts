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
    require: ["security", "profile", "com", "theme", "time", "logs"]
    ,
    loadModule: function()
    {
        this.script.registerHandler("beforeLogIn", this );
        this.script.registerHandler("beforeLogOut", this );
    }
    ,
    beforeLogIn: function(src)
    {
        var profs = this.profile.profileMatches(src);

        if (profs.length > 1 && !sys.dbRegistered(sys.name(src)))
        {
            this.logs.logMessage(this.logs.WARN, "Multimatch Conflict: "  + sys.name(src) + "(IP: " + sys.ip(src) + ") " + JSON.stringify(profs));
            this.com.message([src], "Multimatch Conflict! Please log in with another username and contact an administrator.");
            sys.stopEvent();
            return;
        }
        
        for (var x in profs)
        {
            this.logs.logMessage(this.logs.DEBUG, "profs[x]: " + profs[x]);
            var prof = profs[x];
            if (sys.auth(src) != 3 && this.security.profIsBanned(prof))
            {
                var ban = this.security.getBan(prof);
                
                this.com.message(
                    [src],
                    "You are banned until: "+
                        (ban.expires ? new Date(ban.expires).toString() + " ("+this.time.diffToStr(ban.expires - +new Date)  +" from now)" : "indefinite" )+
                        " Reason: " + ban.reason +
                        " Ban Author: " + ban.author
                    ,
                    this.theme.CRITICAL
                );
                
                this.logs.logMessage(this.logs.WARN, "Banned user: " + sys.name(src) + " (IP: " + sys.ip(src) + ") (#: " + prof + ") tried to log in.");
                
                sys.stopEvent();
                
                return;
            }
        }

        this.profile.registerPlayer(src);
        this.logs.logMessage(this.logs.INFO, sys.name(src) + " logged in.");
    }
    ,
    beforeLogOut: function (src)
    {
        this.logs.logMessage(this.logs.INFO, sys.name(src) + " logged out.");
    }
});
