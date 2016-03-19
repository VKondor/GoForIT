function pow(x, n) {
	var result = x;

	for (i = 1; i < Math.abs(n); i++) {
		result *= x;
	}

	if(n >= 1) {
		return result;
	} else if (n < 0) {
		return 1 / result;
	} else {
		return 1;
	}
}

var x = prompt('Введите число');
var n = prompt('Введите степень');

console.log('Результат: ', pow(x,n) );
