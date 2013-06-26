({
    require: ["io", "com", "logs", "theme", "commands", "less"]
    ,
    loadModule: function ()
    {
        this.commands.registerCommand("ioctrl", this);
    }
    ,
    ioctrl:
    {
        desc: "Controls I/O Layer",
        options:
        {
            purge: "Delete database(s)"
            ,
            sync: "Write database(s) to file"
            ,
            backup: "Back-up databases(s)"
            ,
            all: "Apply actions to all open databases as well"
        }
        ,
        perm: function (src)
        {
            return sys.auth(src) == 3;
        }
        ,
        code: function (src, cmd)
        {
            var dblist = cmd.args;
            var now = +new Date;

            if (!cmd.flags.all && !cmd.flags.sync && !cmd.flags.backup && !cmd.flags.purge && cmd.args.length == 0)
            {
                this.com.message([src], "Loaded databases:", this.theme.INFO);
                this.less.less(src, Object.keys(this.io.openDBs).join("\n"), false);
                return;
            }

            

            if (cmd.flags.all)
            {
                var dblist2 = Object.keys(this.io.openDBs);
                for (var x in dblist2) if (dblist.indexOf(dblist2[x]) === -1) dblist.push(dblist2[x]);
            }

            if (cmd.flags.sync) for (var x in dblist) 
            {
                var start = +new Date;
                this.io.flushDB(dblist[x]);
                var end = +new Date;
                this.logs.logMessage(this.logs.INFO, "Synced database " + dblist[x] + ", took " + (end-start) + "ms.");
            }

            if (cmd.flags.backup) for (var x in dblist) 
            {
                var start = +new Date;
                this.io.backupDB(dblist[x]);
                var end = +new Date;
                this.logs.logMessage(this.logs.INFO, "Backed up database " + dblist[x] + ", took " + (end-start) + "ms.");
            }

            if (cmd.flags.purge) for (var x in dblist)
            {
//                this.io.purgeDB(dblist[x]);
                this.logs.logMessage(this.logs.WARN, "(PURGE DISABLED)" );// Purged database " + dblist[x]);
            }
        }
    }
});
