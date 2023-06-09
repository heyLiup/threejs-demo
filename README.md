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
4. distance 这个函数接受两个参数 p0 和 p1，它们都是同样类型的向量，可以是 float、vec2、vec3 或者 vec4。如果你传入两个 vec2，函数会返回这两个二维向量之间的欧几里得距离


### 建模工具
[blender](https://www.blender.org/thanks/)

1. shift + A 新建物体
2. 切换到编辑模式，可以对物体进行拉伸，以及面的删除
3. 选中点，按住g开始调整，鼠标滚轮调整范围，按 x、y、z选择调整方向
4. 导出为glb文件



### glsl 变量

1. 当使用 THREE.Points 时
  - gl_PointCoord 是一个内置的输入变量，它提供了当前片元在点粒子中的位置。它是一个二维向量，其 x 和 y 分量的值在 [0, 1] 之间。gl_PointCoord 的 (0.0, 0.0) 位于点粒子的左下角，(1.0, 1.0) 位于右上角。中心点就是 (0.5, 0.5)
  - gl_PointSize 点粒子的大小
2. glsl 通用变量
  - gl_Position：在顶点着色器中，这是一个输出变量，你可以使用它来设置当前顶点的位置。在剪裁和光栅化阶段之后，gl_Position 将被用于计算片元的位置。
  - gl_FragCoord：在片元着色器中，这个变量包含了当前片元在窗口中的位置。gl_FragCoord.xy 是片元的窗口空间位置，gl_FragCoord.z 是该片元的深度值，gl_FragCoord.w 是 1/gl_Position.w。
  - gl_FrontFacing：在片元着色器中，这个只读变量指示了当前片元是否为正面朝向。如果是，那么它的值为 true，否则为 false。
  - uniform 变量：这些变量是在主程序中设置的，对所有片元都相同。它们可以是任何类型，包括浮点数、向量、矩阵、采样器等。
  - varying 变量：这些变量是在顶点着色器中设置的，然后在片元着色器中插值得到的。它们可以用于传递从顶点着色器到片元着色器的数据。


### 实现一个球发光的渐变效果

```glsl

    float distanceToCenter = distance(gl_PointCoord, vec2(0.5, 0.5));
    float strength = 1.0 - (distanceToCenter * 2.0);
    strength = pow(strength, 1.5);  
    // strength = step(0.3, strength);  
    gl_FragColor = vec4(1,0,0, strength);  // 发光点 渐变 代码

```