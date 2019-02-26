"use strict";

module.exports = app => {

    // GET point to get all home ids from our database.
    app.get('/connector/scripts', (req, res) => {
        console.log("~~~GET SCRIPTS~~~");
        res.status(200).send({scripts: "SCRIPT"})
    });

    // GET point to get all home ids from our database.
    app.get('/connector/functions', (req, res) => {
        console.log("~~~GET FUNCTIONS~~~");
        if (!req.body || !req.body.script) {
            console.log(req.body === undefined)
            if (req.body !== undefined) {
                console.log(req.body)
                console.log(req.body.script === undefined)
            }
            res.status(404).send({error: 'no data'});
        } else {
            console.log(req.body.script);
            res.status(200).send({functions: ["func1, func2"]})
        }
    });

    // POST point to get all home ids from our database.
    app.post('/connector/functions', (req, res) => {
        console.log("~~~POST FUNCTIONS~~~");
        if (!req.body || !req.body.script) {
            console.log(req.body === undefined)
            if (req.body !== undefined) {
                console.log(req.body)
                console.log(req.body.script === undefined)
            }
            res.status(404).send({error: 'no data'});
        } else {
            console.log(req.body.script);
            res.status(200).send({functions: ["func1, func2"]})
        }
    });    

    // GET point to get all home ids from our database.
    app.get('/connector/execute', (req, res) => {
        console.log("~~~EXECUTE~~~");
        res.status(200).send({success: "EXECUTE"})
    });
};