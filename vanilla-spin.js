/**
 * VanillaSpin Library (Vanilla JS)
 * Author: Subin
 * Description: VanillaSpin is a lightweight, dependency-free JavaScript library for displaying global and container-based loaders in web applications.
 * 
 * Features:
 * - Show a global loading spinner
 * - Attach a loader to a specific container
 * - Supports custom loader elements
 * - Optional fade-in effect
 * - Auto-detects AJAX requests to show/hide the loader
 */

class VanillaSpinLoader {
    constructor(options = {}) {
        this.options = Object.assign({
            color: "#3498db", // Default loader color
            size: "50px", // Default size
            background: "rgba(255, 255, 255, 0.8)", // Background overlay
            fadeIn: true, // Enable fade-in effect
            detectAjax: true, // Auto-detect AJAX requests
            container: document.body, // Default container
            customLoader: null // Custom loader element
        }, options);
        this.loader = null;
    }

    init() {
        if (!this.loader) {
            this.createLoader();
        }
        if (this.options.detectAjax) {
            this.setupAjaxInterceptor();
        }
        window.vanillaSpin = this; // Set global reference
    }

    createLoader() {
        if (this.options.customLoader) {
            this.loader = this.options.customLoader;
            this.loader.style.display = "none";
            if (!this.options.container.contains(this.loader)) {
                this.options.container.appendChild(this.loader);
            }
        } else {
            this.loader = document.createElement("div");
            this.loader.className = "vanilla-spin-loader";
            this.loader.style.position = this.options.container === document.body ? "fixed" : "absolute";
            this.loader.style.top = "0";
            this.loader.style.left = "0";
            this.loader.style.width = "100%";
            this.loader.style.height = "100%";
            this.loader.style.background = this.options.background;
            this.loader.style.display = "none";
            this.loader.style.justifyContent = "center";
            this.loader.style.alignItems = "center";
            this.loader.style.zIndex = "9999";
            this.loader.style.opacity = "0";
            this.loader.style.transition = this.options.fadeIn ? "opacity 0.5s ease-in-out" : "none";

            const spinner = document.createElement("div");
            spinner.style.width = this.options.size;
            spinner.style.height = this.options.size;
            spinner.style.border = `5px solid ${this.options.color}`;
            spinner.style.borderTop = "5px solid transparent";
            spinner.style.borderRadius = "50%";
            spinner.style.animation = "spin 1s linear infinite";

            this.loader.appendChild(spinner);
            this.options.container.appendChild(this.loader);

            // Add CSS animation
            const style = document.createElement("style");
            style.innerHTML = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    show() {
        if (!this.loader) {
            this.createLoader();
        }
        this.loader.style.display = "flex";
        requestAnimationFrame(() => {
            this.loader.style.opacity = "1";
        });
    }

    hide() {
        if (this.loader) {
            this.loader.style.opacity = "0";
            setTimeout(() => {
                this.loader.style.display = "none";
            }, this.options.fadeIn ? 500 : 0);
        }
    }

    setupAjaxInterceptor() {
        const originalOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function() {
            this.addEventListener("loadstart", () => window.vanillaSpin?.show());
            this.addEventListener("loadend", () => window.vanillaSpin?.hide());
            originalOpen.apply(this, arguments);
        };
    }
}

// // Test Example
// window.onload = function() {
//     // Global Loader
//     const globalLoader = new VanillaSpinLoader();
//     globalLoader.init();

//     document.getElementById("showGlobalLoader").addEventListener("click", () => globalLoader.show());
//     document.getElementById("hideGlobalLoader").addEventListener("click", () => globalLoader.hide());

//     // Container-Based Loader
//     const container = document.getElementById("container");
//     const containerLoader = new VanillaSpinLoader({ container });
//     containerLoader.init();

//     document.getElementById("showContainerLoader").addEventListener("click", () => containerLoader.show());
//     document.getElementById("hideContainerLoader").addEventListener("click", () => containerLoader.hide());

//     // Custom Loader Example
//     const customLoaderElement = document.createElement("div");
//     customLoaderElement.className = "custom-loader";
//     customLoaderElement.innerText = "⏳";
//     customLoaderElement.style.width = "60px";
//     customLoaderElement.style.height = "60px";
//     customLoaderElement.style.display = "flex";
//     customLoaderElement.style.alignItems = "center";
//     customLoaderElement.style.justifyContent = "center";
//     customLoaderElement.style.fontSize = "20px";
//     customLoaderElement.style.fontWeight = "bold";
//     customLoaderElement.style.color = "white";
//     customLoaderElement.style.background = "red";
//     customLoaderElement.style.borderRadius = "50%";
//     customLoaderElement.style.animation = "pulse 1s infinite alternate";

//     const customLoader = new VanillaSpinLoader({
//         customLoader: customLoaderElement
//     });
//     customLoader.init();

//     document.getElementById("showCustomLoader").addEventListener("click", () => customLoader.show());
//     document.getElementById("hideCustomLoader").addEventListener("click", () => customLoader.hide());
// };
