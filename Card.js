function Card(id, name, columnId) {
  var self = this;

  this.columnId = columnId;
  this.id = id;
  this.name = name || 'Brak nazwy';

	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>');
    var btnWrapper = $('<div class="btn-wrapper"></div>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardDescription = $('<p class="card-description"></p>');
    var cardEditBtn = $('<button class="btn-edit"><i class="fa fa-pencil" aria-hidden="true"></i></button>');

		cardDeleteBtn.click(function(){
			self.removeCard();
		});

    cardEditBtn.click(function() {
      self.editCard();
    });

    btnWrapper
      .append(cardEditBtn)
      .append(cardDeleteBtn);

		cardDescription.text(self.name);
		card
      .append(cardDescription)
      .append(btnWrapper);
		return card;
	}
}

Card.prototype = {
  removeCard: function() {
    var self = this;
    $.ajax({
      url: baseUrl + '/card/' + self.id,
      method: 'DELETE',
      success: function(){
        self.element.remove();
      }
    });
  },
  editCard: function () {
    var self = this;
    var newName = prompt('Podaj nową nazwę karty');
    $.ajax({
      url: baseUrl + '/card/' + self.id,
      method: 'PUT',
      data: {
        name: newName,
        bootcamp_kanban_column_id: self.columnId
      },
      success: function(){
        self.element.find('.card-description').text(newName);
      }
    })
  }

}
