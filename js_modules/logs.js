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
    require: ["com", "theme", "text", "util"]
    ,
    logs: []
    ,
    DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3, CRITICAL: 4
    ,
    logMessage: function (level,msg)
    {
        
        if (level != 0) print("logmsg lv" + level + ": " +msg);
        this.logs.push([level, msg]);
        if (level >= 2)
        {
            var auths = [];
            sys.playerIds().forEach(function(i) { if (sys.auth(i) >= 2) auths.push(i); });

            this.com.message(auths, msg, this.theme.CRITICAL);
        } 
        else if (level == 1)
        {
            var auths = [];
            sys.playerIds().forEach(function(i) { if (sys.auth(i) == 3) auths.push(i); });

            this.com.message(auths, msg, this.theme.INFO);   
        }
        
        try 
        {
            sys.append("logs.txt", JSON.stringify([level, msg, (new Date).toString()]) + "\n");
        } catch (_) {}
    }
    ,
    loadModule: function ()
    {
        this.savedLogFunction = script.log;
        script.log = this.util.bind(
            this
            ,
            function(msg)
            {
                this.logMessage(this.INFO, msg);
            }
        );
    }
    ,
    unloadModule: function ()
    {
        script.log = this.savedLogFunction;
    }
});
