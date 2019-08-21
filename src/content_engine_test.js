const spacyNLP = require("spacy-nlp");
const natural = require('natural')

const human_touch_begin = ['Wow that was crazy! Do you think', 'Did it again!'];
const subject = ['streamer', 'player'];
const elimination = ['will eliminate', 'will be eliminated', 'will rekt'];
const survival = ['will make it', 'will survive'];
const position = ['will win this game', 'will lose this game']
const action = [elimination, position, survival];
const variable = ['2 minutes', 'top 50', 'top 25'];
const human_touch_end = ['Wow', 'crazy', 'again', 'for real'];
const filler = ['before', 'in the next'];

let conversation_pipeline = [human_touch_begin, subject, action, filler, variable, human_touch_end];

const NGrams = natural.NGrams;
// NGrams.trigrams(['some',  'other', 'words',  'here'])
let randomizer = function(list_items) {
    let tmp = list_items[Math.floor(Math.random() * Math.floor(list_items.length))];
    while (tmp.length > 0 && typeof(tmp) !== 'string'){
        tmp = tmp[Math.floor(Math.random() * Math.floor(tmp.length))];
    }
    return tmp;
}

let res = "";
for(el of conversation_pipeline) {
    res = res + " " + randomizer(el);
}
res += "?"

console.log(res);