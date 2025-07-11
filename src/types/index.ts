export interface Ingredient {
  ingredientName: string;
  measure: string;
}

export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  RecipeDetail: { food: Food };
  Favorites: undefined;
  MyRecipes: undefined;
  RecipeForm: { foodToEdit?: Food };
};

export interface Food {
  category: string;
  idFood: string;
  idCategory: string;
  recipeName: string;
  recipeInstructions: string;
  recipeImage: string;
  recipeId: string;
  alternateDrink: string | null;
  recipeCategory: string;
  recipeOrigin: string;
  cookingDescription: string;
  recipeTags: string;
  ingredients: Ingredient[];
}

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
}
