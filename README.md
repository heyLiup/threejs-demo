<img width="1030" alt="image" src="https://github.com/heyLiup/threejs-demo/assets/30928738/3b292f30-b468-4794-b5ef-79b403ada18c">



## uv解释  

1. UV坐标是一个在计算机图形中常用的概念，它主要用于纹理映射，即将一个2D的图片（纹理）映射到3D的模型上。UV坐标系统与普通的坐标系统有些不同，它用的是U和V两个参数来描述一个对象的位置，这两个参数都是范围在[0, 1]的浮点数。

2. 当我们说一个模型的UV坐标，我们通常是指模型每一个顶点的UV坐标。举个例子，假设我们有一个简单的3D模型，一个正方体。正方体有8个顶点，但我们在处理UV坐标时，通常会对面进行单独处理，这样每个面都可以有自己的纹理。因此，我们可以把这个正方体看成是6个独立的平面，每个平面都有4个顶点。

3. 如果我们要给正方体的每一个面都贴上相同的纹理，我们就需要为每一个面的每一个顶点定义UV坐标。正方体的每个面都是一个平方，所以我们可以把每个面的UV坐标都设为：

- 左下角的顶点：(0, 0)
- 右下角的顶点：(1, 0)
- 右上角的顶点：(1, 1)
- 左上角的顶点：(0, 1)
4. 这样设置之后，纹理图片的左下角就会被映射到3D模型的面的左下角，纹理的右上角就会被映射到3D模型的面的右上角，其他地方的纹理会被平滑地映射到3D模型的面上。



```glsl

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

```

[参考工具书](https://thebookofshaders.com/10/?lan=ch)

1. Mod 取模(相当于 / )， 2.1 / 1 = 0.1; `一般用于重复`;
2. step(a, b) 表示如果b >= a, 则返回1.0， 如果b < a 返回0.0 `一般用户锐化`
3. mix(color1, color2, position) 颜色混合，第三个参数为临界点



### 建模工具
[blender](https://www.blender.org/thanks/)

1. shift + A 新建物体
2. 切换到编辑模式，可以对物体进行拉伸，以及面的删除
3. 切换到顶点选择模式，按住o(进入衰减编辑)，按住g开始调整，鼠标滚轮调整范围，按 x、y、z选择调整方向
4. 导出为glb文件
