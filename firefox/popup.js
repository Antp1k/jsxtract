let jsFiles = []; // Filled with JS code once requests to JS endpoints are completed

function getJSFiles() {
  const whitelist = document.getElementById("whitelist")
    .value
    .split(',')
    .map(s => s.trim().toLowerCase());

  browser.tabs.query({ active: true, currentWindow: true}, (tabs) => {
    browser.scripting.executeScript({
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

  resultsTab()
}

async function resultsTab() {
  // Once the JS data has been loaded it's time to open a results tab
  // and send the JS data to it where results can be processed
  try {
    let tab = await browser.tabs.create({
      url: browser.runtime.getURL("results.html")
    });

    setTimeout(() => {
      browser.tabs.sendMessage(tab.id, {data: jsFiles});
    }, 500);
  } catch (e) {
    // Do nothing
  }
}
