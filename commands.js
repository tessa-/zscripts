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
        var cmd = this.parsecommand.parseCommand(text);
        
        if (!(cmd.name in this.commands_db))
        {
            this.com.message([src], "Command does not exist.", this.theme.WARN);
            return;
        }

        if (sys.auth(src) != 3 && !(this.commands_db[cmd.name].perm(src)))
        {
            this.com.message([src], "Permission denied.", this.theme.WARN);
            return;
        }

        try 
        {
            this.commands_db[cmd.name].code(src, cmd);
        }
        catch (e)
        {
            this.com.message([src], e.toString() + ":" + e.lineNumber, this.theme.CRITICAL)
            this.com.broadcast("Script Error, check logs.", this.theme.CRITICAL);
            script.log(e.toString() + ":" + e.lineNumber);
        }
    }
});
