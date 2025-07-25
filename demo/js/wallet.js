//walletstate variables
let rawChainId;
let wallet;
let selectAddress = 1;
let contract;

// Initialize ethers.js provider but keep the web3 variable name for compatibility
let web3;
const contractAddress = localStorage.contract;

// Function to update the ethers provider with a new RPC URL
function updateWeb3Provider(rpcUrl) {
    web3 = new Web3(rpcUrl);

    // Further actions can be performed with the updated web3 instance
}



function normalizeToHex(input) {
    if (typeof input === 'string' && input.startsWith('0x')) {
        return input.toLowerCase(); // Ensure lowercase for consistency
    } else if (typeof input === 'number') {
        return '0x' + input.toString(16); // Convert decimal to hex
    } else {
        throw new Error("Invalid input type: must be a hex string or a number.");
    }
}


async function checkConnectedNetwork() {
    if (!window.ethereum) {
        console.log("No Web3 wallet detected");
        showModal();
        return;
    }

    try {
        // Use the chainIdLookup map for a direct lookup
        const matchedNetwork = chainIdLookup[localStorage.getItem('lastChain', rawChainId)];
        const lastWallet = localStorage.getItem('lastWallet');


        console.log(matchedNetwork)

        if (matchedNetwork) {
            console.log(`Connected to ${matchedNetwork.name}`);
            updateWeb3Provider(matchedNetwork.rpcUrl);

        } else {
            console.log("Connected to an unsupported network");

        }
    } catch (error) {
        console.error("Error fetching chain ID:", error);

    }
}

// Function to detect network change and re-run `checkConnectedNetwork`
function detectNetworkChange(wallet) {
    wallet.on('chainChanged', async () => {
        console.log("Network changed");
        await checkConnectedNetwork();
    });

}



const ethers = window.ethers;

// Initialize Coinbase Wallet SDK
const coinbaseWallet = typeof CoinbaseWalletSDK !== 'undefined' ? new CoinbaseWalletSDK({
    appName: 'ethnotary',
    appLogoUrl: 'https://ethnotary.io/',
    darkMode: false
}) : null;

/**
 * Listens for key wallet/provider events and handles them.
 * Replace the console logs with your own logic—like reloading the page,
 * re-calling checkConnectedNetwork(), or updating UI elements.
 */
function watchWalletChanges(wallet) {
    if (!wallet || !wallet.on) {
        console.error("No wallet instance found or wallet does not support event listeners.");
        return;
    }

    // Fired when the chain/network ID changes in the wallet
    wallet.on('chainChanged', async (newChainId) => {
        console.log("chainChanged event detected:", newChainId);
        // Option 1: Reload the page
        window.location.reload();

        // Option 2: Or re-run your existing network checks:
        //await checkConnectedNetwork();
    });

    // Fired when the user changes the active account(s) in the wallet
    wallet.on('accountsChanged', async (accounts) => {
        console.log("accountsChanged event detected:", accounts);
        // If the user has at least one address:
        if (accounts && accounts.length > 0) {
            localStorage.setItem('connectedWallet', accounts[0]);
            web3.eth.defaultAccount = accounts[0];
            // You might also call checkConnectedNetwork() here if needed


        } else {
            // User might have disconnected or removed permissions
            console.warn("No accounts provided. Handle accordingly.");
            // e.g., show a disconnect message or revert to a default state
        }
    });
}

