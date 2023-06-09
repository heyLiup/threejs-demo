precision lowp float;

uniform vec3 uPosition;
uniform float utime;

void main(){
    vec4 modalPosition = modelMatrix * vec4( position, 1.0 );
    modalPosition.xyz += uPosition * utime;
    gl_Position = projectionMatrix * viewMatrix * modalPosition;
    gl_PointSize = 50.0;
}