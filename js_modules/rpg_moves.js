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
     ,
     pickMove: function (e)
     {
         var plan = e.plan;

         var list = plan.list;
         var total = plan.total;
         var idx = Math.floor(Math.random()*(plan.total));

         for (var i = 0; list[i].pri <= idx; i++, idx -= list[i].pri) {}

         return list[i];
     }
 });