//1) MetaMask
async function connectMetaMask() {
    try {
        // First dynamically load the MetaMask SDK
        console.log('Loading MetaMask SDK...');
        await loadMetaMaskSDK();
        
        if (!window.MetaMaskSDK) {
            throw new Error('Failed to load MetaMask SDK');
        }
        
        // Initialize the SDK
        const MMSDK = new MetaMaskSDK.MetaMaskSDK({
            dappMetadata: {
                name: "EthNotary",
                url: window.location.href,
            },
            extensionOnly: true,
            useDeeplink: false,
            logging: {
                sdk: false,
            }
        });
        
        // 1) Connect to wallet
        const accounts = await MMSDK.connect();
        let metaWallet = await MMSDK.getProvider();
        wallet = await metaWallet;
        
        const response = await wallet.request({ method: 'eth_requestAccounts' });
        const walletAccounts = response;
        selectAddress = walletAccounts[0];
        console.log(`User's address is ${walletAccounts[0]}`);
        
        // Set default account for web3.js
        web3.eth.defaultAccount = walletAccounts[0];
        localStorage.setItem('connectedWallet', walletAccounts[0]);
        
        // 2) Get chain ID and update Web3
        const chainId = await wallet.request({ method: 'eth_chainId' });
        const matchedNetwork = chainIdLookup[chainId];
        if (matchedNetwork?.rpcUrl) {
            updateWeb3Provider(matchedNetwork.rpcUrl);
            console.log(`Connected to network: ${matchedNetwork.name}`);
        } else {
            console.warn("Unsupported or unknown network:", chainId);
            // Optionally fall back to a default, or show a modal
        }

        // Set up wallet event listeners
        watchWalletChanges(wallet);

        // 3) Save everything to localStorage
        localStorage.setItem('lastWallet', 'Metamask');
        localStorage.setItem('lastChain', chainId);
        hideWallets();
        
        return { success: true, address: walletAccounts[0] };
    } catch (error) {
        console.error('MetaMask connection error:', error);
       
        
    }
}
// 2) OKX

async function connectOKXWallet() {


    try {
        // 1) Connect to wallet
        wallet = window.okxwallet;
        wallet.request({ method: 'eth_requestAccounts' }).then(response => {
            const accounts = response;
            selectAddress = accounts[0];
            console.log(`User's address is ${accounts[0]}`);
            console.log(response)

            // Optionally, have the default account set for web3.js
            web3.eth.defaultAccount = accounts[0]
            localStorage.setItem('connectedWallet', accounts[0]);


        })
        // 2) Get chain ID and update Web3
        const chainId = await wallet.request({ method: 'eth_chainId' });
        const matchedNetwork = chainIdLookup[chainId];
        if (matchedNetwork?.rpcUrl) {
            updateWeb3Provider(matchedNetwork.rpcUrl); // or new Web3(provider)
            console.log(`Connected to network: ${matchedNetwork.name}`);
        } else {
            console.warn("Unsupported or unknown network:", chainId);
            // Optionally fall back to a default, or show a modal
        }

        watchWalletChanges(wallet);


        // 3) Save everything to localStorage
        localStorage.setItem('lastWallet', 'okx');
        localStorage.setItem('lastChain', chainId);
        hideModal();
    } catch (error) {
        console.error('User denied account access or error occurred:', error);
        
        // Check if the error is due to wallet not being installed
        if (!window.okxwallet) {
            // Open a new tab directing users to download OKX wallet only if it's not installed
            window.open('https://web3.okx.com/', '_blank');
        }
        // If user denies access, do nothing (falls through to this point)
    }
}
// Function to connect to the user's Ethereum wallet
async function connectCoinbase() {

    try {
        const cbwallet = await coinbaseWallet.makeWeb3Provider('https://mainnet.infura.io/v3/' + ENV.RPC_NODE_KEY, '1');
        
        if (!cbwallet) {
            throw new Error('Failed to initialize Coinbase provider');
        }

        wallet = cbwallet;
        const response = await wallet.request({ method: 'eth_requestAccounts' });
        
        if (!response || response.length === 0) {
            throw new Error('No accounts returned from Coinbase');
        }
        
        const accounts = response;
        selectAddress = accounts[0];
        console.log(`User's address is ${accounts[0]}`);

        // Set default account for web3.js
        web3.eth.defaultAccount = accounts[0];
        localStorage.setItem('connectedWallet', selectAddress);
        localStorage.setItem('lastWallet', 'Coinbase');

        // Get and normalize chain ID
        rawChainId = await normalizeToHex(wallet.getChainId());
        const chainId = await wallet.request({ method: 'eth_chainId' });
        
        // Update provider based on network
        const matchedNetwork = chainIdLookup[chainId];
        if (matchedNetwork?.rpcUrl) {
            updateWeb3Provider(matchedNetwork.rpcUrl);
            console.log(`Connected to network: ${matchedNetwork.name}`);
        } else {
            console.warn("Unsupported or unknown network:", chainId);
        }
        
        // Set up wallet event listeners
        watchWalletChanges(wallet);
        
        // Save chain ID to localStorage
        localStorage.setItem('lastChain', rawChainId);
        console.log("Detected Chain ID:", rawChainId);

        // Hide wallet selection UI
        hideWallets();
        
        return { success: true, address: accounts[0] };
    } catch (error) {
        console.error('Coinbase connection error:', error);
    }
}

