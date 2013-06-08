({

    require: ["com", "commands", "theme"]
    ,
    eval:
    {
        aliases: ["evil"]
        ,
        perm: function ()
        {
            return false;
        }
        ,
        code: function (src, cmd, chan)
        {
            try 
            {
                this.com.message([src], JSON.stringify(eval(cmd.input)), this.theme.INFO);
            } 
            catch (e)
            {
                this.com.message([src], e.toString(), this.theme.CRITICAL);
            }
        }
    }
    ,
    loadModule: function ()
    {
        this.commands.registerCommand("eval", this);
    }
});
