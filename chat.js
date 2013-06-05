({
    require: ["commands"]
    ,
    beforeChatMessage: function (src, msg, chan)
    {
        if (msg.length == 0) return;

        if (msg[0] == "/")
        {
            script.log("" + sys.name(src) + "["+chan+"] " + msg);
            sys.stopEvent();
            this.commands.issueCommand(src, msg, chan);
            return;
        }

        
    }
    ,
    loadModule: function ()
    {
        script.registerHandler("beforeChatMessage", this);
    }
});
