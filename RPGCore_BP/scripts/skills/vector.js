// --- FILE: skills/vector.js (SỬA LẠI JSDOC TYPES) ---

export class Vector {
    /**
     * Subtracts one vector from another.
     * @param {{x: number, y: number, z: number}} a The first vector.
     * @param {{x: number, y: number, z: number}} b The vector to subtract.
     * @returns {{x: number, y: number, z: number}} The resulting vector.
     */
    static subtract(a, b) {
        return {
            x: a.x - b.x,
            y: a.y - b.y,
            z: a.z - b.z
        };
    }

    /**
     * Multiplies a vector by a scalar number.
     * @param {{x: number, y: number, z: number}} vector The vector.
     * @param {number} scalar The scalar to multiply by.
     * @returns {{x: number, y: number, z: number}} The resulting vector.
     */
    static multiply(vector, scalar) {
        return {
            x: vector.x * scalar,
            y: vector.y * scalar,
            z: vector.z * scalar
        };
    }

    /**
     * Calculates the magnitude (length) of a vector.
     * @param {{x: number, y: number, z: number}} vector The vector.
     * @returns {number} The magnitude of the vector.
     */
    static magnitude(vector) {
        return Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
    }

    /**
     * Calculates the dot product of two vectors.
     * @param {{x: number, y: number, z: number}} a The first vector.
     * @param {{x: number, y: number, z: number}} b The second vector.
     * @returns {number} The dot product.
     */
    static dot(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    /**
     * Calculates the angle in degrees between two vectors.
     * @param {{x: number, y: number, z: number}} a The first vector.
     * @param {{x: number, y: number, z: number}} b The second vector.
     * @returns {number} The angle in degrees.
     */
    static angleBetween(a, b) {
        const magA = Vector.magnitude(a);
        const magB = Vector.magnitude(b);
        if (magA === 0 || magB === 0) return 0;

        const dotProduct = Vector.dot(a, b);
        const cosAngle = dotProduct / (magA * magB);
        
        // Clamp the value to avoid floating point errors with Math.acos
        const clampedCos = Math.max(-1, Math.min(1, cosAngle));
        
        const angleRad = Math.acos(clampedCos);
        return angleRad * (180 / Math.PI); // Convert radians to degrees
    }

    /**
     * Normalizes a vector (makes its length 1).
     * @param {{x: number, y: number, z: number}} vector The vector to normalize.
     * @returns {{x: number, y: number, z: number}} The normalized vector.
     */
    static normalize(vector) {
        const mag = Vector.magnitude(vector);
        if (mag === 0) {
            return { x: 0, y: 0, z: 0 };
        }
        return {
            x: vector.x / mag,
            y: vector.y / mag,
            z: vector.z / mag
        };
    }

    /**
     * Adds two vectors together.
     * @param {{x: number, y: number, z: number}} a The first vector.
     * @param {{x: number, y: number, z: number}} b The second vector.
     * @returns {{x: number, y: number, z: number}} The resulting vector.
     */
    static add(a, b) {
        return {
            x: a.x + b.x,
            y: a.y + b.y,
            z: a.z + b.z
        };
    }
}

// --- HOẶC NẾU BẠN MUỐN SỬ DỤNG PROPER MINECRAFT TYPES ---

/**
 * @typedef {import("@minecraft/server").Vector3} Vector3
 */

// Sau đó có thể dùng Vector3 trong JSDoc
// Nhưng cách trên đơn giản hơn và không cần import