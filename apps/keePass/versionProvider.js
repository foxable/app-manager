exports.default = {
    type: "html",
    url: "http://keepass.info/download.html",
    getVersion: function($) {
        return $("b")
            .filter(function(i, element) { return $(element).text().indexOf('Professional Edition') > -1; })
            .closest("p")
            .children("i")
            .text()
            .replace(/KeePass (.+)/, "$1");
    }
};
