#define PI 3.141592653589793
precision lowp float;
uniform float utime;
varying float v_random;
attribute float random;
varying float v_position;


varying vec3 v_color;

highp float rand( const in vec2 uv ) {

	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );

	return fract( sin( sn ) * c );

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
    gl_PointSize =  100.0 / -viewPostion.z ;   // 设置近大远小
}