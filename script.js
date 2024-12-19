// We created the core data structure for the user data and the course items. Claude.ai helped us write the code for the order book and the user bets.

// User data

const userData = {
    name: "",
    username: "",
    university: "",
    gradYear: "",
    major: "",
    balance: 0,
    selectedOutcome: null,
};

function updateUserDataUI() {
    // Update username in admin page
    const usernameElement = document.querySelector('#username');
    if (usernameElement) {
        // Ensure username starts with @
        let displayUsername = userData.username;
        if (displayUsername) {
            if (!displayUsername.startsWith('@')) {
                displayUsername = '@' + displayUsername;
            }
            usernameElement.textContent = displayUsername;
        }
    }

    // Update balance in both pages
    const fundsElements = document.querySelectorAll('#funds-amount');
    fundsElements.forEach(element => {
        if (element) {
            const amountElement = element.querySelector('p, h5');
            if (amountElement) {
                amountElement.textContent = `$${userData.balance.toFixed(2)}`;
            }
        }
    });

    // Update university in admin page
    const universityElement = document.querySelector('#uni_title p');
    if (universityElement) {
        universityElement.textContent = userData.university || 'Columbia University';
    }

    // Update graduation year in admin page
    const gradYearElement = document.querySelector('#grad_year .col-7 p');
    if (gradYearElement) {
        gradYearElement.textContent = userData.gradYear || '2026';
    }

    // Update major in admin page
    const majorElement = document.querySelector('#major .col-8 p');
    if (majorElement) {
        majorElement.textContent = userData.major || 'Data Science';
    }

    saveToLocalStorage();
    updateBalanceDisplay();
}

function updateBalanceDisplay() {
    // Get all elements with ID 'funds-amount' across all pages
    const fundsElements = document.querySelectorAll('#funds-amount');
    
    fundsElements.forEach(element => {
        if (element) {
            // Load latest data from localStorage
            loadFromLocalStorage();
            
            // Check if we're in admin.html (has h5) or index.html (has p)
            const isAdminPage = window.location.pathname.includes('admin.html');
            
            if (isAdminPage) {
                // For admin.html
                element.innerHTML = `<h5>$${userData.balance.toFixed(2)}</h5>`;
            } else {
                // For index.html
                element.innerHTML = `<p class="p-small">$${userData.balance.toFixed(2)}</p>`;
            }
        }
    });
}

