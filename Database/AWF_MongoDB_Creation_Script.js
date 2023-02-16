
db = connect( 'mongodb://localhost/AWFdb' );

//Inserting History questions into the database.
db.quizes.insertMany([
    { category: "History", qTxt: "The modern-day city Istanbul last used to be called:", qAns: 4, a1Txt: "Byzantium", a2Txt: "Tsargrad", a3Txt: "Ankara", a4Txt: "Constantinople"},
    { category: "History", qTxt: "Germany was unified in the 1800's by which state:", qAns: 3, a1Txt: "Austria", a2Txt: "Hanover", a3Txt: "Prussia", a4Txt: "Russia"},
    { category: "History", qTxt: "Canada's oldest company is:", qAns: 4, a1Txt: "Tim Hortons", a2Txt: "Royal Bank of Canada (RBC)", a3Txt: "Irving Oil", a4Txt: "Hudson's Bay Company (HBC)"},
    { category: "History", qTxt: "What was the name of the first Roman Emperor?", qAns: 3, a1Txt: "Nero", a2Txt: "Hardian", a3Txt: "Augustus", a4Txt: "Claudius"},
    { category: "History", qTxt: "What historical event was Anne Frank a part of?", qAns: 3, a1Txt: "Partisan resistance to Nazi rule", a2Txt: "The Holodomor", a3Txt: "The Holocaust", a4Txt: "Operation Market Garden"}, 
    { category: "History", qTxt: "", qAns: 0, a1Txt: "", a2Txt: "", a3Txt: "", a4Txt: ""}/*STUB*/, 
]);

//Inserting Science 
db.quizes.insertMany([
    { category: "Science", qTxt: "JWST stands for:", qAns: 2, a1Txt: "Jack Weber Science Technology", a2Txt: "James Webb Space Telescope", a3Txt: "Jehova's Witness Space Telescope", a4Txt: "James Weber Scholarship Technique"},
    { category: "Science", qTxt: "The closest star to the Sun is:", qAns: 2, a1Txt: "Rigil Kentaurus", a2Txt: "Proxima Centauri", a3Txt: "Toilman", a4Txt: "Barnard's Star"},
    { category: "Science", qTxt: "The chemical symbol for Gold is:", qAns: 4, a1Txt: "Ag", a2Txt: "Gl", a3Txt: "Fe", a4Txt: "Au"},
    { category: "Science", qTxt: "", qAns: 0, a1Txt: "", a2Txt: "", a3Txt: "", a4Txt: ""}/*STUB*/, 
]);

//Inserting Math 
db.quizes.insertMany([
    { category: "Math", qTxt: "(1 + 1)*(2 - 3) = ?:", qAns: 3, a1Txt: "1", a2Txt: "2", a3Txt: "-2", a4Txt: "3"},
    { category: "Math", qTxt: "The derivative of the function 4*x^2 = ?:", qAns: 4, a1Txt: "2*x", a2Txt: "4*x", a3Txt: "6*x", a4Txt: "8*x"},
    { category: "Math", qTxt: "", qAns: 0, a1Txt: "", a2Txt: "", a3Txt: "", a4Txt: ""}/*STUB*/, 
]);

//Inserting Literature 
db.quizes.insertMany([
    { category: "Literature", qTxt: "War and Peace was written by:", qAns: 2, a1Txt: "William Shakespeare", a2Txt: "Leo Tolstoy", a3Txt: "Fyodor Dostoyevsky", a4Txt: "Margaret Gilbert"},
    { category: "Literature", qTxt: "The Handmaiden's Tale was written by:", qAns: 3, a1Txt: "Jane Austen", a2Txt: "Mary Shelley", a3Txt: "Margaret Atwood", a4Txt: "Margaret Thatcher"},
    { category: "Literature", qTxt: "", qAns: 0, a1Txt: "", a2Txt: "", a3Txt: "", a4Txt: ""}/*STUB*/, 

]);