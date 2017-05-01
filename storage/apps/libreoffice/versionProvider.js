"use strict";
exports.default = {
    type: "html",
    url: "https://www.libreoffice.org/download/download/",
    getVersion: function($) {
        return $(".dl_version_number")
            .first()
            .version();
    }
};
