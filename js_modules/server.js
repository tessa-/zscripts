({
    onLoadModule: function ()
    {
        this.script.registerHandler("beforeServerMessage", this);
    }
    ,
    beforeServerMessage: function (msg)
    {
        if (msg.match(/^\//))
        {
            sys.stopEvent();
            //var command = msg.match(/^\/([^s]+](?:\s+(.+)?)?)?/);
            //var commandName = command[1];
            //var commandInput = command[2];

            var cmdObj = this.parsecommand.parseCommand(msg);
            var cmdName = cmdObj.name;

            if (!commandName)
            {
                print("[[~Script~]]: Please enter a command.");
                return;
            }

            if (!this.commands.serverCanUseCmd(cmdName))
            {
                print("[[~Script~]]: Sorry, but that command can't be used in the server console.");
            }

            cmdObj.code.call(cmdObj.bind, 0, cmdObj, -1);
        }
    }
});