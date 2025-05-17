// Component loader
class ComponentLoader {
    static async loadComponent(elementId, componentPath) {
        try {
            const response = await fetch(componentPath);
            const html = await response.text();
            document.getElementById(elementId).innerHTML = html;
        } catch (error) {
            console.error(`Error loading component ${componentPath}:`, error);
        }
    }

    static async loadAllComponents() {
        // Load header
        await this.loadComponent('header-component', 'assets/components/header.html');
        
        // Load footer
        await this.loadComponent('footer-component', 'assets/components/footer.html');
        
        // Initialize any components that need it
        this.initializeComponents();
    }

    static initializeComponents() {
        // Initialize hamburger menu
        const hamburger = document.querySelector('.hamburger');
        if (hamburger) {
            hamburger.addEventListener('click', function() {
                document.querySelector('.nav-links').classList.toggle('active');
            });
        }
    }
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    ComponentLoader.loadAllComponents();
}); 