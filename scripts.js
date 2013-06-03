sys.sendAll(JSON.stringify(script));
var s = eval(sys.getFileContent("main.js"));

sys.sendAll(JSON.stringify(s));

s
