({
    name: "Standard Input/Output"
    ,
    authors: ["ArchZombie0x"]
    ,
    require: []
    ,
    read: function (dbname) 
    {
        try 
        {
            var o = sys.readObject(dbname + ".jsqz");
            if (o) return o;
        }
        catch (e) {};       

        return new Object;
    }
    ,
    readConfig: function (cfgname)
    {
        var t = sys.getFileContent(dbname + ".json");
        if (!t) t = "{}";
        var o = JSON.parse(t);
    }
    ,
    write: function (dbname, obj)
    {
        sys.writeObject(dbname + ".jsqz", obj, 5);
    }
    ,
    writeConfig: function (cfgname, val)
    {
        sys.writeToFile(cfgname + ".config.json", JSON.stringify(cfgname));
    }
});
