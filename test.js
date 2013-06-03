({
    require: ["com", "parsecommand"]
    ,
    loadModule: function ()
    {

        //script.log ("testing!");
        
        //script.broadcast(JSON.stringify(script.module));
        
        this.com.broadcast("Hello world!!! <a> </a> :)", false, null); 

        this.com.broadcast(JSON.stringify(this.parsecommand.parseCommand("/testing --testy=tae raw_arg_with_escaped\\ space --pinguin=test abstract --o=\"io layer\" --reason=cuz \"quoted arg\" \"arg with a \\\"\"")));
    }
});
