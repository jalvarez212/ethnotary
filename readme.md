# 🐘 ethnotary 🐘

ethnotary is a cryptographic utility tool that allows blockchain based individuals and communities to organize and conduct its operations. We accomplish this through our frontend interface that allows users the ability to read, write to, and deploy new smart contract based applications. 

These applications help users secure funds or treasuries through multisignature logic, manage commerce on blockchains through ERC 721 & 1155 standards, and help decentralized autonomous organizations facilitate its operations. 

We take accepted standards from ethereum and other blockchains communities to provide easy to use interfaces where users can organize and customize these standards to their needs and publish on chain! We strive to provide this utility in a sufficiently distributed architecture that allows for its robust & reliable operation on the world wide web.

This isn’t intended to be a speculative asset or token. But rather a service for users of cryptographic technologies.

As such, we charge a fixed one time fee for the use of the ethnotary tools. After which, the ethnotary tools are yours to keep and can be accessed by users at any time either locally on your machine or through the web. This fee covers the maintenance, upkeep, and iterative improvements for our community of users. 

More to come soon!


# Installation
This guide will walk you through the steps required to run the decentralized application (dApp) on your local machine or access it via the hosted version at ethnotary.io.

##Prerequisites

Before getting started, ensure you have the following:

-Python 3.x (if running locally): Download and Install Python if not already installed.
-Web3 Enabled Browser: Use a browser with Web3 capabilities, such as MetaMask for Chrome or Firefox.
Accessing the dApp

**bold**Option 1: Access via ethnotary.io**bold**
You can access the dApp directly by navigating to:


```http://ethnotary.io/index1.html?YOUR_ETH_ADDRESS```

Replace YOUR_ETH_ADDRESS in the URL with your Ethereum account address.

If you do not have an Ethereum account, you can create a new account either:

By using the wizard page on the hosted site at ethnotary.io/wizard.html

Or, by navigating to the wizard page locally (see instructions below).
Make sure your Web3-enabled browser is active and connected to the appropriate Ethereum network.

**bold**Option 2: Running the dApp Locally**bold**
If you prefer to run the dApp on your local machine, follow the steps below:

1. Clone the Repository**bold**

First, clone the repository to your local machine using Git:


```git clone https://github.com/yourusername/your-repo-name.git```

Replace yourusername and your-repo-name with your actual GitHub username and repository name.

2. Navigate to the Project Directory

Change directory to the root of the project folder:

```cd your-repo-name```

3. Start a Local HTTP Server

To serve the dApp files on your local machine, you need to start a simple HTTP server. Run the following command in the terminal:

```python -m http.server 8000```

This will start an HTTP server on port 8000 and serve files from the current directory.

4. Open the dApp in a Web3 Enabled Browser

Once the server is running, open your Web3-enabled browser and navigate to the following URL:

```http://localhost:8000/index1.html?YOUR_ETH_ADDRESS```

Replace YOUR_ETH_ADDRESS in the URL with your Ethereum account address.


##Create a New Account

If you do not have an Ethereum account, you can create one using the local wizard page by navigating to:


```http://localhost:8000/wizard.html```

Make sure your Web3 browser (e.g., MetaMask) is properly set up and connected to the appropriate Ethereum network.

**bold**Notes**bold**
- Ensure your browser has Web3 integration. You can do this by installing a wallet such as MetaMask or by using a browser that natively supports Web3.
- The dApp will not function properly without connecting to a Web3 network, so double-check that your Web3 provider (MetaMask or similar) is working as expected.

**bold**Troubleshooting**bold**
- If you encounter any issues while running the dApp, please check the following:
- Make sure you are in the correct directory when running the Python HTTP server.
- Ensure your web browser has Web3 enabled and is connected to the correct network.
- If you encounter port-related issues, ensure that port 8000 is not in use by another application.


