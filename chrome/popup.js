let jsFiles = []; // Filled with JS code once requests to JS endpoints are completed

function getJSFiles() {
  const whitelist = document.getElementById("whitelist")
    .value
    .split(',')
    .map(s => s.trim().toLowerCase());

  chrome.tabs.query({ active: true, currentWindow: true}, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => {
        return Array.from(document.scripts)
          .map(script => script.src)
          .filter(src => src !== "");
      } 
    }, (results) => {
      if (results && results[0]) {
        const filtered = results[0].result.filter(src =>
          whitelist.some(domain => src.includes(domain))
        );

        if (filtered.length !== 0) {
          document.getElementById("errors").textContent = "";
          fetchUrls(filtered)
          document.getElementById('start').removeEventListener("click", getJSFiles);
        } else {
          document.getElementById("errors").textContent = "No JS files for whitelisted domains!";
        }
      }
    });
  });
}
document.getElementById('start').addEventListener("click", getJSFiles);

async function fetchUrls(urls) {
  for (const url of urls) {
    try {
      const response = await fetch(url);
      const text = await response.text();
      jsFiles.push(text);
    } catch (e) {
      // Do nothing
    }
  }

  chrome.runtime.sendMessage({data: jsFiles}, function() {
    // Just send the message nothing else.
  });
}
