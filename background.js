chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && tab.url.includes("udemy.com")) {
      chrome.action.enable(tabId); // Bật popup
    } else {
      chrome.action.disable(tabId); // Tắt popup
    }
  });
  
  // Khi người dùng chuyển đổi giữa các tab
  chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
      if (tab.url && tab.url.includes("udemy.com")) {
        chrome.action.enable(activeInfo.tabId); // Bật popup
      } else {
        chrome.action.disable(activeInfo.tabId); // Tắt popup
      }
    });
  });
  