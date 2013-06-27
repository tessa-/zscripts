({
    areas:
    {
        town1:
        {
            name: "The town",
            adjc: ["town1west", "cliff1"]
        }
        ,
        town1west:
        {
            name: "Town West Side",
            adjc: ["town1"],
            digs: 
            {
                ironore: 0.5                
            }
        }
        ,
        cliff1:
        {
            name: "A cliff",
            adjc: ["town1"],
            mobs: 
            {
                chicken: 1
            }
        }
    }

});
