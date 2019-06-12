module.exports = [
  {
    constant: true,
    inputs: [],
    name: 'trustedServer',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_authorizedAddress',
        type: 'address',
      },
    ],
    name: 'grantAccessToAddress',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'isOwner',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_checkingAddress',
        type: 'address',
      },
    ],
    name: 'isAuthorized',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_addressToRevoke',
        type: 'address',
      },
    ],
    name: 'revokeAccessFromAddress',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        name: '_trustedServer',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'id',
        type: 'bytes32',
      },
      {
        indexed: false,
        name: 'url',
        type: 'string',
      },
    ],
    name: 'DataRequested',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'id',
        type: 'bytes32',
      },
      {
        indexed: false,
        name: 'url',
        type: 'string',
      },
      {
        indexed: false,
        name: 'validFrom',
        type: 'uint256',
      },
    ],
    name: 'DelayedDataRequested',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'id',
        type: 'bytes32',
      },
      {
        indexed: false,
        name: 'value',
        type: 'string',
      },
      {
        indexed: false,
        name: 'errorCode',
        type: 'uint256',
      },
    ],
    name: 'RequestFulfilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_url',
        type: 'string',
      },
    ],
    name: 'request',
    outputs: [
      {
        name: 'id',
        type: 'bytes32',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_url',
        type: 'string',
      },
      {
        name: '_delay',
        type: 'uint256',
      },
    ],
    name: 'delayedRequest',
    outputs: [
      {
        name: 'id',
        type: 'bytes32',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_id',
        type: 'bytes32',
      },
      {
        name: '_value',
        type: 'string',
      },
      {
        name: '_errorCode',
        type: 'uint256',
      },
    ],
    name: 'fillRequest',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
