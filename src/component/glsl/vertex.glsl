#define PI 3.141592653589793
precision lowp float;
uniform float utime;
varying float v_random;
attribute float random;
varying float v_position;


varying vec3 v_color;

float rand (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

// 旋转函数
mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

void main(){
    vec4 modalPosition = modelMatrix * vec4( position, 1.0 );
    v_color = vec3(color.rg, 1.0);
    v_random = random;
    modalPosition.y += cos(modalPosition.x / 2.0 + utime) ;

    // 计算角度
    float angle = atan(modalPosition.x, modalPosition.z);

    // 计算半径
    float distanceToCenter = length((modalPosition.xz));

    // 计算偏移角度
    float angleOffset = 1.0 / distanceToCenter * utime * 5.0;

    angle += angleOffset;

    // 算出新的x、z坐标
    modalPosition.x = distanceToCenter * cos(angle);
    modalPosition.z = distanceToCenter * sin(angle);

    v_position = modalPosition.y ;
    vec4 viewPostion =  viewMatrix * modalPosition;
    gl_Position = projectionMatrix * viewPostion;
    gl_PointSize =  rand(vec2(utime, 100.0)) * 100.0 / -viewPostion.z ;   // 设置近大远小
}