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
        //tx.executeSql('DROP TABLE IF EXISTS DEMO');
				tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
				queryDB2(tx);
			}
		
	 function queryDB2(tx) {
        return tx.executeSql('SELECT max(id) as id FROM DEMO ORDER BY id DESC LIMIT 1',[],querySuccess2);
    }
		
		function querySuccess2(tx, results) {
			var currentdate = new Date(); 
			var hora = 				"" 
										+ currentdate.getFullYear() + "-"  
										+ (currentdate.getMonth()+1)  + "-" 
										+	currentdate.getDate() + " "
										+ currentdate.getHours() + ":"  
										+ currentdate.getMinutes() + ":" 
										+ currentdate.getSeconds();
			var siguiente = results.rows.item(0).id + 1;
			tx.executeSql('INSERT INTO DEMO (id, data) VALUES ('+siguiente+', "'+hora+'")');
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
        console.log("DEMO table: " + len + " rows found.");
				$('#contenido').html('');
        for (var i=0; i<len; i++){
						var txt = "Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data;
            console.log(txt);
						$('#contenido').append(txt);
						$('#contenido').append('<br>');
        }
    }

    // Transaction error callback
    //
    function errorCB(err) {
        console.log("Error processing SQL: "+err.message);
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
