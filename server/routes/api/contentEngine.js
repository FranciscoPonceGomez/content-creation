// vocabulary
const spicy_start = ['Besides all the effort', 'Wow that was crazy! Do you think', 'Did it again!', 'She is really good!'];
const spicy_end = ['and walk away', 'to consolidate his dominance', 'and call it a day', 'because he is up to no good'];
const elimination_intro = ['will eliminate', 'will rekt', 'will dominate', 'will own', 'will obliterate', 'will kill'];
const death_intro = ['will be eliminated', 'will get rekt', 'will be blasted', 'will be killed'];
const position_intro = ['will win', 'will lose', 'will get a victory royale'];
const survival_intro = ['will make it to', 'will survive to', 'will place'];
// const start_intro = ['Ovilee', 'Ninja', 'Shroud', 'Tfue', 'Jake', 'XbestX'];
const start_intro = ['Tfue'];
const numbers = [2,3,4,5,6,7,8,9];
const time = [numbers.map(x => 'in the next ' + x + ' minutes'), 'before the end of game'];
const rank = ['top 50', 'top 25', 'top 10', 'top 5', 'top 3'];
const count = [numbers.map(x => x + ' players'), numbers.map(x => x + ' times')];
const filler = ['this game', 'this match', 'this session'];
const stage_options = ['lobby', 'dropping', 'in_game', 'ring_closing'];
// const basic_challenge = [elimination, position, death, survival];
const landing_options = ['Junk Junction', 'Haunted hills', 'Pleasent Park', 'The Block', 'Lazy Lagoon'
, 'Loot Lake', 'Neo Tilted', 'Snobby Shores', 'Shifty Shafts', 'Frosty Flights', 'Polar Peak', 'Happy Hamlet'
, 'Sunny Steps', 'Pressure Plant', 'Dusty Depot', 'Salty Springs', 'Fatal Fields', 'Mega Mall', 'Lonely Lodge'
, 'Paradise Palms', 'Lucky Landing'];
const landing_intro = [' is going to land in', ' is going to drop in', ' will decide to land in', ' will decide to drop in', 'is thinking to land in', 'is thinking to drop in'];
const vehicle_intro = [' got his hands on a mech. Do you think ', ' got inside a metal beast. ', ' is playing with power, engineering power. '];

let cache = {};

// semantic relationship
const elimination = {
        "text": elimination_intro,
        "features": [],
        "options": [
            [time],
            [time, count],
            [count]
            // [spicy_end, time, count]
        ]
    };

const death = {
        "text": death_intro,
        "features": [],
        "options": [
            [time]
        ]
    };

const position = {
        "text": position_intro,
        "features": [],
        "options": [
            [filler]
            // [spicy_end, filler]
        ]
    };

 const survival = {
        "features": [],
        "text": survival_intro,
        "options": [
            [rank],
        ]
    };

// const start = {
//         "text": start_intro,
//         "features": [],
//         "options": [
//             [elimination],
//             [position],
//             [death],
//             [survival]
//         ] 
//     };



const landing_zone = {
        "text": landing_intro,
        "features": [],
        "options": [
            [landing_options]
        ]
    };

const lobby = {
        "text": "",
        "features": [],
        "options": [
            // [elimination],
            [position],
            // [death],
            // [survival]
        ]
    };

const dropping = {
        "text": "",
        "features": [],
        "options": [
            [landing_zone],
            // [elimination],
            // [position],
            // [death],
            // [survival]
        ]
    };

const incremental = {
        "text": "",
        "features": {
            "kills": {
                "weight": 0.5,
                "threshold": function (a, b) { return a > b; },
                "option": 0
            },
            "players": {
                "weight": 0.5,
                "threshold": function (a, b) { return a < b; },
                "option": 1
            }
        },
        "options": [
            elimination,
            death
        ]
    };

const vehicle = {
    "text": vehicle_intro,
    "features": [],
    "options": [
        [elimination],
        [death]
    ]
}

const situational = {
        "text": "",
        "features": [],
        "options": [

        ]
    };

