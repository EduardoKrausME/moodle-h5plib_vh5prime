# H5Prime Viewer for Moodle

`h5plib_vh5prime` is a Moodle H5P library handler that uses **H5Prime** to render H5P content.

The plugin is a viewer/runtime integration. It does not add a new Moodle course activity and it does not introduce a separate H5P content format. Instead, it connects H5Prime to Moodle's native H5P subsystem so existing H5P content can be displayed through the H5Prime player.

## What this plugin does

Moodle supports pluggable H5P library handlers. This plugin registers H5Prime as one of those handlers and provides the files required to render H5P content with the H5Prime interface.

When H5Prime is selected as the H5P library handler, the plugin:

- mounts the H5Prime canvas when H5P content is rendered;
- passes the content JSON, metadata, language, user information and saved user state from Moodle to the H5Prime viewer;
- loads the bundled H5Prime JavaScript, styles, templates and translations.

The H5P content itself remains managed by Moodle. This plugin changes the viewer/runtime used to present that content.

## Usage

No new activity is created by this plugin. Continue using H5P content through Moodle normally. Once H5Prime is configured as the active H5P library handler, compatible H5P content is rendered through the H5Prime viewer.

This makes the plugin suitable for installations that want to keep Moodle's existing H5P content management while replacing the standard presentation layer with H5Prime.

## License

GNU GPL v3 or later.
