// Function to include the footer
function includeFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading footer:', error);
            // Fallback content in case of error
            document.getElementById('footer-placeholder').innerHTML = `
                <footer>
                    <div class="container">
                        <div class="col-lg-12">
                            <p>&copy; 2025 <a href="https://yablokolabs.com" target="_blank" rel="noopener">Yabloko Labs Pvt. Ltd</a>. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            `;
        });
}

// Function to load analytics scripts
function loadAnalytics() {
    // Load Cloudflare Analytics
    const cfScript = document.createElement('script');
    cfScript.defer = true;
    cfScript.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    cfScript.dataset.cfBeacon = '{"token": "24089763b7a4451ea9e482dc9ff06965"}';
    document.head.appendChild(cfScript);
    
    // Load Ahrefs Analytics
    const ahrefsScript = document.createElement('script');
    ahrefsScript.src = 'https://analytics.ahrefs.com/analytics.js';
    ahrefsScript.dataset.key = 'OKf0ZdUa/hzhaw1hBscJLw';
    ahrefsScript.async = true;
    document.head.appendChild(ahrefsScript);
}

// Call the functions when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    includeFooter();
    loadAnalytics();
});