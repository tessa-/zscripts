({
    require: ["commands"]
    ,
    beforeNewMessage: function (src, msg, chan)
    {
        if (msg.length == 0) return;

        if (msg[0] == "/")
        {
            sys.stopEvent();
            script.module.commands.issueCommand(src, msg, chan);
            return;
        }
    }
    ,
    loadModule: function ()
    {
        script.registerHandler("beforeNewMessage", this.beforeNewMessage);
    }
});
