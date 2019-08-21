const spacyNLP = require("spacy-nlp");
const natural = require('natural')

// vocabulary
const human_touch = ['Wow that was crazy! Do you think', 'Did it again!'];
const subject = ['streamer', 'player'];
const numbers = [1,2,3,4,5,6,7,8,9];
const time_variable = [numbers.map(x => 'in the next ' + x + ' minutes'), 'before end of game'];
const rank_variable = ['top 50', 'top 25', 'top 10', 'top 5'];
const count_variable = [numbers.map(x => x + ' players'), numbers.map(x => x + ' times')];
const filler = ['this game', 'this match', 'this session'];

let elimination = {
    "text": ['will eliminate', 'will rekt'],
    "options": [
        [time_variable],
        [count_variable, time_variable],
        [count_variable]
    ]
};

let eliminated = {
    "text": ['will be eliminated', 'will get rekt'],
    "options": [
        [time_variable],
        [time_variable, filler]
    ]
};

let position = {
    "text": ['will win this game', 'will lose this game'],
    "options": [
        [time_variable]
    ]
};

let survival = {
    "text": ['will make it to', 'will survive to', 'will place'],
    "options": [
        [rank_variable],
    ]
};

let challenge_options = [elimination, eliminated, survival, position];
// let challenge_options = [elimination];
let conversation_pipeline = [subject, challenge_options];

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
    // console.log(conversation_pipeline);
    if(isDict(el)) {
        res = res + " " + randomizer(el.text);
        candidate = randomizer(el.options);
        conversation_pipeline.unshift(candidate);  // add to the end of the array
    }
    else if(typeof el === 'string' || el instanceof String) {
        res = res + " " + el;
    }
    else {
        conversation_pipeline.unshift(randomizer(el));
    }
}

console.log(res);