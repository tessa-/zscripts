({

    skills:
    {
        gpunch:
        {
            name: "Great Punch",
            sp: 100,
            level: 1,
            threshold: 0,
            physAtk: 3,
            use: "none",
            related: { spunch: 0.5 }
        }
        ,
        spunch:
        {
            name: "Super Punch",
            level: 1
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
            type: "passive"
            effect: "ustance"
            level: 4,
            threshold: 2300,
            sp: 50
        }
    }


});
