// Define animation functions globally
window.startProcessingAnimation = function() {
	console.log('startProcessingAnimation called');
	const animContainer = document.getElementById('animation-container');
	const processingAnim = document.getElementById('processing-animation');
	const successAnim = document.getElementById('success-animation');
	
	console.log('Animation elements found?', {
		animContainer: !!animContainer,
		processingAnim: !!processingAnim,
		successAnim: !!successAnim
	});
	
	// Immediately remove any existing modal backdrops
	window.removeModalBackdrops();
	
	if (animContainer && processingAnim && successAnim) {
		// Set custom z-index to ensure animation displays on top without modal backdrop
		animContainer.style.zIndex = '9999';
		animContainer.style.display = 'block';
		processingAnim.style.display = 'block';
		successAnim.style.display = 'none';
		console.log('Processing animation should now be visible');
	} else {
		console.error('Animation elements not found in the DOM');
	}
};

window.showSuccessAnimation = function() {
	console.log('showSuccessAnimation called');
	const processingAnim = document.getElementById('processing-animation');
	const successAnim = document.getElementById('success-animation');
	
	console.log('Animation elements found?', {
		processingAnim: !!processingAnim,
		successAnim: !!successAnim
	});
	
	// Immediately remove any existing modal backdrops
	window.removeModalBackdrops();
	
	if (processingAnim && successAnim) {
		processingAnim.style.display = 'none';
		successAnim.style.display = 'block';
		console.log('Success animation should now be visible');
	} else {
		console.error('Animation elements not found in the DOM');
	}
};

window.showRevokeAnimation = function() {
	console.log('showRevokeAnimation called');
	const processingAnim = document.getElementById('processing-animation');
	const revokeAnim = document.getElementById('revoke-animation');
	
	console.log('Animation elements found?', {
		processingAnim: !!processingAnim,
		revokeAnim: !!revokeAnim
	});
	
	// Immediately remove any existing modal backdrops
	window.removeModalBackdrops();
	
	if (processingAnim && revokeAnim) {
		processingAnim.style.display = 'none';
		revokeAnim.style.display = 'block';
		console.log('Revoke animation should now be visible');
	} else {
		console.error('Animation elements not found in the DOM');
	}
};

window.hideAnimations = function() {
	console.log('hideAnimations called');
	const animContainer = document.getElementById('animation-container');
	
	console.log('Animation container found?', !!animContainer);
	
	// Remove any modal backdrops
	window.removeModalBackdrops();
	
	if (animContainer) {
		animContainer.style.display = 'none';
		console.log('Animations should now be hidden');
	} else {
		console.error('Animation container not found in the DOM');
	}
};

// Make removeModalBackdrops globally accessible
window.removeModalBackdrops = function() {
	console.log('removeModalBackdrops called');
	// Remove any modal backdrops that might be lingering
	const modalBackdrops = document.querySelectorAll('.modal-backdrop');
	console.log('Found backdrop elements:', modalBackdrops.length);
	modalBackdrops.forEach(backdrop => {
		backdrop.remove();
	});
	
	// Ensure body doesn't have modal-open class
	document.body.classList.remove('modal-open');
	document.body.style.overflow = '';
	document.body.style.paddingRight = '';
};

let gas;
const priorityFeeDecimal = 1;         // 0.1 Gwei in Wei
const priorityFeeHex = '0x' + priorityFeeDecimal.toString(16);

async function getGas(method) {

	let gasLimit = await method.estimateGas({ from: selectAddress, to: contractAddress });
	gas = gasLimit
	console.log("gas: " + gas)



}

