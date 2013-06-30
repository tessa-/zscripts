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
            base: 2,
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
            base: 25
        }
        ,
        armor:
        {
            name: "Armor",
            type: "body",
            amount: 140,
            base: 60,
            materials: ["metal", "scale"]
        }
        ,
        harmor:
        {
            name: "Heavy Armor",
            type: "body",
            amount: 360,
            materials: ["metal"],
            base: 140
        }
        ,
        sharmor:
        {
            name: "Superheavy Armor",
            type: "body",
            amount: 1250,
            base: 375
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
            base: 40
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
            base: 200
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
            base: 5
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
            base: 15
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
    equipAtk: function (e) 
    {
        if (!equip) return 20;
        return Math.max(20, (this.equips[ctx.equip.type].base | 0) * (1 - (1 / Math.log(ctx.equip.quaility))));
    }
    ,
    equipDef: function (e) 
    {
        if (!equip) return 20;
        return Math.max(20, (this.equips[ctx.equip.type].base | 0) * (1 - (1 / Math.log(ctx.equip.quaility))));
    }
});
