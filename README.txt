# BOOK OF TIME #

Technical Design
================

A WorkPiece can be represented as an ordered list of 2 dimensional "polygons".
For the term of this project, a polygon means a closed geometric shape made of connecting straight or curved (quadratic bezier) lines.

Each polygon has:

- An associated transform (position and rotation only; NO SCALING)
- A set of colors for each edge in the polygon
- A front face color
- A back face color

Initially square, the polygon may be divided into any number of pieces by
drawing an "inner" polygon that shares an edge (or a point on the edge, if the
edge is a straight edge) of the "outer" polygon.

Given a strict ordering, it should be possible to:

- extrude each polygon into a three dimensional geometry
- stack (from back to front) each geometric object on top of each other, so
  that there is no gaps between items
