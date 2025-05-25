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

// Call the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', includeFooter); 