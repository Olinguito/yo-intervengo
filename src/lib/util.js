// Set of utility functions to use in the project


export function addStyleToTemplate(template, style = '') {
    if (template.content) {
        let styleSheet = document.createElement('style');
        styleSheet.appendChild(document.createTextNode(style));
        template.content.appendChild(styleSheet);
    }
}

