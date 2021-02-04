let database, dog, dog1, dog2; // Dog and Database
let feed, add, food, position;
let input, ownerName, dogName, input1;
let feedTime, lastFeed;
let numberOfFood;

// Loading Images and Sound
function preload() {
  dogImg1 = loadImage("images/dogImg.png");
  dogImg2 = loadImage("images/dogImg1.png");
  // woof = loadSound("bark.mp3");
}

function setup() {
  // Canvas and DataBase
  const canvas = createCanvas(900, 500);
  database = firebase.database();

  // Dog
  dog = createSprite(550, 250, 10, 10);
  dog.addImage(dogImg1);
  dog.scale = 0.2;

  // Food
  food = new Food();

  // DogFood for the DataBase
  let dogFood = database.ref("Food");
  dogFood.on(
    "value",
    (data) => {
      // Getting the Data
      position = data.val();
      food.updateFoodStock(position);
    },
    (error) => {
      // Error Handling
      console.error(error);
    }
  );
  // Interface
  input = select("#name");
  input2 = select("#dogName");
  let button = select("#submit");
  button.mousePressed(changeName);

  // Fedding Food Button
  feed = createButton("Feed " + input2.value());
  feed.position(470, 300);
  feed.mousePressed(feedDog);

  // Adding Food Button
  add = createButton("Add Food");
  add.position(600, 300);
  add.mousePressed(addDogFood);
}

function draw() {
  // Background
  background(46, 139, 87);

  // Some Annottions
  fill("white");
  textSize(24);
  textFont("VT323");
  text(
    "Hi " + ownerName + ", I am " + dogName + " your Virtual Pet 🐕",
    30,
    30
  );

  // Displaying the Food
  food.display();

  // Interacting wth dog
  if (mousePressedOver(dog)) {
    // playSound(woof);
    console.log("woof");
  }

  // Drawing he Sprites
  drawSprites();
}

// Reducing the Value fo Food.
function writeStock(x) {
  if (x > 0) {
    x = x - 1;
  } else {
    x = 0;
  }
  database.ref("/").set({
    Food: foodS,
  });
  numberOfFood = x;
}

// Adding the Dog Food Function
function addDogFood() {
  position++;
  database.ref("/").update({
    Food: position,
  });
}

// Feeding the Dog Function
function feedDog() {
  dog.addImage(dogImg2);
  food.updateFoodStock(food.getFoodStock() - 1);
  database.ref("/").update({
    Food: food.getFoodStock(),
    feedTime: hour(),
  });
}

// Naming
function changeName() {
  ownerName = input.value();
  dogName = input2.value();
}
