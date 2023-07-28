export declare class PostWithDeleteDateColumn {
    id: number;
    title: string;
    description: string;
    deletedAt: Date;
    isSoftRemoved: boolean;
    beforeSoftRemove(): void;
    afterSoftRemove(): void;
}
