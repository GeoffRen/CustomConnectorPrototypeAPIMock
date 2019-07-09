const crypto = require('crypto');

module.exports = app => {
    var AuthenticationContext = require("adal-node").AuthenticationContext;

    var clientId = "93649854-d49a-4352-9737-280fbe867971";
    var clientSecret = "6e[#?dTUZGvd^1!;$aw}3IsO+_z#(89@0q%A9!]qn#&MY+q";
    var authorityHostUrl = "https://login.windows.net";
    var tenant = "common";
    var authorityUrl = authorityHostUrl + "/" + tenant;
    var redirectUri =
        "https://unattendedmicroserviceprototype.glitch.me/getAToken";
    var resource = "https://graph.microsoft.com";
    var templateAuthzUrl =
        "https://login.windows.net/" +
        tenant +
        "/oauth2/authorize?response_type=code&client_id=" +
        clientId +
        "&redirect_uri=" +
        redirectUri +
        "&state=<state>&resource=" +
        resource;

    function createAuthorizationUrl(state) {
        return templateAuthzUrl.replace("<state>", state);
    }

    // Clients get redirected here in order to create an OAuth authorize url and redirect them to AAD.
    // There they will authenticate and give their consent to allow this app access to
    // some resource they own.
    app.get("/auth", function(req, res) {
        crypto.randomBytes(48, function(ex, buf) {
            var token = buf
                .toString("base64")
                .replace(/\//g, "_")
                .replace(/\+/g, "-");

            res.cookie("authstate", token);
            var authorizationUrl = createAuthorizationUrl(token);

            res.redirect(authorizationUrl);
        });
    });

    // After consent is granted AAD redirects here.  The ADAL library is invoked via the
    // AuthenticationContext and retrieves an access token that can be used to access the
    // user owned resource.
    app.get("/getAToken", function(req, res) {
        // if (req.cookies.authstate !== req.query.state) {
        //   res.send('error: state does not match');
        // }

        var authenticationContext = new AuthenticationContext(authorityUrl);

        authenticationContext.acquireTokenWithAuthorizationCode(
            req.query.code,
            redirectUri,
            resource,
            clientId,
            clientSecret,
            function(err, response) {
                var errorMessage = "";
                if (err) {
                    res.send(
                        "error: " +
                            err.message +
                            "\n" +
                            JSON.stringify(response)
                    );
                } else {
                    console.log(response.accessToken);
                    res.send(JSON.stringify(response));
                }
            }
        );
    });
};
