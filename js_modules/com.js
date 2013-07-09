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
    require: ["text", "theme", "util"]
    ,
    message: function (usrs, msg, type, html, chans, servercode )
    {
        usrs = this.util.arrayify(usrs);
        var fmt_msg = this.theme.formatAs(this.escapeHtmlBool(msg, html), type || 0);
        if (!chans)
        {
            for (var x in usrs)
            {
                sys.sendHtmlMessage(usrs[x], fmt_msg );
            }
        }
        else
        {
            for (var x1 in usrs) 
            {
                for (var x2 in chans)
                {
                    sys.sendHtmlMessage(usrs[x1], fmt_msg, chans[x2]);
                }
            }
        }

        if (typeof servercode == "undefined") return;

        print(servercode + " " + this.theme.scriptText + this.stripHtmlBool(msg, html));

        
    }
    ,
    broadcast: function (msg, type, html, chans)
    {
        var usrs = new Object;
        var channames = [];

        if (chans) for (var x in chans)
        {
            channames.push("[#" + sys.channel(chans[x]) +"] ");
        }

        var fmt_msg = this.theme.formatAs(this.escapeHtmlBool(msg, html), type || 0);
        if (chans)
        {
            for (var x1 in chans)
            {
                var ids = sys.playersOfChannel(chans[x1]);
                
                for (var x2 in ids)
                {
                    usrs[ids[x2]] = null;
                }
            }
        }
        else
        {
            var t = sys.playerIds();

            for (var x in t)
            {
                usrs[t[x]] = null;
            }
        }

        usrs = Object.keys(usrs);
        
        if (!chans)
        {
            for (var x in usrs)
            {
                sys.sendHtmlMessage(usrs[x], fmt_msg );
            }
        }
        else
        {
            for (var x1 in usrs) 
            {
                for (var x2 in chans)
                {
                    sys.sendHtmlMessage(usrs[x1], fmt_msg, chans[x2]);
                }
            }
        }

       print(channames.join("") +  (type != -1 ? this.theme.scriptText : "") + this.stripHtmlBool(msg, html));
    }  
    ,
    escapeHtmlBool: function (text, bool)
    {
        if (bool) return text;
        
        return this.text.escapeHTML(text);
    }
    ,
    stripHtmlBool: function (text, bool)
    {
        if (bool) return this.text.stripHTML(text);
        
        return text;
    }
    ,
    loadModule: function ()
    {
    
    }
});

