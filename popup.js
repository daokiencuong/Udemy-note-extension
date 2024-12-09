chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    if (!/^https?:\/\//.test(currentTab.url)) {
        console.error("Content script does not run on this tab.");
        return;
    }

    window.addEventListener(
        "popstate",
        chrome.scripting.executeScript(
            {
                target: { tabId: currentTab.id },
                files: ["content.js"],
            },
            () => {
                chrome.tabs.sendMessage(
                    currentTab.id,
                    { action: "get_page_data" },
                    (response) => {
                        if (response) {
                            document.getElementById("courseTitle").innerText =
                                response.courseTitle1 || "Unknown";
                            document.getElementById("lessonTitle").innerText =
                                response.lessonTitle || "Unknown";
                            document.getElementById("currentLink").innerText =
                                response.currentLink || "Unknown";
                            document.getElementById("sectionTitle").innerText =
                                response.sectionTitle1 || "Unknown";
                        }
                    }
                );
            }
        )
    );

    document.getElementById("saveContent").addEventListener("click", () => {
      const courseTitle = document.getElementById("courseTitle").innerText;
      const sectionTitle = document.getElementById("sectionTitle").innerText;
      const lessonTitle = document.getElementById("lessonTitle").innerText;
      const currentLink = document.getElementById("currentLink").innerText;
      const note = document.getElementById("note").value;
    
      if (!courseTitle || !lessonTitle || !sectionTitle || !currentLink) {
        alert("Missing data! Please ensure all fields are loaded.");
        return;
      }
    
      // Lưu dữ liệu vào Chrome Storage
      chrome.storage.local.get(["courses"], (result) => {
        let courses = result.courses || {};
    
        // Kiểm tra khóa học
        if (!courses[courseTitle]) {
          courses[courseTitle] = {};
        }
    
        // Kiểm tra chương
        if (!courses[courseTitle][sectionTitle]) {
          courses[courseTitle][sectionTitle] = [];
        }
    
        // Thêm bài học
        courses[courseTitle][sectionTitle].push({
          lessonTitle,
          currentLink,
          note,
        });
    
        // Lưu lại dữ liệu
        chrome.storage.local.set({ courses }, () => {
          alert("Data saved successfully!");
          document.getElementById("note").value = ""; // Xoá ghi chú sau khi lưu
        });
      });
    });
    
});
