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
    scriptHTML: "<font color=blue><timestamp /><b>~Script~:</b></font> "
    ,
    scriptText: "~Script~: "
    ,
    warnHTML: "<font color=red><timestamp /><b>~Script~:</b></font> "
    ,
    warnText: "~Script~: "
    ,
    gameHTML: "<font color=green><timestamp /><b>~Script~:</b></font> "
    ,    
    INFO: 0
    ,
    WARN: 1
    ,
    CRITICAL: 2
    ,
    GAME: 3
    ,
    TOUR: 4
    ,
    formatAs: function (text, type)
    {
        switch (type)
        {
            case 0:
            return this.scriptHTML + text; 

            case 1:
            return this.warnHTML + text;

            case 2:
            return this.warnHTML + "<font color=red><b>" + text + "</b></font>";

            case 3:
            return this.gameHTML + text;
            
            case 4:
            return this.gameHTML + "<font color=green><b>" + text + "</b></font>";

            default:
            return text;
        }
    }
    
      
});
