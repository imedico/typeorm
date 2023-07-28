import { Geography, Geometry, Point } from "../../../../../src";
export declare class Post {
    id: number;
    geom: Geometry;
    pointWithoutSRID: Point;
    point: Point;
    geog: Geography;
}
