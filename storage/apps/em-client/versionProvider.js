"use strict";
exports.default = {
    type: "html",
    url: "http://www.emclient.com/release-history",
    getVersion: function($) {
        return $("h2")
            .first()
            .version();
    }
};
