// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.22;

/* solhint-disable avoid-low-level-calls */
/* solhint-disable no-inline-assembly */
/* solhint-disable reason-string */


contract MultiSigAccount
{
   //Multi Sig Constants

    bytes32 private pinHash;

    uint public constant MAX_OWNER_COUNT = 50;

    //Storage for Multi Sig

    mapping(uint => Transaction) public transactions;
    mapping(uint => mapping(address => bool)) public confirmations;
    mapping(address => bool) public isOwner;
    address[] public owners;
    uint public required;
    uint public transactionCount;

    struct Transaction {
        address dest;
        uint value;
        bytes func;
        bool executed;
        uint id;
    }

    //Multi Sig Events

    event Confirmation(address indexed sender, uint indexed transactionId);
    event Revocation(address indexed sender, uint indexed transactionId);
    //ad sender and txn id to submission event
    event Submission(uint indexed transactionId);
    event Execution(uint indexed transactionId);
    event ExecutionFailure(uint indexed transactionId);
    event Deposit(address indexed sender, uint value);
    event OwnerAddition(address indexed owner);
    event OwnerRemoval(address indexed owner);
    event RequirementChange(uint required);
   
   
    //Multi Sig Modifiers

    modifier onlyOwner() {
        _onlyOwner();
        _;
    }

    modifier ownerDoesNotExist(address accountOwner) {
        require(!isOwner[accountOwner]);
        _;
    }

    modifier ownerExists(address accountOwner) {
        require(isOwner[accountOwner] == true);
        _;
    }

    modifier transactionExists(uint transactionId) {
        require(transactions[transactionId].dest != address(0));
        _;
    }

    modifier confirmed(uint transactionId, address accountOwner) {
        require(confirmations[transactionId][accountOwner]);
        _;
    }

    modifier notConfirmed(uint transactionId, address accountOwner) {
        require(!confirmations[transactionId][accountOwner]);
        _;
    }

    modifier notExecuted(uint transactionId) {
        require(!transactions[transactionId].executed);
        _;
    }

    modifier notNull(address _address) {
        require(_address != address(0));
        _;
    }

    modifier verifyPin(uint16 _pin) {
        require (keccak256(abi.encodePacked(_pin)) == pinHash, "incorrect pin");
        _;
    }


    modifier validRequirement(uint ownerCount, uint _required) {
        require(
            ownerCount <= MAX_OWNER_COUNT &&
                _required <= ownerCount &&
                _required != 0 &&
                ownerCount != 0
        );
        _;
    }


    // solhint-disable-next-line no-empty-blocks
    receive() external payable {}

    constructor(
        address[] memory _owners,
        uint _required,
        uint16 _pin
    ) payable
    validRequirement(_owners.length, _required) 
    {
        for (uint i = 0; i < _owners.length; i++) {
            require(!isOwner[_owners[i]] && _owners[i] != address(0));
            isOwner[_owners[i]] = true;
        }
        owners = _owners;
        required = _required;
        pinHash = keccak256(abi.encodePacked(_pin));
    }

    function _onlyOwner() internal view {
        require(
            isOwner[msg.sender] || msg.sender == address(this),
            "only owner"
        );
    }


    function _requireFromOwner() internal view {
        require(isOwner[msg.sender],
            "account: not Owner or EntryPoint"
        );
    }

 

    function _call(address target, uint256 value, bytes memory data) internal {
        (bool success, bytes memory result) = target.call{value: value}(data);
        if (!success) {
            assembly {
                revert(add(result, 32), mload(result))
            }
        }
    }
    //Multi Sig Functions

    function addOwner(
        address accountOwner,
        uint16 _pin
    )
        public
        ownerDoesNotExist(accountOwner)
        notNull(accountOwner)
        validRequirement(owners.length + 1, required)
        verifyPin(_pin)

    {
        _requireFromOwner();
        isOwner[accountOwner] = true;
        owners.push(accountOwner);
        emit OwnerAddition(accountOwner);
    }
    

    function removeOwner(
        address accountOwner,
        uint16 _pin
    ) 
    public 
    ownerExists(accountOwner) 
    verifyPin(_pin)
    
    {
        _requireFromOwner();
        isOwner[accountOwner] = false;
        for (uint i = 0; i < owners.length - 1; i++)
            if (owners[i] == accountOwner) {
                owners[i] = owners[owners.length - 1];
                break;
            }
        owners.pop();
        if (required > owners.length) changeRequirement(owners.length);
        emit OwnerRemoval(accountOwner);
    }

    function replaceOwner(
        address accountOwner,
        address newOwner,
        uint16 _pin

    ) 
    public  
    ownerExists(accountOwner) 
    ownerDoesNotExist(newOwner)
    verifyPin(_pin) 
    {
        for (uint i = 0; i < owners.length; i++)
            if (owners[i] == accountOwner) {
                owners[i] = newOwner;
                break;
            }
        isOwner[accountOwner] = false;
        isOwner[newOwner] = true;
        emit OwnerRemoval(accountOwner);
        emit OwnerAddition(newOwner);
    }

    function changeRequirement(
        uint _required
    ) public 
   validRequirement(owners.length, _required) 
   {
        _requireFromOwner();
        required = _required;
        emit RequirementChange(_required);
    }

    function execute(
        uint transactionId
    ) public {
        _requireFromOwner();
        require(isConfirmed(transactionId));
        require(!transactions[transactionId].executed);

        if (isConfirmed(transactionId)) {
            Transaction storage txn = transactions[transactionId];
            txn.executed = true;
            _call(txn.dest, txn.value, txn.func);
            //add txn.dest, txn.value, and txn.func to the emit event
            emit Execution(transactionId);
        }
        else {
            emit ExecutionFailure(transactionId);
            Transaction storage txn = transactions[transactionId];
            txn.executed = false;
            }
        
    }

    function submitTransaction(
        address dest,
        uint256 value,
        bytes calldata func
    ) public returns (uint transactionId) {
        _requireFromOwner();
        transactionId = addTransaction(dest, value, func);
        confirmTransaction(transactionId);
    }

    function confirmTransaction(
        uint transactionId
    )
        public
        ownerExists(msg.sender)
        transactionExists(transactionId)
        notConfirmed(transactionId, msg.sender)
    {
        confirmations[transactionId][msg.sender] = true;
        emit Confirmation(msg.sender, transactionId);

    }

    function revokeConfirmation(
        uint transactionId
    )
        public
        ownerExists(msg.sender)
        confirmed(transactionId, msg.sender)
        notExecuted(transactionId)
    {
        confirmations[transactionId][msg.sender] = false;
        emit Revocation(msg.sender, transactionId);
    }


    function isConfirmed(uint transactionId) public view returns (bool) {
        uint count = 0;
        for (uint i = 0; i < owners.length; i++) {
            if (confirmations[transactionId][owners[i]]) count += 1;
            if (count == required) return true;
        }
        return false;
    }
   

    function addTransaction(
        address dest,
        uint256 value,
        bytes calldata func
    ) internal notNull(dest) returns (uint transactionId) {
        transactionId = transactionCount;
        transactions[transactionId] = Transaction({
            dest: dest,
            value: value,
            func: func,
            executed: false,
            id: transactionId
        });
        transactionCount += 1;
        //i don't think this event is needed or find a way to only call one of confirm or submit
        emit Submission(transactionId);
    }

    function getConfirmationCount(
        uint transactionId
    ) public view returns (uint count) {
        for (uint i = 0; i < owners.length; i++)
            if (confirmations[transactionId][owners[i]]) count += 1;
    }

    function getOwners() public view returns (address[] memory) {
        return owners;
    }

    function getConfirmations(
        uint transactionId
    ) public view returns (address[] memory _confirmations) {
        address[] memory confirmationsTemp = new address[](owners.length);
        uint count = 0;
        uint i;
        for (i = 0; i < owners.length; i++)
            if (confirmations[transactionId][owners[i]]) {
                confirmationsTemp[count] = owners[i];
                count += 1;
            }
        _confirmations = new address[](count);
        for (i = 0; i < count; i++) _confirmations[i] = confirmationsTemp[i];
    }


    
}
