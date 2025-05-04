let jsFiles = [];
chrome.runtime.onMessage.addListener(function(message) {
  if (message.data !== []) {
    jsFiles = message.data;
    resultsTab()
  }
});

async function resultsTab() {
  // Once the JS data has been loaded it's time to open a results tab
  // and send the JS data to it where results can be processed
  try {
    let tab = await chrome.tabs.create({
      url: chrome.runtime.getURL("results.html")
    });

    setTimeout(() => {
      chrome.tabs.sendMessage(tab.id, {data: jsFiles});
    }, 500);
  } catch (e) {
    // Do nothing
  }
}
