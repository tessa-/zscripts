({
    require: ["com"]
    ,
    loadModule: function ()
    {

        script.log ("testing!");
        
        script.broadcast(JSON.stringify(script.module));
        
        script.module.com.broadcast("Hello world!!! <a> </a> :)", false, null); 
    }
});
