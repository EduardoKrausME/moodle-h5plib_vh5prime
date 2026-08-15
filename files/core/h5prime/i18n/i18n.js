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
