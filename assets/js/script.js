document.addEventListener("DOMContentLoaded", function () {
    loadHTMLContent("#header-container", "Common_html/header.html", function () {
        loadHTMLContent("#sidebar-container", "Common_html/side_menu.html", function () {
            // Step 3: Ensure layout is recalculated before loading main.js
            finalizeInitialization();
        });
    });
});

function loadHTMLContent(selector, filePath, callback) {
    const element = document.querySelector(selector);
    if (element) {
        fetch(filePath)
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error(`Error: ${response.status}`);
                }
            })
            .then(data => {
                element.innerHTML = data;

                // Execute callback function once the content is loaded
                if (typeof callback === 'function') {
                    callback();
                }
            })
            .catch(error => console.error('Error loading the file:', error));
    }
}

function finalizeInitialization() {
    // Adding a small delay to let CSS properly render before adding JavaScript functionalities
    setTimeout(function () {
        console.log("Header and Sidebar have been loaded, now loading main.js");

        // Load main.js after a delay to allow CSS to apply smoothly
        const script = document.createElement('script');
        script.src = "assets/js/main.js";
        document.body.appendChild(script);

        // Trigger a resize event to help browser recalculate layout smoothly
        window.dispatchEvent(new Event('resize'));
    }, 300);  // Increased delay to 300ms to let rendering settle
}