// Data structure for courses
const academicCourses = [
    {
        courseName: "💵 Macroeconomics I",
        courseItems: [
            {
                itemName: "Final Exam",
                passPrice: 50,
                failPrice: 50,
                passChance: 0.35,
                betMultiplier: 2.7,
                orderBook: [],
                userBets: {
                    avgPrice: 0,
                    shares: 0,
                    potentialReturn: 0
                }
            },
            {
                itemName: "Midterm Exam",
                passPrice: 40,
                failPrice: 60,
                passChance: 0.50,
                betMultiplier: 2.0,
                orderBook: [],
                userBets: {
                    avgPrice: 0,
                    shares: 0,
                    potentialReturn: 0
                }
            },
            {
                itemName: "Moderation",
                passPrice: 30,
                failPrice: 70,
                passChance: 0.70,
                betMultiplier: 1.5,
                orderBook: [],
                userBets: {
                    avgPrice: 0,
                    shares: 0,
                    potentialReturn: 0
                }
            }
        ]
    },
    {
        courseName: "🌎 American History",
        courseItems: [
            {
                itemName: "Final Exam",
                passPrice: 35,
                failPrice: 65,
                passChance: 0.40,
                betMultiplier: 2.5,
                orderBook: [],
                userBets: {
                    avgPrice: 0,
                    shares: 0,
                    potentialReturn: 0
                }
            },
            {
                itemName: "Midterm Exam",
                passPrice: 60,
                failPrice: 40,
                passChance: 0.55,
                betMultiplier: 1.8,
                orderBook: [],
                userBets: {
                    avgPrice: 0,
                    shares: 0,
                    potentialReturn: 0
                }
            },
            {
                itemName: "Moderation",
                passPrice: 45,
                failPrice: 55,
                passChance: 0.65,
                betMultiplier: 1.6,
                orderBook: [],
                userBets: {
                    avgPrice: 0,
                    shares: 0,
                    potentialReturn: 0
                }
            }
        ]
    },
    {
        courseName: "🔧 Theoretical Mechanics",
        courseItems: [
            {
                itemName: "Final Exam",
                passPrice: 65,
                failPrice: 35,
                passChance: 0.75,
                betMultiplier: 1.5,
                orderBook: [],
                userBets: {
                    avgPrice: 0,
                    shares: 0,
                    potentialReturn: 0
                }
            },
            {
                itemName: "Midterm Exam",
                passPrice: 55,
                failPrice: 45,
                passChance: 0.60,
                betMultiplier: 1.8,
                orderBook: [],
                userBets: {
                    avgPrice: 0,
                    shares: 0,
                    potentialReturn: 0
                }
            },
            {
                itemName: "Moderation",
                passPrice: 70,
                failPrice: 30,
                passChance: 0.80,
                betMultiplier: 1.4,
                orderBook: [],
                userBets: {
                    avgPrice: 0,
                    shares: 0,
                    potentialReturn: 0
                }
            }
        ]
    },
    {
        courseName: "📕 English",
        courseItems: [
            {
                itemName: "Final Exam",
                passPrice: 45,
                failPrice: 55,
                passChance: 0.55,
                betMultiplier: 1.9,
                orderBook: [],
                userBets: {
                    avgPrice: 0,
                    shares: 0,
                    potentialReturn: 0
                }
            },
            {
                itemName: "Midterm Exam",
                passPrice: 50,
                failPrice: 50,
                passChance: 0.60,
                betMultiplier: 1.8,
                orderBook: [],
                userBets: {
                    avgPrice: 0,
                    shares: 0,
                    potentialReturn: 0
                }
            },
            {
                itemName: "Moderation",
                passPrice: 75,
                failPrice: 25,
                passChance: 0.85,
                betMultiplier: 1.3,
                orderBook: [],
                userBets: {
                    avgPrice: 0,
                    shares: 0,
                    potentialReturn: 0
                }
            }
        ]
    }
];

// Global variables to track current selection
let currentCourse = null;
let currentItem = null;

function initializeCourseUI() {
    // Populate course buttons
    const courseButtonsContainer = document.getElementById('course-buttons-container');
    if (courseButtonsContainer) {
        courseButtonsContainer.innerHTML = academicCourses.map(course => 
            `<button class="btn course-button" type="button">${course.courseName}</button>`
        ).join('');
    }

    // Add click event listeners to course buttons
    document.querySelectorAll('.course-button').forEach((button, index) => {
        button.addEventListener('click', () => {
            // Remove previous selection styling
            document.querySelectorAll('.course-button').forEach(btn => 
                btn.classList.remove('selected'));
            
            // Add selection styling
            button.classList.add('selected');
            
            currentCourse = academicCourses[index];
            updateCourseItemButtons(currentCourse.courseItems);
            updateCourseDisplay(currentCourse);
        });
    });

    // Select first course by default
    if (academicCourses.length > 0) {
        const firstCourseButton = document.querySelector('.course-button');
        if (firstCourseButton) {
            firstCourseButton.click();
        }
    }
}

function updateCourseItemButtons(courseItems) {
    const itemButtonsContainer = document.getElementById('item-buttons-container');
    if (itemButtonsContainer) {
        itemButtonsContainer.innerHTML = courseItems.map(item =>
            `<button class="btn item-button" type="button">${item.itemName}</button>`
        ).join('');

        // Add click event listeners to item buttons
        document.querySelectorAll('.item-button').forEach((button, index) => {
            button.addEventListener('click', () => {
                // Remove previous selection styling
                document.querySelectorAll('.item-button').forEach(btn => 
                    btn.classList.remove('selected'));
                
                // Add selection styling
                button.classList.add('selected');
                
                currentItem = courseItems[index];
                updatePriceButtons(currentItem);
                updateCourseDisplay(currentCourse);
                
                // Load saved order book data
                const savedCourses = JSON.parse(localStorage.getItem('academicCourses'));
                if (savedCourses) {
                    const courseIndex = academicCourses.findIndex(course => course.courseName === currentCourse.courseName);
                    const itemIndex = courseItems.findIndex(item => item.itemName === currentItem.itemName);
                    if (savedCourses[courseIndex] && savedCourses[courseIndex].courseItems[itemIndex]) {
                        currentItem.orderBook = savedCourses[courseIndex].courseItems[itemIndex].orderBook || [];
                    }
                }
                
                updateOrderBook(currentItem);
            });
        });

        // Select first item by default
        if (courseItems.length > 0) {
            const firstItemButton = document.querySelector('.item-button');
            if (firstItemButton) {
                firstItemButton.click();
            }
        }
    }
}

