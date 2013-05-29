({
    loadModule: function()
    {
        script.registerHandler("escapeHTML", this.escapeHTML);
    }
    ,
    escapeHTML: function (html)
    {
        return html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
})
