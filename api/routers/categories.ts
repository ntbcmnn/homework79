import express from "express";
import {Category, CategoryMutation, Item} from "../types";
import mysqlDb from "../mysqlDb";
import {ResultSetHeader} from "mysql2";

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req, res, next) => {
    try {
        const connection = await mysqlDb.getConnection();
        const [result] = await connection.query('SELECT id, name from categories');
        const categories = result as Category[];

        res.send(categories);
    } catch (e) {
        next(e);
    }
});

categoriesRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;

    if (!req.params.id) {
        res.status(404).send({error: "Not Found"});
        return;
    }

    try {
        const connection = await mysqlDb.getConnection();

        const [result] = await connection.query('SELECT * FROM categories WHERE id = ?', [id]);
        const categories = result as Category[];

        if (categories.length === 0) {
            res.status(404).send({error: "Category Not Found"});
            return;
        } else {
            res.send(categories[0]);
        }
    } catch (e) {
        next(e);
    }
});

categoriesRouter.post('/', async (req, res, next) => {
    if (!req.body.name) {
        res.status(400).send({error: "Please set a name, it's required."});
        return;
    }

    const category: CategoryMutation = {
        name: req.body.name,
        description: req.body.description,
    };

    try {
        const connection = await mysqlDb.getConnection();

        const [result] = await connection.query('INSERT INTO categories (name, description) VALUES (?, ?)', [category.name, category.description]);
        const resultHeader = result as ResultSetHeader;

        const [resultCategory] = await connection.query('SELECT * FROM categories WHERE id = ?', [resultHeader.insertId]);
        const categories = resultCategory as Category[];

        if (categories.length === 0) {
            res.status(404).send({error: "Category Not Found"});
            return;
        } else {
            res.send(categories[0]);
        }
    } catch (e) {
        next(e);
    }
});

categoriesRouter.delete('/:id', async (req, res, next) => {
    const id: string = req.params.id;

    if (!req.params.id) {
        res.status(404).send({error: "Not Found"});
        return;
    }

    try {
        const connection = await mysqlDb.getConnection();

        const [categoriesResult] = await connection.query('SELECT * FROM categories WHERE id = ?', [id]);
        const categories = categoriesResult as Category[];

        const [itemsResult] = await connection.query('SELECT * FROM items WHERE category_id = ?', [id]);
        const relatedItems = itemsResult as Item[];

        if (categories.length === 0) {
            res.status(404).send({error: "Category Not Found"});
            return;
        }

        if (relatedItems.length > 0) {
            res.status(400).send({error: "Impossible to delete this category due to the relations in 'items' table"});
            return;
        }

        await connection.query('DELETE FROM categories WHERE id = ?', [id]);
        res.send({message: "Category Deleted Successfully"});
    } catch (e) {
        next(e);
    }
});

categoriesRouter.put('/:id', async (req, res, next) => {
    const id: string = req.params.id;

    if (!req.params.id) {
        res.status(404).send({error: "Not Found"});
        return;
    }

    try {
        if (!req.body.name) {
            res.status(400).send({error: "Set the name, it's required."});
            return;
        }

        const connection = await mysqlDb.getConnection();

        const [result] = await connection.query('SELECT * FROM categories WHERE id = ?', [id]);
        const categories = result as Category[];

        if (categories.length === 0) {
            res.status(404).send({error: "Category Not Found"});
            return;
        } else {
            await connection.query('UPDATE categories SET name = ?, description = ? WHERE id = ?', [req.body.name, req.body.description, id]);
        }

        const [updatedCategory] = await connection.query('SELECT * FROM categories WHERE id = ?', [id]);
        const updatedData = updatedCategory as Category[];

        if (updatedData.length === 0) {
            res.status(400).send({error: "Failed to update category"});
            return;
        }

        res.send(updatedData[0]);
    } catch (e) {
        next(e);
    }
});

export default categoriesRouter;