function updateOrderBook(item) {
    const passOrdersContainer = document.getElementById('pass-orders');
    const failOrdersContainer = document.getElementById('fail-orders');

    if (passOrdersContainer && failOrdersContainer && item.orderBook) {
        // Filter pass and fail orders
        const passOrders = item.orderBook.filter(order => order.type === 'pass');
        const failOrders = item.orderBook.filter(order => order.type === 'fail');

        // Update pass orders
        passOrdersContainer.innerHTML = passOrders.map((order, index) => `
            <div class="row" id="order-book_pass_${index}">
                <div class="col-6">
                    <p class="p-small">${order.name || 'Anonymous'}</p>
                </div>
                <div class="col-2">
                    <p class="p-smaller text-success">¢${order.price}</p>
                </div>
                <div class="col-2">
                    <p class="p-smaller">${order.shares}</p>
                </div>
                <div class="col-2">
                    <p class="p-smaller">$${order.total.toFixed(2)}</p>
                </div>
            </div>
        `).join('');

        // Update fail orders
        failOrdersContainer.innerHTML = failOrders.map((order, index) => `
            <div class="row" id="order-book_fail_${index}">
                <div class="col-6">
                    <p class="p-small">${order.name || 'Anonymous'}</p>
                </div>
                <div class="col-2">
                    <p class="p-smaller text-danger">¢${order.price}</p>
                </div>
                <div class="col-2">
                    <p class="p-smaller">${order.shares}</p>
                </div>
                <div class="col-2">
                    <p class="p-smaller">$${order.total.toFixed(2)}</p>
                </div>
            </div>
        `).join('');
    }
}

function updateCourseDisplay(course) {
    // Update course name
    const courseNameElement = document.querySelector('h4.course-name');
    if (courseNameElement) {
        courseNameElement.textContent = course.courseName;
    }

    // Update course item (will be updated when an item is selected)
    const courseItemElement = document.querySelector('h6.course-item');
    if (courseItemElement && currentItem) {
        courseItemElement.textContent = currentItem.itemName;
    }
}

