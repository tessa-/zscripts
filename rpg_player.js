({
    newPlayer: function ()
    {
        var newp = 
            {
                type: null,
                area: "town1",
                name: null,
                str: 100,
                res: 100,
                spd: 100,
                mag: 100,
                psy: 100,
                spr: 100,

                hp: 100, 
                mana: 100,
                men: 100,
                lp: 100,

                items: {},
                
                equips: [],

                activeActions:[],
                // All the things happening at the moment

                head: null,
                body:
                {
                    material: "cotton",
                    type: "clothes",
                    quality: 10
                }
                ,
                lhand: null,
                rhand: 
                {
                    material: "birch",
                    type: "sword",
                    quality: 10
                }
                ,
                feet:
                {
                    material: "leather",
                    type: "shoes",
                    quality: 10
                }
                
            };
        return newp;
    }
    ,

    playerStep: function (player, ctx)
    {
        if (player.battling) return;
        // Regular player events don't occur while the player is in a battle!

        for (var x in player.activeActions)
        {
            if (player.activeActions[x].timer-- <= 0)
            {
                this.actions[player.activeActions[x].action].call(this, player.activeActions[x], { rpg: ctx.rpg, player:player, index: x });
                delete player.activeActions[x];
            }
            else
            {
                this.com.message([src], player.activeActions[x].stepMessage, this.theme.GAME);
            }
            break;
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
    }    
});
