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
    conversionFactors:
    {
        milisecond:1,
        ms: 1,
        second: 1000,
        s: 1000,
        sec: 1000,
        minute: 60000,
        min: 60000,
        hour: 3600000,
        hr: 3600000,
        day: 86400000,
        dy: 86400000,
        week: 604800000,
        wk: 604800000,
        month: 2678400000,
        mo: 2678400000,
        year: 31536000000,
        yr: 31536000000
    }
    ,
    diffToStr: function (diff)
    {
        var s = [];

        var years = (diff - (diff % 31536000000)) / 31536000000;
        diff -= years*31536000000;
        var months = (diff - (diff % 2678400000)) / 2678400000;
        diff -= months*2678400000;
        var weeks = (diff - (diff % 604800000)) / 604800000;
        diff -= weeks*604800000;
        var days = (diff - (diff % 86400000)) / 86400000;
        diff -= days*86400000;
        var hours = (diff - (diff % 3600000)) / 3600000;
        diff -= hours*3600000;
        var minutes = (diff - (diff % 60000)) / 60000;
        diff -= minutes*60000;
        var seconds = (diff - (diff % 1000)) / 1000;
        diff -= seconds*1000;
        var ms = diff;


        if (years)
        {
            s.push("" + years + " year" + (years==1?"":"s"));
        }


        if (months)
        {
            s.push("" + months + " month" + (months==1?"":"s"));
        }

        if (weeks)
        {
            s.push("" + weeks + " week" + (weeks==1?"":"s"));
        }

        if (days)
        {
            s.push("" + days + " day" + (days==1?"":"s"));
        }

        if (hours)
        {
            s.push("" + hours + " hour" + (hours==1?"":"s"));
        }

        if (minutes)
        {
            s.push("" + minutes + " minute" + (minutes==1?"":"s"));
        }

        if (seconds)
        {
            s.push("" + seconds + " second" + (seconds==1?"":"s"));
        }

        if (ms)
        {
            s.push("" + ms + " milisecond" + (ms==1?"":"s"));
        }

        return s.join(", ");
    }
        
    ,
    strToDiff: function (str)
    {
        var chunks = str.replace(/\.|\!/g,"").split(/\s*(?:,\s*and|and|,)\s*/g);
        var total = 0;
        
        for (var x in chunks)
        {
            var subchunks = chunks[x].split(/\s+/g);

            if (subchunks.length != 2) continue;

            var intv = 1;
            var mod = 1000;

            if (+subchunks[0] >= 0)
            {
                intv = +subchunks[0];
            }
            else if (subchunks[0] == "a" || subchunks[0] == "an")
            {
                intv = 1;
            }
            else continue;

            var other = subchunks[1].toLowerCase();
            
            if (other.charAt(other.length - 1) == "s" && !(other in this.conversionFactors))
            {
                other = other.slice(0, -1);
            }

            if (other in this.conversionFactors)
            {
                mod = this.conversionFactors[other];
            }
            else continue;
            
            total += mod*intv;
        }
        

        return total;
        
    }
});
