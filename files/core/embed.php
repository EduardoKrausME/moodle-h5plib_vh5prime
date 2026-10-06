<!doctype html>
<html lang="<?php
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
 * embed.php
 *
 * @package   h5plib_vh5prime
 * @copyright 2026 Eduardo Kraus {@link https://eduardokraus.com}
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

 echo htmlspecialchars($lang, ENT_QUOTES, 'UTF-8'); ?>" class="h5p-iframe">
<head>
    <meta charset="utf-8">
    <title><?php echo htmlspecialchars($content['title'], ENT_QUOTES, 'UTF-8'); ?></title>
    <?php for ($i = 0, $s = count($scripts); $i < $s; $i++): ?>
        <script src="<?php echo htmlspecialchars($scripts[$i], ENT_QUOTES, 'UTF-8'); ?>"></script>
    <?php endfor; ?>
    <?php for ($i = 0, $s = count($styles); $i < $s; $i++): ?>
        <link rel="stylesheet" href="<?php echo htmlspecialchars($styles[$i], ENT_QUOTES, 'UTF-8'); ?>">
    <?php endfor; ?>
    <?php if (!empty($additional_embed_head_tags)): echo implode("\n", $additional_embed_head_tags); endif; ?>
</head>
<body>
<div class="h5p-content" data-content-id="<?php echo intval($content['id']); ?>"></div>
<script>
    H5PIntegration = <?php echo json_encode($integration); ?>;
</script>
</body>
</html>