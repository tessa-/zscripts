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
            if (sys.ip(src) != "127.0.0.1") 
            {
                sys.kick (src);
                return;
            }
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
