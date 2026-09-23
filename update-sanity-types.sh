#!/usr/bin/env bash
# Regenerates Sanity types for the web app from the current studio schema + GROQ queries.
# Run this after changing a schema field or adding/editing a defineQuery() in web/app.
set -euo pipefail

cd "$(dirname "$0")/studio"

echo "→ Extracting schema..."
yarn run sanity:schema

echo "→ Generating types..."
yarn run sanity:typegen

echo "✓ web/schema.json and web/app/types/sanity.types.ts are up to date."
