({
    require: ["sched", "io"]
    ,
    database: null
    ,
    quicksync: {}
    ,
    loadModule: function () 
    {
        this.database = script.module.io.read("security");
    }
    ,
    unloadModule: function()
    {
        script.module.io.write("security", this.database);
    }
    ,
    registerBan: function (ban)
    {
    }
    
})
