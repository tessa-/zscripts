({
    require: ["com", "theme", "parsecommand"]
    ,
    commands_db: new Object
    ,
    loadModule: function ()
    {
        
    }
    ,
    registerCommand: function (name, object)
    {
        if (name in this.commands_db)
        {
            script.log("WARN: Overwriting command " +name);
        }
        
        this.commands_db[name] = object[name];
        this.commands_db[name].bind = object;

        return;
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

        if (sys.auth(src) != 3 && !(cmd_obj.perm.apply(cmd_obj.bind, [src])))
        {
            this.com.message([src], "Permission denied.", this.theme.WARN);
            return;
        }

        try 
        {
            cmd_obj.code.apply(cmd_obj.bind, [src, cmd])
        }
        catch (e)
        {
            this.com.message([src], e.toString() + ":" + e.lineNumber, this.theme.CRITICAL)
            this.com.broadcast("Script Error, check logs.", this.theme.CRITICAL);
            script.log(e.toString() + ":" + e.lineNumber);
        }
    }
});
