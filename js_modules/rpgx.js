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
/*
FAQ:

Is there a maximum level? Sort of, the maximum HP a player can have is 4,000,000,000,449,004 at the moment, but that would take 317097919 years.
*/

/*

RPG is per-channel

One global RPG object per channel.

PLayers will have skills, some for combat, some passive, some field.

Some important field skills:

Rest: Recovers the players statuses.
Dig: Digs up things.
Craft: Combine materials to make things.
Meditate: Increases passive skill experience
Train: Increase active skill experience.

Passive skills example:

Magical Box: Allows you to bring far more items than you could possibly carry.
Aura Shield: Reduces damage from magical attacks.
Sharp Vision: Sees things
Sharp Hearing: Hears things
Sharp Sense: ...


Material Properties:

hardness     - Harder materials are harder to craft, they also make better blades.
density      - Dense materials reduce the player's speed more.
resistance - Related to electrical attacks.
thermal      - How much the item resists heat and cold
opacity      - Related to laser attacks


Entity properties:

playername: if a player owns this entity, otherwise null
type: class name // e.g., null for player, otherwise e.g.: "wolf", "skydragon"
str: strength points
res: resillience points
spd: speed points
mag: magic points
psy: psychic points
spr: spirit points

hp: // max hp points determined by sta
sta: // max determined by res
men: // mental stamina, determined by psy
mana: // max mana determined by mag
lp: // max life energy determined by spr

head: head item
body: body item
feet: foot item
lhand: left hand item
rhand: right hand item
items: storage

*/

/*
 RPG Context Object:

 {
     engine: 
     battle:
     player:
     arena: 
     
 
 }
*/

