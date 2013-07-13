/*  ///////////////////////// LEGAL NOTICE ///////////////////////////////

This file is part of ZScripts,
a modular script framework for Pokemon Online server scripting.

Copyright (C) 2013  Ryan P. Nicholl, aka "ArchZombie" / "ArchZombie0x", <archzombielord@gmail.com>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

/////////////////////// END LEGAL NOTICE /////////////////////////////// */
//"use strict";
/**
 * @fileOverview This file is the main modloader.
 * @author <a href="mailto:archzombielord@gmail.com">ArchZombie0x</a>
 */

/** The module loader object
 *  @name script
 *  @namespace
 */
(function () {
 /** @scope script */
 return {
    /** Holds some very basic configuration */
    config: null
    ,
    /** The modules object stores all the modules
     * @namespace
     * @memberOf script
     */
    modules: new Object
    ,
    /** Logs a message to the console or the logging module*/
    log: function log (msg)
    {
        print ("SCRIPT: " + msg);
    }
    ,
    /** Does nothing
     * @deprecated Doesn't do anything
     */
    broadcast : function _DEPRECATED_ (msg)
    {

    }
    ,
    /** Handles server commands, very primitive at the moment
     * @param {string} msg The message recieved by the script
     * @event
     * */
    beforeServerMessage: function beforeServerMessage ()
    {
        // If before server message is available we dont need to before new message hack
        delete this.beforeNewMessage;
        var t = msg.match(/^\/(\w+) (.+)$/);

        if (t) server_control :
        {
            sys.stopEvent();

            print(["COMMAND: ", t[1], " ", t[2]].join(""));

            switch(t[1].toLowerCase())
            {
            case "eval" :
                sys.eval(t[2]);
                break server_control;

            case "loadmodule" :
                this.loadModule(t[2]);
                break server_control;


            case "reloadmodule" :
                this.reloadModule(t[2]);
                  break server_control;

            case "unloadmodule" :
                this.unloadModule(t[2]);
                break server_control;

            default:
                print("UNKNOWN COMMAND");
                break server_control;

            }
        }
    }
    ,
    /** Workaround to handle new messages to get commands from ~~Server~~
     * @param {string} msg The message recieved by the script
     * @event
     *  */
    beforeNewMessage: function beforeNewMessage(msg)
    {
        /** The "test" for a server command. */
        var t = msg.match(/^\~\~Server\~\~\: :(\w+) (.+)$/);


        if (t) server_control :
        {
            //sys.stopEvent();

            print(["COMMAND: ", t[1], " ", t[2]].join(""));

            switch(t[1].toLowerCase())
            {
            case "eval" :
                sys.eval(t[2]);
                break server_control;

            case "loadmodule" :
                this.loadModule(t[2]);
                break server_control;


            case "reloadmodule" :
                this.reloadModule(t[2]);
                  break server_control;

            case "unloadmodule" :
                this.unloadModule(t[2]);
                break server_control;

            default:
                print("UNKNOWN COMMAND");
                break server_control;

            }
        }
    }
    ,
    /** Registers a script event handler
     * @param {string} handlername The event name of the script handler.
     * @param {Module} object The module to register this handler from
     * @param {string} [propname=handlername] The name of the handler on the module, if it is different from the event name.
     * */
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
            };

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
    /** Reloads a module
     * @param {string} modname
     * @throws Error When the module can't be loaded.
     * */
    reloadModule : function reloadModule (modname)
    {
        var unloads = this.unloadModule(modname);

        for (var x in unloads)
        {
            this.loadModule(unloads[x]);
        }

        this.loadModule(modname); // load even if unload failed
    }
    ,
    /** Loads a module
     * @param {string} modname Name of the module to be loaded.
     */
    loadModule : function loadModule (modname)
    {
        if (this.modules[modname] && !(this.modules[modname] instanceof Error)) return;
        this.log("Loading module: " + modname);

        try {
            var mod = sys.exec("js_modules/" + modname +".js");

            mod.name = modname;

            this.modules[modname] = mod;

            if (mod.include) for (var x in mod.include)
            {
            //this.log("Including module: " + mod.include[x])
                var temp = sys.exec("js_modules/" + mod.include[x] + ".js");

                for (var x2 in temp)
                {
                    if (x2 in mod && mod[x2] != null)
                    {
                        if (typeof mod[x2] != typeof temp[x2] || (typeof mod[x2] != "object" && typeof mod[x2] != "function"))
                        {
                            throw new Error("Unable to merge");
                        }
                        if (typeof mod[x2] === "function")
                        {
                            // use a closure to merge the two functions as one
                            mod[x2] = (function (m, t) {
                                return function ()
                                {
                                    m.apply(mod, arguments);
                                    t.apply(mod, arguments);
                                };
                            })(mod[x2], temp[x2]);
                        }
                        else if (mod[x2] instanceof Array)
                        {
                            mod[x2] = mod[x2].concat( temp[x2] );
                        }
                        else
                        {
                            for (var x3 in temp[x2])
                            {
                                if (x3 in mod[x2]) throw new Error("Unable to merge");

                                mod[x2][x3] = temp[x2][x3];
                            }
                        }
                    }
                    else
                    {
                        mod[x2] = temp[x2];
                    }
                }
            }

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
                    this.modules[modname] = new Error("Unmet dependencies");
                    return;
                }

                this.modules[reqmodname].submodules.push(modname);
                Object.defineProperty(this.modules[modname], reqmodname, {configurable : true, value: this.modules[reqmodname]});
                //            this.modules[modname][reqmodname] = this.modules[reqmodname];
            }

            Object.defineProperty(this.modules[modname], "script", this,  {configurable : true, value: this.modules[reqmodname]});

            if ("loadModule" in mod)
            {
                mod.loadModule();
            }
        }
        catch (e)
        {

            this.modules[modname] = e;
            throw e;
        }

    }
    ,
    /** Unloads a module
     * @param {string} modname Name of module to remove.
     * @return {string[]} List of all modules that were removed, includes others due to dependencies.
     */
    unloadModule : function unloadModule (modname)
    {
        if ( !(modname in this.modules)) return [modname];
        if (this.modules[modname] instanceof Error) return [modname];
        this.log("Unloading module: " + modname);

        var unloads = [modname];

        var thisModule = this.modules[modname];


        if (thisModule.submodules) for (var x in thisModule.submodules)
        {
            var u = this.unloadModule(thisModule.submodules[x]);
            for (var x2 in u)
            {
                unloads.push(u[x2]);
            }
        }

        if (thisModule.require) for (x in thisModule.require)
        {
            if (this.modules[thisModule.require[x]].unloadSubmodule)
            {
                this.modules[thisModule.require[x]].unloadSubmodule(thisModule, modname);
            }
        }

        if ("unloadModuleHooks" in thisModule)
        {
            var unloadModuleHooks = thisModule.unloadModuleHooks;
            for (x in unloadModuleHooks)
            {
                unloadModuleHooks[x].apply(thisModule, [thisModule]);
            }

        }

        if ("unloadModule" in thisModule) thisModule.unloadModule();

        delete this.modules[modname];

        return unloads;
    }
    ,
    /** Handles loading the script
     * @event
     */
    loadScript: function loadScript ()
    {
        /*
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

            if (!sys.fileExists)
            {
                sys.fileExists = function (fname)
                {
                    return sys.getFileContent(fname) == undefined;
                };
            }

            if (!sys.exec) sys.exec = function (fname) { try { sys.eval(sys.read(fname)); } catch (e) { e.fileName = fname; throw e; }};

            if (!sys.os) sys.os = function () {return "unknown";};

            if (!sys.enableStrict) sys.enableStrict = function(){};
        }
         */

        sys.enableStrict();

        print(sys.read("ZSCRIPTS_COPYING"));

        this.registerHandler("beforeLogIn", this, "AGPL");

        sys.unsetAllTimers();

        try {
            var f;
            if (sys.fileExists("main.json")) f = sys.read("main.json");

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
            var stack = (e.backtracetext);

            this.log("Failed to start, error in " + e.fileName + " at line #" + e.lineNumber + ": " + e.toString() +"\n" + stack);
            sys.stopEvent();
        }
    }
    ,
    /** Handles unloading the script
     * @event
     */
    unloadScript: function unloadScript ()
    {
        var mods = Object.keys (this.modules);

        for (var x in mods)
        {
            this.unloadModule(mods[x]);
        }
    }
    ,
    /** Sends a license message to src
     * @param {number} src User ID to send message to.
     */
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
    /** Hooks to be added to all modules
     *
     */
    hooks:
    /**
     * @scope script.hooks
     */
    {
        /** Runs the function when the module is unloaded
         * @param {function} f Function to be run when the module is unloaded.
         */
        onUnloadModule: function _meta_hook_onUnloadModule_ (f)
        {
            if (!this.unloadModuleHooks) this.unloadModuleHooks = [];

            this.unloadModuleHooks.push(f);
        }

    }

};})();