checkConnectedNetwork().then(function () {



	let submitTxn = document.getElementById('submitTxn');
	submitTxn.addEventListener('click', function (tokenType) {
		// Check if wallet is defined before proceeding
		if (typeof wallet === 'undefined' || !wallet) {
			console.error('Wallet not connected');
			showConnect();
			return;
		}

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

					wallet.request({
						method: 'eth_sendTransaction',
						params: [
							{
								to: localStorage.contract, // This now dynamically points to the user's account
								from: selectAddress,
								data: callData, // Ensure this is well defined in your original script
								gasLimit: gas,
								maxPriorityFeePerGas: priorityFeeHex,
							},
						],
					})
						.then((txHash) => {
							closeModal('#kt_modal_1')
							console.log('Transaction Hash:', txHash);
							window.startProcessingAnimation();
							
							// Poll for transaction confirmation
							const pollInterval = 5000; // 5 seconds
							const maxAttempts = 84; // 7 minutes (7 * 60 / 5 = 84)
							let attempts = 0;
							
							const pollForConfirmation = () => {
								attempts++;
								
								// Check transaction status
								web3.eth.getTransactionReceipt(txHash)
									.then(receipt => {
										if (receipt) {
											// Transaction has been mined
											if (receipt.status) {
												// Transaction succeeded
												console.log('Transaction confirmed:', receipt);
												window.showSuccessAnimation();
												setTimeout(window.hideAnimations, 2500);
											} else {
												// Transaction failed (was mined but failed)
												console.error('Transaction failed on-chain:', receipt);
												transactionFailed();
												setTimeout(window.hideAnimations, 2500);
											}
										} else if (attempts < maxAttempts) {
											// Transaction not yet mined, continue polling
											console.log(`Checking transaction status... (Attempt ${attempts}/${maxAttempts})`);
											setTimeout(pollForConfirmation, pollInterval);
										} else {
											// Exceeded max attempts
											console.error('Transaction confirmation timed out after 7 minutes');
											transactionFailed();
											setTimeout(window.hideAnimations, 2500);
										}
									})
									.catch(error => {
										console.error('Error checking transaction status:', error);
										if (attempts < maxAttempts) {
											// Retry on error
											setTimeout(pollForConfirmation, pollInterval);
										} else {
											transactionFailed();
											setTimeout(window.hideAnimations, 2500);
										}
									});
							};
							
							// Start polling
							pollForConfirmation();
						})
						.catch((error) => {
							console.error('Transaction failed:', error);
							window.startProcessingAnimation();
							transactionFailed();
							// Hide animations after a short delay
							setTimeout(window.hideAnimations, 2500);
						});
					}
				})
				.catch(error => {
					console.error('An error occurred while fetching the connected accounts.', error);
					window.startProcessingAnimation();
					transactionFailed();
					// Hide animations after a short delay
					setTimeout(window.hideAnimations, 2500);
				});
			});

	let transferToken = document.getElementById('transferToken');
	transferToken.addEventListener('click', function () {
		// Check if wallet is defined before proceeding
		if (typeof wallet === 'undefined' || !wallet) {
			console.error('Wallet not connected');
			showConnect();
			return;
		}

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
									maxPriorityFeePerGas: priorityFeeHex,
								},
							],
						})
						.then((txHash) => {
							closeModal('#kt_modal_2')
							console.log('Transaction Hash:', txHash);
							window.startProcessingAnimation();
							
							// Poll for transaction confirmation
							const pollInterval = 5000; // 5 seconds
							const maxAttempts = 84; // 7 minutes (7 * 60 / 5 = 84)
							let attempts = 0;
							
							const pollForConfirmation = () => {
								attempts++;
								
								// Check transaction status
								web3.eth.getTransactionReceipt(txHash)
									.then(receipt => {
										if (receipt) {
											// Transaction has been mined
											if (receipt.status) {
												// Transaction succeeded
												console.log('Transaction confirmed:', receipt);
												window.showSuccessAnimation();
												setTimeout(window.hideAnimations, 3500);
											} else {
												// Transaction failed (was mined but failed)
												console.error('Transaction failed on-chain:', receipt);
												transactionFailed();
												setTimeout(window.hideAnimations, 2500);
											}
										} else if (attempts < maxAttempts) {
											// Transaction not yet mined, continue polling
											console.log(`Checking transaction status... (Attempt ${attempts}/${maxAttempts})`);
											setTimeout(pollForConfirmation, pollInterval);
										} else {
											// Exceeded max attempts
											console.error('Transaction confirmation timed out after 7 minutes');
											transactionFailed();
											setTimeout(window.hideAnimations, 2500);
										}
									})
									.catch(error => {
										console.error('Error checking transaction status:', error);
										if (attempts < maxAttempts) {
											// Retry on error
											setTimeout(pollForConfirmation, pollInterval);
										} else {
											transactionFailed();
											setTimeout(window.hideAnimations, 2500);
										}
									});
							};
							
							// Start polling
							pollForConfirmation();
						})
						.catch((error) => {
							console.error('Transaction failed:', error);
							window.startProcessingAnimation();
							transactionFailed();
							// Hide animations after a short delay
							setTimeout(window.hideAnimations, 2500);
						});
					}
				})
				.catch(error => {
					console.error('An error occurred while fetching the connected accounts.', error);
					window.startProcessingAnimation();
					transactionFailed();
					// Hide animations after a short delay
					setTimeout(window.hideAnimations, 2500);
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
									maxPriorityFeePerGas: priorityFeeHex,
								},
							],
						})
						.then((txHash) => {
							closeModal('#kt_modal_3')
							console.log('Transaction Hash:', txHash);
							window.startProcessingAnimation();
							
							// Poll for transaction confirmation
							const pollInterval = 5000; // 5 seconds
							const maxAttempts = 84; // 7 minutes (7 * 60 / 5 = 84)
							let attempts = 0;
							
							const pollForConfirmation = () => {
								attempts++;
								
								// Check transaction status
								web3.eth.getTransactionReceipt(txHash)
									.then(receipt => {
										if (receipt) {
											// Transaction has been mined
											if (receipt.status) {
												// Transaction succeeded
												console.log('Transaction confirmed:', receipt);
												window.showSuccessAnimation();
												setTimeout(window.hideAnimations, 2500);
											} else {
												// Transaction failed (was mined but failed)
												console.error('Transaction failed on-chain:', receipt);
												transactionFailed();
												setTimeout(window.hideAnimations, 2500);
											}
										} else if (attempts < maxAttempts) {
											// Transaction not yet mined, continue polling
											console.log(`Checking transaction status... (Attempt ${attempts}/${maxAttempts})`);
											setTimeout(pollForConfirmation, pollInterval);
										} else {
											// Exceeded max attempts
											console.error('Transaction confirmation timed out after 7 minutes');
											transactionFailed();
											setTimeout(window.hideAnimations, 2500);
										}
									})
									.catch(error => {
										console.error('Error checking transaction status:', error);
										if (attempts < maxAttempts) {
											// Retry on error
											setTimeout(pollForConfirmation, pollInterval);
										} else {
											transactionFailed();
											setTimeout(window.hideAnimations, 2500);
										}
									});
							};
							
							// Start polling
							pollForConfirmation();
						})
						.catch((error) => {
							console.error('Transaction failed:', error);
							window.startProcessingAnimation();
							transactionFailed() 

							// Hide animations after a short delay
							setTimeout(window.hideAnimations, 2500);
		
							
						});
					}
				})
				.catch(error => {
					console.error('An error occurred while fetching the connected accounts.', error);
					window.startProcessingAnimation();
					transactionFailed();
					// Hide animations after a short delay
					setTimeout(window.hideAnimations, 2500);
					
				});

		}


	});
  


});
