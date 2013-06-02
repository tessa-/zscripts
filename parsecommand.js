({
    require: []
    ,
    loadModule: function()
    {
       
    }
    ,
    parseCommand: function (text)
    {
        var cmd = new Object;
        
        var match = text.match(/^(?:!|\/)([^\s]*)(?:\s+(.*))?/i);

        cmd.args = [];
        cmd.flags = {};

        if (!match) return cmd;

        cmd.name = match[1];
        cmd.input = match[2];

        var input = cmd.input;

        if (!input) return cmd;

        while (input != (input =
                         input.replace(/^\s*(?:\-{1,2}((?:\w|\\ )+)(?:\=(?:\"((?:\\.|[^\"])+)\"|((?:\w|\\ )+)))?)|(?:(?:\"((?:\\.|[^\"])+)\")|((?:\w|\\ )+))/, cl_next))
               //                                      ^flagname              ^flagvalstr        ^flagvalueraw             ^argvalstr         ^argvalraw
              ) {};
        
        function cl_next (text, flagname, flagvaluestr, flagvalueraw, argvaluestr, argvalueraw)
        {
            if (flagname)
            {
                var f = ((flagvaluestr ? flagvaluestr: void 0) || flagvalueraw);

                if (f)
                {
                    cmd.flags[flagname] = f.replace(/\\(.)/g, "$1");
                }
                else 
                {
                    cmd.flags[flagname] = true;
                }
            }
            else 
            {
                cmd.args.push(((argvaluestr === undefined ? argvaluestr: void 0) || argvalueraw).replace(/\\(.)/g, "$1"));
            }
            return "";
        }

        return cmd;
        
    }

});
