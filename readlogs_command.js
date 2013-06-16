({
    require: ["com", "theme", "logs", "commands"]
    ,
    readlogs:
    {
        perm: function (src)
        {
            return sys.auth(src) >= 3;
        }
        ,
        code: function (src, cmd, chan)
        {
            for (var x in this.logs.logs)
            {
                this.com.message([src], "LV" + this.logs.logs[x][0]+" "+this.logs.logs[x][1], this.theme.INFO);
            }
        }
    }
    ,
    loadModule: function ()
    {
        this.commands.registerCommand("readlogs", this);
    }
});
