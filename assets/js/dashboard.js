// Dashboard specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set up View Analytics button
    const showGbpDataBtn = document.getElementById('showGbpData');
    const refreshDataBtn = document.getElementById('refreshData');
    const gbpModal = new bootstrap.Modal(document.getElementById('gbpDataModal'));
    
    function displayGbpData() {
        const locationSelect = document.getElementById('testLocation');
        const locationName = locationSelect ? locationSelect.value : 'Your Business';
        const mockData = generateMockGbpData(locationName);
        
        // Update modal title and basic info
        document.getElementById('gbpDataModalLabel').textContent = mockData.title;
        document.getElementById('businessDescription').textContent = mockData.description;
        document.getElementById('businessPhone').textContent = mockData.phone;
        document.getElementById('businessAddress').textContent = mockData.address;
        
        // Format and display hours
        const hoursContainer = document.getElementById('businessHours');
        hoursContainer.innerHTML = ''; // Clear existing content
        
        // Parse the hours string into a more structured format
        const hoursHtml = formatBusinessHours(mockData.hours);
        hoursContainer.innerHTML = hoursHtml;
        
        // Update reviews
        const reviewsList = document.getElementById('businessReviews');
        reviewsList.innerHTML = ''; // Clear existing reviews
        
        if (mockData.reviews && mockData.reviews.length > 0) {
            mockData.reviews.forEach((review, index) => {
                const reviewId = `review-${index}`;
                const replyId = `reply-${index}`;
                
                const li = document.createElement('li');
                li.className = 'mb-4 p-3 border rounded';
                li.id = reviewId;
                
                // Review content
                const reviewContent = document.createElement('div');
                reviewContent.className = 'd-flex justify-content-between align-items-start mb-2';
                reviewContent.innerHTML = `
                    <div class="me-3 flex-grow-1">
                        <div class="d-flex align-items-center">
                            <span class="text-warning me-2">⭐</span>
                            <span>${review}</span>
                        </div>
                    </div>
                    <button class="btn btn-sm btn-outline-primary reply-btn" data-review-id="${reviewId}">
                        <i class="fas fa-reply me-1"></i>Reply
                    </button>
                `;
                
                // Reply form (initially hidden)
                const replyForm = document.createElement('div');
                replyForm.className = 'reply-form mt-2';
                replyForm.id = replyId;
                replyForm.style.display = 'none';
                replyForm.innerHTML = `
                    <div class="input-group mb-2">
                        <textarea class="form-control" rows="2" placeholder="Write your reply..."></textarea>
                        <button class="btn btn-primary send-reply" type="button">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                `;
                
                // Reply display area
                const replyDisplay = document.createElement('div');
                replyDisplay.className = 'reply-display mt-2 p-2 bg-light rounded';
                replyDisplay.style.display = 'none';
                
                li.appendChild(reviewContent);
                li.appendChild(replyForm);
                li.appendChild(replyDisplay);
                reviewsList.appendChild(li);
            });
            
            // Add event listeners for reply buttons
            document.querySelectorAll('.reply-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const reviewId = this.getAttribute('data-review-id');
                    const reviewItem = document.getElementById(reviewId);
                    const replyForm = reviewItem.querySelector('.reply-form');
                    const replyDisplay = reviewItem.querySelector('.reply-display');
                    
                    // Toggle reply form
                    if (replyForm.style.display === 'none') {
                        replyForm.style.display = 'block';
                        replyForm.querySelector('textarea').focus();
                        this.innerHTML = '<i class="fas fa-times me-1"></i>Cancel';
                    } else {
                        replyForm.style.display = 'none';
                        this.innerHTML = '<i class="fas fa-reply me-1"></i>Reply';
                    }
                });
            });
            
            // Add event listeners for send reply buttons
            document.querySelectorAll('.send-reply').forEach(btn => {
                btn.addEventListener('click', function() {
                    const replyForm = this.closest('.reply-form');
                    const textarea = replyForm.querySelector('textarea');
                    const replyText = textarea.value.trim();
                    
                    if (replyText) {
                        const reviewItem = replyForm.closest('li');
                        const replyDisplay = reviewItem.querySelector('.reply-display');
                        const replyBtn = reviewItem.querySelector('.reply-btn');
                        
                        // Display the reply
                        replyDisplay.innerHTML = `
                            <div class="d-flex align-items-center mb-1">
                                <span class="text-primary me-2">👤 Your Reply</span>
                                <small class="text-muted">Just now</small>
                            </div>
                            <p class="mb-0">${replyText}</p>
                        `;
                        replyDisplay.style.display = 'block';
                        
                        // Reset form
                        textarea.value = '';
                        replyForm.style.display = 'none';
                        replyBtn.innerHTML = '<i class="fas fa-reply me-1"></i>Reply';
                    }
                });
            });
        } else {
            const li = document.createElement('li');
            li.className = 'text-muted';
            li.textContent = 'No reviews available.';
            reviewsList.appendChild(li);
        }
        
        // Show the modal
        gbpModal.show();
    }
    
    // Set up event listeners
    if (showGbpDataBtn) {
        showGbpDataBtn.addEventListener('click', displayGbpData);
    }
    
    if (refreshDataBtn) {
        refreshDataBtn.addEventListener('click', displayGbpData);
    }
    
    // Update data when location changes
    const locationSelect = document.getElementById('testLocation');
    if (locationSelect) {
        locationSelect.addEventListener('change', displayGbpData);
    }
    
    // Check if user is authenticated
    const token = localStorage.getItem('jwt_token');
    const dashboardContent = document.querySelector('.dashboard-container');
    const loginWindow = document.querySelector('.login-window');
    
    if (!token) {
        // Show login window if not authenticated
        if (dashboardContent) dashboardContent.style.display = 'none';
        if (loginWindow) loginWindow.style.display = 'flex';
        
        // Initialize Google Auth
        if (typeof initializeGoogleAuth === 'function') {
            initializeGoogleAuth();
        }
        return;
    }
    
    // Verify token with backend
    verifyToken(token).then(isValid => {
        if (!isValid) {
            // Clear invalid token
            localStorage.clear();
            if (dashboardContent) dashboardContent.style.display = 'none';
            if (loginWindow) loginWindow.style.display = 'flex';
            if (typeof initializeGoogleAuth === 'function') {
                initializeGoogleAuth();
            }
            return;
        }
        
        // User is authenticated, show dashboard content
        if (dashboardContent) dashboardContent.style.display = 'block';
        if (loginWindow) loginWindow.style.display = 'none';
        
        // Update user info from localStorage
        const userName = localStorage.getItem('user_name') || 'User';
        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.textContent = userName;
        }
        
        // Update user picture if available
        const userPicture = localStorage.getItem('user_picture');
        const userPictureElement = document.getElementById('userPicture');
        if (userPictureElement && userPicture) {
            userPictureElement.src = userPicture;
        }
    });
    
    // Handle logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async function(e) {
            e.preventDefault();
            try {
                const response = await fetch('https://platform-krns.onrender.com/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (response.ok) {
                    // Clear user data
                    localStorage.clear();
                    // Reload to show login form
                    window.location.reload();
                } else {
                    throw new Error('Logout failed');
                }
            } catch (error) {
                console.error('Logout error:', error);
                // Still clear local data and reload
                localStorage.clear();
                window.location.reload();
            }
        });
    }
});

