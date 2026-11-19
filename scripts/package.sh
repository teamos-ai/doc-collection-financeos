#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
test -f dist-portable/style.css
test -f dist-portable/blueprint.js
cat > document-collection-board.html <<'HTML'
<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Document collection · Finance OS builder blueprint</title></head><body style="margin:0">
<div id="fos-document-board"></div>
<style>
HTML
cat dist-portable/style.css >> document-collection-board.html
cat >> document-collection-board.html <<'HTML'
</style>
<script>
HTML
cat dist-portable/blueprint.js >> document-collection-board.html
cat >> document-collection-board.html <<'HTML'
</script>
</body></html>
HTML
