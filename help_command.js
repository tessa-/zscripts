({
    require: ["com", "theme", "chat", "util", "commands"]
    ,
    loadModule: function ()
    {
        this.commands.registerCommand("help", this);
    }
    ,
    help:
    {
        perm: function (src)
        {
            return true;
        }
        ,
        code: function (src, cmd, chan)
        {
            this.com.message([src], "What do you need help with?<br/>Using commands, type 1.<br/>Contacting server admins, type 2.<br/>Getting source code, type 3.<br/>Anything else, type 4.<br/>To cancel this and go back to the chat, type exit.</span>", this.theme.INFO, true);

            this.chat.registerCapture(src, this.helper_capturer, this);
        }
    }
    ,
    helper_capturer: function (src, msg, chan)
    {
        var emsg = msg.replace(/[\s\.\,\?\!]/g, "");
        if (emsg === "exit") return;
        
        if (emsg === "1") 
        {
            this.com.message(
                [src]
                ,
                "Commands can be used similar to optargs style, for example: " +
                    "<b><font color=grey>/</font><font color=blue>command</font> <font color=red>\"</font><font color=teal>name of player</font><font color=red>\"</font> "+
                    "<font color=green>--</font><font color=orange>reason</font><font color=purple>=</font>"+
                    "<font color=red>\"</font><font color=gold>reason goes here</font><font color=red>\"</font></b><br/>" +
                    "The grey <b>/</b> is the slash used to indicate you are typing a command.<br/>"+
                    "The blue <b>command</b> is the name of the command to use.<br/>"+
                    "The red <b>\"</b> are quotation marks, these show where a parameter begins and ends.<br/>"+
                    "The teal <b>name of player</b> is a standard parameter.<br/>"+
                    "The green <b>--</b> indicates the start of a <i>named flag</i>.<br/>"+
                    "The orange <b>reason</b> is the name of a named flag.<br/>"+
                    "The purple <b>=</b> is an assignment, associating a named flag with a parameter.<br/>"+
                    "The gold <b>reason goes here</b> is a parameter to the --reason named flag.<br/>"
                ,
                this.theme.INFO, true
            );

            this.com.message([src], "Type /cmdlist for a list of commands, include the --all option to list all commands.", this.theme.INFO, true);
            this.com.message([src], "What do you need help with?<br/>Using commands, type 1.<br/>Contacting server admins, type 2.<br/>Getting source code, type 3.<br/>Anything else, type 4.<br/>To cancel this and go back to the chat, type exit.</span>", this.theme.INFO, true);
            this.chat.registerCapture(src, "helper_capturer", this);
            return;
        }

        else if (emsg === "2")
        {
            this.com.message([src], "Admins have special pokeballs, look for great ball or higher!", this.theme.info);
            this.com.message([src], "What do you need help with?<br/>Using commands, type 1.<br/>Contacting server admins, type 2.<br/>Getting source code, type 3.<br/>Anything else, type 4.<br/>To cancel this and go back to the chat, type exit.</span>", this.theme.INFO, true);
            this.chat.registerCapture(src, "helper_capturer", this);
            return;
        }

        else if (emsg === "3")
        {
            script.AGPL(src, msg, chan);
            this.com.message([src], "What do you need help with?<br/>Using commands, type 1.<br/>Contacting server admins, type 2.<br/>Getting source code, type 3.<br/>Anything else, type 4.<br/>To cancel this and go back to the chat, type exit.</span>", this.theme.INFO, true);
            this.chat.registerCapture(src, "helper_capturer", this);
            return;
        }

        else if (emsg === "4")
        {
            this.com.message([src], "Go ask someone in the chat!", this.theme.INFO);
            return;
        }

        this.com.message([src], "Command not understood.", this.theme.INFO);
        this.com.message([src], "What do you need help with?<br/>Using commands, type 1.<br/>Contacting server admins, type 2.<br/>Getting source code, type 3.<br/>Anything else, type 4.<br/>To cancel this and go back to the chat, type exit.</span>", this.theme.INFO, true);
        this.chat.registerCapture(src, "helper_capturer", this);
   }
});