// Verify token with backend
async function verifyToken(token) {
    try {
        const response = await fetch('https://platform-krns.onrender.com/auth/check', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.ok;
    } catch (error) {
        console.error('Token verification failed:', error);
        return false;
    }
}

// Format business hours into a nice table
function formatBusinessHours(hoursString) {
    if (!hoursString) return '<p>No hours available</p>';
    
    // Try to parse the hours string into individual days and times
    const hoursArray = hoursString.split(',').map(h => h.trim());
    let hoursByDay = {};
    
    // Group by day of week
    hoursArray.forEach(entry => {
        const dayMatch = entry.match(/(Mon|Tue|Wed|Thu|Fri|Sat|Sun)[^:]*/);
        if (dayMatch) {
            const day = dayMatch[0].trim();
            const timeMatch = entry.match(/(\d{1,2}:?\d{0,2}\s*[AP]M)\s*-\s*(\d{1,2}:?\d{0,2}\s*[AP]M)/i);
            if (timeMatch) {
                const [_, open, close] = timeMatch;
                hoursByDay[day] = `${open.trim()} - ${close.trim()}`;
            }
        }
    });
    
    // If we couldn't parse the hours, just return the original string
    if (Object.keys(hoursByDay).length === 0) {
        return `<p>${hoursString}</p>`;
    }
    
    // Mock timings for closed days (based on business type)
    const mockTimings = {
        'Mon': '9:00 AM - 6:00 PM',
        'Tue': '9:00 AM - 6:00 PM',
        'Wed': '9:00 AM - 6:00 PM',
        'Thu': '9:00 AM - 6:00 PM',
        'Fri': '9:00 AM - 6:00 PM',
        'Sat': '10:00 AM - 4:00 PM',
        'Sun': 'Closed'
    };
    
    // Create a nice table
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let html = `
        <div class="table-responsive">
            <table class="table table-sm table-borderless">
                <tbody>
    `;
    
    days.forEach(day => {
        const hours = hoursByDay[day] || mockTimings[day];
        const isMock = !hoursByDay[day];
        
        html += `
            <tr>
                <th class="text-nowrap" style="width: 30%;">${day}</th>
                <td class="${isMock ? 'text-muted' : ''}">${hours}</td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    return html;
}

// Mock GBP data generator
function generateMockGbpData(locationName = 'Your Business') {
    // Define mock business data based on locationName
    const mockBusinessData = {
        'Downtown Coffee Shop': {
            title: 'Downtown Coffee Shop',
            description: 'Cozy coffee shop in the heart of downtown offering a variety of coffee, tea, and pastries.',
            phone: '(123) 456-7890',
            address: '123 Main St, Anytown, CA 91234',
            hours: 'Mon-Fri: 7:00 AM - 6:00 PM, Sat-Sun: 8:00 AM - 5:00 PM',
            reviews: [
                'Great coffee and friendly staff!',
                'Nice atmosphere and good place to work.',
                'Love their pastries!'
            ]
        },
        'Sunnyvale Clinic': {
            title: 'Sunnyvale Clinic',
            description: 'Your local healthcare provider offering a range of medical services.',
            phone: '(987) 654-3210',
            address: '456 Oak Ave, Sunnyvale, CA 94086',
            hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
            reviews: [
                'Professional and caring doctors.',
                'Clean and well-organized clinic.',
                'Easy to make an appointment.'
            ]
        },
        'City Bookstore': {
            title: 'City Bookstore',
            description: 'Independent bookstore with a wide selection of new and used books.',
            phone: '(555) 123-4567',
            address: '789 Pine Ln, Anytown, CA 91234',
            hours: 'Mon-Sat: 10:00 AM - 7:00 PM, Sun: 12:00 PM - 5:00 PM',
            reviews: [
                'A reader\'s paradise!', // Escaped apostrophe
                'Friendly and knowledgeable staff.',
                'Great selection of books.'
            ]
        },
        'Greenwood Restaurant': {
            title: 'Greenwood Restaurant',
            description: 'Serving delicious meals in a relaxed setting.',
            phone: '(222) 333-4444',
            address: '101 Maple Dr, Greenwood, CA 91234',
            hours: 'Mon-Sun: 11:00 AM - 9:00 PM',
            reviews: [
                'Excellent food and service.',
                'Nice ambiance.',
                'Highly recommended!'
            ]
        },
        'Tech Hub Workspace': {
            title: 'Tech Hub Workspace',
            description: 'Modern coworking space for startups and professionals.',
            phone: '(777) 888-9999',
            address: '505D Elm St, Anytown, CA 91234',
            hours: 'Mon-Fri: 9:00 AM - 6:00 PM',
            reviews: [
                'Great facilities and community.',
                'Productive environment.',
                'Convenient location.'
            ]
        }
    };

    // Return the mock data for the selected location, or default if not found
    return mockBusinessData[locationName] || {
        title: locationName,
        description: 'No description available.',
        phone: 'N/A',
        address: 'N/A',
        hours: 'N/A',
        reviews: []
    };
}

// Initialize GBP data modal
function initializeGbpDataModal() {
    const showGbpDataBtn = document.getElementById('showGbpData');
    const refreshDataBtn = document.getElementById('refreshData');
    const modal = new bootstrap.Modal(document.getElementById('gbpDataModal'));
    const modalTitle = document.getElementById('gbpDataModalLabel');
    
    function updateGbpData() {
        // 1. Read selected test location
        const locationSelect = document.getElementById('testLocation');
        const locationName = locationSelect.value;  // e.g. "Downtown Coffee Shop" 

        // 2. Generate mock data for that location
        const data = generateMockGbpData(locationName);

        // 3. Update modal title dynamically
        modalTitle.textContent = `${data.title} - Business Profile`;  // dynamic title update 

        // 4. Populate business information fields
        document.getElementById('businessTitle').textContent = data.title;
        document.getElementById('businessDescription').textContent = data.description;
        document.getElementById('businessPhone').textContent = data.phone;
        document.getElementById('businessAddress').textContent = data.address;
        document.getElementById('businessHours').textContent = data.hours;

        // Populate reviews
        const reviewsList = document.getElementById('businessReviews');
        reviewsList.innerHTML = ''; // Clear existing reviews
        if (data.reviews && data.reviews.length > 0) {
            data.reviews.forEach(review => {
                const li = document.createElement('li');
                li.textContent = `- ${review}`;
                reviewsList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = 'No reviews available.';
            reviewsList.appendChild(li);
        }
    }
    
    // Show modal and load data
    if (showGbpDataBtn) {
        showGbpDataBtn.addEventListener('click', () => {
            updateGbpData();
            modal.show();
        });
    }
    
    // Refresh data
    if (refreshDataBtn) {
        refreshDataBtn.addEventListener('click', updateGbpData);
    }
    
    // Disable auto-refresh for static business info
    // updateInterval = setInterval(updateGbpData, 30000);

    // Disable clearing interval as auto-refresh is commented out
    // clearInterval(updateInterval);

    // Update data when the location selection changes
    const locationSelect = document.getElementById('testLocation');
    if (locationSelect) {
        locationSelect.addEventListener('change', updateGbpData);
    }
}

