precision highp float;

varying float vRandom;

void main() {
    gl_FragColor = vec4(1.0, vRandom, 0.0, 0.5);
}
