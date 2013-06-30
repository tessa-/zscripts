({
    moves:
    {
        instakill: function (ctx)
        {
            for (var x in targets)
            {
                targets[x].hp = 0;
            }
        }
        ,
        physical: function (ctx)
        {
            var offense = ctx.attacker.offense;
            var base = ctx.movepower;

            
            for (var x in targets)
            {
                var defense = targets[x].defense;

                var damage = base + base * Math.min(Math.max(-0.90, Math.log(offense/defense)), 9);
                
                targets[x].hp -= damage | 0;
            }
        }
        ,
        heal: function (ctx, source, targets)
        {
            var base = ctx.movepower;

            for (var x in targets)
            {
                
                
            }
        }
    }
    
});
