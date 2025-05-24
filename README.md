# v1.0.0
**JSXtract** is a security research tool used to pull various type of data from JS files that exist within a selected tab. This tool is a great way to get an initial look on what may exist within the application. You can use the tool to get some basic data such as urls, endpoints and parameters or get a good initial look of sinks, postmessages and then go deeper from there etc.

## How it's used
- First the user should open dev tools and check which domains the JS files of the application are from i.e. netflix uses nflxext.com, in which case you'd place something like "nflx" into the whitelist input (this input is comma separated array i.e. nflx,netflix), which will then get all JS files from sources which include "nflx" in them. The whitelist was created to separate thirdparty JS from the applications JS files.
- Second you'd press start and a new tab called "results" opens up in your browser which allows you to see the data which we're found through various regex.

## Results
- Urls
- Endpoints
- Parameters
- Sinks (various sinks with a bit of context)
- PostMessages (These also have bit of context)
- Misc. ( These are values of .get() & .set() with some context)

## The regex used
urls: `/https?:\/\/[a-zA-Z0-9\.\-_\/\$\{\}:]+/g`

endpoints: `/(?<=[\"\'])\/[a-zA-Z0-9\-\._\/\$\{\}:]{2,}/g`

parameters: `/(?<=\?)[a-zA-Z0-9\-_]{2,}(?==)/g`

Misc.: `/[\(\)\[\]\{\}\w]{0,20}\.[sg]et\([\"\'][^\"\']+[\"\'][^\)]*\)/g`

sinks: `/document\.(write(ln)\([^\)]+\)|domain\s?=\s?[^;\)\]\}]{1,300})|\.(innerHTML|outerHTML|insertAdjacentHTML|onevent|srcdoc)\s?[=]\s?[^;]{1,300};|dangerouslySetInnerHTML[=:]\s?\{?[^;\}]{1,300}[;\}]|location\.(host|hostname|href|pathname|search|protocol)\s?=[^;]{1,300};|location\.(assign\(|replace\()[^\)]{1,300}\)|document\.cookie\s?=\s?[^;]{1,300};|(eval(uate)?|execCommand|execScript)\([^\)]+\)|\.(href|src|action)\s?=\s?[^;]{1,300};|FileReader\.(readAsArrayBuffer|readAsBinaryString|readAsDataURL|readAsText|readAsFile|root\.getFile)\([^\)]{1,300}\)/g`

postMessages: `/postMessage\(.{1,300}\);|addEventListener\([\'\"]message[\'\"].{1,300}\);/g`

## Installation
#### Chrome:
1. Use `git clone https://github.com/Antp1k/jsxtract.git` in your shell
2. Open `chrome://extensions` in your browser
3. Enable developer mode
4. Press load unpacked
5. Navigate to the jsxtract/chrome directory and select manifest.json

#### Firefox:
Either install the extension from `https://addons.mozilla.org/en-US/firefox/addon/jsxtract/`
or follow the following steps to install the extension as a temporary addon:
1. Use `git clone https://github.com/Antp1k/jsxtract.git` in your shell
2. Open `about:debugging#/runtime/this-firefox` in your browser
3. Press `Load Temporary Add-on`
4. Navigate to the jsxtract/firefox directory and select manifest.json
