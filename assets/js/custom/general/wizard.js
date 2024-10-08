"use strict";
let fv;
let currentValue = 0;
let gas;
let gasLimit;
let gasPrice;
let maxFeePerGas;
let maxPriorityFeePerGas;


//minato factory
//const factoryAddress = '0xae7DBD688062E6c5161402860175fB2ba4B0Bd6F'

const factoryAddress = '0x5a57e6f432c6bd3a50506edc79e839dd53f6600e';

const factoryABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "newFee",
                "type": "uint256"
            }
        ],
        "name": "changeFee",
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
        "name": "newMSA",
        "outputs": [
            {
                "internalType": "contract MultiSigAccount",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
]

// async function getGas(method) {

//     gas = await method.estimateGas({ from: selectAddress });

//     let feeHistory = await web3.eth.getFeeHistory(1, 'latest', [10, 90]);
//     // Get the gas price
//     let baseFeePerGas = await parseInt(feeHistory.baseFeePerGas[0]);
//     maxPriorityFeePerGas = await web3.utils.toWei('2', 'gwei'); // Default to 2 gwei, you can adjust this

//     // Calculate the maxFeePerGas (base fee + max priority fee)
//     maxFeePerGas = await baseFeePerGas + parseInt(maxPriorityFeePerGas);
// }

async function getGas(dat, senderAddress, val) {
    // gas = await factoryContractMethod.estimateGas({
    //     from: selectAddress,
    //     value: value
    // });

    gasLimit = await web3.eth.estimateGas({
        from: senderAddress,    // Address sending the transaction
        to: factoryAddress,    // Contract or recipient address
        data: dat,             // The encoded ABI data for contract interaction (if any)
        value: val // The amount of ETH being sent (if any)
    });

    console.log('Gas Limit: ' + gasLimit)

    // Get current gas price
    gasPrice = await web3.eth.getGasPrice();

    // Calculate maxFeePerGas and maxPriorityFeePerGas (for EIP-1559 transactions)
    maxPriorityFeePerGas = web3.utils.toWei('2', 'gwei'); // Adjust as needed
    maxFeePerGas = BigInt(gasPrice) + BigInt(maxPriorityFeePerGas);

    console.log('gas limit: ' + gasLimit)
    console.log('gasprice: ' + gasPrice)
    console.log('maxfeepergas: ' + maxFeePerGas)
    console.log('maxpriorityfeepergas: ' + maxPriorityFeePerGas)


}


// Initialize the contract
const factoryContract = new web3.eth.Contract(factoryABI, factoryAddress);

// Prepare the transaction data
function getAccountOwners() {
    const owners = [];
    const ownerElements = document.querySelectorAll('#reviewContainer .form-text');

    ownerElements.forEach((element) => {
        owners.push(element.textContent.trim());
    });

    return owners;
}

async function waitForReceipt(txHash) {
    return new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
            try {
                const receipt = await web3.eth.getTransactionReceipt(txHash);
                if (receipt) {
                    console.log(receipt)
                    clearInterval(interval); // Stop polling when the receipt is found
                    resolve(receipt); // Resolve with the receipt
                }
            } catch (error) {
                // Instead of rejecting immediately, let's retry
                console.log('Error fetching receipt, retrying in 2 seconds:', error);
            }
        }, 2000); // Poll every 2 seconds
    });
}


