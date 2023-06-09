precision lowp float;

void main(){
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5, 0.5));  //gl_PointCoord 当前片元在点粒子中的位置
    float strength = 1.0 - (distanceToCenter * 2.0);
    strength = pow(strength, 1.5);  // 发光点 渐变 代码
    // strength = step(0.3, strength);  
    gl_FragColor = vec4(1,0,0, strength);
}