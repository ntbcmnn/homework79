import express from "express";
import cors from "cors";
import mysqlDb from "./mysqlDb";
import categoriesRouter from "./routers/categories";
import placesRouter from "./routers/places";
import itemsRouter from "./routers/items";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/categories', categoriesRouter);
app.use('/places', placesRouter);
app.use('/items', itemsRouter);

const run = async () => {
    await mysqlDb.init();

    app.listen(port, () => {
        console.log(`Listening on port http://localhost:${port}`);
    });
};

run().catch(err => console.log(err));