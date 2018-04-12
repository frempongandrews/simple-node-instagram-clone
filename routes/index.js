// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()
const axios = require("axios")

/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */
router.get('/', function(req, res) {
	const data = {
		text: "Instagram Clone",
		greeting: "Welcome!"
	}
    res.render('index', data)

})

router.get("/:username", function (req, res) {

	const username = req.params.username
	const instagramAPI = "https://www.instagram.com/" + username + "/?__a=1"
    var instagramData;
    axios.get(instagramAPI)
        .then( function (response) {

            instagramData = response.data.graphql
            res.render("index", instagramData)
            console.log(instagramData)

        })
        .catch (function (error) {
            res.json({
                confirmation: "fail",
                message: error.message
            })
            //console.log(error.message)
        })

})


module.exports = router
