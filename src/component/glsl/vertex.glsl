precision lowp float;
attribute vec3 position;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform float utime;

varying vec2 vUv;

void main(){
    vUv = uv;
    vec4 modalPosition = modelMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * viewMatrix * modalPosition;
}