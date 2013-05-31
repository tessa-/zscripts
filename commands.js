({
    require: ["com"]
    ,
    commands_db: new Object;
    ,
    loadModule: function ()
    {
        
    }
    ,
    registerCommand: function (name, command)
    {
        if (name in commands_db)
        {
            script.log("WARN: Overwriting command " +name);
        }
        
        commands_db[name] = command;
    }

    issueCommand: function(src, cmd)
    {
        if (!(cmd in commands_db))
        {
            script.module;
        }
    }
    

});
