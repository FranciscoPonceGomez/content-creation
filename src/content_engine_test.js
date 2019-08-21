const spacyNLP = require("spacy-nlp");
const natural = require('natural')

// vocabulary
const human_touch_begin = ['Wow that was crazy! Do you think', 'Did it again!'];
const subject = ['streamer', 'player'];
// const elimination = ['will eliminate', 'will be eliminated', 'will rekt'];
// const survival = ['will make it', 'will survive'];
// const position = ['will win this game', 'will lose this game'];
// const action = [elimination, position, survival];
const numbers = [1,2,3,4,5,6,7,8,9];
const time_variable = [numbers.map(x => 'in the next ' + x + ' minutes'), 'before end of game'];
const rank_variable = ['top 50', 'top 25', 'top 10', 'top 5'];
const count_variable = numbers.map(x => x + ' players');
const variables = [time_variable, rank_variable, count_variable];
const human_touch_end = ['Wow', 'crazy', 'again', 'for real'];
const filler = ['before', 'in the next'];

let elimination = {
    "text": ['will eliminate', 'will be eliminated', 'will rekt'],
    "options": [
        [time_variable],
        [count_variable, time_variable],
        [count_variable]
    ]
};

let position = {
    "text": ['will win this game', 'will lose this game'],
    "options": [
        [time_variable],
    ]
};

let survival = {
    "text": ['will make it to', 'will survive to'],
    "options": [rank_variable]
};

let challenge_options = [elimination, survival, position];
let conversation_pipeline = [subject, challenge_options];

const NGrams = natural.NGrams;
// NGrams.trigrams(['some',  'other', 'words',  'here'])
let randomizer = function(list_items) {
    return list_items[Math.floor(Math.random() * Math.floor(list_items.length))];
    // let tmp = list_items[Math.floor(Math.random() * Math.floor(list_items.length))];
    // while(tmp.length > 0 && typeof(tmp) !== 'string'){
        // tmp = tmp[Math.floor(Math.random() * Math.floor(tmp.length))];
    // }
    // return tmp;
}

function isDict(v) {
    return typeof v==='object' && v!==null && !(v instanceof Array) && !(v instanceof String);
}

let res = "";
while(conversation_pipeline.length > 0) {
    el = conversation_pipeline.shift();  // remove first element
    // res = res + " " + randomizer(el);
    console.log(conversation_pipeline);
    // console.log(el);
    // if(isDict(el)) {
    if(isDict(el)) {
        // console.log("This is a dict", el)
        res = res + " " + randomizer(el.text);
        candidate = randomizer(el.options);
        conversation_pipeline.unshift(candidate);  // add to the end of the array
    }
    else if(typeof el === 'string' || el instanceof String) {
        // console.log("This is a string", el)
        res = res + " " + el;
    }
    else {
        // console.log("This is an array", el)
        conversation_pipeline.unshift(randomizer(el));
    }
}
res += "?"

console.log(res);