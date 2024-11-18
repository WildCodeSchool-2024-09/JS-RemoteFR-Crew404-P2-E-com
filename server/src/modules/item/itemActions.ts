import type { RequestHandler } from "express";
import api from "../../../database/api/index.json";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const items = api;

    // Respond with the items in JSON format

    // If query is provided, filter the items based on the query
    if (req.query.q) {
      const query = req.query.q as string;
      const filteredItems = items.filter((item) =>
        item.category.toLowerCase().includes(query.toLowerCase()),
      );
      res.json(filteredItems);
    } else {
      res.json(items);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID

    const item = api.find((item) => item.id === req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (item == null) {
      res.sendStatus(404);
    } else {
      res.json(item);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read };
