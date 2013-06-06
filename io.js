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
        
        var t = sys.getFileContent(dbname + ".json");
        if (!t) t = "{}";
        var o = JSON.parse(t);

        return o;
    }       
    ,
    write: function (dbname, obj, fast)
    {
        sys.writeObject(dbname + ".jsqz", obj, (fast ? 5 : 3));
    }
});
