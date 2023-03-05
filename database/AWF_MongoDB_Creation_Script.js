//Inserting History questions into the database.
db.quizzes.insertMany([
    { category: "History", qTxt: "The modern-day city Istanbul last used to be called:", qAns: 4, a1Txt: "Byzantium", a2Txt: "Tsargrad", a3Txt: "Ankara", a4Txt: "Constantinople"},
    { category: "History", qTxt: "Germany was unified in the 1800's by which state:", qAns: 3, a1Txt: "Austria", a2Txt: "Hanover", a3Txt: "Prussia", a4Txt: "Russia"},
    { category: "History", qTxt: "Canada's oldest company is:", qAns: 4, a1Txt: "Tim Hortons", a2Txt: "Royal Bank of Canada (RBC)", a3Txt: "Irving Oil", a4Txt: "Hudson's Bay Company (HBC)"},
    { category: "History", qTxt: "What was the name of the first Roman Emperor?", qAns: 3, a1Txt: "Nero", a2Txt: "Hardian", a3Txt: "Augustus", a4Txt: "Claudius"},
    { category: "History", qTxt: "What historical event was Anne Frank a part of?", qAns: 3, a1Txt: "Partisan resistance to Nazi rule", a2Txt: "The Holodomor", a3Txt: "The Holocaust", a4Txt: "Operation Market Garden"}, 
    { category: "History", qTxt: "Which European city was the birthplace of the Renaissance?", qAns: 4, a1Txt: "Paris", a2Txt: "Berlin", a3Txt: "Madrid", a4Txt: "Florence"}, 
    { category: "History", qTxt: "When did the Apollo 11 land on the moon?", qAns: 2, a1Txt: "1980", a2Txt: "1969", a3Txt: "1972", a4Txt: "1987"},
    { category: "History", qTxt: "What year did World War II end?", qAns: 1, a1Txt: "1945", a2Txt: "1927", a3Txt: "1935", a4Txt: "1910"},
    { category: "History", qTxt: "Who was the last monarch of France before the French Revolution?", qAns: 4, a1Txt: "Louis XIII", a2Txt: "Henry IV", a3Txt: "Louis XV", a4Txt: "Louis XVI"},
    { category: "History", qTxt: "Who was the first Prime Minister of United Kingdom?", qAns: 3, a1Txt: "Margaret Thatcher", a2Txt: "Indira Gandhi", a3Txt: "Sir Robert Walpole", a4Txt: "Theresa May"}/*STUB*/, 
]);

//Inserting Science 
db.quizzes.insertMany([
    { category: "Science", qTxt: "JWST stands for:", qAns: 2, a1Txt: "Jack Weber Science Technology", a2Txt: "James Webb Space Telescope", a3Txt: "Jehova's Witness Space Telescope", a4Txt: "James Weber Scholarship Technique"},
    { category: "Science", qTxt: "The closest star to the Sun is:", qAns: 2, a1Txt: "Rigil Kentaurus", a2Txt: "Proxima Centauri", a3Txt: "Toilman", a4Txt: "Barnard's Star"},
    { category: "Science", qTxt: "The chemical symbol for Gold is:", qAns: 4, a1Txt: "Ag", a2Txt: "Gl", a3Txt: "Fe", a4Txt: "Au"},
    { category: "Science", qTxt: "What is the process by which plants convert sunlight into energy called?", qAns: 2, a1Txt: "Respiration", a2Txt: "Photosynthesis", a3Txt: "Fermentation", a4Txt: "Digestion"},
    { category: "Science", qTxt: "What is the smallest planet in our solar system?", qAns: 3, a1Txt: "Mars", a2Txt: "Venus", a3Txt: "Earth", a4Txt: "Mercury"},
    { category: "Science", qTxt: "What is the closet planet to the sun?", qAns: 1, a1Txt: "Mercury", a2Txt: "Earth", a3Txt: "Jupiter", a4Txt: "Uranus"},
    { category: "Science", qTxt: "What is the most abundant element in the universe?", qAns: 1, a1Txt: "Hydrogen", a2Txt: "Oxygen", a3Txt: "Nitrogen", a4Txt: "Carbon"},
    { category: "Science", qTxt: "What is the largest organ in the human body?", qAns: 3, a1Txt: "Heart", a2Txt: "Liver", a3Txt: "Skin", a4Txt: "Brain"},
    { category: "Science", qTxt: "What is the name of this element 'AU'", qAns: 4, a1Txt: "Helium", a2Txt: "Silver", a3Txt: "Oxygen", a4Txt: "Gold"},
    { category: "Science", qTxt: "What is the process by which water changes from a liquid to a gas called?", qAns: 1, a1Txt: "Evaporation", a2Txt: "Condensation", a3Txt: "Vaporization", a4Txt: "Sublimation"}/*STUB*/, 
]);

