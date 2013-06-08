({
    
    require: ["io", "profile"]
    ,
    database: null
    ,
    times: new Object
    ,
    loadModule: function ()
    {
        this.database = this.io.read("reputation");

        if (!this.database.users) this.database.users = new Object;
        
        script.registerHandler("afterLogIn", this);
        script.registerHandler("beforeLogOut", this);

        var u = sys.playerIds();

        for (var x in u)
        {
            this.afterLogIn(u[x]);
        }
    }
    ,
    unloadModule: function()
    {
        var u = sys.playerIds();

        for (var x in u)
        {
            this.beforeLogOut(u[x]);
        }

        this.io.write("reputation", this.database);
    }
    ,
    updateReputation: function (src)
    {
        var now = +new Date;
        var p = sys.name(src).toLowerCase();
        
        if (!this.database.users[p]) this.database.users[p] = 0;
        
        if (!this.times[p]) this.times[p] = now;
        else 
        {           
            var diff = now - this.times[p];
            var minutes =  ~~(diff / 1000 / 60);
            this.database.users[p] += minutes;

            this.times[p] = now;
        }
        

    }
    ,
    afterLogIn: function (src)
    {
        this.updateReputation(src);        
    }
    ,
    beforeLogOut: function (src)
    {
        var p = sys.name(src).toLowerCase();
        this.updateReputation(src);
        delete this.times[p];
    }
});


