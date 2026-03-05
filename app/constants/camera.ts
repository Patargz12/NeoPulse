/**
 * Camera and zoom configuration for the 3D Earth scene
 */

export const CAMERA_CONFIG = {
  // Initial camera position [x, y, z]
  // X: horizontal position, Y: vertical position (higher = bird's eye view), Z: distance
  position: [0, 1.2, 4] as [number, number, number],
  
  // Field of view in degrees
  // Lower = more zoomed in (telephoto), Higher = more zoomed out (wide-angle)
  fov: 50,
  
  // Zoom limits for OrbitControls
  minDistance: 2,   // Closest the user can zoom in
  maxDistance: 6,   // Farthest the user can zoom out
};

/**
 * Common camera angle presets:
 * 
 * BIRD'S EYE VIEW (current):
 *   position: [0, 1.2, 4] - Camera elevated, looking down at Earth
 *   Adjust Y value to change angle: higher Y = steeper bird's eye view
 * 
 * EYE LEVEL:
 *   position: [0, 0, 3.2] - Camera at same level as Earth's equator
 * 
 * LOW ANGLE:
 *   position: [0, -1, 4] - Camera below, looking up at Earth
 * 
 * DRAMATIC BIRD'S EYE:
 *   position: [0, 2.5, 3.5] - Steep downward angle
 * 
 * Tips:
 * - Y > 0: Bird's eye view (looking down)
 * - Y = 0: Eye level (straight on)
 * - Y < 0: Worm's eye view (looking up)
 * - Higher Y values = steeper angle
 */
