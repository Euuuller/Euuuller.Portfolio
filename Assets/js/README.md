# JavaScript Modular Structure

This project uses a modular JavaScript architecture to organize functionality by responsibility and purpose. Below is the breakdown of the structure:

## Directory Structure

```
Assets/
└── js/
    ├── modules/
    │   ├── canvas-animation.js
    │   ├── theme-manager.js
    │   ├── navbar.js
    │   ├── typing-effect.js
    │   ├── project-carousel.js
    │   ├── smooth-scroll.js
    │   ├── scroll-reveal.js
    │   ├── mobile-menu.js
    │   └── project-modal.js
    ├── utils/
    │   ├── dom-utils.js
    │   ├── event-utils.js
    │   └── helpers.js
    ├── components/
    │   ├── button-component.js
    │   ├── modal-component.js
    │   └── input-component.js
    └── app.js (main application file)
```

## File Descriptions

### Modules
- **canvas-animation.js**: Handles the mathematical symbols animation in the background
- **theme-manager.js**: Manages dark/light theme switching functionality
- **navbar.js**: Handles navbar scroll effects
- **typing-effect.js**: Manages the animated typing effect in the hero section
- **project-carousel.js**: Controls the project carousel functionality
- **smooth-scroll.js**: Handles smooth scrolling for anchor links
- **scroll-reveal.js**: Manages the reveal animation on scroll
- **mobile-menu.js**: Handles the mobile menu functionality
- **project-modal.js**: Controls the project detail modal functionality

### Utilities
- **dom-utils.js**: Common DOM manipulation functions
- **event-utils.js**: Common event handling functions
- **helpers.js**: General utility functions

### Components
- **button-component.js**: Reusable button component with various styles and behaviors
- **modal-component.js**: Reusable modal component with various configurations
- **input-component.js**: Reusable input component with validation and styling

### Main Application File
- **app.js**: Imports and initializes all modules, utilities, and components; serves as the main application entry point

## Benefits of This Structure

1. **Maintainability**: Each functionality has its own dedicated module
2. **Scalability**: Easy to add new modules without affecting others
3. **Readability**: Clear separation of concerns makes code easier to understand
4. **Reusability**: Modules, utilities, and components can be reused across different projects
5. **Testability**: Individual modules can be tested separately
6. **Team Collaboration**: Multiple developers can work on different modules simultaneously
7. **Consistency**: Standardized component patterns across the application
8. **Performance**: Better tree-shaking and code splitting possibilities

## Usage

The application automatically initializes all modules when the DOM is loaded. You can access individual modules through the global `portfolioApp` object:

```javascript
// Access any module after the app is initialized
document.addEventListener('DOMContentLoaded', () => {
  // Example: Toggle theme
  portfolioApp.toggleTheme();
  
  // Example: Open mobile menu
  portfolioApp.openMobileMenu();
  
  // Example: Access a specific module directly
  const themeManager = portfolioApp.getModule('themeManager');
  
  // Example: Access utilities
  const element = portfolioApp.utils.DOMUtils.getElementById('myElement');
  
  // Example: Create a component
  const button = new portfolioApp.components.ButtonComponent('#myButton', {
    variant: 'primary',
    onClick: () => console.log('Button clicked!')
  });
});
```

Or use ES6 modules directly:

```javascript
import { ThemeManager } from './js/modules/theme-manager.js';
import { DOMUtils } from './js/utils/dom-utils.js';
import { ButtonComponent } from './js/components/button-component.js';

const themeManager = new ThemeManager();
const element = DOMUtils.getElementById('myElement');
const button = new ButtonComponent('#myButton');
```

## Module API

Each module exposes its own API for customization:

### CanvasAnimation
- `new CanvasAnimation(canvasId)`: Initialize with custom canvas ID
- `destroy()`: Cleanup animation resources

### ThemeManager
- `toggleTheme()`: Switch between light/dark themes
- `setTheme(theme)`: Set specific theme ('light' or 'dark')
- `getCurrentTheme()`: Get current theme

### ProjectCarousel
- `goTo(index)`: Navigate to specific slide
- `next()`: Go to next slide
- `prev()`: Go to previous slide
- `getCurrentIndex()`: Get current slide index

### MobileMenu
- `open()`: Open the mobile menu
- `close()`: Close the mobile menu
- `toggle()`: Toggle the mobile menu state
- `isOpen()`: Check if menu is open

### ProjectModal
- `open(index)`: Open modal for specific project
- `close()`: Close the modal
- `isOpen()`: Check if modal is open

## Utility Functions

### DOMUtils
- `getElementById(id)`: Get element by ID
- `querySelector(selector)`: Query single element
- `addClass(element, className)`: Add class to element
- `removeClass(element, className)`: Remove class from element
- `toggleClass(element, className)`: Toggle class on element

### EventUtils
- `addListener(target, eventType, handler, options)`: Add event listener
- `debounce(func, wait, immediate)`: Create debounced function
- `throttle(func, limit)`: Create throttled function
- `dispatchCustomEvent(name, detail)`: Dispatch custom event

### Helpers
- `isString(value)`: Check if value is string
- `isNumber(value)`: Check if value is number
- `isArray(value)`: Check if value is array
- `isObject(value)`: Check if value is object
- `deepClone(obj)`: Deep clone an object
- `formatDate(date, format)`: Format date to string

## Component Classes

### ButtonComponent
- `new ButtonComponent(element, options)`: Create button component
- `setVariant(variant)`: Change button variant
- `setSize(size)`: Change button size
- `setDisabledState(disabled)`: Enable/disable button
- `static create(options)`: Create new button element

### ModalComponent
- `new ModalComponent(element, options)`: Create modal component
- `open()`: Open modal
- `close()`: Close modal
- `setContent(content)`: Set modal content
- `setTitle(title)`: Set modal title
- `static create(options)`: Create new modal element

### InputComponent
- `new InputComponent(element, options)`: Create input component
- `validate()`: Validate input value
- `setValue(value)`: Set input value
- `getValue()`: Get input value
- `setError(message)`: Set error message
- `static create(type, options)`: Create new input element