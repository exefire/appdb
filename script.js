// JavaScript Document
// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// Populate the database
//
function populateDB(tx) {
		var currentdate = new Date(); 
		var hora = 				"" 
										+ currentdate.getFullYear() + "-"  
										+ (currentdate.getMonth()+1)  + "-" 
										+	currentdate.getDate() + " "
										+ currentdate.getHours() + ":"  
										+ currentdate.getMinutes() + ":" 
										+ currentdate.getSeconds();
		tx.executeSql('DROP TABLE IF EXISTS DEMO');
		tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
		tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "'+hora+'")');
		tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
		tx.executeSql('INSERT INTO DEMO (id, data) VALUES (3, "Tercera Compañía")');
		tx.executeSql('INSERT INTO DEMO (id, data) VALUES (4, "4º Compañía")');
		tx.executeSql('INSERT INTO DEMO (id, data) VALUES (5, "5ª Compañía")');
}

// Query the database
//
function queryDB(tx) {
		tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
}

// Query the success callback
//
function querySuccess(tx, results) {
    var len = results.rows.length;
		console.log("Returned rows = " + results.rows.length);
		// this will be true since it was a select statement and so rowsAffected was 0
		
		$('#contenido').html('');
		for (var i=0; i<len; i++){
				console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
				$('#contenido').append("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data + '<br>');
		}
		
		if (!results.rowsAffected) {
				console.log('No rows affected!');
				return false;
		}
		// for an insert statement, this property will return the ID of the last inserted row
		console.log("Last inserted row ID = " + results.insertId);
}

// Transaction error callback
//
function errorCB(err) {
		console.log("Error processing SQL: "+err.code);
}

// Transaction success callback
//
function successCB() {
		var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
		db.transaction(queryDB, errorCB);
}

// device APIs are available
//
function onDeviceReady() {
		var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
		db.transaction(populateDB, errorCB, successCB);
}

		var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
		db.transaction(populateDB, errorCB, successCB);
