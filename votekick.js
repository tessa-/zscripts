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
            for (var x in this.votedb)
            {
                if (! sys.name(x)) continue;
                
                if (this.votedb[x])
                {
                    yesV += Math.log(this.reputation.reputationOf(x));
                }
                else 
                {
                    noV += Math.log(this.reputation.reputationOf(x));
                }
                

                

                
            }

            this.com.broadcast("Weighted vote totals: (yes points: " + yesV + ") (no points: " + noV + ")");

            this.votedb = null;
        }
    }
});

    
