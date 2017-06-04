"use strict";
exports.default = {
    type: "html",
    url: "https://inkscape.org/en/download/windows/",
    getVersion: function($) {
        return $("h2")
            .contains("Latest stable version")
            .version("Inkscape @version");
    }
};
