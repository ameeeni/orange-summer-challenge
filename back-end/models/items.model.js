module.exports = mongoose => {
    const items = mongoose.model(
        "items",
        mongoose.Schema({
            itemName: String,
            description: String,
            price: Boolean
        }, { timestamps: true })
    );
    return items;
};