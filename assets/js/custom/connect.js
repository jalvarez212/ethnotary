// main.js
async function isEthereumWalletConnected() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            return accounts.length > 0;
        } catch (error) {
            console.error('Error checking for Ethereum wallet connection:', error);
            return false;
        }
    } else {
        console.log('Ethereum wallet (like MetaMask) is not installed.');
        return false;
    }
}

async function runAnotherScript() {
    if (await isEthereumWalletConnected()) {
        // Import the other script dynamically if the wallet is connected
        import('./txn.js')
            .then((module) => {
                console.log('Running anotherScript.js');
                module.run(); // Assuming there is a 'run' function in anotherScript.js
            })
            .catch(error => {
                console.error('Failed to load anotherScript.js', error);
            });
    } else {
        console.log('Ethereum wallet is not connected.');
    }
}

// Call the function to check wallet connection and run another script
runAnotherScript();