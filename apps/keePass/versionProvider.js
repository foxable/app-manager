"use strict";
exports.default = {
    type: "html",
    url: "http://keepass.info/download.html",
    getVersion: function($) {
        return $("b")
            .filter((_, element) => $(element).text().indexOf("Professional Edition") > -1)
            .closest("p")
            .children("i")
            .text()
            .replace(/KeePass (.+)/, "$1");
    }
};
