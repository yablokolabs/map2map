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
    
    // Load Apollo Analytics
    const apolloScript = document.createElement('script');
    apolloScript.text = `
        function initApollo(){
            var n=Math.random().toString(36).substring(7),o=document.createElement("script");
            o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
            o.onload=function(){window.trackingFunctions.onLoad({appId:"6855cd9864a89f0015143a0c"})},
            document.head.appendChild(o)
        }
        initApollo();
    `;
    document.head.appendChild(apolloScript);
}

// Call the functions when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    includeFooter();
    loadAnalytics();
});