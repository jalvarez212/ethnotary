

checkConnectedNetwork().then(function () {



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

	


});


