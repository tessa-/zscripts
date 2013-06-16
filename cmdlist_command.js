({
    require: ["commands", "com","text", "theme"]
    ,
    cmdlist: 
    {
        aliases: ["commands", "commandlist"]
        ,
        desc: "Lists the commands available to the user."
        ,
        options:
        {
            "all": "Also lists commands the user doesn't have permission to use"
        }
        ,
        perm: function ()
        {
            return true;
        }
        ,
        code: function (src, cmd)
        {
            var cmds = this.commands.commands_db;
            var com = this.com;
            var text = this.text;
            var msg = [];
            var sys_auth$src = sys.auth(src);

            for (var x in cmds)
            {

                if (cmds[x].name != x) continue;
                var canuse = sys_auth$src == 3 || cmds[x].perm.apply(cmds[x].bind, [src]);
                if (!cmd.flags.all && sys_auth$src != 3 && !canuse) continue;

                msg.push("<b>/" + text.escapeHTML(x) +"</b>" + (canuse?"":" (NO PERMISSION)") );
                if (cmds[x].desc) msg.push(cmds[x].desc);

                if (cmds[x].options)
                {
                    msg.push("Options:");
                    var options = cmds[x].options;

                    for (var x2 in options)
                    {
                        msg.push("&nbsp;&nbsp;&nbsp;&nbsp;--" + text.escapeHTML(x2) + "&nbsp;&nbsp;&nbsp;&nbsp;" + text.escapeHTML(options[x2]));
                    }
                }
            }
            
            com.message([src], "Commands list: <br/>" +msg.join("<br />"), this.theme.INFO, true);
        }
    }
    ,
    loadModule: function ()
    {
        this.commands.registerCommand("cmdlist", this);
    }
});
