({
    timers: []
    ,
    needsSorting: false
    ,
    at: function (time, callback)
    {
        this.timers.push({time: time, callback: callback});
        this.needsSorting = true;
    }
    ,
    step: function (callback)
    {
        if (this.needsSorting)
        {   
            this.timers.sort( function (a, b) { return a.time - b.time } );
            this.needsSorting = false;
        }

        var now = +new Date;

        for (var i = 0; i < this.timers.length; i++)
        {
            if (this.timers[i].time <= now)
            {
                this.timers[i].callback();
            }
            else
            {
                break;
            }
        }

        this.timers.splice(0, i);
    }
    ,
    loadModule: function ()
    {
        // var lock = this;

        //sys.setTimer(function() {lock.tick();}, 200, true);

        script.registerHandler("step", this);
    }
});
