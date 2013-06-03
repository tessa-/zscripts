({
    require: ["profile"]
    ,
    parseArgs: function (args)
    {
	var retval = {
	    profs: []
	    ,
	    uids: []
	};

	for (var x in args)
	{
	    if (args[x].length == 0) continue;

	    if (args[x][0] == "?")
	    {
		    var m = args[x].match(/^\?(\w+):(.+)$/);
            
            if (!m) continue;
            
            if (m[1] == "prof")
            {
                if ( m[2] in this.modulessprofile.database.profiles)
                {
                        profs.push (m[2]);
                }
            }
        }
        return retval;
	}
});
