/**
 * This triggers the linkRelCustomelementPatch() function ONCE on window.onload
 * and does NOT watch for any additional <link> elements. ~~To trigger this again,
 * you can call the __linkRelCustomElementPatch() function (optionally with args).~~
 */

import linkRelCustomelementPatch from "./-.js"

// If the document is already loaded, run main() immediately
if (document.readyState !== "loading") {
	linkRelCustomelementPatch()
}
// Otherwise, wait for the DOMContentLoaded event before doing so
else {
	document.addEventListener(
		"DOMContentLoaded",
		() => void linkRelCustomelementPatch(),
		{
			passive: true,
			once: true,
		},
	)
}
