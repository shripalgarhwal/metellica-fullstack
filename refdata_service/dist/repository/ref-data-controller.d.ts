import { ICounterparty } from "./ref-data-interface";
export declare class RefDataController {
    getAllCommodity(): Promise<ICounterparty[]>;
    getAllCounterparty(): Promise<ICounterparty[]>;
    getAllLocation(): Promise<ICounterparty[]>;
}
