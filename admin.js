document.addEventListener('DOMContentLoaded', function() {
    const transferButton = document.getElementById('transferButton');
    
    if (transferButton) {
        transferButton.addEventListener('click', function() {
            // Load latest data from localStorage
            const userData = JSON.parse(localStorage.getItem('userData')) || { balance: 0 };
            
            // Check if there's any balance to transfer
            if (userData.balance <= 0) {
                alert('No funds available to transfer.');
                return;
            }
            
            // Ask for confirmation
            const confirmTransfer = confirm(`Are you sure you want to transfer $${userData.balance.toFixed(2)} to your bank account?`);
            
            if (confirmTransfer) {
                // Store the amount being transferred (for the confirmation message)
                const transferredAmount = userData.balance;
                
                // Set balance to 0
                userData.balance = 0;
                
                // Save updated userData to localStorage
                localStorage.setItem('userData', JSON.stringify(userData));
                
                // Update the UI
                const fundsAmount = document.getElementById('funds-amount');
                if (fundsAmount) {
                    const amountElement = fundsAmount.querySelector('h5');
                    if (amountElement) {
                        amountElement.textContent = `$${userData.balance.toFixed(2)}`;
                    }
                }
                
                // Show confirmation message
                alert(`$${transferredAmount.toFixed(2)} has been transferred to your bank account.`);
            }
        });
    }
});
