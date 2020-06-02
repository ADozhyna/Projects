import * as bresenham from '../components/tools/bresenham';

describe('getLineCoord', () => {
    it('should return empty array if flags === false', () => {
        const isDrawing = false;
        const result = bresenham.getLineCoord({ x: 1, y: 5 }, { x: 6, y: 10 }, isDrawing);
        expect(result).toEqual([]);
    });

    it('should return empty array when flags is not defined', () => {
        const result = bresenham.getLineCoord({ x: 0, y: 0 }, { x: 0, y: 0 });
        expect(result).toEqual([]);
    });

    it('should return coords', () => {
        const isDrawing = true;
        const result = bresenham.getLineCoord({ x: 0, y: 0 }, { x: 0, y: 0 }, isDrawing);
        expect(result).toEqual([{ x: 0, y: 0 }]);
    });
});

describe('getErrors', () => {
    it('should return error when no input', () => {
        expect(() => {
            bresenham.getLineCoord();
        }).toThrow();
    });
});