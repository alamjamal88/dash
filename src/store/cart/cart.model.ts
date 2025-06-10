export interface PrintPayload {
    fileName: string | null;
    colorType: string;
    printSize: string;
    printMedia: string;
    printSides: string;
    binding: string;
    copies: number;
    deleteAfterDelivery: boolean;
}
