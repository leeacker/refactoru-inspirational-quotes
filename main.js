$(document).on('ready', function() {
  	
  	var fullStar = 'fa fa-star';
  	var halfStar = "fa fa-star-half";
  	var emptyStar = "fa fa-star-o";
  	var altHalfStar = "fa fa-star-half-o";
  	var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  	var fullHeart = 'fa fa-heart';
  	var emptyHeart = 'fa fa-heart-o';
  	var mehFace = 'fa fa-meh-o';
  	var remove = 'fa fa-remove';
  // create mouseover effect for navbar
	$('.nav-bar li a').on('mouseover', function(){
		$(this).closest('li').attr('id', 'active-li');
	});
	$('.nav-bar li a').on('mouseout', function(){
		$(this).closest('li').attr('id', '');
	});

	


	var Quote = function(text, author){
		this.text = text;
		this.author = author;
		this.rating = [];
		this.averageRate = 0;
	};

	// create a render method to create a quoteblock
	Quote.prototype.render = function(){

		var quote = this;
		if(this.element) return this.element;

		this.element = $('#newQuote').clone();
		this.element
			.attr('id', '')
			.addClass('quoteblock')
			.find('h3')
			.text(this.text)
			.siblings('span')
			.text(this.author)

		var quote = this;

		this.element.on('click', '.rating>i', function(){
		var clickRating = $(this).attr('id').charAt(5);
		quote.pushRating(clickRating);
		});

		this.element.on('click', '#meh', function(){
			console.log('Nay');
			quote.element.remove();
		});
		this.element.on('click', '#heart', function(){
			$(this).attr('id', 'heart-yes').attr('class', fullHeart);
		});
		this.element.on('click', '#heart-yes', function(){
			$(this).attr('id', 'heart').attr('class', emptyHeart);
		});

		// create mouseover for heart icon
		this.element.on('mouseover', '#heart', function(){
			$(this).attr('class', fullHeart)
			});
		this.element.on('mouseout', '#heart', function(){
			$(this).attr('class', emptyHeart)
			});

		//  create mouseover for meh icon
		this.element.on('mouseover', '#meh', function(){
			$(this).attr('class', remove)
			});
		this.element.on('mouseout', '#meh', function(){
			$(this).attr('class', mehFace)
			});

		// create mouseover for star icons
		this.element.on('mouseover', '.rating>i', function(){
			var whichStar = $(this).attr('id').charAt(5);
			for (var i=1; i<=whichStar; i++){
				$(this).closest('div').find('#star-'+i).attr('class', fullStar)
			}
			});
		this.element.on('mouseout', '.rating>i', function(){
			if (quote.rating.length === 0){
				for (var i=1; i<6; i++){
				$(this).closest('div').find('#star-'+i).attr('class', emptyStar)
			}
			} else {
			quote.editRating();
			}
			
		});

		
		return this.element;
	};

	Quote.prototype.pushMeh = function(){
		

	};
	// create a method for manipulating visual ratings
	Quote.prototype.pushRating = function(num){
		// push the new rating to the rating array
		this.rating.push(num);
		console.log('this rating: ', this.rating);
		// create a new variable to add the array items to for averaging
		this.editRating();
	};
	Quote.prototype.editRating = function(){
		var newRating = 0;
		for (var i=0; i<this.rating.length; i++){
			newRating = newRating+(+this.rating[i]);
			console.log('avg rate after for loop: ', newRating)
		};

		console.log('avg after for loop: ', newRating);
		this.averageRate = newRating/this.rating.length;

		console.log('avg after division: ', this.averageRate);
		var remainder = 0;
		for (var i=1; i<=this.averageRate; i++){
			this.element.find('#star-'+i).attr('class', fullStar)
			remainder = this.averageRate-i;
			if(remainder >= .25 && remainder < .75){
					this.element.find('#star-'+(i+1)).attr('class', altHalfStar);
					this.element.find('#star-'+(i+2)).attr('class', emptyStar);
			}
			if(remainder >= .75){
				this.element.find('#star-'+(i+1)).attr('class', fullStar);
			}
			if(remainder < .25){
					this.element.find('#star-'+(i+1)).attr('class', emptyStar);
					this.element.find('#star-'+(i+2)).attr('class', emptyStar);
			}
		};
		
	};


	
	var QuoteLibrary = function(quotes){
		this.quotes = quotes;
	};
	var allQuotes = new QuoteLibrary([]);

	QuoteLibrary.prototype.render = function(){
		var quote = this;

		if (this.element) return this.element;

		this.element = $('<div>');
		this.element
			.addClass('container');

		this.element.on('click', 'span', function(){
			console.log(quote);
			console.log('this on click: ', this);
			var authName = $(this).text();
			

			for(var i = 0; i< quote.quotes.length; i++){
				if (quote.quotes[i].author !== authName){
					quote.quotes[i].element.toggle();
				}
			}
		})

		return this.element;
	};

	QuoteLibrary.prototype.addItem = function(newQuote){
		this.quotes.push(newQuote);

		this.render();

		var quoteBlock = newQuote.render();
		this.element.append(quoteBlock);

	};

	

	// create event handler for submit button
	QuoteLibrary.prototype.onSubmit = function(e){
		console.log('hey!');
		e.preventDefault();

		var quoteLibrary = this;
		var form = $(event.target);
		var newText = $(this).find('[name=\'text\']').val();
		var newAuthor = $(this).find('[name=\'author\']').val();

		var newQuote = new Quote(newText, newAuthor);
		console.log(newAuthor);
		quoteLibrary.addItem(newQuote);
	};

	QuoteLibrary.prototype.alphaSort = function(){
		var quote = this;
		this.quotes = this.quotes.sort(function(a, b){
		 var nameA=a.author.toLowerCase(), nameB=b.author.toLowerCase()
		 if (nameA < nameB) //sort string ascending
		  return -1 
		 if (nameA > nameB)
		  return 1
		 return 0 //default return value (no sorting)
		});
		console.log(this);
		for(var i = 0; i<this.quotes.length; i++){
			this.element.append(this.quotes[i].render());
		}
	};
	QuoteLibrary.prototype.ratingSort = function(){
		var quote = this;
		this.quotes = this.quotes.sort(function(a,b){
			var ratingA = a.averageRate
			var ratingB = b.averageRate
			if (ratingA > ratingB)
				return -1
			if (ratingA < ratingB)
				return 1
			return 0
		});
		for(var i = 0; i<this.quotes.length; i++){
			this.element.append(this.quotes[i].render());
		}
	};

	QuoteLibrary.prototype.heartSort = function(){
			
	    for(var i = 0; i<this.quotes.length; i++){
			if(this.quotes[i].element.find('#meh').siblings('i').attr('id') === 'heart'){
				this.quotes[i].element.toggle();
			}
		};
		
	};

	// event handler for clicking add new quote button
	$('#add-quote-anchor').on('click', function(event){

		event.preventDefault();
		$('.form-div').toggle();

	})
	$('#alphabetical').on('click', function(event){

		event.preventDefault();
		allQuotes.alphaSort();

	})
	$('#highest').on('click', function(event){

		event.preventDefault();
		allQuotes.ratingSort();

	})
	$('#heart').on('click', function(event){

		event.preventDefault();
		allQuotes.heartSort();

	})
	$('#test-form').on('submit', function(e){
		console.log('hey!');
		e.preventDefault();

		var newText = $(this).find('[name=\'text\']').val();
		var newAuthor = $(this).find('[name=\'author\']').val();
		$(this).find('[name=\'text\']').val('');
		$(this).find('[name=\'author\']').val('');
		$('.form-div').toggle();
		var newQuote = new Quote(newText, newAuthor);
		console.log(newAuthor);
		allQuotes.addItem(newQuote);
	})
	var aQuote = new Quote('Yay for quotes!', 'Lee Acker');
	var knowItAll = new Quote('People who think they know everything are a great annoyance to those of us who do.', 'Isaac Asimov');
	var idealist = new Quote('I\'m an idealist. I don\'t know where i\'m going, but i\'m on my way.', 'Carl Sandberg');

	var agree = new Quote('I\'m sorry, if you were right, i\'d agree with you.' , 'Robin Williams');

	var rushHour = new Quote('Why do they call it rush hour when nothing moves?' , 'Robin Williams');

	allQuotes.addItem(aQuote);
	allQuotes.addItem(knowItAll);
	allQuotes.addItem(idealist);
	allQuotes.addItem(agree);
	allQuotes.addItem(rushHour);
	$('.container').append(allQuotes.element);

	console.log(allQuotes);
	

  
});