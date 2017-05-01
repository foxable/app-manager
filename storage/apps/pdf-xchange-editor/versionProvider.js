"use strict";
exports.default = {
    type: "html",
    url: "https://www.tracker-software.com/product/pdf-xchange-editor/history",
    getVersion: function($) {
        return $(".build-title")
            .first()
            .find("a")
            .version("version @version release");
    }
};
