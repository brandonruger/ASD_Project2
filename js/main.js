/* Brandon Ruger
 * ASD 1311
 * Project 2 */

$('#home').on('pageinit', function(){
    //code needed for home page goes here
});

$('#addalbum').on('pageinit', function(){
    
    //code needed for add album page goes here
    
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
        var itemList           = {};
            itemList.artist    = $("#artist").val();
            itemList.album     = $("#album").val();
            itemList.format    = $("#format").val();
            //itemList.list      = ["Which List:", radio1Val]; //Need to fix this to make sure it pulls radio button values.
            itemList.date      = $("#date").val();
            itemList.notes     = $("#notes").val();
            
            //Save data into Local Storage
            localStorage.setItem(generateId, JSON.stringify(itemList));
            alert("Album has been added!");
    }
    
    //Set Link & Submit Click Events
    
    
    //var displayXmlData = $("#displayXml");
    //displayXmlData.on("click", getXmlDataFromStorage);

    var saveData = $("#saveAlbumButton");
    saveData.on("click", submitData);
    //var createButton = $("#button");
    //createButton.on("click", validateInput);
        
});

$('#jsonpage').on('pageinit', function(){
    //code needed for home page goes here
    
    //Retrieve JSON data from Ajax
    
    function getJsonDataFromAjax(){
        $("#jsoncontent").empty();
        $.ajax({
            url: 'xhr/data.json',
            type: 'GET',
            dataType: 'json',
            success: function(data, status){
                console.log(data, status)
                console.log(data);
                console.log(data.album);
                $(data).each(function(){
                    $(' '+
                        '<div class=albums">'+
                            '<ul>'+
                                '<li>'+ data.album.artist +'</li>'+
                                '<li>'+ data.album.album +'</li>'+
                                '<li>'+ data.album.format +'</li>'+
                                '<li>'+ data.album.date +'</li>'+
                                '<li>'+ data.album.notes +'</li>'+
                            '</ul>'+
                        '</div>'
                    ).appendTo('#jsoncontent');
                });
            },
            error: function(error, parseerror){
                console.log(error, parseerror)
            }
        })
    }
    
    
    //Dynamically create Edit & Delete Links
    function createEditDelLinks(key, newListItem) {
        var editLink = $('<ul><li><a href="#">Edit Item</a></li></ul>').appendTo("#jsoncontent").on("click", editReminder);
        editLink.key = key;
        $(editLink).append(newListItem);
        console.log(editLink.key);
        
        //add line break
        var breakTag = $('br').appendTo("#addAlbumForm");
        
        //add delete single item link
        var deleteLink = $('<ul><li><a href="#">Delete Item</a></li></ul>').appendTo("#jsoncontent").on("click", deleteReminder);
        deleteLink.key = key;
        $(deleteLink).append(newListItem);
        
        return key;
        
    }
    
    function editReminder() {
        console.log(this.key);
        //Grab the data from our item from Local Storage.
        var lsData = localStorage.getItem(this.key);
        console.log(lsData);
        var itemList = JSON.parse(lsData);
        console.log(itemList);

        
        //Populate form fields with current localStorage values.
        $("#artist").val(itemList.artist[1]);
        $("#album").val(itemList.album[1]);
        $("#format").val(itemList.format[1]);                
        $("#date").val(itemList.date[1]);
        $("#notes").val(itemList.notes[1]);
        
        //Remove the initial listener from the imput 'create reminder' button.
        //createButton.off("click", validateInput);
        //Change Submit button value to Edit button
        $("#saveAlbumButton").val("Update Album");
        var changeButton = $("#saveAlbumButton");
        
        //Save the key value established in this function as a property of the editSubmit event.
        //So that we can use that value when we save the data we edited.
        changeButton.on("click", submitData);
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

    
    var displayJsonData = $("#jsonbutton");
    displayJsonData.on("click", getJsonDataFromAjax);
    var clearData = $("#clearData");
    clearData.on("click", clearLocalStorage);
});

$('#xmlpage').on('pageinit', function(){
    //code needed for home page goes here
});