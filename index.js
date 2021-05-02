const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

const newRecipe = {
  title: "Avocado Toast",
  level: "Easy Peasy",
  ingredients: ["One ripe avocado", "salt", "pepper", "one slice of whole grain bread", "olive oil" , "lemon", "cilantro", "tomato", "onion"],
  cuisine: "Vegan",
  dishType: "breakfast",
  image: "https://gimmedelicious.com/wp-content/uploads/2016/07/avocado-toast-7-of-13.jpg",
  duration: 10,
  creator: "Avocado Kingdom",
}

Recipe.create(newRecipe)
.then(newRecipe => console.log('Recipe ' + newRecipe.title + ' created'))
.catch(error => console.log('Recipe not inserted!!'))
//did not know how to add the save() method here!

Recipe.insertMany(data)
.then(recipes => 
  recipes.forEach(element => {
      console.log(element.title);
    })
    //did not know how to add the save() method here!
).catch(error => console.log("data not inserted!!"))


const RigatoniChange = Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{duration:100})
.then (console.log ("Duration of Rigatoni alla Genovese updated"))
.catch (error => console.log("Rigatoni not updated"));


const CarrotCakeChange = Recipe.deleteOne({title: "Carrot Cake"})
.then (console.log("Carrot Cake successfully removed"))
.catch(error => console.log("Carrot Cake lives another day!"));


Promise.all([RigatoniChange,CarrotCakeChange])
.then (() => {
  mongoose.connection.close();
})
  .catch (error => console.log("I'm still here!"));
  