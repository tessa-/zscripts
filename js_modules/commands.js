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
    require: ["com", "theme", "parsecommand", "util", "logs", "io"]
    ,
    commands_db: new Object
    ,
    loadModule: function ()
    {
        
    }
    ,
    registerCommand: function (name, object, prop)
    {
        if (name in this.commands_db)
        {
            script.log("WARN: Overwriting command " +name);
        }

        var comnd = object[prop || name];
        comnd.bind = object;
        comnd.name = name;

        var cfg = this.io.readConfig(name + "_command", {specialUsers:{}});

        this.commands_db[name] = object[prop || name];
        this.commands_db[name].config = cfg;

        if (comnd.aliases) for (var x in comnd.aliases)
        {
            this.commands_db[comnd.aliases[x]] = comnd;
        }
        
        object.onUnloadModule( this.util.bind(
            this, 
            function () 
            {
                this.unregisterCommand(name);
            }
        ));
        return;
    }
    ,
    unregisterCommand: function (name)
    {
        if (this.commands_db[name])
        {
            if (this.commands_db[name].aliases) for (var x in this.commands_db[name].aliases)
            {
                delete this.commands_db[this.commands_db[name].aliases[x]];
            }
        }
        delete this.commands_db[name];
    }
    ,
    issueCommand: function(src, text, chan)
    {
        var cmd = this.parsecommand.parseCommand(text);

        var cmd_obj = this.commands_db[cmd.name];
        
        if (!cmd_obj)
        {
            this.com.message([src], "Command does not exist.", this.theme.WARN);
            return;
        }

        if (sys.auth(src) != 3 && !(cmd_obj.perm.apply(cmd_obj.bind, [src, cmd, chan])) && !(cmd_obj.config.specialUsers[sys.name(src).toLowerCase()]))
        {
            this.com.message([src], "Permission denied.", this.theme.WARN);
            return;
        }

        try 
        {
            cmd_obj.code.apply(cmd_obj.bind, [src, cmd, chan]);
        }
        catch (e)
        {
            this.logs.logMessage(this.logs.WARN, "Caught error in " + e.fileName + " at line #" + e.lineNumber + ": " + e.toString() + "\n" + e.backtracetext);
            this.com.broadcast("Script Error, check logs.", this.theme.CRITICAL);
        }
    }
});
