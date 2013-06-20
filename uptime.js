({
    start: null
    ,
    require: ["time"]
    ,
    loadModule: function ()
    {
        this.start = + new Date;
    }
    ,
    unloadModule: function()
    {
        
    }
    ,
    uptimeRaw: function ()
    {
        return (+new Date)-this.start;
    }
    ,
    uptime: function ()
    {
        return this.time.diffToStr((+new Date)-this.start);
    }
});
