({
    require: ["chat", "com", "theme"]
    ,
    less: function (src, msg, html)
    {
        var lines;

        if (!html) lines = msg.split(/\n/g);
        else lines = msg.split(/<\s*br\s*\/?>/g);

        var p = 0;

        var bind = this;

        function showPage()
        {

            for (var i = 0; i < 20 && i+20*p < lines.length; i++)
            {
                bind.com.message([src], lines[i+20*p], -1, html);
            }
            p++;
            
            if (p*20 >= lines.length)
            {
                bind.com.message([src], "<span style='color:white;background-color:black'>END OF TEXT.</span>", -1, true);
                return;
            }

            bind.com.message([src], "<span style='color:white;background-color:black'>END OF PAGE " + (p) +". TYPE 'NEXT' TO GO FORWARD, 'EXIT' TO QUIT.</span>", -1, true);

            bind.chat.registerCapture(src, handle, bind);
                
        }

        function handle (_, msg)
        {
            if (msg.toLowerCase() == "exit") return;

            if (msg.toLowerCase() == "next" || msg.toLowerCase() == "n")
            {
                showPage();
                return;
            }

            bind.com.message([src], "<span style='color:white;background-color:black'>UNKNOWN COMMAND.</span>", -1, true);
            bind.chat.registerCapture(src, handle, bind);
        }

        showPage();
    }
});
