({
    bind: function (obj, func)
    {
        return function ()
        {
            func.apply(obj, arguments);
        }
    
    }
    ,
    shuffle: function (array)
    {
        // fisheryates
        var i = array.length;
        var temp;
        var rand;

        for (var i = array.length; i;) 
        {
            rand = Math.floor(Math.random() * i--);
            temp = array[i];
            array[i] = array[rand];
            array[rand] = temp;
        }      
    }
});
