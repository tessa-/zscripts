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
/** Implements I/O layer
 * @name io
 * @memberOf this.script.modules
 * @namespace
 * */
/** @scope this.script.modules.io */
({
    require: ["dmp"]
    ,
    /** Object that contains all databases
     * @type {Object}
     */
    openDBs: null
    ,
    diskRO: false
    ,
    configs: null
    ,
    loadModule: function ()
    {
        this.openDBs = new Object;
        this.configs = new Object;
        this.script.registerHandler("step", this);

        this.config = this.readConfig("io", {autosave:60000, autosavemethod: "commit"});

        if (!sys.fileExists("js_databases")) sys.mkdir("js_databases");
    }
    ,
    /** Reads file data
     * @deprecated Use openDB instead.
     */
    read: function (dbname)
    {
        if (sys.fileExists("js_databases/" + dbname + ".jsqz"))
        {
            return sys.readObject("js_databases/" + dbname + ".jsqz");
        }

        return new Object;
    }
    ,
    /** Reads file data
     * @deprecated Use commitDB instead.
     */
    write: function (dbname, obj, fast)
    {
        sys.writeObject("js_databases/" +dbname + ".jsqz", obj, (fast?1:3));
    }
    ,
    readConfig: function (cfgname, defaults)
    {
        if (cfgname in this.configs) return this.configs[cfgname].object;

        if (!sys.fileExists(cfgname + ".config.json"))
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
    /** Opens a database
     * @returns {IOdatabase}
     */
    openDB: function (dbname)
    {
        var start = +new Date;
        var end = start;
        if (dbname in this.openDBs)
        {
            throw new Error("DB already open");//return this.openDBs[dbname].db;
        }
        var db, patches, dbo, dataText;
        get_data:
        {
            if (!sys.fileExists("js_databases/" + dbname + ".jsqz"))
            {
                db = new Object;
                sys.writeObject("js_databases/" +dbname + ".jsqz", db, 9);
                break get_data;
            }
            else
            {
                db = sys.readObject("js_databases/" + dbname + ".jsqz");
            }

            if (!sys.fileExists("js_databases/" + dbname + ".jsqz.transactions")) break get_data;

            this.script.log("Applying patches to database " + dbname);

            var dataText = JSON.stringify(db, null, 1);

            var patches = sys.read("js_databases/" + dbname + ".jsqz.transactions").split(/\n/g);

            if (patches[patches.length - 1] === "") patches.pop();

            var dmp = new this.dmp.diff_match_patch;

            for (var x in patches)
            {
                dataText = dmp.patch_apply(JSON.parse(patches[x]), dataText)[0];
            }

            db = JSON.parse(dataText);

            this.write( dbname, db);

            sys.rm("js_databases/" + dbname + ".jsqz.transactions");
        }

        if (!dataText) dataText = JSON.stringify(db, null, 1);

        dbo = { db: db, lastSave: +new Date, lastCommit: +new Date, dataText: dataText, hasChanges:null };

        this.openDBs[dbname] = dbo;

        end = +new Date;
        this.script.log("Opened database " + dbname + ", took " + (end - start) + "ms.")

        return db;
    }
    ,
    flushDB: function (dbname)
    {
        var metadb = this.openDBs[dbname];
        var db = metadb.db;
        var start = +new Date;

        var start = +new Date;
        this.write(dbname, db, true);
        if (metadb.hasChanges === true) metadb.hasChanges = false;
        metadb.dataText = JSON.stringify(db, null, 1);
        if (sys.fileExists("js_databases/" + dbname + ".jsqz.transactions")) sys.rm("js_databases/" + dbname + ".jsqz.transactions");

        metadb.lastSave = +new Date;
        var end = +new Date;
        this.script.log("Synchronized database " + dbname + ", took " + (end - start) + "ms.");
    }
    ,
    commitDB: function (dbname)
    {

        var start = +new Date;
        var newData = JSON.stringify(this.openDBs[dbname].db, null, 1);

        if (newData === this.openDBs[dbname].dataText) return;

        var dmp = new this.dmp.diff_match_patch;

        var patch = dmp.patch_make(this.openDBs[dbname].dataText, dmp.diff_lineMode_(this.openDBs[dbname].dataText, newData));

        sys.append("js_databases/" + dbname + ".jsqz.transactions", JSON.stringify(patch) + "\n");

        this.openDBs[dbname].dataText = newData;
        var end = +new Date;
        this.script.log("Commited database " + dbname + ", took " + (end - start) + "ms.");
    }
    ,
    markDB: function (dbname)
    {
        this.openDBs[dbname].hasChanges = true;
    }
    ,
    closeDB: function (dbname)
    {
        var metadb = this.openDBs[dbname];
        var db = metadb.db;

        if (!db) return;
        var start = +new Date;
        this.write(dbname, db, false);

        if (sys.fileExists("js_databases/" +dbname + ".jsqz.transactions")) sys.rm("js_databases/" + dbname + ".jsqz.transactions");

        delete this.openDBs[dbname];
        var end = +new Date;
        this.script.log("Closed database " + dbname + ", took " + (end - start) + "ms.");
    }
    ,
    purgeDB: function (dbname)
    {
        if (dbname in this.openDBs) return;

        this.script.log("Purging DB " + dbname);

        if (sys.exists("js_databases/" + dbname + ".jsqz")) sys.rm("js_databases/" + dbname + ".jsqz");
        if (sys.exists("js_databases/" + dbname + ".jsqz.transactions")) sys.rm("js_databases/" + dbname + ".jsqz.transactions");

    }
    ,
    backupDB: function (dbname)
    {
        var metadb = this.openDBs[dbname];
        var db = metadb.db;
        var start = +new Date;
        var backupname = dbname + ".backup."+start+".jsqz.bak";
        sys.writeObject("js_databases/" + backupname, db, 9);
        var end = +new Date;
        this.script.log("Backed up database " + dbname + " to " + backupname + ", took " + (end - start) + "ms.");
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
                if (this.config.autosavemethod === "commit")
                {
                    this.commitDB(x);
                }
                else
                {
                    this.flushDB(x);
                }
                var end = +new Date;

                this.openDBs[x].lastSave = +new Date;

                //this.script.log((this.config.autosavemethod === "commit" ? "Autocommited" : "Autosaved" ) + " database " + x + ", took " + (end-start) + "ms.");


                return;
            }
        }
    }

});
