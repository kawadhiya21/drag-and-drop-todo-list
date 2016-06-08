var todo_list = [];

if (typeof(Storage) === "undefined") {
  alert("Local Storage does not work. The app may not function properly");
} else {
  var list = localStorage.list;
  if (list) {
    todo_list = JSON.parse(list);
    populate(todo_list);
  }
}

function populate(todolist) {
  var listElements = "";
  todolist.forEach(function(ele, index) {
    listElements += '<li class="list-group-item" id="' + index + '">';
    listElements += ele.name;
    listElements += '<a href="#"><span class="glyphicon glyphicon-remove pull-right remove_todo" data-id="' + index +  '"></span></a>';
    listElements += '</li>';
  });
  $('#sortable').html(listElements);
  addSortingProperties();
  addEventListener();
}

function update_todo_list(todolist) {
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("list", JSON.stringify(todolist));
  }
}
function addEventListener () {
  $('.remove_todo').click(function () {
    var todoId = this.getAttribute("data-id");
    todo_list.splice(todoId, 1);
    update_todo_list(todo_list);
    populate(todo_list);
  });
}

function addSortingProperties() {
  $(function() {
    $( "#sortable" ).sortable({
      stop: function () {
        var new_todo_list = [];
        var children = $('#sortable').children();
        for(var i = 0; i<children.length; i++) {
          new_todo_list.push({
            name: children[i].childNodes[0].textContent
          });
        }
        todo_list = new_todo_list;
        update_todo_list(todo_list);
        populate(todo_list);
      }
    });
    $( "#sortable" ).disableSelection();
  });
}

$('#addnew').click(function () {
  var todo = prompt("Add new todo");
  if (!todo) {
    alert("Blank string passed");
    return false;
  }

  todo_list.push({
    name: todo.replace(/</g, "&lt;").replace(/>/g, "&gt;")
  });
  update_todo_list(todo_list);
  populate(todo_list);
});