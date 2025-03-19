//walletstate variables
let rawChainId;
let wallet;
let selectAddress;
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
const MMSDK = new MetaMaskSDK.MetaMaskSDK({
    dappMetadata: {
        name: "ethnotary",
        url: "https://ethnotary.io/",
    },
    infuraAPIKey: ENV.RPC_NODE_KEY,

    // Other options
})
const coinbaseWallet = new CoinbaseWalletSDK({
    appName: 'ethnotary',
    appLogoUrl: 'https://ethnotary.io/',
    darkMode: false
});

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
    if (typeof window.ethereum === 'undefined') {
        showModal();
        return;
    }

    try {
        // 1) Connect to wallet
        const accounts = await MMSDK.connect()
        let metaWallet = await MMSDK.getProvider();
        wallet = await metaWallet;
        wallet.request({ method: 'eth_requestAccounts' }).then(response => {
            const accounts = response;
            console.log(`User's address is ${accounts[0]}`);
            console.log(response)
            selectAddress = this.selectAddress

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
        localStorage.setItem('lastWallet', 'Metamask');
        localStorage.setItem('lastChain', chainId);
        hideWallets();
    } catch (error) {
        console.error('User denied account access or error occurred:', error);
    }


}
// 2) OKX

async function connectOKXWallet() {
    if (typeof window.ethereum === 'undefined') {
        showModal();
        return;
    }

    try {
        // 1) Connect to wallet
        wallet = window.okxwallet;
        wallet.request({ method: 'eth_requestAccounts' }).then(response => {
            const accounts = response;
            console.log(`User's address is ${accounts[0]}`);
            console.log(response)
            selectAddress = this.selectAddress

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
    }
}
// Function to connect to the user's Ethereum wallet
async function connectCoinbase() {

    try {
        const cbwallet = await coinbaseWallet.makeWeb3Provider('https://mainnet.infura.io/v3/' + ENV.RPC_NODE_KEY, '1');

        wallet = await cbwallet;
        wallet.request({ method: 'eth_requestAccounts' }).then(response => {
            const accounts = response;
            console.log(`User's address is ${accounts[0]}`);
            selectAddress = accounts[0];

            // Optionally, have the default account set for web3.js
            web3.eth.defaultAccount = accounts[0];
            localStorage.setItem('connectedWallet', selectAddress);
            localStorage.setItem('lastWallet', 'Coinbase');


        })
        rawChainId = await normalizeToHex(wallet.getChainId());

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
        localStorage.setItem('lastChain', rawChainId);
        console.log("Detected Chain ID:", rawChainId);

        hideWallets();


    } catch (error) {
        console.error('User denied account access or error occurred:', error);


    }

}

// 4) Phantom
async function connectPhantomWallet() {
    if (typeof window.ethereum === 'undefined') {
        showModal();
        return;
    }

    try {
        // 1) Connect to wallet
        wallet = window.phantom.ethereum;
        wallet.request({ method: 'eth_requestAccounts' }).then(response => {
            const accounts = response;
            console.log(`User's address is ${accounts[0]}`);
            console.log(response)
            selectAddress = this.selectAddress

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
    }
}



// 5) Binance

async function connectBinance() {

    if (typeof window.trustwallet !== 'undefined') {

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
        }


    }




}

async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            wallet = wallet.request({ method: 'eth_requestAccounts' }).then(response => {
                const accounts = response;
                console.log(`User's address is ${accounts[0]}`);
                console.log(response)
                selectAddress = this.selectAddress

                // Optionally, have the default account set for web3.js
                web3.eth.defaultAccount = accounts[0]
                localStorage.setItem('connectedWallet', accounts[0]);


            })
            console.log('Connected account:', accounts[0]);

            // Store the connected account in localStorage
            localStorage.setItem('connectedAccount', accounts[0]);

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

            localStorage.setItem('lastChain', rawChainId);
            localStorage.setItem('lastWallet', 'other');
            detectNetworkChange(wallet);

            hideWallets();

            console.log("Detected Chain ID:", rawChainId);
        } catch (error) {
            console.error('User denied account access or there was an issue:', error);
        }
    } else {
        console.error('User denied account access or error occurred:', error);
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

// Helper function to decide whether to show wrong network modal or wallet connect modal
async function handleNetworkOrWalletIssue() {
    if (await isWalletConnected()) {
        // Wallet is connected but wrong network
        console.log("Wallet is connected, showing wrong network modal");
        wrongNetwork();
    } else {
        // Wallet is not connected, show connect wallet modal
        console.log("Wallet is not connected, showing wallet connect modal");
        showModal();
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
window.addEventListener('DOMContentLoaded', function () {
    console.log("DOM loaded - checking contract initialization");
    // Wait a bit to ensure the contract initialization has had time to run
    setTimeout(function () {
        if (!contract || !contract.methods) {
            console.error("Contract not properly initialized on DOMContentLoaded");
            handleNetworkOrWalletIssue();
        }
    }, 2000);
});

// Function to handle wrong network errors
function wrongNetwork() {
    console.error("Error: You are connected to the wrong network or the contract is not deployed on this network.");

    // Only show the modal if it's not already visible
    const modal = document.getElementById('wrongNetworkModal');
    if (modal) {
        // Make sure Bootstrap is available
        if (typeof bootstrap !== 'undefined') {
            // Initialize the modal
            const wrongNetworkModal = new bootstrap.Modal(modal);

            // Show the modal
            wrongNetworkModal.show();

            // Add event listeners to the network options
            const networkOptions = document.querySelectorAll('.network-option');
            networkOptions.forEach(option => {
                // Remove any existing event listeners to prevent duplicates
                const newOption = option.cloneNode(true);
                option.parentNode.replaceChild(newOption, option);

                // Add click handler to each network option
                newOption.addEventListener('click', async (event) => {
                    try {
                        const chainId = event.currentTarget.getAttribute('data-chain-id');
                        const networkName = event.currentTarget.textContent.trim();

                        console.log(`Attempting to switch to ${networkName} (Chain ID: ${chainId})`);
                        
                        // Save the selected chain ID to localStorage before doing anything else
                        localStorage.setItem('lastChain', chainId);
                        console.log(`Saved chain ID ${chainId} to localStorage`);

                        // Hide the modal
                        wrongNetworkModal.hide();

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
        } else {
            // Fallback if Bootstrap is not available
            alert("You are connected to the wrong network. Please switch to a supported network in your wallet.");
        }
    } else {
        // Modal element not found - fallback to alert
        alert("You are connected to the wrong network. Please switch to a supported network in your wallet.");
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
