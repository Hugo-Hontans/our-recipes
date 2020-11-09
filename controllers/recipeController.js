const Recipe = require("../schema/schemaRecipe.js");

async function getAllRecipes(req, res) {
    try {
        const recipes = await Recipe.find();
        return res.status(200).json({
            text: "Success",
            recipes
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

module.exports = function (app) {
    app.get('/getall', getAllRecipes);
}