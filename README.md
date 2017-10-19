# ChatzyAPI
Host to the Chatzy Wrapper functions, and any other Chatzy interface stuff.

## Use

This wrapper is mostly designed to be used in conjunction with other scripts, simply providing a base set of abilities to work off of.
To use this on its own, one should simply copy-paste the ChatzyWrappers file into the dev console while in a chatzy room. Once that is done, you should have access to functions such as postMessage.

If one wishes to use this code as part of a larger project, then the project will need to import this file into the HTML DOM, most likely using a script tag. Github does not serve files with the correct MIME headers, so if this is used as part of a larger project the project will likely need to host the file on its own.

To access variables through this API's variable definitions, do `window[variableName]`.

This API is not currently 'standalone', it needs to be run from inside the browser. Possibly in the future however it will be updated to be usable in code outside the browser.