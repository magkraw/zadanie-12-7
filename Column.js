function Column(id, name) {
  var self = this;

  this.id = id;
  this.name = name || 'brak nazwy';

  this.element = createColumn();

  function createColumn() {
  	var column = $('<div class="column"></div>');
  	var columnTitle = $('<div class="column-title-wrapper"><h2 class="column-title">' + self.name + '</h2></div>');
  	var columnCardList = $('<ul class="card-list"></ul>');
  	var columnDelete = $('<button class="btn-delete">x</button>');
  	var columnAddCard = $('<button class="column-add-card">Dodaj kartę</button>');
    var columnEditBtn = $('<button class="btn-edit"><i class="fa fa-pencil" aria-hidden="true"></i></button>');
    var btnWrapper = $('<div class="btn-wrapper"></div>');

    columnDelete.click(function() {
	    self.deleteColumn();
    });

    columnEditBtn.click(function() {
	    self.editColumn();
    });

   columnAddCard.click(function(event) {
   	var cardName = prompt('Podaj nazwę karty');
   	event.preventDefault();
     $.ajax({
       url: baseUrl + '/card',
       method: 'POST',
       data: {
         name: cardName,
         bootcamp_kanban_column_id: self.id
       },
       success: function(response) {
         var card = new Card(response.id, cardName, self.id);
         self.createCard(card);
       }
     });
   });

    btnWrapper
      .append(columnEditBtn)
      .append(columnDelete);

    columnTitle
      .append(btnWrapper);

    column
      .append(columnTitle)
  		.append(columnAddCard)
  		.append(columnCardList);
  	return column;
  }
}

Column.prototype = {
	createCard: function(card) {
	  this.element.children('ul').append(card.element);
	},

  deleteColumn: function() {
    var self = this;
    $.ajax({
      url: baseUrl + '/column/' + self.id,
      method: 'DELETE',
      success: function(response){
        self.element.remove();
      }
    });
  },
  editColumn: function () {
    var self = this;
    var newName = prompt('Podaj nową nazwę kolumny');
    $.ajax({
      url: baseUrl + '/column/' + self.id,
      method: 'PUT',
      data: {
        name: newName,
      },
      success: function(){
        self.element.find('.column-title').text(newName);
      }
    })
  }
}