// 4) Phantom
async function connectPhantomWallet() {

    try {
        // 1) Connect to wallet
        wallet = window.phantom.ethereum;
        wallet.request({ method: 'eth_requestAccounts' }).then(response => {
            const accounts = response;
            selectAddress = accounts[0];
            console.log(`User's address is ${accounts[0]}`);
            console.log(response)

            // Optionally, have the default account set for web3.js
            web3.eth.defaultAccount = accounts[0]
            localStorage.setItem('connectedWallet', accounts[0]);


        })
        // 2) Get chain ID and update Web3
        const chainId = await wallet.request({ method: 'eth_chainId' });
        const matchedNetwork = chainIdLookup[chainId];
        if (matchedNetwork?.rpcUrl) {
            updateWeb3Provider(matchedNetwork.rpcUrl); // or new Web3(provider)
            console.log(`Connected to network: ${matchedNetwork.name}`);
        } else {
            console.warn("Unsupported or unknown network:", chainId);
            // Optionally fall back to a default, or show a modal
        }

        watchWalletChanges(wallet);


        // 3) Save everything to localStorage
        localStorage.setItem('lastWallet', 'Phantom');
        localStorage.setItem('lastChain', chainId);

        hideWallets();
    } catch (error) {
        console.error('User denied account access or error occurred:', error);
        
        // Check if the error is due to wallet not being installed
        if (!window.phantom?.ethereum) {
            // Open a new tab directing users to download Phantom wallet only if it's not installed
            window.open('https://phantom.com/', '_blank');
        }
        // If user denies access, do nothing (falls through to this point)
    }
}



// 5) Binance

async function connectBinance() {
    

        try {
            // 1) Connect to wallet
            wallet = await window.trustwallet;
            wallet.request({ method: 'eth_requestAccounts' }).then(response => {
                const accounts = response;
                console.log(`User's address is ${accounts[0]}`);
                selectAddress = accounts[0];

                // Optionally, have the default account set for web3.js
                web3.eth.defaultAccount = accounts[0];
                localStorage.setItem('connectedWallet', selectAddress);
                localStorage.setItem('lastWallet', 'Binance');


            })
            // 2) Get chain ID and update Web3
            const chainId = await wallet.request({ method: 'eth_chainId' });

            console.log(chainId)
            const matchedNetwork = chainIdLookup[chainId];
            if (matchedNetwork?.rpcUrl) {
                updateWeb3Provider(matchedNetwork.rpcUrl); // or new Web3(provider)
                console.log(`Connected to network: ${matchedNetwork.name}`);
            } else {
                console.warn("Unsupported or unknown network:", chainId);
                // Optionally fall back to a default, or show a modal
            }
            watchWalletChanges(wallet);


            // 3) Save everything to localStorage
            localStorage.setItem('lastChain', chainId);

            hideWallets();
        } catch (error) {
            console.error('User denied account access or error occurred:', error);
            
            // Check if the error is due to wallet not being installed
            if (!window.trustwallet) {
                // Open a new tab directing users to download Binance wallet only if it's not installed
                window.open('https://www.binance.com/en/binancewallet', '_blank');
            }
            // If user denies access, do nothing (falls through to this point)
        }


    




}

