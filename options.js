document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get({ savedData: [] }, (result) => {
      const savedList = document.getElementById("savedList");
      result.savedData.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>Content:</strong> ${item.content}<br>
          <strong>Note:</strong> ${item.note}
        `;
        savedList.appendChild(li);
      });
    });
  });
  