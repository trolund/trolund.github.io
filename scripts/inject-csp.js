import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve(process.cwd(), process.argv[2] ?? 'out');

const CSP_META_REGEX =
  /<meta\b[^>]*http-equiv=["']Content-Security-Policy["'][^>]*>/gi;
const INLINE_SCRIPT_REGEX = /<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
const EXTERNAL_SCRIPT_REGEX = /<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi;
const IFRAME_REGEX = /<iframe\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi;
const INLINE_HANDLER_REGEX = /\son[a-z]+\s*=/i;
const JAVASCRIPT_URL_REGEX = /\b(?:href|src)=["']javascript:/i;

function walkHtmlFiles(dir) {
  const files = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...walkHtmlFiles(fullPath));
      continue;
    }

    if (entry.isFile() && fullPath.endsWith('.html')) {
      files.push(fullPath);
    }
  }

  return files;
}

function toOrigin(value) {
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

function sha256(value) {
  return createHash('sha256').update(value).digest('base64');
}

function escapeAttribute(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function collectMatches(regex, html, mapper = (value) => value) {
  const values = new Set();

  for (const match of html.matchAll(regex)) {
    const mapped = mapper(match[1]);
    if (mapped) {
      values.add(mapped);
    }
  }

  return values;
}

function buildCsp(html) {
  const inlineScriptHashes = collectMatches(INLINE_SCRIPT_REGEX, html, (body) => {
    return `'sha256-${sha256(body)}'`;
  });

  const externalScriptOrigins = collectMatches(EXTERNAL_SCRIPT_REGEX, html, (src) => {
    return src.startsWith('http://') || src.startsWith('https://') ? toOrigin(src) : null;
  });

  const frameOrigins = collectMatches(IFRAME_REGEX, html, (src) => {
    return src.startsWith('http://') || src.startsWith('https://') ? toOrigin(src) : null;
  });

  const hasInlineHandlers =
    INLINE_HANDLER_REGEX.test(html) || JAVASCRIPT_URL_REGEX.test(html);

  const scriptSources = ["'self'", ...externalScriptOrigins, ...inlineScriptHashes].join(' ');
  const frameSources = frameOrigins.size > 0 ? ["'self'", ...frameOrigins].join(' ') : "'none'";

  const directives = [
    "default-src 'self'",
    `script-src ${scriptSources}`,
    `script-src-elem ${scriptSources}`,
    `script-src-attr ${hasInlineHandlers ? "'unsafe-inline'" : "'none'"}`,
    "style-src 'self' 'unsafe-inline'",
    "style-src-elem 'self' 'unsafe-inline'",
    "style-src-attr 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self' https://rum.cronitor.io",
    "frame-src " + frameSources,
    "child-src " + frameSources,
    "manifest-src 'self'",
    "worker-src 'self'",
    "base-uri 'none'",
    "form-action 'none'",
    "object-src 'none'",
    'upgrade-insecure-requests',
  ];

  return directives.join('; ') + ';';
}

function injectMetaTag(html, csp) {
  const metaTag = `<meta http-equiv="Content-Security-Policy" content="${escapeAttribute(csp)}"/>`;
  const withoutExisting = html.replace(CSP_META_REGEX, '');

  if (withoutExisting.includes('<meta charSet="utf-8"/>')) {
    return withoutExisting.replace('<meta charSet="utf-8"/>', `<meta charSet="utf-8"/>${metaTag}`);
  }

  if (withoutExisting.includes('<head>')) {
    return withoutExisting.replace('<head>', `<head>${metaTag}`);
  }

  throw new Error('Unable to locate <head> for CSP injection');
}

if (!fs.existsSync(outDir)) {
  throw new Error(`Output directory not found: ${outDir}`);
}

const htmlFiles = walkHtmlFiles(outDir);

for (const htmlFile of htmlFiles) {
  const html = fs.readFileSync(htmlFile, 'utf8');
  const csp = buildCsp(html);
  const updatedHtml = injectMetaTag(html, csp);
  fs.writeFileSync(htmlFile, updatedHtml);
}

console.log(`Injected CSP meta tags into ${htmlFiles.length} HTML files in ${outDir}`);
