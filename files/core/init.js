const cid = Object.keys(H5PIntegration?.contents)[0];
if (cid != undefined && H5PIntegration.contents[cid]?.jsonContent != undefined) {
    $("#page").remove();
    $("body").html(`<div class="h5pc-mount" id="h5p-canvas"></div>`);

    window.__OTTFLIX_H5P_CANVAS__ = {
        mountSelector: "#h5p-canvas",
        activityId: `https://moodle.aulaemvideo.com.br/xapi/activity/${M.cfg.contextid}`,
        locale: H5PIntegration.contents[cid]?.metadata?.defaultLanguage,
        baseUrl: "./h5plib/vh5prime/files/core/h5prime/",
        endpoints: {},
        h5pJson: {
            mainLibrary: H5PIntegration.contents[cid]?.library,
            title: H5PIntegration.contents[cid]?.title,
            language: H5PIntegration.contents[cid]?.metadata?.defaultLanguage,
        },
        contentJson: JSON.parse(H5PIntegration.contents[cid]?.jsonContent),
        contentUserData: H5PIntegration.contents[cid]?.contentUserData,
        user: H5PIntegration.user,
        hosting: "moodle",
        playerOptions: {
            displaySummary: true,
            baseColor: "#0ea5a4",
            columnMode: "stack",
        },
    };

    H5P = {
        XAPIEvent: {
            prototype: {}
        }
    };
}
