({
    scriptHTML: "<font color=blue><timestamp /><b>~Script~:</b></font> "
    ,
    scriptText: "~Script~: "
    ,
    warnHTML: "<font color=red><timestamp /><b>~Script~:</b></font> "
    ,
    warnText: "~Script~: "
    ,
    INFO: 0
    ,
    WARN: 1
    ,
    CRITICAL: 2
    ,
    formatAs: function (text, type)
    {
        switch (type)
        {
            case 0:
            return this.scriptHTML + text; 

            case 1:
            return this.warnHTML + text;

            case 2:
            return this.warnHTML + "<font color=red><b>" + text + "</b></font>";

            default:
            return text;
        }
    }
    
      
});
