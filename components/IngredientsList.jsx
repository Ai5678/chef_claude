export default function IngredientsList(props){
    console.log(props)
    const ingredientItems = props.ingredientsArray.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    return(
        <section>
                <h2>Ingredients on hand</h2>
                <ul className="ingredients-list" aria-live="polite">{ingredientItems}</ul>
                    {props.ingredientsArray.length > 3 && <div className="get-recipe-container">
                        <div ref={props.reference}>
                            <h3>Ready for a recipe?</h3>
                            <p>Generate a recipe from your list of ingredients.</p>
                        </div>
                        <button onClick={props.showRecipe}>Get a recipe</button>
                    </div>}
            </section>
    )
}