// Add this to your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem('hasVisited');
    
    if (!hasVisited) {
        // Show the registration modal with required settings
        const registrationModal = new bootstrap.Modal(document.getElementById('courseSelectionModal'), {
            backdrop: 'static',  // Prevents closing when clicking outside
            keyboard: false      // Prevents closing with keyboard
        });
        
        // Remove the close button functionality
        const closeButton = document.querySelector('#courseSelectionModal .btn-close');
        if (closeButton) {
            closeButton.style.display = 'none';
        }
        
        registrationModal.show();
    }
    
    // Load data from localStorage first thing when page loads
    loadFromLocalStorage();
    
    // Then update the UI with loaded data
    updateUserDataUI();
    
    // Then initialize UI
    updateBalanceDisplay();
    initializeCourseUI();
    
    // ... other existing initialization code

    // Add click handlers for pass/fail buttons
    const passButton = document.getElementById('pass');
    const failButton = document.getElementById('fail');

    passButton.addEventListener('click', () => handleOutcomeSelection('pass'));
    failButton.addEventListener('click', () => handleOutcomeSelection('fail'));

    // Add click handlers for plus/minus buttons
    const plusButton = document.getElementById('plus_button');
    const minusButton = document.getElementById('minus_button');
    const wagerInput = document.getElementById('wagerInput');

    if (plusButton) {
        plusButton.addEventListener('click', () => updateWagerInput(1));
    }

    if (minusButton) {
        minusButton.addEventListener('click', () => updateWagerInput(-1));
    }

    // Add input handler for manual entry
    if (wagerInput) {
        wagerInput.addEventListener('input', function() {
            let value = parseFloat(this.value) || 0;
            
            // Ensure value doesn't exceed balance or go below 0
            value = Math.min(Math.max(0, value), userData.balance);
            
            currentWager = value;
            this.value = value.toFixed(2);
            
            // Update all displays
            updateAveragePriceDisplay();
            updateSharesDisplay();
            updatePotentialReturnDisplay();
        });

        // Handle initial empty state
        wagerInput.addEventListener('focus', function() {
            if (!this.value) {
                this.value = '0.00';
            }
        });
    }

    // Initial balance display for both pages
    updateBalanceDisplay();

    // Connect Add Funds button to modal
    const addFundsButton = document.getElementById('add-funds-button');
    const addFundsModal = new bootstrap.Modal(document.getElementById('addFundsModal'));
    const addFundsForm = document.getElementById('addFundsForm');
    const addFundsInput = document.getElementById('add-funds-input');
    const modalCurrentBalance = document.getElementById('current-balance');
    
    if (addFundsButton) {
        addFundsButton.addEventListener('click', function() {
            // Load latest balance from localStorage
            loadFromLocalStorage();
            
            // Update modal's current balance display
            if (modalCurrentBalance) {
                modalCurrentBalance.textContent = `$${userData.balance.toFixed(2)}`;
            }
            
            addFundsModal.show();
        });
    }

    // Handle the Add Funds form submission
    const addFundsSubmitButton = document.querySelector('#addFundsModal .btn-primary');
    if (addFundsSubmitButton) {
        addFundsSubmitButton.addEventListener('click', function() {
            const amountToAdd = parseFloat(addFundsInput.value) || 0;
            
            if (amountToAdd > 0) {
                // Update user's balance
                userData.balance += amountToAdd;
                
                // Save to localStorage
                saveToLocalStorage();
                
                // Update all UI elements showing balance
                updateBalanceDisplay();
                
                // Reset form
                addFundsInput.value = '';
                
                // Close modal
                addFundsModal.hide();
            }
        });
    }

    // Add input validation for funds input
    if (addFundsInput) {
        addFundsInput.addEventListener('input', function() {
            let value = parseFloat(this.value) || 0;
            // Ensure non-negative value
            value = Math.max(0, value);
            this.value = value.toFixed(2);
        });
    }

    // Place Bet Button Handler
    const placeBetButton = document.getElementById('place-bet-button');
    if (placeBetButton) {
        placeBetButton.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Check if we have all required data
            if (!currentWager || !userData.selectedOutcome || !currentCourse || !currentItem) {
                console.log('Missing required bet data:', {
                    currentWager,
                    selectedOutcome: userData.selectedOutcome,
                    currentCourse,
                    currentItem
                });
                alert('Please select an outcome and enter a wager amount');
                return;
            }

            // Check if user has sufficient balance
            if (currentWager > userData.balance) {
                alert('Insufficient funds');
                return;
            }
            
            // Find current course and item indices
            const courseIndex = academicCourses.findIndex(course => course.courseName === currentCourse.courseName);
            const itemIndex = currentCourse.courseItems.findIndex(item => item.itemName === currentItem.itemName);
            
            // Create order data
            const orderData = {
                name: userData.name || 'Anonymous',
                price: userData.selectedOutcome === 'pass' ? currentItem.passPrice : currentItem.failPrice,
                shares: Math.floor((currentWager * 100) / (userData.selectedOutcome === 'pass' ? currentItem.passPrice : currentItem.failPrice)),
                total: currentWager,
                type: userData.selectedOutcome,
                timestamp: Date.now()
            };
            
            // Add to current course's order book
            currentItem.orderBook.push(orderData);
            
            // Save to localStorage
            saveOrderBookToLocalStorage(courseIndex, itemIndex, currentItem.orderBook);
            
            // Update UI
            updateOrderBook(currentItem);
            
            // Update user balance and save
            userData.balance -= currentWager;
            saveToLocalStorage();
            updateBalanceDisplay();
            
            // Reset wager input and current wager
            const wagerInput = document.getElementById('wagerInput');
            if (wagerInput) {
                wagerInput.value = '0.00';
                currentWager = 0;
            }
            
            // Update displays
            updateAveragePriceDisplay();
            updateSharesDisplay();
            updatePotentialReturnDisplay();
        });
    }

    // Handle the registration form submission
    const registrationForm = document.getElementById('userInfoForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get all input values
            const nameInput = document.getElementById('nameInput');
            const usernameInput = document.getElementById('usernameInput');
            const universityInput = document.getElementById('universityInput');
            const gradYearInput = document.getElementById('gradYearInput');
            const majorInput = document.getElementById('majorInput');
            const balanceInput = document.getElementById('balanceInput');
            
            if (nameInput && usernameInput && universityInput && 
                gradYearInput && majorInput && balanceInput) {
                
                // Update userData object
                userData.name = nameInput.value.trim();
                userData.username = usernameInput.value.trim();
                userData.university = universityInput.value.trim();
                userData.gradYear = gradYearInput.value.trim();
                userData.major = majorInput.value.trim();
                
                // Handle balance: Add the input amount to the initial 0 balance
                const addedFunds = parseFloat(balanceInput.value) || 0;
                userData.balance += addedFunds;
                
                // Save to localStorage
                saveToLocalStorage();
                
                // Update UI
                updateUserDataUI();
                
                // Close modal - ensure we're getting the correct modal instance
                const modal = document.getElementById('courseSelectionModal');
                if (modal) {
                    const modalInstance = bootstrap.Modal.getInstance(modal);
                    if (modalInstance) {
                        modalInstance.hide();
                    } else {
                        // If instance not found, create and hide
                        const newModal = new bootstrap.Modal(modal);
                        newModal.hide();
                    }
                }
                
                // Set visited flag
                localStorage.setItem('hasVisited', 'true');
            }
        });
    }

    // Load data from localStorage first
    loadFromLocalStorage();
    
    // Initialize the edit username modal
    const editUsernameButton = document.getElementById('edit_username_button');
    const editUsernameModal = new bootstrap.Modal(document.getElementById('editUsernameModal'));
    const editUsernameForm = document.getElementById('editUsernameForm');
    
    if (editUsernameButton) {
        editUsernameButton.addEventListener('click', function() {
            // Pre-fill the current username
            const newUsernameInput = document.getElementById('newUsernameInput');
            if (newUsernameInput) {
                newUsernameInput.value = userData.username.replace('@', '');
            }
            editUsernameModal.show();
        });
    }
    
    if (editUsernameForm) {
        editUsernameForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const newUsernameInput = document.getElementById('newUsernameInput');
            if (newUsernameInput) {
                // Update userData with new username
                let newUsername = newUsernameInput.value.trim();
                newUsername = newUsername.startsWith('@') ? newUsername : '@' + newUsername;
                userData.username = newUsername;
                
                // Save to localStorage
                saveToLocalStorage();
                
                // Update UI
                updateUserDataUI();
                
                // Close modal
                editUsernameModal.hide();
            }
        });
    }

    // Load and display existing orders
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.sort((a, b) => b.timestamp - a.timestamp); // Sort by newest first
    
    orders.forEach(order => {
        const orderBookId = order.type === 'pass' ? 'pass-orders' : 'fail-orders';
        const orderBook = document.getElementById(orderBookId);
        if (orderBook) {
            const orderElement = createOrderElement(order);
            orderBook.appendChild(orderElement);
        }
    });
});

