var crypto = require( 'crypto-js' );

var secretSociety = {
	group: 'Bildeberg',
	members: [
        'Bush',
        'Rumsfeld',
        'Clinton',
        'Cheney',
        'Condi'
    ],
	location: 'St.Maarten'
};

var secretPassword = 'for the love of cheap oil';

var secretSocietyString = JSON.stringify( secretSociety );
var encryptedMessage = crypto.AES.encrypt( secretSocietyString, secretPassword );
// DECRYPT the mumbo jumbo
var bytes = crypto.AES.decrypt( encryptedMessage, secretPassword );
var decryptedMessage = JSON.parse( bytes.toString( crypto.enc.Utf8 ) );

console.log( crypto.enc.Utf8 );
