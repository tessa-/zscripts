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
    entityTick: function (e)
    {

        e.sta += e.maxsta/300;
        e.msta += e.maxmsta/60;

        // Stamina
        if (e.sp < 0)
            // No stamina
        {
            e.hp += e.sp;
            // Reduce the HP by the amount of missing stamina.

            e.sta = 0;
            // Reset stamina
        }
        if (e.sp > e.maxsp / 3)
            // Has a fairly large amount of stamina
        {
            hp += maxhp/600;
            // Recover some HP
        }
        if (e.sp > e.maxsp)
            // Too much stamina!
        {
            e.sp = e.maxsp;
            // Remove overflow
            
            hp += maxhp/300;
            // recover extra hp!
        }

        // Mental Stamina
        if (e.msta < 0)
            // No mental stamina
        {
            e.mp -= e.msta;
            e.hp -= e.msta;
            // Lose hp and mana

            e.msta = 0;
            // Reset
        }
        if (e.msta > e.maxmsta / 3)
            // Recover mana
        {
            e.mana += e.maxmana/100;
            // increase
        }

        // Mana
        if (e.mana < 0)
            // Not enough mana
        {
            e.sta += e.mana;
            e.msta += e.mana;
            // Decrease staminas

            e.mana = 0;
            // Reset mana;
        }
        if (e.mana > e.maxmana)
            // Too much mana
        {
            if (e.mana > e.maxmana *1.1) e.hp += e.maxmana*1.1 - e.mana;
            // Decrease HP by overflow, uncontrolable mana damages body!
            
            e.mana = e.maxmana;
            // Reset
        }

        // Health
        if (e.hp <= 0 && !e.invincible && (!e.undead && e.hp > -e.maxhp*5))
            // check for death
        {
            this.entityDie(e);
        }
        else if (e.hp > e.maxhp)
            // overflow
        {
            e.hp = e.maxhp;
            // reset
        }
        

        
    }
    
});
