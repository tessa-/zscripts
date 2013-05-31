({
    require: ["com", "parsecommand"]
    ,
    loadModule: function ()
    {

        script.log ("testing!");
        
        script.broadcast(JSON.stringify(script.module));
        
        script.module.com.broadcast("Hello world!!! <a> </a> :)", false, null); 

        script.module.com.broadcast(JSON.stringify(script.module.parsecommand.parseCommand("/testing --testy=tae raw_arg_with_escaped\\ space --pinguin=test abstract --o=\"io layer\" --reason=cuz \"quoted arg\" \"arg with a \\\"\"")));
    }
});
