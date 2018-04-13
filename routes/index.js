// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router();
const axios = require("axios");

/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */
router.get('/', function(req, res) {
	const data = {
		text: "Instagram Clone",
		greeting: "Welcome!"
	};
    res.render('index', data)

});

router.get("/:username", function (req, res) {

	const username = req.params.username;
	if (username === "lusso_africano") {

        const instagramAPI = "https://firebasestorage.googleapis.com/v0/b/instagram-clone-nodejs.appspot.com/o/inst.json?alt=media&token=b0de75f1-01d9-47b3-b066-1df716d1f318";
        var instagramData;
        axios.get(instagramAPI)
            .then( function (response) {

                instagramData = response.data.graphql;
                res.render("index", instagramData);


                console.log(instagramData)

            })
            .catch (function (error) {
                res.json({
                    confirmation: "fail",
                    message: error.message
                })

                //console.log(error.message);
            });

    } else {

	    res.render("error", {
	        confirmation: "Fail",
            errorMessage: "Sorry, this page isn't available.",
            errorSubMessage: "The link you followed may be broken, or the page may have been removed.",
            homeLinkText: "Go back to Instagram."
        });
    }


});


module.exports = router;