async function connectWallet() {
        try {
            // Check if window.ethereum is available (generic wallet provider)
            if (typeof window.ethereum !== 'undefined') {
                wallet = window.ethereum;
                
                // Request accounts
                const response = await wallet.request({ method: 'eth_requestAccounts' });
                const accounts = response;
                selectAddress = accounts[0];
                console.log(`User's address is ${accounts[0]}`);
                console.log(response);
                
                // Optionally, have the default account set for web3.js
                web3.eth.defaultAccount = accounts[0];
                localStorage.setItem('connectedWallet', accounts[0]);
                
                console.log('Connected account:', accounts[0]);
                
                // Get chain ID and update provider
                const chainId = await wallet.request({ method: 'eth_chainId' });
                rawChainId = chainId; // Set the rawChainId variable
                const matchedNetwork = chainIdLookup[chainId];
                if (matchedNetwork?.rpcUrl) {
                    updateWeb3Provider(matchedNetwork.rpcUrl);
                    console.log(`Connected to network: ${matchedNetwork.name}`);
                } else {
                    console.warn("Unsupported or unknown network:", chainId);
                    // Optionally fall back to a default, or show a modal
                }
                
                // Set up event listeners and save wallet info
                watchWalletChanges(wallet);
                localStorage.setItem('lastChain', chainId);
                localStorage.setItem('lastWallet', 'other');
                detectNetworkChange(wallet);
                
                hideWallets();
                
                console.log("Detected Chain ID:", chainId);
                return { success: true, address: accounts[0] };
            } else {
                throw new Error('No Ethereum provider found');
            }
        } catch (error) {
            console.error('Initial wallet connection failed, trying MetaMask as fallback:', error);
            
            try {
                // Try connecting with MetaMask as a fallback
                console.log('Attempting to connect with MetaMask as fallback...');
                const metaMaskResult = await connectMetaMask();
                
                // If MetaMask connection was successful, return that result
                if (metaMaskResult && metaMaskResult.success) {
                    console.log('Successfully connected with MetaMask fallback');
                    return metaMaskResult;
                } else {
                    throw new Error('MetaMask fallback connection failed');
                }
            } catch (metaMaskError) {
                console.error('MetaMask fallback also failed:', metaMaskError);
                
                // Show a more informative message for the generic wallet connection
                if (typeof window.ethereum === 'undefined') {
                    // No wallet detected at all - direct to Ethereum's wallet finder page
                    window.open('https://ethereum.org/en/wallets/find-wallet/', '_blank');
                }
                // If user denies access or other error, just keep the error in console
                return { success: false, error: error.message };
            }
        }
}


function getTokens(array) {
    for (let i = 0; i < array.length; i++) {
        // Function content here
    }
}


async function checkWalletConnectionAndNetwork() {
    if (typeof wallet == 'undefined') {
        // Check if wallet is connected
        try {

            let lastWallet = localStorage.getItem('lastWallet')
            console.log('last wallet provider: ' + lastWallet)

            if (lastWallet == 'Metamask') {
                connectMetaMask();
            }
            if (lastWallet == 'Coinbase') {
                connectCoinbase();

            }
            if (lastWallet == 'Binance') {
                connectBinance();
            }
            if (lastWallet == 'Phantom') {
                connectPhantomWallet();
            }
            if (lastWallet == 'okx') {
                connectOKXWallet();
            }
            if (lastWallet == 'other') {
                connectWallet();
            }

        }
        catch {
            showModal();

        }


    } else {
        showModal();


    }
}

// Helper function to check if wallet is available and connected
async function isWalletConnected() {
    // Check if ethereum provider exists
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Try to get accounts which will return empty array if not connected
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            return accounts && accounts.length > 0;
        } catch (error) {
            console.log("Error checking wallet connection:", error);
            return false;
        }
    }
    return false;
}

// Helper function to decide whether to show wallet connect modal or switch to correct network
async function handleNetworkOrWalletIssue() {
    // Check if Web3 is available
    if (typeof Web3 === 'undefined') {
        console.log("Web3 is not available, showing wallet connect modal");
        showModal();
        return;
    }
    
    try {
        // Get contract address
        const contractAddress = localStorage.contract;
        if (!contractAddress) {
            console.error("Contract address not found in localStorage");
            showModal();
            return;
        }
        
        // Find which network the contract is deployed on
        const contractNetwork = await findContractNetwork(contractAddress);
        
        // If contract not found on any network
        if (!contractNetwork) {
            console.log("Contract not found on any network, showing wallet connect modal");
            showModal();
            return;
        }
        
        // If wallet isn't connected, show connect modal
        if (!wallet) {
            console.log("Wallet not connected, showing wallet connect modal");
            showModal();
            return;
        }
        
        // Check if user is on the correct network
        const isOnCorrectNetwork = await checkIfOnCorrectNetwork(contractNetwork);
        
        // If already on correct network, we're done
        if (isOnCorrectNetwork) {
            console.log("User is connected to the correct network");
            return;
        }
        
        // User is on wrong network - attempt to switch networks
        await switchToContractNetwork(contractNetwork);
        
    } catch (error) {
        console.error("Error in handleNetworkOrWalletIssue:", error);
        showModal();
    }
}

