console.log("Extension loaded");

chrome.action.onClicked.addListener(async (tab) => {
  // Проверяем, что вкладка доступна для content script
  if (!tab.id) return;
  if (
    tab.url.startsWith("chrome://") ||
    tab.url.startsWith("edge://") ||
    tab.url.startsWith("about:")
  ) {
    console.log("Нельзя запустить на системной странице");
    return;
  }

  // Проверяем, загружен ли content script, и отправляем сообщение
  chrome.tabs.sendMessage(tab.id, { type: "PING" }, (response) => {
    if (chrome.runtime.lastError) {
      console.log(
        "Content script не загружен:",
        chrome.runtime.lastError.message
      );
      return;
    }

    if (response && response.pong) {
      chrome.tabs.sendMessage(tab.id, { type: "RUN_MAIN" });
      console.log("Отправлена команда RUN_MAIN");
    }
  });
});
