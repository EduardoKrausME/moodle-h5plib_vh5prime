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
 * i18n.js
 *
 * @package   h5plib_vh5prime
 * @copyright 2026 Eduardo Kraus {@link https://eduardokraus.com}
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

export class I18n {
    constructor({locale, baseUrl}) {
        this.locale = String(locale || "pt_br").toLowerCase().replace(/-/g, "_");
        this.baseUrl = String(baseUrl || "").replace(/\/$/, "");
        this.dict = {};
    }

    async load() {
        const englishUrl = `${this.baseUrl}/i18n/en.json`;

        // Always load English first so it can be used as fallback.
        const englishData = await window.jQuery.getJSON(englishUrl);
        this.dict = englishData || {};

        // English is already loaded, so there is nothing else to override.
        if (this.locale === "en") {
            return;
        }

        const localeUrl = `${this.baseUrl}/i18n/${this.locale}.json`;

        try {
            const localeData = await window.jQuery.getJSON(localeUrl);

            // Keep English values for keys that are missing from the locale file.
            this.dict = {
                ...this.dict,
                ...(localeData || {}),
            };
        } catch (error) {
            // Keep the English dictionary when the requested locale cannot be loaded.
            console.warn(`Could not load locale "${this.locale}". Falling back to English.`, error);
        }
    }

    t(key, vars) {
        const raw = this.dict[key] != null ? this.dict[key] : key;

        if (!vars) return raw;

        return String(raw).replace(/\{(\w+)\}/g, function (_m, k) {
            return vars[k] != null ? String(vars[k]) : `{${k}}`;
        });
    }

    toTemplateObject() {
        return this.dict;
    }
}
