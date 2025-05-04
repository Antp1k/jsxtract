const regexes = {
  urls: /https?:\/\/[a-zA-Z0-9\.\-_\/\$\{\}:]+/g,
  endpoints: /(?<=[\"\'\`])\/[a-zA-Z0-9\-\._\/\$\{\}:]{2,}/g,
  parameters: /(?<=\?)[a-zA-Z0-9\-_]{2,}(?==)/g,
  getSet: /[\(\)\[\]\{\}\w]{0,20}\.[sg]et\([\"\'\`][^\"\'\`]+[\"\'\`][^\)]*\)/g,
  sinks: /document\.(write(ln)\([^\)]+\)|domain\s?=\s?[^;\)\]\}]{1,300})|\.(innerHTML|outerHTML|insertAdjacentHTML|onevent|srcdoc)\s?[=]\s?[^;]{1,300};|dangerouslySetInnerHTML[=:]\s?\{?[^;\}]{1,300}[;\}]|location\.(host|hostname|href|pathname|search|protocol)\s?=[^;]{1,300};|location\.(assign\(|replace\()[^\)]{1,300}\)|document\.cookie\s?=\s?[^;]{1,300};|(eval(uate)?|execCommand|execScript)\([^\)]+\)|\.(href|src|action)\s?=\s?[^;]{1,300};|FileReader\.(readAsArrayBuffer|readAsBinaryString|readAsDataURL|readAsText|readAsFile|root\.getFile)\([^\)]{1,300}\)/g,
  postMessages: /postMessage\(.{1,300}\);|addEventListener\([\'\"]message[\'\"].{1,300}\);/g
};

let urls, parameters, endpoints, getSet, sinks, postMessages = [];

let results = ""; // Will be one big string from jsFiles data

chrome.runtime.onMessage.addListener((message) => {
  if (message.data !== []) {
    message.data.forEach(txt => results += txt + "\n");
    urls = Array.from(new Set(results.match(regexes.urls) || []));
    endpoints = Array.from(new Set(results.match(regexes.endpoints) || []));
    parameters = Array.from(new Set(results.match(regexes.parameters) || []));
    getSet = Array.from(new Set(results.match(regexes.getSet) || []));
    sinks = Array.from(new Set(results.match(regexes.sinks) || []));
    postMessages = Array.from(new Set(results.match(regexes.postMessages) || []));
  }
});

document.getElementById('urls').addEventListener('click',getUrls);
document.getElementById('endpoints').addEventListener('click',getEndpoints);
document.getElementById('parameters').addEventListener('click',getParameters);
document.getElementById('getset').addEventListener('click',getGetSet);
document.getElementById('sinks').addEventListener('click',getSinks);
document.getElementById('postMessages').addEventListener('click',getPostMessages);

function getUrls() {
  let res = "";
  urls.forEach(url => {
    res += url + "\n";
  });
  document.getElementById("results").textContent = res;
  document.getElementById("found").textContent = "Found: " + urls.length.toString();
}

function getEndpoints() {
  let res = "";
  endpoints.forEach(ep => {
    res += ep + "\n";
  });
  document.getElementById("results").textContent = res;
  document.getElementById("found").textContent = "Found: " + endpoints.length.toString();
}

function getParameters() {
  let res = "";
  parameters.forEach(param => {
    res += param + "\n";
  });
  document.getElementById("results").textContent = res;
  document.getElementById("found").textContent = "Found: " + parameters.length.toString();
}

function getGetSet() {
  let res = "";
  getSet.forEach(gs => {
    res += gs + "\n";
  });
  document.getElementById("results").textContent = res;
  document.getElementById("found").textContent = "Found: " + getSet.length.toString();
}

function getSinks() {
  let res = "";
  sinks.forEach(sink => {
    res += sink + "\n\n";
  });
  document.getElementById("results").textContent = res;
  document.getElementById("found").textContent = "Found: " + sinks.length.toString();
}

function getPostMessages() {
  let res = "";
  postMessages.forEach(pm => {
    res += pm + "\n\n";
  });
  document.getElementById("results").textContent = res;
  document.getElementById("found").textContent = "Found: " + postMessages.length.toString();
}
