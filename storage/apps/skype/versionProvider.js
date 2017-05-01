"use strict";
exports.default = {
    type: "html",
    url: "http://www.chip.de/downloads/Skype_13010241.html",
    getVersion: function($) {
        return $(".dl-version")
            .version("Version @version");
    }
};
