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
        ,
        dequip: function (src, sub, chan, ctx)
        {
            var slot = (sub[1]||"").toLowerCase();
            
            if (! (slot in {"lhand":null, "rhand":null, "head":null, "feet":null, "body":null, "back":null})) 
            {
                this.com.message([src], "Unknown slot to dequip");
                return; 
            }// add error message

            var item = ctx.player[slot];

            if (item === undefined) throw new Error("???");

            if (item === null && slot === "lhand" && ctx.player.rhand && ctx.player.rhand.hands === 2)
            {
                item = ctx.player.rhand;
                slot = "rhand";
            }

            if (item === null) 
            {
                this.com.message(src, "No item in that slot.");
                return; // nothing to dequip
            }

            ctx.player[slot] = null; // remove item

            ctx.player.equips.unshift(item); // Add to equips

            this.com.message([src], "Item removed.");
            
        }
        ,
        view: function (src, sub, chan, ctx)
        {
            var msgs = [];

            this.com.message(src, "Your player:");
            msgs.push("<b>Right Hand:</b> " + this.equipName(ctx.player.rhand));
            msgs.push("<b>Left Hand:</b> " + this.equipName(ctx.player.lhand));
            msgs.push("<b>Head:</b> " + this.equipName(ctx.player.head));
            msgs.push("<b>Body:</b> " + this.equipName(ctx.player.body));
            msgs.push("<b>Feet:</b> " + this.equipName(ctx.player.feet));
            msgs.push("<b>Back:</b> " + this.equipName(ctx.player.back));
            this.less.less(src, msgs.join("<br />"), true);
        }
        ,
        equip: function (src, sub, chan, ctx)
        {
            if (!sub[1])
                // list equips
            {
                for (var x in ctx.player.equips)
                {
                    this.com.message(src, "" + (+x+1) + ": " + this.equipName(ctx.player.equips[x]));
                }
                
                return;
            }

            var idx = +sub[1] - 1;

            var item = ctx.player.equips.splice(idx, 1)[0];
            var kind = this.equips[item.type];

            if (!item) return; // invalid indexing ._.

            var slot = kind.type;

            if (slot === "hand") 
            {
                if (sub[2] === "lhand") slot = "lhand";
                else if (sub[2] === "rhand") slot = "rhand";
                else
                {
                    if (item.hands !== 2)
                        // error
                    {
                        ctx.player.equips.unshift(item); // put item back
                        this.com.message(src, "What hand?");
                        return; // exit
                    }

                    slot = "rhand";

                    if (ctx.player.lhand)

                        // remove left hand equip
                    {
                        ctx.player.equips.unshift(ctx.player.lhand);
                        ctx.player.lhand = null;
                    }
                }
            }

            ctx.player[slot] = item;

            this.com.message(src, "Equipped " + this.equipName(item));

            return;
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
