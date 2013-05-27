({
    name: "Standard Input/Output"
    ,
    authors: ["ArchZombie0x"]
    ,
    require: []
    ,
    read: function (dbname) 
    {
        var t = sys.getFileContent(dbname + ".json");
        if (!t) t = "{}";
        var o = JSON.parse(t);

        return o;
    }       
    ,
    write: function (dbname, obj)
    {
        var t = JSON.stringify(obj);

        sys.writeToFile(dbname + ".json", t);
    }
});
