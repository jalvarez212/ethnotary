// Caches for repeated data
const blockTimestampCache = new Map();
const methodCache = new Map();

async function findContractMethod(tx) {
    const methodId = tx.input.slice(0, 10);

    if (methodCache.has(methodId)) {
        return methodCache.get(methodId);
    }

    const abiMethod = contractABI.find(abiEntry =>
        abiEntry.type === 'function' && web3.eth.abi.encodeFunctionSignature(abiEntry) === methodId
    );

    const methodName = abiMethod ? abiMethod.name : 'deposit';
    methodCache.set(methodId, methodName);
    return methodName;
}

async function getBlockTimestamp(blockNumber) {
    if (blockTimestampCache.has(blockNumber)) {
        return blockTimestampCache.get(blockNumber);
    }

    try {
        const block = await web3.eth.getBlock(blockNumber);
        const timestamp = new Date(Number(block.timestamp) * 1000);
        blockTimestampCache.set(blockNumber, timestamp);
        return timestamp;
    } catch (error) {
        console.error(`Error fetching block ${blockNumber}:`, error);
        throw error;
    }
}

async function getEventLogsBatch(eventNames, fromBlock = 0, toBlock = 'latest') {
    const promises = eventNames.map(eventName =>
        contract.getPastEvents(eventName, { fromBlock, toBlock })
    );
    const allLogs = await Promise.all(promises);
    return allLogs.flat(); // Flatten results into a single array
}

async function getTransactionDetailsFromLogsBatch(logs) {
    const transactionHashes = logs.map(log => log.transactionHash);
    return await Promise.all(
        transactionHashes.map(hash => web3.eth.getTransaction(hash))
    );
}

async function processEvents(eventNames, container) {
    try {
        const logs = await getEventLogsBatch(eventNames, 0, 'latest');
        const transactions = await getTransactionDetailsFromLogsBatch(logs);

        const transactionDetails = await Promise.all(
            transactions.map(async (tx) => {
                const timestamp = await getBlockTimestamp(tx.blockNumber);
                const method = await findContractMethod(tx);
                return { tx, timestamp, method };
            })
        );

        for (const { tx, timestamp, method } of transactionDetails) {
            const txElement = createTransactionElement(tx, timestamp, method);
            container.appendChild(txElement);
        }
    } catch (error) {
        console.error('Error in processing events:', error);
    }
}

function createTransactionElement(tx, timestamp, method) {
    const txElement = document.createElement('tr');
    txElement.innerHTML = `
        <td>${tx.hash}</td>
        <td>${method}</td>
        <td>${tx.from}</td>
        <td>${timestamp.toDateString()}</td>
        <td>${BigInt(tx.blockNumber)}</td>
        <td>${web3.utils.fromWei((tx.gas * tx.gasPrice).toString(), 'ether')}</td>
    `;
    return txElement;
}

async function getPendingTransactions() {
    const count = await contract.methods.transactionCount().call();
    const pendingTransactions = [];

    for (let i = 0; i < count; i++) {
        const tx = await contract.methods.transactions(i).call();
        const isTxConfirmed = await isConfirmed(tx.id);

        if (!tx.executed && !isTxConfirmed) {
            pendingTransactions.push(tx);
        }
    }

    return pendingTransactions;
}

async function isConfirmed(id) {
    return await contract.methods.isConfirmed(id).call();
}

async function getEtherBalance(address, container) {
    const balance = await web3.eth.getBalance(address);
    container.innerText = web3.utils.fromWei(balance, 'ether');
}

async function getEthereumPrice() {
    const e_url = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';
    try {
        const response = await fetch(e_url);
        const data = await response.json();
        const ethPrice = data.ethereum.usd;
        document.getElementById('etherPrice').innerText = `$${ethPrice}`;
    } catch (error) {
        console.error('Error fetching Ethereum price:', error);
    }
}

async function getGasEstimates() {
    const url = `${ETHERSCAN_API_URL}?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === '1' && data.message === 'OK') {
            const { ProposeGasPrice } = data.result;
            document.getElementById('gasPrice').innerText = `${ProposeGasPrice} Gwei`;
        }
    } catch (error) {
        console.error('Error fetching gas estimates:', error);
    }
}

async function updateNetworkCongestionBar() {
    const url = `${ETHERSCAN_API_URL}?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === '1' && data.message === 'OK') {
            const averageGasPrice = parseInt(data.result.ProposeGasPrice, 10);
            updateBarGraph(averageGasPrice);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function updateBarGraph(gasPrice) {
    const MAX_GAS_PRICE = 200; // Example value
    const percentage = Math.min((gasPrice / MAX_GAS_PRICE) * 100, 100);

    const congestionBar = document.getElementById('percentageBar');
    congestionBar.style.width = `${percentage}%`;

    if (percentage < 35) {
        congestionBar.className = 'bg-primary';
    } else if (percentage < 65) {
        congestionBar.className = 'bg-warning';
    } else {
        congestionBar.className = 'bg-danger';
    }
}

// Event Listeners and Initialization
window.onload = async () => {
    await getEthereumPrice();
    await getGasEstimates();
    await updateNetworkCongestionBar();
    await processEvents(['Alltxns', 'Confirm', 'Submit', 'Execute', 'Deposits', 'Account'], document.getElementById('main'));
};
