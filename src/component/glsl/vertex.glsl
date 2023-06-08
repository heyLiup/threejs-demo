precision lowp float;

varying vec4 vPostion;
varying vec4 gPostion;

void main(){
    vec4 modalPosition = modelMatrix * vec4( position, 1.0 );
    vPostion = modalPosition;
    gPostion = vec4( position, 1.0 );
    gl_Position = projectionMatrix * viewMatrix * modalPosition;
}