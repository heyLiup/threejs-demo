precision lowp float;
attribute vec3 position;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform float utime;

varying vec2 vUv;
varying float vElevation;

void main(){
    vUv = uv;
    vec4 modalPosition = modelMatrix * vec4( position, 1.0 );
    modalPosition.z = sin((modalPosition.x + utime) * 10.0) *0.05;
    modalPosition.z += sin((modalPosition.y + utime) * 10.0) *0.05;
    vElevation = modalPosition.z;
    gl_Position = projectionMatrix * viewMatrix * modalPosition;
}