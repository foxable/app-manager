"use strict";
exports.default = {
    type: "html",
    url: "https://nodejs.org/en/download/current/",
    getVersion: function($) {
        return $("p")
            .contains("Latest Current Version")
            .children("strong")
            .version("v@version");
    }
};
