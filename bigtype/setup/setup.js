(() => {
  "use strict";
  // 配置仅在本页面本地解析。不得加入分析脚本或上传 fragment。
  const fragment = location.hash.slice(1);
  const open = document.getElementById("open");
  let valid = false;
  try {
    if (!/^bt2=[A-Za-z0-9_-]{1,2800}$/.test(fragment)) throw new Error("invalid");
    const value = fragment.slice(4).replace(/-/g,"+").replace(/_/g,"/");
    const code = atob(value);
    valid = code.length <= 2048 && /^BT[12]\|/.test(code);
  } catch (_) {}
  if (valid) {
    open.disabled = false;
    open.addEventListener("click", () => {
      // 仅在用户点击时唤起；App继续校验CRC及字段范围，并展示确认页。
      location.href = "bigtype://setup#" + fragment;
    });
  } else {
    document.getElementById("status").textContent = "此页面没有有效配置。请家人重新发送配置二维码或完整链接。";
  }
  try {
    const url = new URL(window.BIGTYPE_DOWNLOAD_URL);
    if (url.protocol !== "https:" || url.username || url.password) return;
    const download = document.getElementById("download");
    download.href = url.href; download.hidden = false;
    document.getElementById("unavailable").hidden = true;
  } catch (_) {}
  try {
    const url = new URL(window.BIGTYPE_DOWNLOAD_URL_32);
    if (url.protocol === "https:" && !url.username && !url.password) {
      const link = document.getElementById("download32");
      link.href = url.href; link.hidden = false;
    }
  } catch (_) {}
})();
