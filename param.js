#!/usr/bin/env node

import fs from 'fs'
import process from 'process'
import fetch from 'node-fetch'
import { URL } from 'url'
import chalk from 'chalk'
import { spawn } from 'child_process'
function wait(ms){return new Promise(resolve => setTimeout(resolve,ms));}
function clear(){spawn('clear',{stdio:'inherit'});}
const print = console.log
async function start(){
	clear();
	await wait(500);
	const logo = `



    '.                                                                         .'.
    .c:,.                                                                   ..;c;
     .,clc;..                                                            .':cc:.
 .     .';clcc;'..                                                  ..,:clc:,.
 .;;,'.....''',;:cc;,..                                        .',:cc:;,''......',;,
   ';:ccccc:;.. ....',;;,.                                 .';;,''.... .,:ccccc::,.
        .....,:clc,. .'..';.                              ,;..... .;ccc;'....
      .,:clllcc;. .,clc'...:'                           .:,...;ll:. .':llllcc;'
         ..... ..;cll;. ,l'.c'                         .:; :c. .cllc,.......
               ..'''. .:cc. 'c,           .'::;.      .::. 'lc,...'''..
                      ....   ,c;       .:llllll:'.   .cc.   ....
                              '::.   .,clllllllll:  ,c;.
                                ..  .:cccllllllllc, .
                                  .:c'..cllllll,.:c;.
                                .;:.   ,cllllll'  '::'.
                                ';.    :lllllll;    :c'
                                      .clllllllc.   ..
                                      .clllllllc.
                                       ;lllllll;
                                       .cllllc'
                                        ,llllc.
                                        .cl:cc.
                                         ;c':c.
                                         'l:l:
                                         'c;..
                                          .
	`;print(chalk.red.bold(logo));
	await wait(500);
	print(chalk.bold.white(fs.readFileSync('./logo','utf8')));
	await wait(500);
	const lpg = `              ───────────────────────────────────────────────────────────`;
    const lpg2 = `    ParamsNode Created by Nekodev.js,  Developed to help you find Parameters easily`;
    const lpg3 = `     Don't misuse this tool to commit crimes such as SQL Injection, Use it Wisely,`
    const lpg4 = `           STRICT WARNING: DO NOT SELL/BUY THIS DEVICE, DO NOT RENAME/RECODE`;
    const lpg5 = `          Don't forget to Follow my GitHub account to receive the Next Update!`;
    const lpg6 = `\n          https://github.com/NekomonHub`;
	print(chalk.red.bold(lpg));
	await print(chalk.red.bold(lpg2));
	await print(chalk.bold.white(lpg3));
	await print(chalk.bold.red(lpg4));
	await print(chalk.grey.bold(lpg5));
	await print(chalk.cyan.bold(lpg6));
	main();
	
} start();

async function main(){
const target = process.argv[2]

if (!target) {
  console.log(chalk.bold('Usage: node param.js <url>'))
  process.exit(1)
} if (!fs.existsSync('word.txt')) {
  console.log(chalk.bold('word.txt not found'))
  process.exit(1)
}

let baseUrl
try {
  baseUrl = new URL(target.startsWith('http') ? target : `http://${target}`)
} catch {
  console.log(chalk.bold('URL invalid'))
  process.exit(1)
}
const words = fs
  .readFileSync('word.txt', 'utf-8')
  .split('\n')
  .map(x => x.trim())
  .filter(Boolean)
console.log(chalk.bold.red('          Target : '), baseUrl.href);
console.log(chalk.bold.white('          Param Found : '), words.length);
console.log(chalk.bold.red('\n          Scanning, Please wait. It may take a long time...'));
console.log('')
const results = []
for (const param of words) {
  const testUrl = new URL(baseUrl.href)
  testUrl.searchParams.set(param, 'paramsnode')
  try {
    const res = await fetch(testUrl.href, {
      redirect: 'manual',
      timeout: 10000
    })
    const body = await res.text()
    results.push({
      PARAM: param,
      STATUS: res.status,
      LENGTH: body.length,
      URL: testUrl.href
    })

  } catch (e) {
    results.push({
      PARAM: param,
      STATUS: 'ERR',
      LENGTH: '-',
      URL: e.message
    })
  }
} console.table(results);}
