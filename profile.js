({
require: ["io"]
, 
database: new Object

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

loadModule: function ()
{
    this.database = script.module.io.read("profile");

    this.relationaldatabase.ips = new Object;
    this.relationaldatabase.names = new Object;
    this.relationaldatabase.teams = new Object;

    if (!this.database.profiles) this.database.profiles = new Object;

    var this_database_profiles = this.database.profiles;
    for (var x1 in this_database_profiles)
    {
        var this_database_profiles__x1 = this_database_profiles[x1];

        var this_database_profiles__x1_names = this_database_profiles__x1.names || [];
        var this_database_profiles__x1_ips = this_database_profiles__x1.ips || [];
        // ignored for now // var this_database_profiles__x1_teams = this_database_profiles__x1.teams || [];

        for (var x2 in this_database_profiles__x1_names)
        {
            this.relationaldatabase.names[this_database_profiles__x1_names[x2]] = x1;
        }

        for (var x2 in this_database_profiles__x1_ips)
        {
            this.relationaldatabase.ips[this_database_profiles__x1_ips[x2]] = x1;
        }
        
    }
}
,
profilePlayer: function (src)
{
    var name = sys.name(src).toLowerCase();
    var ip = sys.ip(src);
    var team = null;
    var matches = {};

    if (ip in relationaldatabase.ips)
    {
        matches[relationaldatabase.ips[ip]] = true;
    }

    if ("$"+name in relationaldatabase.names)
    {
        matches[relationaldatabase.names["$"+name]] = true;
    }

    /*if (team != null && team in database.teams)
    {
        null;
    }*/

    var matches_list = Object.keys(matches);

    if (matches == 0)
    {
        // Code for new profile goes here.
    }
    /*
    else if (matches > 1)
    {
        //Code for multiple matches goes here.
    }
    */
    else 
    {
        return this.database.profiles[matches[0]];
    }
    
}
,
unloadModule: function ()
{

}

});