// Example usage in a bet submission handler
function handleBetSubmission(event) {
    event.preventDefault();
    
    const betAmount = parseFloat(document.getElementById('betAmount').value);
    const shares = parseFloat(document.getElementById('shares').value);
    
    // Verify user has enough balance
    if (userData.balance >= betAmount) {
        const bet = {
            userId: userData.username,
            price: betAmount / shares,
            shares: shares,
            type: userData.selectedOutcome, // 'pass' or 'fail'
            timestamp: Date.now()
        };
        
        // Find current course and item indices
        const courseIndex = academicCourses.findIndex(course => course.courseName === currentCourse.courseName);
        const itemIndex = currentCourse.courseItems.findIndex(item => item.itemName === currentItem.itemName);
        
        // Update balance
        updateUserBalance(-betAmount);
        
        // Add bet to orderbook
        addBetToOrderBook(courseIndex, itemIndex, bet);
    }
}

// Add this to track user's selection
function handleOutcomeSelection(outcome) {
    userData.selectedOutcome = outcome;
    
    // Update visual indication
    const passButton = document.getElementById('pass');
    const failButton = document.getElementById('fail');
    
    // Remove previous selections
    passButton.classList.remove('selected-pass');
    failButton.classList.remove('selected-fail');
    
    // Add new selection
    if (outcome === 'pass') {
        passButton.classList.add('selected-pass');
    } else if (outcome === 'fail') {
        failButton.classList.add('selected-fail');
    }
    
    // Update all displays
    updateAveragePriceDisplay();
    updateSharesDisplay();
    updatePotentialReturnDisplay();
}

