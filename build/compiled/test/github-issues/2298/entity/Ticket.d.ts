import { TicketProduct } from "./TicketProduct";
export declare class Ticket {
    id: number;
    shopId: string;
    chainId: string;
    ticketItems: TicketProduct[];
}
