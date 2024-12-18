
//walletstate variables
let rawChainId;
let wallet;
let selectAddress;
let contract;

// Initialize Web3 connection
let web3 = null;
const contractAddress = localStorage.contract;

// Function to update the Web3 provider with a new RPC URL
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

        console.log(matchedNetwork)

        if (matchedNetwork) {
            console.log(`Connected to ${matchedNetwork.name}`);
            updateWeb3Provider(matchedNetwork.rpcUrl);
        } else {
            console.log("Connected to an unsupported network");
            showModal();
        }
    } catch (error) {
        console.error("Error fetching chain ID:", error);
        showModal();
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
const MMSDK = new MetaMaskSDK.MetaMaskSDK(
    dappMetadata = {
        name: "ethnotary",
        url: "ethnotary.io",
    }
    // Other options
)
const coinbaseWallet = new CoinbaseWalletSDK({
    appName: 'ethnotary',
    appLogoUrl: 'ethnotary.io',
    darkMode: false
})


async function connectMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            wallet = await MMSDK.getProvider();

            wallet.request({ method: 'eth_requestAccounts' }).then(response => {
                const accounts = response;
                console.log(`User's address is ${accounts[0]}`);
                console.log(response)
                selectAddress = this.selectAddress

                // Optionally, have the default account set for web3.js
                web3.eth.defaultAccount = accounts[0]
                localStorage.setItem('connectedWallet', accounts[0]);


            })
            rawChainId = await normalizeToHex(wallet.getChainId());
            localStorage.setItem('lastChain', rawChainId);
            localStorage.setItem('lastWallet', 'Metamask');
            detectNetworkChange(wallet);
            console.log("Detected Chain ID:", rawChainId);
            hideModal()




        }
        catch (error) {
            console.error('User denied account access or an error occurred:', error);

        }

    }
    else {
        alert('This browser is not web3 enabled, please use a different browser.')

    }
}

// Function to connect to the user's Ethereum wallet
async function connectOKXWallet() {
    try {
        // Ensure the wallet object exists
        if (!okxwallet) {
            throw new Error('OKX Wallet not found. Please ensure it is installed and enabled.');
        }

        // Debug the wallet object
        console.log('Wallet object:', okxwallet);

        // Check if the wallet is ready
        if (typeof okxwallet.request !== 'function') {
            throw new Error('Wallet object is not ready or improperly initialized.');
        }

        // Prompt user to connect their wallet
        const accounts = await okxwallet.request({ method: 'eth_requestAccounts' });

        if (accounts && accounts.length > 0) {
            const selectedAddress = accounts[0]; // Take the first account

            // Set the selected address globally and store it
            window.okxwallet.selectedAddress = selectedAddress;
            web3.eth.defaultAccount = selectedAddress;
            localStorage.setItem('connectedWallet', selectedAddress);
            localStorage.setItem('lastWallet', 'okx');

            // Normalize chain ID and store it
            const rawChainId = normalizeToHex(await okxwallet.request({ method: 'eth_chainId' }));
            localStorage.setItem('lastChain', rawChainId);

            // Detect network changes
            detectNetworkChange(okxwallet);

            console.log("Detected Chain ID:", rawChainId);
            hideModal();
        } else {
            throw new Error('No accounts found. Connection may have been rejected.');
        }
    } catch (error) {
        if (error.code === 4001) {
            console.error('User denied connection request.');
            alert('Please approve the connection request to proceed.');
        } else {
            console.error('Error connecting wallet:', error);
            alert('An error occurred while connecting to the wallet. Please try again.');
            window.open('https://www.okx.com/download');
        }
    }
}
// Function to connect to the user's Ethereum wallet
async function connectCoinbase() {

    try {
        const cbwallet = await coinbaseWallet.makeWeb3Provider('https://mainnet.infura.io/v3/'+ENV.RPC_NODE_KEY, '1');

        wallet = await cbwallet;
        cbwallet.request({ method: 'eth_requestAccounts' }).then(response => {
            const accounts = response;
            console.log(`User's address is ${accounts[0]}`);
            selectAddress = accounts[0];

            // Optionally, have the default account set for web3.js
            web3.eth.defaultAccount = accounts[0];
            localStorage.setItem('connectedWallet', selectAddress);
            localStorage.setItem('lastWallet', 'Coinbase');


        })
        rawChainId = await normalizeToHex(wallet.getChainId());
        localStorage.setItem('lastChain', rawChainId);
        detectNetworkChange(wallet);
        console.log("Detected Chain ID:", rawChainId);


    } catch (error) {
        alert(error);
    }

}

