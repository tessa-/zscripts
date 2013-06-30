({
    battleStep: function (ctx)
    {
        var rpg = ctx.rpg;
        var name = ctx.battlename;

        var battle = ctx.battle = this.battles[name];

        var team_players = []; // Do not save!
        for (var x in battle.players)
        {
            team_players.push(this.players[battle.players[x]]);
            // Battle players contains NAMES of players, not the player objects!
        }

        var team_mobs = []; // Do not save!
        for (var x in battle.mobs)
        {
            team_mobs.push(battle.mobs[x]);
        }
        
        var entities = []; // Do not save!


        for (var x in team_players)
        {
            entities.push({type: "player", e: team_players[x]});
        }

        for (var x in team_players)
        {
            entities.push({type: "mob", e: team_mobs[x]});
        }

        entities.sort( 
            function _sorting_function_ (a, b)
            {
                return a.speed - b.speed;
            }
        );

        battleLoop: for (var x in entities)
        {
            var attacker = ctx.attacker = entities[x].e;
            //ctx.attackerIsPlayer = entities[x].type == "player";
            var move = ctx.move = this.pickMove(entities[x]);

            if (ctx.move.cost) for (var x2 in ctx.move.cost)
            {
                if (ctx.attacker[(x2 === "mp"? "mana" : x)] -= ctx.move.cost[x2] < 0) 
                {
                    ctx.out(ctx.attacker.name + " tried to use "  + ctx.move.name + " but didn't have enough " + this.longStatName[x2 === "mp" ? "mana" : "mp"]);
                    continue battleLoop;
                }           
            }
            
            for (var x2 in ctx.move.components)
            {
                var cmp = ctx.move.components[x2];
                var targets = ctx.targets = [];
                switch (typeof cmp.target)
                {
                case "object":
                    // Array
                    if (cmp.target.indexOf("ally") != -1) ctx.targets = ctx.targets.concat(team_players);
                    if (cmp.target.indexOf("opp") != -1) ctx.targets = ctx.targets.concat(team_mobs);
                    if (cmp.target.indexOf("self") != -1 && ctx.indexOf(ctx.attacker) == -1) ctx.targets.push(ctx.attacker);
                    break;
                case "string":
                    switch (ctx.move.type)
                    {
                        case "ally": ctx.targets = team_players;
                        case "self": ctx.targets = [attacker];
                    }
                }

                this.util.shuffle(targets);
                
                for (var x3 in targets)
                {
                    
                }
                
            }
            
            this.moves[ctx.move.type]
        }
        
    }
    
});