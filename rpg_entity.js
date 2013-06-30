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
