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
/** handles ~~Server~~: /bla bla
 * @name server
 * @memberOf script.modules
 * @namespace
 * */
/** @scope script.modules.server */
({
    onLoadModule: function ()
    {
        this.script.registerHandler("beforeServerMessage", this);
    }
    ,
    beforeServerMessage: function (msg)
    {
        if (msg.match(/^\//))
        {
            sys.stopEvent();
            //var command = msg.match(/^\/([^s]+](?:\s+(.+)?)?)?/);
            //var commandName = command[1];
            //var commandInput = command[2];

            var cmdObj = this.parsecommand.parseCommand(msg);
            var cmdName = cmdObj.name;

            if (!commandName)
            {
                print("[[~Script~]]: Please enter a command.");
                return;
            }

            if (!this.commands.serverCanUseCmd(cmdName))
            {
                print("[[~Script~]]: Sorry, but that command can't be used in the server console.");
            }

            cmdObj.code.call(cmdObj.bind, 0, cmdObj, -1);
        }
    }
});