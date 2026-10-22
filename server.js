import express from "express";
import {PORT} from "./config.js";
import {getRedirectUrl} from "./services/urlService.js";

const app = express();

app.get("/:shortId", async (req, res) => {
    try {
        const redirectUrl = await getRedirectUrl(req.params.shortId);

        if(!redirectUrl) {
            return res.status(404).send("Short URL not found.");
        }

        res.redirect(redirectUrl);
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong.");
    }
});

export function startServer() {
    app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
}
