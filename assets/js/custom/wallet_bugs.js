// ----- Global Variables -----
let rawChainId;
let wallet;
let selectAddress;
let contract;

// Initialize Web3 connection
let web3 = null;
const contractAddress = localStorage.contract;


function normalizeToHex(input) {
    if (typeof input === 'string' && input.startsWith('0x')) {
        return input.toLowerCase(); // Ensure lowercase for consistency
    } else if (typeof input === 'number') {
        return '0x' + input.toString(16); // Convert decimal to hex
    } else {
        throw new Error("Invalid input type: must be a hex string or a number.");
    }
}

// ---- Detect network and reconnect if needed ----
async function checkConnectedNetwork() {
    const lastWallet = localStorage.getItem('lastWallet');

    if (!lastWallet) {
        console.log("No recognized wallet to connect.");
        showModal();
        return;
    }

    try {
        // Attempt to reconnect with whichever wallet was last used:
        if (lastWallet === 'Metamask') {
            await connectMetaMask();
        } else if (lastWallet === 'Coinbase') {
            await connectCoinbase();
        } else if (lastWallet === 'Binance') {
            await connectBinance();
        } else if (lastWallet === 'Phantom') {
            await connectPhantomWallet();
        } else if (lastWallet === 'okx') {
            await connectOKXWallet();
        } else if (lastWallet === 'other') {
            await connectWallet();
        } else {
            console.log("No recognized lastWallet found in localStorage.");
        }
    } catch (error) {
        console.error("Error during checkConnectedNetwork:", error);
        showModal(); 
    }
}

// Function to detect network change and re-run `checkConnectedNetwork`
function detectNetworkChange(walletInstance) {
    if (walletInstance && typeof walletInstance.on === 'function') {
        walletInstance.on('chainChanged', async () => {
            console.log("Network changed");
            await checkConnectedNetwork();
        });
    }
}

// ----- Wallet Connectors -----

const ethers = window.ethers;
const MMSDK = new MetaMaskSDK.MetaMaskSDK(
    dappMetadata = {
        name: "ethnotary",
        url: "ethnotary.io",
    }
    // Other options
);

const coinbaseWallet = new CoinbaseWalletSDK({
    appName: 'ethnotary',
    appLogoUrl: 'ethnotary.io',
    darkMode: false
});

// 1) Metamask
async function connectMetaMask() {
    if (typeof window.ethereum === 'undefined') {
        showModal();
        return;
    }

    try {
        // 1) Connect to wallet
        wallet = await MMSDK.getProvider();
        const accounts = await wallet.request({ method: 'eth_requestAccounts' });
        // 2) Get chain ID and update Web3
        const chainId = await wallet.request({ method: 'eth_chainId' });
        const matchedNetwork = chainIdLookup[chainId];
        if (matchedNetwork?.rpcUrl) {
            updateWeb3Provider(matchedNetwork.rpcUrl); // or new Web3(provider)
            console.log(`Reconnecting to network: ${matchedNetwork.name}`);
        } else {
            console.warn("Unsupported or unknown network:", chainId);
            // Optionally fall back to a default, or show a modal
        }

        // 3) Save everything to localStorage
        localStorage.setItem('lastWallet', 'Metamask');
        localStorage.setItem('lastChain', chainId);

        hideModal();
    } catch (error) {
        console.error('User denied account access or error occurred:', error);
        showModal();
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
        const accounts = await wallet.request({ method: 'eth_requestAccounts' });
        // 2) Get chain ID and update Web3
        const chainId = await wallet.request({ method: 'eth_chainId' });
        const matchedNetwork = chainIdLookup[chainId];
        if (matchedNetwork?.rpcUrl) {
            updateWeb3Provider(matchedNetwork.rpcUrl); // or new Web3(provider)
            console.log(`Reconnecting to network: ${matchedNetwork.name}`);
        } else {
            console.warn("Unsupported or unknown network:", chainId);
            // Optionally fall back to a default, or show a modal
        }

        // 3) Save everything to localStorage
        localStorage.setItem('lastWallet', 'okx');
        localStorage.setItem('lastChain', chainId);

        hideModal();
    } catch (error) {
        console.error('User denied account access or error occurred:', error);
        showModal();
    }
}


