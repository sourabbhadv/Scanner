# DocScan AI v0.3 — Offline OCR build

## What's new
- Tesseract.js is configured to load from local `./vendor/` files, not a public CDN.
- English (`eng`) and Hindi (`hin`) Tesseract Fast language models are downloaded and bundled during the GitHub Actions build.
- The Tesseract core, WebAssembly runtime, worker and jsPDF are also copied into the deployed app.
- The service worker caches same-origin app assets after first successful load, enabling repeat/offline use when the browser retains its cache.
- The v0.2 IndexedDB document library and multi-page scanner are retained.

## Deploy using GitHub Actions (recommended)
1. Extract this ZIP.
2. Upload **all files and folders**, including the hidden `.github` folder, to the root of a GitHub repository. Keep the folder structure unchanged.
3. In GitHub, open **Settings → Pages** and set the source to **GitHub Actions**.
4. Open the **Actions** tab. The workflow named "Build and deploy DocScan AI" should run automatically after pushing to `main` or `master`.
5. When the workflow succeeds, open the Pages URL. The workflow assembles the local OCR engine and language models into the deployed site.

Do not use the old "Deploy from branch" method for this version; the workflow must build the vendor assets before deployment.

## Verify offline operation
1. Open the deployed HTTPS URL while online.
2. Wait for the page to load fully.
3. Run OCR once for English and once for Hindi+English, and wait until each completes.
4. Close and reopen the app once while online.
5. Enable airplane mode and reopen the app from the same browser profile.
6. Test OCR on a small sample document. If the browser evicted cached assets or the PWA was not installed/cached correctly, reconnect and repeat the first-load steps.

Offline availability depends on browser storage policy, available disk space, service-worker support and whether all large assets were cached successfully. Do not clear site data if you want to retain offline assets or local documents.

## Important limitations
- The language models are `tessdata_fast`: smaller/faster models that trade some recognition accuracy for speed. Official Tesseract documentation describes `tessdata_fast` as the fastest model set and `tessdata_best` as slower but potentially more accurate. See https://tesseract-ocr.github.io/tessdoc/Data-Files.
- OCR quality depends on focus, lighting, page alignment, print quality and language. Always proofread legal names, case numbers, dates and amounts.
- This build still exports image-based PDFs; selectable/searchable PDF text layers are a later milestone.
- Automatic edge detection, perspective correction, filters and cloud backup are not included yet.
- IndexedDB stores documents locally in the browser profile. It is not cloud backup. Export important PDFs and keep a second copy.
- There is no artificial page counter, but device memory, storage and browser limits mean no app can promise literally infinite scans.

## Licensing / sources
- Tesseract.js: https://github.com/naptha/tesseract.js
- Tesseract.js Core: https://github.com/naptha/tesseract.js-core
- Tesseract language data: https://github.com/tesseract-ocr/tessdata_fast
- jsPDF: https://github.com/parallax/jsPDF

This project downloads pinned open-source runtime packages and official Tesseract Fast language models during its GitHub Actions build. Review their licenses before commercial redistribution.
