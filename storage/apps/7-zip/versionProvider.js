"use strict";
exports.default = {
    type: "html",
    url: "http://www.7-zip.org/",
    getVersion: function($) {
        return $("h1")
            .siblings()
            .contains("Download")
            .first()
            .version("7-Zip @version");
    }
};
