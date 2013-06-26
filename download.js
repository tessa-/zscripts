({
    require: ["commands", "com", "util", "theme", "logs"]
    ,
    loadModule: function (src, cmd, chan)
    {
        this.commands.registerCommand("download", this);
    }
    ,
    download: 
    {
        desc: "Download a file.",
        ,
        options:
        {
            filename: "Where to download the file to."
            ,
            url: "URL to get the file from."
        }
        ,
        perm: function (src, cmd, chan)
        {
            return sys.auth(src) == 3;
        }
        ,
        code: function (src, cmd, chan)
        {
            var fname = cmd.flags.filename;

            var url = cmd.flags.url;

            if (!fname || !url) 
            {
                this.com.message([src], "Invalid filename or url", this.theme.WARN);
                return;
            }

            if (sys.exists(fname) && !cmd.flags.force)
            {
                this.com.message([src], "File already exists, must specifiy --force to overwrite", this.theme.WARN);
                return;
            }
            

            sys.webCall(url, this.util.bind(
                this,
                function _webcall_resp_handler_ (data) {
                    try {
                        sys.write(fname, data);
                        this.logs.logMessage(this.logs.INFO, "Downloaded " + url + " and saved to " + fname);
                        return;
                    }
                    catch (e) 
                    {
                        print(e.backtracetext);
                        print(e);
                    }
                })
            );                                   
        }
    }
});
