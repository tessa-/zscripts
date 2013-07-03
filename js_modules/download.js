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
    require: ["commands", "com", "util", "theme", "logs"]
    ,
    loadModule: function (src, cmd, chan)
    {
        this.commands.registerCommand("download", this);
    }
    ,
    download: 
    {
        desc: "Download a file."
        ,
        options:
        {
            filename: "Where to download the file to."
            ,
            url: "URL to get the file from."
        }
        ,
        perm: function (src, cmd, chan)
        {
            return sys.auth(src) == 3;
        }
        ,
        code: function (src, cmd, chan)
        {
            var fname = cmd.flags.filename;

            var url = cmd.flags.url;

            if (!fname || !url) 
            {
                this.com.message([src], "Invalid filename or url", this.theme.WARN);
                return;
            }

            if (sys.fileExists(fname) && !cmd.flags.force)
            {
                this.com.message([src], "File already exists, must specifiy --force to overwrite", this.theme.WARN);
                return;
            }
            

            sys.webCall(url, this.util.bind(
                this,
                function _webcall_resp_handler_ (data) {
                    try {
                        sys.write(fname, data);
                        this.logs.logMessage(this.logs.INFO, "Downloaded " + url + " and saved to " + fname);
                        return;
                    }
                    catch (e) 
                    {
                        print(e.backtracetext);
                        print(e);
                    }
                })
            );                                   
        }
    }
});
