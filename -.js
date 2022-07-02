/**
 * This function will find all <link rel="customelement" as="card-x" href="https://..."> tags
 * and import them for you! All declaratively!
 */
const linkRelCustomelementPatch = /* async */ (
	document = window.document,
	customElements = window.customElements,
) => {
	// All <link> tags
	const elements = [...document.getElementsByTagName("link")].filter(
		(element) =>
			// Must have rel="customelement"
			element.relList.contains("customelement") &&
			// Must have as="something", but NOT as=""
			// Cannot use .as here, since that doesn't reflect the as="" attribute on
			// the element itself UNLESS it is of a rel="prefetch" or similar
			element.getAttribue("as")?.length > 0,
	)

	// Start a new Promise for each of these and bind them all to this promise. Unsure whether
	// I should await this here, or immediately return all the <link> elements...
	Promise.all(
		elements.map(async (element) => {
			try {
				const { default: CustomElement } = await import(element.href)
				// Expect that a .extends property exists on the class as a static prop
				// if it wants to extend an existing element
				customElements.define(
					element.getAttribute("as"),
					CustomElement,
					CustomElement,
				)
				// Dispatch an onload event to inform any subscribers
				element.dispatchEvent(new Event("load"))
			} catch (error) {
				// Don't stop the whole function, just print an error, same as normal
				// browser-level functions
				console.error(error)
				// Also trigger an onerror event on the original <link> element to
				// inform any listeners
				element.dispatchEvent(
					new ErrorEvent("error", { error, message: error.message }),
				)
			}
		}),
	)

	// Return the elements array since it is what we operated on
	return elements
}

export { linkRelCustomelementPatch as default }
