
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    if (!/^https?:\/\//.test(currentTab.url)) {
      console.error("Content script does not run on this tab.");
      return;
    }

    window.addEventListener("popstate",
      chrome.scripting.executeScript(
        {
          target: { tabId: currentTab.id },
          files: ["content.js"]
        },
        () => {
          chrome.tabs.sendMessage(
            currentTab.id,
            { action: "get_page_data" },
            (response) => {
              if (response) {
                document.getElementById("courseTitle").innerText = response.courseTitle1;
                document.getElementById("lessonTitle").innerText = response.lessonTitle;
                document.getElementById("currentLink").innerText = response.currentLink;
                document.getElementById("sectionTitle").innerText = response.sectionTitle1;
              }
            }
          );
        }
      )
    );
  });


  

