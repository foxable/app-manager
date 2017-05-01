"use strict";
exports.default = {
    type: "html",
    url: "https://notepad-plus-plus.org/",
    getVersion: function($) {
        return $("#download span")
            .version();
    }
};
