var storage = require( 'node-persist' );

var crypto = require( 'crypto-js' );

storage.initSync();


var argv = require( 'yargs' ).command( 'create', 'Create a new account', function( yargs ) {
		yargs.options( {
			name: {
				demand: true,
				alias: 'n',
				description: 'Account name (eg. Twitter, Facebook)',
				type: 'string'
			},
			username: {
				demand: true,
				alias: 'u',
				description: 'Account username or email',
				type: 'string'
			},
			password: {
				demand: true,
				alias: 'p',
				description: 'Account password',
				type: 'string'
			},
			masterPassword: {
				demand: true,
				alias: 'p',
				description: 'Master password',
				type: 'string'
			}
		} ).help( 'help' );
	} )
	.command( 'get', 'Get an existing account', function( yargs ) {
		yargs.options( {
			name: {
				demand: true,
				alias: 'n',
				description: 'Account name (eg. Twitter, Facebook)',
				type: 'string'
			},
			masterPassword: {
				demand: true,
				alias: 'm',
				description: 'Master password',
				type: 'string'
			}

		} ).help( 'help' );
	} )
	.help( 'help' )
	.argv;

var command = argv._[ 0 ];

function createAccount( account, masterPassword ) {
	var accounts = getAccounts( masterPassword );
	accounts.push( account );
	//storage.setItemSync( 'accounts', account ); // make call to saveAccounts for encryption code
	saveAccounts( accounts, masterPassword );
	return( account );
}

function getAccount( accountName, masterPassword ) {
	var accounts = getAccounts( masterPassword );
	var matchedAccount;
	accounts.forEach( function( account ) {
		if( account.name === accountName ) {
			matchedAccount = account;
		}
	} );
	return( matchedAccount );
}
/* Create 2 new functions. 
                 getAccounts(masterPassword){
                 	if( typeof accounts === 'undefined' ) {
	                 	accounts = [];
	                }
                      use getItemSync to fetch accounts
                      decrypt
                      return accounts array
                                          
    saveAccounts(accounts, masterPassword){
        encrypt accounts, 
        use setItemSync to save encrypted accounts
        return accounts array   */
function getAccounts( masterPassword ) {
	var encryptedAccount = storage.getItemSync( 'accounts' );
	var accounts = [];

	if( typeof encryptedAccount === 'undefined' ) {
		var bytes = crypto.AES.decrypt( encryptedAccount, masterPassword );
		/* 
		 *   Our secret message in this case would be 'encryptedAccount' and the secret key is the 'masterPassword'.
		 */
		var accounts = JSON.parse( bytes.toString( crypto.enc.Utf8 ) );
	}



	return accounts;
}




function saveAccounts( accounts, masterPassword ) {
	var encryptedAccounts = crypto.AES.encrypt( JSON.stringify( accounts ), masterPassword );
	storage.setItemSync( 'accounts', encryptedAccounts.toString() );

	return accounts;
}

if( command === 'create' ) {
	var createdAccount = createAccount( {
		name: argv.name,
		username: argv.username,
		password: argv.password
	}, argv.masterPassword );
	console.log( 'Account created!' )
	console.log( createdAccount );
} else if( command === 'get' ) {
	var fetchedAccount = getAccount( argv.name, argv.masterPassword );

	if( typeof fetchedAccount === 'undefined' ) {
		console.log( 'Account not found!' )
	} else {
		console.log( 'Account found!' );
		console.log( fetchedAccount );
	}
}
