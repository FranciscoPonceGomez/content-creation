// vocabulary
const spicy_start = ['Besides all the effort', 'Wow that was crazy! Do you think', 'Did it again!', 'She is really good!'];
const spicy_end = ['and walk away', 'to consolidate his dominance', 'and call it a day', 'because he is up to no good'];
const elimination_intro = ['will eliminate', 'will rekt', 'will dominate', 'will own', 'will obliterate', 'will kill'];
const death_intro = ['will be eliminated', 'will get rekt', 'will be blasted', 'will be killed'];
const position_intro = ['will win', 'will lose', 'will get a victory royale'];
const survival_intro = ['will make it to', 'will survive to', 'will place'];
const start_intro = ['Ovilee', 'Ninja', 'Shroud', 'Tfue', 'Jake', 'XbestX'];
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

let cache = {}

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
            [landing_zone]
            // [elimination],
            // [position],
            // [death],
            // [survival]
        ]
    };

const incremental = {
        "text": "",
        "features": [],
        "options": [

        ]
    };

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

// const in_game = {
//         "text": "",
//         "features": {
//             "kills": {
//                 "weight": 0.9,
//                 "threshold": "1+",
//             },
//             "players": {
//                 "weight": 0.8,
//                 "threshold": "<"
//             },
//             "ring_time": {
//                 "weight": 0.5,
//                 "threshold": "<1:00"
//             }
//         },
//         "options": [
//            [incremental],
//            [situational],
//            [tactical],
//            [behavioral]
//        ] 
//     };

const in_game = {
        "text": "",
        "features": {
            "kills": {
                "weight": 0.9,
                "threshold": "+=1",
                "option": 0
            },
            "players": {
                "weight": 0.8,
                "threshold": "<=5",
                "option": 0
            },
            "ring_time": {
                "weight": 0.5,
                "threshold": "<1:00",
                "option": 1,
            }
        },
        "options": [
           [incremental],
           [situational],
           [tactical],
           [behavioral]
       ] 
    };

const game_stage = {
        "text": "",
        "features": [],
        "options": [
            [in_game],
            [dropping],
            [lobby]
            // [ring_closing],
            // [last_ring]
        ]
    };
    
const start = {
        "text": start_intro,
        "features": [],
        "options": [game_stage]
    };

function branchSelector(node, game_state) {
    let candidate_index;
    let output = [];
    for(const [key, val] of Object.entries(node.features)) {
        let evaluation = `${game_state[key]} ${val.threshold}`;
        if(eval(evaluation)) {
            // add weight to output likeliness
            output[val.option] = Math.floor((output[val.option] + val.weight) / output.length
        }
    }
    // return node.options[candidate_index];
    return output.indexOf(Math.max(...output));
}

let randomizer = function(list_items) {
    return list_items[Math.floor(Math.random() * Math.floor(list_items.length))];
}

function isDict(v) {
    return typeof v==='object' && v!==null && !(v instanceof Array) && !(v instanceof String);
}

// let challenge_options = [start];
async function challengeSelector(state) {
    let conversation_pipeline = [start];
    console.log(conversation_pipeline);
    // console.log(cache);
    // if (Object.keys(cache).length == 0) {
    //     cache["kills"] = state.kills;
    //     cache["players"] = state.players; 
    //     cache["time"] = state.time;
    //     conversation_pipeline.push(start_intro);
    //     conversation_pipeline.push(position);
    //     console.log(cache);
    // }
    // else {
    //     if (state.kills - cache["kills"] > 0) {
    //         conversation_pipeline.push(start_intro);
    //         conversation_pipeline.push(elimination);
    //         cache["kills"] = state.kills;
    //     }
    //     if (cache["players"] - state.players > 0) {
    //         conversation_pipeline.push(start_intro);
    //         conversation_pipeline.push(randomizer([death, position, survival]));
    //         cache["players"] = state.players;
    //     }
    //     // if (state.players - cache.get("players") > 0) {
    //     //     conversation_pipeline.push(survival);
    //     //     cache["time"] = state.time;
    //     // }
    // }

    let res = "";
    while(conversation_pipeline.length > 0) {
        el = conversation_pipeline.shift();  // remove first element
        if(isDict(el)) {
            if(el.text.length > 0) {
                res = res + " " + randomizer(el.text);
            }
            console.log(`options: ${el.options}`);
            // candidate = randomizer(el.options);
            candidate = branchSelector(el, state)
            console.log(`length: ${el.options.length}`);
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
        data = data.game_state;
        let challenges = [];
        challenges[0] = await challengeSelector(data);
        console.log(data)
        console.log('Sucess');
        res.send({response: 'sucess', challenges: challenges});
    })
};
