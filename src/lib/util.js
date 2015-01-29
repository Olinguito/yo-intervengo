/**
 * Set of utility functions to use in the project
 */

export function addStyleToShadowElement(element, style) {
    if (element.shadowRoot) {
        let styleSheet = document.createElement('style');
        styleSheet.appendChild(document.createTextNode(style));
        element.shadowRoot.appendChild(styleSheet);
    }
}
