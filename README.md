#### 左上中布局,包含less和mock及ts配置，开箱即用


```glsl

// 随机函数
float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))*43758.5453123);
}

// 旋转函数
vec2 rotate(vec2 uv, float rotation, vec2 mid){
    return vec2(
        cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
        cos(rotation) * (uv.y - mid.y) + sin(rotation) * (uv.x - mid.x) + mid.x
    );
}


```

[参考工具书](https://thebookofshaders.com/10/?lan=ch)