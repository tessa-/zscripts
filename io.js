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
({
    name: "Standard Input/Output"
    ,
    authors: ["ArchZombie0x"]
    ,
    require: []
    ,
    openDBs: null
    ,
    diskRO: false
    ,
    loadModule: function ()
    {
        this.openDBs = new Object;
        script.registerHandler("step", this);

        this.config = this.readConfig("io", {autosave:60000});
    }
    ,
    read: function (dbname) 
    {
        if (sys.exists(dbname+".jsqz"))
        {
            return sys.readObject(dbname + ".jsqz");
        }     

        return new Object;
    }
    ,
    write: function (dbname, obj, fast)
    {
        sys.writeObject(dbname + ".jsqz", obj, (fast?1:9));
    }
    ,
    readConfig: function (cfgname, defaults)
    {
        if (!sys.exists(cfgname + ".config.json")) 
        {
            sys.write(cfgname+".config.json", JSON.stringify(defaults));
            return JSON.parse(JSON.stringify(defaults));
        }

        
        
        var o = JSON.parse (sys.read(cfgname + ".config.json"));
        var changed = false;

        for (var x in defaults)
        {
            if (!(x in o))
            {
                o[x] = defaults[x];
                changed = true;
            }
        }

        if (changed)
        {
            sys.write(cfgname+".config.json", JSON.stringify(o));
        }

        return o;
    }
    ,
    writeConfig: function (cfgname, val)
    {
        sys.write(cfgname + ".config.json", JSON.stringify(val));
    }
    ,
    openDB: function (dbname)
    {
        if (dbname in this.openDBs)
        {
            throw new Error("DB already open");//return this.openDBs[dbname].db;
        }

        this.openDBs[dbname] = 
            {
                lastSave: +new Date
                ,
                db: this.read(dbname)
                ,
                hasChanges: null
                ,
                referenceCount: null
            }

        return this.openDBs[dbname].db;
    }
    ,
    flushDB: function (dbname)
    {
        var metadb = this.openDBs[dbname];
        var db = metadb.db;

        if (metadb.hasChanges === null || metadb.hasChagnes === true)
        {
            this.write(dbname, db, true);
            if (metadb.hasChanges === true) metadb.hasChanges = false;           
        }

        metadb.lastSave = +new Date;
    }
    ,
    closeDB: function (dbname)
    {
        var metadb = this.openDBs[dbname];
        var db = metadb.db;

        if (!db) return;

        this.write(dbname, db, false);

        delete this.openDBs[dbname];
    }
    ,
    purgeDB: function (dbname)
    {
        
        //var metadb = this.openDBs[dbname];
        //var db = metadb.db;

        //m

        //sys.rm(dbname + ".jsqz");
    }
    ,
    backupDB: function (dbname)
    {
        var metadb = this.openDBs[dbname];
        var db = metadb.db;

        sys.writeObject(dbname + ".backup."+ (+new Date)+".jsqz.bak", db, 9);
    }
    ,
    step: function ()
    {
        var now = +new Date;
        if (this.config.autosave) for (var x in this.openDBs)
        {
            if (this.openDBs[x].lastSave + this.config.autosave <= now)
            {
                var start = +new Date;
                this.flushDB(x);
                var end = +new Date;

                script.log("Autosaved database " + x + ", took " + (end-start) + "ms.");


                return;
            }
        }
    }
    
});
