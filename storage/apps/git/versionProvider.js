"use strict";
exports.default = {
    type: "html",
    url: "https://git-scm.com/downloads/",
    getVersion: function($) {
        return $(".version")
            .version("@version");
    }
};
