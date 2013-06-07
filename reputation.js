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
        this.io.write("reputation", this.database);

        var u = sys.playerIds();

        for (var x in u)
        {
            this.beforeLogOut(u[x]);
        }
    }
    ,
    afterLogIn: function (src)
    {

        var p = this.profile.profileOpenCreate(src);
        this.times[p] = +new Date;

        if (!this.database.users[p]) this.database.users[p] = 0;
    }
    ,
    beforeLogOut: function (src)
    {
        var p = this.profile.profileOpenCreate(src);
       
        var diff = +new Date - (this.times[p] || +new Date);

        var minutes = (diff / 1000 / 60) | 0;

        if (!this.database.users[p]) this.database.users[p] = 0;

        this.database.users[p] += minutes;
    }
});


