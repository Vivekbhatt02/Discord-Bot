import moment from "moment-timezone";
import {escapeHtml} from "../utils/escapeHtml.js";

const DATE_FORMAT = "DD MMM YYYY, hh:mm A";
const TIME_ZONE = "Asia/Kolkata";

const formatDate = (date) => moment(date).tz(TIME_ZONE).format(DATE_FORMAT);

const buildRow = (data, index) => `
    <tr>
        <td>${index + 1}</td>
        <td><a href="/${escapeHtml(data.shortId)}">${escapeHtml(data.shortId)}</a></td>
        <td>${escapeHtml(data.redirectUrl)}</td>
        <td>${data.visits}</td>
        <td>${formatDate(data.createdAt)}</td>
        <td>${data.lastVisitedAt ? formatDate(data.lastVisitedAt) : "Not visited yet"}</td>
    </tr>`;

export function renderAnalyticsPage(urls) {
    return `<!doctype html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>URL Analytics</title>
            <style>
                body { font-family: sans-serif; margin: 24px; }
                table { border-collapse: collapse; width: 100%; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; word-break: break-all; }
                th { background: #f4f4f4; }
            </style>
        </head>
        <body>
            <h1>URL Analytics</h1>
            <p>${urls.length} links</p>
            <table>
                <tr><th>#</th><th>Short ID</th><th>Redirect URL</th><th>Visits</th><th>Created (IST)</th><th>Last visited (IST)</th></tr>
                ${urls.map(buildRow).join("")}
            </table>
        </body>
        </html>`;
}
