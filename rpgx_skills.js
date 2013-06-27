({

    skills:
    {
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

                base: 3,
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
            level: 1,
            sp: 250,
            threshold: 360,
            psysAtk: 5,
            use: "none",
            related: { epunch: 0.5, firepunch: 0.1, icepunch: 0.1, elecpunch: 0.1  }
        }
        ,
        epunch:
        {
            name: "Epic Punch",
            proto: "spunch",
            level: 2,
            threshold: 760,
            sp: 1300,
            psysAtk: 7,
            use: "none",
            related: { upunch: 0.5, gpunch: 0.3, firepunch: 0.1, icepunch: 0.1, elecpunch: 0.1  }
        }
        ,
        upunch: 
        {
            name: "Uber Punch",
            level: 3,
            threshold: 1800,
            sp: 3500,
            physAtk: 21,
            related: { ustance: 0.8, uguard: 0.8 }
        }
        ,
        ustance:
        {
            name: "Uber Stance",
            type: "passive",
            effect: "ustance",
            level: 4,
            threshold: 2300,
            sp: 50
        }
    }


});
