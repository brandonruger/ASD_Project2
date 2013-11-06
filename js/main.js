/* Brandon Ruger
 * ASD 1311
 * Project 2 */

$('#home').on('pageinit', function(){
    //code needed for home page goes here
});

$('#addalbum').on('pageinit', function(){
    
    //code needed for add album page goes here
    
    //Function to determine which check boxes are checked:
    //function getSelectedCheckedBoxes() {
    //    if ($("#radio1").checked) {
    //        radio1Val = $("#radio1").value;
    //    } else {
    //        radio1Val = "No"
    //    };
    //    if ($("#radio2").checked){
    //        radio2Val = $("#radio2").value;
    //    } else {
    //        radio2Val = "No"
    //    };
    //}
    
    //Function to hide form
        
    //function toHideForm(n) {
    //    switch (n){
    //        case "on":
    //            $("#addAlbumForm").css("display", "none");
    //            $("#clearData").css("display", "inline");
    //            $("#displayData").css("display", "none");
    //            $("#addNewReminder").css("display", "inline");
    //            break;
    //        case "off":
    //            $("#addAlbumForm").css("display", "block");
    //            $("#clearData").css("display", "inline");
    //            $("#displayData").css("display", "inline");
    //            $("#addNewReminder").css("display", "none");
    //            $("#items").css("display", "none");
    //            break;
    //        default:
    //            return false;
    //    }
    //}
    
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
        var itemList            = {};
            itemList.artist    = $("#artist").val();
            itemList.album     = $("#album").val();
            itemList.format    = $("#format").val();
            //itemList.list      = ["Which List:", radio1Val]; //Need to fix this to make sure it pulls radio button values.
            itemList.date      = $("#date").val();
            itemList.notes     = $("#notes").val();
            
            //Save data into Local Storage
            localStorage.setItem(generateId, JSON.stringify(itemList));
            alert("Album has been added!");
            console.log(localStorage);
    }
    
    //Dynamically create Edit & Delete Links
    function createEditDelLinks(key, newLinksLi) {
        
        var editLink = $('<a href="#">Edit Item</a>').appendTo("#addAlbumForm").on("click", editReminder);
        editLink.key = key;
        $(editLink).append(newLinksLi);
        
        //add line break
        var breakTag = $('br').appendTo("#addAlbumForm");
        
        //add delete single item link
        var deleteLink = $('<a href="#">Delete Item</a>').appendTo("#addAlbumForm").on("click", deleteReminder);
        $(deleteLink).append(newLinksLi);
        
    }
    
    //Get Data from Local Storage
    function getDataFromStorage() {
        //toHideForm("on");
        if (localStorage.length === 0) {
            alert("There is no data in Local Storage so default data was added.");
            getJsonData();
        }
        
        //jQuery code to write data from local storage to the browser
        $('<div id="items"><ul></ul></div>').appendTo("#addalbum").css("display", "block");
        for (var i=0; i<localStorage.length; i++){
            var newListItem = $('<li></li>').appendTo("#items > ul");
            var key = localStorage.key(i);
            var dataValue = localStorage.getItem(key);
            //Convert string from local storage back to an object.
            var findObject = JSON.parse(dataValue);
            var subList = $('<ul></ul>').appendTo(newListItem);
            for (var n in findObject) {
                var makeNewSubList = $('<li></li>').appendTo(subList)
                var subText = findObject[n][0]+ " " +findObject[n][1];
                makeNewSubList.html(subText);
            }
            createEditDelLinks(localStorage.key(i), newListItem); //Create our edit and delete links for each item in local storage.

        }
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
            $("#radio1").attr("checked", "checked");
        }
                
        if (itemList.radio2[1] == "wish-list") {
            $("#radio2").attr("checked", "checked");
            
        }
                
        $("#date").value = itemList.date[1];
        $("#notes").value = itemList.notes[1];
        
        //Remove the initial listener from the imput 'create reminder' button.
        createButton.off("click", validateInput);
        //Change Submit button value to Edit button
        $("#saveAlbumButton").value = "Update Album";
        var changeButton = $("#saveAlbumButton");
        
        //Save the key value established in this function as a property of the editSubmit event.
        //So that we can use that value when we save the data we edited.
        changeButton.on("click", validateInput);
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
    
    //Variable Defaults
    var radio1Val;
    var radio2Val;
    
    //Set Link & Submit Click Events
    
    var displayData = $("#displayData");
    displayData.on("click", getDataFromStorage);
    var clearData = $("#clearData");
    clearData.on("click", clearLocalStorage);
    var saveData = $("#saveAlbumButton");
    saveData.on("click", submitData);
    //var createButton = $("#button");
    //createButton.on("click", validateInput);
        
});

