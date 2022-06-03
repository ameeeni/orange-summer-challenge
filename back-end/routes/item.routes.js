module.exports = app => {
    const items = require("../controller/item.controller.js");
    var router = require("express").Router();
    // Create a new item
    router.post("/", items.create);
    // Retrieve all items
    router.get("/", items.findAll);
    // Retrieve all published 
    router.get("/published", items.findAllPublished);
    // Retrieve a single Tutorial with id
    router.get("/:id", items.findOne);
    // Update a Tutorial with id
    router.put("/:id", items.update);
    // Delete a Tutorial with id
    router.delete("/:id", items.delete);
    // Create a new Tutorial
    router.delete("/", items.deleteAll);
    app.use('/api/items', router);
};