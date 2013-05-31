({
    escapeHTML: function (html)
    {
        return html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    ,
    stripHTML: function (html)
    {
        return html.replace(/<\/[A-Za-z]+\s*\/?>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
    }
});
