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
