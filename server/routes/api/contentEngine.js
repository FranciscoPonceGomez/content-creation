const spacyNLP = require("spacy-nlp");
const natural = require('natural')

// vocabulary
let spicy_start = ['Besides all the effort', 'Wow that was crazy! Do you think', 'Did it again!', 'She is really good!'];
let spicy_end = ['and walk away', 'to consolidate his dominance', 'and call it a day', 'because he is up to no good'];
let elimination_intro = ['will eliminate', 'will rekt', 'will dominate', 'will own', 'will obliterate', 'will kill'];
let death_intro = ['will be eliminated', 'will get rekt', 'will be blasted', 'will be killed'];
let position_intro = ['will win', 'will lose', 'will get a victory royale'];
let survival_intro = ['will make it to', 'will survive to', 'will place'];
let start_intro = ['Ninja'];
let numbers = [2,3,4,5,6,7,8,9];
let time = [numbers.map(x => 'in the next ' + x + ' minutes'), 'before the end of game'];
let rank = ['top 50', 'top 25', 'top 10', 'top 5', 'top 3'];
let filler = ['this game', 'this match', 'this session'];
let count = [numbers.map(x => x + ' players'), numbers.map(x => x + ' times')];

    // semantic relationship
    let elimination = {
        "type": "elimination",
        "text": elimination_intro,
        "options": [
            [time],
            [time, count],
            [count],
            [spicy_end, time, count]
        ]
    };

    let death = {
        "type": "death",
        "text": death_intro,
        "options": [
            [time]
        ]
    };

    let position = {
        "type": "posisition",
        "text": position_intro,
        "options": [
            [filler],
            [spicy_end, filler]
        ]
    };

    let survival = {
        "type": "survival",
        "text": survival_intro,
        "options": [
            [rank],
        ]
    };

    let start = {
        "text": start_intro,
        "options": [
            [elimination],
            [death],
            [survival],
            [position]
        ]
    };

function generateVocab (survivors_filter) {

    numbers = [2,3,4,5,6,7,8,9].map(x => x < survivors_filter);
    if (survivors_filter < 3) {
        rank = ['top 1'];
    }
    if (survivors_filter < 5) {
        rank = ['top 50', 'top 25', 'top 10', 'top 5', 'top 3'].splice(3,4);
    }
    if (survivors_filter < 10) {
        rank = ['top 50', 'top 25', 'top 10', 'top 5', 'top 3'].splice(2,4);
    }
    if (survivors_filter < 25) {
        rank = ['top 50', 'top 25', 'top 10', 'top 5', 'top 3'].splice(1,4);
    }

    // semantic relationship
    elimination = {
        "type": "elimination",
        "text": elimination_intro,
        "options": [
            [time],
            [time, count],
            [count],
            [spicy_end, time, count]
        ]
    };

    death = {
        "type": "death",
        "text": death_intro,
        "options": [
            [time]
        ]
    };

    position = {
        "type": "posisition",
        "text": position_intro,
        "options": [
            [filler],
            [spicy_end, filler]
        ]
    };

    survival = {
        "type": "survival",
        "text": survival_intro,
        "options": [
            [rank],
        ]
    };

    start = {
        "text": start_intro,
        "options": [
            [elimination],
            [death],
            [survival],
            [position]
        ]
    };
}

let cache = {}



let randomizer = function(list_items) {
    return list_items[Math.floor(Math.random() * Math.floor(list_items.length))];
}

function isDict(v) {
    return typeof v==='object' && v!==null && !(v instanceof Array) && !(v instanceof String);
}

// let challenge_options = [start];
async function challengeSelector(state) {

    generateVocab(state.players);
    let conversation_pipeline = [];
    console.log(cache);
    if (Object.keys(cache).length == 0) {
        cache["kills"] = state.kills;
        cache["players"] = state.players; 
        cache["time"] = state.time;
        for (var i = 0; i < 3; i = i+1) {
            conversation_pipeline.push(start_intro);
            conversation_pipeline.push(position);
        }
        console.log(cache);
    }
    else {
        if (state.kills - cache["kills"] > 0) {
            for (var i = 0; i < 3; i = i+1) {
                conversation_pipeline.push(start_intro);
                conversation_pipeline.push(elimination);
            }
            cache["kills"] = state.kills;
        }
        generateVocab(state.players);
        if (cache["players"] - state.players > 0) {
            for (var i = 0; i < 3; i = i+1) {
                conversation_pipeline.push(start_intro);
                conversation_pipeline.push(randomizer([death, position, survival]));
            }
            cache["players"] = state.players;
        }
        // if (state.players - cache.get("players") > 0) {
        //     conversation_pipeline.push(survival);
        //     cache["time"] = state.time;
        // }
    }

    // const NGrams = natural.NGrams;
    // NGrams.trigrams(['some',  'other', 'words',  'here'])

    let total_res = [];
    let res = "";
    while(conversation_pipeline.length > 0) {
        el = conversation_pipeline.shift();  // remove first element
        if(isDict(el)) {
            res = res + " " + randomizer(el.text);
            candidate = randomizer(el.options);
            for(e of candidate) {
                conversation_pipeline.unshift(e);  // add to the end of the array
            }
        }
        else if(typeof el === 'string' || el instanceof String) {
            res = res + " " + el;
        }
        else {
            conversation_pipeline.unshift(randomizer(el));
        }
        console.log(conversation_pipeline);
    }
    // console.log(res);
    res = res.replace(/Ninja/gi, ",Ninja");
    console.log(res);
    total_res = res.split(",").splice(1, 3);
    console.log("total res", total_res);
    return total_res;
}

module.exports = (app) => {
    app.post('/predict', async (req, res) => {
        let data = req.body;
        data = data.game_state;
        let challenges = [];
        challenges = await challengeSelector(data);
        // challenges.push(await challengeSelector(data));
        // challenges.push(await challengeSelector(data));
        // challenges.push(await challengeSelector(data));
        console.log(challenges);
        // for (let name of data.keys()) {
        //     console.log(name);
        // }
        console.log(data)
        console.log('Sucess');
        res.send({response: 'sucess', challenges: challenges});
    })
};
