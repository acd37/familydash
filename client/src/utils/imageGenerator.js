import ingredients from '../constants/IngredientTypes';

const imageGenerator = (ingredient) => {
  const splitIngredientStr = ingredient.split(/[\s,]+/);
  if (splitIngredientStr.length === 1) {
    for (let i = 0; i < ingredients.length; i++) {
      if (ingredients[i].descriptor.includes(splitIngredientStr[0].toLowerCase())) {
        return ingredients[i].image;
      }
    }
  } else if (splitIngredientStr.length > 1) {
    for (let i = 0; i < ingredients.length; i++) {
      for (let j = 0; j < splitIngredientStr.length; j++) {
        if (ingredients[i].descriptor.includes(splitIngredientStr[j].toLowerCase())) {
          return ingredients[i].image;
        }
      }
    }
  }

  return 'groceries';
};

export default imageGenerator;
