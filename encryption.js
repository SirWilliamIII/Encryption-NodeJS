var crypto = require( 'crypto-js' );

var secretMessage = {
	name: 'Andrew',
	secretName: '007'
};
var secretKey = 'vagina69';

// encryption
var kryptoMessage = crypto.AES.encrypt( JSON.stringify( secretMessage ), secretKey );
console.log( typeof kryptoMessage );
console.log( "Encrypted Message ==> " + kryptoMessage );

// decryption

var bytes = crypto.AES.decrypt( kryptoMessage, secretKey );
var decryptoMessage = JSON.parse( bytes.toString( crypto.enc.Utf8 ) );

console.log( decryptoMessage );
console.log( decryptoMessage.secretName );
