/*
    ---------------------
    Chatzy HTML Variables
    ---------------------
*/

var messageTable = "X0000";
var messageContainer = "X0000";
var popup = "X0000";
var messageTime = "X0000";
var messageButton = "X0000";
var PMTag = "X0000";
var textBox = "X0000";
var visitorTable = "X0000";

/*
    -------------------
    Chatzy JS Variables
    -------------------
*/

var isCleared = "X0000";
var timeoutTimer = "X0000";

/*
    -----------------
    Wrapper Functions
    -----------------
*/

// Gets the HTML element with the specified ID
// elementID: String
function elementByID(elementID) {
    return document.getElementById(elementID);
}

// Gets a list of HTML elements with the specified class
// elementClass: String
function elementsByClass(elementClass) {
    return document.getElementsByClassName(elementClass);
}

// Removes the user from whatever room they are currently in
function leaveChat() {
    X0000("X0000");
}

// Closes whatever popup box is currently on the screen, if there is one.
function closePopup() {
    X0000();
}

// Posts a message to chat. All basic bold, italic, and strikethrough tags will be replaced with Chatzy ones
// message: String
function postMessage(message) {
    var HTMLTags = ["<b>", "</b>", "<i>", "</i>", "<s>", "</s>", "<u>", "</u>"];
    var ChatzyTags = ["[b]", "[/b]", "[i]", "[/i]", "[s]", "[/s]", "[u]", "[/u]"];
    for (var tag in HTMLTags) {
        if (HTMLTags.hasOwnProperty(tag)) {
            message = message.replace(HTMLTags[tag],ChatzyTags[tag]);
        }
    }
    X0000(message);
}

// Sets the user's current status, remembered if perm is true.
// status: String; perm: Boolean
function setStatus(status, perm) {
    postMessage("/status" + (perm ? "+ " : " ") + status);
    var p = new Promise(function(resolve, reject) {
        var iterations = 0;
        var vis = setInterval(function() {
            console.log(iterations);
            if (iterations <= 10 && window[popup].firstChild.innerText == "Your status was updated") {
                clearInterval(vis);
                resolve();
            } else if (iterations >= 10) {
                clearInterval(vis);
                reject();
            }
            iterations++;
        }, 1000);
    });
    p.then(function(){closePopup();});
}

// Closes the room, if user has permission
function closeChat() {
    postMessage("/close");
}

// Opens the room, if user has permission
function openChat() {
    postMessage("/open");
}

// Toggles whether the room is currently oppened or closed.
function toggleChatLock() {
    if(X0000.X0000) { //Variable for whether the chat is locked, of course.
        postMessage("/open");
    } else {
        postMessage("/close");
    }
}

// Uses Chatzy's search function to locate messages containing the specified term, or made by the specified poster.
// term: String; poster: String; caseSensitive: Boolean; wholeWord: Boolean
function searchMessages(term, poster, caseSensitive, wholeWord) {
    postMessage("/find " + (wholeWord ? "{W:1}" : "") +
                         (caseSensitive ? "{C:1}" : "") +
                         (poster ? "{V:" + poster + "} " : "") +
                         (term ? term : ""));
}

// Sends a private message to the specified user, if they are a premium user or in a premium room.
// name: String; message: String
function privateMessage(name, message) {
    postMessage("/pm \"" + name + "\" " + message);
}

// Kicks a given user from the room.
// user: String
function kickUser(user) {
    postMessage("/kick \"" + user + "\"");
}

// Kicks multiple users from the room in quick succession
// users: Array of Strings
function kickUsers(users) {
    for (var i in users) {
        if (users.hasOwnProperty(i)) {
            kickUser(users[i]);
        }
    }
}

// Bans a given user from the room.
// user: String
function banUser(user) {
    postMessage("/ban \"" + user + "\"");
}

// Bans multiple users from the room in quick succession
// users: Array of Strings
function banUsers(users) {
    for (var i in users) {
        if (users.hasOwnProperty(i)) {
            banUser(users[i]);
        }
    }
}

// Sends a private message to all online users
// message: String
function globalMessage(message) {
    var users = X0000.split("\n");
    for (var i = 1; i <= users[0]; i++) {
        var user = users[i].split("\t");
        privateMessage(user[0], message);   //Replace the 0 with other numbers to grab different values. 2 is last leave/exit, 4 is status, 5 is location.
    }
}

