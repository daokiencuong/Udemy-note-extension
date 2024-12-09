chrome.storage.local.get(["courses"], (result) => {
  const courses = result.courses || {};
  const container = document.getElementById("courseContainer");

  if (Object.keys(courses).length === 0) {
    container.innerText = "No data available.";
    return;
  }

  // Tạo mục lục
  let htmlContent = "";
  for (const [courseTitle, sections] of Object.entries(courses)) {
    htmlContent += `<h3>${courseTitle}</h3><ul>`;
    for (const [sectionTitle, lessons] of Object.entries(sections)) {
      htmlContent += `<li><strong>${sectionTitle}</strong><ul>`;
      lessons.forEach((lesson) => {
        htmlContent += `
          <li class="lesson">
            <a href="${lesson.currentLink}" target="_blank">${lesson.lessonTitle}</a>
            - ${lesson.note ? `<em>Note:</em> ${lesson.note}` : "No note"}
          </li>`;
      });
      htmlContent += `</ul></li>`;
    }
    htmlContent += `</ul>`;
  }

  container.innerHTML = htmlContent;
});
