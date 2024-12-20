import express from "express";
import {Item, ItemMutation} from "../types";
import mysqlDb from "../mysqlDb";
import {ResultSetHeader} from "mysql2";
import {imagesUpload} from "../multer";

const itemsRouter = express.Router();

itemsRouter.get('/', async (req, res, next) => {
    try {
        const connection = await mysqlDb.getConnection();
        const [result] = await connection.query('SELECT id, name from items');
        const items = result as Item[];

        res.send(items);
    } catch (e) {
        next(e);
    }
});

itemsRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;

    if (!req.params.id) {
        res.status(404).send({error: "Not Found"});
        return;
    }

    try {
        const connection = await mysqlDb.getConnection();

        const [result] = await connection.query('SELECT * FROM items WHERE id = ?', [id]);
        const items = result as Item[];

        if (items.length === 0) {
            res.status(404).send({error: "Item Not Found"});
            return;
        } else {
            res.send(items[0]);
        }
    } catch (e) {
        next(e);
    }
});

itemsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    if (!req.body.category_id || !req.body.place_id || !req.body.name) {
        res.status(400).send({error: "Set the category_id, place_id & name."});
        return;
    }

    const item: ItemMutation = {
        category_id: Number(req.body.category_id),
        place_id: Number(req.body.place_id),
        name: req.body.name,
        description: req.body.description,
        image: req.file ? 'images' + req.file.filename : null
    };

    try {
        const connection = await mysqlDb.getConnection();

        const [result] = await connection.query('INSERT INTO items (category_id, place_id, name, description, image) VALUES (?, ?, ?, ?, ?)', [item.category_id, item.place_id, item.name, item.description, item.image]);
        const resultHeader = result as ResultSetHeader;

        const [resultItems] = await connection.query('SELECT * FROM items WHERE id = ?', [resultHeader.insertId]);
        const items = resultItems as Item[];

        if (items.length === 0) {
            res.status(404).send({error: "Item Not Found"});
            return;
        } else {
            res.send(items[0]);
        }
    } catch (e) {
        next(e);
    }
});

itemsRouter.delete('/:id', async (req, res, next) => {
    const id: string = req.params.id;

    if (!req.params.id) {
        res.status(404).send({error: "Not Found"});
        return;
    }

    try {
        const connection = await mysqlDb.getConnection();

        const [itemsResult] = await connection.query('SELECT * FROM items WHERE id = ?', [id]);
        const items = itemsResult as Item[];

        if (items.length === 0) {
            res.status(404).send({error: "Item Not Found"});
            return;
        }

        await connection.query('DELETE FROM items WHERE id = ?', [id]);
        res.send({message: "Item Deleted Successfully"});
    } catch (e) {
        next(e);
    }
});

itemsRouter.put('/:id', imagesUpload.single('image'), async (req, res, next) => {
    const id: string = req.params.id;

    if (!req.params.id) {
        res.status(404).send({error: "Not Found"});
        return;
    }

    try {
        if (!req.body.category_id || !req.body.place_id || !req.body.name) {
            res.status(400).send({error: "Set the category_id, place_id & name."});
            return;
        }

        const connection = await mysqlDb.getConnection();

        const [result] = await connection.query('SELECT * FROM items WHERE id = ?', [id]);
        const items = result as Item[];

        if (items.length === 0) {
            res.status(404).send({error: "Item Not Found"});
            return;
        } else {
            await connection.query('UPDATE items SET category_id = ?, place_id = ?, name = ?, description = ?, image = ?  WHERE id = ?', [req.body.category_id, req.body.place_id, req.body.name, req.body.description, req.body.image, id]);
        }

        const [updatedItem] = await connection.query('SELECT * FROM items WHERE id = ?', [id]);
        const updatedData = updatedItem as Item[];

        if (updatedData.length === 0) {
            res.status(400).send({error: "Failed to update this item"});
            return;
        }

        res.send(updatedData[0]);
    } catch (e) {
        next(e);
    }
});

export default itemsRouter;