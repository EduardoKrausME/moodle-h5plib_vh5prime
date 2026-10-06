// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * init.js
 *
 * @package   h5plib_vh5prime
 * @copyright 2026 Eduardo Kraus {@link https://eduardokraus.com}
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

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
