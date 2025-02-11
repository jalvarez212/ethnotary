


switchToSepolia().then(function () {


	let submitTxn = document.getElementById('submitTxn');
	submitTxn.addEventListener('click', function (tokenType) {

		let to = document.getElementById('toAddress').value;
		let amt = document.getElementById('ethAmount').value;
		const amount = BigInt(parseFloat(amt) * 10 ** 18).toString();



		let callData = contract.methods.submitTransaction(to, amount, '0x').encodeABI();
		console.log(callData);

		getGas(contract.methods.submitTransaction(to, amount, '0x'))

		if (wallet == null) {
			showConnect()
		}
		else {
			wallet.request({ method: 'eth_requestAccounts' })
				.then(accounts => {
					if (accounts.length === 0) {
						console.error('No accounts found. Please connect your Ethereum wallet.');
					}

					else {
						const selectAddress = accounts[0]; // contractAddress is the leading one in the list

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




		}
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


