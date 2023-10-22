uniform float uCustomTime;
uniform float uTime;

varying vec2 vUv;

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
    float hue = fract(uTime * 0.1);

    float red = vUv.x;
    float green = 1.0 - vUv.x;
    float blue = 1.0 - vUv.x;

    vec3 rgbColor = hsv2rgb(vec3(hue, 1.0, 1.0));

    gl_FragColor = vec4(rgbColor, 1.0);
}
