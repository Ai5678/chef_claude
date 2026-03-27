import {useState} from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";

export default function Main(){
    const [ingredients, setIngredients] = useState([]);
    const [recipeShown, setRecipeShown] = useState(false);


    function addIngredient(formData){
        const newIngredient = formData.get("ingredient");
        setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
    }

    function toggleRecipeShown(){
        setRecipeShown(prev => !prev);
    }

    return(
        <main>
            <form className="add-ingredient-form" action={addIngredient}>
                <input 
                    aria-label="Add ingredient"
                    type = "text"
                    placeholder = "e.g. oregano"
                    name="ingredient"
                />
                <button>Add Ingredient</button>
            </form>
            {ingredients.length > 0 && <IngredientsList ingredientsArray = {ingredients} showRecipe={toggleRecipeShown}/>}
            {recipeShown && <ClaudeRecipe />}
        </main>
    )
}