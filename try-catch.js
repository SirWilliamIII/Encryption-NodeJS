try {
	doWork();
} catch( e ) {
	console.log( 'something fucked up' )
} finally {
	console.log( 'finally block executed' )
}

console.log( 'try-catch is over' );


function doWork() {
	throw new Error( 'do work error message: Unable to Do Work.' );
};
