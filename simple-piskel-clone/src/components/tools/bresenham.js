function getLineCoord(p0, p1, flags) {
    let { x, y } = p0;
    const dx = Math.abs(x - p1.x);
    const dy = Math.abs(y - p1.y);
    const sx = (x < p1.x) ? 1 : -1;
    const sy = (y < p1.y) ? 1 : -1;
    let error = dx - dy;
    const coord = [];

    while (flags) {
        coord.push({ x, y });

        if ((x === p1.x) && (y === p1.y)) {
            break;
        }

        const e2 = error * 2;
        if (e2 > -dy) {
            error -= dy;
            x += sx;
        }
        if (e2 < dx) {
            error += dx;
            y += sy;
        }
    }
    return coord;
}

export { getLineCoord }