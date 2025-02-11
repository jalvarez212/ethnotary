  // ----- Global Variables -----
  let rawChainId;
  let wallet;
  let selectAddress;
  let contract;

  // Initialize Web3 connection
  let web3 = null;
  const contractAddress = '0x0053746a266c9ad6dab54e42aa77715aa83243b1';


  // Function to update the Web3 provider with a new RPC URL
  function updateWeb3Provider() {
      web3 = new Web3('https://sepolia.infura.io/v3/'+ENV.RPC_NODE_KEY );
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

  // ---- Detect network and reconnect if needed ----
  async function checkConnectedNetwork() {
      const lastWallet = localStorage.getItem('lastWallet');
      const lastChain = localStorage.getItem('lastChain');

      // If you specifically need Ethereum provider to be present for certain wallets,
      // you can conditionally handle that. For now, just do a simple check:
      if (!window.ethereum && !lastWallet) {
          console.log("No Web3 wallet detected");
          showModal(); // If you have a modal
          return;
      }

      try {
          // Use the chainIdLookup map for a direct lookup of the last chain used
          const matchedNetwork = chainIdLookup[lastChain];

          if (matchedNetwork) {
              console.log(`Reconnecting to network: ${matchedNetwork.name}`);
              updateWeb3Provider(matchedNetwork.rpcUrl);
          } else {
              console.log("Connected to an unsupported network or no chain stored.");
          }

          // Attempt to reconnect with whichever wallet was last used:
          if (lastWallet === 'Metamask') {
              connectMetaMask();
          } else if (lastWallet === 'Coinbase') {
              connectCoinbase();
          } else if (lastWallet === 'Binance') {
              connectBinance();
          } else if (lastWallet === 'Phantom') {
              connectPhantomWallet();
          } else if (lastWallet === 'okx') {
              connectOKXWallet();
          } else if (lastWallet === 'other') {
              connectWallet();
          } else {
              console.log("No recognized lastWallet found in localStorage.");
          }
      } catch (error) {
          console.error("Error during checkConnectedNetwork:", error);
          showModal(); // Show your modal or handle error UI
      }
  }

  checkConnectedNetwork();


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
      if (typeof window.ethereum !== 'undefined') {
          try {
              wallet = await MMSDK.getProvider();

              // Prompt user to connect their wallet
              const accounts = await wallet.request({ method: 'eth_requestAccounts' });
              console.log(`User's address: ${accounts[0]}`);
              selectAddress = accounts[0];

              // Set default account in web3
              web3.eth.defaultAccount = accounts[0];
              localStorage.setItem('connectedWallet', accounts[0]);

              // Store chain info
              rawChainId = await normalizeToHex(wallet.getChainId());
              localStorage.setItem('lastChain', rawChainId);
              localStorage.setItem('lastWallet', 'Metamask');
              
              detectNetworkChange(wallet);
              switchToSepolia()

              console.log("Detected Chain ID:", rawChainId);
              hideWallets(); // Hide your modal if everything is good
          }
          catch (error) {
              console.error('User denied account access or an error occurred:', error);
          }
      }
      else {
          alert('This browser is not web3 enabled, please use a different browser.');
      }
  }

  // 2) OKX
  async function connectOKXWallet() {
      try {
          if (!okxwallet) {
              throw new Error('OKX Wallet not found. Please ensure it is installed and enabled.');
          }

          console.log('Wallet object:', okxwallet);

          // Prompt user to connect
          const accounts = await okxwallet.request({ method: 'eth_requestAccounts' });
          if (accounts && accounts.length > 0) {
              const selectedAddress = accounts[0];

              wallet = window.okxwallet;
              window.okxwallet.selectedAddress = selectedAddress;
              web3.eth.defaultAccount = selectedAddress;
              localStorage.setItem('connectedWallet', selectedAddress);
              localStorage.setItem('lastWallet', 'okx');

              const rawChainId = normalizeToHex(await okxwallet.request({ method: 'eth_chainId' }));
              localStorage.setItem('lastChain', rawChainId);

              detectNetworkChange(wallet);
              switchToSepolia()

              console.log("Detected Chain ID:", rawChainId);
              hideWallets();
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

  // 3) Coinbase
  async function connectCoinbase() {
      try {
          const cbwallet = await coinbaseWallet.makeWeb3Provider(
              'https://mainnet.infura.io/v3/' + ENV.RPC_NODE_KEY,
              '1'
          );

          wallet = cbwallet;
          const accounts = await cbwallet.request({ method: 'eth_requestAccounts' });

          console.log(`User's address: ${accounts[0]}`);
          selectAddress = accounts[0];

          web3.eth.defaultAccount = accounts[0];
          localStorage.setItem('connectedWallet', selectAddress);
          localStorage.setItem('lastWallet', 'Coinbase');

          rawChainId = await normalizeToHex(wallet.getChainId());
          localStorage.setItem('lastChain', rawChainId);

          detectNetworkChange(wallet);
          switchToSepolia()

          console.log("Detected Chain ID:", rawChainId);
          hideWallets();
      } catch (error) {
          alert(error);
      }
  }

  // 4) Phantom
  async function connectPhantomWallet() {
      try {
          if (!phantom || !phantom.ethereum) {
              throw new Error('Phantom Wallet not found. Please ensure it is installed and enabled.');
          }

          console.log('Phantom wallet object:', phantom.ethereum);

          const accounts = await phantom.ethereum.request({ method: 'eth_requestAccounts' });
          if (accounts && accounts.length > 0) {
              const selectedAddress = accounts[0];

              wallet = window.phantom.ethereum;
              window.phantom.ethereum.selectedAddress = selectedAddress;
              web3.eth.defaultAccount = selectedAddress;
              localStorage.setItem('connectedWallet', selectedAddress);
              localStorage.setItem('lastWallet', 'Phantom');

              const chainIdHex = normalizeToHex(
                  await phantom.ethereum.request({ method: 'eth_chainId' })
              );
              localStorage.setItem('lastChain', chainIdHex);

              detectNetworkChange(wallet);
              switchToSepolia()

              console.log("Detected Chain ID:", chainIdHex);
              hideWallets();
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

  // 5) Binance
  async function connectBinance() {
      try {
          if (!BinanceChain) {
              throw new Error('Binance Wallet not found. Please ensure it is installed and enabled.');
          }

          if (typeof BinanceChain.request !== 'function') {
              throw new Error('Binance Chain object is not ready or improperly initialized.');
          }

          const accounts = await BinanceChain.request({ method: 'eth_requestAccounts' });
          if (accounts && accounts.length > 0) {
              const selectedAddress = accounts[0];

              wallet = BinanceChain;
              BinanceChain.selectedAddress = selectedAddress;
              localStorage.setItem('connectedWallet', selectedAddress);
              localStorage.setItem('lastWallet', 'Binance');

              const rawChainId = await BinanceChain.request({ method: 'eth_chainId' });
              localStorage.setItem('lastChain', normalizeToHex(rawChainId));

              detectNetworkChange(wallet);
              switchToSepolia()

              console.log("Detected Chain ID:", rawChainId);
              hideWallets();
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
              window.open('https://www.binance.org/en/download');
          }
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

              hideWallets();
              rawChainId = await window.ethereum.request({ method: "eth_chainId" });
              localStorage.setItem('lastChain', rawChainId);
              localStorage.setItem('lastWallet', 'other');

              // If we get the provider from window.ethereum
              wallet = window.ethereum;

              detectNetworkChange(wallet);
              switchToSepolia()

              console.log("Detected Chain ID:", rawChainId);
          } catch (error) {
              console.error('User denied account access or there was an issue:', error);
          }
      } else {
          console.log('No Ethereum provider detected. Please install or enable a web3 provider.');
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



//   checkConnectedNetwork().then(function () {
//     contract = new web3.eth.Contract(contractABI, contractAddress);
//     console.log("yoyo, this the contract :"+contract)
// });

async function switchToSepolia() {
    const sepoliaChainId = '0xaa36a7'; // Chain ID for Sepolia (in hexadecimal)
    
    if (typeof window.ethereum === 'undefined') {
        console.error('MetaMask is not installed.');
        return;
    }
    
    try {
        // Check the current network
        const currentChainId = await wallet.request({ method: 'eth_chainId' });
        if (currentChainId === sepoliaChainId) {
            console.log('Already connected to Sepolia.');
            return;
        }
        
        // Request to switch to Sepolia
        await wallet.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: sepoliaChainId }],
        });
        console.log('Switched to Sepolia network.');
    } catch (error) {
        // If the network is not added to MetaMask, you need to add it
        if (error.code === 4902) {
            try {
                await wallet.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: sepoliaChainId,
                        chainName: 'Sepolia Testnet',
                        nativeCurrency: {
                            name: 'Ethereum',
                            symbol: 'ETH',
                            decimals: 18,
                        },
                        rpcUrls: [`https://sepolia.infura.io/v3/`+ ENV.RPC_NODE_KEY], 
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


updateWeb3Provider();

checkWalletConnectionAndNetwork().then(function () {
    checkConnectedNetwork();
    contract = new web3.eth.Contract(contractABI, contractAddress);
    console.log("yoyo, this the contract :"+contract)
});

