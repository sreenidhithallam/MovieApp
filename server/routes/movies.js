const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const parseUrlencoded = bodyParser.urlencoded({extended: false});
const request =require('request');

let favouriteList = [];

router.get('/view', function(req, res, next){
	res.json({success:true, resultJson:favouriteList,resultLength: favouriteList.length});
});

router.post('/add', function(req, res, next){
	let input = req.body;
	let newFavourite = {
		title: input.title,
		poster_path: input.poster_path,
		release_date: input.release_date
	};
	favouriteList.push(newFavourite);
	res.json({success:true});
});

router.get('/search/:searchWord', function(req, res, next){
	let movieName = req.params.searchWord;
	request('https://api.themoviedb.org/3/search/movie?api_key=d0f65e77e4f540ed8914d7a321b9b6ff&query='+ movieName, function(err, response, body){
		if( !err && response.statusCode === 200){
			let results = JSON.parse(body).results;
			let resultsLength = JSON.parse(body).results.length;
			let requiredResult = [];
			results.map(function(obj){
				reqJson = {};
				reqJson.title = obj.title;
				reqJson.poster_path = obj.poster_path;
				reqJson.release_date = obj.release_date;
				requiredResult.push(reqJson);
			});
			res.json({success:true, resultJson:requiredResult, resultLength: resultsLength});
		}
		else{
			res.json(err);
		}
	});
});


module.exports = router;
