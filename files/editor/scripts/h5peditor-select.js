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
 * h5peditor-select.js
 *
 * @package   h5plib_vh5prime
 * @copyright 2026 Eduardo Kraus {@link https://eduardokraus.com}
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/* global ns*/
H5PEditor.widgets.select = H5PEditor.Select = (function (E) {
  /**
   * Initialize a new widget.
   *
   * @param {object} parent
   * @param {object} field
   * @param {object} params
   * @param {function} setValue
   * @returns {_L3.C}
   */
  function C(parent, field, params, setValue) {
    this.field = field;
    this.value = params;
    this.setValue = setValue;

    // Setup event dispatching on change
    this.changes = [];
    this.triggerListeners = function (value) {
      // Run callbacks
      for (var i = 0; i < this.changes.length; i++) {
        this.changes[i](value);
      }
    };
  }

  /**
   * Append widget to the DOM.
   *
   * @param {jQuery} $wrapper
   * @returns {undefined}
   */
  C.prototype.appendTo = function ($wrapper) {
    var that = this;

    this.$item = E.$(this.createHtml()).appendTo($wrapper);
    this.$select = this.$item.find('select');
    this.$errors = this.$item.children('.h5p-errors');

    this.$select.change(function () {
      var val = that.validate();
      if (val !== false) {
        that.value = val;
        that.setValue(that.field, val);
        that.triggerListeners(val);
      }
    });
  };

  /**
   * Generate HTML for the widget.
   *
   * @returns {String} HTML.
   */
  C.prototype.createHtml = function () {
    const id = ns.getNextFieldId(this.field);

    let options = '';
    if (this.field.optional === true || this.field.default === undefined) {
      options = E.createOption('-', '-');
    }
    options += C.createOptionsHtml(this.field.options, this.value);

    let select = '<select id="' + id + '"';
    if (this.field.description !== undefined) {
      select += ' aria-describedby="' + ns.getDescriptionId(id) + '"';
    }
    select += ' class="h5peditor-select">' + options + '</select>';

    return E.createFieldMarkup(this.field, select, id);
  };

  /**
   * Generate HTML for select options.
   *
   * @param {Array} options
   * @param {string} selected value
   * @return {string}
   */
  C.createOptionsHtml = function (options, selected) {
    var html = '';

    for (var i = 0; i < options.length; i++) {
      if (options[i].type === 'optgroup') {
        html += '<optgroup label="' + options[i].label + '" >';
        html += C.createOptionsHtml(options[i].options, selected);
        html += '</optgroup>';
      }
      else {
        html += E.createOption(options[i].value, options[i].label, options[i].value === selected);
      }
    }

    return html;
  };

  /**
   * Validate this field.
   *
   * @returns {Boolean}
   */
  C.prototype.validate = function () {
    var value = this.$select.val();
    if (value === '-') {
      value = undefined; // No value selected
    }

    if (this.field.optional !== true && value === undefined) {
      // Not optional and no value selected, print required error
      this.$errors.append(ns.createError(ns.t('core', 'requiredProperty', {':property': ns.t('core', 'textField')})));

      return false;
    }

    // All valid. Remove old errors
    var $errors = this.$errors.children();
    if ($errors.length) {
      $errors.remove();
    }

    return value;
  };

  /**
   * Remove widget from DOM.
   *
   * @returns {undefined}
   */
  C.prototype.remove = function () {
    this.$item.remove();
  };

  return C;
})(H5PEditor);