// Alters the room board in a specified way.
// Method is the style of editing to use. Options are: 0/default, overwrite. 1, append. 2, prepend. 3, replace.
// message: String; method: Int; key: Char
function editRoomBoard(message, method, key) {
    postMessage("/rb");
    setTimeout(function() {
        var BoardMessage = elementByID("X0000");
        switch (method) {
            case 1:
                BoardMessage.value = BoardMessage.value + "\n" + message;
                break;
            case 2:
                BoardMessage.value = message + "\n" + BoardMessage.value;
                break;
            case 3:
                if (BoardMessage.value.match(new RegExp(key, "g")).length > 1) {
                    BoardMessage.value = BoardMessage.value.replace(new RegExp(key + ".+?" + key, "g"), key + message + key);
                }
                break;
            default:
                BoardMessage.value = message;
        }
        X0000.onclick();
    }, 150);
}

// Changes current user's name. Currently causes page reload, possibly fixable?
// name: String
function changeName(name) {
   X0000('X0000');

    setTimeout(function() {
        X9082.value = name;
        X1570.onsubmit();
    }, 1000);
}

// Given a tab element and a certain class, it will either add or remove the class.
// elIn: Element; classIn: String; addClass: Boolean
function highlightTab(elIn, classIn, addClass) {
    var hasClass = new RegExp("\\b" + classIn + "\\b");
    if (!addClass != !elIn.className.match(hasClass)) { //This is a XOR. Combined with the below if, it means that this is checking whether we are adding or removing a class, and if that is necessary.
        if (addClass) {
            elIn.className += (elIn.className ? " " : "") + classIn;
        } else {
            elIn.className = elIn.className.replace(hasClass, "").replace(/^\s/, "").replace(/\s$/, "");
        }
    }
}

// Returns the text sufficient to generate a Chatzy menu tab.
// picName: String; clickFunc: String; displayText: String; isChecked: Boolean; isLocked: Boolean
function generateTab(picName, clickFunc, displayText, isChecked, isLocked) {
    return '<A href="#" onClick="' + clickFunc + 'return false;"' + (isLocked ? ' class="X6820"' : "") + '>' + (isChecked ? "<SPAN style='float:right;margin:0 4px 0 0;'>&nbsp;&#10003;</SPAN>" : "") + (picName ? '<IMG src="/elements/icon17/' + picName + '.png">' : "") + displayText + '</A>';
}

// Returns a promise for certain visitor data from the visitor list.
// rows are named "Alias", "Last", "Loc", "UIP", "UID", "Status", "Perms"
// columns: List of Strings
function getVisitorData(columns) {
    return new Promise(function(resolve, reject) {
        X2822.onclick();
        var iterations = 0;
        var vis = setInterval(function() {
            iterations++;
            if (window[visitorTable]) {
                clearInterval(vis);
                var table = window[visitorTable].firstChild.children;
                closePopup();
                var visitorData = [];
                for (var i=1; i < table.length-1; i++) {
                    var visitor = [];
                    for (var j in columns) {
                        if (!columns.hasOwnProperty(j)) {
                            continue;
                        }
                        var option = columns[j];
                        switch (option) {
                            case "Alias":
                                visitor.push(table[i].firstChild.lastChild.innerText);
                                break;
                            case "Last":
                                visitor.push(table[i].children[1].innerText);
                                break;
                            case "Loc":
                                visitor.push(table[i].children[2].innerText);
                                break;
                            case "UIP":
                                visitor.push(table[i].children[3].innerText);
                                break;
                            case "UID":
                                visitor.push(table[i].children[4].innerText);
                                break;
                            case "Status":
                                visitor.push(table[i].children[5].firstChild.title);
                                break;
                            case "Perms":
                                var image = table[i].children[6].firstChild.firstChild.src;
                                var perm = "";
                                if (image.match("P.png")) {
                                    perm = "Moderator";
                                } else if (image.match("A.png")) {
                                    perm = "Regular";
                                } else if (image.match("S.png")) {
                                    perm = "Silenced";
                                } else if (image.match("0.png")) {
                                    perm = "Unknown";
                                } else if (image.match("K.png")) {
                                    perm = "Kicked";
                                } else if (image.match("D.png")) {
                                    perm = "Banned";
                                } else if (image.match("B.png")) {
                                    perm = "Blocked";
                                }
                                visitor.push(perm);
                        }
                    }
                    visitorData.push(visitor);
                }
                resolve(visitorData);
            } else if (iterations > 30) {
                clearInterval(vis);
                reject([]);
            }
        }, 1000);
    });
}
