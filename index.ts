import express from "express";
import { App } from './src/app/app';

const app = express();
const port = 3001;
const appScr = new App();

app.get("/", async (req, res) => {
    try {
        const result = await appScr.startScraping();
        res.json({ message: 'Scraper success', result });
    } catch (error) {
        return res.status(400).send(error)
    };
});

app.get("/get-data", async (req, res) => {
    try {
        const data = await appScr.getData();
        res.json(data);
    } catch (error) {
        return res.status(400).send(error)
    };
});

app.get("/init-db", async (req, res) => {
    try {
        await appScr.initDB();
    } catch (error) {
        console.warn('Error create table');
        return res.status(500).send(error)
    };
    res.json({ message: 'table created successful' });
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});