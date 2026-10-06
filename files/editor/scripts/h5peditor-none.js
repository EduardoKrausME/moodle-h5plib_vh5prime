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
 * h5peditor-none.js
 *
 * @package   h5plib_vh5prime
 * @copyright 2026 Eduardo Kraus {@link https://eduardokraus.com}
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/* global ns */
/**
 * Create a field without html
 *
 * @param {mixed} parent
 * @param {object} field
 * @param {mixed} params
 * @param {function} setValue
 */
ns.None = function (parent, field, params, setValue) {
  this.parent = parent;
  this.field = field;
  this.params = params;
  this.setValue = setValue;
};

/**
 * Implementation of appendTo
 *
 * None doesn't append anything
 */
ns.None.prototype.appendTo = function () {};

/**
 * Implementation of validate
 *
 * None allways validates
 */
ns.None.prototype.validate = function () {
  return true;
};

/**
 * Collect functions to execute once the tree is complete.
 *
 * @param {function} ready
 */
ns.None.prototype.ready = function (ready) {
  this.parent.ready(ready);
};

/**
 * Remove this item.
 */
ns.None.prototype.remove = function () {
  ns.removeChildren(this.children);
};

// Tell the editor what widget we are.
ns.widgets.none = ns.None;
