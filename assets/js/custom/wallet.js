

//walletstate variables
let rawChainId;
let wallet;
let selectAddress;
let contract;

// Initialize Web3 connection
let web3;
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
        const lastWallet = localStorage.getItem('lastWallet');


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

        // 3) Save everything to localStorage
        localStorage.setItem('lastWallet', 'Metamask');
        localStorage.setItem('lastChain', chainId);
        hideModal();
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
        localStorage.setItem('lastChain', rawChainId);
        detectNetworkChange(wallet);
        console.log("Detected Chain ID:", rawChainId);

        hideModal();


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
        const wallet = window.phantom.ethereum;
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

        // 3) Save everything to localStorage
        localStorage.setItem('lastWallet', 'Phantom');
        localStorage.setItem('lastChain', chainId);

        hideModal();
    } catch (error) {
        console.error('User denied account access or error occurred:', error);
    }
}


async function connectBinance() {
    if (typeof window.BinanceChain !== 'undefined') {
        try {
            wallet = await window.BinanceChain;
            wallet.request({ method: 'eth_requestAccounts' }).then(response => {
                const accounts = response;
                console.log(`User's address is ${accounts[0]}`);
                console.log(response)
                selectAddress = this.selectAddress

                // Optionally, have the default account set for web3.js
                web3.eth.defaultAccount = accounts[0]
                localStorage.setItem('connectedWallet', accounts[0]);


            })
            const chainId = await wallet.request({ method: 'eth_chainId' });
            const matchedNetwork = chainIdLookup[chainId];
            if (matchedNetwork?.rpcUrl) {
                updateWeb3Provider(matchedNetwork.rpcUrl); // or new Web3(provider)
                console.log(`Connected to network: ${matchedNetwork.name}`);
            } else {
                console.warn("Unsupported or unknown network:", chainId);
                // Optionally fall back to a default, or show a modal
            }
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
        console.error('User denied account access or error occurred:', error);

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

            hideModal()
            const chainId = await wallet.request({ method: 'eth_chainId' });
            const matchedNetwork = chainIdLookup[chainId];
            if (matchedNetwork?.rpcUrl) {
                updateWeb3Provider(matchedNetwork.rpcUrl); // or new Web3(provider)
                console.log(`Connected to network: ${matchedNetwork.name}`);
            } else {
                console.warn("Unsupported or unknown network:", chainId);
                // Optionally fall back to a default, or show a modal
            }
            localStorage.setItem('lastChain', rawChainId);
            localStorage.setItem('lastWallet', 'other');
            detectNetworkChange(wallet);
            console.log("Detected Chain ID:", rawChainId);
        } catch (error) {
            console.error('User denied account access or there was an issue:', error);
        }
    } else {
        console.error('User denied account access or error occurred:', error);
    }
}


function getTokens(array) {

    for (i = 0; i < array.length; i++) {



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

checkWalletConnectionAndNetwork().then(function () {
    checkConnectedNetwork();
    contract = new web3.eth.Contract(contractABI, contractAddress);
    console.log("yoyo, this the contract :" + contract)
});


