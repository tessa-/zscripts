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
    ERROR: 2
    ,
    CRITICAL: 3
    ,
    formatAs: function (text)
    {
        return [
            function(){ return this.scriptHTML + text; }, 
            function(){ return this.warnHTML + text; }, 
            function(){ return this.warnHTML + "<font color=red><b>" + text+ "</b></font>"; }, 
        ][type](); 
    }
    
      
});
