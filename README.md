# v1.0.0
**JSXtract** is a tool used to pull various type of data from JS files that exist within a selected tab. This tool is a great way to get an initial look on how the application has been written and what may exist within the application, but since the values that you gain from this tool are through various regex, it's best to use this to see what to look for more deeply when analyzing the applications JS files.

## How it's used
- First the user should check which domains the JS files of the application are from i.e. netflix uses nflxext.com, in which case you'd place something like "nflx" into the whitelist input (this input is comma separated array i.e. nflx,netflix), which will then get all JS files from sources which include "nflx" in them.
- Second you'd press start and a new tab called "results" opens up in your browser which allows you to see the data which we're found through various regex.

## Results
- Urls
- Endpoints
- Parameters
- Sinks (various sinks with a bit of context)
- PostMessages (These also have bit of context)
- Misc. ( These are values of .get() & .set() with some context)

## The regex used
urls - `/https?:\/\/[a-zA-Z0-9\.\-_\/\$\{\}:]+/g`
endpoints - `/(?<=[\"\'])\/[a-zA-Z0-9\-\._\/\$\{\}:]{2,}/g`
parameters - `/(?<=\?)[a-zA-Z0-9\-_]{2,}(?==)/g`
Misc. - `/[\(\)\[\]\{\}\w]{0,20}\.[sg]et\([\"\'][^\"\']+[\"\'][^\)]*\)/g`

sinks - `/document\.(write(ln)\([^\)]+\)|domain\s?=\s?[^;\)\]\}]{1,300})|\.(innerHTML|outerHTML|insertAdjacentHTML|onevent|srcdoc)\s?[=]\s?[^;]{1,300};|dangerouslySetInnerHTML[=:]\s?\{?[^;\}]{1,300}[;\}]|location\.(host|hostname|href|pathname|search|protocol)\s?=[^;]{1,300};|location\.(assign\(|replace\()[^\)]{1,300}\)|document\.cookie\s?=\s?[^;]{1,300};|(eval(uate)?|execCommand|execScript)\([^\)]+\)|\.(href|src|action)\s?=\s?[^;]{1,300};|FileReader\.(readAsArrayBuffer|readAsBinaryString|readAsDataURL|readAsText|readAsFile|root\.getFile)\([^\)]{1,300}\)/g`

postMessages - `/postMessage\(.{1,300}\);|addEventListener\([\'\"]message[\'\"].{1,300}\);/g`

## Installation
#### Chrome:
1. Use `git clone https://github.com/Antp1k/jsxtract.git` in your shell
2. Open `chrome://extensions`
3. Enable developer mode
4. Press load unpacked
5. Navigate to the jsxtract/chrome directory and select manifest.json

#### Firefox:
- 
