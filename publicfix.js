({
    counter: 0
    ,
    step: function ()
    {
        if (this.counter++ >= 60 && !sys.isServerPrivate())
        {
            sys.makeServerPublic(false);
            sys.makeServerPublic(true);
            this.counter = 0;
        }
    }
});
