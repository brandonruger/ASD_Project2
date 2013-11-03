/* Brandon Ruger
 * ASD 1311
 * Project 2 */

$('#home').on('pageinit', function(){
	//code needed for home page goes here
});

$('#addalbum').on('pageinit', function(){
	//code needed for add album page goes here
});

$('#saveditems').on('pageinit', function(){
	//code needed for saved items page goes here
});

/* Code to refactor */

    
    
    //Function to determine which check boxes are checked:
    function getSelectedCheckedBoxes() {
        if ($("#radio1").checked) {
            fleaValue = $("#radio1").value;
        } else {
            fleaValue = "No"
        };
        if ($("#radio2").checked){
            heartwormValue = $("#radio2").value;
        } else {
            heartwormValue = "No"
        };
    }

    function toHideForm(n) {
        switch (n){
            case "on":
                $("#addAlbumForm").style.display = "none";
                $("#clearData").style.display = "inline";
                $("#displayData").style.display = "none";
                $("#addNewReminder").style.display = "inline";
                break;
            case "off":
                $("#addAlbumForm").style.display = "block";
                $("#clearData").style.display = "inline";
                $("#displayData").style.display = "inline";
                $("#addNewReminder").style.display = "none";
                $("#items").style.display = "none";
                break;
            default:
                return false;
        }
    }
    
    //Create function to submit data.
    function submitData(key) {
        //If there is no key, this means this is a brand new item and we need a new key.
        if (!key) {
            var generateId = Math.floor(Math.random()*100000001);
        }else{
            //Set the id to the existing key we're editing, so it will save over the data.
            generateId = key;
        }
        
        //Gather up all our form field values and store in an object.
        //Object properties contain array with the form label and input value.
        getSelectedCheckedBoxes(); 
        var itemList            = {};
            itemList.artist    = ["Artist's Name:", $("#artist").value];
            itemList.album     = ["Album Title:", $("#album").value];
            itemList.format    = ["Music Format:", $("#format").value];
            itemList.list       = ["Which List:", fleaValue]; //Need to fix this to make sure it pulls radio button values.
            itemList.date       = ["Release Date:", $("#date").value];
            itemList.notes       = ["Notes:", $("#notes").value];
            
            //Save data into Local Storage
            localStorage.setItem(generateId, JSON.stringify(itemList));
            alert("Album has been added!");
    }
    
    function getDataFromStorage() {
        toHideForm("on");
        if (localStorage.length === 0) {
            alert("There is no data in Local Storage so default data was added.");
            getJsonData();
        }
        
        //Write Data from local storage to the browser
        var createDiv = document.createElement('div');
        createDiv.setAttribute("id", "items");
        var createList = document.createElement('ul');
        createDiv.appendChild(createList);
        document.body.appendChild(createDiv);
        getElements('items').style.display = "block";
        for (var i=0; i<localStorage.length; i++) {
            var createListItem = document.createElement('li');
            var newLinksLi = document.createElement('li');
            createList.appendChild(createListItem);
            var key = localStorage.key(i);
            var dataValue = localStorage.getItem(key);
            //Convert string from local storage back to an Object.
            var findObject = JSON.parse(dataValue);
            var subList = document.createElement('ul');
            createListItem.appendChild(subList);
            getIcon(findObject.fleaRx[1], subList);
            for (var n in findObject) {
                var makeSublist = document.createElement('li');
                subList.appendChild(makeSublist);
                var subText = findObject[n][0]+ " " +findObject[n][1];
                makeSublist.innerHTML = subText;
                createListItem.appendChild(newLinksLi);
            }
            createEditDelLinks(localStorage.key(i), newLinksLi); //Create our edit and delete links for each item in local storage.
            
        }
        
    }
    

    //Function to create edit/delete links for each stored item when displayed.
    function createEditDelLinks(key, newLinksLi) {
        //add edit single item link
        var editLink = document.createElement('a');
        editLink.href = "#";
        editLink.key = key;
        var editText = "Edit Reminder";
        editLink.addEventListener("click", editReminder);
        editLink.innerHTML = editText;
        newLinksLi.appendChild(editLink);
        
        //add line break
        var breakTag = document.createElement('br');
        newLinksLi.appendChild(breakTag);
        
        //add delete single item link
        var deleteLink = document.createElement('a');
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete Reminder";
        deleteLink.addEventListener("click", deleteReminder);
        deleteLink.innerHTML = deleteText;
        newLinksLi.appendChild(deleteLink);
    }
    
    //Auto populate Local Storage with JSON data
    function getJsonData() {
        //Store JSON Object into Local Storage.
        for (var n in json) {
            var id = Math.floor(Math.random()*10000001);
            localStorage.setItem(id, JSON.stringify(json[n]));
        }
    }
    
    function editReminder() {
        //Grab the data from our item from Local Storage.
        var lsData = localStorage.getItem(this.key);
        var itemList = JSON.parse(lsData);
        
        //Show the form
        toHideForm("off");
        
        //Populate form fields with current localStorage values.
        $("#artist").value = itemList.artist[1];
        $("#album").value = itemList.album[1];
        $("#format").value = itemList.format[1];

        if(itemList.radio1[1] == "current-collection") {
            $("#radio1").setAttribute("checked", "checked");
        }
                
        if (itemList.radio2[1] == "wish-list") {
            $("#radio2").setAttribute("checked", "checked");
            
        }
                
        $("#date").value = itemList.date[1];
        $("#notes").value = itemList.notes[1];
        
        //Remove the initial listener from the imput 'create reminder' button.
        createButton.removeEventListener("click", validateInput);
        //Change Submit button value to Edit button
        $("#saveAlbumButton").value = "Update Album";
        var changeButton = $("#saveAlbumButton");
        
        //Save the key value established in this function as a property of the editSubmit event.
        //So that we can use that value when we save the data we edited.
        changeButton.addEventListener("click", validateInput);
        changeButton.key = this.key;
        
    }
    
    function deleteReminder() {
        var askUser = confirm("Are you sure you want to delete this reminder?");
        if (askUser) {
            localStorage.removeItem(this.key);
            alert("Reminder was deleted!");
            window.location.reload();
        }else{
            alert("Reminder was NOT deleted.")
        }
    }
    
    function clearLocalStorage() {
        if (localStorage.length === 0) {
            alert("Reminder list is already empty.")
        } else {
            localStorage.clear();
            alert("All Reminders have been deleted!");
            window.location.reload();
            return false;
        }
    }
    
    function validateInput(eventData) {
        //Define the elements we want to check
        var getPetName = getElements('petname');
        var getPetAge = getElements('petage');
        var getPetType = getElements('pettype');
        
        //Reset Error Messages
        error.innerHTML = "";
        getPetName.style.border = "1px solid black";
        getPetAge.style.border = "1px solid black";
        getPetType.style.border = "1px solid black";
        
        
        //Get Error Messages
        var errorMessagesArray = [];
        
        //Pet Name Validation
        if (getPetName.value === "") {
            var nameError = "Please enter your pet's name.";
            getPetName.style.border = "2px solid red";
            errorMessagesArray.push(nameError);
        }
        
        
        //Pet Age Validation
        var re = /^\d{1,2}$/;
        if (!(re.exec(getPetAge.value))){
            var ageError = "Please enter your pet's numerical age.";
            getPetAge.style.border = "2px solid red";
            errorMessagesArray.push(ageError);
        }
        
        
        //Pet Type Validation
        if (getPetType.value === ""){
            var typeError = "Please enter your pet's type.";
            getPetType.style.border = "2px solid red";
            errorMessagesArray.push(typeError);
        }
        
        //If there were errors, display them on screen.
        if (errorMessagesArray.length >= 1) {
            for (var i=0, j=errorMessagesArray.length; i<j; i++) {
                var txt = document.createElement('li');
                txt.innerHTML = errorMessagesArray[i];
                error.appendChild(txt);
;            }

            eventData.preventDefault();
            return false;
        } else{
            //If all is OK, save our data!
            //Send key value which came from edit function.
            //Remember this key value was passed through the event Listener as a property.
            submitData(this.key);
        }

    }
    
    //Variable Defaults
    var fleaMedication = ["--Type of Flea Medication--", "Topical", "Oral", "Sprayon"];
    var fleaCheckBox;
    var fleaValue;
    var heartwormValue;
    var otherValue;
    var error = getElements('errors');
    makeFleaMedOptions();
    
    //Set Link & Submit Click Events
    
    var displayData = $("#displayData");
    displayData.addEventListener("click", getDataFromStorage);
    var clearData = $("#clearData");
    clearData.addEventListener("click", clearLocalStorage);
    var createButton = $("#button");
    createButton.addEventListener("click", validateInput);
    
    
    
    
    
});