// Find which network the contract is deployed on
async function findContractNetwork(contractAddress) {
    const web3Instance = new Web3();
    console.log("Detecting network for contract:", contractAddress);
    
    // Try each network one by one
    for (const networkName of Object.keys(networks)) {
        const network = networks[networkName];
        console.log(`Trying network ${networkName}...`);
        
        // Set up provider and contract instance for this network
        web3Instance.setProvider(new Web3.providers.HttpProvider(network.rpcUrl));
        const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
        
        try {
            // Check if contract exists by calling a view method
            await contractInstance.methods.getOwners().call();
            
            // Contract found - update provider and return network name
            console.log(`Contract found on network: ${networkName}`);
            updateWeb3Provider(network.rpcUrl);
            return networkName;
            
        } catch (error) {
            console.log(`Contract not found on ${networkName}`);
            // Continue to next network
        }
    }
    
    // Contract not found on any network
    return null;
}

// Check if user's wallet is connected to the specified network
async function checkIfOnCorrectNetwork(contractNetwork) {
    try {
        const chainId = await wallet.request({ method: 'eth_chainId' });
        const userNetwork = chainIdLookup[chainId];
        
        return userNetwork && userNetwork.name === contractNetwork;
    } catch (error) {
        console.error("Error checking network:", error);
        return false;
    }
}

// Switch to the network where the contract is deployed
async function switchToContractNetwork(contractNetwork) {
    const targetNetwork = networks[contractNetwork];
    if (!targetNetwork || !targetNetwork.chainId) {
        console.error(`Network configuration for ${contractNetwork} not found`);
        return;
    }
    
    console.log(`Attempting to switch to ${contractNetwork}`);
    
    try {
        // Request network switch
        await wallet.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: targetNetwork.chainId }]
        });
        console.log(`Successfully requested switch to ${contractNetwork}`);
        
    } catch (switchError) {
        // If network hasn't been added to wallet yet
        if (switchError.code === 4902) {
            await addNetworkToWallet(targetNetwork.chainId, contractNetwork);
        } else {
            console.error("Network switch failed:", switchError);
        }
    }
}

// Add a network to the user's wallet
async function addNetworkToWallet(chainId, networkName) {
    try {
        const networkDetails = getNetworkDetailsForChainId(chainId);
        if (!networkDetails) {
            console.error(`Network details not found for ${networkName}`);
            return;
        }
        
        await wallet.request({
            method: 'wallet_addEthereumChain',
            params: [networkDetails]
        });
        console.log(`Successfully added network ${networkName}`);
        
    } catch (error) {
        console.error("Error adding network:", error);
    }
}

checkWalletConnectionAndNetwork().then(function () {
    console.log("Wallet connection check completed");
    checkConnectedNetwork();
    console.log("Network check completed");

    // Add a try-catch to see if there are any errors during contract initialization
    try {
        console.log("Attempting to initialize contract with address:", contractAddress);
        contract = new web3.eth.Contract(contractABI, contractAddress);
        console.log("Contract initialization result:", contract);

        // Use a more explicit check and log all intermediate results
        const contractExists = contract !== null && contract !== undefined;
        console.log("Contract exists:", contractExists);

        const methodsExists = contractExists && contract.methods !== undefined;
        console.log("Contract methods exist:", methodsExists);

        // Verify contract has expected methods by attempting to access a specific method
        // This is a more reliable check than just checking if methods property exists
        let hasExpectedMethods = false;
        if (methodsExists) {
            try {
                // Try to access a method that should exist on your contract
                hasExpectedMethods = typeof contract.methods.getOwners === 'function' ||
                    typeof contract.methods.deposit === 'function' ||
                    Object.keys(contract.methods).length > 0;
                console.log("Contract has expected methods:", hasExpectedMethods);
            } catch (e) {
                console.error("Error checking contract methods:", e);
                hasExpectedMethods = false;
            }
        }

        // If contract validation fails, check wallet connection and show appropriate modal
        if (!contractExists || !methodsExists || !hasExpectedMethods) {
            console.error("CONTRACT VALIDATION FAILED - checking wallet connection");
            // Add a small delay to ensure this runs after page is fully loaded
            setTimeout(function () {
                handleNetworkOrWalletIssue();
            }, 500);
        } else {
            console.log("Contract validation passed");
        }
    } catch (error) {
        console.error("Error during contract initialization:", error);
        setTimeout(function () {
            handleNetworkOrWalletIssue();
        }, 500);
    }
}).catch(function (error) {
    console.error("Error in wallet connection promise chain:", error);
    setTimeout(function () {
        handleNetworkOrWalletIssue();
    }, 500);
});

