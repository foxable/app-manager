"use strict";
exports.default = {
    type: "html",
    url: "http://www.xnview.com/en/xnviewmp/",
    getVersion: function($) {
        return $("#downloads p")
            .contains("Download")
            .find("strong")
            .version("XnView MP @version");
    }
};
