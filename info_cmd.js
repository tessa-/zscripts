({
    require: ["profile", "com", "text", "commands", "theme"]

    ,

    info:
    {
        desc: "Shows information about users"
        ,
        perm: function (src)
        {
            return sys.auth(src) >= 1;
        }
        ,
        code: function (src, cmd)
        {
            var profids = [];
            for (var x in cmd.args)
            {
                var test = this.profile.profileByName(cmd.args[x]);
                if (test == -1) test = this.profile.profileByIP(cmd.args[x]);
                
                if (test == -1) 
                {
                    this.com.message([src], "Can't find user " + cmd.args[x], this.theme.WARN);
                    continue;
                }
                
                profids.push(test);
            }
            
            var m = [];
            for (var x in profids)
            {
                m.push("<b>Info about profile #" + this.text.escapeHTML(profids[x]) + ":</b>");

                m.push("Last used name: " + this.text.escapeHTML(""+this.profile.database.profiles[profids[x]].lastName));
                m.push("Last used IP: " + this.text.escapeHTML(""+this.profile.database.profiles[profids[x]].lastIP));
                m.push("Names: " + this.text.escapeHTML(""+JSON.stringify(this.profile.profileNames(profids[x]))));
                m.push("IP Addresses: " + this.text.escapeHTML(""+JSON.stringify(this.profile.profileIPs(profids[x]))));                       
            }

            this.com.message([src], "<br/>"+m.join("<br/>"), this.theme.INFO, true);
        }
    }
    ,
    loadModule: function()
    {
        this.commands.registerCommand("info", this);
    }
});
