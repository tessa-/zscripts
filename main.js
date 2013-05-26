// ArchZombie's POJS Scripts
// main.js

// This is the module loader.

({
config: null
,
module_info: {}
,
module: {}
,
log: function (msg)
{
    print ("SCRIPT: " + msg);
}
,
broadcast: function (msg)
{
    sys.sendAll("SCRIPT: " + msg);
}
,
registerHandler: function (handlername, registrant)
{
    if (handlername in script) throw new Error("Handlername already occupied");

    script[handlername] = registrant;
}
,
loadModule: function (modname) 
{
    if (this.module_info[modname]) return;

    this.log("Request to load module: " + modname);

    var f = sys.getFileContent(modname + ".jsmod");
   
    if (!f) throw new Error ("Can't find module");

    try
    {
        this.module_info[modname] = JSON.parse(f);
    }
    catch (e)
    {
        var e2 = new Error("Error loading module info for " +modname+ ": " + e);
        throw e2;
    }
    
    if (this.module_info[modname].require) 
    {
        for (var x in this.module_info[modname].require)
        {
            this.loadModule(this.module_info[modname].require[x]);
        }
    }
    else this.module_info[modname].require = [];

    this.log ("Loading module: " + modname);

    try
    {
        var lic = sys.getFileContent(modname + ".lic");

        if (lic) this.log(lic); 

        var t = sys.getFileContent(modname + ".js");
        if (t)
        {
            var s = sys.eval(t);
            this.module[modname] = s;    
            s.loadModule();
        }
        this.log("Loaded module " + modname);
    }
    catch (e) 
    {
        var e = new Error ("Error loading module "+ modname+ ": "+ e);
        this.module[modname] = e;
        throw e;
    }  

}
,
unloadModule: function (modname)
{
    return; // unimplemented but does it need to be? not yet anyway
}
,
loadScript: function () 
{
    print ("================================================================================");
    print ("Welcome to ArchScript0x!");
    print ("Copyright 2013 Ryan P. Nicholl <archzombielord@gmail.com>");
    print ("OBEY THE GNU AGPLv3+ :)");
    print ("================================================================================");

    sys.unsetAllTimers();

    try {
        var f = sys.getFileContent("main.json");

        if (!f) 
        { 
            f = "{}";
        }


        var o = JSON.parse(f);         

        if (typeof o == typeof new Object);

        else throw new Error("Corrupt File");

        this.config = o;

        if (!this.config.modules) this.config.modules = new Array;

        for (var x in this.config.modules)
        {
            try 
            {
                this.loadModule(this.config.modules[x]);
            } 
            catch (e)
            {
                this.log("Error in loadModule " +this.config.modules[x]+": " + e);
            }
        }

        sys.writeToFile("main.json", JSON.stringify(this.config));
    }
    catch(e) 
    {
        this.log("Failed to start: " + e);
        sys.stopEvent();
    }  
}
,
unloadScript: function ()
{

}

})
