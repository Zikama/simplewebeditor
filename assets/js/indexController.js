/**
 * Created with love by Nehemie
 */

class IndexController {

    constructor(){
        this.init();
    }

	init(){        
        this.openDatabase(); //initialize the db
    }
    openDatabase() {
        // If the browser doesn't support service worker,
        // we don't care about having a database
        if (!navigator.serviceWorker) {
            return Promise.resolve();
        }
		//___ trying to make a database, to store user's generated color,for later use
        return idb.open('Artb-editor', 1, (upgradeDb) => {

            switch(upgradeDb.oldVersion) {
                case 0:
                    const userStore = upgradeDb.createObjectStore('users', {
                        keyPath: 'id',autoIncrement: true 
                    });
                    userStore.createIndex('id', 'id');
                case 1:
                    var exchangeRateStore = upgradeDb.createObjectStore('usually', {
                        keyPath: 'id'
                    });
                    exchangeRateStore.createIndex('rate', 'id');
            }
        });
    }

    addUsersToDatabase(users) {
        this.openDatabase().then(db => {
            if (!db) return;
			const tx = db.transaction('users', 'readwrite');
            const store = tx.objectStore('users');
			Object.values(users.results).forEach((user) => {
                store.put(user)});
			}).catch(error => console.log('Something went wrong: '+ error));
    }
    showUpdateUI(message){
        let htmlTemplate = '';
		    htmlTemplate +=`<div class="card-body"><h5 class="card-title">${message}</h5>
                       <button id="btn-refresh" class="brn-sm-radius">Refresh</button>
                       <button id="btn-cancel" class="brn-sm-radius">Cancel</button>
                   </div>
            `;
        const updateMessage = document.querySelector('#update-message');
		
        updateMessage.innerHTML = htmlTemplate;
    }
}