var KTWizardPage = (function () {
    var t,
        e,
        o,
        r,
        i = [];
    return {
        init: function () {
            (t = document.querySelector("#kt_stepper")),
                (e = document.querySelector("#kt_stepper_form")),
                (o = document.querySelector('[data-kt-stepper-action="submit"]')),
                (r = new KTStepper(t)).on("kt.stepper.next", function (t) {
                    console.log("stepper.next");
                    var e = i[t.getCurrentStepIndex() - 1];
                    e
                        ? e.validate().then(function (e) {
                            // console.log("validated!"),
                            "Valid" == e
                                ? (t.goNext(), KTUtil.scrollTop())
                                : Swal.fire({
                                    text: "Looks like there are some missing fields, please complete all the required fields.",
                                    icon: "error",
                                    buttonsStyling: !1,
                                    confirmButtonText: "Ok, got it!",
                                    customClass: { confirmButton: "btn fw-bold btn-light" },
                                }).then(function () {
                                    KTUtil.scrollTop();
                                });
                        })
                        : (t.goNext(), KTUtil.scrollTop());
                }),
                r.on("kt.stepper.previous", function (t) {
                    //console.log("stepper.previous"),
                    t.goPrevious(), KTUtil.scrollTop();
                }),
                o.addEventListener("click", async function (t) {
                    t.preventDefault();


                    // Request accounts
                    const accounts = await wallet.request({ method: 'eth_requestAccounts' });
                    if (!accounts || accounts.length === 0) {
                        console.error('No accounts found. Please connect your Ethereum wallet.');
                        return; // Exit if no accounts are found
                    }

                    const selectAddress = accounts[0];
                    console.log(selectAddress) // Use the first account in the list
                    let owners = getAccountOwners(); // Extract owners from #reviewContainer
                    console.log(owners)
                    let required = parseInt(selectCount);
                    console.log(required)
                    let pin = parseInt(selectPin);
                    console.log(pin)

                    let data = factoryContract.methods.newMSA(owners, '1', '1').encodeABI();
                    console.log(data);

   

                    // Get gas-related values
                    // await getGas(data, selectAddress, web3.utils.toWei('0.02', 'ether'));

                    let latestBlock = await web3.eth.getBlock('latest');

                    

                    let maxPriorityFeePerGas = web3.utils.toWei('2', 'gwei'); // Example: 2 Gwei tip

                    let baseFeePerGas = latestBlock.baseFeePerGas;


                    let maxFeePerGas = web3.utils.toNumber(baseFeePerGas) + web3.utils.toNumber(maxPriorityFeePerGas);
                    let buffer = web3.utils.toNumber(1.2) 

                    


                    gasLimit = await web3.eth.estimateGas({
                        from: selectAddress,    // Address sending the transaction
                        to: factoryAddress,    // Contract or recipient address
                        data: data,             // The encoded ABI data for contract interaction (if any)
                        value: '0x470DE4DF820000' 
                    });

                    console.log('gl: '+ gasLimit)
                
                    

                    // Construct the transaction parameters
                    const txParams = {
                        to: factoryAddress,
                        from: selectAddress,
                        data: data,
                        value: '0x470DE4DF820000', // Sends 0.02 Ether
                       // gasLimit: web3.utils.toHex(web3.utils.toNumber(gasLimit) * buffer),
                       // maxFeePerGas: web3.utils.toHex(maxFeePerGas),
                        //maxPriorityFeePerGas: web3.utils.toHex(maxPriorityFeePerGas)



                        // maxFeePerGas: web3.utils.toHex(maxFeePerGas),
                        // maxPriorityFeePerGas: web3.utils.toHex(maxPriorityFeePerGas),
                    };
                    console.log(txParams)



                    //Send the transaction
                    wallet.request({
                        method: 'eth_sendTransaction',
                        params: [txParams],
                    })
                    .then(async (txHash) => {
                        console.log('Transaction Hash:', txHash);
                        startProcessingAnimation();
                        
                        // Wait for the transaction to be mined and get the receipt
                        let receipt = await waitForReceipt(txHash)
                        
                        // Get the new contract address from the receipt
                        let newContractAddress = '0x'+ receipt.logs[0].data.slice(receipt.logs[0].data.length - 40);
                        console.log('New Contract Address:', newContractAddress);
                        
                        // Update the confirm button with the new contract address in the href
                       
                        setTimeout(showSuccessAnimation, 6000);
                        setTimeout(hideAnimations, 8700);

                        setTimeout(function () {
                            Swal.fire({
                                text: "Your contract has been published to the blockchain!",
                                icon: "success",
                                showCancelButton: !0,
                                buttonsStyling: !1,
                                confirmButtonText: `<a href="${window.location.origin}?${newContractAddress}" target="_blank">Go to Contract Dashboard</a>`,
                                cancelButtonText: "Get Support",
                                customClass: { 
                                    confirmButton: "btn fw-bold btn-primary sendtxn", 
                                    cancelButton: "btn fw-bold btn-active-light-primary" 
                                },
                            }).then(function (t) {
                                t.value
                                    ? e.submit()
                                    : Swal.fire({
                                        text: "Your form has not been submitted!.",
                                        icon: "error",
                                        buttonsStyling: !1,
                                        confirmButtonText: "Ok, got it!",
                                        customClass: { confirmButton: "btn fw-bold btn-primary" }
                                    });
                            });
                        }, 8900);
                    
                    })
                    .catch((error) => {
                        console.error('Transaction failed:', error);
                        hideAnimations(); // Hide animations immediately if there's an error
                    });
                }),
                i.push(
                    FormValidation.formValidation(e, {
                        fields: { 'radio_buttons_1[]': { validators: { choice: { min: 1, max: 1, message: 'Please choose a contract type.' } } } },
                        plugins: { trigger: new FormValidation.plugins.Trigger(), bootstrap: new FormValidation.plugins.Bootstrap5({ eleValidClass: "", rowSelector: ".fv" }) },
                    })
                ),
                i.push(
                    FormValidation.formValidation(e, {
                        fields: { comnpanyname: { validators: { notEmpty: { message: "Account name is required" } } } },
                        plugins: { trigger: new FormValidation.plugins.Trigger(), bootstrap: new FormValidation.plugins.Bootstrap5({ eleValidClass: "", rowSelector: ".fv-row" }) },
                    })
                ),
                i.push(
                    FormValidation.formValidation(e, {
                        fields: {
                            Owners: { validators: { notEmpty: { message: "Please enter a # of owners" } } },
                            Requirement: { validators: { notEmpty: { message: "Please enter a requirement #" } } },
                            Pin: { validators: { notEmpty: { message: "Pin is required" } } },
                        },
                        plugins: { trigger: new FormValidation.plugins.Trigger(), bootstrap: new FormValidation.plugins.Bootstrap5({ eleValidClass: "", rowSelector: ".fv-row" }) },
                    })
                ),
                i.push(
                    FormValidation.formValidation(e, {
                        fields: {
                            'owneraddress[]': { validators: { notEmpty: { message: "Please enter a owners" } } }
                        },
                        plugins: { trigger: new FormValidation.plugins.Trigger(), bootstrap: new FormValidation.plugins.Bootstrap5({ eleValidClass: "", rowSelector: ".fv-row" }) },
                    })
                ),

                fv = i;

        },
    };
})();
KTUtil.onDOMContentLoaded(function () {
    KTWizardPage.init();
});


