

checkConnectedNetwork().then(function () {



	// const Alltxns = ['Confirmation', 'Revocation', 'Submission', 'Execution', 'ExecutionFailure', 'Deposit', 'OwnerAddition', 'OwnerRemoval', 'OwnerReplace', 'RequirementChange'];
	// const Confirm = ['Confirmation', 'Revocation'];
	// const Submit = ['Submission'];
	// const Execute = ['Execution', 'ExecutionFailure'];
	// const Deposits = ['Deposit', 'NftReceived'];
	// const Account = ['OwnerAddition', 'OwnerRemoval', 'OwnerReplace', 'RequirementChange'];

	// const ETHERSCAN_API_KEY = '85YM7F9JQIE823T4NQS2W3ZMFRUYU6DA23'; // Replace with your Etherscan API key
	// const ETHERSCAN_API_URL = 'https://api.etherscan.io/api';




	// // Contract details



	// const erc721Abi = [
	// 	{
	// 		"inputs": [
	// 			{
	// 				"internalType": "address",
	// 				"name": "from",
	// 				"type": "address"
	// 			},
	// 			{
	// 				"internalType": "address",
	// 				"name": "to",
	// 				"type": "address"
	// 			},
	// 			{
	// 				"internalType": "uint256",
	// 				"name": "tokenId",
	// 				"type": "uint256"
	// 			}
	// 		],
	// 		"name": "transferFrom",
	// 		"outputs": [],
	// 		"stateMutability": "nonpayable",
	// 		"type": "function"
	// 	}
	// ]

	// const erc20Abi = [
	// 	{
	// 		"constant": false,
	// 		"inputs": [
	// 			{
	// 				"name": "to",
	// 				"type": "address"
	// 			},
	// 			{
	// 				"name": "value",
	// 				"type": "uint256"
	// 			}
	// 		],
	// 		"name": "transfer",
	// 		"outputs": [
	// 			{
	// 				"name": "",
	// 				"type": "bool"
	// 			}
	// 		],
	// 		"payable": false,
	// 		"stateMutability": "nonpayable",
	// 		"type": "function"
	// 	}
	// ]




	// const contractABI = [
	// 	{
	// 		"inputs": [
	// 			{
	// 				"internalType": "address[]",
	// 				"name": "_owners",
	// 				"type": "address[]"
	// 			},
	// 			{
	// 				"internalType": "uint256",
	// 				"name": "_required",
	// 				"type": "uint256"
	// 			},
	// 			{
	// 				"internalType": "uint16",
	// 				"name": "_pin",
	// 				"type": "uint16"
	// 			}
	// 		],
	// 		"stateMutability": "payable",
	// 		"type": "constructor"
	// 	},
	// 	{
	// 		"anonymous": false,
	// 		"inputs": [
	// 			{
	// 				"indexed": true,
	// 				"internalType": "address",
	// 				"name": "sender",
	// 				"type": "address"
	// 			},
	// 			{
	// 				"indexed": true,
	// 				"internalType": "uint256",
	// 				"name": "transactionId",
	// 				"type": "uint256"
	// 			}
	// 		],
	// 		"name": "Confirmation",
	// 		"type": "event"
	// 	},
	// 	{
	// 		"anonymous": false,
	// 		"inputs": [
	// 			{
	// 				"indexed": false,
	// 				"internalType": "address",
	// 				"name": "sender",
	// 				"type": "address"
	// 			},
	// 			{
	// 				"indexed": false,
	// 				"internalType": "uint256",
	// 				"name": "value",
	// 				"type": "uint256"
	// 			}
	// 		],
	// 		"name": "Deposit",
	// 		"type": "event"
	// 	},
	// 	{
	// 		"anonymous": false,
	// 		"inputs": [
	// 			{
	// 				"indexed": false,
	// 				"internalType": "uint256",
	// 				"name": "transactionId",
	// 				"type": "uint256"
	// 			},
	// 			{
	// 				"indexed": true,
	// 				"internalType": "address",
	// 				"name": "to",
	// 				"type": "address"
	// 			},
	// 			{
	// 				"indexed": true,
	// 				"internalType": "uint256",
	// 				"name": "amount",
	// 				"type": "uint256"
	// 			}
	// 		],
	// 		"name": "Execution",
	// 		"type": "event"
	// 	},
	// 	{
	// 		"anonymous": false,
	// 		"inputs": [
	// 			{
	// 				"indexed": true,
	// 				"internalType": "uint256",
	// 				"name": "transactionId",
	// 				"type": "uint256"
	// 			}
	// 		],
	// 		"name": "ExecutionFailure",
	// 		"type": "event"
	// 	},
	// 	{
	// 		"anonymous": false,
	// 		"inputs": [
	// 			{
	// 				"indexed": false,
	// 				"internalType": "address",
	// 				"name": "operator",
	// 				"type": "address"
	// 			},
	// 			{
	// 				"indexed": false,
	// 				"internalType": "address",
	// 				"name": "from",
	// 				"type": "address"
	// 			},
	// 			{
	// 				"indexed": false,
	// 				"internalType": "uint256",
	// 				"name": "tokenId",
	// 				"type": "uint256"
	// 			},
	// 			{
	// 				"indexed": false,
	// 				"internalType": "bytes",
	// 				"name": "data",
	// 				"type": "bytes"
	// 			}
	// 		],
	// 		"name": "NftReceived",
	// 		"type": "event"
	// 	},
	// 	{
	// 		"anonymous": false,
	// 		"inputs": [
	// 			{
	// 				"indexed": true,
	// 				"internalType": "address",
	// 				"name": "owner",
	// 				"type": "address"
	// 			}
	// 		],
	// 		"name": "OwnerAddition",
	// 		"type": "event"
	// 	},
	// 	{
	// 		"anonymous": false,
	// 		"inputs": [
	// 			{
	// 				"indexed": true,
	// 				"internalType": "address",
	// 				"name": "owner",
	// 				"type": "address"
	// 			}
	// 		],
	// 		"name": "OwnerRemoval",
	// 		"type": "event"
	// 	},
	// 	{
	// 		"anonymous": false,
	// 		"inputs": [
	// 			{
	// 				"indexed": true,
	// 				"internalType": "address",
	// 				"name": "oldOwner",
	// 				"type": "address"
	// 			},
	// 			{
	// 				"indexed": true,
	// 				"internalType": "address",
	// 				"name": "newOwner",
	// 				"type": "address"
	// 			}
	// 		],
	// 		"name": "OwnerReplace",
	// 		"type": "event"
	// 	},
	// 	{
	// 		"anonymous": false,
	// 		"inputs": [
	// 			{
	// 				"indexed": false,
	// 				"internalType": "uint256",
	// 				"name": "required",
	// 				"type": "uint256"
	// 			}
	// 		],
	// 		"name": "RequirementChange",
	// 		"type": "event"
	// 	},
	// 	{
	// 		"anonymous": false,
	// 		"inputs": [
	// 			{
	// 				"indexed": true,
	// 				"internalType": "address",
	// 				"name": "sender",
	// 				"type": "address"
	// 			},
	// 			{
	// 				"indexed": true,
	// 				"internalType": "uint256",
	// 				"name": "transactionId",
	// 				"type": "uint256"
	// 			}
	// 		],
	// 		"name": "Revocation",
	// 		"type": "event"
	// 	},
	// 	{
	// 		"anonymous": false,
	// 		"inputs": [
	// 			{
	// 				"indexed": true,
	// 				"internalType": "uint256",
	// 				"name": "transactionId",
	// 				"type": "uint256"
	// 			},
	// 			{
	// 				"indexed": false,
	// 				"internalType": "address",
	// 				"name": "dest",
	// 				"type": "address"
	// 			},
	// 			{
	// 				"indexed": false,
	// 				"internalType": "uint256",
	// 				"name": "value",
	// 				"type": "uint256"
	// 			},
	// 			{
	// 				"indexed": false,
	// 				"internalType": "bytes",
	// 				"name": "func",
	// 				"type": "bytes"
	// 			}
	// 		],
	// 		"name": "Submission",
	// 		"type": "event"
	// 	},
	// 	{
	// 		"inputs": [],
	// 		"name": "MAX_OWNER_COUNT",
	// 		"outputs": [
	// 			{
	// 				"internalType": "uint256",
	// 				"name": "",
	// 				"type": "uint256"
	// 			}
	// 		],
	// 		"stateMutability": "view",
	// 		"type": "function"
	// 	},
	// 	{
	// 		"inputs": [
	// 			{
	// 				"internalType": "address",
	// 				"name": "accountOwner",
	// 				"type": "address"
	// 			},
	// 			{
	// 				"internalType": "uint16",
	// 				"name": "_pin",
	// 				"type": "uint16"
	// 			}
	// 		],
	// 		"name": "addOwner",
	// 		"outputs": [],
	// 		"stateMutability": "nonpayable",
	// 		"type": "function"
	// 	},
	// 	{
	// 		"inputs": [
	// 			{
	// 				"internalType": "uint256",
	// 				"name": "_required",
	// 				"type": "uint256"
	// 			}
	// 		],
	// 		"name": "changeRequirement",
	// 		"outputs": [],
	// 		"stateMutability": "nonpayable",
	// 		"type": "function"
	// 	},
	// 	{
	// 		"inputs": [
	// 			{
	// 				"internalType": "uint256",
	// 				"name": "transactionId",
	// 				"type": "uint256"
	// 			}
	// 		],
	// 		"name": "confirmTransaction",
	// 		"outputs": [],
	// 		"stateMutability": "nonpayable",
	// 		"type": "function"
	// 	},
	// 	{
	// 		"inputs": [
	// 			{
	// 				"internalType": "uint256",
	// 				"name": "",
	// 				"type": "uint256"
	// 			},
	// 			{
	// 				"internalType": "address",
	// 				"name": "",
	// 				"type": "address"
	// 			}
	// 		],
	// 		"name": "confirmations",
	// 		"outputs": [
	// 			{
	// 				"internalType": "bool",
	// 				"name": "",
	// 				"type": "bool"
	// 			}
	// 		],
	// 		"stateMutability": "view",
	// 		"type": "function"
	// 	},
	// 	{
	// 		"inputs": [
	// 			{
	// 				"internalType": "uint256",
	// 				"name": "transactionId",
	// 				"type": "uint256"
	// 			}
	// 		],
	// 		"name": "execute",
	// 		"outputs": [],
	// 		"stateMutability": "nonpayable",
	// 		"type": "function"
	// 	},
	// 	{
	// 		"inputs": [
	// 			{
	// 				"internalType": "uint256",
	// 				"name": "transactionId",
	// 				"type": "uint256"
	// 			}
	// 		],
	// 		"name": "getConfirmationCount",
	// 		"outputs": [
	// 			{
	// 				"internalType": "uint256",
	// 				"name": "count",
	// 				"type": "uint256"
	// 			}
	// 		],
	// 		"stateMutability": "view",
	// 		"type": "function"
	// 	},
	// 	{
	// 		"inputs": [
	// 			{
	// 				"internalType": "uint256",
	// 				"name": "transactionId",
	// 				"type": "uint256"
	// 			}
	// 		],
	// 		"name": "getConfirmations",
	// 		"outputs": [
	// 			{
	// 				"internalType": "address[]",
	// 				"name": "_confirmations",
	// 				"type": "address[]"
	// 			}
	// 		],
	// 		"stateMutability": "view",
	// 		"type": "function"
	// 	},
	// 	{
	// 		"inputs": [],
	// 		"name": "getOwners",
	// 		"outputs": [
	// 			{
	// 				"internalType": "address[]",
	// 				"name": "",
	// 				"type": "address[]"
	// 			}
	// 		],
	// 		"stateMutability": "view",
	// 		"type": "function"
	// 	},
	// 	{
	// 		"inputs": [
	// 			{
	// 				"internalType": "uint256",
	// 				"name": "transactionId",
	// 				"type": "uint256"
	// 			}
	// 		],
	// 		"name": "isConfirmed",
	// 		"outputs": [
	// 			{
	// 				"internalType": "bool",
	// 				"name": "",
	// 				"type": "bool"
	// 			}
	// 		],
	// 		"stateMutability": "view",
	// 		"type": "function"
	// 	},
	// 	{
	// 		"inputs": [
	// 			{
	// 				"internalType": "address",
	// 				"name": "",
	// 				"type": "address"
	// 			}
	// 		],
	// 		"name": "isOwner",
	// 		"outputs": [
	// 			{
	// 				"internalType": "bool",
	// 				"name": "",
	// 				"type": "bool"
	// 			}
	// 		],
	// 		"stateMutability": "view",
	// 		"type": "function"
	// 	},
	// 	{
	// 		"inputs": [
	// 			{
	// 				"internalType": "address",
	// 				"name": "operator",
	// 				"type": "address"
	// 			},
	// 			{
	// 				"internalType": "address",
	// 				"name": "from",
	// 				"type": "address"
	// 			},
	// 			{
	// 				"internalType": "uint256",
	// 				"name": "tokenId",
	// 				"type": "uint256"
	// 			},
	// 			{
	// 				"internalType": "bytes",
	// 				"name": "data",
	// 				"type": "bytes"
	// 			}
	// 		],
	// 		"name": "onERC721Received",
	// 		"outputs": [
	// 			{
	// 				"internalType": "bytes4",
	// 				"name": "",
	// 				"type": "bytes4"
	// 			}
	// 		],
	// 		"stateMutability": "nonpayable",
	// 		"type": "function"
	// 	},
	// 	{
	// 		"inputs": [
	// 			{
	// 				"internalType": "uint256",
	// 				"name": "",
	// 				"type": "uint256"
	// 			}
	// 		],
	// 		"name": "owners",
	// 		"outputs": [
	// 			{
	// 				"internalType": "address",
	// 				"name": "",
	// 				"type": "address"
	// 			}
	// 		],
	// 		"stateMutability": "view",
	// 		"type": "function"
	// 	},
	// 	{
	// 		"inputs": [
	// 			{
	// 				"internalType": "address",
	// 				"name": "accountOwner",
	// 				"type": "address"
	// 			},
	// 			{
	// 				"internalType": "uint16",
	// 				"name": "_pin",
	// 				"type": "uint16"
	// 			}
	// 		],
	// 		"name": "removeOwner",
	// 		"outputs": [],
	// 		"stateMutability": "nonpayable",
	// 		"type": "function"
	// 	},
	// 	{
	// 		"inputs": [
	// 			{
	// 				"internalType": "address",
	// 				"name": "accountOwner",
	// 				"type": "address"
	// 			},
	// 			{
	// 				"internalType": "address",
	// 				"name": "newOwner",
	// 				"type": "address"
	// 			},
	// 			{
	// 				"internalType": "uint16",
	// 				"name": "_pin",
	// 				"type": "uint16"
	// 			}
	// 		],
	// 		"name": "replaceOwner",
	// 		"outputs": [],
	// 		"stateMutability": "nonpayable",
	// 		"type": "function"
	// 	},
	// 	{
	// 		"inputs": [],
	// 		"name": "required",
	// 		"outputs": [
	// 			{
	// 				"internalType": "uint256",
	// 				"name": "",
	// 				"type": "uint256"
	// 			}
	// 		],
	// 		"stateMutability": "view",
	// 		"type": "function"
	// 	},
	// 	{
	// 		"inputs": [
	// 			{
	// 				"internalType": "uint256",
	// 				"name": "transactionId",
	// 				"type": "uint256"
	// 			}
	// 		],
	// 		"name": "revokeConfirmation",
	// 		"outputs": [],
	// 		"stateMutability": "nonpayable",
	// 		"type": "function"
	// 	},
	// 	{
	// 		"inputs": [
	// 			{
	// 				"internalType": "address",
	// 				"name": "dest",
	// 				"type": "address"
	// 			},
	// 			{
	// 				"internalType": "uint256",
	// 				"name": "value",
	// 				"type": "uint256"
	// 			},
	// 			{
	// 				"internalType": "bytes",
	// 				"name": "func",
	// 				"type": "bytes"
	// 			}
	// 		],
	// 		"name": "submitTransaction",
	// 		"outputs": [
	// 			{
	// 				"internalType": "uint256",
	// 				"name": "transactionId",
	// 				"type": "uint256"
	// 			}
	// 		],
	// 		"stateMutability": "nonpayable",
	// 		"type": "function"
	// 	},
	// 	{
	// 		"inputs": [
	// 			{
	// 				"internalType": "address",
	// 				"name": "erc20ContractAddress",
	// 				"type": "address"
	// 			},
	// 			{
	// 				"internalType": "address",
	// 				"name": "to",
	// 				"type": "address"
	// 			},
	// 			{
	// 				"internalType": "uint256",
	// 				"name": "amount",
	// 				"type": "uint256"
	// 			}
	// 		],
	// 		"name": "submitTransferERC20",
	// 		"outputs": [
	// 			{
	// 				"internalType": "uint256",
	// 				"name": "",
	// 				"type": "uint256"
	// 			}
	// 		],
	// 		"stateMutability": "nonpayable",
	// 		"type": "function"
	// 	},
	// 	{
	// 		"inputs": [
	// 			{
	// 				"internalType": "address",
	// 				"name": "nftContractAddress",
	// 				"type": "address"
	// 			},
	// 			{
	// 				"internalType": "address",
	// 				"name": "to",
	// 				"type": "address"
	// 			},
	// 			{
	// 				"internalType": "uint256",
	// 				"name": "tokenId",
	// 				"type": "uint256"
	// 			}
	// 		],
	// 		"name": "submitTransferNFT",
	// 		"outputs": [
	// 			{
	// 				"internalType": "uint256",
	// 				"name": "",
	// 				"type": "uint256"
	// 			}
	// 		],
	// 		"stateMutability": "nonpayable",
	// 		"type": "function"
	// 	},
	// 	{
	// 		"inputs": [],
	// 		"name": "transactionCount",
	// 		"outputs": [
	// 			{
	// 				"internalType": "uint256",
	// 				"name": "",
	// 				"type": "uint256"
	// 			}
	// 		],
	// 		"stateMutability": "view",
	// 		"type": "function"
	// 	},
	// 	{
	// 		"inputs": [
	// 			{
	// 				"internalType": "uint256",
	// 				"name": "",
	// 				"type": "uint256"
	// 			}
	// 		],
	// 		"name": "transactions",
	// 		"outputs": [
	// 			{
	// 				"internalType": "address",
	// 				"name": "dest",
	// 				"type": "address"
	// 			},
	// 			{
	// 				"internalType": "uint256",
	// 				"name": "value",
	// 				"type": "uint256"
	// 			},
	// 			{
	// 				"internalType": "bytes",
	// 				"name": "func",
	// 				"type": "bytes"
	// 			},
	// 			{
	// 				"internalType": "bool",
	// 				"name": "executed",
	// 				"type": "bool"
	// 			},
	// 			{
	// 				"internalType": "uint256",
	// 				"name": "id",
	// 				"type": "uint256"
	// 			}
	// 		],
	// 		"stateMutability": "view",
	// 		"type": "function"
	// 	},
	// 	{
	// 		"stateMutability": "payable",
	// 		"type": "receive"
	// 	}
	// ]

	// // Creating a contract instance
	// const contract = new web3.eth.Contract(contractABI, contractAddress);



	// async function findContractMethod(tx) {
	// 	// Extract method ID from the transaction input
	// 	const methodId = tx.input.slice(0, 10);

	// 	// Find the ABI entry corresponding to the method ID
	// 	const abiMethod = await contractABI.find(abiEntry => {
	// 		return abiEntry.type === 'function' && web3.eth.abi.encodeFunctionSignature(abiEntry) === methodId;
	// 	});

	// 	let deposit = 'deposit';

	// 	if (!abiMethod) {
	// 		return deposit
	// 	} else {
	// 		return abiMethod.name
	// 	}
	// }



	// async function getBlockTimestamp(blockNumber) {
	// 	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
	// 		"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	// 	try {
	// 		const block = await web3.eth.getBlock(blockNumber);
	// 		const timestamp = await block.timestamp; // Unix timestamp of the block

	// 		// Convert Unix timestamp to milliseconds (JavaScript Date uses milliseconds)
	// 		const date = await new Date(Number(timestamp) * 1000);

	// 		// Format date to a readable string
	// 		const day = await date.getDate();
	// 		const monthIndex = await date.getMonth();
	// 		const year = await date.getFullYear();

	// 		const suffixes = ['th', 'st', 'nd', 'rd'];
	// 		const relevantDigits = (day < 30) ? day % 20 : day % 30;
	// 		const suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];

	// 		let formattedDate = `${monthNames[monthIndex]} ${day}${suffix}, ${year}`;

	// 		return formattedDate;


	// 	} catch (error) {
	// 		console.error(`Error fetching block ${blockNumber}:`, error);
	// 		throw error;
	// 	}
	// }

	// async function getEventLogs(eventName) {
	// 	try {
	// 		return await contract.getPastEvents(eventName, {
	// 			fromBlock: 0,
	// 			toBlock: 'latest'
	// 		});
	// 	} catch (error) {
	// 		console.error(`Error fetching ${eventName} logs:`, error);
	// 		throw error;
	// 	}
	// }


	// async function getTransactionDetailsFromLogs(eventLogs, container) {

	// 	for (const log of eventLogs) {
	// 		const transaction = await web3.eth.getTransaction(log.transactionHash);
	// 		container.push(transaction);
	// 	}

	// 	//console.log(container)
	// 	return container;
	// }

	// function updateCount(txn) {
	// 	const txncount = document.getElementById('Txncount');

	// 	txncount.innerText = txn.length + " Txns";
	// }


	// async function processEvents(eventNames, container) {
	// 	let transactions = [];
	// 	try {



	// 		for (const eventName of eventNames) {
	// 			//console.log(`Fetching logs for event: ${eventName}`);
	// 			const logs = await getEventLogs(eventName);
	// 			//console.log(`Fetching transaction details for ${logs.length} events of type: ${eventName}`);
	// 			transactions = await getTransactionDetailsFromLogs(logs, transactions);
	// 		}

	// 		transactions.sort((a, b) => Number(b.blockNumber) - Number(a.blockNumber));


	// 		for (const tx of transactions) {

	// 			const timestamp = await getBlockTimestamp(tx.blockNumber); // Await the timestamp
	// 			const txElement = document.createElement('tr');

	// 			let method = await findContractMethod(tx);




	// 			txElement.innerHTML = `
    //             <th class="px-0 py-3" style="width: 20px;">
    //                 <div class="symbol symbol-65px me-5">
    //                     <span class="symbol-label bg-light-primary">
    //                         <!--begin::Svg Icon | path: icons/duotune/communication/com012.svg-->
    //                         <span class="svg-icon svg-icon-1 svg-icon-primary">
    //                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    //                                 <path opacity="0.3" d="M20 3H4C2.89543 3 2 3.89543 2 5V16C2 17.1046 2.89543 18 4 18H4.5C5.05228 18 5.5 18.4477 5.5 19V21.5052C5.5 22.1441 6.21212 22.5253 6.74376 22.1708L11.4885 19.0077C12.4741 18.3506 13.6321 18 14.8167 18H20C21.1046 18 22 17.1046 22 16V5C22 3.89543 21.1046 3 20 3Z" fill="black" />
    //                                 <rect x="6" y="12" width="7" height="2" rx="1" fill="black" />
    //                                 <rect x="6" y="7" width="12" height="2" rx="1" fill="black" />
    //                             </svg>
    //                         </span>
    //                         <!--end::Svg Icon-->
    //                     </span>
    //                 </div>
    //             </th>
    
    //             <td class="ps-0" style=" 
    //             text-align: left; /* Center the content */
    //             overflow: hidden; /* Hide the overflow */
    //             white-space: nowrap; /* No wrapping to a new line */
    //             text-overflow: ellipsis;">
    //                 <a href="#" class="text-gray-800 fw-bolder text-hover-primary fs-6">Txn Hash</a>
    //                 <span style=" 
    //                 width: 75px;
    //                 overflow: hidden; /* Hide overflow */
    //                 white-space: nowrap; /* Prevent text from wrapping to the next line */
    //                 text-overflow: ellipsis; /* Add ellipsis to overflow text */" class="text-muted fw-bold d-block mt-1">${tx.hash}</span>
    //             </td>
    //             <td class="ps-0" style=" /* Each cell takes up equal space */
    //             text-align: left; /* Center the content */
    //             overflow: hidden; /* Hide the overflow */
    //             white-space: nowrap; /* No wrapping to a new line */
    //             text-overflow: ellipsis;"  >
    //                 <a href="#" class="text-gray-800 fw-bolder text-hover-primary fs-6"  >Method</a>
    //                 <span style="  flex: .5; /* Set a fixed width */
    //                 overflow: hidden; /* Hide overflow */
    //                 white-space: nowrap; /* Prevent text from wrapping to the next line */
    //                 text-overflow: ellipsis; /* Add ellipsis to overflow text */"  class="text-muted fw-bold d-block mt-1">${method}</span>
    //             </td>
    //             <td class="ps-0" style="  /* Each cell takes up equal space */
    //             text-align: left; /* Center the content */
    //             overflow: hidden; /* Hide the overflow */
    //             white-space: nowrap; /* No wrapping to a new line */
    //             text-overflow: ellipsis;" >
    //                 <a href="#" class="text-gray-800 fw-bolder text-hover-primary fs-6">From</a>
    //                 <span style=" 
    //                 width: 75px;
    //                 overflow: hidden; /* Hide overflow */
    //                 white-space: nowrap; /* Prevent text from wrapping to the next line */
    //                 text-overflow: ellipsis; /* Add ellipsis to overflow text */"  class="text-muted fw-bold d-block mt-1">${tx.from}</span>
    //             </td>
    //             <td class="ps-0" style=" 
    //             width: 50px;
    //              /* Each cell takes up equal space */
    //             text-align: left; /* Center the content */
    //             overflow: hidden; /* Hide the overflow */
    //             white-space: nowrap; /* No wrapping to a new line */
    //             text-overflow: ellipsis;" >
    //                 <a href="#" class="text-gray-800 fw-bolder text-hover-primary fs-6">Timestamp</a>
    //                 <span id="${tx.blockNumber}" style=" 
                
    //                 overflow: hidden; /* Hide overflow */
    //                 white-space: nowrap; /* Prevent text from wrapping to the next line */
    //                 text-overflow: ellipsis; /* Add ellipsis to overflow text */" class="text-muted fw-bold d-block mt-1">${timestamp}</span>
    //             </td>
    //             <td class="ps-0" style="  /* Each cell takes up equal space */
    //             text-align: left; /* Center the content */
    //             overflow: hidden; /* Hide the overflow */
    //             white-space: nowrap; /* No wrapping to a new line */
    //             text-overflow: ellipsis;"  >
    //                 <a href="#" class="text-gray-800 fw-bolder text-hover-primary fs-6">Block</a>
    //                 <span style="  
    //                 flex: .5;
    //                 overflow: hidden; /* Hide overflow */
    //                 white-space: nowrap; /* Prevent text from wrapping to the next line */
    //                 text-overflow: ellipsis; /* Add ellipsis to overflow text */"   class="text-muted fw-bold d-block mt-1">${BigInt(tx.blockNumber)}</span>
    //             </td>
    //             <td class="ps-0" style="  flex: .1; /* Each cell takes up equal space */
    //             width: 55px;
    //             text-align: left; /* Center the content */
    //             overflow: hidden; /* Hide the overflow */
    //             white-space: nowrap; /* No wrapping to a new line */
    //             text-overflow: ellipsis;"  >
    //                 <a href="#" class="text-gray-800 fw-bolder text-hover-primary fs-6">Txn Fee</a>
    //                 <span style="
    //                 width: 55px;  
    //                 flex: .1;
    //                 overflow: hidden; /* Hide overflow */
    //                 white-space: nowrap; /* Prevent text from wrapping to the next line */
    //                 text-overflow: ellipsis; /* Add ellipsis to overflow text */" class="text-muted fw-bold d-block mt-1">${web3.utils.fromWei(tx.gas * tx.gasPrice, 'ether')}</span>
    //             </td>
    
                
    
    
        
    
    
    //             <td class="text-end pe-0">
    //                 <a href="./views/completetxn.html?${tx.hash}" class="btn btn-icon btn-bg-light btn-active-primary btn-sm">
    //                     <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg-->
    //                     <span class="svg-icon svg-icon-4">
    //                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    //                             <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="black" />
    //                             <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="black" />
    //                         </svg>
    //                     </span>
    //                     <!--end::Svg Icon-->
    //                 </a>
    //             </td>
    //         `;
	// 			container.appendChild(txElement);
	// 		}

	// 	} catch (error) {
	// 		console.error('Error in processing events:', error);
	// 	}
	// }

	// async function isConfirmed(id) {
	// 	let confirmed = await contract.methods.isConfirmed(id).call();
	// 	return confirmed;
	// }

	// async function parseWei(value) {
	// 	let valueInEther = await web3.utils.fromWei(value, 'ether');
	// 	return valueInEther;
	// }


	// async function getAllTxns() {
	// 	let count = await contract.methods.transactionCount().call().then(function (result) {
	// 		let x = Number(result);
	// 		return x;
	// 	})
	// 	let promises = [];


	// 	for (let i = 0; i < count; i++) {
	// 		trans = await contract.methods.transactions(i).call();
	// 		if (trans.executed == false) {
	// 			promises.push(trans);

	// 		}
	// 	}
	// 	document.getElementById('notifications').innerText = promises.length;
	// 	document.getElementById('nn').innerText = promises.length + " New Notifications";

	// 	return promises;
	// }

	// async function getConfirmed() {
	// 	let count = await contract.methods.transactionCount().call().then(result => Number(result));
	// 	let promises = [];

	// 	for (let i = 0; i < count; i++) {
	// 		let trans = await contract.methods.transactions(i).call();
	// 		let confirmed = await isConfirmed(trans.id);

	// 		if (trans.executed === false && confirmed === true) {
	// 			// Check if transaction is already in promises to avoid duplicates
	// 			if (!promises.some(t => t.id === trans.id)) {
	// 				promises.push(trans);
	// 			}
	// 		}
	// 	}
	// 	return promises;
	// }





	// async function getPending() {
	// 	let count = await contract.methods.transactionCount().call().then(result => Number(result));
	// 	let promises = [];

	// 	for (let i = 0; i < count; i++) {
	// 		let trans = await contract.methods.transactions(i).call();
	// 		let confirmed = await isConfirmed(trans.id);

	// 		if (trans.executed === false && confirmed === false) {
	// 			// Check if transaction is already in promises to avoid duplicates
	// 			if (!promises.some(t => t.id === trans.id)) {
	// 				promises.push(trans);
	// 			}
	// 		}
	// 	}
	// 	return promises;
	// }









	// async function processPending(promise, container) {

	// 	try {


	// 		let pending = await promise;
	// 		console.log(pending)






	// 		for (const tx of pending) {
	// 			let status = await isConfirmed(tx.id);
	// 			let value = await parseWei(tx.value);



	// 			const txElement = document.createElement('tr');

	// 			txElement.innerHTML = `
	// 		<td class="px-0 py-3">
	// 			<div class="symbol symbol-55px mt-1 me-5">
	// 				<span class="symbol-label bg-light-primary align-items-end">
	// 					<img alt="Logo" src="assets/media/svg/avatars/001-boy.svg" class="mh-40px" />
	// 				</span>
	// 			</div>
	// 		</td>
	// 		<td class="px-0" style="width:50px">
	// 			<a href="#" class="text-gray-800 fw-bolder text-hover-primary fs-6">To:</a>
	// 			<span class="text-muted fw-bold d-block mt-1">${tx.dest}</span>
	// 		</td>
	// 		<td></td>
	// 		<td class="text-end">
	// 			<span class="text-gray-800 fw-bolder d-block fs-6">Value</span>
	// 			<span class="text-muted fw-bold d-block mt-1 fs-7" style="font-size: 12px;">${value + " eth"}</span>
	// 		</td>

	// 		<td class="text-end">
	// 			<span class="text-gray-800 fw-bolder d-block fs-6">Confirmed</span>
	// 			<span class="text-muted fw-bold d-block mt-1 fs-7" style="font-size: 12px;">${status}</span>
	// 		</td>
	// 		<td class="text-end pe-0">
	// 			<a href="./views/txn.html?${tx.id}" class="btn btn-icon btn-bg-light btn-active-primary btn-sm">
	// 				<!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg-->
	// 				<span class="svg-icon svg-icon-4">
	// 					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
	// 						<rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="black" />
	// 						<path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="black" />
	// 					</svg>
	// 				</span>
	// 				<!--end::Svg Icon-->
	// 			</a>
	// 		</td>

    //         `




	// 				;
	// 			container.appendChild(txElement);
	// 		}

	// 	} catch (error) {
	// 		console.error('Error in processing events:', error);
	// 	}
	// }

	// async function processNotifications(promise, container) {

	// 	try {


	// 		let pending = await promise;






	// 		for (const tx of pending) {
	// 			console.log(tx)

	// 			const notElement = document.createElement('div');
	// 			notElement.classList.add('menu-item');
	// 			notElement.classList.add('mx-3');


	// 			notElement.innerHTML = `
	// 	<a href="./views/txn.html?${tx.id}" class="menu-link px-4 py-3">
	// 		<div class="symbol symbol-35px">
	// 			<span class="symbol-label bg-light-warning">
	// 				<!--begin::Svg Icon | path: icons/duotune/communication/com004.svg-->
	// 				<span class="svg-icon svg-icon-3 svg-icon-warning">
	// 					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
	// 						viewBox="0 0 24 24" fill="none">
	// 						<path opacity="0.3"
	// 							d="M14 3V20H2V3C2 2.4 2.4 2 3 2H13C13.6 2 14 2.4 14 3ZM11 13V11C11 9.7 10.2 8.59995 9 8.19995V7C9 6.4 8.6 6 8 6C7.4 6 7 6.4 7 7V8.19995C5.8 8.59995 5 9.7 5 11V13C5 13.6 4.6 14 4 14V15C4 15.6 4.4 16 5 16H11C11.6 16 12 15.6 12 15V14C11.4 14 11 13.6 11 13Z"
	// 							fill="black" />
	// 						<path
	// 							d="M2 20H14V21C14 21.6 13.6 22 13 22H3C2.4 22 2 21.6 2 21V20ZM9 3V2H7V3C7 3.6 7.4 4 8 4C8.6 4 9 3.6 9 3ZM6.5 16C6.5 16.8 7.2 17.5 8 17.5C8.8 17.5 9.5 16.8 9.5 16H6.5ZM21.7 12C21.7 11.4 21.3 11 20.7 11H17.6C17 11 16.6 11.4 16.6 12C16.6 12.6 17 13 17.6 13H20.7C21.2 13 21.7 12.6 21.7 12ZM17 8C16.6 8 16.2 7.80002 16.1 7.40002C15.9 6.90002 16.1 6.29998 16.6 6.09998L19.1 5C19.6 4.8 20.2 5 20.4 5.5C20.6 6 20.4 6.60005 19.9 6.80005L17.4 7.90002C17.3 8.00002 17.1 8 17 8ZM19.5 19.1C19.4 19.1 19.2 19.1 19.1 19L16.6 17.9C16.1 17.7 15.9 17.1 16.1 16.6C16.3 16.1 16.9 15.9 17.4 16.1L19.9 17.2C20.4 17.4 20.6 18 20.4 18.5C20.2 18.9 19.9 19.1 19.5 19.1Z"
	// 							fill="black" />
	// 					</svg>
	// 				</span>
	// 				<!--end::Svg Icon-->
	// 			</span>
	// 		</div>
	// 		<div class="ps-4" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;>
	// 			<span style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" class="menu-title fw-bold mb-1" style="width:50px">To: ${tx.dest}</span>
	// 			<span class="text-muted fw-bold d-block fs-7">Txn ID: ${tx.id}</span>
	// 		</div>
	// 	</a>

	// `
	// 			container.appendChild(notElement);


	// 		}
	// 	}
	// 	catch (error) {
	// 		console.error('Error in processing events:', error)
	// 	}



	// }


	// // Function to get Ether balance
	// async function getEtherBalance(address, container) {
	// 	const balance = await web3.eth.getBalance(address);
	// 	const ethbalance = web3.utils.fromWei(balance, 'ether');

	// 	container.innerText = ethbalance;

	// }

	// async function getEthereumPrice() {
	// 	const e_url = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';

	// 	const b_url = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=btc';


	// 	try {
	// 		const responseE = await fetch(e_url);
	// 		const responseB = await fetch(b_url);
	// 		const dataE = await responseE.json();
	// 		const dataB = await responseB.json();
	// 		const ethPrice = dataE.ethereum.usd;
	// 		const ethPriceInBtc = dataB.ethereum.btc;

	// 		document.getElementById('etherPrice').innerText = "$" + ethPrice + " @ " + ethPriceInBtc + " BTC";

	// 		const now = new Date();
	// 		const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
	// 		const timeString = now.toLocaleString('en-US', options);
	// 		document.getElementById('time').innerText = "As of " + timeString;

	// 	} catch (error) {
	// 		console.error('Error fetching Ethereum price:', error);
	// 	}
	// }

	// async function getAverageGasPrice(blockCount = 1) {
	// 	try {
	// 		let totalGasPrice = BigInt(0);
	// 		const latestBlock = await web3.eth.getBlock();


	// 		const gasPrice = BigInt(latestBlock.baseFeePerGas); // Convert to BigInt
	// 		totalGasPrice += gasPrice;


	// 		const averageGasPrice = totalGasPrice / BigInt(blockCount);
	// 		const averageGasPriceInGwei = web3.utils.fromWei(averageGasPrice.toString(), 'gwei');

	// 		console.log(`Average Gas Price for the last ${blockCount} blocks: ${averageGasPriceInGwei} Gwei`);
	// 		document.getElementById('gasPrice').innerText = averageGasPriceInGwei + ' Gwei';
	// 	} catch (error) {
	// 		console.error('Error fetching average gas price:', error);
	// 	}
	// }

	// async function getGasEstimates() {

	// 	const url = `${ETHERSCAN_API_URL}?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`;

	// 	try {
	// 		const response = await fetch(url);
	// 		const data = await response.json();

	// 		if (data.status === '1' && data.message === 'OK') {
	// 			const { SafeGasPrice, ProposeGasPrice, FastGasPrice } = data.result;

	// 			document.getElementById("gasPrice").innerText = ProposeGasPrice + " Gwei"

	// 		} else {
	// 			console.error('Error fetching gas estimates:', data.result);
	// 		}
	// 	} catch (error) {
	// 		console.error('Error:', error);
	// 	}
	// }





	// async function getBlockTransactionCount(blockNumber) {
	// 	const url = `${ETHERSCAN_API_URL}?module=proxy&action=eth_getBlockTransactionCountByNumber&tag=${blockNumber}&apikey=${ETHERSCAN_API_KEY}`;
	// 	const response = await fetch(url);
	// 	const data = await response.json();

	// 	if (data.status !== '1') {
	// 		throw new Error('Error fetching block transaction count');
	// 	}

	// 	return parseInt(data.result, 16); // Convert hex to integer
	// }




	// async function getTransactionsLastBlock(blockCount = 1) {
	// 	try {
	// 		const latest = await web3.eth.getBlock('latest');

	// 		console.log(latest);

	// 		document.getElementById("TPS").innerText = latest.transactions.length + " txns in last block.";
	// 	} catch (error) {
	// 		console.error('Error calculating transactions per second:', error);
	// 	}
	// }


	// async function getLatestBlock() {
	// 	try {
	// 		const latestBlock = await web3.eth.getBlock('latest');
	// 		console.log(latestBlock)

	// 		document.getElementById("block").innerText = latestBlock.number;
	// 	} catch (error) {
	// 		console.error('Error fetching the latest block:', error);
	// 	}
	// }

	// async function updateNetworkCongestionBar() {
	// 	const url = `${ETHERSCAN_API_URL}?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`;

	// 	try {
	// 		const response = await fetch(url);
	// 		const data = await response.json();

	// 		if (data.status === '1' && data.message === 'OK') {
	// 			const averageGasPrice = parseInt(data.result.ProposeGasPrice, 10);
	// 			updateBarGraph(averageGasPrice);
	// 		} else {
	// 			console.error('Error fetching gas prices:', data.result);
	// 		}
	// 	} catch (error) {
	// 		console.error('Error:', error);
	// 	}
	// }

	// function updateBarGraph(gasPrice) {
	// 	// Assuming gas price ranges. Adjust these based on your analysis of what constitutes low, medium, and high congestion.
	// 	const MAX_GAS_PRICE = 200; // Example value, adjust as needed
	// 	const percentage = Math.min((gasPrice / MAX_GAS_PRICE) * 100, 100);

	// 	const congestionBar = document.getElementById('percentageBar');
	// 	const congestionPercent = document.getElementById('percentage');

	// 	congestionBar.style.width = `${percentage}%`;
	// 	congestionPercent.innerText = `${percentage}%`

	// 	if (percentage < 35) {
	// 		congestionBar.classList.add('bg-primary');
	// 		congestionBar.classList.remove('bg-warning');
	// 		congestionBar.classList.remove('bg-danger');

	// 	}
	// 	if (percentage > 35 && percentage < 65) {
	// 		congestionBar.classList.add('bg-warning');
	// 		congestionBar.classList.remove('bg-light');
	// 		congestionBar.classList.remove('bg-danger');

	// 	}
	// 	if (percentage > 65) {
	// 		congestionBar.classList.add('bg-danger');
	// 		congestionBar.classList.remove('bg-light');
	// 		congestionBar.classList.remove('bg-warning');

	// 	}
	// }

	let submitTxn = document.getElementById('submitTxn');
	submitTxn.addEventListener('click', function (tokenType) {

		let to = document.getElementById('toAddress').value;
		let amt = document.getElementById('ethAmount').value;
		const amount = BigInt(parseFloat(amt) * 10**18).toString();



		let callData = contract.methods.submitTransaction(to, amount, '0x').encodeABI();
		console.log(callData);

		getGas(contract.methods.submitTransaction(to, amount, '0x'))



		wallet.request({ method: 'eth_requestAccounts' })
			.then(accounts => {
				if (accounts.length === 0) {
					console.error('No accounts found. Please connect your Ethereum wallet.');
				} else {
					const selectAddress = accounts[0]; // contractAddress is the leading one in the list

					// Contract interaction steps come here after getting the active wallet

					// console.log(						
					// 	{
					// 		selectAddress,
					// 		callData, // Ensure this is well defined in your original script
					// 		gas,
					// 		maxFeePerGas,
					// 		maxPriorityFeePerGas,
					// 		gas
					// 	}
					// )


					wallet.request({
						method: 'eth_sendTransaction',
						params: [
							{
								to: localStorage.contract, // This now dynamically points to the user's account
								from: selectAddress,
								data: callData, // Ensure this is well defined in your original script
								// gasLimit: gas,
								// maxFeePerGas: maxFeePerGas,
								// maxPriorityFeePerGas: maxPriorityFeePerGas,
								// gas: gas,
							},
						],
					})
						.then((txHash) => {
							closeModal('#kt_modal_1')
							console.log('Transaction Hash:', txHash);
							startProcessingAnimation();
							setTimeout(showSuccessAnimation, 6000);

							// Hide animations after a short delay (optional)
							setTimeout(hideAnimations, 8500);

						})
						.catch((error) => {
							console.error('Transaction failed:', error);
							// Optionally handle error animation or message here
							hideAnimations(); // Hide animations immediately if there's an error
						});
				}
			})
			.catch(error => {
				console.error('An error occurred while fetching the connected accounts.', error);
			});
	});

	let transferToken = document.getElementById('transferToken');
	transferToken.addEventListener('click', function () {


		let tokenSelect = document.getElementById('tokenHoldings2');
		let to = document.getElementById('toAddress1').value;
		let from = contractAddress;
		let tokenAddress = tokenSelect[tokenSelect.selectedIndex].getAttribute('data-add');


		if (tokenSelect[tokenSelect.selectedIndex].getAttribute('data-type') == 'erc721') {

			let id = parseInt(tokenSelect[tokenSelect.selectedIndex].getAttribute('data-id'));
			let erc721Contract = new web3.eth.Contract(erc721Abi, tokenAddress);


			let erc721Data = erc721Contract.methods.transferFrom(from, to, id).encodeABI();

			console.log(erc721Data)

			let callData = contract.methods.submitTransferNFT(tokenAddress, to, id).encodeABI();

			console.log("beep beep compute compute, here is the calldata: " + erc721Data)

			console.log('heyo heyo')

			getGas(contract.methods.submitTransferNFT(tokenAddress, to, id))
			wallet.request({ method: 'eth_requestAccounts' })
				.then(accounts => {
					if (accounts.length === 0) {
						console.error('No accounts found. Please connect your Ethereum wallet.');
					} else {
						const selectAddress = accounts[0]; // contractAddress is the leading one in the list

						// Contract interaction steps come here after getting the active wallet
						wallet.request({
							method: 'eth_sendTransaction',
							params: [
								{
									to: localStorage.contract, // This now dynamically points to the user's account
									from: selectAddress,
									data: callData, // Ensure this is well defined in your original script
									gasLimit: gas,
									maxFeePerGas: maxFeePerGas,
									maxPriorityFeePerGas: maxPriorityFeePerGas,
									gas: gas,
								},
							],
						})
							.then((txHash) => {
								closeModal('#kt_modal_2')
								console.log('Transaction Hash:', txHash);
								startProcessingAnimation();
								setTimeout(showSuccessAnimation, 6000);

								// Hide animations after a short delay (optional)
								setTimeout(hideAnimations, 8500);

							})
							.catch((error) => {
								console.error('Transaction failed:', error);
								// Optionally handle error animation or message here
								hideAnimations(); // Hide animations immediately if there's an error
							});
					}
				})
				.catch(error => {
					console.error('An error occurred while fetching the connected accounts.', error);
				});

		}
		if (tokenSelect[tokenSelect.selectedIndex].getAttribute('data-type') == 'erc20') {

			let value = parseFloat(document.getElementById('erc20Amount').value);
			let erc20Contract = new web3.eth.Contract(erc20Abi, tokenAddress);

			let decimals = parseInt(tokenSelect[tokenSelect.selectedIndex].getAttribute('data-dec'));


			const amountInSmallestUnit = web3.utils.toBigInt(value * Math.pow(10, decimals));



			let erc20Data = erc20Contract.methods.transfer(to, amountInSmallestUnit).encodeABI();

			console.log(erc20Data)

			let callData = contract.methods.submitTransferERC20(tokenAddress, to, amountInSmallestUnit).encodeABI();




			getGas(contract.methods.submitTransferERC20(tokenAddress, to, amountInSmallestUnit))
			console.log('heyo heyo')
			wallet.request({ method: 'eth_requestAccounts' })
				.then(accounts => {
					if (accounts.length === 0) {
						console.error('No accounts found. Please connect your Ethereum wallet.');
					} else {
						const selectAddress = accounts[0]; // contractAddress is the leading one in the list

						// Start the processing animation


						// Send the transaction
						wallet.request({
							method: 'eth_sendTransaction',
							params: [
								{
									to: localStorage.contract, // This now dynamically points to the user's account
									from: selectAddress,
									data: callData, // Ensure this is well defined in your original script
									gasLimit: gas,
									maxFeePerGas: maxFeePerGas,
									maxPriorityFeePerGas: maxPriorityFeePerGas,
									gas: gas,
								},
							],
						})
							.then((txHash) => {
								closeModal('#kt_modal_2')
								console.log('Transaction Hash:', txHash);
								startProcessingAnimation();
								setTimeout(showSuccessAnimation, 6000);

								// Hide animations after a short delay (optional)
								setTimeout(hideAnimations, 8500);

							})
							.catch((error) => {
								console.error('Transaction failed:', error);
								// Optionally handle error animation or message here
								hideAnimations(); // Hide animations immediately if there's an error
							});
					}
				})
				.catch(error => {
					console.error('An error occurred while fetching the connected accounts.', error);
				});

		}


	});

	// window.DOMContentLoaded = getEthereumPrice();
	// window.DOMContentLoaded = getGasEstimates();
	// window.DOMContentLoaded = getTransactionsLastBlock();
	// window.DOMContentLoaded = getLatestBlock();
	// window.DOMContentLoaded = updateNetworkCongestionBar();

	// window.onload = processPending(getAllTxns(), document.getElementById('alltxns'));
	// window.onload = processPending(getPending(), document.getElementById('pending'));
	// window.onload = processPending(getConfirmed(), document.getElementById('confirmed'));
	// window.onload = getEtherBalance(contractAddress, document.getElementById('ethbalance'));
	// window.onload = processNotifications(getAllTxns(), document.getElementById('notificationsTab'))








	// window.onload = processEvents(Alltxns, document.getElementById('main'));
	// window.onload = processEvents(Confirm, document.getElementById('confirms'));
	// window.onload = processEvents(Submit, document.getElementById('submits'));
	// window.onload = processEvents(Execute, document.getElementById('executes'));
	// window.onload = processEvents(Deposits, document.getElementById('deposits'));
	// window.onload = processEvents(Account, document.getElementById('accounts'));

	// document.getElementById("refresh").addEventListener('click', function () {
	// 	getEthereumPrice();
	// 	getTransactionsLastBlock();
	// 	getLatestBlock();
	// 	getGasEstimates();
	// 	updateNetworkCongestionBar();

	// })


	// async function fetchTokenBalances(data) {
	// 	const abiFunctions = [
	// 		{
	// 			"constant": true,
	// 			"inputs": [
	// 				{
	// 					"name": "owner",
	// 					"type": "address"
	// 				}
	// 			],
	// 			"name": "balanceOf",
	// 			"outputs": [
	// 				{
	// 					"name": "",
	// 					"type": "uint256"
	// 				}
	// 			],
	// 			"payable": false,
	// 			"stateMutability": "view",
	// 			"type": "function"
	// 		},
	// 		{
	// 			"constant": true,
	// 			"inputs": [
	// 				{
	// 					"name": "owner",
	// 					"type": "address"
	// 				},
	// 				{
	// 					"name": "index",
	// 					"type": "uint256"
	// 				}
	// 			],
	// 			"name": "tokenOfOwnerByIndex",
	// 			"outputs": [
	// 				{
	// 					"name": "",
	// 					"type": "uint256"
	// 				}
	// 			],
	// 			"payable": false,
	// 			"stateMutability": "view",
	// 			"type": "function"
	// 		},
	// 		{
	// 			"constant": false,
	// 			"inputs": [
	// 				{
	// 					"name": "to",
	// 					"type": "address"
	// 				},
	// 				{
	// 					"name": "value",
	// 					"type": "uint256"
	// 				}
	// 			],
	// 			"name": "transfer",
	// 			"outputs": [
	// 				{
	// 					"name": "",
	// 					"type": "bool"
	// 				}
	// 			],
	// 			"payable": false,
	// 			"stateMutability": "nonpayable",
	// 			"type": "function"
	// 		},

	// 		{
	// 			"constant": true,
	// 			"inputs": [],
	// 			"name": "decimals",
	// 			"outputs": [
	// 				{
	// 					"name": "",
	// 					"type": "uint8"
	// 				}
	// 			],
	// 			"payable": false,
	// 			"stateMutability": "view",
	// 			"type": "function"
	// 		}
	// 	];
	// 	document.getElementById('tokenHoldings1').innerHTML = "<option></option>";
	// 	document.getElementById('tokenHoldings2').innerHTML = "<option>Select Token</option>";



	// 	let tokens = JSON.parse(data);

	// 	console.log('these are the toks my boyy, ' + data)

	// 	for (const token of tokens) {
	// 		let tokenContract = new web3.eth.Contract(abiFunctions, token.address);
	// 		let balance = await tokenContract.methods.balanceOf(localStorage.getItem('contract')).call();

	// 		token.balance = balance.toString();



	// 		console.log('token balance =' + token.balance)
	// 		console.log(token)

	// 		if (token.balance !== '0') {


	// 			if (token.sym == 'erc721') {

	// 				let tokenId;
	// 				let optionHtml;


	// 				for (let i = 0; i < token.balance; i++) {
	// 					tokenId = await tokenContract.methods.tokenOfOwnerByIndex(contractAddress, i).call();

	// 					console.log(tokenId)
	// 					optionHtml = `<option class="${token.type}" data-id="${tokenId.toString()}" data-token="${token.type}" data-type="${token.sym}" data-add="${token.address}">#${tokenId.toString()} ${token.type}</option>`;
	// 					document.getElementById('tokenHoldings1').innerHTML += optionHtml;
	// 					document.getElementById('tokenHoldings2').innerHTML += optionHtml;

	// 				}

	// 				console.log(token.balance)

	// 			}

	// 			if (token.sym == 'erc20') {
	// 				console.log("new token: " + JSON.stringify(token))




	// 				let decimals = await tokenContract.methods.decimals().call();

	// 				const balanceBigInt = BigInt(balance);
	// 				const decimalsBigInt = BigInt(decimals);
	// 				const factor = BigInt(10) ** decimalsBigInt;
	// 				const formattedBalance = Number(balanceBigInt) / Number(factor);

	// 				//let formattedBalance = await web3.utils.fromWei(balance, 'ether') * Math.pow(10, 18 - decimals);

	// 				console.log('token balance =' + formattedBalance.toFixed(4))
	// 				console.log('decimals =' + decimals.toString())

	// 				// Constructing the option element to append to the dropdown

	// 				const optionHtml = `<option class="${token.type}" value="${formattedBalance}" data-token="${token.type}" data-type="${token.sym}" data-add="${token.address}" data-dec="${decimals.toString()}">${formattedBalance.toFixed(4)} ${token.type}</option>`;
	// 				document.getElementById('tokenHoldings1').innerHTML += optionHtml;
	// 				document.getElementById('tokenHoldings2').innerHTML += optionHtml;
	// 				//document.querySelectorAll(`.clickable`).addEventListener('click', function(){console.log('hellollloolololoo')});


	// 			}








	// 		}


	// 	}

	// 	console.log(tokens);
	// 	document.getElementsByClassName(`clickable`).forEach(element => {
	// 		element.addEventListener('click', function () { console.log('hellollloolololoo') });
	// 	});

	// }
	// fetchTokenBalances(localStorage.token_contracts);









	//   // Run the network check on page load
	//   


});


