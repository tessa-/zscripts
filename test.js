({
    require: ["sched"]
    ,
    loadModule: function ()
    {
        
        script.module.sched.at(+new Date + 5000, function () {
            script.log ("TEST1");
            script.module.sched.at(+new Date + 10000, function () { script.log ("TEST2"); });
        });
    }
});