const behavioral = {
        "text": "",
        "features": [],
        "options": [

        ]
    };

const tactical = {
        "text": "",
        "features": [],
        "options": [

        ]
    };
    
const ring_closing = {
        "text": "",
        "features": [],
        "options": [

        ]
    };

const last_ring = {
        "text": "",
        "features": [],
        "options": [

        ]
    };


const in_game = {
        "text": "",
        "features": {
            "kills": {
                "weight": 0.7,
                "threshold": function (a, b) { return a > b; },
                "option": 0
            },
            "players": {
                "weight": 0.2,
                "threshold": function (a, b) { return a < b; },
                "option": 2
            },
            "vehicle": {
                "weight": 0.9,
                "threshold": true,
                "option": 4,
            }
        },
        "options": [
           incremental,
           situational,
           tactical,
           behavioral,
           vehicle
       ] 
    };

// const game_stage = {
//         "text": "",
//         "features": {
//             "game_stage": {
//                 "weight": 1,
//                 "threshold": true,
//                 "option": game_stage 
//             }
//         },
//         "options": [
//             [in_game],
//             [dropping],
//             [lobby]
//             // [ring_closing],
//             // [last_ring]
//         ]
//     };
    
// const start = {
//         "text": start_intro,
//         "features": [],
//         "options": [game_stage]
//     };

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

// function hasChanged(feature, game_state, op) {
//     if(cache.length === 0) {
//         cache.push(game_state);
//         return true;
//     }
//     let res;
//     switch(op) {
//         case "Inc": 
//             res = Math.abs(game_state[feature] - cache[feature]) > 0;
//         default:
//             res = game_state[feature] === op;
//     }
//     cache.push(game_state);
//     return res;
// }

/*
    Finds the best brach option to go next based on feature weights and threshold satisfaction
*/
function branchSelector(node, state) {
    console.log(node.features);
    if(node.features.length == 0) {
        cache = state;
        return node.options[0];
    }
    let output = new Array(node.options.length).fill(0);

    for(const [key, val] of Object.entries(node.features)) {
        // console.log("Im inside the loop");
        // console.log(key);
        // console.log(val);
        console.log(state[key]);
        console.log(cache[key]);
        if(val.threshold || (this.isFunction(val.threshold) && val.threshold(state[key], cache[key]))) {
            console.log("Im inside");
            output[val.option] = Math.floor((output[val.option] + val.weight) / output.length);
            console.log(output);
            state[key] = cache[key];
        }
    }
    return node.options[output.indexOf(Math.max(...output))];
}

let randomizer = function(list_items) {
    return list_items[Math.floor(Math.random() * Math.floor(list_items.length))];
}

function isDict(v) {
    return typeof v==='object' && v!==null && !(v instanceof Array) && !(v instanceof String);
}

// let challenge_options = [start];
async function challengeSelector(state) {
    let res = randomizer(start_intro);
    let conversation_pipeline = [eval(state.game_stage)];
    console.log(`pipeline: ${conversation_pipeline}`);
    console.log(conversation_pipeline);
    console.log(state);

    while(conversation_pipeline.length > 0) {
        el = conversation_pipeline.shift();  // remove first element
        if(isDict(el)) {
            if(el.text.length > 0) {
                res = res + " " + randomizer(el.text);
            }
            // candidate = randomizer(el.options);
            candidate = branchSelector(el, state)
            // console.log(`length: ${el.options.length}`);
            console.log(`candidate: ${candidate}`);
            console.log(candidate);
            if(candidate.length > 1) {
                for(e of candidate) {
                    conversation_pipeline.unshift(e);  // add to the end of the array
                }
            }
            else {
                conversation_pipeline.unshift(candidate);
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
    console.log(res);
    return res;
}

module.exports = (app) => {
    app.post('/predict', async (req, res) => {
        let data = req.body;
        state = data.game_state;
        console.log(`state: ${state}`);
        let challenges = [];
        challenges[0] = await challengeSelector(state);
        console.log('Sucess');
        res.send({response: 'sucess', challenges: challenges});
    })
};
