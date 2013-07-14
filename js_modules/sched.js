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
    timers: []
    ,
    needsSorting: false
    ,
    i: 0
    ,
    at: function (time, callback)
    {
        this.timers.push({time: time, callback: callback, id: this.i++});
        this.needsSorting = true;
    }
    ,
    step: function (callback)
    {
        if (this.needsSorting)
        {   
            this.timers.sort( function (a, b) { return a.time - b.time } );
            this.needsSorting = false;
        }

        var now = +new Date;

        for (var i = 0; i < this.timers.length; i++)
        {
            if (this.timers[i].time <= now)
            {
                this.timers[i].callback();
            }
            else
            {
                break;
            }
        }

        this.timers.splice(0, i);
    }
    ,
    loadModule: function ()
    {
        // var lock = this;

        //sys.setTimer(function() {lock.tick();}, 200, true);

        this.script.registerHandler("step", this);
    }
});
