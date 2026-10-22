import {nanoid} from "nanoid";
import UrlModel from "../models/url.js";
import {BOT_USER_ID, ID_LENGTH} from "../config.js";

const ALLOWED_PROTOCOLS = ["http:", "https:"];

export function isValidHttpUrl(value) {
    try {
        const parsed = new URL(value.trim());
        return ALLOWED_PROTOCOLS.includes(parsed.protocol);
    } catch {
        return false;
    }
}

export async function createShortUrl(url) {
    const shortId = nanoid(ID_LENGTH);
    await UrlModel.create({
        shortId,
        redirectUrl: url,
        visitHistory: [],
        createdBy: BOT_USER_ID
    });

    return shortId;
}

export async function getRedirectUrl(shortId) {
    const entry = await UrlModel.findOneAndUpdate(
        {shortId},
        {$push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        }
    );

    return entry?.redirectUrl;
}
