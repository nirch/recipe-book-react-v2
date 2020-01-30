export default class RecipeModel {
    constructor(parseRecipe) {
        this.id = parseRecipe.id;
        this.name = parseRecipe.get("name");
        this.desc = parseRecipe.get("desc");
        this.img = parseRecipe.get("image")._url;
        this.difficulty = parseRecipe.get("difficulty");
    } 
}