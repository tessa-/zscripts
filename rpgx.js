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


({
    require: []
    ,
    materials: null
    ,
    weapons: null
    ,
    equipName: function(item)
    {
        return this.materials[item.material].name + " " + this.weapons[item.type].name;
    }
    ,
    equipAttackPower: function (equip)
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

    entityPhsyAttackPower: function (entity)
    {
        return Math.log(this.entityStr(entity) + Math.E) * (this.equipPhysAttackPower(entity.lhand) + this.equipPhysAttackPower(entity.rhand));
    }
    ,
    entityPhysDefPower: function ()
    {

    }
    ,
    entityMaxHP: function (e)
    {
        return (e.str*0.1 + e.res*0.3 + (Math.log(e.res/1000+Math.E)*15000 | 0));
    }
    ,
    entityMaxMana: function (e)
    {
        return (e.mag*1.2 + (Math.log(e.res*0.3+Math.E)*70 | 0));
    }
    ,
    entityDesc: function (entity) 
    {
        return [
            (entity.playername||entity.type),
            "HP: " + entity.hp + "/" + this.entityMaxHP(entity),
            "Mana: " + entity.mana + "/" + this.entityMaxMana(entity),
            "Strength: " + 10 * Math.log(Math.E+entity.str) / Math.log(Math.E+100),
            "Resillience: " + entity.res,
            "Magic: " + entity.mag,
            ].join("\n");
    }
    ,
    equipPhysAttackPower: function () {}
    ,
    newPlayerEntity: function (src, charname)
    {
        var newp = 
            {
                type: null,
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
    ,
    
    

});
