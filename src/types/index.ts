export interface Ingredient {
  ingredientName: string;
  measure: string;
}

export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  RecipeDetail: { recipeId: string };
  Favorites: undefined;
  MyRecipes: undefined;
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
