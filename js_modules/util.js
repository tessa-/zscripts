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
    bind: function (obj, func)
    {
        return function ()
        {
            func.apply(obj, arguments);
        }
    
    }
    ,
    shuffle: function (array)
    {
        // fisheryates
        var i = array.length;
        var temp;
        var rand;

        for (var i = array.length; i;) 
        {
            rand = Math.floor(Math.random() * i--);
            temp = array[i];
            array[i] = array[rand];
            array[rand] = temp;
        }      
    }
    ,
    inspect: function (variant, exclude) 
    {
        // Rather complicated function, bear with it!
        var stack_frames = [];
        var refs = [];
        var o = 0;



        function serialize (variant)
        {
            if (typeof variant === "undefined")
            {
                return "<Undefined>";
            }

            if (variant === null)
            {
                return "<Null>";
            }

            if (typeof variant === "number")
            {
                return "<Number> " + variant;
            }
            
            if (typeof variant === "string")
            {
                return "<String> " + JSON.stringify(variant);
            }

            if (typeof variant === "function")
            {
                return "<Function> [[" + (variant.name?variant.name:"<anonymous>") + "]]"; 
            }

            if (typeof variant === "object")
            {
                var refidx = refs.indexOf(variant);

                var str = "";
                
                if (refidx === -1)
                {
                    refidx = refs.length;
                    refs.push(variant);                    
                }

                str += "<" + (variant instanceof Array ? "Array" : "Object") + " &" + refidx + ">";

               
                if (stack_frames.indexOf(variant) != -1)
                {
                    str += " [[Circular Reference]]";
                    return str;
                }

                if (refs.indexOf(variant) != refs.length - 1 )
                {
                    str += " [[Duplicate Reference]]";
                    return str;
                }

                str += "\n";

                for (var i = 0; i < stack_frames.length; i++) str += "    ";

                str += "{\n";

                stack_frames.push(variant);
             
                for (var x in variant)
                {
                    for (var i = 0; i < stack_frames.length; i++) str += "    ";
                    str += JSON.stringify(x) + ": " + serialize(variant[x]) + "\n";
                }

                stack_frames.pop();
                
                for (var i = 0; i < stack_frames.length; i++) str += "    ";
                str += "}";

                return str;
            }
        }

        return serialize(variant);
    }
});
