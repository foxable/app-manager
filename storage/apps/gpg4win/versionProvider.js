"use strict";
exports.default = {
    type: "html",
    url: "https://www.gpg4win.org/download.html",
    getVersion: function($) {
        return $("h2")
            .version("Gpg4win @version");
    }
};
