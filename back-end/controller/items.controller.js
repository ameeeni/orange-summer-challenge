const db = require("../models");
const items = db.items;
// Create and Save a new item
exports.create = (req, res) => {
    // Validate request
    if (!req.body.itemName) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a item
    const item = new items({
        itemName: req.body.itemName,
        description: req.body.description,
        price: req.body.price ? req.body.price : false
    });
    // Save item in the database
    item
        .save(item)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the item."
            });
        });
};


// Retrieve all items from the database.
exports.findAll = (req, res) => {
    const itemName = req.query.itemName;
    var condition = itemName ? { itemName: { $regex: new RegExp(title), $options: "i" } } : {};
    Tutorial.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });

};
// Find a single item with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    items.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found item with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving item with id=" + id });
        });

};
// Update a item by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    items.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update item with id=${id}. Maybe item was not found!`
                });
            } else res.send({ message: "item was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating item with id=" + id
            });
        });

};
// Delete a item with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    items.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete item with id=${id}. Maybe item was not found!`
                });
            } else {
                res.send({
                    message: "item was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete item with id=" + id
            });
        });
};
// Delete all items from the database.
exports.deleteAll = (req, res) => {
    items.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Items were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Items."
            });
        });
};
// Find all items Tutorials
exports.findAllPublished = (req, res) => {
    items.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Items."
            });
        });
};