#!/bin/bash
# Renders the three résumé HTML files to PDF with headless Chrome.
set -e
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
DIR="$(cd "$(dirname "$0")" && pwd)"
OUT="$DIR/../assets/resume"

render() {  # render <source.html> <Output.pdf>
  "$CHROME" --headless --disable-gpu --no-pdf-header-footer \
    --print-to-pdf="$OUT/$2" "file://$DIR/$1" 2>/dev/null
  echo "$2  $(python3 -c "import sys;print(f'{__import__(\"os\").path.getsize(sys.argv[1])/1024:.0f} KB')" "$OUT/$2")"
}

render research.html    Aakash_Sangani_Research.pdf
render datascience.html Aakash_Sangani_DataScience.pdf
render product.html     Aakash_Sangani_Product_Strategy.pdf
