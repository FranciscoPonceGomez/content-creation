const spacyNLP = require("spacy-nlp");
const natural = require('natural')

// vocabulary
const spicy_start = ['Besides all the effort', 'Wow that was crazy! Do you think', 'Did it again!', 'She is really good!'];
const spicy_end = ['and walk away', 'to consolidate his dominance', 'and call it a day', 'because he is up to no good'];
const elimination_intro = ['will eliminate', 'will rekt', 'will dominate', 'will own', 'will obliterate', 'will kill'];
const death_intro = ['will be eliminated', 'will get rekt', 'will be blasted', 'will be killed'];
const position_intro = ['will win', 'will lose', 'will get a victory royale'];
const survival_intro = ['will make it to', 'will survive to', 'will place'];
const start_intro = ['Streamer', 'Ninja', 'Shroud'];
const numbers = [2,3,4,5,6,7,8,9];
const time = [numbers.map(x => 'in the next ' + x + ' minutes'), 'before the end of game'];
const rank = ['top 50', 'top 25', 'top 10', 'top 5', 'top 3'];
const count = [numbers.map(x => x + ' players'), numbers.map(x => x + ' times')];
const filler = ['this game', 'this match', 'this session'];

// semantic relationship
let elimination = {
    "text": elimination_intro,
    "options": [
        [time],
        [time, count],
        [count],
        [spicy_end, time, count]
    ]
};

let death = {
    "text": death_intro,
    "options": [
        [time]
    ]
};

let position = {
    "text": position_intro,
    "options": [
        [filler],
        [spicy_end, filler]
    ]
};

let survival = {
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
}

let randomizer = function(list_items) {
    return list_items[Math.floor(Math.random() * Math.floor(list_items.length))];
}

function isDict(v) {
    return typeof v==='object' && v!==null && !(v instanceof Array) && !(v instanceof String);
}

// let challenge_options = [start];
async function challengeSelector(state) {
    let conversation_pipeline = [challenge_options];

    const NGrams = natural.NGrams;
    // NGrams.trigrams(['some',  'other', 'words',  'here'])


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
        // console.log(conversation_pipeline);
    }
}

module.exports = (app) => {
    app.post('/predict', async (req, res) => {
        let data = req.body;
        data = data.game_state;
        let challenges = await challengeSelector(data);
        // for (let name of data.keys()) {
        //     console.log(name);
        // }
        console.log(data)
        console.log('Sucess');
        res.send({response: 'sucess', data: {"1": "Best challenge ever", "2": "second best challenge", "3": "third best challenge"}});
    })
};
