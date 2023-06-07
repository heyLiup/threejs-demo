precision lowp float;
varying vec2 vUv;
varying float vElevation;
uniform float utime;

uniform sampler2D uTexture;

// 随机函数
float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))*43758.5453123);
}

// 旋转函数
vec2 rotate(vec2 uv, float rotation, vec2 mid){
    return vec2(
        cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
        cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

void main(){
    // step(a, b) 表示如果b >= a, 则返回1.0， 如果b < a 返回0.0
    // mod 取模(相当于/)， 2.1 / 1 = 0.1;
    // vec2 rotateUv = rotate(vUv, -utime, vec2(0.5));
    // float strength = step(0.8, mod(rotateUv.y + (utime * 0.1) * 10.0, 1.0));
    // strength += step(0.8, mod(rotateUv.x  + (utime * 0.1) * 10.0, 1.0));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    vec2 rotateUv = rotate(vUv, - utime * 5.0, vec2(0.5));
    float alpha = 1.0 - step(0.5, distance(vUv, vec2(0.5)));
    float angle = atan(rotateUv.x - 0.5, rotateUv.y - 0.5);
    float strength = (angle + 3.14) / 6.28;
    gl_FragColor = vec4(strength, strength, strength, alpha);


    // 圆环
    // float strength =  step(0.1, abs(distance(vUv, vec2(0.5)) - 0.25));
    // gl_FragColor = vec4(1.0, 1.0, 1.0, 0);
}