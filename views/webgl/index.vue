<template>
  <div class="home">
    <div class="canvas-container" ref="screenDom"></div>
    <!-- <div class="loading" v-if="progress != 100"></div>
    <div class="progress" v-if="progress != 100">
      <img src="./assets/loading.gif" alt="" />
      <span>地球加载中：{{ progress }}%</span>
    </div> -->
  </div>
</template>

<script>
import * as THREE from "three";
import { gsap } from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const lon2xyz = (R, longitude, latitude) => {
  let lon = (longitude * Math.PI) / 180; // 转弧度值
  const lat = (latitude * Math.PI) / 180; // 转弧度值
  lon = -lon; // js坐标系z坐标轴对应经度-90度，而不是90度

  // 经纬度坐标转球面坐标计算公式
  const x = R * Math.cos(lat) * Math.cos(lon);
  const y = R * Math.sin(lat);
  const z = R * Math.cos(lat) * Math.sin(lon);
  // 返回球面坐标
  return new THREE.Vector3(x, y, z);
};
export default {
  data() {
    return {
      progress: 0,
    };
  },
  mounted() {
    let screenDom = this.$refs.screenDom;

    // 创建场景
    let scene = new THREE.Scene();
    // 创建相机
    let camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100000
    );

    camera.position.set(0, 50, 300);
    // 创建渲染器
    let renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 将画布添加到页面中
    screenDom.appendChild(renderer.domElement);

    // 创建控制器
    let controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;

    // 创建星空的背景
    // let url = "./assets/25s.jpg";
    // let envTexture = new THREE.TextureLoader().load(url);
    // envTexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = new THREE.Color(0x030311);
    // scene.environment = envTexture;

    // 使用点材质创建星空效果
    const vertices = [];
    for (let i = 0; i < 500; i++) {
      const vertex = new THREE.Vector3();
      vertex.x = 800 * Math.random() - 400;
      vertex.y = 800 * Math.random() - 400;
      vertex.z = 800 * Math.random() - 400;
      vertices.push(vertex.x, vertex.y, vertex.z);
    }

    // 星空效果
    let starsGeometry = new THREE.BufferGeometry();
    starsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(vertices), 3)
    );

    // 加载点材质纹理
    const starsTexture = new THREE.TextureLoader().load("./images/stars.png");
    const starsMaterial = new THREE.PointsMaterial({
      size: 2,
      sizeAttenuation: true, // 尺寸衰减
      color: 0x4d76cf,
      transparent: true,
      opacity: 1,
      map: starsTexture,
    });

    let stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // 创建地球
    let earthGeometry = new THREE.SphereGeometry(50, 32, 32);
    let earthTexture = new THREE.TextureLoader().load("./images/map.jpg");

    let earthMaterial = new THREE.MeshBasicMaterial({
      map: earthTexture,
    });
    let earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    // 发光地球
    let lightTexture = new THREE.TextureLoader().load("./images/earth.jpg");
    let lightEarthGeometry = new THREE.SphereGeometry(53, 32, 32);
    let lightEarthMaterial = new THREE.MeshBasicMaterial({
      map: lightTexture,
      alphaMap: lightTexture,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
    let lightEarth = new THREE.Mesh(lightEarthGeometry, lightEarthMaterial);
    scene.add(lightEarth);

    // 添加地球内外发光精灵
    let spriteTexture = new THREE.TextureLoader().load("./images/glow.png");
    let spriteMaterial = new THREE.SpriteMaterial({
      map: spriteTexture,
      color: 0x4d76cf,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });
    let sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(155, 155, 0);
    scene.add(sprite);

    // 内发光
    let spriteTexture1 = new THREE.TextureLoader().load(
      "./images/innerGlow.png"
    );
    let spriteMaterial1 = new THREE.SpriteMaterial({
      map: spriteTexture1,
      color: 0x4d76cf,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });
    let sprite1 = new THREE.Sprite(spriteMaterial1);
    sprite1.scale.set(128, 128, 0);
    scene.add(sprite1);
    // eslint-disable-next-line no-unused-vars
    let scale = new THREE.Vector3(1, 1, 1);

    for (let i = 0; i < 30; i++) {
      // 实现光柱
      let lightPillarTexture = new THREE.TextureLoader().load(
        "./images/light_column.png"
      );
      let lightPillarGeometry = new THREE.PlaneGeometry(3, 20);
      let lightPillarMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: lightPillarTexture,
        alphaMap: lightPillarTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      let lightPillar = new THREE.Mesh(
        lightPillarGeometry,
        lightPillarMaterial
      );
      lightPillar.add(lightPillar.clone().rotateY(Math.PI / 2));

      // 创建波纹扩散效果
      let circlePlane = new THREE.PlaneGeometry(6, 6);
      let circleTexture = new THREE.TextureLoader().load("./images/label.png");
      let circleMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: circleTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      let circleMesh = new THREE.Mesh(circlePlane, circleMaterial);
      circleMesh.rotation.x = -Math.PI / 2;
      circleMesh.position.set(0, -7, 0);

      lightPillar.add(circleMesh);

      gsap.to(circleMesh.scale, {
        duration: 1 + Math.random() * 0.5,
        x: 2,
        y: 2,
        z: 2,
        repeat: -1,
        delay: Math.random() * 0.5,
        yoyo: true,
        ease: "power2.inOut",
      });

      // 设置光柱的位置

      // lightPillar.position.set(0, 50, 0);

      let lat = Math.random() * 180 - 90;
      let lon = Math.random() * 360 - 180;
      let position = lon2xyz(60, lon, lat);
      lightPillar.position.set(position.x, position.y, position.z);

      lightPillar.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        position.clone().normalize()
      );
      scene.add(lightPillar);
    }

    // 绕地球运行的月球
    let moonTexture = new THREE.TextureLoader().load("./images/moon.jpg");
    let moonMaterial = new THREE.MeshStandardMaterial({
      map: moonTexture,
      emissive: 0xffffff,
      emissiveMap: moonTexture,
    });
    let moonGeometry = new THREE.SphereGeometry(5, 32, 32);
    let moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.set(150, 0, 0);
    scene.add(moon);

    // 创建月球环
    let moonRingTexture = new THREE.TextureLoader().load(
      "./images/moon_ring.png"
    );
    let moonRingMaterial = new THREE.MeshBasicMaterial({
      map: moonRingTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
      opacity: 0.5,
    });
    let moonRingGeometry = new THREE.RingGeometry(145, 155, 64);
    let moonRing = new THREE.Mesh(moonRingGeometry, moonRingMaterial);
    moonRing.rotation.x = -Math.PI / 2;
    scene.add(moonRing);

    // eslint-disable-next-line no-unused-vars
    let time = {
      value: 0,
    };
    gsap.to(time, {
      value: 1,
      duration: 10,
      repeat: -1,
      ease: "linear",
      onUpdate: () => {
        moon.position.x = 150 * Math.cos(time.value * Math.PI * 2);
        moon.position.z = 150 * Math.sin(time.value * Math.PI * 2);
        moon.rotation.y = time.value * Math.PI * 8;
      },
    });

    function render() {
      controls.update();
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    }
    render();
    THREE.DefaultLoadingManager.onProgress = function (item, loaded, total) {
      console.log("DefaultLoadingManager", item, loaded, total);
      this.progress = new Number((loaded / total) * 100).toFixed(2);
    };
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
body {
  background-color: #000;
}
.canvas-container {
  width: 100vw;
  height: 100vh;
}
.home {
  width: 100vw;
  height: 100vh;
  transform-origin: 0 0;
}
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
  /* background-image: url(./assets/loading.jpg); */
  background-size: cover;
  filter: blur(50px);
  z-index: 100;
}
.progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
  z-index: 101;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #fff;
}
.progress > img {
  padding: 0 15px;
}

/* .title {
  width: 380px;
  height: 40px;
  position: fixed;
  right: 100px;
  top: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  line-height: 40px;
  text-align: center;
  color: #fff;
  border-radius: 5px;
  z-index: 110;
} */
</style>
