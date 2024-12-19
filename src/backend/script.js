// Used Claude.ai to help me write this code

console.log('Script file loaded');

// Initializes user data from localStorage
let userData = JSON.parse(localStorage.getItem('userData')) || {
    balance: 0
};

// Sets up event listeners and initializes UI based on current page
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    // Only set up game-related buttons if we're on the main page
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        const passButton = document.getElementById('passButton');
        if (passButton) {
            passButton.addEventListener('click', () => handleOutcomeSelection('pass'));
        }
        
        // Add other main page button handlers here
        // ... existing main page code ...
    }
    
    // Only set up transfer button if we're on the admin page
    if (window.location.pathname.includes('admin.html')) {
        const transferButton = document.getElementById('transferButton');
        if (transferButton) {
            console.log('Setting up transfer button');
            transferButton.onclick = function() {
                console.log('Transfer button clicked');
                
                if (userData.balance <= 0) {
                    alert('No funds available to transfer.');
                    return;
                }

                const confirmTransfer = confirm(`Are you sure you want to transfer $${userData.balance.toFixed(2)} to your bank account?`);
                
                if (confirmTransfer) {
                    const transferredAmount = userData.balance;
                    userData.balance = 0;
                    
                    // Save to localStorage
                    localStorage.setItem('userData', JSON.stringify(userData));
                    
                    // Update UI
                    const fundsAmount = document.getElementById('funds-amount');
                    if (fundsAmount) {
                        fundsAmount.querySelector('h5').textContent = `$${userData.balance.toFixed(2)}`;
                    }
                    
                    alert(`$${transferredAmount.toFixed(2)} has been transferred to your bank account.`);
                }
            };
        }
    }
    
    // Update UI regardless of which page we're on
    updateUserDataUI();
});

// Updates the UI elements with current user data values
function updateUserDataUI() {
    console.log('Updating UI with userData:', userData);
    
    // Update admin page UI
    const fundsAmount = document.getElementById('funds-amount');
    if (fundsAmount) {
        const amountDisplay = fundsAmount.querySelector('h5');
        if (amountDisplay) {
            amountDisplay.textContent = `$${userData.balance.toFixed(2)}`;
        }
    }
    
    // Update other UI elements as needed
    // ... rest of your updateUserDataUI code ...
}

// Initializes transfer button functionality on admin page load
window.onload = function() {
    // Only run this code if we're on the admin page
    if (!window.location.pathname.includes('admin.html')) return;
    
    console.log('Admin page loaded');
    
    // Get the transfer button
    const transferButton = document.getElementById('transferButton');
    console.log('Transfer button:', transferButton);
    
    if (!transferButton) {
        console.log('Transfer button not found');
        return;
    }
    
    // Add click handler
    transferButton.onclick = function() {
        console.log('Transfer button clicked');
        
        // Get current balance from userData
        const currentBalance = userData?.balance || 0;
        console.log('Current balance:', currentBalance);
        
        if (currentBalance <= 0) {
            alert('No funds available to transfer.');
            return;
        }
        
        // Confirm transfer
        if (confirm(`Transfer $${currentBalance.toFixed(2)} to your bank account?`)) {
            // Store amount being transferred
            const transferAmount = currentBalance;
            
            // Reset balance to 0
            userData.balance = 0;
            
            // Save to localStorage
            localStorage.setItem('userData', JSON.stringify(userData));
            
            // Update display
            const fundsDisplay = document.querySelector('#funds-amount h5');
            if (fundsDisplay) {
                fundsDisplay.textContent = `$${userData.balance.toFixed(2)}`;
            }
            
            // Confirm transfer
            alert(`$${transferAmount.toFixed(2)} has been transferred to your bank account.`);
        }
    };
};

// Sets up transfer button click handler with confirmation dialog
document.addEventListener('DOMContentLoaded', function() {
    const transferButton = document.getElementById('transferButton');
    
    if (transferButton) {
        transferButton.addEventListener('click', function() {
            // Debug log
            console.log('Transfer button clicked');
            console.log('Current userData:', userData);
            
            // Check if we have a balance to transfer
            if (!userData || userData.balance <= 0) {
                alert('No funds available to transfer.');
                return;
            }
            
            // Ask for confirmation
            const confirmMessage = `Are you sure you want to transfer $${userData.balance.toFixed(2)} to your bank account?`;
            if (confirm(confirmMessage)) {
                // Store the amount being transferred
                const transferAmount = userData.balance;
                
                // Reset the balance
                userData.balance = 0;
                
                // Save to localStorage
                localStorage.setItem('userData', JSON.stringify(userData));
                
                // Update the UI
                const fundsAmount = document.querySelector('#funds-amount h5');
                if (fundsAmount) {
                    fundsAmount.textContent = `$${userData.balance.toFixed(2)}`;
                }
                
                // Show success message
                alert(`$${transferAmount.toFixed(2)} has been transferred to your bank account.`);
            }
        });
    }
});