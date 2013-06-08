({
    require: ["reputation", "commands", "profile", "com"]
    ,
    reputation_cmd: 
    {
        desc: "Shows your reputation"
        ,
        perm: function () { return true }
        ,
        code: function (src, cmd, chan) 
        {
            var p = this.profile.profileOpenCreate(src);

            this.com.message([src], "Your reputation score is: " + this.reputation.database.users[p]);
            return;
        } 
    }
    ,
    loadModule: function ()
    {
        this.commands.registerCommand("reputation", this, "reputation_cmd");
    }
});
