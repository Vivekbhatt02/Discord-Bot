const HTML_ESCAPES = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"};

export const escapeHtml = (text) => String(text).replace(/[&<>"']/g, char => HTML_ESCAPES[char]);
