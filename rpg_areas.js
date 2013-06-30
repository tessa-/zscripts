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
    areas:
    {
        town1:
        {
            name: "The town",
            adjc: ["town1west", "cliff1"]
        }
        ,
        town1west:
        {
            name: "Town West Side",
            adjc: ["town1"],
            digs: 
            {
                ironore: 0.5                
            }
        }
        ,
        cliff1:
        {
            name: "A cliff",
            adjc: ["town1"],
            mobs: 
            {
                chicken: 1
            }
        }
    }

});
