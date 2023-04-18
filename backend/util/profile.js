function calcStats(queryResult) {
    let highestScore = 0;
    let scoreAverage = 0; 
    let totalScore = 0;


    let first = true;
    for (doc of queryResult) {
        if (first == true) {
            highestScore = doc.finalScore;
            first = false;
        }
        totalScore += doc.finalScore;
    }


    quizzesCompleted = queryResult.length;
    scoreAverage = totalScore / quizzesCompleted;
    scoreAverage = (isNaN(scoreAverage)) ? scoreAverage = 0 : scoreAverage = scoreAverage;

    return [highestScore, Math.round(scoreAverage), totalScore, quizzesCompleted];
}

module.exports = {
    calcStats
};