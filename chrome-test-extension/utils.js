const applyPinterestSize = (originalUrl, desiredSize) => {
  try {
    return originalUrl.replace(
      /(https:\/\/i\.pinimg\.com\/)([^/]+)(\/.*)/,
      `$1${desiredSize}$3`
    );
  } catch (e) {
    console.error("applyPinterestSize error:", e);
    return originalUrl;
  }
};

const fetchImageBlob = async (url) => {
  const response = await fetch(url, { mode: "cors" });
  return await response.blob();
};

const deriveFilenameFromUrl = (url) => {
  const urlParts = url.split("/");
  return urlParts[urlParts.length - 1].split("?")[0];
};

const ensureFilenameWithExtension = (filename, mimeType) => {
  if (!/\.(png|jpg|jpeg)$/i.test(filename)) {
    const ext = mimeType && mimeType.includes("png") ? "png" : "jpg";
    return filename + "." + ext;
  }
  return filename;
};

const triggerDownloadFromBlob = async (blob, filename) => {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};

const isPinterestUrl = (url) => /(^|\.)pinterest\.\w+\//i.test(url) || /(^|\.)pinimg\.com\//i.test(url);

const getSelectorForLocation = (locationHref) => {
  return isPinterestUrl(locationHref) ? ".mainContainer img" : "img";
};

const transformImageUrlIfNeeded = (imgUrl, locationHref) => {
  return isPinterestUrl(locationHref) ? applyPinterestSize(imgUrl, "1200x") : imgUrl;
};
