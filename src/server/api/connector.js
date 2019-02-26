"use strict";

module.exports = app => {

    app.post('/connector/scripts', (req, res) => {
        console.log("~~~POST SCRIPTS~~~");
        if (!req.body || !req.body.user) {
            res.status(404).send({error: 'no data'});
        } else {
            console.log(req.body.script);
            res.status(200).send({scripts: ["script1, script2"]})
        }
    });    

    // app.post('/connector/functions', (req, res) => {
    //     console.log("~~~POST FUNCTIONS~~~");
    //     if (!req.body || !req.body.script) {
    //         res.status(404).send({error: 'no data'});
    //     } else {
    //         console.log(req.body.script);
    //         res.status(200).send({functions: ["func1, func2"]})
    //     }
    // });    

    app.post('/connector/execute', (req, res) => {
        console.log("~~~POST EXECUTE~~~");
        if (!req.body || !req.body.script) {
            res.status(404).send({error: 'no data'});
        } else {
            console.log(req.body.function);
            res.status(200).send({success: "succeeded"})
        }
    });  
};