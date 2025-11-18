import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { StarBackground } from './StarBackground';
import { DayBackground } from './DayBackground';

// Keep continent colors and data from your original component
const continentColors = {
  Africa:   { light: '#333333', dark: '#FFFFFF' },
  Europe:   { light: '#0A3BFF', dark: '#C2CEFF' },
  Asia:     { light: '#00257A', dark: '#709BFF' },
  'North America': { light: '#ffe0e6', dark: '#433142' },
  'South America': { light: '#fee4c3', dark: '#443619' },
  Oceania:  { light: '#e3f7f1', dark: '#0f3633' },
  Antarctica:{ light: '#f7faff', dark: '#232e35' },
  default:  { light: '#e8e8e8', dark: '#222831' },
};

const continentSections = {
  Africa: 'Hackathons',
  Europe: 'Projects',
  Asia: 'Contact',
};

const continentData = {
  Africa: [
    { country: 'South Africa', projects: ['BCG Platinion Hackathon 2025'] },
    { country: 'Nigeria', projects: ["Bet'25 Software Hackathon"] },
    { country: 'Egypt', projects: ['Geekulcha Annual Hack 2025'] },
    { country: 'Morocco', projects: ['GradHackathon'] },
    { country: 'Cape Verde', projects: ["Foundations' Hackathon"] }
  ],
  Europe: [
    { country: 'France', projects: ['EchoLens Classification'] },
    { country: 'Austria', projects: ['News Article Categorization'] },
    { country: 'Germany', projects: ['Climate Connect'] },
    { country: 'Croatia', projects: ['Hacker News'] },
    { country: 'Italy', projects: ['Heart Failure Model'] },
    { country: 'Spain', projects: ['Cricket Predictive Model'] }
  ],
  Asia: [
    { country: 'Contact Info', projects: ['LinkedIn', 'GitHub', 'Email', 'Phone'] }
  ]
};

// Minimal country coordinates for the countries above to avoid heavy GeoJSON work
const countryCoords = {
  'South Africa': { lat: -26.2041, lon: 28.0473 },
  'Nigeria': { lat: 6.5244, lon: 3.3792 },
  'Egypt': { lat: 30.0444, lon: 31.2357 },
  'Morocco': { lat: 34.0209, lon: -6.8417 },
  'Cape Verde': { lat: 14.9330, lon: -23.5133 },
  'France': { lat: 48.8566, lon: 2.3522 },
  'Austria': { lat: 48.2082, lon: 16.3738 },
  'Germany': { lat: 52.52, lon: 13.4050 },
  'Croatia': { lat: 45.8150, lon: 15.9819 },
  'Italy': { lat: 41.9028, lon: 12.4964 },
  'Spain': { lat: 40.4168, lon: -3.7038 },
  'Contact Info': { lat: 1.3521, lon: 103.8198 },
};

function getContinentFromCountryName(countryName) {
  const map = {
    'South Africa': 'Africa',
    'Nigeria': 'Africa',
    'Egypt': 'Africa',
    'Morocco': 'Africa',
    'Cape Verde': 'Africa',
    'Croatia': 'Europe',
    'Italy': 'Europe',
    'Spain': 'Europe',
    'France': 'Europe',
    'Germany': 'Europe',
    'Austria': 'Europe',
    'China': 'Asia',
    'Contact Info': 'Asia',
  };
  return map[countryName] || 'default';
}

