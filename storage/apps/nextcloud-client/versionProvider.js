"use strict";
exports.default = {
    type: "html",
    url: "https://nextcloud.com/install/",
    getVersion: function($) {
        return $("#tab-desktop p")
            .first()
            .version("Latest stable version: @version");
    }
};
