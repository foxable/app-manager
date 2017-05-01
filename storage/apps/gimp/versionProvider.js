"use strict";
exports.default = {
    type: "html",
    url: "https://www.gimp.org/downloads/",
    getVersion: function($) {
        return $("h2")
            .contains("Current Stable Version")
            .next()
            .find("b")
            .version();
    }
};