function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export default function GlobeSection({ isDark, onSectionSelect }) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const animationIdRef = useRef(null);
  const markersGroupRef = useRef(null);
  const hoveredLineRef = useRef(null);

  const [hoveredContinent, setHoveredContinent] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 1000);
    cameraRef.current = camera;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
  controls.autoRotate = true;
  // Increased rotation speed to make globe feel more lively
  controls.autoRotateSpeed = 2.2;
  // adjust minDistance to allow closer zoom relative to the smaller globe
  controls.minDistance = 1.6;
    controls.maxDistance = 10;
    controlsRef.current = controls;

    // Lighting (keep subtle like the react-globe styling)
    const amb = new THREE.AmbientLight(isDark ? 0x222831 : 0xffffff, 0.9);
    scene.add(amb);
    const dir = new THREE.DirectionalLight(0xffffff, 0.6);
    dir.position.set(5, 3, 5);
    scene.add(dir);

    // NOTE: We deliberately avoid setting a solid background color here so that
    // the starfield behind the globe (StarBackground) remains visible in dark mode.

  // Reduce globe radius to make the globe visually smaller on screen
  const radius = 1.1;
    const sphereGeo = new THREE.SphereGeometry(radius, 64, 64);
    // Use Standard material for slightly richer lighting and more modern look
    // Globe color styling matching react-globe props: globeColor dark '#232334' or light '#e6edfa'
    const sphereMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x232334 : 0xe6edfa,
      metalness: 0.05,
      roughness: 0.6,
      emissive: isDark ? 0x03233f : 0x000000,
      emissiveIntensity: isDark ? 0.06 : 0,
    });
    const earth = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(earth);
    
  // Compute a camera distance so the globe fills a consistent portion of the view
  // visibleHeight = 2 * distance * tan(fov/2)
  // We want sphere diameter (2*radius) to be `fitFraction` of visibleHeight
  const fitFraction = 0.68; // adjust to taste (0.0-1.0)
  const fovRad = (camera.fov * Math.PI) / 180;
  const initialDistance = radius / (Math.tan(fovRad / 2) * fitFraction);
  camera.position.set(0, 0, initialDistance);
  camera.lookAt(0, 0, 0);
  // make controls distances relative to globe radius so zooming/limits scale correctly
  controls.minDistance = radius * 1.2;
  controls.maxDistance = radius * 8;
  controls.update();

    const atmosphereGeo = new THREE.SphereGeometry(radius * 1.03, 64, 64);
    // Subtle atmosphere tint similar to react-globe styling
    const atmosphereMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x58d6ff : 0x9fc8ff,
      transparent: true,
      opacity: isDark ? 0.08 : 0.05,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    atmosphere.scale.set(1.03, 1.03, 1.03);
    scene.add(atmosphere);

    // CONTINENT SHADING: try to load a small local equirectangular texture first
    // (bundled in /public/assets/), and fall back to a remote URL if missing.
    try {
      const loader = new THREE.TextureLoader();
      const localTex = '/assets/world_map_low_res.png';
      const remoteTex = '/assets/world_map_low_res.png'; // Fallback to the same local asset

      const applyTexture = (tex) => {
        tex.encoding = THREE.sRGBEncoding;
        tex.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);
        const landMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: isDark ? 0.85 : 0.9 });
        const landSphere = new THREE.Mesh(new THREE.SphereGeometry(radius * 1.001, 64, 64), landMat);
        landSphere.renderOrder = 1;
        scene.add(landSphere);
      };

      loader.load(localTex, applyTexture, undefined, () => {
        loader.load(remoteTex, applyTexture, undefined, () => {
          // both failed; continents will be absent but app remains fast
        });
      });
    } catch (e) {
      // ignore any texture loader errors
    }

  // GRATICULE / GRID LINES: draw latitude and longitude lines for visual detail
  const gridGroup = new THREE.Group();
  // Graticule styling: keep visible but subtle (react-globe shows graticules)
  const gridMaterial = new THREE.LineBasicMaterial({ color: isDark ? 0x58d6ff : 0xffffff, opacity: isDark ? 0.18 : 0.12, transparent: true });
    // latitudes
    for (let lat = -60; lat <= 60; lat += 15) {
      const latGeom = new THREE.BufferGeometry();
      const points = [];
      for (let lon = -180; lon <= 180; lon += 6) {
        const v = latLonToVector3(lat, lon, radius + 0.001);
        points.push(v.x, v.y, v.z);
      }
      latGeom.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
      const latLine = new THREE.Line(latGeom, gridMaterial);
      gridGroup.add(latLine);
    }
    // longitudes
    for (let lon = -180; lon < 180; lon += 15) {
      const lonGeom = new THREE.BufferGeometry();
      const points = [];
      for (let lat = -90; lat <= 90; lat += 4) {
        const v = latLonToVector3(lat, lon, radius + 0.001);
        points.push(v.x, v.y, v.z);
      }
      lonGeom.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
      const lonLine = new THREE.Line(lonGeom, gridMaterial);
      gridGroup.add(lonLine);
    }
    gridGroup.renderOrder = 2;
    scene.add(gridGroup);

    // INTERACTIVE CONTINENTS: lazy-load a simplified continents GeoJSON during idle
    // and render outlines slightly above the globe as Line objects. This is non-blocking.
    const continentsGroup = new THREE.Group();
    continentsGroup.name = 'continentsGroup';
    scene.add(continentsGroup);

    const loadContinents = () => {
      // Try local simplified continents first (bundled in /public/assets/),
      // then fall back to a remote source.
      const localUrl = '/assets/continents.geo.json';
      const remoteUrl = '/assets/continents.geo.json'; // Fallback to the same local asset

      const processGeo = (geo) => {
        const features = geo.features || [];
        features.forEach((feat) => {
          const props = feat.properties || {};
          const contName = props.CONTINENT || props.continent || props.Name || props.name || props.NAME || 'unknown';
          const geom = feat.geometry;
          if (!geom) return;
          const rings = [];
          if (geom.type === 'Polygon') {
            rings.push(...geom.coordinates);
          } else if (geom.type === 'MultiPolygon') {
            geom.coordinates.forEach((poly) => rings.push(...poly));
          }

          rings.forEach((ring) => {
            const points = [];
            for (let i = 0; i < ring.length; i += 1) {
              const lon = ring[i][0];
              const lat = ring[i][1];
              const v = latLonToVector3(lat, lon, radius + 0.007);
              points.push(v.x, v.y, v.z);
            }
            if (points.length < 3) return;
            const geomLine = new THREE.BufferGeometry();
            geomLine.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));

            // Normalize continent name to match our keys (Africa, Europe, Asia, etc.)
            const normalized =
              contName.includes('Africa') ? 'Africa' :
              contName.includes('Europe') ? 'Europe' :
              contName.includes('Asia') ? 'Asia' :
              contName;

            const palette = continentColors[normalized] || continentColors.default;
            const lineColor = isDark ? palette.dark : palette.light;

            // Colored outline per continent, slightly opaque
            const mat = new THREE.LineBasicMaterial({
              color: new THREE.Color(lineColor),
              linewidth: 2, // Increased line thickness for better visibility
              transparent: true,
              opacity: 0.85, // Slightly reduced opacity for a softer look
            });

            const line = new THREE.LineLoop(geomLine, mat);
            line.userData = { continent: normalized };
            continentsGroup.add(line);
          });
        });
      };

      // Try local first
      fetch(localUrl)
        .then((r) => {
          if (!r.ok) throw new Error('local not found');
          return r.json();
        })
        .then(processGeo)
        .catch(() => {
          // fallback to remote
          fetch(remoteUrl)
            .then((r) => r.json())
            .then(processGeo)
            .catch(() => {
              // ignore failures; continents are optional
            });
        });
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadContinents, { timeout: 3000 });
    } else {
      setTimeout(loadContinents, 1200);
    }

    // create markers for the countries in continentData
    const markersGroup = new THREE.Group();
    markersGroupRef.current = markersGroup;

    const makeSpriteTexture = (color) => {
      const size = 64;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      // richer gradient: bright center, subtle halo
      const center = color;
      const halo = 'rgba(120,220,255,0.08)';
      const grd = ctx.createRadialGradient(size/2, size/2, 1, size/2, size/2, size/1.6);
      grd.addColorStop(0, center);
      grd.addColorStop(0.35, center);
      grd.addColorStop(0.6, halo);
      grd.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(size/2, size/2, size/2 - 1, 0, Math.PI * 2);
      ctx.fill();
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    };

    // flatten country list from continentData
    const markerNames = [];
    Object.values(continentData).forEach(arr => arr.forEach(item => markerNames.push(item.country)));

    markerNames.forEach((name, idx) => {
      const coord = countryCoords[name];
      if (!coord) return;
      const { lat, lon } = coord;
    const pos = latLonToVector3(lat, lon, radius + 0.015);
      const cont = getContinentFromCountryName(name);
      const hex = continentColors[cont] ? (isDark ? continentColors[cont].dark : continentColors[cont].light) : continentColors.default.light;
      const tex = makeSpriteTexture(hex);
      const mat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        depthTest: true,
        depthWrite: false,
        opacity: 0.9, // Reduced opacity for a more subtle effect
      });
      const sprite = new THREE.Sprite(mat);
      sprite.position.copy(pos);
      const baseScale = 0.08 * (radius / 1.6) * (window.devicePixelRatio > 1 ? 1.2 : 1); // Slightly larger markers
      sprite.scale.set(baseScale, baseScale, baseScale);
      sprite.userData = { name, idx, baseScale };
      markersGroup.add(sprite);
    });

    scene.add(markersGroup);

    // animate loop
    const start = Date.now();
    const animate = () => {
      const t = (Date.now() - start) / 1000;
      if (markersGroup && markersGroup.children.length) {
        markersGroup.children.forEach((s, i) => {
          const bs = s.userData.baseScale || 0.04;
          // speed up pulse frequency for a snappier effect
          const pulse = 1 + 0.25 * Math.sin(t * 3.2 + i);
          s.scale.set(bs * pulse, bs * pulse, bs * pulse);
        });
      }
      controls.update();
      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };
    animate();

    // resize
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(window.devicePixelRatio);
      // Recompute camera distance so the globe keeps the same visual size on resize
      const fitFraction = 0.68;
      const fovRad = (camera.fov * Math.PI) / 180;
      const newDistance = radius / (Math.tan(fovRad / 2) * fitFraction);
      camera.position.set(0, 0, newDistance);
      controls.update();
    };
    window.addEventListener('resize', onResize);

    // pointer handling
    const onPointerMove = (ev) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
      raycasterRef.current.setFromCamera(mouseRef.current, camera);

      // First check continents (if loaded)
      const continentObjs = continentsGroup.children || [];
      let continentHit = null;
      if (continentObjs.length) {
        const ints = raycasterRef.current.intersectObjects(continentObjs, true);
        if (ints.length > 0) {
          continentHit = ints[0].object;
        }
      }

      if (continentHit) {
        const contName = continentHit.userData?.continent;
        if (hoveredLineRef.current !== continentHit) {
          // restore previous
          if (hoveredLineRef.current && hoveredLineRef.current.material) {
            // default stroke color per sample (neutral gray)
            hoveredLineRef.current.material.opacity = isDark ? 0.9 : 0.9;
            hoveredLineRef.current.material.color.set(0x666666);
          }
          // highlight new
          if (continentHit.material) {
            // highlight color per sample: '#3a7afe'
            continentHit.material.opacity = 1.0;
            continentHit.material.color.set(0x3a7afe);
          }
          hoveredLineRef.current = continentHit;
        }
        setHoveredContinent(contName);
        controls.autoRotate = false;
        return;
      }

      // otherwise check markers
      const intersects = raycasterRef.current.intersectObjects(markersGroup.children, true);
      if (intersects.length > 0) {
        const sprite = intersects[0].object;
        const name = sprite.userData?.name;
        if (name) {
          const cont = getContinentFromCountryName(name);
          setHoveredContinent(cont);
          controls.autoRotate = false;
        }
      } else {
        // restore any highlighted continent line
          if (hoveredLineRef.current && hoveredLineRef.current.material) {
          hoveredLineRef.current.material.opacity = isDark ? 0.9 : 0.9;
          hoveredLineRef.current.material.color.set(0x666666);
          hoveredLineRef.current = null;
        }
        setHoveredContinent(null);
        controls.autoRotate = true;
      }
    };

    const onClick = (ev) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
      raycasterRef.current.setFromCamera(mouseRef.current, camera);

      // if continents present, prefer them
      const continentInts = raycasterRef.current.intersectObjects(continentsGroup.children || [], true);
      if (continentInts.length > 0) {
        const line = continentInts[0].object;
        const contName = line.userData?.continent;
        if (contName && continentSections[contName] && onSectionSelect) {
          onSectionSelect(continentSections[contName]);
          return;
        }
      }

      const intersects = raycasterRef.current.intersectObjects(markersGroup.children, true);
      if (intersects.length > 0) {
        const sprite = intersects[0].object;
        const name = sprite.userData?.name;
        if (name) {
          const cont = getContinentFromCountryName(name);
          if (continentSections[cont] && onSectionSelect) onSectionSelect(continentSections[cont]);
        }
      }
    };

    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('click', onClick);

    // cleanup
    return () => {
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('click', onClick);
      cancelAnimationFrame(animationIdRef.current);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      if (markersGroup) {
        markersGroup.children.forEach((c) => {
          if (c.material && c.material.map) c.material.map.dispose();
          if (c.material) c.material.dispose();
        });
        scene.remove(markersGroup);
      }
      // cleanup continents
      const continents = scene.getObjectByName('continentsGroup');
      if (continents) {
        continents.children.forEach((c) => {
          if (c.material) c.material.dispose();
          if (c.geometry) c.geometry.dispose();
        });
        scene.remove(continents);
      }
    };
  }, [isDark, onSectionSelect]);

  return (
    <section className="w-full h-screen min-h-[320px] flex flex-col items-center justify-center relative">
      {isDark ? <StarBackground /> : <DayBackground />}
      <div
        ref={containerRef}
        className="w-full h-screen min-h-[320px] absolute top-0 left-0 z-10"
        style={{ touchAction: 'none' }}
      />

      {hoveredContinent && continentSections[hoveredContinent] && (
        <div className="absolute bottom-4 sm:bottom-8 lg:bottom-20 left-1/2 -translate-x-1/2 z-30 bg-white dark:bg-brand-dark border-2 border-brand-blue/30 rounded-xl sm:rounded-2xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 shadow-2xl max-w-xs sm:max-w-sm lg:max-w-md mx-4 animate-fade-in">
          <div className="text-center mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-brand-blue mb-1 sm:mb-2">{continentSections[hoveredContinent]}</h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Click a marker to navigate</p>
          </div>
          <div className="space-y-2 sm:space-y-3 max-h-40 sm:max-h-48 lg:max-h-60 overflow-y-auto">
            {continentData[hoveredContinent]?.map((item, idx) => (
              <div key={idx} className="border-b border-gray-200 dark:border-gray-700 pb-2 last:border-b-0">
                <h4 className="font-semibold text-brand-blue text-xs sm:text-sm mb-1">{item.country}</h4>
                <div className="flex flex-wrap gap-1">
                  {item.projects.map((project, pIdx) => (
                    <span key={pIdx} className="bg-brand-blue/10 text-brand-blue text-xs px-2 py-1 rounded-full">{project}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