({
    database: null
    ,
    games: null
    ,
    require: ["io", "sched"]
    ,
    include: ["rpgx_materials", "rpgx_areas", "rpgx_skills", "rpgx_equips"]
    ,
    loadModule: function ()
    {
        this.database = this.io.openDB("rpg");
        if (!this.database.games) this.database.games = new Object;
        this.games = this.database.games;

    }
    ,
    step: function ()
    {
        gametick: for (var x in this.games)
        {
            if (this.games[x].paused) continue gametick;
            if (!this.games.ready) continue gametick;
            this.games[x].tick++;

            playerstep: for (var x2 in this.games[x].players)
            {
                if (!sys.id(x2)) 
                    // player offline
                {
                    continue playerstep;
                }

                var p = this.games[x].players[x2];

                var ctx = 
                    {
                        game: this.games[x],
                    };

                if (!player.inbattle) this.idleStep(p, ctx);                    
            }
        }
    }
    ,
    chanRPG: function (chan)
    {
        var _;
        if (_ = this.games["chan$" + sys.channel(chan).toLowerCase()]) return _;

        else 
        {
            _ = this.games["chan$" + sys.channel(chan).toLowerCase()] = this.newRPGGame();
            this.startGameForChan(chan);
            return _;
        }
    }
    ,
    startGameForChan: function (chan)
    {
        
    }
    ,
    newRPGGame: function ()
    {
        var game = {players: {}, paused:true, ready: false };
        return game;
    }
    ,
    equipName: function(item)
    {
        return this.materials[item.material].name + " " + this.weapons[item.type].name;
    }
    ,
    entityTick: function (e, ctx)
    {
        for (var x in e.activeSkills)
        {
            var s = e.activeSkills[x];
            if (s.timer) 
            {
                s.timer--;
                if (s.timer <= 0) 
                {
                    delete e.activeSkills[x];
                    continue;
                }
            }
            
            e.hp += s.hp || 0;
            e.sta += s.sta || 0;
            e.mana += s.mana || 0;
            e.mst += s.mst || 0;

            if (s.effect) this.effects[s.effect](e, ctx);
        }

        if (e.hp <= 0) this.entityDie(e);
        if (e.sta <= 0) this.entityPurge(e);
        if (e.mana <= 0) this.entityPurge(e);
        if (e.mst <= 0) this.entityPurge(e);
      
    }
    ,
    equipPhysAtk: function (equip)
    {
        if (equip === null) return;
        var b = this.equips[equip.type].base;
        var a = this.materials[equip.type].amount;
        var s = this.materials[equip.material].sharpness;
        var d = this.materials[equip.material].density;


        var val = b * s * Math.log(d*a) / 100; 
        // e.g., Iron Sword: 40 * 40 * ~4.382 / 100 = ~700
        // Diamond Broadsword: 200 * 500 * ~7.937 / 100= ~8000
 
        var q = equip.quality;

        var factor = 1 - ( 1 / Math.log(q + Math.E) ); // e.g, quality of 

        return val *factor;
    }
    ,
    entityModPhysAtk : function(e) 
    {
        var mod = 1;
        for (var x in e.activeSkills)
        {
            if (e.activeSkills[x].physAtk) mod *= e.activeSkills[x].physAtk
        }
    }
    ,
    entityModPhysDef : function (e)
    {
        return 0;
    }

    ,


    entityPhsyAtk: function (entity)
    {
        return Math.log(entity.str + Math.E + this.entityModPhys(entity)) * (this.equipPhysAtk(entity.lhand) + this.equipPhysAtk(entity.rhand));
    }
    ,
    entityPhysDef: function ()
    {
        return Math.log(this.entityStr(entity) + Math.E) * (this.equipPhysAtk(entity.lhand) + this.equipPhysAtk(entity.rhand));
    }
    ,
    entityMaxHP: function (e)
    {
        return (e.str*0.1 + e.res*0.3 + (Math.log(e.res/1000+Math.E)*15000 | 0));
    }
    ,
    entityMaxMP: function (e)
    {
        return (e.mag*1.2 + (Math.log(e.res*0.3+Math.E)*70 | 0));
    }
    ,
    entityMaxSP: function (e)
    {
        return (e.str*0.2 + e.res*0.2 + (Math.log(e.res/1000+Math.E)*15000 | 0));
    }
    ,
    entityMaxMSP: function (e)
    {
        return (e.res*0.1 + e.mag*0.1 + e.psy*1.2 + e.spr*0.1 (Math.log(e.res/1000+Math.E)*10000 | 0));
    }
    ,
    entityDesc: function (entity) 
    {
        return [
            "<b><i>" +(entity.playername||entity.type) + "</i>",
            "<span style='color:red'>Health: " + entity.hp + "/" + this.entityMaxHP(entity) + "</span>",
            "<span style='color:green'>Stamina: " + entity.sta + "/" + this.entityMaxSP(entity) + "</span>",
            "<span style='color:blue'>Mana: " + entity.mana + "/" + this.entityMaxMP(entity) + "</span>",
            "<span style='color:cyan'>Mental Stamina: " + entity.mst + "/" + this.entityMaxMSP(entity) + "</span>",
            "<span style='color:gold'>Life Energy: " + entity.lp + "/" + this.entityMaxLP(entity) + "</span>",
            
            "<br/>",

            "Physical Offense: " + this.entityPhysAtk(entity),
            "Magical Offense: " + this.entityMagAtk(entity),
            "Psychic Offense: " + this.entityPsyAtk(entity),
            "Spiritual Offense: " + this.entitySprAtk(entity),

            "Physical Defense: " + this.entityPhysDef(entity),
            "Thermal Defense: " + this.entityThrDef(entity),
            "Electric Defense: " + this.entityElcDef(entity),
            "Magical Defense: " + this.entityMagDef(entity),
            "Psychic Defense: " + this.entityPsyDef(entity),
            "Spiritual Defense: " + this.entitySprDef(entity),

            "<br />",

            "Exp:",
            "STR: " + entity.str,
            "RES: " + entity.res,
            "SPD: " + entity.spd,
            "MAG: " + entity.mag,
            "PSY: " + entity.psy,
            "SPR: " + entity.spr
            ].join("<br/>");
    }
    ,
    equipPhpsAtk: function () {}
    ,
    newPlayerEntity: function (src, charname)
    {
        var newp = 
            {
                type: null,
                area: "town",
                playername: sys.name(src).toLowerCase(),
                charname: charname,
                str: 100,
                res: 100,
                spd: 100,
                mag: 100,
                psy: 100,
                spr: 100,

                hp: 100, // maxhp: res * 10
                mana: 100, // max mana: mag*10
                men: 100,
                lp: 100,

                items: {},

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
});
