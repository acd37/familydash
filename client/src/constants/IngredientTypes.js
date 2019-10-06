const ingredients = [
  {
    descriptor: ['apple', 'apples'],
    image: 'apple'
  },
  {
    descriptor: ['asparagus'],
    image: 'asparagus'
  },
  {
    descriptor: ['aubergine', 'eggplant', 'aubergines', 'eggplants'],
    image: 'aubergine'
  },
  {
    descriptor: ['avocado', 'avocados'],
    image: 'avocado'
  },
  {
    descriptor: ['bacon', 'speck'],
    image: 'bacon'
  },
  {
    descriptor: ['baguette'],
    image: 'baguette'
  },
  {
    descriptor: ['banana', 'bananas'],
    image: 'banana'
  },
  {
    descriptor: ['bean', 'beans'],
    image: 'beans'
  },
  {
    descriptor: ['beer', 'shandy', 'ale', 'beers', 'shandys', 'ales'],
    image: 'beer'
  },
  {
    descriptor: ['bell', 'peppers'],
    image: 'bellpepper'
  },
  {
    descriptor: ['biscuit', 'biscuits'],
    image: 'biscuit'
  },
  {
    descriptor: ['blueberry', 'blueberries'],
    image: 'blueberries'
  },
  {
    descriptor: ['bread', 'breads', 'roll', 'rolls'],
    image: 'bread'
  },
  {
    descriptor: ['broccoli'],
    image: 'broccoli'
  },
  {
    descriptor: ['butter', 'margerine'],
    image: 'butter'
  },
  {
    descriptor: ['cabbage', 'cabbages'],
    image: 'cabbage'
  },
  {
    descriptor: ['cake', 'cakes'],
    image: 'cake'
  },
  {
    descriptor: ['can'],
    image: 'can'
  },
  {
    descriptor: ['candy'],
    image: 'candy'
  },
  {
    descriptor: ['carrot', 'carrots'],
    image: 'carrot'
  },
  {
    descriptor: ['cauliflower', 'cauliflowers'],
    image: 'cauliflower'
  },
  {
    descriptor: ['cereal', 'cereals', 'chex'],
    image: 'cereal'
  },
  {
    descriptor: ['champagne'],
    image: 'champagne'
  },
  {
    descriptor: ['cheese', 'cheeses', 'parmesan', 'cheddar'],
    image: 'cheese'
  },
  {
    descriptor: ['cherry', 'cherries', 'kirsch'],
    image: 'cherries'
  },
  {
    descriptor: ['chicken', 'wings', 'chickens', 'wing'],
    image: 'chicken'
  },
  {
    descriptor: ['chili'],
    image: 'chili'
  },
  {
    descriptor: ['chip', 'chips'],
    image: 'chips'
  },
  {
    descriptor: ['chive', 'chives'],
    image: 'chives'
  },
  {
    descriptor: ['chocolate', 'chocolates'],
    image: 'chocolate'
  },
  {
    descriptor: ['cocktail', 'cocktails', 'margarita'],
    image: 'cocktail'
  },
  {
    descriptor: ['coconut', 'coconuts'],
    image: 'coconut'
  },
  {
    descriptor: ['coffee', 'coffees'],
    image: 'coffee'
  },
  {
    descriptor: ['cookie', 'cookies'],
    image: 'cookies'
  },
  {
    descriptor: ['corn', 'corns', 'cob'],
    image: 'corn'
  },
  {
    descriptor: ['corndog', 'corndogs'],
    image: 'corndog'
  },
  {
    descriptor: ['croissant', 'croissants'],
    image: 'croissant'
  },
  {
    descriptor: ['cucumber', 'cucumbers'],
    image: 'cucumber'
  },

  {
    descriptor: ['cupcake', 'cupcakes', 'muffin', 'muffins'],
    image: 'cupcake'
  },

  {
    descriptor: ['doughnut', 'doughnuts', 'donut', 'donuts'],
    image: 'doughnut-1'
  },
  {
    descriptor: ['egg', 'eggs'],
    image: 'egg'
  },
  {
    descriptor: ['fig', 'figs'],
    image: 'fig'
  },
  {
    descriptor: ['fish', 'fishes'],
    image: 'fish'
  },
  {
    descriptor: ['flour'],
    image: 'flour'
  },
  {
    descriptor: ['frappe'],
    image: 'frappe'
  },
  {
    descriptor: ['fries', 'fry'],
    image: 'fries'
  },
  {
    descriptor: ['garlic'],
    image: 'garlic'
  },
  {
    descriptor: ['ginger', 'gingerbread'],
    image: 'gingerbread'
  },
  {
    descriptor: ['grain', 'grains'],
    image: 'grain'
  },
  {
    descriptor: ['grape', 'grapes'],
    image: 'grapes'
  },
  {
    descriptor: ['grocery', 'groceries'],
    image: 'groceries'
  },
  {
    descriptor: ['ham', 'gammon', 'hamsteak'],
    image: 'ham'
  },
  {
    descriptor: ['hamburger', 'hamburgers', 'burger', 'burgers', 'cheeseburger', 'cheeseburgers'],
    image: 'hamburger'
  },
  {
    descriptor: ['hazelnut', 'hazelnuts', 'nutella'],
    image: 'hazelnut'
  },
  {
    descriptor: ['honey'],
    image: 'honey'
  },
  {
    descriptor: ['hotdog', 'hotdogs', 'dog'],
    image: 'hot-dog-1'
  },
  {
    descriptor: ['icecream', 'ice cream'],
    image: 'ice-cream-12'
  },
  {
    descriptor: ['jam', 'jams'],
    image: 'jam-1'
  },
  {
    descriptor: ['jelly', 'jellies'],
    image: 'jelly'
  },
  {
    descriptor: ['kebab', 'kabob', 'kebabs', 'kabobs', 'shish'],
    image: 'kebab-1'
  },
  {
    descriptor: ['ketchup', 'catsup'],
    image: 'ketchup'
  },
  {
    descriptor: ['lemon', 'lemons'],
    image: 'lemon-1'
  },
  {
    descriptor: ['lime', 'limes', 'keylime', 'keylimes'],
    image: 'lime'
  },
  {
    descriptor: ['martini'],
    image: 'martini'
  },
  {
    descriptor: ['milk'],
    image: 'milk-1'
  },
  {
    descriptor: ['mushroom', 'mushrooms'],
    image: 'mushroom'
  },
  {
    descriptor: ['mustard'],
    image: 'mustard-1'
  },
  {
    descriptor: ['noodle', 'noodles'],
    image: 'noodles'
  },
  {
    descriptor: ['oat', 'oats'],
    image: 'oat'
  },
  {
    descriptor: ['octopus'],
    image: 'octopus'
  },
  {
    descriptor: ['oil', 'oils'],
    image: 'oil'
  },
  {
    descriptor: ['olive', 'olives'],
    image: 'olives'
  },
  {
    descriptor: ['onion', 'onions'],
    image: 'onion-1'
  },
  {
    descriptor: ['orange', 'oranges'],
    image: 'orange'
  },
  {
    descriptor: ['pancake', 'pancakes'],
    image: 'pancakes'
  },
  {
    descriptor: ['pasta', 'penne'],
    image: 'pasta'
  },
  {
    descriptor: ['peach', 'peaches'],
    image: 'peach'
  },
  {
    descriptor: ['pear', 'pears'],
    image: 'pear'
  },
  {
    descriptor: ['pea', 'peas'],
    image: 'peas'
  },
  {
    descriptor: ['pepper'],
    image: 'pepper-1'
  },
  {
    descriptor: ['pickle', 'pickles', 'ghurkin', 'ghurkins'],
    image: 'pickles'
  },
  {
    descriptor: ['pie', 'pies'],
    image: 'pie'
  },
  {
    descriptor: ['pineapple', 'pineapples'],
    image: 'pineapple'
  },

  {
    descriptor: ['pistachio', 'pistachios'],
    image: 'pistachio'
  },
  {
    descriptor: ['pizza'],
    image: 'pizza-4'
  },
  {
    descriptor: ['pomegranate', 'pomegranates'],
    image: 'pomegranate'
  },
  {
    descriptor: ['popscile', 'popsicles'],
    image: 'popsicle'
  },
  {
    descriptor: ['potato', 'potatoes'],
    image: 'potatoes-2'
  },
  {
    descriptor: ['pretzel', 'pretzels'],
    image: 'pretzel'
  },
  {
    descriptor: ['pudding'],
    image: 'pudding'
  },
  {
    descriptor: ['pumpkin', 'pumkins'],
    image: 'pumpkin'
  },
  {
    descriptor: ['radish', 'radishes'],
    image: 'radish'
  },
  {
    descriptor: ['raspberry', 'raspberries'],
    image: 'raspberry'
  },
  {
    descriptor: ['rice'],
    image: 'rice'
  },
  {
    descriptor: ['risotto'],
    image: 'risotto'
  },

  {
    descriptor: ['salad', 'salads'],
    image: 'salad'
  },
  {
    descriptor: ['salami', 'salamis'],
    image: 'salami'
  },
  {
    descriptor: ['salt'],
    image: 'salt'
  },
  {
    descriptor: ['sausage', 'sausages', 'bratwurst', 'bratwursts'],
    image: 'sausage'
  },
  {
    descriptor: ['seed', 'seeds'],
    image: 'seeds'
  },
  {
    descriptor: ['shrimp'],
    image: 'shrimp'
  },
  {
    descriptor: ['soda', 'soda', 'coke', 'sprite'],
    image: 'soda'
  },
  {
    descriptor: ['sorbet'],
    image: 'sorbet'
  },
  {
    descriptor: ['spaghetti', 'tagliatelli'],
    image: 'spaghetti'
  },
  {
    descriptor: ['spice', 'spices', 'herb', 'herbs'],
    image: 'spices'
  },

  {
    descriptor: ['steak', 'beef', 'steaks'],
    image: 'steak'
  },
  {
    descriptor: ['strawberry', 'strawberries'],
    image: 'strawberry'
  },
  {
    descriptor: ['sucker', 'suckers', 'lollipop', 'lollipops'],
    image: 'sucker'
  },
  {
    descriptor: ['sushi'],
    image: 'sushi-1'
  },
  {
    descriptor: ['taco', 'tacos'],
    image: 'taco'
  },
  {
    descriptor: ['tea', 'teapot'],
    image: 'teapot-1'
  },
  {
    descriptor: ['toffee', 'toffees'],
    image: 'toffee'
  },
  {
    descriptor: ['tomatoes', 'tomato'],
    image: 'tomato'
  },
  {
    descriptor: ['turkey'],
    image: 'turkey'
  },
  {
    descriptor: ['water'],
    image: 'water'
  },
  {
    descriptor: ['watermelon', 'watermelons'],
    image: 'watermelon'
  },

  {
    descriptor: ['wine', 'vino'],
    image: 'wine'
  }
];

export default ingredients;
