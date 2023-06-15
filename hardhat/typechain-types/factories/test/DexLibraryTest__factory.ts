/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  DexLibraryTest,
  DexLibraryTestInterface,
} from "../../test/DexLibraryTest";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserveIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserveOut",
        type: "uint256",
      },
    ],
    name: "getAmountOut",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserveA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserveB",
        type: "uint256",
      },
    ],
    name: "quote",
    outputs: [
      {
        internalType: "uint256",
        name: "amountB",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506105f8806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063054d50d41461003b578063ad615dec1461006b575b600080fd5b6100556004803603810190610050919061029f565b61009b565b6040516100629190610301565b60405180910390f35b6100856004803603810190610080919061029f565b6100b1565b6040516100929190610301565b60405180910390f35b60006100a88484846100c7565b90509392505050565b60006100be8484846101b1565b90509392505050565b600080841161010b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101029061039f565b60405180910390fd5b60008311801561011b5750600082115b61015a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161015190610431565b60405180910390fd5b60006103e58561016a9190610480565b90506000838261017a9190610480565b90506000826103e88761018d9190610480565b61019791906104c2565b905080826101a59190610525565b93505050509392505050565b60008084116101f5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101ec906105a2565b60405180910390fd5b6000831180156102055750600082115b610244576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161023b90610431565b60405180910390fd5b8282856102519190610480565b61025b9190610525565b90509392505050565b600080fd5b6000819050919050565b61027c81610269565b811461028757600080fd5b50565b60008135905061029981610273565b92915050565b6000806000606084860312156102b8576102b7610264565b5b60006102c68682870161028a565b93505060206102d78682870161028a565b92505060406102e88682870161028a565b9150509250925092565b6102fb81610269565b82525050565b600060208201905061031660008301846102f2565b92915050565b600082825260208201905092915050565b7f4465784c6962726172793a20494e53554646494349454e545f494e5055545f4160008201527f4d4f554e54000000000000000000000000000000000000000000000000000000602082015250565b600061038960258361031c565b91506103948261032d565b604082019050919050565b600060208201905081810360008301526103b88161037c565b9050919050565b7f4465784c6962726172793a20494e53554646494349454e545f4c49515549444960008201527f5459000000000000000000000000000000000000000000000000000000000000602082015250565b600061041b60228361031c565b9150610426826103bf565b604082019050919050565b6000602082019050818103600083015261044a8161040e565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061048b82610269565b915061049683610269565b92508282026104a481610269565b915082820484148315176104bb576104ba610451565b5b5092915050565b60006104cd82610269565b91506104d883610269565b92508282019050808211156104f0576104ef610451565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061053082610269565b915061053b83610269565b92508261054b5761054a6104f6565b5b828204905092915050565b7f4465784c6962726172793a20494e53554646494349454e545f414d4f554e5400600082015250565b600061058c601f8361031c565b915061059782610556565b602082019050919050565b600060208201905081810360008301526105bb8161057f565b905091905056fea2646970667358221220f4874d93410973eb6d29f2ced2ac45a0cc5b87dd7baedf653536b47f0f6a150364736f6c63430008120033";

type DexLibraryTestConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DexLibraryTestConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DexLibraryTest__factory extends ContractFactory {
  constructor(...args: DexLibraryTestConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DexLibraryTest> {
    return super.deploy(overrides || {}) as Promise<DexLibraryTest>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): DexLibraryTest {
    return super.attach(address) as DexLibraryTest;
  }
  override connect(signer: Signer): DexLibraryTest__factory {
    return super.connect(signer) as DexLibraryTest__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DexLibraryTestInterface {
    return new utils.Interface(_abi) as DexLibraryTestInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DexLibraryTest {
    return new Contract(address, _abi, signerOrProvider) as DexLibraryTest;
  }
}
