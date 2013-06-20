({

    require: ["commands", "reputation", "theme", "com"]
    ,
    loadModule: function ()
    {
        this.commands.registerCommand("votekick", this);
        this.commands.registerCommand("yes", this);
        this.commands.registerCommand("no", this);
        this.commands.registerCommand("endvote", this);
    }
    ,
    votedb: null
    ,
    votekicktarget: null
    ,
    /*
    startvotekick: function (target)
    {
        votedb = new Object;
        votekicktarget = target;
    }
    */
    //,
    votekick:
    {
        perm: function ()
        {
            return true;
        }
        ,
        code: function (src, cmd, chan)
        {
            if (cmd.args.length != 1) return;


            var id = sys.id (cmd.args[0]);

            if (!id)
            {
                this.com.message([src], "Invalid username", this.theme.WARN);
                return;
            }

            this.com.broadcast(sys.name(src) + " calls votekick against " + cmd.args[0] + "! Type /yes or /no .", this.theme.CRITICAL);

            this.votedb = new Object;

            this.votekicktarget = id;

            this.votedb[src] = true;
        }
    }
    ,
    yes:
    {
        perm: function () { return true; }
        ,
        code: function (src, cmd, chan)
        {
            if (!this.votedb) return;
            this.votedb[src] = true;
        }
    }
    ,
    no: 
    {
        perm: function () { return true; }
        ,
        code: function (src, cmd, chan)
        {
            if (!this.votedb) return;
            this.votedb[src] = false;
        }
    }
    ,
    endvote: 
    {
        perm: function () { return false; }
        ,
        code: function (src, cmd, chan)
        {
            if (this.votedb === null) return;
            var yesV = 0;
            var noV = 0;
            var ipDB = new Object;
            for (var x in this.votedb)
            {

                if (! sys.name(x)) continue;

                if (!ipDB[sys.ip(x)]) ipDB[sys.ip(x)] = 0;

                ipDB[sys.ip(x)] += (this.votedb[x]?1:-1) * Math.max(0,this.reputation.reputationOf(x) - (sys.connections(sys.ip(x)) - 1) * 50);
                                
            }

            for (var x in ipDB)
            {
                if (ipDB[x] >= 0)
                {
                    yesV += Math.log(Math.E + ipDB[x]);
                }
                else
                {
                    noV += Math.log(Math.E + Math.abs(ipDB[x]));
                }
            }

            this.com.broadcast("Weighted vote totals: (yes points: " + yesV + ") (no points: " + noV + ")");

            this.votedb = null;
        }
    }
});

    
