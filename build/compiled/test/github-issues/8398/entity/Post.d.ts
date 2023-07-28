export declare class Post {
    id: number;
    data: string;
    deletedAt: Date;
    beforeUpdateListener: number;
    afterUpdateListener: number;
    beforeSoftRemoveListener: number;
    afterSoftRemoveListener: number;
    beforeRecoverListener: number;
    afterRecoverListener: number;
    beforeUpdateSubscriber: number;
    afterUpdateSubscriber: number;
    beforeSoftRemoveSubscriber: number;
    afterSoftRemoveSubscriber: number;
    beforeRecoverSubscriber: number;
    afterRecoverSubscriber: number;
    beforeUpdate(): void;
    afterUpdate(): void;
    beforeSoftRemove(): void;
    afterSoftRemove(): void;
    beforeRecover(): void;
    afterRecover(): void;
}
