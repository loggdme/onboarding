DIST_DIR="dist"
S3_BUCKET="loggd-prod-frontend-static"
PIPELINE_ID="4d6c1001-b36d-4478-b5e1-6e440522da51"

# --- COMPRESS ASSETS ---
echo "Compressing compressible assets..."
find "$DIST_DIR" -type f \( -name "*.js" -o -name "*.css" -o -name "*.html" -o -name "*.json" -o -name "*.svg" -o -name "*.ico" -o -name "*.txt" \) -exec sh -c '
  file="$1"
  if [ -f "$file" ]; then
    echo "  Compressing: $file"
    gzip -c -9 "$file" > "${file}.gz.tmp"
    mv "${file}.gz.tmp" "$file"
  fi
' _ {} \;
echo "Compression complete."
# --- END COMPRESS ASSETS ---

# --- PURGE BUCKET BEFORE SYNC ---
echo "WARNING: Purging all contents from s3://${S3_BUCKET}/..."
s3cmd rm --recursive --force "s3://${S3_BUCKET}"
echo "Bucket purged successfully."
# --- END PURGE BUCKET ---

echo "Syncing assets to s3://${S3_BUCKET}/..."

# --- Sync Static Assets ---
echo "  Syncing JavaScript files..."
s3cmd sync \
  --acl-public \
  --add-header="Content-Encoding: gzip" \
  --add-header="Cache-Control: max-age=31536000, public, immutable" \
  --exclude='*' \
  --include='*.js' \
  --mime-type="text/javascript" \
  "$DIST_DIR/" "s3://${S3_BUCKET}/"

echo "  Syncing CSS files..."
s3cmd sync \
  --acl-public \
  --add-header="Content-Encoding: gzip" \
  --add-header="Cache-Control: max-age=31536000, public, immutable" \
  --exclude='*' \
  --include='*.css' \
  --mime-type="text/css" \
  "$DIST_DIR/" "s3://${S3_BUCKET}/"

echo "  Syncing Font files..."
s3cmd sync \
  --acl-public \
  --add-header="Cache-Control: max-age=31536000, public, immutable" \
  --exclude='*' \
  --include='*.woff2' \
  --include='*.woff' \
  --include='*.ttf' \
  --include='*.otf' \
  --mime-type="font/woff2" \
  --mime-type="font/woff" \
  --mime-type="font/ttf" \
  --mime-type="font/otf" \
  "$DIST_DIR/" "s3://${S3_BUCKET}/"

echo "  Syncing Image files..."
s3cmd sync \
  --acl-public \
  --add-header="Cache-Control: max-age=31536000, public, immutable" \
  --exclude='*' \
  --include='*.png' \
  --include='*.jpg' \
  --include='*.jpeg' \
  --include='*.gif' \
  --include='*.svg' \
  --include='*.ico' \
  --include='*.webp' \
  --mime-type="image/png" \
  --mime-type="image/jpeg" \
  --mime-type="image/gif" \
  --mime-type="image/svg+xml" \
  --mime-type="image/x-icon" \
  --mime-type="image/webp" \
  "$DIST_DIR/" "s3://${S3_BUCKET}/"

echo "  Syncing HTML files..."
s3cmd sync \
  --acl-public \
  --add-header="Content-Encoding: gzip" \
  --add-header="Cache-Control: max-age=3600, public" \
  --exclude='*' \
  --include='*.html' \
  --mime-type="text/html" \
  "$DIST_DIR/" "s3://${S3_BUCKET}/"

echo "  Applying no-cache headers to index.html..."
s3cmd modify \
  --add-header="Cache-Control: no-cache, no-store, must-revalidate" \
  --add-header="Pragma: no-cache" \
  --add-header="Expires: 0" \
  "s3://${S3_BUCKET}/index.html" || true

echo "  Syncing robots.txt..."
s3cmd sync \
  --acl-public \
  --add-header="Content-Encoding: gzip" \
  --add-header="Cache-Control: no-cache, no-store, must-revalidate" \
  --add-header="Pragma: no-cache" \
  --add-header="Expires: 0" \
  --exclude='*' \
  --include='robots.txt' \
  --mime-type="text/plain" \
  "$DIST_DIR/" "s3://${S3_BUCKET}/"

echo "  Syncing other generic files..."
s3cmd sync \
  --acl-public \
  --add-header="Cache-Control: max-age=3600, public" \
  "$DIST_DIR/" "s3://${S3_BUCKET}/"
# --- END Sync Static Assets  ---

# --- PURGE CACHE ---
# echo "Purging cache for all assets in s3://${S3_BUCKET}/..."
# scw -p prod edge-services purge-request create pipeline-id=$PIPELINE_ID all=true
# echo "Cache purged successfully."
# --- END PURGE CACHE ---
