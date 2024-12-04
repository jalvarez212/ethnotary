const Alltxns = ['Confirmation', 'Revocation', 'Submission', 'Execution', 'ExecutionFailure', 'Deposit', 'OwnerAddition', 'OwnerRemoval', 'OwnerReplace', 'RequirementChange'];
const Confirm = ['Confirmation', 'Revocation'];
const Submit = ['Submission'];
const Execute = ['Execution', 'ExecutionFailure'];
const Deposits = ['Deposit', 'NftReceived'];
const Account = ['OwnerAddition', 'OwnerRemoval', 'OwnerReplace', 'RequirementChange'];

let ETHERSCAN_API_KEY = ENV.ETHERSCAN_API_KEY; //add your free ETHERSCAN API key at https://etherscan.io/apis or visit ethnotary.io
const ETHERSCAN_API_URL = 'https://api.etherscan.io/api';




// Contract details



const erc721Abi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

const erc20Abi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "to",
                "type": "address"
            },
            {
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
]




const contractABI = [
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "_owners",
                "type": "address[]"
            },
            {
                "internalType": "uint256",
                "name": "_required",
                "type": "uint256"
            },
            {
                "internalType": "uint16",
                "name": "_pin",
                "type": "uint16"
            }
        ],
        "stateMutability": "payable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "transactionId",
                "type": "uint256"
            }
        ],
        "name": "Confirmation",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Deposit",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "transactionId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Execution",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "transactionId",
                "type": "uint256"
            }
        ],
        "name": "ExecutionFailure",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "NftReceived",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "OwnerAddition",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "OwnerRemoval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "oldOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnerReplace",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "required",
                "type": "uint256"
            }
        ],
        "name": "RequirementChange",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "transactionId",
                "type": "uint256"
            }
        ],
        "name": "Revocation",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "transactionId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "dest",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bytes",
                "name": "func",
                "type": "bytes"
            }
        ],
        "name": "Submission",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "MAX_OWNER_COUNT",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "accountOwner",
                "type": "address"
            },
            {
                "internalType": "uint16",
                "name": "_pin",
                "type": "uint16"
            }
        ],
        "name": "addOwner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_required",
                "type": "uint256"
            }
        ],
        "name": "changeRequirement",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "transactionId",
                "type": "uint256"
            }
        ],
        "name": "confirmTransaction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "confirmations",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "transactionId",
                "type": "uint256"
            }
        ],
        "name": "execute",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "transactionId",
                "type": "uint256"
            }
        ],
        "name": "getConfirmationCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "count",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "transactionId",
                "type": "uint256"
            }
        ],
        "name": "getConfirmations",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "_confirmations",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getOwners",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "transactionId",
                "type": "uint256"
            }
        ],
        "name": "isConfirmed",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "isOwner",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "onERC721Received",
        "outputs": [
            {
                "internalType": "bytes4",
                "name": "",
                "type": "bytes4"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "owners",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "accountOwner",
                "type": "address"
            },
            {
                "internalType": "uint16",
                "name": "_pin",
                "type": "uint16"
            }
        ],
        "name": "removeOwner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "accountOwner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            },
            {
                "internalType": "uint16",
                "name": "_pin",
                "type": "uint16"
            }
        ],
        "name": "replaceOwner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "required",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "transactionId",
                "type": "uint256"
            }
        ],
        "name": "revokeConfirmation",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "dest",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "func",
                "type": "bytes"
            }
        ],
        "name": "submitTransaction",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "transactionId",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "erc20ContractAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "submitTransferERC20",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "nftContractAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "submitTransferNFT",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "transactionCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "transactions",
        "outputs": [
            {
                "internalType": "address",
                "name": "dest",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "func",
                "type": "bytes"
            },
            {
                "internalType": "bool",
                "name": "executed",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
]

// 

// Define the network chain IDs and corresponding Infura RPC URLs
const networks = {
	mainnet: {
		chainId: '0x1', // Ethereum Mainnet Chain ID
		rpcUrl: 'https://mainnet.infura.io/v3/'+ENV.RPC_NODE_KEY, // For running locally replace URL with your free RPC Provider API key at https://www.infura.io/pricing or visit ethnotary.io
	},
	sepolia: {
		chainId: '0xaa36a7', // Sepolia Testnet Chain ID
		rpcUrl: 'https://sepolia.infura.io/v3/'+ENV.RPC_NODE_KEY, // For running locally replace URL with your free RPC Provider API key at https://www.infura.io/pricing or visit ethnotary.io
	},
	polygon: {
		chainId: '0x89', // Polygon Mainnet Chain ID
		rpcUrl: 'https://polygon-mainnet.infura.io/v3/'+ENV.RPC_NODE_KEY, // For running locally replace URL with your free RPC Provider API key at https://www.infura.io/pricing or visit ethnotary.io
	},
	base: {
		chainId: '0x2105', // Base Chain ID 
		rpcUrl: 'https://base-mainnet.infura.io/v3/'+ENV.RPC_NODE_KEY, // For running locally replace URL with your free RPC Provider API key at https://www.infura.io/pricing or visit ethnotary.io
	},
	bnbchain: {
		chainId: '0x38', // opBNB Mainnet Chain ID 
		rpcUrl: 'https://bsc-mainnet.infura.io/v3/'+ENV.RPC_NODE_KEY, // For running locally replace URL with your free RPC Provider API key at https://www.infura.io/pricing or visit ethnotary.io
	},
	optimism: {
		chainId: '0xa', // Optimism Mainnet Chain ID
		rpcUrl: 'https://optimism-mainnet.infura.io/v3/'+ENV.RPC_NODE_KEY, // For running locally replace URL with your free RPC Provider API key at https://www.infura.io/pricing or visit ethnotary.io
	},
};




const chainIdLookup = Object.keys(networks).reduce((lookup, networkName) => {
	const networkData = networks[networkName];
	lookup[networkData.chainId] = { name: networkName, ...networkData };
	return lookup;
}, {});


// Function to update the Web3 provider with a new RPC URL
function updateWeb3ProvidermatchedNetwork(rpcUrl) {
	web3 = new Web3(rpcUrl);
	console.log(`Web3 provider updated to: ${rpcUrl}`);

}


// Function to prompt the user to change networks
async function promptNetworkChange() {
	const options = [
		{ chainId: networks.mainnet.chainId, name: 'Mainnet' },
		{ chainId: networks.sepolia.chainId, name: 'Sepolia' },
		{ chainId: networks.polygon.chainId, name: 'Polygon' },
		{ chainId: networks.base.chainId, name: 'Base' },
		{ chainId: networks.bnbchain.chainId, name: 'Bnbchain' },
		{ chainId: networks.optimism.chainId, name: 'Optimism' }
	];

	let networkOptions = options.map(option => `${option.name} (Chain ID: ${option.chainId})`).join('\n');

	alert(`You're connected to an unsupported network. Please switch to one of the supported networks:\n\n${networkOptions}`);

}

// Creating a contract instance
