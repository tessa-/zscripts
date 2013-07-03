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
({

    skills:
    {

        // Fighting track
        gpunch:
        {
            name: "Great Punch",
            // The name of the skill

            cost: 
            // Cost to use the skill
            {
                sp: 100
                // Costs 100 stamina points
            }

            level: 1,
            // Level Class of the skill, has no effect on damage but serves to classify skills by strength

            threshold: 0,
            // Exp required for first use
            
            use: "none",
            // Item subclass required to use. "none" means empty hand.

            components: 
            // Multiple components are supported, for example to damage the opponent and the user.
            [{
                target: "opp",
                // Target of the component, either "self", "opp", "ally" or combinations of such (in array)

                count: 1,
                // Number of targets to select. -1 is all targets possible

                move: "physical",
                // The function to be called for this component

                base: 10,
                // The base damage done if offence = defense
            }]
            ,
            related: { spunch: 0.5 }
            // Related skills that are given EXP points when you use this skill
        }
        ,

        spunch:
        {
            name: "Super Punch",
            cost: 
            {
                sp: 150
            }
            level: 2,
            threshold: 0,
            use: "none",
            components: 
            [{
                target: "opp",
                count: 1,
                move: "physical",
                base: 25,
            }]
            ,
            related: { spunch: 0.5 }
        }
        ,
        upunch:
        {
            name: "Ultra Punch",
            cost: 
            {
                sp: 350
            }
            level: 3,
            threshold: 0,
            use: "none",
            components: 
            [{
                target: "opp",
                count: 1,
                move: "physical",
                base: 45,
            }]
            ,
            related: { spunch: 0.5 }
        }
        ,

        epunch:
        {
            name: "Hyper Punch",
            cost: 
            {
                sp: 1750
            }
            level: 4,
            threshold: 0,
            use: "none",
            components: 
            [{
                target: "opp",
                count: 1,
                move: "physical",
                base: 150,
            }]
            ,
            related: { spunch: 0.5 }
        }
        ,
        barrage:
        {
            name: "Hyper Barrage",
            cost: 
            {
                sp: 1575
            }
            level: 4,
            threshold: 0,
            use: "none",
            components: 
            [{
                target: "opp",
                count: 1,
                hits: 5,
                move: "physical",
                base: 20,
            }]
            ,
            related: { spunch: 0.5 }
        }
        ,
        epunch:
        {
            name: "Epic Punch",
            cost: 
            {
                sp: 6250,
                mp: 300,
            }
            level: 5,
            threshold: 0,
            use: "none",
            components: 
            [{
                target: "opp",
                count: 1,
                move: "physical",
                base: 1500,
            }]
            ,
            related: { spunch: 0.5 }
        }
        ,
        opunch:
        {
            name: "Obilteratory Punch",
            cost: 
            {
                sp: 12000,
                mp: 800,
            }
            level: 6,
            threshold: 0,
            use: "none",
            components: 
            [{
                target: "opp",
                count: 1,
                move: "physical",
                base: 3000,
            }]
            ,
            related: { spunch: 0.5 }
        }
        ,
        warfist:
        {
            name: "Fist Strike of the Demigod",
            cost:
            {
                sp: 100000,
                mp: 10000,
            },
            level: 7,
            threshold: null,
            use: "none",
            components:
            [{
                target: "opp",
                count: 1,
                move: "physical",
                base: 25000
            }],
        }
        ,


        // Healer path
        wish:
        {
            name: "Healing Wish",
            cost:
            {
                mp: 100
            }
            ,
            level:1
            ,
            use: "staff"
            ,
            components:
            [{
                target: ["self", "ally"],
                count: 1,
                move: "heal",
                base: 70
            }]
        }
        ,
        prayer:
        {
            name: "Healing Prayer",
            cost: {mst: 200, mp: 50},
            level: 2,
            use: "any",
            components: [{
                target: ["self", "ally"],
                count: 1,
                move: "heal",
                base: 200
            }]
        }
        ,
        invigor:
        {
            name: "Invigoration",
            cost: { mana: 500 },
            level: 3,
            use: "any",
            components:
            [{
                target: ["self", "ally"],
                count: 1,
                move: ["defmult", "spdmult", "stamult"],
                base [1.1, 1.2, 1.5],
                duration: 5                
            }]
        }
        ,
        smite:
        {
            name: "smite",
            cost: { mp: 120 },
            level: 1,
            use: "staff",
            components:
            [{
                target: "opp",
                count: 1
            }]
        }
        spark:
        {
            name: "Sparks",
            cost:
            {
                mp: 10
            }
            ,
            level:1
            ,
            threshold: null,
            use: "wand"
        }
        ,
        
        
    
    }


});
    
});