async function connectPhantomWallet() {
    try {
        // Ensure the wallet object exists
        if (!phantom) {
            throw new Error('OKX Wallet not found. Please ensure it is installed and enabled.');
        }

        // Debug the wallet object
        console.log('Wallet object:', okxwallet);

        // Check if the wallet is ready
        if (typeof phantom.ethereum.request !== 'function') {
            throw new Error('Wallet object is not ready or improperly initialized.');
        }

        // Prompt user to connect their wallet
        const accounts = await window.phantom.ethereum.request({ method: 'eth_requestAccounts' });

        if (accounts && accounts.length > 0) {
            const selectedAddress = accounts[0]; // Take the first account

            // Set the selected address globally and store it
            window.phantom.ethereum.selectedAddress = selectedAddress;
            web3.eth.defaultAccount = selectedAddress;
            localStorage.setItem('connectedWallet', selectedAddress);
            localStorage.setItem('lastWallet', 'okx');

            // Normalize chain ID and store it
            const rawChainId = normalizeToHex(await okxwallet.request({ method: 'eth_chainId' }));
            localStorage.setItem('lastChain', rawChainId);

            // Detect network changes
            detectNetworkChange(okxwallet);

            console.log("Detected Chain ID:", rawChainId);
            hideModal();
        } else {
            throw new Error('No accounts found. Connection may have been rejected.');
        }
    } catch (error) {
        if (error.code === 4001) {
            console.error('User denied connection request.');
            alert('Please approve the connection request to proceed.');
        } else {
            console.error('Error connecting wallet:', error);
            alert('An error occurred while connecting to the wallet. Please try again.');
            window.open('https://phantom.app/');
        }
    }
}


async function connectBinance() {
    if (typeof window.BinanceChain !== 'undefined') {
        try {
            const accounts = await window.BinanceChain.request({ method: 'eth_requestAccounts' });
            console.log('Connected account:', accounts[0]);

            // Store the connected account in localStorage
            localStorage.setItem('connectedAccount', accounts[0]);

            rawChainId = await normalizeToHex(wallet.getChainId());
            localStorage.setItem('lastChain', rawChainId);
            localStorage.setItem('lastWallet', 'other');
            detectNetworkChange(wallet);
            console.log("Detected Chain ID:", rawChainId);
            hideModal()
        } catch (error) {
            console.error('User denied account access or there was an issue:', error);
        }
    } else {
        console.log('No Ethereum provider detected. Please install web3.');
    }
}

async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Connected account:', accounts[0]);

            // Store the connected account in localStorage
            localStorage.setItem('connectedAccount', accounts[0]);

            hideModal()
            rawChainId = await window.ethereum.request({
                "method": "eth_chainId",
               });
            localStorage.setItem('lastChain', rawChainId);
            localStorage.setItem('lastWallet', 'other');
            detectNetworkChange(wallet);
            console.log("Detected Chain ID:", rawChainId);
        } catch (error) {
            console.error('User denied account access or there was an issue:', error);
        }
    } else {
        console.log('No Ethereum provider detected. Please install web3.');
    }
}


function getTokens(array) {

    for (i = 0; i < array.length; i++) {



    }

}


async function checkWalletConnectionAndNetwork() {
    if (typeof wallet !== 'undefined') {
        // Check if wallet is connected
        const account = await wallet.request({ method: 'eth_accounts' });
        const chainId = await wallet.getChainId()
        console.log("Wallet is connected: ", account);
        console.log("Network is connected: ", chainId);

    } else {

        try {

            const lastWallet = localStorage.getItem('lastWallet')
            const lastChain = localStorage.getItem('lastChain')


            if (typeof lastWallet == 'undefined') {
                showModal();
            }
            if (typeof lastWallet == 'Metamask') {
                connectMetaMask();
            }
            if (typeof lastWallet == 'Coinbase') {
                connectCoinbase();

            }
            if (typeof lastWallet == 'Binance') {
                connectBinance();
            }
            if (typeof lastWallet == 'Phantom') {
                connectPhantomWallet();
            }
            if (typeof lastWallet == 'okx') {
                connectOKXWallet();
            }
            if (typeof lastWallet == 'other') {
                connectWallet();
            }

        }
        catch {
            showModal();

        }

    }
}

checkConnectedNetwork().then(function () {
    contract = new web3.eth.Contract(contractABI, contractAddress);
    console.log("yoyo, this the contract :"+contract)
});

checkWalletConnectionAndNetwork();






