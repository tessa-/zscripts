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
        
        var match = text.match(/^(?:!|\/)([^\s]*)\s+(.*)/i);

        cmd.name = match[1];
        cmd.input = match[2];

        cmd.args = [];
        cmd.flags = {};

        var input = cmd.input;

        while (input != (input =
                         input.replace(/^\s*(?:\-{1,2}((?:\w|\\ )+)(?:\=(?:\"((?:\\.|[^\"])+)\"|((?:\w|\\ )+)))?)|(?:(?:\"((?:\\.|[^\"])+)\")|((?:\w|\\ )+))/, cl_next))
               //                                      ^flagname              ^flagvalstr        ^flagvalueraw             ^argvalstr         ^argvalraw
              ) {};
        
        function cl_next (text, flagname, flagvaluestr, flagvalueraw, argvaluestr, argvalueraw)
        {
            if (flagname)
            {
                cmd.flags[flagname] = ((flagvaluestr ? flagvaluestr: void 0) || flagvalueraw).replace(/\\(.)/g, "$1");
            }
            else 
            {
                cmd.args.push(((argvaluestr? argvaluestr: void 0) || argvalueraw).replace(/\\(.)/g, "$1"));
            }
            return "";
        }

        return cmd;
        
    }

});
