({
    require: ["com", "theme", "parsecommand"]
    ,
    commands_db: new Object
    ,
    loadModule: function ()
    {
        
    }
    ,
    registerCommand: function (name, command)
    {
        if (name in this.commands_db)
        {
            script.log("WARN: Overwriting command " +name);
        }
        
        this.commands_db[name] = command;
    }
    ,
    issueCommand: function(src, text, chan)
    {
        var cmd = script.module.parsecommand.parseCommand(text);
        
        if (!(cmd.name in this.commands_db))
        {
            script.module.com.message([src], "Command does not exist.", script.module.theme.WARN);
            return;
        }

        if (sys.auth(src) != 3 && !(this.commands_db[cmd.name].perm(src)))
        {
            script.module.com.message([src], "Permission denied.", script.module.theme.WARN);
            return;
        }

        try 
        {
            this.commands_db[cmd.name].code(src, cmd);
        }
        catch (e)
        {
            script.module.com.message([src], e.toString() + ":" + e.lineNumber, script.module.theme.CRITICAL)
            script.module.com.broadcast("Script Error, check logs.", script.module.theme.CRITICAL);
            script.log(e.toString() + ":" + e.lineNumber);
        }
    }
});
