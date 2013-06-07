({
    name: "Standard Input/Output"
    ,
    authors: ["ArchZombie0x"]
    ,
    require: []
    ,
    read: function (dbname) 
    {
        if (sys.exists(dbname+".jsqz"))
        {
            return sys.readObject(dbname + ".jsqz");
        }     

        return new Object;
    }
    ,
    readConfig: function (cfgname)
    {
        if (!sys.exists(dbname + ".json")) return new Object;

        return JSON.parse (sys.read(dbname + ".json"));
    }
    ,
    write: function (dbname, obj)
    {
        sys.writeObject(dbname + ".jsqz", obj, 5);
    }
    ,
    writeConfig: function (cfgname, val)
    {
        sys.write(cfgname + ".config.json", JSON.stringify(cfgname));
    }
});
