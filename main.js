$(document).on('ready', function() {
  

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
	};

	// create a render method to create a quoteblock
	Quote.prototype.render = function(){

		if(this.element) return this.element;

		this.element = $('#newQuote').clone();
		this.element
			.attr('id', '')
			.addClass('quoteblock')
			.find('h3')
			.text(this.text)
			.siblings('p')
			.find('span')
			.text(this.author);

		return this.element;
	};
	var QuoteLibrary = function(quotes){
		this.quotes = quotes;
	};
	var allQuotes = new QuoteLibrary([]);

	QuoteLibrary.prototype.render = function(){
		if (this.element) return this.element;

		this.element = $('<div>');
		this.element
			.addClass('container');

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

	// $('document').on('.submit', 'form', allQuotes.onSubmit(event));

	// event handler for clicking add new quote button
	$('#add-quote-anchor').on('click', function(event){

		event.preventDefault();
		$('#test-form').toggle();

		

	})
	$('#test-form').on('submit', function(e){
		console.log('hey!');
		e.preventDefault();

		var newText = $(this).find('[name=\'text\']').val();
		var newAuthor = $(this).find('[name=\'author\']').val();
		$(this).find('[name=\'text\']').val('');
		$(this).find('[name=\'author\']').val('');
		var newQuote = new Quote(newText, newAuthor);
		console.log(newAuthor);
		allQuotes.addItem(newQuote);
	})
	var aQuote = new Quote('Yay for quotes!', 'Lee Acker');
	allQuotes.addItem(aQuote);
	$('.container').append(allQuotes.element);
  
});