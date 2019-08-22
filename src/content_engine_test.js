const spacyNLP = require("spacy-nlp");
const natural = require('natural')

// vocabulary
const spice_start = ['Besides all the effort', 'Wow that was crazy! Do you think', 'Did it again!', 'She is really good!'];
const spicy_end = ['and walk away', 'to consolidate his dominance', 'and call it a day', 'because he is up to no good'];
const numbers = [2,3,4,5,6,7,8,9];
const time = [numbers.map(x => 'in the next ' + x + ' minutes'), 'before the end of game'];
const rank = ['top 50', 'top 25', 'top 10', 'top 5', 'top 3'];
const count = [numbers.map(x => x + ' players'), numbers.map(x => x + ' times')];
const filler = ['this game', 'this match', 'this session'];

// semantic relationship
let elimination = {
    "text": ['will eliminate', 'will rekt', 'will dominate', 'will own', 'will obliterate', 'will kill'],
    "options": [
        [time],
        [time, count],
        [count],
        [spicy_end, time, count]
    ]
};

let death = {
    "text": ['will be eliminated', 'will get rekt', 'will be blasted', 'will be killed'],
    "options": [
        [time]
    ]
};

let position = {
    "text": ['will win', 'will lose', 'will get a victory royale'],
    "options": [
        [filler],
        [spicy_end, filler]
    ]
};

let survival = {
    "text": ['will make it to', 'will survive to', 'will place'],
    "options": [
        [rank],
    ]
};

let start = {
    "text": ['streamer', 'Ninja', 'Shroud'],
    "options": [
        [elimination],
        [death],
        [survival],
        [position]
    ]
}


// let challenge_options = [elimination, death, survival, position];
let challenge_options = [start];
let conversation_pipeline = [challenge_options];

const NGrams = natural.NGrams;
// NGrams.trigrams(['some',  'other', 'words',  'here'])

let randomizer = function(list_items) {
    return list_items[Math.floor(Math.random() * Math.floor(list_items.length))];
}

function isDict(v) {
    return typeof v==='object' && v!==null && !(v instanceof Array) && !(v instanceof String);
}

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
console.log(res);