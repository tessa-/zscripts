/*  ///////////////////////// LEGAL NOTICE ///////////////////////////////

This file is part of ZScripts,
a modular script framework for Pokemon Online server scripting.

Copyright (C) 2013  Ryan P. Nicholl, aka "ArchZombie" / "ArchZombie0x", <archzombielord@gmail.com>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

/////////////////////// END LEGAL NOTICE /////////////////////////////// */
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
