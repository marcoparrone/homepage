const fs = require('fs');
const path = require('path');
const pug = require('pug');

const twitter_icon = require('simple-icons/icons/twitter');
const github_icon = require('simple-icons/icons/github');

const baseurl = process.env.NODE_ENV === 'development' ? 'http://centos0:3000' : 'https://marcoparrone.com';

function createIndexFile() {
  fs.copyFile('build/index.en.html', 'build/index.html',
    err => {
      if (err) {
        console.error('ERROR: Cannot write file build/index.html: ' + err.code + ' ' + err.message)
        process.exit(1);
      }
    }
  );
}

function copyFolderSync(src, dest) {
  try {
    fs.readdirSync(src).forEach(dirent => {
      const [srcPath, destPath] = [src, dest].map(dirPath => path.join(dirPath, dirent))
      const stat = fs.lstatSync(srcPath)
      switch (true) {
        case stat.isFile():
          fs.copyFileSync(srcPath, destPath); break
        case stat.isDirectory():
          fs.copyFolderSync(srcPath, destPath); break
        case stat.isSymbolicLink():
          fs.symlinkSync(readlinkSync(srcPath), destPath); break
      }
    });
  } catch (err) {
      console.error('ERROR: Cannot copy ' + src + ' to ' + dest + ': ' + err.code + ' ' + err.message)
      process.exit(1);
  }
}

function write_localized_page(i18ndir, page, compiledPugFunction, outdir, language) {
  let tmpdata = "";
  try {
    tmpdata = fs.readFileSync(i18ndir + '/' + language + '.json', 'utf8');
  } catch (err) {
    console.error(err);
  } finally {
    let tmpobj = JSON.parse(tmpdata);
    tmpobj['language'] = language;
    tmpobj['baseurl'] = baseurl;
    tmpobj['twitter_icon'] = twitter_icon;
    tmpobj['github_icon'] = github_icon;
    fs.writeFile(outdir + '/' + page + '.' + language + '.html',
      compiledPugFunction(tmpobj),
      err => {
        if (err) {
            console.error('ERROR: Cannot write file: ' + err.code + ' ' + err.message)
            process.exit(1);
        } else if (language === 'en') {
          createIndexFile();
        }
    });
  }
}

function main () {
  const supported_languages = ['en', 'af', 'sq', 'am', 'ar', 'hy', 'az', 'eu', 'be', 'bn', 'bs', 'bg', 'ca', 'ceb', 'ny', 'zh-CN', 'zh-TW', 'co', 'hr', 'cs', 'da', 'nl', 'eo', 'et', 'tl', 'fi', 'fr', 'fy', 'gl', 'ka', 'de', 'el', 'gu', 'ht', 'ha', 'haw', 'iw', 'hi', 'hmn', 'hu', 'is', 'ig', 'id', 'ga', 'it', 'ja', 'jw', 'kn', 'kk', 'km', 'rw', 'ko', 'ku', 'ky', 'lo', 'la', 'lv', 'lt', 'lb', 'mk', 'mg', 'ms', 'ml', 'mt', 'mi', 'mr', 'mn', 'my', 'ne', 'no', 'or', 'ps', 'fa', 'pl', 'pt', 'pa', 'ro', 'ru', 'sm', 'gd', 'sr', 'st', 'sn', 'sd', 'si', 'sk', 'sl', 'so', 'es', 'su', 'sw', 'sv', 'tg', 'ta', 'tt', 'te', 'th', 'tr', 'tk', 'uk', 'ur', 'ug', 'uz', 'vi', 'cy', 'xh', 'yi', 'yo', 'zu', 'he', 'zh'];
  const pages = ['index'];
  const i18ndir = 'i18n';
  const pugdir = 'src';
  const outdir = 'build';
  const publicdir = 'public';

  if (!fs.existsSync(outdir)){
    fs.mkdirSync(outdir);
  }

  for (let pageN = 0; pageN < pages.length; pageN++) {
    let compiledPugFunction = pug.compileFile(pugdir + '/' + pages[pageN] + '.pug');
    for (let i = 0; i < supported_languages.length; i++) {
      write_localized_page(i18ndir + '/' + pages[pageN], pages[pageN], compiledPugFunction, outdir, supported_languages[i]);
    }
  }

  copyFolderSync(publicdir, outdir);
}

main();
