precision lowp float;
varying vec2 vUv;



precision lowp float;
varying vec4 vPostion;
varying vec4 gPostion;

void main(){
    vec4 red = vec4(1,0,0,1);
    vec4 yellow = vec4(1,1,0,1);
    vec4 mixcolor = mix(red, yellow, gPostion.y / 3.0); // 混合颜色 第三个参数为颜色临界点

    gl_FragColor = vec4(mixcolor.rgb, 1.0);
}