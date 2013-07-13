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
/** Provides the less function
 * @name less
 * @memberOf script.modules
 * @namespace
 * */
/** @scope script.modules.less */
({
    require: ["chat", "com", "theme"]
    ,
    /** Less function
     * @param {Number} src User to send less to
     * @param msg The message to send
     * @param html If msg is html.
     */
    less: function (src, msg, html)
    {
        var lines;

        if (!html) lines = msg.split(/\n/g);
        else lines = msg.split(/<\s*br\s*\/?>/g);

        var p = 0;

        var bind = this;

        function showPage()
        {

            for (var i = 0; i < 20 && i+20*p < lines.length; i++)
            {
                bind.com.message([src], lines[i+20*p], -1, html);
            }
            p++;

            if (p*20 >= lines.length)
            {
                bind.com.message([src], "<span style='color:white;background-color:black'>END OF TEXT.</span>", -1, true);
                return;
            }

            bind.com.message([src], "<span style='color:white;background-color:black'>END OF PAGE " + (p) +". TYPE 'NEXT' TO GO FORWARD, 'EXIT' TO QUIT.</span>", -1, true);

            bind.chat.registerCapture(src, handle, bind);

        }

        function handle (_, msg)
        {
            if (msg.toLowerCase() == "exit") return;

            if (msg.toLowerCase() == "next" || msg.toLowerCase() == "n")
            {
                showPage();
                return;
            }

            bind.com.message([src], "<span style='color:white;background-color:black'>UNKNOWN COMMAND.</span>", -1, true);
            bind.chat.registerCapture(src, handle, bind);
        }

        showPage();
    }
});
