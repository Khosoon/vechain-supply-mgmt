// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyRegistration {
    struct Product {
        string name;
        uint256 registrationTime;
        bool isRegistered;
    }
    
    address public admin;
    uint256 public currentProductCount;
    
    mapping(address => Product) public products;
    address[] public registeredProducts;
    
    event StudentRegistered(address indexed productAddress, string name, uint256 timestamp);
    event RegistrationCancelled(address indexed productAddress);
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    constructor(
    ) {
        admin = msg.sender;
    }
    
    function registerForExam(string memory _name, address productAddress) external  {
        require(!products[productAddress].isRegistered, "Already registered");
        
        products[productAddress] = Product({
            name: _name,
            registrationTime: block.timestamp,
            isRegistered: true
        });   
        registeredProducts.push(productAddress);
        currentProductCount++;
        
    }
    

    function getRegisteredProducts() external onlyAdmin view returns (address[] memory) {
        return registeredProducts;
    }
    
    function getStudentDetails(address productAddress) 
        external 
        view 
        returns (
            string memory name,
            uint256 registrationTime,
            bool isRegistered
        ) 
    {
        Product memory product = products[productAddress];
        return (
            product.name,
            product.registrationTime,
            product.isRegistered
        );
    }
}
