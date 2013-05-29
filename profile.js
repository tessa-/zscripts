({
    require: ["io"]
    , 
    database: null
    /* <Object
       profiles: <Object Key:[<Int indexForProfile>] Value:[<Object profile>] >
       ,
       profile_counter: <INT>
       > */
    ,
    relationaldatabase: null
    /* <Object
       names: <Object Key:[<String "$"> + <String name>] Value:[<Int indexForProfile>] >
       ,
       ips: <Object Key:[<String ipaddr>] Value:[<Int indexForProfile>] >
    */
    ,

    loadModule: function ()
    {
        this.database = script.module.io.read("profile");

        if (!this.database.profiles) this.database.profiles = new Object;
        if (!this.database.profile_counter) this.database.profile_counter = 0;

        this.updateAllRelations();
    }
    ,
    updateAllRelations: function()
    {
        this.relationaldatabase = 
            {
                names: new Object,
                ips: new Object
            };
        
        for (var x in this.database.profiles)
        {
            this.updateProfileRelations(x);
        }
        
    }
    ,
    updateProfileRelations: function (id)
    {
        var prof = this.database.profiles[id];

        var prof_names = prof.names;
        var prof_ips = prof.ips;
        
        for (var x in prof_names)
        {
            this.relationaldatabase.names["$"+ prof_names[x]] = id;
        }
        
        for (var x in prof_ips)
        {
            this.relationaldatabase.ips[prof_ips[x]] = id;
        }
    }
    ,
    userProfile: function (src)
    {
        var name = sys.name(src).toLowerCase();
        var ip = sys.ip(src);
        var team = null;
        var matches = {};

        if (ip in this.relationaldatabase.ips)
        {
            matches[this.relationaldatabase.ips[ip]] = true;
        }

        if ("$"+name in this.relationaldatabase.names)
        {
            matches[this.relationaldatabase.names["$"+name]] = true;
        }

        /*if (team != null && team in database.teams)
          {
          null;
          }*/

        var matches_list = Object.keys(matches);

        if (matches_list.length == 0)
        {
            return +this.newProfile(src);// Code for new profile goes here.
        }
        
        else if (matches_list.length > 1)
        {
            this.mergeProfiles(matches_list);
        }
        
        var i = parseInt(matches_list[0]); 
        var prof = this.database.profiles[i];
        if (prof.names.indexOf(name) == -1) prof.names.push(name);

        if (prof.ips.indexOf(ip) == -1) prof.ips.push(ip);

        this.updateProfileRelations(i);

        return i;
        
        
    }
    ,
    newProfile: function (src)
    {
        var prof = new Object;
        var prof_id = this.database.profile_counter++;

        prof.names = [sys.name(src).toLowerCase()];
        prof.ips = [sys.ip(src)];

        this.database.profiles[prof_id] = prof;

        this.updateProfileRelations(prof_id);

        return prof_id;
    }
    ,
    mergeProfiles: function (list)
    {
        var origin = list[0];

        script.broadcast("Merging profiles " + JSON.stringify(list));

        for (var x1 in list)
        {
            for (var x2 in list[x1].names)
            {
                if (origin.names.indexOf(list[x1].names[x2] == -1))
                {
                    origin.names.push(list[x1].names[x2]);
                }
            }

            for (var x2 in list[x1].ips)
            {
                if (origin.ips.indexOf(list[x1].ips[x2] == -1))
                {
                    origin.ips.push(list[x1].ips[x2]);
                }                
            }
            
        }
    }
    ,
    unloadModule: function ()
    {
        script.module.io.write("profile", this.database);
    }

});
