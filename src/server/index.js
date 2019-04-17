'use strict';

let path            = require('path'),
    express         = require('express'),
    bodyParser      = require('body-parser'),
    logger          = require('morgan'),
    session         = require('express-session'),
    https           = require('https'),
    fs              = require('fs'),
    cors            = require('cors');

let port = process.env.PORT ? process.env.PORT : 8080;
let env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';

// Setup express pipeline.
let app = express();
app.use(express.static(path.join(__dirname, '../../public')));
if (env !== 'test') app.use(logger('dev'));
app.engine('pug', require('pug').__express);
app.set('views', __dirname);

app.use(cors());

app.use(session({
    name: 'session',
    secret: 'ohhellyes',
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: '/',
        httpOnly: false,
        secure: false
    }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./api/connector')(app);

// Start the app.
app.get('*', (req, res) => {
    let preloadedState = req.session.user ? {
            username: req.session.user.username,
            primary_email: req.session.user.primary_email
        } : {};
    preloadedState = JSON.stringify(preloadedState).replace(/</g, '\\u003c');
    res.render('base.pug', {
        state: preloadedState
    });
});

// let server = app.listen(port, () => {
    // console.log('Assignment 5 app listening on ' + server.address().port);
// });

https.createServer({
    key: fs.readFileSync('./src/server/server.key'),
    cert: fs.readFileSync('./src/server/server.cert')
  }, app)
  .listen(port, function () {
    console.log('Example app listening on port 8080!')
  })
