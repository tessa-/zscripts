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
(function () { return {
    require: ["commands", "security", "profile", "com", "theme", "time", "logs", "text", "util"]
    ,
    filters: []
    ,
    capture: new Object
    ,
    registerCapture: function (src, func, object)
    {
        if (!this.capture[src]) this.capture[src] = [];

        var capper = this.util.bind(object, func);

        this.capture[src].push(capper);
        object.onUnloadModule( this.util.bind(
            this,
            function ()
            {
                this.filters.splice(this.filters.indexOf(capper), 1);
            }
        ));

        // sys.sendHtmlMessage(src, "<span style=\"background-color:#000000; color:white\">&nbsp;INTERACTIVE MODE ACTIVE&nbsp;</span>");
    }
    ,
    beforeChatMessage: function beforeChatMessage (src, msg, chan)
    {
        if (msg.length == 0) return;

        if (this.capture[src] && this.capture[src].length >= 1)
        {
            sys.sendHtmlMessage(src, "<span style=\"background-color:#000000; color:white\">:"+ this.text.escapeHTML(msg));
            sys.stopEvent();
            var f = this.capture[src].pop();

            f.call(new Object, src, msg, chan);

            return;
        }
        
        if (msg[0] == "/")
        {
            this.logs.logMessage(this.logs.USER, "" + sys.name(src) + "["+chan+"] " + msg);
            sys.stopEvent();
            this.commands.issueCommand(src, msg, chan);
            return;
        }

        var prof = this.profile.profileID(src);
        
        if (sys.auth(src) != 3 && this.security.profIsMuted(prof))
        {
            var mute = this.security.getMute(prof);
            
            this.com.message(
                [src],
                "You are muted. "+
                    (mute.expires ? new Date(mute.expires).toString() + " ("+this.time.diffToStr(mute.expires - +new Date)  +" from now)" : "indefinite" )+
                    " Reason: " + mute.reason +
                    " Mute Author: " + mute.author
                ,
                this.theme.WARN
            );
            
            this.logs.logMessage(this.logs.INFO, "Muted message from "+sys.name(src)+": " + msg);
            sys.stopEvent();
            
            return;
        }

        var m = msg;

        for (var x in this.filters)
        {
            m = this.filters[x](src, msg, chan);

            if (!m) break;
        }

        if (m) 
        {
            sys.broadcast(m, chan, src, false, -1);
            //this.com.broadcast("<timestamp /><b>" +sys.name(src) + ":</b> " + this.text.escapeHTML(m), -1, true, [chan]);
        }
        sys.stopEvent();
        
    }
    ,
    registerFilter: function (filter, object)
    {
        var filt = filter;
        this.filters.push(filt);
        object.onUnloadModule( this.util.bind(
            this,
            function ()
            {
                this.filters.splice(this.filters.indexOf(filt), 1);
            }
        ));
    }
    ,
    loadModule: function loadModule ()
    {
        this.script.registerHandler("beforeChatMessage", this);
    }
}})();