// Add a backup check in case the async initialization is missed
// window.addEventListener('DOMContentLoaded', function () {
//     console.log("DOM loaded - checking contract initialization");
//     // Wait a bit to ensure the contract initialization has had time to run
//     setTimeout(function () {
//         if (!contract || !contract.methods) {
//             console.error("Contract not properly initialized on DOMContentLoaded");
//             handleNetworkOrWalletIssue();
//         }
//     }, 2000);
// });

// Function to handle wrong network errors
function wrongNetwork() {
    console.error("Error: You are connected to the wrong network or the contract is not deployed on this network.");
    
    // Show warning via modal or alert
    showNetworkWarning();
}

// Helper function to show network warning via modal or fallback to alert
function showNetworkWarning() {
    const modal = document.getElementById('wrongNetworkModal');
    
    // If modal element doesn't exist or Bootstrap is unavailable, show alert instead
    if (!modal || typeof bootstrap === 'undefined') {
        alert("You are connected to the wrong network. Please switch to a supported network in your wallet.");
        return;
    }
    
    // Initialize and show the modal
    const wrongNetworkModal = new bootstrap.Modal(modal);
    wrongNetworkModal.show();
    
    // Set up network switching options
    setupNetworkOptions(wrongNetworkModal);
}

// Set up click handlers for network options
function setupNetworkOptions(wrongNetworkModal) {
    const networkOptions = document.querySelectorAll('.network-option');
    
    networkOptions.forEach(option => {
        // Remove any existing event listeners to prevent duplicates
        const newOption = option.cloneNode(true);
        option.parentNode.replaceChild(newOption, option);
        
        // Add click handler
        newOption.addEventListener('click', async (event) => {
            const chainId = event.currentTarget.getAttribute('data-chain-id');
            const networkName = event.currentTarget.textContent.trim();
            
            // Save selection and close modal
            localStorage.setItem('lastChain', chainId);
            wrongNetworkModal.hide();
            
            // Show loading indicator and attempt network switch
            const loadingMessage = showLoadingMessage(networkName);
            
            try {
                await switchToNetwork(chainId, networkName, loadingMessage);
            } catch (error) {
                handleSwitchError(error, networkName, loadingMessage);
            }
        });
    });
}

// Show loading message while switching networks
function showLoadingMessage(networkName) {
    const loadingMessage = document.createElement('div');
    
    // Style the loading message
    Object.assign(loadingMessage.style, {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        background: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        borderRadius: '5px',
        zIndex: '9999'
    });
    
    loadingMessage.textContent = `Switching to ${networkName}...`;
    document.body.appendChild(loadingMessage);
    
    return loadingMessage;
}

// Attempt to switch to the selected network
async function switchToNetwork(chainId, networkName, loadingMessage) {
    // Check if ethereum provider exists
    if (!window.ethereum) {
        removeLoadingMessage(loadingMessage);
        throw new Error('No Ethereum wallet found. Please install MetaMask or another compatible wallet.');
    }
    
    try {
        // Try to switch to network
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId }]
        });
        
        // Success - reload page after a short delay
        console.log(`Successfully switched to ${networkName}`);
        setTimeout(() => window.location.reload(), 1000);
        
    } catch (error) {
        // If network needs to be added first
        if (error.code === 4902) {
            await addNetwork(chainId, networkName);
        } else {
            removeLoadingMessage(loadingMessage);
            throw error;
        }
    }
}

