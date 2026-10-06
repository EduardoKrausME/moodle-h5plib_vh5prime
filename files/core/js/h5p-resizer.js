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
 * h5p-resizer.js
 *
 * @package   h5plib_vh5prime
 * @copyright 2026 Eduardo Kraus {@link https://eduardokraus.com}
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

// H5P iframe Resizer
(function () {
    if (!window.postMessage || !window.addEventListener || window.h5pResizerInitialized) {
        return; // Not supported
    }
    window.h5pResizerInitialized = true;

    // Map actions to handlers
    var actionHandlers = {};

    /**
     * Prepare iframe resize.
     *
     * @private
     * @param {Object} iframe Element
     * @param {Object} data Payload
     * @param {Function} respond Send a response to the iframe
     */
    actionHandlers.hello = function (iframe, data, respond) {
        // Make iframe responsive
        iframe.style.width = '100%';

        // Bugfix for Chrome: Force update of iframe width. If this is not done the
        // document size may not be updated before the content resizes.
        iframe.getBoundingClientRect();

        // Tell iframe that it needs to resize when our window resizes
        var resize = function () {
            if (iframe.contentWindow) {
                // Limit resize calls to avoid flickering
                respond('resize');
            } else {
                // Frame is gone, unregister.
                window.removeEventListener('resize', resize);
            }
        };
        window.addEventListener('resize', resize, false);

        // Respond to let the iframe know we can resize it
        respond('hello');
    };

    /**
     * Prepare iframe resize.
     *
     * @private
     * @param {Object} iframe Element
     * @param {Object} data Payload
     * @param {Function} respond Send a response to the iframe
     */
    actionHandlers.prepareResize = function (iframe, data, respond) {
        // Do not resize unless page and scrolling differs
        if (iframe.clientHeight !== data.scrollHeight ||
            data.scrollHeight !== data.clientHeight) {

            // Reset iframe height, in case content has shrinked.
            iframe.style.height = data.clientHeight + 'px';
            respond('resizePrepared');
        }
    };

    /**
     * Resize parent and iframe to desired height.
     *
     * @private
     * @param {Object} iframe Element
     * @param {Object} data Payload
     * @param {Function} respond Send a response to the iframe
     */
    actionHandlers.resize = function (iframe, data) {
        // Resize iframe so all content is visible. Use scrollHeight to make sure we get everything
        iframe.style.height = data.scrollHeight + 'px';
    };

    /**
     * Keyup event handler. Exits full screen on escape.
     *
     * @param {Event} event
     */
    var escape = function (event) {
        if (event.keyCode === 27) {
            exitFullScreen();
        }
    };

    // Listen for messages from iframes
    window.addEventListener('message', function receiveMessage(event) {
        if (event.data.context !== 'h5p') {
            return; // Only handle h5p requests.
        }

        // Find out who sent the message
        var iframe, iframes = document.getElementsByTagName('iframe');
        for (var i = 0; i < iframes.length; i++) {
            if (iframes[i].contentWindow === event.source) {
                iframe = iframes[i];
                break;
            }
        }

        if (!iframe) {
            return; // Cannot find sender
        }

        // Find action handler handler
        if (actionHandlers[event.data.action]) {
            actionHandlers[event.data.action](iframe, event.data, function respond(action, data) {
                if (data === undefined) {
                    data = {};
                }
                data.action = action;
                data.context = 'h5p';
                event.source.postMessage(data, event.origin);
            });
        }
    }, false);

    // Let h5p iframes know we're ready!
    var iframes = document.getElementsByTagName('iframe');
    var ready = {
        context: 'h5p',
        action: 'ready'
    };
    for (var i = 0; i < iframes.length; i++) {
        if (iframes[i].src.indexOf('h5p') !== -1) {
            iframes[i].contentWindow.postMessage(ready, '*');
        }
    }

})();