// 3) Coinbase
async function connectCoinbase() {
    if (typeof window.ethereum === 'undefined') {
        showModal();
        return;
    }

    try {
        // 1) Connect to wallet
        const wallet = await coinbaseWallet.makeWeb3Provider(
            'https://mainnet.infura.io/v3/' + ENV.RPC_NODE_KEY,
            '1'
        );
        const accounts = await wallet.request({ method: 'eth_requestAccounts' });
        // 2) Get chain ID and update Web3
        const chainId = await wallet.request({ method: 'eth_chainId' });
        const matchedNetwork = chainIdLookup[chainId];
        if (matchedNetwork?.rpcUrl) {
            updateWeb3Provider(matchedNetwork.rpcUrl); // or new Web3(provider)
            console.log(`Reconnecting to network: ${matchedNetwork.name}`);
        } else {
            console.warn("Unsupported or unknown network:", chainId);
            // Optionally fall back to a default, or show a modal
        }

        // 3) Save everything to localStorage
        localStorage.setItem('lastWallet', 'Coinbase');
        localStorage.setItem('lastChain', chainId);

        hideModal();
    } catch (error) {
        console.error('User denied account access or error occurred:', error);
        showModal();
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
        const wallet = window.phantom.ethereum;
        const accounts = await wallet.request({ method: 'eth_requestAccounts' });
        // 2) Get chain ID and update Web3
        const chainId = await wallet.request({ method: 'eth_chainId' });
        const matchedNetwork = chainIdLookup[chainId];
        if (matchedNetwork?.rpcUrl) {
            updateWeb3Provider(matchedNetwork.rpcUrl); // or new Web3(provider)
            console.log(`Reconnecting to network: ${matchedNetwork.name}`);
        } else {
            console.warn("Unsupported or unknown network:", chainId);
            // Optionally fall back to a default, or show a modal
        }

        // 3) Save everything to localStorage
        localStorage.setItem('lastWallet', 'Phantom');
        localStorage.setItem('lastChain', chainId);

        hideModal();
    } catch (error) {
        console.error('User denied account access or error occurred:', error);
        showModal();
    }
}

// 5) Binance

async function connectBinance() {
    if (typeof window.ethereum === 'undefined') {
        showModal();
        return;
    }

    try {
        // 1) Connect to wallet
        const wallet = window.BinanceChain;
        const accounts = await wallet.request({ method: 'eth_requestAccounts' });
        // 2) Get chain ID and update Web3
        const chainId = await wallet.request({ method: 'eth_chainId' });
        const matchedNetwork = chainIdLookup[chainId];
        if (matchedNetwork?.rpcUrl) {
            updateWeb3Provider(matchedNetwork.rpcUrl); // or new Web3(provider)
            console.log(`Reconnecting to network: ${matchedNetwork.name}`);
        } else {
            console.warn("Unsupported or unknown network:", chainId);
            // Optionally fall back to a default, or show a modal
        }

        // 3) Save everything to localStorage
        localStorage.setItem('lastWallet', 'Binance');
        localStorage.setItem('lastChain', chainId);

        hideModal();
    } catch (error) {
        console.error('User denied account access or error occurred:', error);
        showModal();
    }
}

// 6) "Other" wallet
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Connected account:', accounts[0]);

            // Store the connected account in localStorage
            localStorage.setItem('connectedAccount', accounts[0]);
            rawChainId = await window.ethereum.request({ method: "eth_chainId" });
            localStorage.setItem('lastChain', rawChainId);
            localStorage.setItem('lastWallet', 'other');
            updateWeb3ProvidermatchedNetwork(wallet)


            // If we get the provider from window.ethereum
            wallet = window.ethereum;

            detectNetworkChange(wallet);
            console.log("Detected Chain ID:", rawChainId);
            checkConnectedNetwork();
            hideModal();
        } catch (error) {
            console.error('User denied account access or there was an issue:', error);
        }
    } else {
        console.log('No Ethereum provider detected. Please install or enable a web3 provider.');
    }
}



checkConnectedNetwork().then(function () {
    // Make sure web3 is not null here:
    if (web3) {
        contract = new web3.eth.Contract(contractABI, contractAddress);
        console.log("yoyo, this the contract :" + contract);
    } else {
        console.error("web3 is still null—no provider was set.");
    }
});

