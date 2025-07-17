let active_tokens = [];
const providerURL = web3.currentProvider.clientUrl;


const token_card = `
    <div class="card card-bordered h-100 hover-elevate-up shadow-sm text-center">
        <!--begin::Card Header with Type Badge-->
        <div class="card-header ribbon ribbon-top ribbon-vertical">
            <div class="ribbon-label bg-primary token-type-ribbon">
                <span class="token-type fw-bold">ERC20</span>
            </div>
            <h3 class="card-title w-100 text-center">
                <span class="token-name fw-bolder fs-2 text-dark">Token Name</span>
                <div class="fs-7 text-muted mt-1"></div>
            </h3>
        </div>
        
        <!--begin::Card Body-->
        <div class="card-body p-5 d-flex flex-column align-items-center">
            <!--begin::Image-->
            <div class="bgi-no-repeat bgi-size-cover rounded min-h-150px mb-5 d-flex align-items-center justify-content-center overflow-hidden">
                <img src="" class="token-image mw-100 mx-auto" alt="Token Image" style="max-height: 150px; object-fit: contain;">
            </div>
            
            <!--begin::Token Info Panels-->
            <div class="row g-5 mb-5 w-100">
                <!--begin::Address Panel-->
                <div class="col-12">
                    <div class="bg-light-primary px-4 py-3 rounded">
                        <div class="d-flex align-items-center justify-content-center">
                            <span class="svg-icon svg-icon-primary me-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.5 11C8.98528 11 11 8.98528 11 6.5C11 4.01472 8.98528 2 6.5 2C4.01472 2 2 4.01472 2 6.5C2 8.98528 4.01472 11 6.5 11Z" fill="currentColor"/>
                                    <path opacity="0.3" d="M13 6.5C13 4 15 2 17.5 2C20 2 22 4 22 6.5C22 9 20 11 17.5 11C15 11 13 9 13 6.5ZM6.5 22C9 22 11 20 11 17.5C11 15 9 13 6.5 13C4 13 2 15 2 17.5C2 20 4 22 6.5 22ZM17.5 22C20 22 22 20 22 17.5C22 15 20 13 17.5 13C15 13 13 15 13 17.5C13 20 15 22 17.5 22Z" fill="currentColor"/>
                                </svg>
                            </span>
                            <div class="d-flex flex-column">
                                <span class="text-dark fw-bold fs-6 token-address-label">CONTRACT ADDRESS</span>
                                <span class="text-muted fw-semibold token-address" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-dark" data-bs-placement="bottom" title="">0x0000...0000</span>
                            </div>
                            <button class="btn btn-sm btn-icon btn-light-primary ms-2 copy-address-btn" data-bs-toggle="tooltip" title="Copy Address">
                                <i class="bi bi-clipboard fs-5"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!--begin::Token Metrics-->
                <div class="col-12">
                    <div class="d-flex flex-wrap justify-content-center">
                        <!--begin::Balance / Token ID-->
                        <div class="border border-gray-300 border-dashed rounded py-3 px-4 me-4 mb-3 text-center">
                            <div class="fs-7 text-muted erc20-balance-label">BALANCE</div>
                            <div class="fs-4 fw-bold token-balance">0</div>
                            <div class="fs-7 text-muted erc721-tokenid-label d-none">TOKEN ID</div>
                            <div class="fs-4 fw-bold token-id d-none">0</div>
                        </div>
                        
                        <!--begin::Symbol-->
                        <div class="border border-gray-300 border-dashed rounded py-3 px-4 mb-3 text-center">
                            <div class="fs-7 text-muted">SYMBOL</div>
                            <div class="fs-4 fw-bold token-symbol">-</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!--begin::Actions-->
            <div class="d-flex justify-content-center gap-3 mt-5 w-100">
                <a href="#" class="btn btn-sm btn-primary token-view-btn" target="_blank">
                    <span class="svg-icon svg-icon-muted svg-icon-2 me-1">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.7 18.9L18.6 15.8C17.9 16.9 16.9 17.9 15.8 18.6L18.9 21.7C19.3 22.1 19.9 22.1 20.3 21.7L21.7 20.3C22.1 19.9 22.1 19.3 21.7 18.9Z" fill="currentColor"/>
                            <path opacity="0.3" d="M11 20C6 20 2 16 2 11C2 6 6 2 11 2C16 2 20 6 20 11C20 16 16 20 11 20ZM11 4C7.1 4 4 7.1 4 11C4 14.9 7.1 18 11 18C14.9 18 18 14.9 18 11C18 7.1 14.9 4 11 4ZM8 11C8 9.3 9.3 8 11 8C11.6 8 12 7.6 12 7C12 6.4 11.6 6 11 6C8.2 6 6 8.2 6 11C6 11.6 6.4 12 7 12C7.6 12 8 11.6 8 11Z" fill="currentColor"/>
                        </svg>
                    </span>
                    View Details
                </a>
                <button id="transfer-token-btn" class="btn btn-sm btn-light-primary transfer-token-btn">
<!--begin::Svg Icon | path: assets/media/icons/duotune/general/gen016.svg-->
<span class="svg-icon svg-icon-muted svg-icon-2 me-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M15.43 8.56949L10.744 15.1395C10.6422 15.282 10.5804 15.4492 10.5651 15.6236C10.5498 15.7981 10.5815 15.9734 10.657 16.1315L13.194 21.4425C13.2737 21.6097 13.3991 21.751 13.5557 21.8499C13.7123 21.9488 13.8938 22.0014 14.079 22.0015H14.117C14.3087 21.9941 14.4941 21.9307 14.6502 21.8191C14.8062 21.7075 14.9261 21.5526 14.995 21.3735L21.933 3.33649C22.0011 3.15918 22.0164 2.96594 21.977 2.78013C21.9376 2.59432 21.8452 2.4239 21.711 2.28949L15.43 8.56949Z" fill="black"/>
<path opacity="0.3" d="M20.664 2.06648L2.62602 9.00148C2.44768 9.07085 2.29348 9.19082 2.1824 9.34663C2.07131 9.50244 2.00818 9.68731 2.00074 9.87853C1.99331 10.0697 2.04189 10.259 2.14054 10.4229C2.23919 10.5869 2.38359 10.7185 2.55601 10.8015L7.86601 13.3365C8.02383 13.4126 8.19925 13.4448 8.37382 13.4297C8.54839 13.4145 8.71565 13.3526 8.85801 13.2505L15.43 8.56548L21.711 2.28448C21.5762 2.15096 21.4055 2.05932 21.2198 2.02064C21.034 1.98196 20.8409 1.99788 20.664 2.06648Z" fill="black"/>
</svg></span>
<!--end::Svg Icon-->
                    Transfer
                </button>
            </div>
        </div>
    </div>
`;


