import { AbstractRepository } from "../../../../src";
import { Broker } from "../entity/Broker";
export declare class BrokerRepository extends AbstractRepository<Broker> {
    createBroker(broker: Broker): Promise<Broker>;
}
