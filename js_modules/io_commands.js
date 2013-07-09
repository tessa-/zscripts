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
               
            }

            if (cmd.flags.commit) for (var x in dblist) 
            {
                var start = +new Date;
                this.io.commitDB(dblist[x]);
                var end = +new Date;
                
            }

            if (cmd.flags.backup) for (var x in dblist) 
            {
                var start = +new Date;
                this.io.backupDB(dblist[x]);
                var end = +new Date;
                
            }

            if (cmd.flags.purge) for (var x in dblist)
            {
                this.io.purgeDB(dblist[x]);
            }
        }
    }
});