function updatePriceButtons(item) {
    const passButton = document.getElementById('pass');
    const failButton = document.getElementById('fail');
    
    if (passButton && failButton && item) {
        // Update pass button text with space
        passButton.innerHTML = `
            <p>Pass &nbsp;</p>
            <p class="price-text">¢${item.passPrice}</p>
        `;
        
        // Update fail button text with space
        failButton.innerHTML = `
            <p>Fail &nbsp;</p>
            <p class="price-text">¢${item.failPrice}</p>
        `;
    }
}

// Add this to track the wager amount
let currentWager = 0;

function updateWagerInput(amount) {
    const wagerInput = document.getElementById('wagerInput');
    if (wagerInput) {
        let currentValue = parseFloat(wagerInput.value) || 0;
        currentValue += amount;
        
        // Ensure value doesn't exceed balance or go below 0
        currentValue = Math.min(Math.max(0, currentValue), userData.balance);
        
        wagerInput.value = currentValue.toFixed(2);
        currentWager = currentValue;
        
        // Update all displays
        updateAveragePriceDisplay();
        updateSharesDisplay();
        updatePotentialReturnDisplay();
    }
}

function updateAveragePriceDisplay() {
    const avgPriceElement = document.getElementById('avg-price');
    
    if (avgPriceElement && currentItem && userData.selectedOutcome) {
        // Get relevant price based on selected outcome (pass/fail)
        const itemPrice = userData.selectedOutcome === 'pass' 
            ? currentItem.passPrice 
            : currentItem.failPrice;
        
        // Calculate shares based on wager amount
        // Convert wager from dollars to cents for calculation
        const shares = Math.floor((currentWager * 100) / itemPrice);
        
        // Calculate average price in cents
        const avgPrice = shares > 0 ? (currentWager * 100) / shares : 0;
        
        // Update the display with blue text
        avgPriceElement.innerHTML = `
            <div class="col-7 text-start">
                <p class="text-body-secondary p-small">Avg Price</p>
            </div>
            <div class="col-5 text-end">
                <p class="p-small text-primary">¢${avgPrice.toFixed(2)}</p>
            </div>
        `;
    } else {
        // Default state with blue text
        avgPriceElement.innerHTML = `
            <div class="col-7 text-start">
                <p class="text-body-secondary p-small">Avg Price</p>
            </div>
            <div class="col-5 text-end">
                <p class="p-small text-primary">¢0.00</p>
            </div>
        `;
    }
}

function updateSharesDisplay() {
    const sharesElement = document.getElementById('shares');
    
    if (sharesElement && currentItem && userData.selectedOutcome) {
        // Get relevant price based on selected outcome (pass/fail)
        const itemPrice = userData.selectedOutcome === 'pass' 
            ? currentItem.passPrice 
            : currentItem.failPrice;
        
        // Calculate shares based on wager amount
        // Convert wager from dollars to cents for calculation
        const shares = Math.floor((currentWager * 100) / itemPrice);
        
        // Update the display with default text color
        sharesElement.innerHTML = `
            <div class="col-7 text-start">
                <p class="text-body-secondary p-small">Shares</p>
            </div>
            <div class="col-5 text-end">
                <p class="p-small">${shares.toFixed(2)}</p>
            </div>
        `;
    } else {
        // Default state with default text color
        sharesElement.innerHTML = `
            <div class="col-7 text-start">
                <p class="text-body-secondary p-small">Shares</p>
            </div>
            <div class="col-5 text-end">
                <p class="p-small">0.00</p>
            </div>
        `;
    }
}

