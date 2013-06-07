({
    require: ["com", "theme"]
    ,
    logs: []
    ,
    DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3, CRITICAL: 4
    ,
    logMessage: function (level,msg)
    {
        
        if (level != 0) print("logmsg lv" + level + ": " +msg);
        this.logs.push([level, msg]);
        if (level >= 2)
        {
            var auths = [];
            sys.playerIds().forEach(function(i) { if (sys.auth(i) >= 2) auths.push(i); });

            this.com.message(auths, msg, this.theme.CRITICAL);
        } 
        else if (level == 1)
        {
            var auths = [];
            sys.playerIds().forEach(function(i) { if (sys.auth(i) == 3) auths.push(i); });

            this.com.message(auths, msg, this.theme.INFO);   
        }
        
        try 
        {
            sys.append("logs.txt", JSON.stringify([level, msg]));
        } catch (_) {}
    }


});
