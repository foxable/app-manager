"use strict";
exports.default = {
    type: "html",
    url: "https://cryptomator.org/downloads/",
    getVersion: function($) {
        return $("h2")
            .contains("Cryptomator for Windows")
            .next()
            .version("Version @version");
    }
};
