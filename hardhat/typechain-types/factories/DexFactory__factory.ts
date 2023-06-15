/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { DexFactory, DexFactoryInterface } from "../DexFactory";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token0",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token1",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "pool",
        type: "address",
      },
    ],
    name: "PoolCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenB",
        type: "address",
      },
    ],
    name: "createPool",
    outputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "getPool",
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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50613da2806100206000396000f3fe60806040523480156200001157600080fd5b50600436106200003a5760003560e01c8063531aa03e146200003f578063e34336151462000075575b600080fd5b6200005d60048036038101906200005791906200065a565b620000ab565b6040516200006c9190620006b2565b60405180910390f35b6200009360048036038101906200008d91906200065a565b620000ed565b604051620000a29190620006b2565b60405180910390f35b60006020528160005260406000206020528060005260406000206000915091509054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160362000160576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620001579062000756565b60405180910390fd5b6000808373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16106200019f578385620001a2565b84845b91509150600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160362000218576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200020f90620007c8565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff166000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161462000325576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200031c906200083a565b60405180910390fd5b600082826040516020016200033c929190620008ac565b6040516020818303038152906040528051906020012090506000816040516200036590620005e2565b8190604051809103906000f590508015801562000386573d6000803e3d6000fd5b5090508073ffffffffffffffffffffffffffffffffffffffff1663485cc95585856040518363ffffffff1660e01b8152600401620003c6929190620008dc565b600060405180830381600087803b158015620003e157600080fd5b505af1158015620003f6573d6000803e3d6000fd5b50505050809450846000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550846000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f9c5d829b9b23efc461f9aeef91979ec04bb903feb3bee4f26d22114abfc7335b87604051620005d09190620006b2565b60405180910390a35050505092915050565b613463806200090a83390190565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200062282620005f5565b9050919050565b620006348162000615565b81146200064057600080fd5b50565b600081359050620006548162000629565b92915050565b60008060408385031215620006745762000673620005f0565b5b6000620006848582860162000643565b9250506020620006978582860162000643565b9150509250929050565b620006ac8162000615565b82525050565b6000602082019050620006c96000830184620006a1565b92915050565b600082825260208201905092915050565b7f446578466163746f72793a204944454e544943414c5f544f4b454e5f4144445260008201527f4553530000000000000000000000000000000000000000000000000000000000602082015250565b60006200073e602383620006cf565b91506200074b82620006e0565b604082019050919050565b6000602082019050818103600083015262000771816200072f565b9050919050565b7f446578466163746f72793a205a45524f5f414444524553530000000000000000600082015250565b6000620007b0601883620006cf565b9150620007bd8262000778565b602082019050919050565b60006020820190508181036000830152620007e381620007a1565b9050919050565b7f446578466163746f72793a20544f4b454e5f504f4f4c5f455849535453000000600082015250565b600062000822601d83620006cf565b91506200082f82620007ea565b602082019050919050565b60006020820190508181036000830152620008558162000813565b9050919050565b60008160601b9050919050565b600062000876826200085c565b9050919050565b60006200088a8262000869565b9050919050565b620008a6620008a08262000615565b6200087d565b82525050565b6000620008ba828562000891565b601482019150620008cc828462000891565b6014820191508190509392505050565b6000604082019050620008f36000830185620006a1565b620009026020830184620006a1565b939250505056fe60a06040523480156200001157600080fd5b506040518060400160405280600981526020017f44657820546f6b656e00000000000000000000000000000000000000000000008152506040518060400160405280600381526020017f554458000000000000000000000000000000000000000000000000000000000081525060128260019081620000919190620003b7565b508160029081620000a39190620003b7565b5080600360006101000a81548160ff021916908360ff16021790555033600360016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050503373ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff16815250506200049e565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620001bf57607f821691505b602082108103620001d557620001d462000177565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026200023f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000200565b6200024b868362000200565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b600062000298620002926200028c8462000263565b6200026d565b62000263565b9050919050565b6000819050919050565b620002b48362000277565b620002cc620002c3826200029f565b8484546200020d565b825550505050565b600090565b620002e3620002d4565b620002f0818484620002a9565b505050565b5b8181101562000318576200030c600082620002d9565b600181019050620002f6565b5050565b601f82111562000367576200033181620001db565b6200033c84620001f0565b810160208510156200034c578190505b620003646200035b85620001f0565b830182620002f5565b50505b505050565b600082821c905092915050565b60006200038c600019846008026200036c565b1980831691505092915050565b6000620003a7838362000379565b9150826002028217905092915050565b620003c2826200013d565b67ffffffffffffffff811115620003de57620003dd62000148565b5b620003ea8254620001a6565b620003f78282856200031c565b600060209050601f8311600181146200042f57600084156200041a578287015190505b62000426858262000399565b86555062000496565b601f1984166200043f86620001db565b60005b82811015620004695784890151825560018201915060208501945060208101905062000442565b8683101562000489578489015162000485601f89168262000379565b8355505b6001600288020188555050505b505050505050565b608051612fa2620004c1600039600081816106210152611e440152612fa26000f3fe608060405234801561001057600080fd5b50600436106101215760003560e01c80636a627842116100ad578063a9059cbb11610071578063a9059cbb14610321578063ba9a7a5614610351578063c45a01551461036f578063d21220a71461038d578063dd62ed3e146103ab57610121565b80636a627842146102565780636d9a640a1461028657806370a08231146102a257806389afcb44146102d257806395d89b411461030357610121565b8063313ce567116100f4578063313ce567146101b0578063443cb4bc146101ce578063485cc955146101ec5780635a76f25e1461020857806363b0545f1461022657610121565b806306fdde0314610126578063095ea7b3146101445780630dfe16811461017457806318160ddd14610192575b600080fd5b61012e6103db565b60405161013b919061224e565b60405180910390f35b61015e60048036038101906101599190612309565b61046d565b60405161016b9190612364565b60405180910390f35b61017c6105d3565b604051610189919061238e565b60405180910390f35b61019a6105f9565b6040516101a791906123b8565b60405180910390f35b6101b8610602565b6040516101c591906123ef565b60405180910390f35b6101d6610619565b6040516101e391906123b8565b60405180910390f35b6102066004803603810190610201919061240a565b61061f565b005b610210610733565b60405161021d91906123b8565b60405180910390f35b610240600480360381019061023b919061244a565b610739565b60405161024d9190612364565b60405180910390f35b610270600480360381019061026b919061249d565b610c65565b60405161027d91906123b8565b60405180910390f35b6102a0600480360381019061029b91906124ca565b610f57565b005b6102bc60048036038101906102b7919061249d565b6115c7565b6040516102c991906123b8565b60405180910390f35b6102ec60048036038101906102e7919061249d565b611610565b6040516102fa92919061251d565b60405180910390f35b61030b611b27565b604051610318919061224e565b60405180910390f35b61033b60048036038101906103369190612309565b611bb9565b6040516103489190612364565b60405180910390f35b610359611e3c565b60405161036691906123b8565b60405180910390f35b610377611e42565b604051610384919061238e565b60405180910390f35b610395611e66565b6040516103a2919061238e565b60405180910390f35b6103c560048036038101906103c0919061240a565b611e8c565b6040516103d291906123b8565b60405180910390f35b6060600180546103ea90612575565b80601f016020809104026020016040519081016040528092919081815260200182805461041690612575565b80156104635780601f1061043857610100808354040283529160200191610463565b820191906000526020600020905b81548152906001019060200180831161044657829003601f168201915b5050505050905090565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036104dd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104d490612618565b60405180910390fd5b600033905082600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925856040516105c091906123b8565b60405180910390a3600191505092915050565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008054905090565b6000600360009054906101000a900460ff16905090565b60085481565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146106ad576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106a4906126aa565b60405180910390fd5b81600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050565b60095481565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036107a9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107a09061273c565b60405180910390fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101561082b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610822906127ce565b60405180910390fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610876919061281d565b600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546109049190612851565b600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516109a491906123b8565b60405180910390a3600033905082600560008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015610a70576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a67906128d1565b60405180910390fd5b82600560008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610af8919061281d565b600560008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600560008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054604051610c5191906123b8565b60405180910390a360019150509392505050565b600080600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401610cc3919061238e565b602060405180830381865afa158015610ce0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d049190612906565b90506000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401610d63919061238e565b602060405180830381865afa158015610d80573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610da49190612906565b9050600060085483610db6919061281d565b9050600060095483610dc8919061281d565b90506000805403610e62576103e880610de19190612933565b8183610ded9190612933565b11610e2d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e24906129c1565b60405180910390fd5b6103e8610e448284610e3f9190612933565b611f13565b610e4e919061281d565b9450610e5d60006103e8611f8d565b610ea3565b610ea060085460005484610e769190612933565b610e809190612a10565b60095460005484610e919190612933565b610e9b9190612a10565b612099565b94505b60008511610ee6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610edd90612ab3565b60405180910390fd5b610ef08686611f8d565b83600881905550826009819055503373ffffffffffffffffffffffffffffffffffffffff167f4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f8383604051610f4692919061251d565b60405180910390a250505050919050565b6000831180610f665750600082115b610fa5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f9c90612b45565b60405180910390fd5b60085483108015610fb7575060095482105b610ff6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fed90612bb1565b60405180910390fd5b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141580156110a25750600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614155b6110e1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110d890612c1d565b60405180910390fd5b6000806000600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690506000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008711156111ff5760008273ffffffffffffffffffffffffffffffffffffffff1663a9059cbb878a6040518363ffffffff1660e01b8152600401611178929190612c3d565b6020604051808303816000875af1158015611197573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111bb9190612c92565b9050806111fd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111f490612d0b565b60405180910390fd5b505b60008611156112cc5760008173ffffffffffffffffffffffffffffffffffffffff1663a9059cbb87896040518363ffffffff1660e01b8152600401611245929190612c3d565b6020604051808303816000875af1158015611264573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112889190612c92565b9050806112ca576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112c190612d77565b60405180910390fd5b505b8173ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401611305919061238e565b602060405180830381865afa158015611322573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113469190612906565b93508073ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401611381919061238e565b602060405180830381865afa15801561139e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113c29190612906565b925050506000856008546113d6919061281d565b83116113e35760006113fd565b856008546113f1919061281d565b836113fc919061281d565b5b905060008560095461140f919061281d565b831161141c576000611436565b8560095461142a919061281d565b83611435919061281d565b5b905060008211806114475750600081115b611486576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161147d90612e09565b60405180910390fd5b60006003836114959190612933565b6103e8866114a39190612933565b6114ad919061281d565b905060006003836114be9190612933565b6103e8866114cc9190612933565b6114d6919061281d565b9050620f42406009546008546114ec9190612933565b6114f69190612933565b81836115029190612933565b1015611543576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161153a90612e75565b60405180910390fd5b85600881905550846009819055508673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d82286868d8d6040516115b49493929190612e95565b60405180910390a3505050505050505050565b6000600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6000806000600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690506000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008273ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b815260040161169c919061238e565b602060405180830381865afa1580156116b9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116dd9190612906565b905060008273ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b815260040161171a919061238e565b602060405180830381865afa158015611737573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061175b9190612906565b90506000600460003073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905060005483826117b09190612933565b6117ba9190612a10565b965060005482826117cb9190612933565b6117d59190612a10565b95506000871180156117e75750600086115b611826576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161181d90612f4c565b60405180910390fd5b61183030826120b2565b60008573ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8a8a6040518363ffffffff1660e01b815260040161186d929190612c3d565b6020604051808303816000875af115801561188c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118b09190612c92565b9050806118f2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118e990612d0b565b60405180910390fd5b60008573ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8b8a6040518363ffffffff1660e01b815260040161192f929190612c3d565b6020604051808303816000875af115801561194e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119729190612c92565b9050806119b4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119ab90612d77565b60405180910390fd5b8673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016119ed919061238e565b602060405180830381865afa158015611a0a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a2e9190612906565b6008819055508573ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401611a6d919061238e565b602060405180830381865afa158015611a8a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611aae9190612906565b6009819055508973ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fdccd412f0b1252819cb1fd330b93224ca42612892bb3f4f789976e6d819364968b8b604051611b1392919061251d565b60405180910390a350505050505050915091565b606060028054611b3690612575565b80601f0160208091040260200160405190810160405280929190818152602001828054611b6290612575565b8015611baf5780601f10611b8457610100808354040283529160200191611baf565b820191906000526020600020905b815481529060010190602001808311611b9257829003601f168201915b5050505050905090565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603611c29576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611c209061273c565b60405180910390fd5b600033905082600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015611cb0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ca7906127ce565b60405180910390fd5b82600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054611cfb919061281d565b600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555082600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054611d899190612851565b600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef85604051611e2991906123b8565b60405180910390a3600191505092915050565b6103e881565b7f000000000000000000000000000000000000000000000000000000000000000081565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60006003821115611f7a5781905060006001600284611f329190612a10565b611f3c9190612851565b90505b81811015611f74578091506002818285611f599190612a10565b611f639190612851565b611f6d9190612a10565b9050611f3f565b50611f88565b60008214611f8757600190505b5b919050565b80600054611f9b9190612851565b60008190555080600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054611fec9190612851565b600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161208d91906123b8565b60405180910390a35050565b60008183106120a857816120aa565b825b905092915050565b806000546120c0919061281d565b60008190555080600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054612111919061281d565b600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516121b291906123b8565b60405180910390a35050565b600081519050919050565b600082825260208201905092915050565b60005b838110156121f85780820151818401526020810190506121dd565b60008484015250505050565b6000601f19601f8301169050919050565b6000612220826121be565b61222a81856121c9565b935061223a8185602086016121da565b61224381612204565b840191505092915050565b600060208201905081810360008301526122688184612215565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006122a082612275565b9050919050565b6122b081612295565b81146122bb57600080fd5b50565b6000813590506122cd816122a7565b92915050565b6000819050919050565b6122e6816122d3565b81146122f157600080fd5b50565b600081359050612303816122dd565b92915050565b600080604083850312156123205761231f612270565b5b600061232e858286016122be565b925050602061233f858286016122f4565b9150509250929050565b60008115159050919050565b61235e81612349565b82525050565b60006020820190506123796000830184612355565b92915050565b61238881612295565b82525050565b60006020820190506123a3600083018461237f565b92915050565b6123b2816122d3565b82525050565b60006020820190506123cd60008301846123a9565b92915050565b600060ff82169050919050565b6123e9816123d3565b82525050565b600060208201905061240460008301846123e0565b92915050565b6000806040838503121561242157612420612270565b5b600061242f858286016122be565b9250506020612440858286016122be565b9150509250929050565b60008060006060848603121561246357612462612270565b5b6000612471868287016122be565b9350506020612482868287016122be565b9250506040612493868287016122f4565b9150509250925092565b6000602082840312156124b3576124b2612270565b5b60006124c1848285016122be565b91505092915050565b6000806000606084860312156124e3576124e2612270565b5b60006124f1868287016122f4565b9350506020612502868287016122f4565b9250506040612513868287016122be565b9150509250925092565b600060408201905061253260008301856123a9565b61253f60208301846123a9565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061258d57607f821691505b6020821081036125a05761259f612546565b5b50919050565b7f617070726f766520746f20746865207a65726f2061646472657373206973206e60008201527f6f7420616c6c6f77656400000000000000000000000000000000000000000000602082015250565b6000612602602a836121c9565b915061260d826125a6565b604082019050919050565b60006020820190508181036000830152612631816125f5565b9050919050565b7f446578506f6f6c3a20494e495449414c495a4154494f4e5f464f52424944444560008201527f4e00000000000000000000000000000000000000000000000000000000000000602082015250565b60006126946021836121c9565b915061269f82612638565b604082019050919050565b600060208201905081810360008301526126c381612687565b9050919050565b7f7472616e7366657220746f20746865207a65726f20616464726573732069732060008201527f6e6f7420616c6c6f776564000000000000000000000000000000000000000000602082015250565b6000612726602b836121c9565b9150612731826126ca565b604082019050919050565b6000602082019050818103600083015261275581612719565b9050919050565b7f7472616e7366657220616d6f756e742063616e6e6f742065786365656420626160008201527f6c6e636500000000000000000000000000000000000000000000000000000000602082015250565b60006127b86024836121c9565b91506127c38261275c565b604082019050919050565b600060208201905081810360008301526127e7816127ab565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000612828826122d3565b9150612833836122d3565b925082820390508181111561284b5761284a6127ee565b5b92915050565b600061285c826122d3565b9150612867836122d3565b925082820190508082111561287f5761287e6127ee565b5b92915050565b7f696e73756666696369656e7420616c6c6f77616e636500000000000000000000600082015250565b60006128bb6016836121c9565b91506128c682612885565b602082019050919050565b600060208201905081810360008301526128ea816128ae565b9050919050565b600081519050612900816122dd565b92915050565b60006020828403121561291c5761291b612270565b5b600061292a848285016128f1565b91505092915050565b600061293e826122d3565b9150612949836122d3565b9250828202612957816122d3565b9150828204841483151761296e5761296d6127ee565b5b5092915050565b7f446578506f6f6c3a2042454c4f575f4d494e494d554d5f4c4951554944495459600082015250565b60006129ab6020836121c9565b91506129b682612975565b602082019050919050565b600060208201905081810360008301526129da8161299e565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000612a1b826122d3565b9150612a26836122d3565b925082612a3657612a356129e1565b5b828204905092915050565b7f446578506f6f6c3a20494e53554646494349454e545f4c49515549444954595f60008201527f4d494e5445440000000000000000000000000000000000000000000000000000602082015250565b6000612a9d6026836121c9565b9150612aa882612a41565b604082019050919050565b60006020820190508181036000830152612acc81612a90565b9050919050565b7f446578506f6f6c3a20494e53554646494349454e545f4f55545055545f414d4f60008201527f554e540000000000000000000000000000000000000000000000000000000000602082015250565b6000612b2f6023836121c9565b9150612b3a82612ad3565b604082019050919050565b60006020820190508181036000830152612b5e81612b22565b9050919050565b7f446578506f6f6c3a20494e53554646494349454e545f4c495155494449545900600082015250565b6000612b9b601f836121c9565b9150612ba682612b65565b602082019050919050565b60006020820190508181036000830152612bca81612b8e565b9050919050565b7f446578506f6f6c3a20494e56414c445f544f0000000000000000000000000000600082015250565b6000612c076012836121c9565b9150612c1282612bd1565b602082019050919050565b60006020820190508181036000830152612c3681612bfa565b9050919050565b6000604082019050612c52600083018561237f565b612c5f60208301846123a9565b9392505050565b612c6f81612349565b8114612c7a57600080fd5b50565b600081519050612c8c81612c66565b92915050565b600060208284031215612ca857612ca7612270565b5b6000612cb684828501612c7d565b91505092915050565b7f446578506f6f6c3a20544f4b454e305f5452414e534645525f4641494c454400600082015250565b6000612cf5601f836121c9565b9150612d0082612cbf565b602082019050919050565b60006020820190508181036000830152612d2481612ce8565b9050919050565b7f446578506f6f6c3a20544f4b454e315f5452414e534645525f4641494c454400600082015250565b6000612d61601f836121c9565b9150612d6c82612d2b565b602082019050919050565b60006020820190508181036000830152612d9081612d54565b9050919050565b7f446578506f6f6c3a20494e53554646494349454e545f494e5055545f414d4f5560008201527f4e54000000000000000000000000000000000000000000000000000000000000602082015250565b6000612df36022836121c9565b9150612dfe82612d97565b604082019050919050565b60006020820190508181036000830152612e2281612de6565b9050919050565b7f446578506f6f6c3a204b00000000000000000000000000000000000000000000600082015250565b6000612e5f600a836121c9565b9150612e6a82612e29565b602082019050919050565b60006020820190508181036000830152612e8e81612e52565b9050919050565b6000608082019050612eaa60008301876123a9565b612eb760208301866123a9565b612ec460408301856123a9565b612ed160608301846123a9565b95945050505050565b7f446578506f6f6c3a20494e53554646494349454e545f4c49515549444954595f60008201527f4255524e45440000000000000000000000000000000000000000000000000000602082015250565b6000612f366026836121c9565b9150612f4182612eda565b604082019050919050565b60006020820190508181036000830152612f6581612f29565b905091905056fea26469706673582212200dadd68882673c43e730551ee436d5362bac86ed6d0dcbdd546487c4d19aa3fc64736f6c63430008120033a26469706673582212206dd5ba5e6b6accb564d53b8ba60afbc3896b6c06c783bfa9cfab8fc861a0cea564736f6c63430008120033";

type DexFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DexFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DexFactory__factory extends ContractFactory {
  constructor(...args: DexFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DexFactory> {
    return super.deploy(overrides || {}) as Promise<DexFactory>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): DexFactory {
    return super.attach(address) as DexFactory;
  }
  override connect(signer: Signer): DexFactory__factory {
    return super.connect(signer) as DexFactory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DexFactoryInterface {
    return new utils.Interface(_abi) as DexFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DexFactory {
    return new Contract(address, _abi, signerOrProvider) as DexFactory;
  }
}