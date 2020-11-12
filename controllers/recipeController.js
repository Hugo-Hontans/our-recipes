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

async function createRecipe(req, res) {
    const recipe = req.body;
    recipe.userName = req.headers.username;
    try {
        // Save recipe in DB
        const recipeData = new Recipe(recipe);
        await recipeData.save();
        return res.status(200).json({
          text: "Success",
        });
      } catch (error) {
        return res.status(500).json({ error });
      }
}

module.exports = function (app) {
    app.get('/getall', getAllRecipes);
    app.post('/create', createRecipe);
}