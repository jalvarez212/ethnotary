
// Initialize Web3 connection

const web3 = new Web3('https://goerli.infura.io/v3/54458b95c9b541c09452a4a48c3d3376');


// Contract details
const contractAddress = '0x189bA69e5ECf5914D14Cc051C4D8d1A10Bb767e5';
const contractABI = [
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "transactionId",
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "transactionId",
				"type": "uint256"
			}
		],
		"name": "Submission",
		"type": "event"
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
		"stateMutability": "payable",
		"type": "receive"
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
		"inputs": [],
		"name": "owner",
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
	}
];


const contract = new web3.eth.Contract(contractABI, contractAddress);




async function isConfirmed(id){
	let confirmed = await contract.methods.isConfirmed(id).call();
	return confirmed;
}

async function parseWei(value){
	let valueInEther = await web3.utils.fromWei(value, 'ether');
	return valueInEther;
}


async function getAllTxns() {
	let count = await contract.methods.transactionCount().call().then(function(result){
		let x = Number(result);
		console.log(x)
		return x;})
    let promises = [];


	for (let i=0; i < count; i++){
		trans = await contract.methods.transactions(i).call();
		if(trans.executed==false){
			promises.push(trans);

		}	
	}
	return promises;
}

async function getConfirmed() {
	let count = await contract.methods.transactionCount().call().then(function(result){
		let x = Number(result);
		return x;})
    let promises = [];


	for (let i=0; i < count; i++){
		trans = await contract.methods.transactions(i).call();
		let confirmed = await isConfirmed(trans.id)

		if(trans.executed==false && confirmed == true){
			console.log(trans)
			promises.push(trans);

		}	
	}
	return promises;
}


async function getPending() {
	let count = await contract.methods.transactionCount().call().then(function(result){
		let x = Number(result);
		return x;})
    let promises = [];


	for (let i=0; i < count; i++){
		trans = await contract.methods.transactions(i).call();
		let confirmed = await isConfirmed(trans.id)
		if(trans.executed==false && confirmed == false){
			promises.push(trans);

		}	
	}
	return promises;
}








async function processPending(promise, container) {
	
    try {


		let pending = await promise;

		



		
        for (const tx of pending) {
			let status = await isConfirmed(tx.id);
			let value = await parseWei(tx.value);
		

            const txElement = document.createElement('tr');

            txElement.innerHTML =               `
			<td class="px-0 py-3">
				<div class="symbol symbol-55px mt-1 me-5">
					<span class="symbol-label bg-light-primary align-items-end">
						<img alt="Logo" src="assets/media/svg/avatars/001-boy.svg" class="mh-40px" />
					</span>
				</div>
			</td>
			<td class="px-0">
				<a href="#" class="text-gray-800 fw-bolder text-hover-primary fs-6">To:</a>
				<span class="text-muted fw-bold d-block mt-1">${tx.dest}</span>
			</td>
			<td></td>
			<td class="text-end">
				<span class="text-gray-800 fw-bolder d-block fs-6">Value</span>
				<span class="text-muted fw-bold d-block mt-1 fs-7" style="font-size: 12px;">${value+" eth"}</span>
			</td>

			<td class="text-end">
				<span class="text-gray-800 fw-bolder d-block fs-6">Confirmed</span>
				<span class="text-muted fw-bold d-block mt-1 fs-7" style="font-size: 12px;">${status}</span>
			</td>
			<td class="text-end pe-0">
				<a href="#" class="btn btn-icon btn-bg-light btn-active-primary btn-sm">
					<!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg-->
					<span class="svg-icon svg-icon-4">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
							<rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="black" />
							<path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="black" />
						</svg>
					</span>
					<!--end::Svg Icon-->
				</a>
			</td>

            `;
			container.appendChild(txElement);
            }
        
    } catch (error) {
        console.error('Error in processing events:', error);
    }
}





// 

// Execute the function
// window.onload = processEvents(Alltxns, document.getElementById('main'));
// window.onload = processEvents(Confirm, document.getElementById('confirms'));
// window.onload = processEvents(Submit, document.getElementById('submits'));


window.onload = processEvents( getAllTxns(), document.getElementById('alltxns'));
window.onload = processEvents( getPending(), document.getElementById('pending'));
window.onload = processEvents( getConfirmed(), document.getElementById('confirmed'));




//window.onload = processEvents(Alltxns, document.getElementById('main'));
