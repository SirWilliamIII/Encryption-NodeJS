var storage = require( 'node-perist' );
storage.initSync();

function createAccount( account ) {
	var accounts = storage.getItemSync( 'accounts' );
	if( typeof accounts === 'undefined' ) {
		accounts = [];
	}
	accounts.push( account );
	storage.setItemSync( 'accounts', account );
	return( account );
};

function getAccount( accountName ) {
	var accounts = storage.getItemSync( 'accounts' );
	var matchedAccount;

	accounts.forEach( function( account ) {

		if( account.name === accountName ) {
			matchedAccount = account;
		}
	} );
	return matchedAccount;
}
