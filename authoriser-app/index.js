document.addEventListener("DOMContentLoaded", function(event) {
    // get our info area for writing messages to the user
    var authStatus = document.getElementById('auth_status');
    authStatus.innerHTML = 'Pre-authorisation Checks';

    // Try and load the auth cookie from the query string
    auth_cookie_value = location.search.split('auth_cookie=')[1];

    if ( typeof auth_cookie_value === 'undefined' ) {
        authStatus.innerHTML = 'Authorisation Failed';
    } else {
        authStatus.innerHTML = 'Authorising';

        // Set a 'permanent' cookie (365 days)
        var date = new Date();
        date.setTime(date.getTime() + (365*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
        document.cookie = "auth=" + auth_cookie_value + expires + "; path=/";

        // Redirect back to the server to auth, strip url param to prevent loops
        location.href = location.href.replace('auth_cookie=' + auth_cookie_value, '')
    }
});