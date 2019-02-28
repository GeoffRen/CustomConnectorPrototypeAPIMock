"use strict";

module.exports = app => {

    app.post('/connector/scripts', (req, res) => {
        console.log("~~~POST SCRIPTS~~~");
        if (!req.body || !req.body.user) {
            res.status(404).send({error: 'no data'});
        } else {
            console.log(req.body.user);
            if (req.body.user === "geren") {
                res.status(200).send({scripts: [{script: "gerenScript1"}, {script: "gerenScript2"}]})
            } else {
                res.status(200).send({scripts: [{script: "script1"}, {script: "script2"}]})
            }
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
            console.log(req.body.user);
            console.log(req.body.script);
            res.status(200).send({success: "succeeded"})
        }
    });

    app.get('/user', (req, res) => {
        console.log("~~~GET USER~~~");
        res.status(200).send({user: "geren"})
    });
};
