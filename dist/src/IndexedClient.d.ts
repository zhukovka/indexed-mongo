import { Db } from "./Db";
export interface IndexedClientOptions {
}
export declare class IndexedClient {
    static connect(name: string, options?: IndexedClientOptions): Promise<Db>;
}
