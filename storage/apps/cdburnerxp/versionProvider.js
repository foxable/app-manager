"use strict";
exports.default = {
    type: "html",
    url: "https://www.cdburnerxp.se/en/download",
    getVersion: function($) {
        return $(".main-download h3 a small")
            .first()
            .version();
    }
};
