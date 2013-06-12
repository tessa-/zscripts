"use strict";
({
    config: null
    ,
    module_info: {}
    ,
    modules: {}
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
    registerHandler: function (handlername, object)
    {
        if (handlername in script)
        {
            if ( !(script[handlername].callbacks)) throw new Error("Not registerable");
            
            script[handlername].callbacks.push({func:object[handlername], bind:object});
            return;
        }

        var f = function () 
        {
            for (var x in f.callbacks)
            {
                f.callbacks[x].func.apply(f.callbacks[x].bind, arguments);
            }
        }

        script[handlername] = f;
        script[handlername].callbacks = [{func:object[handlername], bind:object}];

        return;

    }
    ,
    reloadModule: function (modname)
    {
        this.unloadModule(modname);
        this.loadModule(modname);
    }
    ,
    loadModule: function (modname) 
    {
        if (this.modules[modname]) return;


        this.log ("MODULE_MANAGER: Loading \"" + modname + "\"");
        try
        {
            try {
                var t = sys.read(modname + ".js");
            } 
            catch (e)
            {
                throw new Error("Couldn't read module: "+ modname+".js: " + e);
            }

            var s = sys.eval(t);


            this.modules[modname] = s;    

            if (!s.require) s.require = [];
            s.submodules = [];

            for (var x in s.require)
            {
                this.log("MODULE_MANAGER: Module \"" + modname+ "\" requires module \""+s.require[x]+"\"");
                this.loadModule(s.require[x]);
                
                if ( !(s.require[x] in this.modules) || this.modules[s.require[x]] instanceof Error) 
                {
                    this.log("MODULE_MANAGER: This module is not available. Can't load.");
                    this.modules[modname] = new Error("Unmet dependencies.");
                    return;
                }

                this.modules[s.require[x]].submodules.push(modname);
                this.modules[modname][s.require[x]] = this.modules[s.require[x]];
            }

            if ("loadModule" in s)
            {
                this.log("MODULE_MANAGER: Initializing \"" + modname + "\"");
                s.loadModule();
                this.log("MODULE_MANAGER: Initialized \"" + modname + "\"");       
            }
            
            this.log("MODULE_MANAGER: Completed loading \"" + modname + "\"");
        }
        catch (e) 
        {
            var e = new Error ( "In " + e.fileName +":"+ e.lineNumber + ": Error loading module "+ modname+ ": "+ e );
            this.modules[modname] = e;
            throw e;
        }  

    }
    ,
    unloadModule: function (modname)
    {
        if ( !(modname in this.modules) ) return;

        this.log("MODULE_MANAGER: Unloading \"" + modname + "\"");

        for (var x in this.modules[modname].submodules)
        {
            this.log("MODULE_MANAGER: Submodule \"" + this.modules[modname].submodules[x] + "\"");
            this.unloadModule(this.modules[modname].submodules[x]);
        }
        
        if ("unloadModule" in this.modules[modname]) this.modules[modname].unloadModule();

        delete this.modules[modname];
        
        return;
    }
    ,
    loadScript: function () 
    {

        if (!( sys.readObject && sys.os && sys.enableStrict))
        {
            print("WARNING: Missing required functions.");
            sys.stopEvent();
            return;
        }

        sys.enableStrict();

        print ("================================================================================");
        print ("Welcome to ArchScript0x!");
        print ("Copyright 2013 Ryan P. Nicholl <archzombielord@gmail.com>");
        print ("OBEY THE GNU AGPLv3+ :)");
        print ("================================================================================");


        var gpl_obj = {
            beforeLogIn: this.AGPL
        };

        this.registerHandler("beforeLogIn", gpl_obj);

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

            if (!this.config.modules) this.config.modules = ["default"];

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
        var mods = Object.keys (this.modules);

        for (var x in mods)
        {
            this.unloadModule(mods[x]);
        }
    }
    , 
    AGPL: function (src)
    {
        sys.sendHtmlMessage(
            src,
            "<timestamp /><b>License:</b> Scripts Copyright © 2013 Ryan P. Nicholl \"ArchZombie0x\" &lt;archzombielord@gmail.com&gt;<br/>"+
                "This server uses scripts that are available under the GNU Affero General Public License as published by the Free Software Foundation, "+
                "either version 3 or (at your option) any later version of the license.<br/>"+
                "Source code for these scripts is available at <a href=https://github.com/ArchZombie/zscripts>https://github.com/ArchZombie/zscripts</a><br/>"+
                "This license provides you with the rights to obtain source code for the scripts, you are not required to accept it or download the scripts."
        );
    }

})
