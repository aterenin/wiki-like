import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import mermaid from 'mermaid';
import puppeteer from 'puppeteer';
import {renderMermaid} from '@mermaid-js/mermaid-cli';

const defaults = mermaid.mermaidAPI.defaultConfig;
const mermaidConfig = Object.fromEntries(Object.keys(defaults).filter(k => defaults[k]?.useMaxWidth).map(k => [k, {useMaxWidth: false}]));

function fileName(m) {
    return `mermaid-${crypto.createHash('sha256').update(m).digest('hex').slice(0, 16)}.svg`;
}

async function renderFile(p) {
    const t = fs.readFileSync(p, {encoding: 'utf8', flag: 'r'});
    const r = /<pre[^>]*><code data-lang="?mermaid"?>(.*?)<\/code><\/pre>/gs;
    for (const [_, m] of t.matchAll(r)) {
        const {data} = await renderMermaid(browser, m.replaceAll(/<\/?span[^>]*>/g, '').replaceAll('&lt;','<').replaceAll('&gt;','>').replaceAll('&quot;','"').replaceAll('&#39;',"'").replaceAll('&amp;','&'), 'svg', {mermaidConfig});
        fs.writeFileSync(path.join(path.dirname(p), fileName(m)), data);
    }
    const u = t.replaceAll(r, (_, m) => `<figure class="mermaid"><img class="dark-invert" src="${fileName(m)}" alt=""></figure>`);
    fs.writeFileSync(p, u);
}

async function renderDirectory(d) {
    for (const f of fs.readdirSync(d)) {
        const p = path.join(d, f);
        if (path.extname(f) === '.html') {
            await renderFile(p);
        } else if (fs.statSync(p).isDirectory()) {
            await renderDirectory(p);
        }
    }
}

const browser = await puppeteer.launch({headless: 'shell'});
await renderDirectory('public');
await browser.close();
