"use strict";
exports.default = {
    type: "html",
    url: "http://keepass.info/download.html",
    getVersion: function($) {
        return $("b")
            .contains("Professional Edition")
            .closest("p")
            .children("i")
            .version("KeePass @version");
    }
};
