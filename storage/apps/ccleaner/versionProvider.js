"use strict";
exports.default = {
    type: "html",
    url: "https://www.piriform.com/ccleaner/version-history",
    getVersion: function($) {
        return $("h6")
            .first()
            .version("v@version");
    }
};
