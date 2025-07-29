// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.22;

import "./MultiSignatureAccount.sol";

contract CrossChainMSAFactory {
    uint public notaryFee = 999999999999999;
    address payable private owner;
    
    // Mapping to track deployments by salt
    mapping(bytes32 => address) public deployments;
    
    event NewMSACreated(address msaAddress, bytes32 salt, uint256 chainId);

    receive() external payable {}

    constructor() {
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    function changeFee(uint256 newFee) public onlyOwner {
        notaryFee = newFee;
    }

    function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }
    
    // Get the current chain ID
    function getChainId() public view returns (uint256) {
        return block.chainid;
    }
    
    // Calculate the address that will be created with CREATE2
    function calculateAddress(bytes32 salt, bytes memory bytecode) public view returns (address) {
        return address(uint160(uint256(keccak256(abi.encodePacked(
            bytes1(0xff),
            address(this),
            salt,
            keccak256(bytecode)
        )))));
    }
    
    // Predict the address of a MultiSigAccount before deployment
    function predictMSAAddress(
        bytes32 salt, 
        address[] calldata _owners, 
        uint _required, 
        uint16 _pin
    ) public view returns (address) {
        bytes memory bytecode = abi.encodePacked(
            type(MultiSigAccount).creationCode,
            abi.encode(_owners, _required, _pin)
        );
        
        return calculateAddress(salt, bytecode);
    }
    
    // Deploy a new MultiSigAccount with CREATE2 to ensure same address across chains
    function newMSA(
        bytes32 salt,
        address[] calldata _owners, 
        uint _required, 
        uint16 _pin
    ) payable public returns (address) {
        require(msg.value >= notaryFee, "Ether value sent is not correct");
        
        // Create the creation bytecode with constructor arguments
        bytes memory bytecode = abi.encodePacked(
            type(MultiSigAccount).creationCode,
            abi.encode(_owners, _required, _pin)
        );
        
        // Deploy with CREATE2
        address addr;
        assembly {
            addr := create2(0, add(bytecode, 0x20), mload(bytecode), salt)
            if iszero(extcodesize(addr)) {
                revert(0, 0)
            }
        }
        
        // Store the deployment
        deployments[salt] = addr;
        
        // Emit event with chain ID for cross-chain tracking
        emit NewMSACreated(addr, salt, block.chainid);
        
        return addr;
    }
    
    // Check if a MultiSigAccount exists at the predicted address
    function msaExists(bytes32 salt) public view returns (bool) {
        address predictedAddress = deployments[salt];
        return predictedAddress != address(0) && address(predictedAddress).code.length > 0;
    }
}