const erc20 = [
    // Core ERC20 functionality
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
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
        "name": "totalSupply",
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
    // Non-standard function requested
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "walletOfOwner",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const erc721 = [
    // Core ERC721 functionality
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "balance",
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
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ownerOf",
        "outputs": [
            {
                "internalType": "address",
                "name": "owner",
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
    },
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
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
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
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
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
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "isApprovedForAll",
        "outputs": [
            {
                "internalType": "bool",
                "name": "approved",
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
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "getApproved",
        "outputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    // Metadata extension
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "tokenURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    // Enumerable extension
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "tokenOfOwnerByIndex",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
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
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "tokenByIndex",
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
    // Non-standard function for convenience
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "walletOfOwner",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];


function get_ethnotary() {
    try {
        let eth_notary = localStorage.getItem('contract');
        return eth_notary;
    }
    catch {
        console.error('No contract found');
    }
}



function get_tokens() {
    try {
        let string_token_contracts = localStorage.getItem('token_contracts');
        return string_token_contracts

    }
    catch {
        console.error('No token contracts found');
    }
}


async function check_balance(token_address, token_type) {
    // Clear active_tokens array to prevent duplication
    console.log('Clearing active_tokens before checking balances');
    active_tokens = [];
    
    let parsed_tokens = JSON.parse(get_tokens());
    console.log(`Processing ${parsed_tokens.length} tokens`);
    
    for (let i = 0; i < parsed_tokens.length; i++) {
        const tokenContract = new web3.eth.Contract(erc20, parsed_tokens[i].address);
        let balance = tokenContract.methods.balanceOf(localStorage.getItem('contract')).call().then(function (balance) {
            parsed_tokens[i].balance = balance;
            console.log(`Token address: ${parsed_tokens[i].address}`);
            console.log(`Balance: ${parsed_tokens[i].balance}`);
            
            if (parsed_tokens[i].balance > 0) {
                active_tokens.push(parsed_tokens[i]);
                console.log(`Added token to active_tokens, now have ${active_tokens.length} active tokens`);
            }
        });
    }
}


async function display_tokens() {
    console.log('tokentokentokentoken');
    console.log('display_tokens() called with data:', JSON.stringify(localStorage.token_contracts));

    try {
        // Get the container
        const container = document.getElementById('kt_content');
        
        if (!container) {
            console.error('Container kt_content not found');
            return;
        }
        
        // Clear ALL previous content
        container.innerHTML = '';
        
        // Double-check for any potential card containers that might have been added elsewhere
        const existingCardRows = document.querySelectorAll('.row.g-6.g-xl-9.justify-content-center');
        existingCardRows.forEach(row => row.remove());
        
        console.log('Cleared container contents');
        
        // Create a container with center alignment
        const centerContainer = document.createElement('div');
        centerContainer.className = 'container-xxl';
        container.appendChild(centerContainer);

        // Create a row for the cards with center alignment
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row g-6 g-xl-9 justify-content-center';
        centerContainer.appendChild(rowDiv);

        // Create header section with title, count and filters
        const headerDiv = document.createElement('div');
        headerDiv.className = 'col-12 mb-5';

        // Count the number of each token type
        const erc20Count = active_tokens.filter(t => t.sym && t.sym.toLowerCase() === 'erc20').length;
        
        // Calculate ERC721 count by summing up balances
        const erc721Count = active_tokens
            .filter(t => t.sym && t.sym.toLowerCase() === 'erc721')
            .reduce((total, token) => total + (parseInt(token.balance) || 1), 0);
            
        const totalCount = erc20Count + erc721Count;

        headerDiv.innerHTML = `
            <div class="d-flex flex-wrap flex-stack mb-6">
                <!--begin::Title-->
                <h3 class="text-dark fw-bolder my-2">
                    <span class="fs-6 text-gray-500 fw-semibold ms-1">(${totalCount} Tokens)</span>
                </h3>
                <!--end::Title-->
                
                <!--begin::Controls-->
                <div class="d-flex align-items-center my-2">
                    <!--begin::Status-->
                    <div class="me-5">
                        <select name="token-type" class="form-select form-select-sm token-type-select">
                            <option value="all">All Tokens (${totalCount})</option>
                            <option value="erc20">ERC20 (${erc20Count})</option>
                            <option value="erc721">ERC721 (${erc721Count})</option>
                        </select>
                    </div>
                    <!--end::Status-->
                    
                    <!--begin::Search-->
                    <div class="d-flex align-items-center position-relative">
                        <span class="svg-icon svg-icon-3 position-absolute ms-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor"></rect>
                                <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor"></path>
                            </svg>
                        </span>
                        <input type="text" class="form-control form-control-sm form-control-solid ps-10 token-search" placeholder="Search Token">
                    </div>
                    <!--end::Search-->
                </div>
                <!--end::Controls-->
            </div>
        `;
        rowDiv.appendChild(headerDiv);

        // Loop through active_tokens and create cards
        for (let i = 0; i < active_tokens.length; i++) {
            const token = await getTokenMetadata(active_tokens[i]);
            const isERC721 = token.type === 'ERC-721';
            
            // For ERC721 tokens with multiple tokenIds, create a card for each tokenId
            if (isERC721 && token.balance > 1 && token.tokenIds && token.tokenIds.length > 0) {
                // Create a card for each token ID
                for (let j = 0; j < token.tokenIds.length; j++) {
                    const tokenId = token.tokenIds[j];
                    await createTokenCard(token, rowDiv, tokenId);
                }
            } else {
                // Create a single card for this token
                await createTokenCard(token, rowDiv);
            }
        }
        
        // Function to create a token card
        async function createTokenCard(token, parentElement, specificTokenId = null) {
            // Create column for card
            const colDiv = document.createElement('div');
            colDiv.className = 'col-md-6 col-lg-4 col-xl-4'; // Exactly 3 per row
            parentElement.appendChild(colDiv);

            // Create card from template
            const cardHtml = token_card;
            colDiv.innerHTML = cardHtml;

            // Get the card element
            const card = colDiv.firstElementChild;

            if (card) {
                const isERC721 = token.type === 'ERC-721';

                // Update token name and type badge color
                const nameElement = card.querySelector('.token-name');
                if (nameElement) {
                    nameElement.textContent = token.name || 'Unknown Token';
                }

                // Update token type and ribbon color
                const typeElement = card.querySelector('.token-type');
                const ribbonElement = card.querySelector('.token-type-ribbon');
                if (typeElement && token.type) {
                    typeElement.textContent = token.type;

                    // Change ribbon color based on token type
                    if (ribbonElement) {
                        if (isERC721) {
                            ribbonElement.classList.remove('bg-primary');
                            ribbonElement.classList.add('bg-success');
                        }
                    }
                }

                // Update image if available
                const imgElement = card.querySelector('.token-image');
                if (imgElement) {
                    if (token.image) {
                        imgElement.src = await normalizeTokenURI(token.image);
                        imgElement.alt = token.name || 'Token';
                    } else {
                        // Default placeholder illustration for tokens without images
                        imgElement.src = './media/illustrations/sigma-1/5.png';
                        imgElement.alt = 'Token Placeholder';
                    }
                }

                // Update token address with truncated version and full version in tooltip
                const addressElement = card.querySelector('.token-address');
                if (addressElement && token.address) {
                    const fullAddress = token.address;
                    const truncatedAddress = fullAddress.substring(0, 6) + '...' + fullAddress.substring(fullAddress.length - 4);
                    addressElement.textContent = truncatedAddress;
                    addressElement.setAttribute('title', fullAddress);

                    // Set up copy button
                    const copyBtn = card.querySelector('.copy-address-btn');
                    if (copyBtn) {
                        copyBtn.setAttribute('data-address', fullAddress);
                        copyBtn.addEventListener('click', function () {
                            navigator.clipboard.writeText(this.getAttribute('data-address'))
                                .then(() => {
                                    // Show success feedback
                                    const tooltip = bootstrap.Tooltip.getInstance(this);
                                    if (tooltip) {
                                        tooltip.dispose();
                                    }
                                    this.setAttribute('data-bs-original-title', 'Copied!');
                                    const newTooltip = new bootstrap.Tooltip(this);
                                    newTooltip.show();

                                    // Reset after 2 seconds
                                    setTimeout(() => {
                                        this.setAttribute('data-bs-original-title', 'Copy Address');
                                        newTooltip.dispose();
                                    }, 2000);
                                });
                        });
                    }
                }

                // Update token symbol
                const symbolElement = card.querySelector('.token-symbol');
                if (symbolElement) {
                    symbolElement.textContent = token.symbol || '-';
                }

                // Handle ERC20 balance vs ERC721 token ID display
                const balanceElement = card.querySelector('.token-balance');
                const balanceLabelElement = card.querySelector('.erc20-balance-label');
                const tokenIdElement = card.querySelector('.token-id');
                const tokenIdLabelElement = card.querySelector('.erc721-tokenid-label');

                if (isERC721) {
                    // For ERC721, show token ID instead of balance
                    if (balanceElement) balanceElement.classList.add('d-none');
                    if (balanceLabelElement) balanceLabelElement.classList.add('d-none');
                    if (tokenIdElement) {
                        tokenIdElement.classList.remove('d-none');
                        // If a specific tokenId was provided, use that
                        tokenIdElement.textContent = specificTokenId || token.tokenId || token.firstTokenId || 'N/A';
                    }
                    if (tokenIdLabelElement) tokenIdLabelElement.classList.remove('d-none');
                    
                    // If we're rendering a specific token ID, we may need to fetch its specific metadata
                    if (specificTokenId && specificTokenId !== token.tokenId) {
                        try {
                            // Create contract instance
                            const contractInstance = new web3.eth.Contract(erc721, token.address);
                            
                            // Get this token's specific metadata
                            const [tokenImage, tokenMetadata] = await getTokenURIAndMetadata(contractInstance, specificTokenId);
                            
                            // Update image if available
                            if (tokenImage && imgElement) {
                                imgElement.src = await normalizeTokenURI(tokenImage);
                                imgElement.alt = token.name || 'Token';
                            }
                            
                            // Update any token-specific metadata if needed
                            if (tokenMetadata) {
                                // You could add more specific metadata display here
                            }
                        } catch (error) {
                            console.warn('Failed to get specific token metadata:', error);
                        }
                    }
                } else {
                    // For ERC20, show balance
                    if (tokenIdElement) tokenIdElement.classList.add('d-none');
                    if (tokenIdLabelElement) tokenIdLabelElement.classList.add('d-none');
                    if (balanceElement) {
                        balanceElement.classList.remove('d-none');
                        balanceElement.textContent = token.balance || '0';
                    }
                    if (balanceLabelElement) balanceLabelElement.classList.remove('d-none');
                }

                // Metadata will be displayed on another page

                // Set up the view details button to link to an explorer based on the token type
                const viewBtn = card.querySelector('.token-view-btn');
                if (viewBtn && token.address) {
                    // Get current network provider URL to determine which explorer to use
                    const providerUrl = web3.currentProvider.clientUrl || '';
                    let explorerUrl = 'https://etherscan.io'; // Default to Ethereum mainnet
                        
                    // Use appropriate explorer based on provider URL
                    if (providerUrl.includes('sepolia.infura.io')) {
                        explorerUrl = 'https://sepolia.etherscan.io';
                    } else if (providerUrl.includes('optimism-mainnet.infura.io')) {
                        explorerUrl = 'https://optimistic.etherscan.io';
                    } else if (providerUrl.includes('polygon-mainnet.infura.io') || 
                               providerUrl.includes('polygon-rpc')) {
                        explorerUrl = 'https://polygonscan.com';
                    } else if (providerUrl.includes('avalanche-mainnet.infura.io') || 
                               providerUrl.includes('avalanche')) {
                        explorerUrl = 'https://snowtrace.io';
                    } else if (providerUrl.includes('arbitrum-mainnet.infura.io')) {
                        explorerUrl = 'https://arbiscan.io';
                    } else if (providerUrl.includes('goerli.infura.io')) {
                        explorerUrl = 'https://goerli.etherscan.io';
                    } else if (providerUrl.includes('base-mainnet.infura.io')) {
                        explorerUrl = 'https://basescan.org';
                    }
                    
                    // Set up the URL
                    viewBtn.href = `${explorerUrl}/token/${token.address}`;
                } 
                
                // Set up the transfer token button to open the transfer modal
                const transferBtn = card.querySelector('.transfer-token-btn');
                if (transferBtn && token.address) {
                    transferBtn.addEventListener('click', function() {
                        // Find the transfer modal (kt_modal_2) - works whether in nft.html or index.html
                        const transferModal = document.getElementById('kt_modal_2') || 
                            parent.document.getElementById('kt_modal_2');
                        
                        if (transferModal) {
                            // Set token image in the modal
                            const tokenImageElement = transferModal.querySelector('#tokenModalImage');
                            if (tokenImageElement) {
                                // Get image from card or metadata
                                const cardImage = card.querySelector('.token-image');
                                if (cardImage && cardImage.src) {
                                    tokenImageElement.src = cardImage.src;
                                } else if (token.metadata && token.metadata.image) {
                                    tokenImageElement.src = token.metadata.image;
                                } else {
                                    // Use default placeholder if no image available
                                    tokenImageElement.src = '../media/misc/placeholder-image.jpg';
                                }
                            }
                            
                            // Pre-fill the contract address field
                            const addressInput = transferModal.querySelector('#toAddress');
                            if (addressInput) {
                                // Keep the current value if it exists
                            }
                            
                            // Get token contract address
                            const contractAddressInput = transferModal.querySelector('#contractAddress');
                            if (contractAddressInput) {
                                contractAddressInput.value = token.address;
                            }
                            
                            // For ERC721 tokens, include the token ID and show/hide appropriate fields
                            const erc721Fields = transferModal.querySelectorAll('.erc721-only');
                            const erc20Fields = transferModal.querySelectorAll('.erc20-only');
                            
                            if (token.type === 'ERC-721') {
                                // Show ERC-721 specific fields and hide ERC-20 fields
                                erc721Fields.forEach(field => field.classList.remove('d-none'));
                                erc20Fields.forEach(field => field.classList.add('d-none'));
                                
                                const tokenIdInput = transferModal.querySelector('#tokenId');
                                if (tokenIdInput) {
                                    // If this card represents a specific token ID, use that
                                    const cardTokenId = card.getAttribute('data-token-id') || 
                                        token.tokenId || token.firstTokenId || '';
                                    tokenIdInput.value = cardTokenId;
                                }
                                
                                // Set amount to 1 for NFTs
                                const amountInput = transferModal.querySelector('#amount');
                                if (amountInput) {
                                    amountInput.value = '1';
                                    // Disable the amount field for NFTs
                                    amountInput.disabled = true;
                                }
                            } else {
                                // Show ERC-20 specific fields and hide ERC-721 fields
                                erc721Fields.forEach(field => field.classList.add('d-none'));
                                erc20Fields.forEach(field => field.classList.remove('d-none'));
                                
                                // Enable amount field for ERC-20 tokens
                                const amountInput = transferModal.querySelector('#amount');
                                if (amountInput) {
                                    amountInput.value = '';
                                    amountInput.disabled = false;
                                    // Optionally set a default amount or leave blank
                                }
                            }
                            
                            // Show the modal
                            const modal = new bootstrap.Modal(transferModal);
                            modal.show();
                        } else {
                            // Fallback if modal not found - redirect to index.html with parameters
                            window.location.href = '/index.html?openModal=transfer&tokenAddress=' + 
                                encodeURIComponent(token.address) + 
                                (token.tokenId ? '&tokenId=' + encodeURIComponent(token.tokenId) : '');
                        }
                    });
                }
                
                // Store token ID as data attribute for later use
                if (isERC721 && specificTokenId) {
                    card.setAttribute('data-token-id', specificTokenId);
                }
                    
                // Add card to column
                colDiv.appendChild(card);
            }
        }

        // Initialize tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });

        // Setup token type filtering
        const typeSelector = document.querySelector('.token-type-select');
        if (typeSelector) {
            typeSelector.addEventListener('change', function () {
                filterTokens();
            });
        }

        // Setup token search
        const searchInput = document.querySelector('.token-search');
        if (searchInput) {
            searchInput.addEventListener('keyup', function () {
                filterTokens();
            });
        }
    } catch (error) {
        console.error('Error displaying tokens:', error);
    }
}

// Function to filter tokens based on type and search query
function filterTokens() {
    const typeSelector = document.querySelector('.token-type-select');
    const searchInput = document.querySelector('.token-search');

    if (!typeSelector || !searchInput) return;

    const selectedType = typeSelector.value;
    const searchQuery = searchInput.value.toLowerCase();

    // Get all token cards
    const tokenCards = document.querySelectorAll('.col-md-6.col-lg-4.col-xl-4');

    tokenCards.forEach(card => {
        let showCard = true;

        // Filter by token type
        if (selectedType !== 'all') {
            const typeElement = card.querySelector('.token-type');
            if (typeElement) {
                const tokenType = typeElement.textContent.toLowerCase();
                // Convert display type (ERC-20, ERC-721) to filter value (erc20, erc721)
                const normalizedType = tokenType.replace('-', '').toLowerCase();
                if (normalizedType !== selectedType) {
                    showCard = false;
                }
            }
        }

        // Filter by search query
        if (searchQuery && showCard) {
            const nameElement = card.querySelector('.token-name');
            const addressElement = card.querySelector('.token-address');
            const symbolElement = card.querySelector('.token-symbol');

            const nameText = nameElement ? nameElement.textContent.toLowerCase() : '';
            const addressText = addressElement ? addressElement.getAttribute('title').toLowerCase() : '';
            const symbolText = symbolElement ? symbolElement.textContent.toLowerCase() : '';

            if (!nameText.includes(searchQuery) &&
                !addressText.includes(searchQuery) &&
                !symbolText.includes(searchQuery)) {
                showCard = false;
            }
        }

        // Show or hide the card
        card.style.display = showCard ? '' : 'none';
    });
}

// In-memory cache
const metadataCache = new Map();



function normalizeTokenURI(uri) {
    if (uri.startsWith("ipfs://")) {
        return uri.replace("ipfs://", "https://ipfs.io/ipfs/");
    } else if (uri.startsWith("data:application/json;base64,")) {
        const base64 = uri.replace("data:application/json;base64,", "");
        const json = Buffer.from(base64, "base64").toString("utf-8");
        return { isBase64: true, json };
    } else if (uri.startsWith("http")) {
        return uri;
    } else {
        throw new Error("Unsupported URI format");
    }
}

async function getTokenMetadata(token) {
    // Use the existing web3 instance
    const address = web3.utils.toChecksumAddress(token.address);
    const owner = localStorage.getItem("contract");

    // Create a cache key and check for cached results
    const cacheKey = `${address.toLowerCase()}_${owner.toLowerCase()}`;
    if (metadataCache.has(cacheKey)) {
        // Merge cached metadata with the original token object
        return { ...token, ...metadataCache.get(cacheKey) };
    }

    // Create a default fallback metadata
    const fallbackData = {
        name: token.type || "Unknown Token",
        symbol: token.sym || "UNKNOWN",
        balance: token.balance ? token.balance.toString() : "0",
        owner: owner,
        image: null
    };

    // Attempt to identify token type and get metadata
    const result = await detectTokenTypeAndGetMetadata(address, owner, web3, token.sym);

    // Merge the result with the original token data
    const metadata = result || fallbackData;

    // Cache the metadata (not the full merged object)
    metadataCache.set(cacheKey, metadata);

    console.log(metadata);

    // Return the merged object with both original token data and metadata
    return { ...token, ...metadata };
}

// Helper function to detect token type and get metadata
async function detectTokenTypeAndGetMetadata(address, owner, web3Instance, tokenTypeHint) {
    // Use the token type hint to prioritize detection
    if (tokenTypeHint && tokenTypeHint.toLowerCase() === 'erc721') {
        // Try as ERC721 first
        const erc721Result = await getERC721Metadata(address, owner, web3Instance);
        if (erc721Result) return erc721Result;

        // Fall back to ERC20
        const erc20Result = await getERC20Metadata(address, owner, web3Instance);
        if (erc20Result) return erc20Result;
    } else {
        // Default: Try as ERC20 first
        const erc20Result = await getERC20Metadata(address, owner, web3Instance);
        if (erc20Result) return erc20Result;

        // Then try as ERC721
        const erc721Result = await getERC721Metadata(address, owner, web3Instance);
        if (erc721Result) return erc721Result;
    }

    // If both attempts fail, return null
    return null;
}

// Helper function to get ERC20 token metadata
async function getERC20Metadata(address, owner, web3Instance) {
    try {
        const contractERC20 = new web3Instance.eth.Contract(erc20, address);

        // Get basic token info with fallbacks
        let name, symbol, decimals, balance;

        try {
            name = await contractERC20.methods.name().call();
        } catch {
            name = 'Unknown Token';
        }

        try {
            symbol = await contractERC20.methods.symbol().call();
        } catch {
            symbol = 'UNKNOWN';
        }

        try {
            decimals = await contractERC20.methods.decimals().call();
        } catch {
            decimals = 18;
        }

        try {
            balance = await contractERC20.methods.balanceOf(owner).call();
        } catch {
            balance = '0';
        }

        // Format balance using proper decimals
        const formattedBalance = web3Instance.utils.fromWei(
            web3Instance.utils.toBN(balance).mul(web3Instance.utils.toBN(10).pow(web3Instance.utils.toBN(18 - decimals))).toString(),
            'ether'
        );

        const result = {
            type: "ERC-20",
            name,
            symbol,
            decimals,
            balance: formattedBalance,
            balanceRaw: balance,
            address,
            owner,
            image: null,
            sym: "erc20" // For compatibility with existing code
        };

        console.log(result);
        return result;
    } catch (error) {
        console.error("ERC20 metadata error:", error);
        return null; // Token is not ERC20 or call failed
    }
}

// Helper function to get ERC721 token metadata
async function getERC721Metadata(address, owner, web3Instance) {
    try {
        const contractERC721 = new web3Instance.eth.Contract(erc721, address);

        // Get basic token info with fallbacks
        let name, symbol, balance;

        try {
            name = await contractERC721.methods.name().call();
        } catch {
            name = 'Unknown NFT';
        }

        try {
            symbol = await contractERC721.methods.symbol().call();
        } catch {
            symbol = 'NFT';
        }

        try {
            balance = await contractERC721.methods.balanceOf(owner).call();
        } catch {
            balance = '0';
        }

        // If the owner has no tokens, return null
        if (parseInt(balance) === 0) return null;

        // Get token IDs from the contract
        const tokenIds = await getTokenIds(contractERC721, owner, balance);
        if (!tokenIds || tokenIds.length === 0) return null;

        // Use the first token ID as a representative for metadata
        const firstTokenId = tokenIds[0];
        const [image, metadata] = await getTokenURIAndMetadata(contractERC721, firstTokenId);

        const result = {
            type: "ERC-721",
            name,
            symbol,
            balance,
            tokenId: firstTokenId,
            firstTokenId,
            tokenIds,
            address,
            owner,
            image,
            metadata,
            sym: "erc721" // For compatibility with existing code
        };

        console.log(result);
        return result;
    } catch (error) {
        console.error("ERC721 metadata error:", error);
        return null; // Token is not ERC721 or call failed
    }
}

// Helper function to get token IDs
async function getTokenIds(contract, owner, balance) {
    // First try walletOfOwner if available
    try {
        return await contract.methods.walletOfOwner(owner).call();
    } catch {
        // Fall back to tokenOfOwnerByIndex
        const tokenIds = [];
        const maxToCheck = Math.min(Number(balance), 10); // Limit to 10 tokens for performance

        for (let i = 0; i < maxToCheck; i++) {
            try {
                const tokenId = await contract.methods.tokenOfOwnerByIndex(owner, i).call();
                tokenIds.push(tokenId);
            } catch {
                break; // Stop if we can't enumerate tokens
            }
        }

        return tokenIds;
    }
}

// Helper function to get token URI and metadata
async function getTokenURIAndMetadata(contract, tokenId) {
    try {
        const uriRaw = await contract.methods.tokenURI(tokenId).call();
        const uri = normalizeTokenURI(uriRaw);

        // Fetch metadata from URI
        let metadataRaw;
        if (typeof uri === "object" && uri.isBase64) {
            metadataRaw = JSON.parse(uri.json);
        } else {
            const response = await fetch(uri);
            metadataRaw = await response.json();
        }

        return [metadataRaw.image || null, metadataRaw];
    } catch (e) {
        console.warn(`Failed to get token metadata: ${e.message}`);
        return [null, null];
    }
}


