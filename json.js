var pet = {
	name: 'Kela',
	age: 7
};

var petStr = JSON.stringify( pet );
console.log( petStr );
console.log( typeof petStr );

var petObj = JSON.parse( petStr );
console.log( petObj );
console.log( typeof petObj );
