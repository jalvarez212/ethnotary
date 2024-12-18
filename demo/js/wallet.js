
//walletstate variables
let rawChainId;
let wallet;
let selectAddress;
const contractAddress = '0x0053746a266c9ad6dab54e42aa77715aa83243b1';

let web3 = new Web3('https://sepolia.infura.io/v3/' + ENV.RPC_NODE_KEY);;
const contract = new web3.eth.Contract(contractABI, contractAddress);;

// Initialize Web3 connection



async function switchToSepolia() {
    const sepoliaChainId = '0xaa36a7'; // Chain ID for Sepolia (in hexadecimal)

    if (typeof window.ethereum === 'undefined') {
        console.error('MetaMask is not installed.');
        return;
    }

    try {
        // Check the current network
        const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (currentChainId === sepoliaChainId) {
            console.log('Already connected to Sepolia.');
            return;
        }

        // Request to switch to Sepolia
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: sepoliaChainId }],
        });
        console.log('Switched to Sepolia network.');
    } catch (error) {
        // If the network is not added to MetaMask, you need to add it
        if (error.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: sepoliaChainId,
                        chainName: 'Sepolia Testnet',
                        nativeCurrency: {
                            name: 'Ethereum',
                            symbol: 'ETH',
                            decimals: 18,
                        },
                        rpcUrls: ['https://sepolia.infura.io/v3/' + ENV.RPC_NODE_KEY], // Replace with a valid Sepolia RPC URL
                        blockExplorerUrls: ['https://sepolia.etherscan.io'],
                    }],
                });
                console.log('Sepolia network added and switched.');
            } catch (addError) {
                console.error('Failed to add Sepolia network:', addError);
            }
        } else {
            console.error('Error switching to Sepolia:', error);
        }
    }
}

switchToSepolia()

// Function to detect network change and re-run `checkConnectedNetwork`
function detectNetworkChange(wallet) {
    wallet.on('chainChanged', async () => {
        console.log("Network changed");
        await switchToSepolia();
    });

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
        const cbwallet = await coinbaseWallet.makeWeb3Provider('https://sepolia.infura.io/v3/' + ENV.RPC_NODE_KEY, '11155111');

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
        localStorage.setItem('lastChain', rawChainId);
        detectNetworkChange(wallet);
        console.log("Detected Chain ID:", rawChainId);


    } catch (error) {
        alert('User denied account access or an error occurred, please refresh browser and try again.');
    }

}

async function connectPhantomWallet() {
    if (typeof window.phantom !== 'undefined') {
        try {
            console.log('helllllo')
            wallet = await phantom.ethereum;
            wallet.request({ method: 'eth_requestAccounts' }).then(response => {
                selectAddress = wallet.selectedAddress;
                // Optionally, have the default account set for web3.js
                web3.eth.defaultAccount = wallet.selectedAddress;
                localStorage.setItem('connectedWallet', selectedAccount);
                localStorage.setItem('lastWallet', 'Phanton');
                hideModal();

            });
            rawChainId = await normalizeToHex(wallet.getChainId());
            localStorage.setItem('lastChain', rawChainId);
            detectNetworkChange(wallet);
            console.log("Detected Chain ID:", rawChainId);


        }
        catch (error) {
            alert('User denied account access or an error occurred, please refresh browser and try again.');

        }

    }
    else {
        window.open('https://phantom.app/', '_blank');

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
            rawChainId = await normalizeToHex(await window.ethereum.request({
                "method": "eth_chainId",
            }));
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



checkWalletConnectionAndNetwork();






