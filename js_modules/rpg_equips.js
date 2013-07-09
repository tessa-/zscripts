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
    equips:
    {
        shoes:
        {
            name: "Shoes",
            type: "foot",
            amount: 25,
            base: 10,
            materials: ["hide", "scale"]
        }
        ,
        hat:
        {
            name: "Hat",
            type: "head",
            amount: 5,
            base: 20,
            materials: ["cloth", "hide"]
        }
        ,
        helmet:
        {
            name: "Helmet",
            type: "head",
            materials: ["metal", "scale", "bone"],
            amount: 5,
            base: 25
        }
        ,
        cloak:
        {
            name: "Cloak",
            type: "back",
            amount: 30,
            base: 5,
            materials: ["cloth", "hide"]
        }
        ,
        clothes:
        {
            name: "Casual Wear",
            type: "body",
            amount: 30,
            base: 25,
            materials:  ["cloth"]
        }
        ,
        suit:
        {
            name: "Suit",
            type: "body",
            amount: 45,
            base: 30,
            materials: ["cloth"]
        }
        ,
        larmor:
        {
            name: "Light Armor",
            type: "body",
            amount: 40,
            materials: ["metal", "scale", "wood"],
            base: 20
        }
        ,
        armor:
        {
            name: "Armor",
            type: "body",
            amount: 60,
            base: 40,
            materials: ["metal", "scale"]
        }
        ,
        harmor:
        {
            name: "Heavy Armor",
            type: "body",
            amount: 200,
            materials: ["metal"],
            base: 80
        }
        ,
        sharmor:
        {
            name: "Superheavy Armor",
            type: "body",
            amount: 1250,
            base: 180
        }
        ,
        shortsword:
        {
            name: "Shortsword",
            type: "hand",
            subtype: "blade",
            hands: 1,
            amount: 5,
            material: ["bone", "metal", "wood"],
            base: 20
        }
        ,

        sword:
        {
            name: "Sword",
            type: "hand",
            subtype: "blade",
            hands: 1,
            amount: 10,
            material: ["bone", "metal", "wood"],
            base: 40,
            magic: 30
        }
        ,

        longsword:
        {
            name: "Longsword",
            type: "hand",
            subtype: "blade",
            hands: 1,
            amount: 20,
            material: ["bone", "metal", "wood"],
            base: 65
        }
        ,

        broadsword:
        {
            name: "Broadsword",
            type: "hand",
            subtype: "blade",
            hands: 2,
            amount: 70,
            material: ["bone", "metal", "wood"],
            base: 150
        }
        ,
        wand:
        {
            name: "Wand",
            type: "hand",
            subtype: "magic",
            hands:1,
            amount: 3,
            materials: ["bone", "wood", "metal"],
            base: 5,
            magic: 50,
        }
        ,
        staff:
        {
            name: "Staff",
            type: "hand",
            hands: 2,
            subtype: "magic",
            amount: 15,
            materials: ["wood", "bone"],
            base: 15,
            magic: 110


        }
        ,
        pickaxe:
        {
            name: "Pickaxe",
            type: "hand",
            hands:1,
            subtype: "pickaxe",
            amount: 15,
            base: 15,
            materials: ["metal","bone", "wood", "stone"]
        }
    }
    ,
    equipQMult: function (e)
    {
        if (! ("quality" in e)) return 0; // obvious error but wont cause crash

        if (e.quality === null) return 1; // items blessed by tux (hacked dev toys >:D)

        else return 1 - (1 / Math.log(e.quality));
    }
    ,
    equipAtk: function (e) 
    {
        if (!e) return 0;
        return Math.max(20, (this.equips[e.type].base || 20) * (this.materials[e.material].sharpness || 20) * this.equipQMult(e));
    }
    ,
    equipDef: function (e) 
    {
        if (!e) return 0;
        return Math.max(20, (this.equips[e.type].base || 20) * (this.materials[e.material].strength || 20) * this.equipQMult(e));
    }
    ,
    equipName: function(e)
    {
        if (!e) return "Nothing";
        var qm = this.equipQMult(e);
        var qs;
        var qdt = [
            [0, "This is a %... I think..."],
            [0.3, "Terriblly made %"],
            [0.6, "Ordinary %%"],
            [0.7, "Finely Crafted %"],
            [0.8, "Excellent %"],
            [0.87, "Superb %"],
            [0.92, "Supreme %"],
            [0.94, "Divine %"],
            [0.97, "Uber Divine %"],
            [1, "Uber Divine % blessed by Tux The Penguin"]
        ];

        for (var x in qdt) if (qm >= qdt[x][0]) qs = qdt[x][1];

        
        return qs.replace(/\%/, (this.materials[e.material].name + " " + this.equips[e.type].name));
    }
});
