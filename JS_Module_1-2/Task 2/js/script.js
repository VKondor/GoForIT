var arr = [];

for (i = 0; i < 5; i++) {
	var name = prompt('Зарегистрируйте имя');
	arr.push(name);
}

var user = prompt('Введите имя пользователя');
var result;

for (i = 0; i < arr.length; i++) {
	if (user == arr[i]) {
		result = user;
	}
}

if (result == undefined) {
	alert('Пользователь с именем ' + user + ' не найден');
} else {
	alert(user + ',' + ' вы успешно вошли');
}
