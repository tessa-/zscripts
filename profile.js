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
getProfileID: function (src)
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
        //Code for multiple matches goes here.
    }
    else 
    {
        return +matches[0];
    }

    throw new Error("Unreachable");
    
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
unloadModule: function ()
{
    script.module.io.write("profile", this.database);
}

});
