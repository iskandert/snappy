const main = async () => {
  console.log("Extension loaded");
  // Выбираем селектор в зависимости от домена
  const selector = getSelectorForLocation(location.href);
  const images = document.querySelectorAll(selector);

  if (!images || images.length === 0) {
    console.log("Нет изображений по селектору", selector);
    alert(`Нет изображений по селектору: ${selector}`);
    return;
  }

  // Обычный режим
  for (const img of images) {
    try {
      const modifiedUrl = transformImageUrlIfNeeded(img.src, location.href);
      const blob = await fetchImageBlob(modifiedUrl);
      const filename = ensureFilenameWithExtension(
        deriveFilenameFromUrl(modifiedUrl),
        blob.type
      );
      await triggerDownloadFromBlob(blob, filename);

      console.log(`Скачано: ${filename}`);
    } catch (e) {
      console.error("Ошибка при скачивании:", img.src, e);
    }
  }
  alert(`Скачано все: ${images.length} изображений`);
};

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  // Отвечаем на пинг для проверки, загружен ли content script
  if (message && message.type === "PING") {
    sendResponse({ pong: true });
    return true; // Важно для асинхронного ответа
  }
  
  // Запускаем основную функцию
  if (message && message.type === "RUN_MAIN") {
    main();
  }
  
  return true; // Важно для асинхронного ответа
});