// Add a network that's not already in the wallet
async function addNetwork(chainId, networkName) {
    const networkDetails = getNetworkDetailsForChainId(chainId);
    
    if (!networkDetails) {
        throw new Error(`Network details not found for chain ID ${chainId}`);
    }
    
    // Add the network to wallet
    await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [networkDetails]
    });
    
    // Success - reload page after a short delay
    console.log(`Successfully added and switched to ${networkName}`);
    setTimeout(() => window.location.reload(), 1000);
}

// Handle errors during network switching
function handleSwitchError(error, networkName, loadingMessage) {
    console.error('Network switching error:', error);
    removeLoadingMessage(loadingMessage);
    
    // Show appropriate error message
    if (error.message.includes('No Ethereum wallet found')) {
        alert(error.message);
    } else if (error.message.includes('Network details not found')) {
        alert(error.message);
    } else {
        alert(`Error switching to ${networkName}: ${error.message}`);
    }
}

// Helper to safely remove loading message
function removeLoadingMessage(loadingMessage) {
    if (document.body.contains(loadingMessage)) {
        document.body.removeChild(loadingMessage);
    }
}

// Function to prompt user to select and switch to a supported network
async function switchNetwork() {
    try {
        // Create a modal for network selection
        const modalHtml = `
            <div class="modal fade" id="networkSelectionModal" tabindex="-1" aria-labelledby="networkSelectionModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="networkSelectionModalLabel">Select Network</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Please select one of the supported networks:</p>
                            <div class="list-group network-list">
                                <button type="button" class="list-group-item list-group-item-action network-item" data-chain-id="0x1">
                                    Ethereum Mainnet
                                </button>
                                <button type="button" class="list-group-item list-group-item-action network-item" data-chain-id="0xaa36a7">
                                    Sepolia Testnet
                                </button>
                                <button type="button" class="list-group-item list-group-item-action network-item" data-chain-id="0x89">
                                    Polygon
                                </button>
                                <button type="button" class="list-group-item list-group-item-action network-item" data-chain-id="0xa">
                                    Optimism
                                </button>
                                <button type="button" class="list-group-item list-group-item-action network-item" data-chain-id="0x2105">
                                    Base
                                </button>
                                <button type="button" class="list-group-item list-group-item-action network-item" data-chain-id="0x38">
                                    BNB Chain
                                </button>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add the modal to the document if it doesn't exist
        let modalElement = document.getElementById('networkSelectionModal');
        if (!modalElement) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = modalHtml;
            document.body.appendChild(tempDiv.firstElementChild);
            modalElement = document.getElementById('networkSelectionModal');
        }

        // Initialize and show the modal
        const networkModal = new bootstrap.Modal(modalElement);
        networkModal.show();

        // Add event listeners to network items
        const networkItems = document.querySelectorAll('.network-item');
        networkItems.forEach(item => {
            item.addEventListener('click', async function () {
                const chainId = this.getAttribute('data-chain-id');
                const networkName = this.textContent.trim();

                try {
                    // Save the selected chain ID to localStorage before doing anything else
                    localStorage.setItem('lastChain', chainId);
                    console.log(`Saved chain ID ${chainId} to localStorage`);

                    // Hide the modal
                    networkModal.hide();

                    // Show loading indicator
                    const loadingMessage = document.createElement('div');
                    loadingMessage.style.position = 'fixed';
                    loadingMessage.style.top = '50%';
                    loadingMessage.style.left = '50%';
                    loadingMessage.style.transform = 'translate(-50%, -50%)';
                    loadingMessage.style.padding = '20px';
                    loadingMessage.style.background = 'rgba(0, 0, 0, 0.7)';
                    loadingMessage.style.color = 'white';
                    loadingMessage.style.borderRadius = '5px';
                    loadingMessage.style.zIndex = '9999';
                    loadingMessage.textContent = `Switching to ${networkName}...`;
                    document.body.appendChild(loadingMessage);

                    console.log(`Attempting to switch to ${networkName} (Chain ID: ${chainId})`);

                    // Try to switch to the selected network
                    if (window.ethereum) {
                        try {
                            // Request network switch
                            await window.ethereum.request({
                                method: 'wallet_switchEthereumChain',
                                params: [{ chainId: chainId }]
                            });

                            // Success - reload the page
                            console.log(`Successfully switched to ${networkName}`);
                            setTimeout(() => {
                                window.location.reload();
                            }, 1000);
                        } catch (switchError) {
                            // This error code indicates that the chain has not been added to MetaMask
                            if (switchError.code === 4902) {
                                try {
                                    // Get network details for adding
                                    const networkDetails = getNetworkDetailsForChainId(chainId);

                                    if (networkDetails) {
                                        // Add the network
                                        await window.ethereum.request({
                                            method: 'wallet_addEthereumChain',
                                            params: [networkDetails]
                                        });

                                        // Success - reload the page
                                        console.log(`Successfully added and switched to ${networkName}`);
                                        setTimeout(() => {
                                            window.location.reload();
                                        }, 1000);
                                    } else {
                                        throw new Error(`Network details not found for chain ID ${chainId}`);
                                    }
                                } catch (addError) {
                                    console.error(`Error adding the network: ${addError.message}`);
                                    document.body.removeChild(loadingMessage);
                                    alert(`Error adding ${networkName}: ${addError.message}`);
                                }
                            } else {
                                console.error(`Error switching networks: ${switchError.message}`);
                                document.body.removeChild(loadingMessage);
                                alert(`Error switching to ${networkName}: ${switchError.message}`);
                            }
                        }
                    } else {
                        document.body.removeChild(loadingMessage);
                        alert('No Ethereum wallet found. Please install MetaMask or another compatible wallet.');
                    }
                } catch (error) {
                    console.error('Error in network selection:', error);
                    if (document.body.contains(loadingMessage)) {
                        document.body.removeChild(loadingMessage);
                    }
                    alert(`An error occurred: ${error.message}`);
                }
            });
        });

    } catch (error) {
        console.error('Error showing network selection:', error);
        alert(`An error occurred while trying to show network selection: ${error.message}`);
    }
}

// Helper function to get network details for adding to wallet
function getNetworkDetailsForChainId(chainId) {
    // Network details by chain ID
    const networkDetails = {
        // Ethereum Mainnet
        '0x1': {
            chainId: '0x1',
            chainName: 'Ethereum Mainnet',
            nativeCurrency: {
                name: 'Ether',
                symbol: 'ETH',
                decimals: 18
            },
            rpcUrls: ['https://mainnet.infura.io/v3/'],
            blockExplorerUrls: ['https://etherscan.io']
        },
        // Sepolia Testnet
        '0xaa36a7': {
            chainId: '0xaa36a7',
            chainName: 'Sepolia Testnet',
            nativeCurrency: {
                name: 'Sepolia Ether',
                symbol: 'ETH',
                decimals: 18
            },
            rpcUrls: ['https://sepolia.infura.io/v3/'],
            blockExplorerUrls: ['https://sepolia.etherscan.io']
        },
        // Polygon
        '0x89': {
            chainId: '0x89',
            chainName: 'Polygon Mainnet',
            nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18
            },
            rpcUrls: ['https://polygon-rpc.com'],
            blockExplorerUrls: ['https://polygonscan.com']
        },
        // Optimism
        '0xa': {
            chainId: '0xa',
            chainName: 'Optimism',
            nativeCurrency: {
                name: 'Ether',
                symbol: 'ETH',
                decimals: 18
            },
            rpcUrls: ['https://mainnet.optimism.io'],
            blockExplorerUrls: ['https://optimistic.etherscan.io']
        },
        // Base
        '0x2105': {
            chainId: '0x2105',
            chainName: 'Base',
            nativeCurrency: {
                name: 'Ether',
                symbol: 'ETH',
                decimals: 18
            },
            rpcUrls: ['https://mainnet.base.org'],
            blockExplorerUrls: ['https://basescan.org']
        },
        // BNB Chain
        '0x38': {
            chainId: '0x38',
            chainName: 'BNB Smart Chain',
            nativeCurrency: {
                name: 'BNB',
                symbol: 'BNB',
                decimals: 18
            },
            rpcUrls: ['https://bsc-dataseed.binance.org'],
            blockExplorerUrls: ['https://bscscan.com']
        }
    };

    return networkDetails[chainId];
}