/* Code to refactor */

    
    
    

    
    
    
    
    
        
        //Write Data from local storage to the browser
        //var createDiv = document.createElement('div');
        //createDiv.setAttribute("id", "items");
        //var createList = document.createElement('ul');
        //createDiv.appendChild(createList);
        //document.body.appendChild(createDiv);
        //$("#items").css("display", "block");
        //for (var i=0; i<localStorage.length; i++) {
        //    var createListItem = document.createElement('li');
        //    var newLinksLi = document.createElement('li');
        //    createList.appendChild(createListItem);
            //var key = localStorage.key(i);
            //var dataValue = localStorage.getItem(key);
            ////Convert string from local storage back to an Object.
            //var findObject = JSON.parse(dataValue);
            //var subList = document.createElement('ul');
            //createListItem.appendChild(subList);
            //getIcon(findObject.fleaRx[1], subList);
            //for (var n in findObject) {
            //    var makeSublist = document.createElement('li');
            //    subList.appendChild(makeSublist);
                //var subText = findObject[n][0]+ " " +findObject[n][1];
                //makeSublist.innerHTML = subText;
    //            createListItem.appendChild(newLinksLi);
    //        }
    //        createEditDelLinks(localStorage.key(i), newLinksLi); //Create our edit and delete links for each item in local storage.
    //        
    //    }
    //    
    //}
    
        
    
    

    //Function to create edit/delete links for each stored item when displayed.
    //function createEditDelLinks(key, newLinksLi) {
    //    //add edit single item link
    //    var editLink = document.createElement('a');
    //    editLink.href = "#";
    //    editLink.key = key;
    //    var editText = "Edit Reminder";
    //    editLink.on("click", editReminder);
    //    editLink.innerHTML = editText;
    //    newLinksLi.appendChild(editLink);
    
        //    //add line break
        //var breakTag = document.createElement('br');
        //newLinksLi.appendChild(breakTag);
        
        // //add delete single item link
        //var deleteLink = document.createElement('a');
        //deleteLink.href = "#";
        //deleteLink.key = key;
        //var deleteText = "Delete Reminder";
        //deleteLink.on("click", deleteReminder);
        //deleteLink.innerHTML = deleteText;
        //newLinksLi.appendChild(deleteLink);

        
        
    

    

    
//    function validateInput(eventData) {
//        //Define the elements we want to check
//        var getPetName = getElements('petname');
//        var getPetAge = getElements('petage');
//        var getPetType = getElements('pettype');
//        
//        //Reset Error Messages
//        error.innerHTML = "";
//        getPetName.style.border = "1px solid black";
//        getPetAge.style.border = "1px solid black";
//        getPetType.style.border = "1px solid black";
//        
//        
//        //Get Error Messages
//        var errorMessagesArray = [];
//        
//        //Pet Name Validation
//        if (getPetName.value === "") {
//            var nameError = "Please enter your pet's name.";
//            getPetName.style.border = "2px solid red";
//            errorMessagesArray.push(nameError);
//        }
//        
//        
//        //Pet Age Validation
//        var re = /^\d{1,2}$/;
//        if (!(re.exec(getPetAge.value))){
//            var ageError = "Please enter your pet's numerical age.";
//            getPetAge.style.border = "2px solid red";
//            errorMessagesArray.push(ageError);
//        }
//        
//        
//        //Pet Type Validation
//        if (getPetType.value === ""){
//            var typeError = "Please enter your pet's type.";
//            getPetType.style.border = "2px solid red";
//            errorMessagesArray.push(typeError);
//        }
//        
//        //If there were errors, display them on screen.
//        if (errorMessagesArray.length >= 1) {
//            for (var i=0, j=errorMessagesArray.length; i<j; i++) {
//                var txt = document.createElement('li');
//                txt.innerHTML = errorMessagesArray[i];
//                error.appendChild(txt);
//;            }
//
//            eventData.preventDefault();
//            return false;
//        } else{
//            //If all is OK, save our data!
//            //Send key value which came from edit function.
//            //Remember this key value was passed through the event Listener as a property.
//            submitData(this.key);
//        }
//
//    }
    

    
    //var error = getElements('errors');
    

    
    
    
    
    
