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
 * h5peditor-boolean.js
 *
 * @package   h5plib_vh5prime
 * @copyright 2026 Eduardo Kraus {@link https://eduardokraus.com}
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/* global ns */
/**
 * Creates a boolean field for the editor.
 *
 * @param {mixed} parent
 * @param {object} field
 * @param {mixed} params
 * @param {function} setValue
 * @returns {ns.Boolean}
 */
ns.Boolean = function (parent, field, params, setValue) {
  if (params === undefined) {
    this.value = false;
    setValue(field, this.value);
  }
  else {
    this.value = params;
  }

  this.field = field;
  this.setValue = setValue;

  // Setup event dispatching on change
  this.changes = [];
  this.triggerListeners = function (value) {
    // Run callbacks
    for (var i = 0; i < this.changes.length; i++) {
      this.changes[i](value);
    }
  };
};

/**
 * Create HTML for the boolean field.
 */
ns.Boolean.prototype.createHtml = function () {
  const id = ns.getNextFieldId(this.field);
  const checked = (this.value !== undefined && this.value) ? ' checked' : '';
  let content = '<input id="' + id + '" type="checkbox"';
  if (this.field.description !== undefined) {
    content += ' aria-describedby="' + ns.getDescriptionId(id) + '"';
  }
  if (this.value !== undefined && this.value) {
    content += ' checked';
  }
  content += '/>';
  return ns.createBooleanFieldMarkup(this.field, content, id);
};

/**
 * "Validate" the current boolean field.
 */
ns.Boolean.prototype.validate = function () {
  return true;
};

/**
 * Append the boolean field to the given wrapper.
 *
 * @param {jQuery} $wrapper
 * @returns {undefined}
 */
ns.Boolean.prototype.appendTo = function ($wrapper) {
  var that = this;

  this.$item = ns.$(this.createHtml()).appendTo($wrapper);
  this.$input = this.$item.find('input');
  this.$errors = this.$item.find('.h5p-errors');

  this.$input.change(function () {
    // Validate
    that.value = that.$input.is(':checked');
    that.setValue(that.field, that.value);
    that.triggerListeners(that.value);
  });
};

/**
 * Remove this item.
 */
ns.Boolean.prototype.remove = function () {
  this.$item.remove();
};

// Tell the editor what widget we are.
ns.widgets['boolean'] = ns.Boolean;
