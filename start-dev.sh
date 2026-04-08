#!/bin/sh
export PATH="/usr/local/bin:/usr/bin:/bin:$PATH"
cd /Users/admin/gastro-split
exec /usr/local/bin/node node_modules/.bin/next dev -p 3300