function clearArray(arr) {
    arr.length = 0;
}


let radio1 = document.getElementById('kt_radio_buttons_1_option_1');
radio1.addEventListener('click', function () {

    let contractType = document.getElementById('review_type')
    contractType.innerText = this.value;

})


document.addEventListener('DOMContentLoaded', function () {
    const initialField = document.getElementById('initialField');
    const additionalFieldsContainer = document.getElementById('additionalFields');
    const nextButton = document.getElementById('listener');

    nextButton.addEventListener('click', function () {
        // Clear existing fields every time the input value changes
        const numberOfFields = parseInt(initialField.value, 10) || null;

        console.log(`numberOfFields: ` + numberOfFields + ` currentValue: ` + currentValue);




        if (currentValue === numberOfFields) {

            let reviewContainer = document.getElementById('reviewContainer');
            reviewContainer.innerHTML = '';

            let companyname = document.getElementById('companyname');
            let review_name = document.getElementById('review_name').innerText;

            let Pin = document.getElementById('Pin');
            let review_pin = document.getElementById('review_pin').innerText;

            let Owner = document.getElementById('initialField');
            let review_owner = document.getElementById('review_owners').innerText;

            let Requirement = document.getElementById('Requirement');
            let review_requirement = document.getElementById('review_requirement').innerText;


            for (let i = 0; i < numberOfFields; i++) {

                const reviewInput = document.createElement('div');
                reviewInput.classList.add("fv-row");
                reviewInput.classList.add("mb-10");
                let f = `owner_` + i;
                let put = document.getElementById(f);

                reviewInput.innerHTML = `
                        <label class="fs-6 form-label fw-bolder text-dark form-label">Account Owner: </label>
            
                        <span class="form-text ">${put.value}</span>
                `

                reviewContainer.appendChild(reviewInput);


            }

        }


        if (currentValue != numberOfFields) {
            console.log(fv);
            clearArray(fv[3].elements['owneraddress[]']);
            fv[3].results.clear();


            additionalFieldsContainer.innerHTML = `
            <div class="pb-10 pb-lg-15">
            <h3 class="fw-bolder text-dark display-6">Add Owners</h3>
            <div class="text-muted fw-bold fs-3">Enter addresses that will own this account</div>
            </div>
            `;

            currentValue = numberOfFields;


            for (let i = 0; i < numberOfFields; i++) {
                console.log('i: ' + i)
                console.log('numberOFFIelds: ' + numberOfFields)
                let f = `owner_` + i;
                let q = `owneraddress[${i}]`




                const newInput = document.createElement('div');
                newInput.classList.add("fv-row");
                newInput.classList.add("mb-10");

                newInput.innerHTML = `<label class="fs-6 form-label fw-bolder text-dark">Owner
                </label>
                <input type="text" class="form-control form-control-lg form-control-solid" name="owneraddress[${i}]" placeholder="Provide an owner address." value=""/ id="${f}">`

                additionalFieldsContainer.appendChild(newInput);


                let put = document.getElementById(f);
                fv[3].elements[`owneraddress[]`].push(put)



            }
            console.log(fv);




        }











    });
});



