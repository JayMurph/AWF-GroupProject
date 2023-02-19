//This script is just an example of how to do a randomized query.

//Will return a single random quiz with in the History topic.
db.quizes.aggregate([{$match: {category: "History"}}, {$sample: {size: 1} }])