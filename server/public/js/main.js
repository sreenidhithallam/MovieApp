//favourites list
$(document).ready(function(){
	$('#favourite').on('click',function(f){
		f.preventDefault();
		$.ajax ({
			type:'GET',
			url: '/movie/view/'})
		 .done(function(data){
		 		display(data.resultJson, data.resultLength,'showFavourites');
		 });
	});
});
// movies list
	$('#searchBtn').on('click',function(s){
		s.preventDefault();
		var searchWord = $('#searchWord').val();
		$.ajax ({
			type:'GET',
			url: '/movie/search/' + searchWord,
			dataType: 'json'})
		 	.done(function(data){
		 		display(data.resultJson, data.resultLength, 'showMovies');
		 });
	});

function display(data, resultLength, displayInfo){
	let jsonData = data;
	let len = resultLength;
	if(displayInfo === "showMovies"){
	var addCols = function (num){
    for (var i=0;i<num;i++) {
        var myCol = $('<div class="col-sm-3 col-md-3 pb-2"></div>');
        var myPanel = $('<div class="card card-outline-info cardStyle text-center" id="'
        				+i+'Panel"><div class="card-block"><div class="card-title"><h5 class="text-center dataTitle">'
        				+jsonData[i].title+'</h5></div><img src="http://image.tmdb.org/t/p/w92' + jsonData[i].poster_path + '" class="img-rounded poster img-responsive" alt="No Image Available !"><h5 class="releaseDate">'
        				+jsonData[i].release_date+'</h5><a href ="#" class="pull-right fav"><i id="selectedCard" class="material-icons icon">favorite</i></a></div></div>');

		myPanel.appendTo(myCol);
        myCol.appendTo('#contentPanel');
    	}
	}
	addCols(len);
    }
    else
    {
    var addCols = function (num){
    for (var i=0;i<num;i++) {
        var myCol = $('<div class="col-sm-3 col-md-3 pb-2"></div>');
        var myPanel = $('<div class="card card-outline-info cardStyle text-center" id="'
        				+i+'Panel"><div class="card-block"><div class="card-title"><h5 class="text-center dataTitle">'
        				+jsonData[i].title+'</h5></div><img src="http://image.tmdb.org/t/p/w92' + jsonData[i].poster_path + '" class="img-rounded poster img-responsive" alt="No Image Available !"><h5 class="releaseDate">'
        				+jsonData[i].release_date+'</h5></div></div>');

        $( "#contentPanel" ).remove();
		myPanel.appendTo(myCol);
        myCol.appendTo('#viewPanel');
    	}
	}
	addCols(len);
}
}

$(document).on('click','#selectedCard',function(e){
    e.preventDefault();
    $(this).css("color", "red");
    let obj = {};
    let row = $(this).closest('.card-block');
    obj.title = row.children('.card-title').children('h5').text();
    obj.poster_path = '/' + row.children('img').attr('src').split('/').pop();
    obj.release_date = row.find('.releaseDate').text();
    let $thisInput = $(this);
    $.ajax({
        type:'POST',
        url: '/movie/add',
        dataType: 'json',
        data : obj })
        .done(function(data){
            $thisInput.closest('.card').addClass('selectedrow');
        })
    }); // add to fav list


