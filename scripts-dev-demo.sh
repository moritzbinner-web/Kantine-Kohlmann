#!/bin/sh
export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"
cd /Users/admin/work/kantine-kohlmann
DEMO_MODE=1 exec npx next dev -p 3400
