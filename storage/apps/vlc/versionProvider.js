"use strict";
exports.default = {
    type: "html",
    url: "https://www.videolan.org/vlc/",
    getVersion: function($) {
        return $("#downloadVersion")
            .version();
    }
};
