precision lowp float;
varying float v_position;
varying vec3 v_color;
varying float v_random;

void main(){
 
    gl_FragColor = vec4(v_color, v_random );
}