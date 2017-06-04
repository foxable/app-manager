"use strict";
exports.default = {
    type: "html",
    url: "https://tortoisegit.org",
    getVersion: function($) {
        return $("h1")
            .contains("Releases")
            .next()
            .find("li")
            .contains("Stable")
            .version("Stable: @version");
    }
};
