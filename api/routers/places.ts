import express from "express";
import mysqlDb from "../mysqlDb";
import {Item, Place, PlaceMutation} from "../types";
import {ResultSetHeader} from "mysql2";

const placesRouter = express.Router();

placesRouter.get('/', async (req, res, next) => {
    try {
        const connection = await mysqlDb.getConnection();
        const [result] = await connection.query('SELECT id, name from places');
        const places = result as Place[];

        res.send(places);
    } catch (e) {
        next(e);
    }
});

placesRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;

    if (!req.params.id) {
        res.status(404).send({error: "Not Found"});
        return;
    }

    try {
        const connection = await mysqlDb.getConnection();

        const [result] = await connection.query('SELECT * FROM places WHERE id = ?', [id]);
        const places = result as Place[];

        if (places.length === 0) {
            res.status(404).send({error: "Place Not Found"});
            return;
        } else {
            res.send(places[0]);
        }
    } catch (e) {
        next(e);
    }
});

placesRouter.post('/', async (req, res, next) => {
    if (!req.body.name) {
        res.status(400).send({error: "Set the place name, it's required."});
        return;
    }

    const place: PlaceMutation = {
        name: req.body.name,
        description: req.body.description,
    };

    try {
        const connection = await mysqlDb.getConnection();

        const [result] = await connection.query('INSERT INTO places (name, description) VALUES (?, ?)', [place.name, place.description]);
        const resultHeader = result as ResultSetHeader;

        const [resultPlace] = await connection.query('SELECT * FROM places WHERE id = ?', [resultHeader.insertId]);
        const places = resultPlace as Place[];

        if (places.length === 0) {
            res.status(404).send({error: "Place Not Found"});
            return;
        } else {
            res.send(places[0]);
        }
    } catch (e) {
        next(e);
    }
});

placesRouter.delete('/:id', async (req, res, next) => {
    const id: string = req.params.id;

    if (!req.params.id) {
        res.status(404).send({error: "Not Found"});
        return;
    }

    try {
        const connection = await mysqlDb.getConnection();

        const [placesResult] = await connection.query('SELECT * FROM places WHERE id = ?', [id]);
        const places = placesResult as Place[];

        if (places.length === 0) {
            res.status(404).send({error: "Place Not Found"});
            return;
        }

        const [itemsResult] = await connection.query('SELECT * FROM items WHERE place_id = ?', [id]);
        const relatedItems = itemsResult as Item[];

        if (relatedItems.length !== 0) {
            res.status(400).send({error: "Impossible to delete this place due to the relations in 'items' table"});
            return;
        } else {
            await connection.query('DELETE FROM places WHERE id = ?', [id]);
            res.send({message: "Place Deleted Successfully"});
        }

    } catch (e) {
        next(e);
    }
});

placesRouter.put('/:id', async (req, res, next) => {
    const id: string = req.params.id;

    if (!req.params.id) {
        res.status(404).send({error: "Not Found"});
        return;
    }

    try {
        if (!req.body.name) {
            res.status(400).send({error: "Set the place name, it's required."});
            return;
        }

        const connection = await mysqlDb.getConnection();

        const [result] = await connection.query('SELECT * FROM places WHERE id = ?', [id]);
        const places = result as Place[];

        if (places.length === 0) {
            res.status(404).send({error: "Place Not Found"});
            return;
        } else {
            await connection.query('UPDATE places SET name = ?, description = ? WHERE id = ?', [req.body.name, req.body.description, id]);
        }

        const [updatedPlace] = await connection.query('SELECT * FROM places WHERE id = ?', [id]);
        const updatedData = updatedPlace as Place[];

        if (updatedData.length === 0) {
            res.status(400).send({error: "Failed to update place"});
            return;
        }

        res.send(updatedData[0]);
    } catch (e) {
        next(e);
    }
});

export default placesRouter;