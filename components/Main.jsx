import {useState} from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";

export default function Main(){
    const [ingredients, setIngredients] = useState([]);
    const [recipe, setRecipe] = useState("");


    function addIngredient(formData){
        const newIngredient = formData.get("ingredient");
        setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
    }

    async function toggleRecipeShown(){
        try{
            const response = await fetch("/api/recipe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(ingredients)
            });
            const data = await response.json();
            setRecipe(data.recipe);
        }
        catch(error){
            console.error(error);
        }
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
            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}