//Inserting Math 
db.quizzes.insertMany([
    { category: "Math", qTxt: "(1 + 1)*(2 - 3) = ?:", qAns: 3, a1Txt: "1", a2Txt: "2", a3Txt: "-2", a4Txt: "3"},
    { category: "Math", qTxt: "The derivative of the function 4*x^2 = ?:", qAns: 4, a1Txt: "2*x", a2Txt: "4*x", a3Txt: "6*x", a4Txt: "8*x"},
    { category: "Math", qTxt: "1 + 1 = ?", qAns: 1, a1txt: "2", a2Txt: "3", a3Txt: "4", a4Txt: "5"},
    { category: "Math", qTxt: "What is the Pythagorean theorem?", qAns: 3, a1txt: "A^2 = b^2 + c^2", a2Txt: "a^2 + b^2 + c^2", a3Txt: "A^2 + b^2 = c^2", a4Txt: "A^2 - b^2 = c^2"},  
    { category: "Math", qTxt: "What is the sum of the anles in a triangle?", qAns: 4, a1txt: "270", a2Txt: "360", a3Txt: "90", a4Txt: "180"},  
    { category: "Math", qTxt: "What is the square root of 144?", qAns: 1, a1txt: "12", a2Txt: "5", a3Txt: "8", a4Txt: "6"},  
    { category: "Math", qTxt: "What is the formula for the volume of a sphere?", qAns: 2, a1txt: "πr^2", a2Txt: "(4/3)πr^2", a3Txt: "2πr", a4Txt: "4πr^2"},  
    { category: "Math", qTxt: "What is the name of the longest side of a right triangle?", qAns: 4, a1txt: "Width", a2Txt: "Adjacent", a3Txt: "Opposite", a4Txt: "Hypotnuse"},
    { category: "Math", qTxt: "What is the formula used to calculate the area of a triangle?", qAns: 3, a1txt: "LxW", a2Txt: "πr^2", a3Txt: "1/2xBxH", a4Txt: "A = (a + b + c) / 2"},
    { category: "Math", qTxt: "What is the value of pi to two decimal places", qAns:2, a1Txt: "3.14", a2Txt: "3.15", a3Txt: "3.18", a4Txt: "2.3"}/*STUB*/, 
]);

//Inserting Literature 
db.quizzes.insertMany([
    { category: "Literature", qTxt: "'War and Peace' was written by:", qAns: 2, a1Txt: "William Shakespeare", a2Txt: "Leo Tolstoy", a3Txt: "Fyodor Dostoyevsky", a4Txt: "Margaret Gilbert"},
    { category: "Literature", qTxt: "'The Handmaiden's Tale' was written by:", qAns: 3, a1Txt: "Jane Austen", a2Txt: "Mary Shelley", a3Txt: "Margaret Atwood", a4Txt: "Margaret Thatcher"},
    { category: "Literature", qTxt: "Who wrote the 'Harry Potter series'?", qAns: 1, a1Txt: "J.K Rowling", a2Txt: "C.S Lewis", a3Txt: "Stephen King", a4Txt: "R.L Stine"},
    { category: "Literature", qTxt: "Who wrote the book 'The Diary of a Young Girl", qAns: 4, a1Txt: "Primo Levi", a2Txt: "Elie Wiesel", a3Txt: "Helen Keller", a4Txt: "Anne Frank"},
    { category: "Literature", qTxt: "The 'Goosebumps' series is written by:", qAns: 2, a1Txt: "J.R.R Tolkien", a2Txt: "R.L Stine", a3Txt: "George R.R Martin", a4Txt: "Edith Tolkien"},
    { category: "Literature", qTxt: "Which of the following is not a 'Shakespeare' play?", qAns: 3, a1Txt: "Hamlet", a2Txt: "Macbeth", a3Txt: "The great Gatsby", a4Txt: "Romeo and Juliet"},
    { category: "Literature", qTxt: "'The Ligthning Theif' was written by:", qAns: 4, a1Txt: "Becky Riordan", a2Txt: "Logan Lerman", a3Txt: "f. Scott Fitzgerald", a4Txt: "Rick Riordan"},
    { category: "Literature", qTxt: "'To Kill a Mockingbird' is written by:", qAns: 2, a1Txt: "Ernest Hemingway", a2Txt: "Harper Lee", a3Txt: "Maya Angelou", a4Txt: "Alice Walker"},
    { category: "Literature", qTxt:  "'The Hunger Games' series was written by:", qAns: 1, a1Txt: "Suzanne Collins", a2Txt: "Mark Cotta Vaz", a3Txt: "Stephenie Meyer", a4Txt: "John Green"},
    { category: "Literature", qTxt: "'The Raven' was written by?", qAns: 3, a1Txt: "William Shakespeare", a2Txt: "Henry James", a3Txt: "Edgar Allan Poe", a4Txt: "Henry James"}/*STUB*/, 
]);

