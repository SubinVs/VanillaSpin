# VanillaSpin

VanillaSpin is a lightweight, dependency-free JavaScript library for adding global and container-based loaders to web applications. It supports automatic AJAX detection, custom loader elements, and page-specific exclusions.

## Features
✅ Show a global loading spinner  
✅ Attach a loader to a specific container  
✅ Supports custom loader elements  
✅ Auto-detects AJAX requests  
✅ Exclude specific pages from showing the loader  
✅ Exclude specific AJAX requests from showing the loader  
✅ Works with both Vanilla JS and jQuery $.ajax  

## Installation

### Using CDN
Include the script in your HTML file:
```html
<script src="https://cdn.jsdelivr.net/gh/SubinVs/VanillaSpin/vanillaSpin.js"></script>
```

### Manual Installation
Download `vanillaSpin.js` and include it in your project:
```html
<script src="vanillaSpin.js"></script>
```

## Usage

### Default Initialization
To use VanillaSpin with default settings:
```javascript
const loader = new VanillaSpinLoader();
loader.init();
```

### Custom Initialization
For more control over the loader settings:
```javascript
const customLoader = new VanillaSpinLoader({
    color: "#3498db", // Loader color
    size: "50px", // Loader size
    background: "rgba(255, 255, 255, 0.8)", // Background overlay
    fadeIn: true, // Enable fade-in effect
    detectAjax: true, // Auto-detect AJAX requests
    container: document.body, // Default container
    customLoader: null, // Custom loader element
    excludePages: ["/no-loader.html"], // Pages where loader should not appear
    excludeAjaxUrls: ["/api/no-loader"] // AJAX calls that should not trigger the loader
});
customLoader.init();
```

### Show & Hide Loader
```javascript
loader.show();
setTimeout(() => loader.hide(), 3000);
```

### Attach Loader to a Specific Container
```javascript
const containerLoader = new VanillaSpinLoader({
    container: document.getElementById("myDiv")
});
containerLoader.init();
containerLoader.show();
```

### Using jQuery AJAX with Loader
By default, VanillaSpin detects AJAX calls and displays the loader. To exclude a specific request:
```javascript
$.ajax({
    url: "/api/no-loader",
    excludeLoader: true // Prevents loader from showing for this request
});
```

## Custom Options
| Option           | Type      | Default Value                        | Description |
|-----------------|----------|--------------------------------|-------------|
| `color`        | String   | `"#3498db"`                   | Loader color |
| `size`         | String   | `"50px"`                      | Size of the loader |
| `background`   | String   | `"rgba(255, 255, 255, 0.8)"`  | Background overlay color |
| `fadeIn`       | Boolean  | `true`                         | Enable fade-in effect |
| `detectAjax`   | Boolean  | `true`                         | Auto-detect AJAX requests |
| `container`    | Element  | `document.body`                | Container where loader appears |
| `customLoader` | Element  | `null`                         | Custom loader element |
| `excludePages` | Array    | `[]`                           | List of pages where loader should not appear |
| `excludeAjaxUrls` | Array | `[]`                           | List of AJAX requests to exclude |

## License
This project is licensed under the MIT License. Feel free to use and contribute!

