# 🐘 ethnotary 🐘

**ethnotary** is a smart account platform currently built on the Ethereum network with support for various layer 2 networks like Soneium, Polygon, BNB Chain, and Base.

This isn’t intended to be a speculative asset or token, but rather a service for blockchain users. 

ethnotary helps users secure funds or treasuries for their onchain activities. 

We take accepted standards from ethereum and other blockchains communities to provide easy to use interfaces where users can organize and customize accounts to their needs and publish on chain! 

We aim to provide this utility in a sufficiently distributed architecture that ensures robust and reliable operation across the web.

As such, we suggest a one-time donation for the use of the ethnotary tools. Once contributed, the ethnotary tools are yours to keep and can be accessed by users at any time, either locally on your machine or through the web. This donation helps support the maintenance, upkeep, and continuous improvements for our community of users.

---

## Installation

This guide will walk you through the steps required to run this decentralized application (dApp) on your local machine or access it via the hosted version at [ethnotary.io](http://ethnotary.io).

### Prerequisites

Before getting started, ensure you have the following:

- **Python 3.x** (if running locally): [Download and install Python](https://www.python.org/downloads/) if it's not already installed.
- **Web3 Enabled Browser**: Use a browser with Web3 capabilities, such as [MetaMask](https://metamask.io/) for Chrome or Firefox.

---

### Accessing the dApp

#### **Option 1: Access via [ethnotary.io](http://ethnotary.io)**

You can access the dApp directly by navigating to:

```http://ethnotary.io/index1.html?YOUR_ACCOUNT_ADDRESS```

Replace `YOUR_ACCOUNT_ADDRESS` in the URL with your account address.

If you do not have an Ethereum account, you can create a new account either:

- By using the [wizard page](http://ethnotary.io/wizard.html) on the hosted site
- Or, by navigating to the wizard page locally (see instructions below).

Make sure your Web3-enabled browser is active and connected to the appropriate Ethereum network.

#### **Option 2: Running the dApp Locally**

If you prefer to run the dApp on your local machine, follow the steps below:

1. **Clone the Repository**

   First, clone the repository to your local machine using Git:

   ``` git clone https://github.com/yourusername/your-repo-name.git ```

Replace yourusername and your-repo-name with your actual GitHub username and repository name.

2. Navigate to the Project Directory

Change directory to the root of the project folder:

``` cd your-repo-name ```

3. Start a Local HTTP Server

To serve the dApp files on your local machine, you need to start a simple HTTP server. Run the following command in the terminal:

```python -m http.server 8000```

This will start an HTTP server on port 8000 and serve files from the current directory.

4. Open the dApp in a Web3 Enabled Browser

Once the server is running, open your Web3-enabled browser and navigate to the following URL:

```http://localhost:8000/index1.html?YOUR_ACCOUNT_ADDRESS```

Replace YOUR_ETH_ADDRESS in the URL with your account address.


## Create a New Account

If you do not have an account, you can create one using the local wizard page by navigating to:


```http://localhost:8000/wizard.html```

Make sure your Web3 browser (e.g., MetaMask) is properly set up and connected to the appropriate Ethereum network.

**Notes**
- Ensure your browser has Web3 integration. You can do this by installing a wallet such as MetaMask or by using a browser that natively supports Web3.
- The dApp will not function properly without connecting to a Web3 network, so double-check that your Web3 provider (MetaMask or similar) is working as expected.

**Troubleshooting**
- If you encounter any issues while running the dApp, please check the following:
- Make sure you are in the correct directory when running the Python HTTP server.
- Ensure your web browser has Web3 enabled and is connected to the correct network.
- If you encounter port-related issues, ensure that port 8000 is not in use by another application.


