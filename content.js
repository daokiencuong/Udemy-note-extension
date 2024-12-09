const getCourseData = () => {
  const courseTitle1 = document.title || "Unknown Course";
  const currentLink = window.location.href;

  let lessonTitle = null;
  let sectionTitle1 = null;

  // Get lesson title
  const titleItem = document.querySelector('li[aria-current="true"]');
  if (titleItem) {
    const itemTitleElement = titleItem.querySelector('[data-purpose="item-title"]');
    if (itemTitleElement) {
      lessonTitle = itemTitleElement.textContent.trim();
    }
  }

//Get section title
  const sectionItem = document.querySelector('li[aria-current="true"]');
  if (sectionItem) {
    const sectionPanel = sectionItem.closest('[data-purpose^="section-panel-"]');
    if (sectionPanel) {
      const sectionTitleElement = sectionPanel.querySelector('.ud-accordion-panel-title');
      if (sectionTitleElement) {
        sectionTitle1 = sectionTitleElement.textContent.trim();
      }
    }
  }

  return { courseTitle1, lessonTitle, currentLink, sectionTitle1 };
};

//Send data 
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "get_page_data") {
    const data = getCourseData();
    console.log("Gửi dữ liệu lên popup:", data);
    sendResponse(data);
  }
});

//Get data
function handleData() {
  const intervalId = setInterval(() => {
    const data = getCourseData();
    if (data.lessonTitle && data.sectionTitle1) {
      console.log("Course data đã đầy đủ:", data);
      clearInterval(intervalId); 
    }
  }, 500);
}

handleData();