function updatePotentialReturnDisplay() {
    const potentialReturnElement = document.getElementById('potential-return');
    
    if (potentialReturnElement && currentItem && userData.selectedOutcome && currentWager > 0) {
        // Get relevant price and multiplier based on selected outcome
        const itemPrice = userData.selectedOutcome === 'pass' 
            ? currentItem.passPrice 
            : currentItem.failPrice;
        
        // Calculate shares
        const shares = Math.floor((currentWager * 100) / itemPrice);
        
        // Calculate potential return using bet multiplier
        const potentialReturn = shares * (itemPrice / 100) * currentItem.betMultiplier;
        
        // Calculate return percentage
        const returnPercentage = ((potentialReturn - currentWager) / currentWager) * 100;
        
        // Update the display with green text
        potentialReturnElement.innerHTML = `
            <div class="col-7 text-start">
                <p class="text-body-secondary p-small">Potential Return</p>
            </div>
            <div class="col-5 text-end">
                <p class="p-small text-success">$${potentialReturn.toFixed(2)} (${returnPercentage.toFixed(2)}%)</p>
            </div>
        `;
    } else {
        // Default state
        potentialReturnElement.innerHTML = `
            <div class="col-7 text-start">
                <p class="text-body-secondary p-small">Potential Return</p>
            </div>
            <div class="col-5 text-end">
                <p class="p-small text-success">$0.00 (0.00%)</p>
            </div>
        `;
    }
}

// Function to save data to localStorage
function saveToLocalStorage() {
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('academicCourses', JSON.stringify(academicCourses));
}

// Function to load data from localStorage
function loadFromLocalStorage() {
    const savedUserData = localStorage.getItem('userData');
    console.log('Loading from localStorage:', savedUserData);
    
    if (savedUserData) {
        const parsedData = JSON.parse(savedUserData);
        Object.assign(userData, parsedData);
        console.log('Updated userData:', userData);
    }

    const savedCourses = localStorage.getItem('academicCourses');
    if (savedCourses) {
        const parsedCourses = JSON.parse(savedCourses);
        academicCourses.forEach((course, courseIndex) => {
            course.courseItems.forEach((item, itemIndex) => {
                if (parsedCourses[courseIndex] && 
                    parsedCourses[courseIndex].courseItems[itemIndex] && 
                    parsedCourses[courseIndex].courseItems[itemIndex].orderBook) {
                    item.orderBook = parsedCourses[courseIndex].courseItems[itemIndex].orderBook;
                }
            });
        });
    }
}

// Function to handle order creation
function createOrderElement(orderData) {
    const orderRow = document.createElement('div');
    orderRow.className = 'row order-entry';
    
    // Create columns for the order data
    orderRow.innerHTML = `
        <div class="col-6">
            <p class="p-small">${orderData.name}</p>
        </div>
        <div class="col-2">
            <p class="p-smaller">$${orderData.price.toFixed(2)}</p>
        </div>
        <div class="col-2">
            <p class="p-smaller">${orderData.shares}</p>
        </div>
        <div class="col-2">
            <p class="p-smaller">$${orderData.total.toFixed(2)}</p>
        </div>
    `;
    
    return orderRow;
}

// Function to save the order book for a specific course item to localStorage
function saveOrderBookToLocalStorage(courseIndex, itemIndex, orders) {
    // Get existing academic courses or initialize
    const savedCourses = JSON.parse(localStorage.getItem('academicCourses')) || academicCourses;
    
    // Update the specific course item's order book
    savedCourses[courseIndex].courseItems[itemIndex].orderBook = orders;
    
    // Save back to localStorage
    localStorage.setItem('academicCourses', JSON.stringify(savedCourses));
}

// Add this debug function
function debugUserData() {
    console.log('Current userData:', userData);
    console.log('localStorage userData:', JSON.parse(localStorage.getItem('userData')));
}
