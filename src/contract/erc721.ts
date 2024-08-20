export const ERC721Contract = {
  abi: [
    {
      inputs: [
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "string",
          name: "symbol",
          type: "string",
        },
        {
          internalType: "string",
          name: "baseTokenURI",
          type: "string",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "Paused",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "previousAdminRole",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "newAdminRole",
          type: "bytes32",
        },
      ],
      name: "RoleAdminChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "RoleGranted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "RoleRevoked",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "Unpaused",
      type: "event",
    },
    {
      inputs: [],
      name: "DEFAULT_ADMIN_ROLE",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "MINTER_ROLE",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "PAUSER_ROLE",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "burn",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "getApproved",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
      ],
      name: "getRoleAdmin",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "uint256",
          name: "index",
          type: "uint256",
        },
      ],
      name: "getRoleMember",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
      ],
      name: "getRoleMemberCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "grantRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "hasRole",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
      ],
      name: "isApprovedForAll",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "ownerOf",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "pause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "paused",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "renounceRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "revokeRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "index",
          type: "uint256",
        },
      ],
      name: "tokenByIndex",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "index",
          type: "uint256",
        },
      ],
      name: "tokenOfOwnerByIndex",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "tokenURI",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "unpause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
  bytecode:
    "0x60806040523480156200001157600080fd5b5060405162002a0738038062002a078339810160408190526200003491620003cc565b8251839083906200004d90600290602085019062000259565b5080516200006390600390602084019062000259565b5050600c805460ff191690555080516200008590600e90602084019062000259565b5062000093600033620000f4565b620000bf7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a633620000f4565b620000eb7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a33620000f4565b50505062000499565b62000100828262000104565b5050565b6200011b82826200014760201b62000cec1760201c565b60008281526001602090815260409091206200014291839062000d70620001e7821b17901c565b505050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff1662000100576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055620001a33390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000620001fe836001600160a01b03841662000207565b90505b92915050565b6000818152600183016020526040812054620002505750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915562000201565b50600062000201565b82805462000267906200045d565b90600052602060002090601f0160209004810192826200028b5760008555620002d6565b82601f10620002a657805160ff1916838001178555620002d6565b82800160010185558215620002d6579182015b82811115620002d6578251825591602001919060010190620002b9565b50620002e4929150620002e8565b5090565b5b80821115620002e45760008155600101620002e9565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200032757600080fd5b81516001600160401b0380821115620003445762000344620002ff565b604051601f8301601f19908116603f011681019082821181831017156200036f576200036f620002ff565b816040528381526020925086838588010111156200038c57600080fd5b600091505b83821015620003b0578582018301518183018401529082019062000391565b83821115620003c25760008385830101525b9695505050505050565b600080600060608486031215620003e257600080fd5b83516001600160401b0380821115620003fa57600080fd5b620004088783880162000315565b945060208601519150808211156200041f57600080fd5b6200042d8783880162000315565b935060408601519150808211156200044457600080fd5b50620004538682870162000315565b9150509250925092565b600181811c908216806200047257607f821691505b6020821081036200049357634e487b7160e01b600052602260045260246000fd5b50919050565b61255e80620004a96000396000f3fe608060405234801561001057600080fd5b50600436106101e55760003560e01c80636352211e1161010f578063a22cb465116100a2578063d539139311610071578063d5391393146103f7578063d547741f1461041e578063e63ab1e914610431578063e985e9c51461045857600080fd5b8063a22cb465146103ab578063b88d4fde146103be578063c87b56dd146103d1578063ca15c873146103e457600080fd5b80639010d07c116100de5780639010d07c1461037557806391d148541461038857806395d89b411461039b578063a217fddf146103a357600080fd5b80636352211e146103345780636a6278421461034757806370a082311461035a5780638456cb591461036d57600080fd5b80632f2ff15d1161018757806342842e0e1161015657806342842e0e146102f057806342966c68146103035780634f6ccce7146103165780635c975abb1461032957600080fd5b80632f2ff15d146102af5780632f745c59146102c257806336568abe146102d55780633f4ba83a146102e857600080fd5b8063095ea7b3116101c3578063095ea7b31461025257806318160ddd1461026757806323b872dd14610279578063248a9ca31461028c57600080fd5b806301ffc9a7146101ea57806306fdde0314610212578063081812fc14610227575b600080fd5b6101fd6101f8366004611f81565b610494565b60405190151581526020015b60405180910390f35b61021a6104a5565b6040516102099190611ff6565b61023a610235366004612009565b610537565b6040516001600160a01b039091168152602001610209565b61026561026036600461203e565b61055e565b005b600a545b604051908152602001610209565b610265610287366004612068565b610678565b61026b61029a366004612009565b60009081526020819052604090206001015490565b6102656102bd3660046120a4565b6106aa565b61026b6102d036600461203e565b6106cf565b6102656102e33660046120a4565b610765565b6102656107e3565b6102656102fe366004612068565b61088b565b610265610311366004612009565b6108a6565b61026b610324366004612009565b6108d7565b600c5460ff166101fd565b61023a610342366004612009565b61096a565b6102656103553660046120d0565b6109ca565b61026b6103683660046120d0565b610a86565b610265610b0c565b61023a6103833660046120eb565b610bb0565b6101fd6103963660046120a4565b610bcf565b61021a610bf8565b61026b600081565b6102656103b936600461210d565b610c07565b6102656103cc36600461215f565b610c12565b61021a6103df366004612009565b610c4a565b61026b6103f2366004612009565b610cb0565b61026b7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a681565b61026561042c3660046120a4565b610cc7565b61026b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a81565b6101fd61046636600461223b565b6001600160a01b03918216600090815260076020908152604080832093909416825291909152205460ff1690565b600061049f82610d85565b92915050565b6060600280546104b490612265565b80601f01602080910402602001604051908101604052809291908181526020018280546104e090612265565b801561052d5780601f106105025761010080835404028352916020019161052d565b820191906000526020600020905b81548152906001019060200180831161051057829003601f168201915b5050505050905090565b600061054282610daa565b506000908152600660205260409020546001600160a01b031690565b60006105698261096a565b9050806001600160a01b0316836001600160a01b0316036105db5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b03821614806105f757506105f78133610466565b6106695760405162461bcd60e51b815260206004820152603d60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c00000060648201526084016105d2565b6106738383610e09565b505050565b610683335b82610e77565b61069f5760405162461bcd60e51b81526004016105d29061229f565b610673838383610ef6565b6000828152602081905260409020600101546106c581611067565b6106738383611071565b60006106da83610a86565b821061073c5760405162461bcd60e51b815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201526a74206f6620626f756e647360a81b60648201526084016105d2565b506001600160a01b03919091166000908152600860209081526040808320938352929052205490565b6001600160a01b03811633146107d55760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084016105d2565b6107df8282611093565b5050565b61080d7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a33610bcf565b610881576040805162461bcd60e51b81526020600482015260248101919091527f4552433732315072657365744d696e7465725061757365724175746f49643a2060448201527f6d75737420686176652070617573657220726f6c6520746f20756e706175736560648201526084016105d2565b6108896110b5565b565b61067383838360405180602001604052806000815250610c12565b6108af3361067d565b6108cb5760405162461bcd60e51b81526004016105d29061229f565b6108d481611107565b50565b60006108e2600a5490565b82106109455760405162461bcd60e51b815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201526b7574206f6620626f756e647360a01b60648201526084016105d2565b600a8281548110610958576109586122ec565b90600052602060002001549050919050565b6000818152600460205260408120546001600160a01b03168061049f5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b60448201526064016105d2565b6109f47f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a633610bcf565b610a665760405162461bcd60e51b815260206004820152603d60248201527f4552433732315072657365744d696e7465725061757365724175746f49643a2060448201527f6d7573742068617665206d696e74657220726f6c6520746f206d696e7400000060648201526084016105d2565b610a7881610a73600d5490565b6111aa565b6108d4600d80546001019055565b60006001600160a01b038216610af05760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b60648201526084016105d2565b506001600160a01b031660009081526005602052604090205490565b610b367f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a33610bcf565b610ba85760405162461bcd60e51b815260206004820152603e60248201527f4552433732315072657365744d696e7465725061757365724175746f49643a2060448201527f6d75737420686176652070617573657220726f6c6520746f207061757365000060648201526084016105d2565b610889611343565b6000828152600160205260408120610bc89083611380565b9392505050565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b6060600380546104b490612265565b6107df33838361138c565b610c1c3383610e77565b610c385760405162461bcd60e51b81526004016105d29061229f565b610c448484848461145a565b50505050565b6060610c5582610daa565b6000610c5f61148d565b90506000815111610c7f5760405180602001604052806000815250610bc8565b80610c898461149c565b604051602001610c9a929190612302565b6040516020818303038152906040529392505050565b600081815260016020526040812061049f9061152f565b600082815260208190526040902060010154610ce281611067565b6106738383611093565b610cf68282610bcf565b6107df576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055610d2c3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000610bc8836001600160a01b038416611539565b60006001600160e01b0319821663780e9d6360e01b148061049f575061049f82611588565b6000818152600460205260409020546001600160a01b03166108d45760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b60448201526064016105d2565b600081815260066020526040902080546001600160a01b0319166001600160a01b0384169081179091558190610e3e8261096a565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600080610e838361096a565b9050806001600160a01b0316846001600160a01b03161480610eca57506001600160a01b0380821660009081526007602090815260408083209388168352929052205460ff165b80610eee5750836001600160a01b0316610ee384610537565b6001600160a01b0316145b949350505050565b826001600160a01b0316610f098261096a565b6001600160a01b031614610f2f5760405162461bcd60e51b81526004016105d290612331565b6001600160a01b038216610f915760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016105d2565b610f9e83838360016115c8565b826001600160a01b0316610fb18261096a565b6001600160a01b031614610fd75760405162461bcd60e51b81526004016105d290612331565b600081815260066020908152604080832080546001600160a01b03199081169091556001600160a01b0387811680865260058552838620805460001901905590871680865283862080546001019055868652600490945282852080549092168417909155905184937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6108d481336115d4565b61107b8282610cec565b60008281526001602052604090206106739082610d70565b61109d828261162d565b60008281526001602052604090206106739082611692565b6110bd6116a7565b600c805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b60006111128261096a565b90506111228160008460016115c8565b61112b8261096a565b600083815260066020908152604080832080546001600160a01b03199081169091556001600160a01b0385168085526005845282852080546000190190558785526004909352818420805490911690555192935084927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b6001600160a01b0382166112005760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016105d2565b6000818152600460205260409020546001600160a01b0316156112655760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016105d2565b6112736000838360016115c8565b6000818152600460205260409020546001600160a01b0316156112d85760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016105d2565b6001600160a01b038216600081815260056020908152604080832080546001019055848352600490915280822080546001600160a01b0319168417905551839291907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b61134b6116f0565b600c805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586110ea3390565b6000610bc88383611736565b816001600160a01b0316836001600160a01b0316036113ed5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016105d2565b6001600160a01b03838116600081815260076020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b611465848484610ef6565b61147184848484611760565b610c445760405162461bcd60e51b81526004016105d290612376565b6060600e80546104b490612265565b606060006114a983611861565b600101905060008167ffffffffffffffff8111156114c9576114c9612149565b6040519080825280601f01601f1916602001820160405280156114f3576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a85049450846114fd57509392505050565b600061049f825490565b60008181526001830160205260408120546115805750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915561049f565b50600061049f565b60006001600160e01b031982166380ac58cd60e01b14806115b957506001600160e01b03198216635b5e139f60e01b145b8061049f575061049f82611939565b610c448484848461195e565b6115de8282610bcf565b6107df576115eb816119d1565b6115f68360206119e3565b6040516020016116079291906123c8565b60408051601f198184030181529082905262461bcd60e51b82526105d291600401611ff6565b6116378282610bcf565b156107df576000828152602081815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6000610bc8836001600160a01b038416611b7f565b600c5460ff166108895760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b60448201526064016105d2565b600c5460ff16156108895760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016105d2565b600082600001828154811061174d5761174d6122ec565b9060005260206000200154905092915050565b60006001600160a01b0384163b1561185657604051630a85bd0160e11b81526001600160a01b0385169063150b7a02906117a490339089908890889060040161243d565b6020604051808303816000875af19250505080156117df575060408051601f3d908101601f191682019092526117dc9181019061247a565b60015b61183c573d80801561180d576040519150601f19603f3d011682016040523d82523d6000602084013e611812565b606091505b5080516000036118345760405162461bcd60e51b81526004016105d290612376565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610eee565b506001949350505050565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b83106118a05772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef810000000083106118cc576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc1000083106118ea57662386f26fc10000830492506010015b6305f5e1008310611902576305f5e100830492506008015b612710831061191657612710830492506004015b60648310611928576064830492506002015b600a831061049f5760010192915050565b60006001600160e01b03198216635a05180f60e01b148061049f575061049f82611c72565b61196a84848484611ca7565b600c5460ff1615610c445760405162461bcd60e51b815260206004820152602b60248201527f4552433732315061757361626c653a20746f6b656e207472616e73666572207760448201526a1a1a5b19481c185d5cd95960aa1b60648201526084016105d2565b606061049f6001600160a01b03831660145b606060006119f28360026124ad565b6119fd9060026124cc565b67ffffffffffffffff811115611a1557611a15612149565b6040519080825280601f01601f191660200182016040528015611a3f576020820181803683370190505b509050600360fc1b81600081518110611a5a57611a5a6122ec565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110611a8957611a896122ec565b60200101906001600160f81b031916908160001a9053506000611aad8460026124ad565b611ab89060016124cc565b90505b6001811115611b30576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110611aec57611aec6122ec565b1a60f81b828281518110611b0257611b026122ec565b60200101906001600160f81b031916908160001a90535060049490941c93611b29816124e4565b9050611abb565b508315610bc85760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016105d2565b60008181526001830160205260408120548015611c68576000611ba36001836124fb565b8554909150600090611bb7906001906124fb565b9050818114611c1c576000866000018281548110611bd757611bd76122ec565b9060005260206000200154905080876000018481548110611bfa57611bfa6122ec565b6000918252602080832090910192909255918252600188019052604090208390555b8554869080611c2d57611c2d612512565b60019003818190600052602060002001600090559055856001016000868152602001908152602001600020600090556001935050505061049f565b600091505061049f565b60006001600160e01b03198216637965db0b60e01b148061049f57506301ffc9a760e01b6001600160e01b031983161461049f565b6001811115611d165760405162461bcd60e51b815260206004820152603560248201527f455243373231456e756d657261626c653a20636f6e7365637574697665207472604482015274185b9cd9995c9cc81b9bdd081cdd5c1c1bdc9d1959605a1b60648201526084016105d2565b816001600160a01b038516611d7257611d6d81600a80546000838152600b60205260408120829055600182018355919091527fc65a7bb8d6351c1cf70c95a316cc6a92839c986682d98bc35f958f4883f9d2a80155565b611d95565b836001600160a01b0316856001600160a01b031614611d9557611d958582611ddb565b6001600160a01b038416611db157611dac81611e78565b611dd4565b846001600160a01b0316846001600160a01b031614611dd457611dd48482611f27565b5050505050565b60006001611de884610a86565b611df291906124fb565b600083815260096020526040902054909150808214611e45576001600160a01b03841660009081526008602090815260408083208584528252808320548484528184208190558352600990915290208190555b5060009182526009602090815260408084208490556001600160a01b039094168352600881528383209183525290812055565b600a54600090611e8a906001906124fb565b6000838152600b6020526040812054600a8054939450909284908110611eb257611eb26122ec565b9060005260206000200154905080600a8381548110611ed357611ed36122ec565b6000918252602080832090910192909255828152600b9091526040808220849055858252812055600a805480611f0b57611f0b612512565b6001900381819060005260206000200160009055905550505050565b6000611f3283610a86565b6001600160a01b039093166000908152600860209081526040808320868452825280832085905593825260099052919091209190915550565b6001600160e01b0319811681146108d457600080fd5b600060208284031215611f9357600080fd5b8135610bc881611f6b565b60005b83811015611fb9578181015183820152602001611fa1565b83811115610c445750506000910152565b60008151808452611fe2816020860160208601611f9e565b601f01601f19169290920160200192915050565b602081526000610bc86020830184611fca565b60006020828403121561201b57600080fd5b5035919050565b80356001600160a01b038116811461203957600080fd5b919050565b6000806040838503121561205157600080fd5b61205a83612022565b946020939093013593505050565b60008060006060848603121561207d57600080fd5b61208684612022565b925061209460208501612022565b9150604084013590509250925092565b600080604083850312156120b757600080fd5b823591506120c760208401612022565b90509250929050565b6000602082840312156120e257600080fd5b610bc882612022565b600080604083850312156120fe57600080fd5b50508035926020909101359150565b6000806040838503121561212057600080fd5b61212983612022565b91506020830135801515811461213e57600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b6000806000806080858703121561217557600080fd5b61217e85612022565b935061218c60208601612022565b925060408501359150606085013567ffffffffffffffff808211156121b057600080fd5b818701915087601f8301126121c457600080fd5b8135818111156121d6576121d6612149565b604051601f8201601f19908116603f011681019083821181831017156121fe576121fe612149565b816040528281528a602084870101111561221757600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b6000806040838503121561224e57600080fd5b61225783612022565b91506120c760208401612022565b600181811c9082168061227957607f821691505b60208210810361229957634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252602d908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526c1c881bdc88185c1c1c9bdd9959609a1b606082015260800190565b634e487b7160e01b600052603260045260246000fd5b60008351612314818460208801611f9e565b835190830190612328818360208801611f9e565b01949350505050565b60208082526025908201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060408201526437bbb732b960d91b606082015260800190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351612400816017850160208801611f9e565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351612431816028840160208801611f9e565b01602801949350505050565b6001600160a01b038581168252841660208201526040810183905260806060820181905260009061247090830184611fca565b9695505050505050565b60006020828403121561248c57600080fd5b8151610bc881611f6b565b634e487b7160e01b600052601160045260246000fd5b60008160001904831182151516156124c7576124c7612497565b500290565b600082198211156124df576124df612497565b500190565b6000816124f3576124f3612497565b506000190190565b60008282101561250d5761250d612497565b500390565b634e487b7160e01b600052603160045260246000fdfea2646970667358221220cfd1973198752b9be878ad342b8a8e9977281479b917a502ada04e82f396427464736f6c634300080d0033",
} as const;
