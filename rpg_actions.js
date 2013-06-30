({
    rpgActions:
    {
        test: function (src, cmd, chan, rpg, subactions)
        {
            this.com.message([src], "test", this.theme.GAME, false, [chan]);
        }
        ,
        walk: function (src, sub, chan, ctx)
        {
            for (var i = 1; i < sub.length; i++)
            {                
                var to = sub[i];

                if (this.areas[ctx.player.area].adjc.indexOf(to) !== -1)
                {

                    this.com.message([src], "Walked from " + this.areas[ctx.player.area].name + " to " + this.areas[to].name + ".", this.theme.GAME);

                    ctx.player.area = to;
                }
                else
                {
                    this.com.message([src], "Can't find that place!", this.theme.GAME);
                }
            }

            this.com.message([src], "You are at: " + this.areas[ctx.player.area].name + ". From here you can go to:", this.theme.GAME, false, [chan]);


            
            for (var i = 0; i < this.areas[ctx.player.area].adjc.length; i++)
            {
                this.com.message([src], this.areas[this.areas[ctx.player.area].adjc[i]].name + " (" + this.areas[ctx.player.area].adjc[i] + ")", -1, false, chan);
            }        

            
        }
        ,
        dig: function (src, sub, chan, ctx)
        {
            ctx.player.activeActions.push({ timer: 40, done: "dig", tick: "digTick" });
        }
        
    }
    ,
    actions:
    {
        dig:  function (actionObj, ctx)
        {
          //  print(this.util.inspect(ctx.player));
            var src = sys.id(ctx.player.name);
            this.com.message([src], "You dug something up!", this.theme.GAME);

            for (var x in this.areas[ctx.player.area].digs)
            {
                this.com.message([src], "It was an " + x, this.theme.GAME);
            }
        }
        ,
        explore: function (actionObj, ctx)
        {
            for (var x in this.areas[ctx.player.area].mobs)
            {
                this.com.message([src], "You started battle with " + JSON.stringify(this.areas[ctx.player.area].mobs[x]), this.theme.GAME);
            }
        }
        ,
        digTick: function (actionObj, ctx)
        {
            var src = sys.id(ctx.player.name);            
            this.com.message([src], "You are digging a hole.", this.theme.GAME);
        }
    } 
});
