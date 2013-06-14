/*
profile.js

Implements:

profileMatches(src):
  Returns a list of all the profile IDs the player matches

profileID(src):
  Returns a single ID for the player. If there are multiple matches,
  it merges them together. If there are none, it creates a new profile

profileByName(name):
  Returns if any profile matches this name, the profile ID, otherwise -1

profileByIp(ipaddr):
  Returns a matching profile ID, otherwise -1

trace(profid):
  When profiles are merged one profile will take precedence, but the others
  will still exist

profileUpdateInfo(prof, src):
  Updates profile information


*/


({
    require: ["io", "logs"]
    , 
    database: null
    /* <Object
       profiles: <Object Key:[<Int indexForProfile>] Value:[<Object profile>] >
       ,
       profile_counter: <INT>
       > */
    ,
    relationaldatabase: new Object
    /* <Object
       names: <Object Key:[<String "$"> + <String name>] Value:[<Int indexForProfile>] >
       ,
       ips: <Object Key:[<String ipaddr>] Value:[<Int indexForProfile>] >
    */
    ,
    users: new Object
    ,
    loadModule: function ()
    {
        this.database = this.io.openDB("profile");

        if (!this.database.profiles) this.database.profiles = new Object;
        if (!this.database.profile_counter) this.database.profile_counter = 0;

        var uids = sys.playerIds();
        

        this.updateAllRelations(); 

        for (var x in uids)
        {
            this.registerPlayer(uids[x]);
        }

        
    }
    ,
    unloadModule: function ()
    {
        this.io.closeDB("profile");
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
    profileID: function (src)
    {
        var _;

        if (_ = this.users[src]) return _;

        else 
        {
            return this.users[src] = this.registerPlayer(src);
        }
    }
    ,
    lastName: function (prof)
    {
        return this.database.profiles[prof].lastName;
    }
    ,
    profileNames: function (prof)
    {
        return this.database.profiles[prof].names;
    }
    ,
    profileIPs: function (prof)
    {
        return this.database.profiles[prof].ips;
    }
    ,
    updateProfileRelations: function (id)
    {
        var prof = this.database.profiles[id];

        if (prof.mergedInto) return;

        var prof_names = prof.names;
        var prof_ips = prof.ips;
        
        for (var x in prof_names)
        {
            if (!("$"+ prof_names[x] in this.relationaldatabase.names)) this.relationaldatabase.names["$"+ prof_names[x]] = id;

            else if (this.relationaldatabase.names["$"+prof_names[x]] != id) this.logs.logMessage(this.logs.ERROR, "Error condition, multimatch on profile #" + id);
        }
        
        for (var x in prof_ips)
        {
            if (!(prof_ips[x] in this.relationaldatabase.ips)) this.relationaldatabase.ips[prof_ips[x]] = id;

            else if (this.relationaldatabase.ips[prof_ips[x]] != id) this.logs.logMessage(this.logs.ERROR, "Error condition, multimatch on profile #" + id);
        }
    }
    ,
    profileMatches: function (src)
    {
        var sys_name$src = sys.name(src);
        var name = sys_name$src.toLowerCase();
        var ip = sys.ip(src);
        var matches = new Object;

        if (ip in this.relationaldatabase.ips)
        {
            matches[this.relationaldatabase.ips[ip]] = null;
        }

        if ("$"+name in this.relationaldatabase.names)
        {
            matches[this.relationaldatabase.names["$"+name]] = null;
        }

        return Object.keys(matches);
    }
    ,
    profileUpdateInfo: function (profid, src)
    {
        var prof = this.database.profiles[profid];
        var sys_name$src = sys.name(src);
        var sys_ip$src = sys.ip(src);

        if (prof.names.indexOf(sys_name$src.toLowerCase()) == -1) prof.names.push(sys_name$src.toLowerCase());

        if (prof.ips.indexOf(sys_ip$src) == -1) prof.ips.push(sys_ip$src);

        prof.lastName = sys_name$src;
        prof.lastIP = sys_ip$src;

        this.updateProfileRelations(profid);

        return;
    }
    ,
    registerPlayer: function(src)
    { 

        var matchesList = this.profileMatches(src);

        if (matchesList.length == 0)
        {
            var p = this.newProfile(src);
            this.profileUpdateInfo(p, src);
            return p;
        }
        
        else if (matchesList.length > 1)
        {
            this.logs.logMessage(this.logs.INFO, "Merging profiles " + JSON.stringify(matchesList));
            this.mergeProfiles(matchesList);
        }
        
        var i = parseInt(matchesList[0]); 
        var prof = this.database.profiles[i];   

        this.profileUpdateInfo(i, src);

        return i;
    }
    ,
    profileByIP: function (ip)
    {
        if (ip in this.relationaldatabase.ips) return this.relationaldatabase.ips[ip];

        else return -1;
    }
    ,
    profileByName: function (n)
    {
        var name = "$"+ n.toLowerCase();
        if (name in this.relationaldatabase.names) return this.relationaldatabase.names[name];

        else return -1;        
    }
    ,
    newProfile: function (src)
    {
        var prof = new Object;
        var prof_id = this.database.profile_counter++;

        prof.names = [];
        prof.ips = [];
        this.database.profiles[prof_id] = prof;

        return prof_id;
    }
    ,
    trace: function (prof)
    {
        var p = this.database.profiles[prof];

        var idx = prof;
        while (p.mergedInto)
        {
            idx = p.mergedInto;
            p = this.database.profiles[p.mergedInto];
        }

        return idx;
    }
    ,
    mergeProfiles: function (list)
    {
        var origin = this.database.profiles[list[0]];

        this.logs.logMessage(this.logs.WARN, "Merging profiles " + JSON.stringify(list));

        for (var x1 in list)
        {
            if (x1 == 0) continue;

            this.database.profiles[list[x1]].mergedInto = list[0];
            for (var x2 in this.database.profiles[list[x1]].names)
            {
                if (origin.names.indexOf(this.database.profiles[list[x1]].names[x2]) == -1)
                {
                    origin.names.push(this.database.profiles[list[x1]].names[x2]);
                }
            }

            for (var x2 in this.database.profiles[list[x1]].ips)
            {
                if (origin.ips.indexOf(this.database.profiles[list[x1]].ips[x2]) == -1)
                {
                    origin.ips.push(this.database.profiles[list[x1]].ips[x2]);
                }                
            }
            
        }
    }

});
