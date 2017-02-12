"use strict";
exports.default = {
    type: "html",
    url: "https://www.libreoffice.org/download/download/",
    getVersion: function($) {
        return $("span.dl_version_number")
            .first()
            .text();
    }
};
