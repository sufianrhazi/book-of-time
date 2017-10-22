import { Vector2 } from 'three';

type LineSegment = [Vector2, Vector2];
type Triangle = [Vector2, Vector2, Vector2];
type Color = string;

/**
 * Calculate the point where two line segments intersect.
 * 
 * This uses code adapted from Andre LeMoth's "Tricks of Windows Game Programming Gurus"
 * See https://stackoverflow.com/a/1968345
 */
function getLineIntersectionPoint(a: LineSegment, b: LineSegment): Vector2 | null {
    const [p0, p1] = a;
    const [p2, p3] = b;
    const s1 = p1.clone().sub(p0);
    const s2 = p3.clone().sub(p2);

    const s = (-s1.y * (p0.x - p2.x) + s1.x * (p0.y - p2.y)) / (-s2.x * s1.y + s1.x * s2.y);
    const t = ( s2.x * (p0.y - p2.y) - s2.y * (p0.x - p2.x)) / (-s2.x * s1.y + s1.x * s2.y);

    if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
        return new Vector2(p0.x + (t * s1.x), p0.y + (t * s1.y));
    }
    return null;
}


function inPolygon(point: Vector2, polygon: Vector2[]): boolean {
    // odd or in/out method
    // There's a faster way to do this, as we could use
    // a getLineIntersectionPoint() variant that works with
    // horizontal rays extending to -Infinity (or +Infinity)
    const minX = polygon.reduce((min: number, pt: Vector2) => (min < pt.x ? min : pt.x), +Infinity);
    const left = point.clone();
    left.x = minX - 1;
    const segment: LineSegment = [left, point];
    var count = 0;
    if (getLineIntersectionPoint(segment, [polygon[polygon.length - 1], polygon[0]])) {
        count++;
    }
    for (var i = 0; i < polygon.length; ++i) {
        if (getLineIntersectionPoint(segment, [polygon[polygon.length - 1], polygon[0]])) {
            count++;
        }
    }
    return (count % 2) === 1;
}


function cutPolygon(polygon: Vector2[], lineSegments: Vector2[]): Vector2[][] {
    return [];
}


class Polygon {
    public static DEFAULT_COLOR: Color = '#DDDDDD';

    private points: Vector2[];
    private edgeColors: Color[];
    private frontColor: Color;
    private backColor: Color;

    public constructor(points, color=Polygon.DEFAULT_COLOR) {
        this.points = points;
        this.edgeColors = points.map(point => color);
        this.frontColor = color;
        this.backColor = color;
    }

    public cut(points: Vector2[]): Polygon[] {
        for (var i = 1; i <= points.length; ++i) {
            var edgeA = points[i - 1];
            var edgeB = points[i === points.length ? 0 : i];
        }
    }
}

/*
 * A WorkPiece can be represented as an ordered list of 2 dimensional "polygons".
 * 
 * For the term of this project, a polygon means a closed geometric shape made of
 * connecting straight or curved (quadratic bezier) lines.
 */
class WorkPiece {
    private polygons: Polygon[];


}