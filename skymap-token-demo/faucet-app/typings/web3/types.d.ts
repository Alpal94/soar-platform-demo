declare module 'types' {
    
    import * as BigNumber from 'bignumber.js';

    export interface Provider {
        sendAsync(payload: JSONRPCRequestPayload, callback: (err: Error, result: JSONRPCResponsePayload) => void): void;
    }

    export type ContractAbi = AbiDefinition[];

    export type AbiDefinition = FunctionAbi | EventAbi;

    export type FunctionAbi = MethodAbi | ConstructorAbi | FallbackAbi;

    export type ConstructorStateMutability = 'nonpayable' | 'payable';
    export type StateMutability = 'pure' | 'view' | ConstructorStateMutability;

    export interface MethodAbi {
        type: AbiType.Function;
        name: string;
        inputs: DataItem[];
        outputs: DataItem[];
        constant: boolean;
        stateMutability: StateMutability;
        payable: boolean;
    }

    export interface ConstructorAbi {
        type: AbiType.Constructor;
        inputs: DataItem[];
        payable: boolean;
        stateMutability: ConstructorStateMutability;
    }

    export interface FallbackAbi {
        type: AbiType.Fallback;
        payable: boolean;
    }

    export interface EventParameter extends DataItem {
        indexed: boolean;
    }

    export interface EventAbi {
        type: AbiType.Event;
        name: string;
        inputs: EventParameter[];
        anonymous: boolean;
    }

    export interface DataItem {
        name: string;
        type: string;
        components?: DataItem[];
    }

    export type OpCode = string;

    export interface StructLog {
        depth: number;
        error: string;
        gas: number;
        gasCost: number;
        memory: string[];
        op: OpCode;
        pc: number;
        stack: string[];
        storage: { [location: string]: string };
    }

    export interface TransactionTrace {
        gas: number;
        returnValue: any;
        structLogs: StructLog[];
    }

    export type Unit =
        | 'kwei'
        | 'ada'
        | 'mwei'
        | 'babbage'
        | 'gwei'
        | 'shannon'
        | 'szabo'
        | 'finney'
        | 'ether'
        | 'kether'
        | 'grand'
        | 'einstein'
        | 'mether'
        | 'gether'
        | 'tether';

    export interface JSONRPCRequestPayload {
        params: any[];
        method: string;
        id: number;
        jsonrpc: string;
    }

    export interface JSONRPCResponsePayload {
        result: any;
        id: number;
        jsonrpc: string;
    }

    export interface AbstractBlock {
        number: number | null;
        hash: string | null;
        parentHash: string;
        nonce: string | null;
        sha3Uncles: string;
        logsBloom: string | null;
        transactionsRoot: string;
        stateRoot: string;
        miner: string;
        difficulty: BigNumber;
        totalDifficulty: BigNumber;
        extraData: string;
        size: number;
        gasLimit: number;
        gasUsed: number;
        timestamp: number;
        uncles: string[];
    }

    export interface BlockWithoutTransactionData extends AbstractBlock {
        transactions: string[];
    }

    export interface BlockWithTransactionData extends AbstractBlock {
        transactions: Transaction[];
    }

    export interface Transaction {
        hash: string;
        nonce: number;
        blockHash: string | null;
        blockNumber: number | null;
        transactionIndex: number | null;
        from: string;
        to: string | null;
        value: BigNumber;
        gasPrice: BigNumber;
        gas: number;
        input: string;
    }

    export interface CallTxDataBase {
        to?: string;
        value?: number | string | BigNumber;
        gas?: number | string | BigNumber;
        gasPrice?: number | string | BigNumber;
        data?: string;
        nonce?: number;
    }

    export interface TxData extends CallTxDataBase {
        from: string;
    }

    export interface CallData extends CallTxDataBase {
        from?: string;
    }

    export interface FilterObject {
        fromBlock?: number | string;
        toBlock?: number | string;
        address?: string;
        topics?: LogTopic[];
    }

    export type LogTopic = null | string | string[];

    export interface DecodedLogEntry<A> extends LogEntry {
        event: string;
        args: A;
    }

    export interface DecodedLogEntryEvent<A> extends DecodedLogEntry<A> {
        removed: boolean;
    }

    export interface LogEntryEvent extends LogEntry {
        removed: boolean;
    }

    export interface LogEntry {
        logIndex: number | null;
        transactionIndex: number | null;
        transactionHash: string;
        blockHash: string | null;
        blockNumber: number | null;
        address: string;
        data: string;
        topics: string[];
    }

    export interface TxDataPayable extends TxData {
        value?: BigNumber;
    }

    export interface TransactionReceipt {
        blockHash: string;
        blockNumber: number;
        transactionHash: string;
        transactionIndex: number;
        from: string;
        to: string;
        status: null | string | 0 | 1;
        cumulativeGasUsed: number;
        gasUsed: number;
        contractAddress: string | null;
        logs: LogEntry[];
    }

    export enum AbiType {
        Function = 'function',
        Constructor = 'constructor',
        Event = 'event',
        Fallback = 'fallback',
    }

    export type ContractEventArg = string | BigNumber | number;

    export interface DecodedLogArgs {
        [argName: string]: ContractEventArg;
    }

    export interface LogWithDecodedArgs<ArgsType> extends DecodedLogEntry<ArgsType> { }
    export type RawLog = LogEntry;
    export enum SolidityTypes {
        Address = 'address',
        Uint256 = 'uint256',
        Uint8 = 'uint8',
        Uint = 'uint',
    }

    export interface TransactionReceiptWithDecodedLogs extends TransactionReceipt {
        logs: Array<LogWithDecodedArgs<DecodedLogArgs> | LogEntry>;
    }

    // Earliest is omitted by design. It is simply an alias for the `0` constant and
    // is thus not very helpful. Moreover, this type is used in places that only accept
    // `latest` or `pending`.
    export enum BlockParamLiteral {
        Latest = 'latest',
        Pending = 'pending',
    }

    export type BlockParam = BlockParamLiteral | number;

    export interface RawLogEntry {
        logIndex: string | null;
        transactionIndex: string | null;
        transactionHash: string;
        blockHash: string | null;
        blockNumber: string | null;
        address: string;
        data: string;
        topics: string[];
    }

    export interface Order {
        maker: string;
        taker: string;
        makerFee: BigNumber;
        takerFee: BigNumber;
        makerTokenAmount: BigNumber;
        takerTokenAmount: BigNumber;
        makerTokenAddress: string;
        takerTokenAddress: string;
        salt: BigNumber;
        exchangeContractAddress: string;
        feeRecipient: string;
        expirationUnixTimestampSec: BigNumber;
    }

    export interface SignedOrder extends Order {
        ecSignature: ECSignature;
    }

    /**
     * Elliptic Curve signature
     */
    export interface ECSignature {
        v: number;
        r: string;
        s: string;
    }
}