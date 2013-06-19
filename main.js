//"use strict";
(function () {"use strict"; return {
    config: null
    ,
    modules: {}
    ,
    log: function log (msg)
    {
        print ("SCRIPT: " + msg);
    }
    ,
    broadcast: function _DEPRECATED_ (msg)
    {
        //sys.sendAll("SCRIPT: " + msg);
    }
    ,
    registerHandler: function registerHandler (handlername, object, propname)
    {
        if (!propname) propname = handlername;

        if (! (handlername in script))
        {
            var f = function _meta_event_handler_func_ () 
            {
                for (var x in f.callbacks)
                {
                    f.callbacks[x].func.apply(f.callbacks[x].bind, arguments);
                }
            }    
            script[handlername] = f;
            script[handlername].callbacks = [];
        }

        if ( !(script[handlername].callbacks)) throw new Error("Not registerable");    

        var callbk = {func:object[propname], bind:object};

        script[handlername].callbacks.push(callbk);

        var _bind = this;
        if ("onUnloadModule" in object)
        {
            object.onUnloadModule( 
                function _meta_callback_unload_ () 
                {
                    script[handlername].callbacks.splice(script[handlername].callbacks.indexOf(callbk),1);
                }
            );
        }
        

        return;

    }
    ,
    reloadModule: function reloadModule (modname)
    {
        var unloads = this.unloadModule(modname);

        for (var x in unloads) 
        {
            this.loadModule(unloads[x]);
        }
    }
    ,
    loadModule: function loadModule (modname) 
    {
        
        if (this.modules[modname]) return;
        this.log("Loading module: " + modname);

        var mod = sys.exec(modname+".js");

        this.modules[modname] = mod;    

        if (!mod.require) mod.require = [];
        mod.submodules = [];

        for (var x in this.hooks)
        {
            mod[x] = this.hooks[x];            
        }

        for (var x in mod.require)
        {
            var reqmodname = mod.require[x];

            this.loadModule(reqmodname);
            
            if ( !(reqmodname in this.modules) || this.modules[reqmodname] instanceof Error) 
            {
                this.modules[modname] = new Error("Unmet dependencies.");
                return;
            }

            this.modules[reqmodname].submodules.push(modname);
            this.modules[modname][reqmodname] = this.modules[reqmodname];
        }



        if ("loadModule" in mod)
        {
            mod.loadModule();     
        }

    }
    ,
    unloadModule: function unloadModule (modname)
    {
        if ( !(modname in this.modules) ) return;
        this.log("Unloading module: " + modname);

        var unloads = [modname];

        var thisModule = this.modules[modname];


        for (var x in thisModule.submodules)
        {
            var u = this.unloadModule(thisModule.submodules[x]);
            for (var x2 in u)
            {
                unloads.push(u[x2]);
            }
        }

        if (thisModule.require) for (var x in thisModule.require)
        {
            if (this.modules[thisModule.require[x]].unloadSubmodule) 
            {
                this.modules[thisModule.require[x]].unloadSubmodule(thisModule, modname);
            }
        }

        if ("unloadModuleHooks" in thisModule) 
        {
            var unloadModuleHooks = thisModule.unloadModuleHooks;
            for (var x in unloadModuleHooks)
            {
                unloadModuleHooks[x].apply(thisModule, [thisModule]);
            }
            
        }

        if ("unloadModule" in thisModule) thisModule.unloadModule();

        delete this.modules[modname];
        
        return unloads;
    }
    ,
    loadScript: function loadScript () 
    {

        if (!( sys.readObject && sys.os && sys.enableStrict))
        {
            print("WARNING: Missing required functions.");

            if (!sys.writeObject)  
            {
                sys.stopEvent();
                return;
            }

            if (!sys.write)
            {
                sys.write = sys.writeToFile;
                sys.read = sys.readFromFile;
            }

            if (!sys.exists)
            {
                sys.exists = function (fname)
                {
                    return sys.getFileContent(fname) == undefined;
                }
            }

            if (!sys.exec) sys.exec = function (fname) { try { sys.eval(sys.read(fname)) } catch (e) { e.fileName = fname; throw e; }};

            if (!sys.os) sys.os = function () {return "unknown";};

            if (!sys.enableStrict) sys.enableStrict = function(){};
        }

        sys.enableStrict();

        print ("================================================================================");
        print ("Welcome to ArchScript0x!");
        print ("Copyright 2013 Ryan P. Nicholl <archzombielord@gmail.com>");
        print ("OBEY THE GNU AGPLv3+ :)");
        print ("================================================================================");


        this.registerHandler("beforeLogIn", this, "AGPL");

        sys.unsetAllTimers();

        try {
            var f;
            if (sys.exists("main.json")) f = sys.read("main.json");
            
            else f = "{}";
            


            var o = JSON.parse(f);         

            if (typeof o == typeof new Object);

            else throw new Error("Corrupt File");

            this.config = o;

            if (!this.config.modules) this.config.modules = ["default"];

            for (var x in this.config.modules)
            {
                this.loadModule(this.config.modules[x]);
            }

            sys.writeToFile("main.json", JSON.stringify(this.config));
        }
        catch(e) 
        {
            var stack = (e.stack && e.stack.join()) ||  (e.backtrace && e.backtrace()) || (sys.backtrace || function (){})() || "";
            
            this.log("Failed to start, error in " + e.fileName + " at line #" + e.lineNumber + ": " + e.toString() +"\n" + stack);
            sys.stopEvent();
        }  
    }
    ,
    unloadScript: function unloadScript ()
    {
        var mods = Object.keys (this.modules);

        for (var x in mods)
        {
            this.unloadModule(mods[x]);
        }
    }
    , 
    AGPL: function AGPL (src)
    {
        sys.sendHtmlMessage(
            src,
            "<timestamp /><b>License:</b> Scripts Copyright © 2013 Ryan P. Nicholl \"ArchZombie0x\" &lt;archzombielord@gmail.com&gt;<br/>"+
                // "This server uses scripts that are available under the GNU Affero General Public License as published by the Free Software Foundation, "+
                // "either version 3 or (at your option) any later version of the license.<br/>"+
                "Source code for these scripts is available at <a href=https://github.com/ArchZombie/zscripts>https://github.com/ArchZombie/zscripts</a>"//+"<br/>"
        );
    }
    ,
    hooks:
    {
        onUnloadModule: function _meta_hook_onUnloadModule_ (f) 
        {
            if (!this.unloadModuleHooks) this.unloadModuleHooks = [];
            
            this.unloadModuleHooks.push(f);
        }

    }

}})();
