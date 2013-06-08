({

    require: ["commands", "reputation"]
    ,
    votedb: null
    ,
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
        }
    }
});

    
