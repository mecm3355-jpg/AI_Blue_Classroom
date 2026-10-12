(function () {
  'use strict';

  const PLANET_COLORS = [
    [0.10, 0.55, 1.00], [0.50, 0.30, 1.00], [0.00, 0.82, 0.94],
    [1.00, 0.59, 0.05], [1.00, 0.18, 0.38], [0.43, 0.64, 0.96],
    [0.18, 0.80, 0.44], [0.05, 0.70, 0.62], [0.52, 0.86, 0.10],
    [0.16, 0.82, 0.62], [0.66, 0.28, 0.92]
  ];

  function shader(gl, type, source) {
    const value = gl.createShader(type);
    gl.shaderSource(value, source);
    gl.compileShader(value);
    if (!gl.getShaderParameter(value, gl.COMPILE_STATUS)) {
      const message = gl.getShaderInfoLog(value);
      gl.deleteShader(value);
      throw new Error(message || 'WebGL shader compilation failed');
    }
    return value;
  }

  function program(gl, vertexSource, fragmentSource) {
    const value = gl.createProgram();
    gl.attachShader(value, shader(gl, gl.VERTEX_SHADER, vertexSource));
    gl.attachShader(value, shader(gl, gl.FRAGMENT_SHADER, fragmentSource));
    gl.linkProgram(value);
    if (!gl.getProgramParameter(value, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(value) || 'WebGL program link failed');
    }
    return value;
  }

  function multiply(a, b) {
    const out = new Float32Array(16);
    for (let column = 0; column < 4; column += 1) {
      for (let row = 0; row < 4; row += 1) {
        out[column * 4 + row] =
          a[row] * b[column * 4] +
          a[4 + row] * b[column * 4 + 1] +
          a[8 + row] * b[column * 4 + 2] +
          a[12 + row] * b[column * 4 + 3];
      }
    }
    return out;
  }

  function perspective(fieldOfView, aspect, near, far) {
    const f = 1 / Math.tan(fieldOfView / 2);
    const range = 1 / (near - far);
    return new Float32Array([
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (near + far) * range, -1,
      0, 0, near * far * range * 2, 0
    ]);
  }

  function normalize(vector) {
    const length = Math.hypot(vector[0], vector[1], vector[2]) || 1;
    return [vector[0] / length, vector[1] / length, vector[2] / length];
  }

  function cross(a, b) {
    return [
      a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0]
    ];
  }

  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }

  function lookAt(eye, center, up) {
    const z = normalize([eye[0] - center[0], eye[1] - center[1], eye[2] - center[2]]);
    const x = normalize(cross(up, z));
    const y = cross(z, x);
    return new Float32Array([
      x[0], y[0], z[0], 0,
      x[1], y[1], z[1], 0,
      x[2], y[2], z[2], 0,
      -dot(x, eye), -dot(y, eye), -dot(z, eye), 1
    ]);
  }

  function modelMatrix(position, scale, rotation) {
    const cosine = Math.cos(rotation);
    const sine = Math.sin(rotation);
    return new Float32Array([
      cosine * scale, 0, -sine * scale, 0,
      0, scale, 0, 0,
      sine * scale, 0, cosine * scale, 0,
      position[0], position[1], position[2], 1
    ]);
  }

  function transformPoint(matrix, point) {
    const x = point[0];
    const y = point[1];
    const z = point[2];
    return [
      matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12],
      matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13],
      matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14],
      matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15]
    ];
  }

  function sphereGeometry(latitudeBands, longitudeBands) {
    const vertices = [];
    const normals = [];
    const indices = [];
    for (let latitude = 0; latitude <= latitudeBands; latitude += 1) {
      const theta = latitude * Math.PI / latitudeBands;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);
      for (let longitude = 0; longitude <= longitudeBands; longitude += 1) {
        const phi = longitude * Math.PI * 2 / longitudeBands;
        const x = Math.cos(phi) * sinTheta;
        const y = cosTheta;
        const z = Math.sin(phi) * sinTheta;
        vertices.push(x, y, z);
        normals.push(x, y, z);
      }
    }
    for (let latitude = 0; latitude < latitudeBands; latitude += 1) {
      for (let longitude = 0; longitude < longitudeBands; longitude += 1) {
        const first = latitude * (longitudeBands + 1) + longitude;
        const second = first + longitudeBands + 1;
        indices.push(first, second, first + 1, second, second + 1, first + 1);
      }
    }
    return {
      vertices: new Float32Array(vertices),
      normals: new Float32Array(normals),
      indices: new Uint16Array(indices)
    };
  }

  function createBuffer(gl, target, data) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(target, buffer);
    gl.bufferData(target, data, gl.STATIC_DRAW);
    return buffer;
  }

  function roomInfo(card, index) {
    return {
      index,
      card,
      button: card.querySelector('.btn-enter-room'),
      key: card.dataset.enterSet,
      grade: card.dataset.grade || 'blue',
      title: card.querySelector('.room-title')?.textContent.trim() || `강의실 ${index + 1}`,
      detail: card.querySelector('.room-desc')?.textContent.trim() || 'AI 학습 항로',
      color: PLANET_COLORS[index % PLANET_COLORS.length],
      orbit: 2.7 + (index % 4) * 1.32 + Math.floor(index / 4) * .35,
      phase: index * 2.399,
      speed: .035 + (index % 5) * .006,
      vertical: ((index % 3) - 1) * .52,
      radius: .38 + (index % 4) * .07,
      position: [0, 0, 0],
      screenX: -100,
      screenY: -100,
      screenRadius: 24
    };
  }

  const ORBIT_CONFIGS = [
    {
      grade: 'blue',
      radiusX: 4.35,
      radiusZ: 4.35,
      x: .42,
      y: .08,
      z: -.28,
      phase: .16,
      color: [.18, .62, .96]
    },
    {
      grade: 'green',
      radiusX: 4.35,
      radiusZ: 4.35,
      x: 1.04,
      y: -.38,
      z: .64,
      phase: .72,
      color: [.18, .82, .58]
    }
  ];

  function orientOrbitVector(vector, orientationIndex) {
    const orientation = ORBIT_CONFIGS[orientationIndex % ORBIT_CONFIGS.length];
    let x = vector[0];
    let y = vector[1];
    let z = vector[2];
    const cosineY = Math.cos(orientation.y);
    const sineY = Math.sin(orientation.y);
    const rotatedX = x * cosineY + z * sineY;
    const rotatedZFromY = -x * sineY + z * cosineY;
    x = rotatedX;
    z = rotatedZFromY;
    const cosineX = Math.cos(orientation.x);
    const sineX = Math.sin(orientation.x);
    const rotatedY = y * cosineX - z * sineX;
    const rotatedZ = y * sineX + z * cosineX;
    y = rotatedY;
    z = rotatedZ;
    const cosineZ = Math.cos(orientation.z);
    const sineZ = Math.sin(orientation.z);
    return [
      x * cosineZ - y * sineZ,
      x * sineZ + y * cosineZ,
      z
    ];
  }

  function orbitPoint(angle, orientationIndex) {
    const orbit = ORBIT_CONFIGS[orientationIndex % ORBIT_CONFIGS.length];
    const focusOffset = Math.sqrt(Math.max(0, orbit.radiusX ** 2 - orbit.radiusZ ** 2));
    return orientOrbitVector([
      Math.cos(angle) * orbit.radiusX - focusOffset,
      0,
      Math.sin(angle) * orbit.radiusZ
    ], orientationIndex);
  }

  function ellipticalOrbitGeometry(orientationIndex, tubeRadius, ringSegments, tubeSegments) {
    const orbit = ORBIT_CONFIGS[orientationIndex % ORBIT_CONFIGS.length];
    const focusOffset = Math.sqrt(Math.max(0, orbit.radiusX ** 2 - orbit.radiusZ ** 2));
    const vertices = [];
    const normals = [];
    const indices = [];
    for (let ring = 0; ring <= ringSegments; ring += 1) {
      const angle = ring / ringSegments * Math.PI * 2;
      const cosine = Math.cos(angle);
      const sine = Math.sin(angle);
      const normalLength = Math.hypot(cosine / orbit.radiusX, sine / orbit.radiusZ) || 1;
      const outwardX = (cosine / orbit.radiusX) / normalLength;
      const outwardZ = (sine / orbit.radiusZ) / normalLength;
      for (let tube = 0; tube <= tubeSegments; tube += 1) {
        const tubeAngle = tube / tubeSegments * Math.PI * 2;
        const radial = Math.cos(tubeAngle);
        const vertical = Math.sin(tubeAngle);
        const localPosition = [
          orbit.radiusX * cosine - focusOffset + tubeRadius * radial * outwardX,
          tubeRadius * vertical,
          orbit.radiusZ * sine + tubeRadius * radial * outwardZ
        ];
        const localNormal = [radial * outwardX, vertical, radial * outwardZ];
        vertices.push(...orientOrbitVector(localPosition, orientationIndex));
        normals.push(...orientOrbitVector(localNormal, orientationIndex));
      }
    }
    const row = tubeSegments + 1;
    for (let ring = 0; ring < ringSegments; ring += 1) {
      for (let tube = 0; tube < tubeSegments; tube += 1) {
        const first = ring * row + tube;
        const second = first + row;
        indices.push(first, second, first + 1, second, second + 1, first + 1);
      }
    }
    return {
      vertices: new Float32Array(vertices),
      normals: new Float32Array(normals),
      indices: new Uint16Array(indices)
    };
  }

  window.initGalaxyLobby = function initGalaxyLobby() {
    const lobby = document.getElementById('classroom-lobby-screen');
    const canvas = document.getElementById('galaxy-starfield');
    if (!lobby || !canvas || lobby.dataset.galaxyReady === 'webgl') return;

    lobby.querySelectorAll('.room-card').forEach(card => {
      const topics = window.MULTI_SET_DATA?.[card.dataset.enterSet]?.topics;
      const description = card.querySelector('.room-desc');
      if (topics && description) description.textContent = topics.map(topic =>
        topic.name.replace(/_분석_보고서\.pdf$/i, '').replace(/\.pdf$/i, '').replace(/_/g, ' ')
      ).join(' · ');
    });

    const showFallback = () => {
      lobby.classList.add('galaxy-fallback');
      canvas.tabIndex = -1;
      const status = document.querySelector('.galaxy-flight-status');
      if (status) status.textContent = '강의실 목록에서 선택하세요';
      const detail = document.getElementById('galaxy-target-detail');
      if (detail) detail.textContent = '강의실을 선택하면 바로 입장합니다.';
    };
    let gl;
    try { gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
      depth: true,
      premultipliedAlpha: false,
      powerPreference: 'high-performance'
    }); } catch (_) { gl = null; }

    if (!gl) {
      showFallback();
      if (typeof window.initGalaxyLobbyLegacy === 'function') window.initGalaxyLobbyLegacy();
      return;
    }

    lobby.dataset.galaxyReady = 'webgl';
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const compactLayout = window.matchMedia && window.matchMedia('(max-width: 768px), (orientation: landscape) and (max-height: 600px)');
    const constrainedDevice = Boolean(
      (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
      (window.matchMedia && window.matchMedia('(max-width: 768px), (pointer: coarse)').matches)
    );
    canvas.dataset.renderQuality = constrainedDevice ? 'balanced' : 'high';
    const flightHud = lobby.querySelector('.galaxy-flight-hud');
    const flightStatus = lobby.querySelector('.galaxy-flight-status');
    const targetName = document.getElementById('galaxy-target-name');
    const targetDetail = document.getElementById('galaxy-target-detail');
    const targetMeta = document.getElementById('galaxy-target-meta');
    const enterSelected = document.getElementById('galaxy-enter-selected');
    const gradeButtons = Array.from(lobby.querySelectorAll('[data-galaxy-grade]'));
    const planets = Array.from(lobby.querySelectorAll('.room-card')).map(roomInfo);
    let activePlanet = -1;
    let hoveredPlanet = -1;
    let activeGrade = 'all';
    let yaw = .26;
    let pitch = .18;
    let distance = 16.5;
    let dragging = false;
    let dragDistance = 0;
    let pressedPlanet = -1;
    let touchArmedPlanet = -1;
    let lastHoverPoint = [-100, -100];
    let lastHoverTime = 0;
    let lastPointer = [0, 0];
    let width = 1;
    let height = 1;
    let viewProjection = new Float32Array(16);
    let disposed = false;
    let entryFlight = null;
    let frameId = null;
    let portalTimer = null;
    let arrivalTimer = null;

    function cancelEntry() {
      clearTimeout(portalTimer);
      clearTimeout(arrivalTimer);
      entryFlight = null;
      dragging = false;
      pressedPlanet = -1;
      touchArmedPlanet = -1;
      delete canvas.dataset.touchArmed;
      canvas.dataset.entryState = 'idle';
      canvas.removeAttribute('aria-busy');
      canvas.style.cursor = 'grab';
      document.body.classList.remove('galaxy-entering', 'galaxy-portal-open', 'galaxy-portal-revealing', 'classroom-arriving');
      if (flightStatus) flightStatus.textContent = '11 CLASSROOMS ONLINE';
    }
    window.cancelGalaxyEntry = cancelEntry;

    const sphereProgram = program(gl, `
      attribute vec3 aPosition;
      attribute vec3 aNormal;
      uniform mat4 uProjection;
      uniform mat4 uView;
      uniform mat4 uModel;
      varying vec3 vNormal;
      varying vec3 vWorld;
      void main() {
        vec4 world = uModel * vec4(aPosition, 1.0);
        vWorld = world.xyz;
        vNormal = normalize(mat3(uModel) * aNormal);
        gl_Position = uProjection * uView * world;
      }
    `, `
      precision mediump float;
      uniform vec3 uColor;
      uniform vec3 uCamera;
      uniform float uSelected;
      varying vec3 vNormal;
      varying vec3 vWorld;
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 lightDirection = normalize(vec3(-0.45, 0.8, 0.65));
        float diffuse = max(dot(normal, lightDirection), 0.0);
        float rim = pow(1.0 - max(dot(normal, normalize(uCamera - vWorld)), 0.0), 2.2);
        float bands = 0.92 + 0.08 * sin(vWorld.y * 18.0 + vWorld.x * 4.0);
        vec3 color = uColor * (0.22 + diffuse * 0.92) * bands;
        color += uColor * rim * (0.65 + uSelected * 0.8);
        color += vec3(0.35, 0.58, 0.9) * uSelected * 0.16;
        gl_FragColor = vec4(color, 1.0);
      }
    `);

    const starProgram = program(gl, `
      attribute vec3 aPosition;
      attribute float aBrightness;
      uniform mat4 uViewProjection;
      uniform float uTime;
      varying float vBrightness;
      void main() {
        vec4 clip = uViewProjection * vec4(aPosition, 1.0);
        gl_Position = clip;
        float twinkle = 0.72 + 0.28 * sin(uTime * 1.4 + aBrightness * 12.0);
        vBrightness = aBrightness * twinkle;
        gl_PointSize = clamp((22.0 / max(clip.w, 1.0)) * aBrightness, 1.0, 3.5);
      }
    `, `
      precision mediump float;
      varying float vBrightness;
      void main() {
        vec2 point = gl_PointCoord - vec2(0.5);
        float alpha = smoothstep(0.5, 0.05, length(point)) * vBrightness;
        gl_FragColor = vec4(0.64, 0.86, 1.0, alpha);
      }
    `);

    const lineProgram = program(gl, `
      attribute vec3 aPosition;
      uniform mat4 uMatrix;
      void main() { gl_Position = uMatrix * vec4(aPosition, 1.0); }
    `, `
      precision mediump float;
      uniform vec4 uColor;
      void main() { gl_FragColor = uColor; }
    `);

    const sphere = sphereGeometry(constrainedDevice ? 14 : 20, constrainedDevice ? 20 : 28);
    const spherePositionBuffer = createBuffer(gl, gl.ARRAY_BUFFER, sphere.vertices);
    const sphereNormalBuffer = createBuffer(gl, gl.ARRAY_BUFFER, sphere.normals);
    const sphereIndexBuffer = createBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, sphere.indices);

    const starData = [];
    const starBrightness = [];
    const starCount = constrainedDevice ? 460 : 850;
    for (let index = 0; index < starCount; index += 1) {
      const radius = 18 + Math.random() * 44;
      const theta = Math.random() * Math.PI * 2;
      const vertical = (Math.random() - .5) * 34;
      starData.push(Math.cos(theta) * radius, vertical, Math.sin(theta) * radius);
      starBrightness.push(.45 + Math.random() * .85);
    }
    const starPositionBuffer = createBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(starData));
    const starBrightnessBuffer = createBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(starBrightness));

    const ringMeshes = ORBIT_CONFIGS.map((_, orientationIndex) => {
      const geometry = ellipticalOrbitGeometry(orientationIndex, .072, constrainedDevice ? 88 : 128, constrainedDevice ? 6 : 8);
      return {
        positionBuffer: createBuffer(gl, gl.ARRAY_BUFFER, geometry.vertices),
        normalBuffer: createBuffer(gl, gl.ARRAY_BUFFER, geometry.normals),
        indexBuffer: createBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, geometry.indices),
        indexCount: geometry.indices.length
      };
    });

    const selectionRingVertices = [];
    for (let index = 0; index <= 72; index += 1) {
      const angle = index / 72 * Math.PI * 2;
      selectionRingVertices.push(Math.cos(angle), 0, Math.sin(angle));
    }
    const selectionRingBuffer = createBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(selectionRingVertices));

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      const ratio = Math.min(window.devicePixelRatio || 1, constrainedDevice ? 1.15 : 1.5);
      const targetWidth = Math.round(width * ratio);
      const targetHeight = Math.round(height * ratio);
      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    function selectPlanet(index, updateCards) {
      if (index < 0 || !planets[index]) return;
      activePlanet = index;
      const planet = planets[index];
      if (targetName) targetName.textContent = planet.title;
      if (targetDetail) targetDetail.textContent = planet.detail;
      if (targetMeta) targetMeta.textContent = `${planet.grade.toUpperCase()} 등급 · ${planet.card.querySelector('.room-number')?.textContent.trim() || '강의 행성'}`;
      if (enterSelected) enterSelected.disabled = false;
      if (flightHud) flightHud.classList.add('has-target');
      if (updateCards) {
        planets.forEach((item, itemIndex) => item.card.classList.toggle('is-orbit-target', itemIndex === index));
        planet.card.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reducedMotion ? 'auto' : 'smooth' });
      }
    }

    function visiblePlanets() {
      return planets.filter((planet) => activeGrade === 'all' || planet.grade === activeGrade);
    }

    function clearPlanetPreview() {
      activePlanet = -1;
      hoveredPlanet = -1;
      planets.forEach((planet) => planet.card.classList.remove('is-orbit-target'));
      const touchScreen = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
      if (targetName) targetName.textContent = touchScreen ? '행성을 터치해 보세요' : '행성에 마우스를 올려보세요';
      if (targetDetail) targetDetail.textContent = touchScreen
        ? '한 번 터치하면 강의 내용을 확인하고, 같은 행성을 한 번 더 터치하면 입장합니다.'
        : '행성에 마우스를 올리면 강의 내용을 확인하고, 클릭하면 입장합니다.';
      if (targetMeta) targetMeta.textContent = 'BLUE 6개 · GREEN 5개 강의실 탐색 중';
      if (enterSelected) enterSelected.disabled = true;
      if (flightHud) flightHud.classList.remove('has-target');
    }

    function applyGrade(grade) {
      activeGrade = grade;
      gradeButtons.forEach((button) => {
        const selected = button.dataset.galaxyGrade === grade;
        button.classList.toggle('active', selected);
        button.setAttribute('aria-selected', String(selected));
      });
      planets.forEach((planet) => {
        planet.card.classList.toggle('is-grade-hidden', grade !== 'all' && planet.grade !== grade);
      });
      canvas.dataset.planetCount = String(visiblePlanets().length);
      canvas.dataset.bluePlanets = String(planets.filter((planet) => planet.grade === 'blue').length);
      canvas.dataset.greenPlanets = String(planets.filter((planet) => planet.grade === 'green').length);
      if (flightStatus) flightStatus.textContent = grade === 'all' ? '11 CLASSROOMS ONLINE' : `${grade.toUpperCase()} ORBIT ONLINE`;
      clearPlanetPreview();
    }

    function cameraMatrices() {
      const cosinePitch = Math.cos(pitch);
      const restingEye = [
        Math.sin(yaw) * cosinePitch * distance,
        Math.sin(pitch) * distance,
        Math.cos(yaw) * cosinePitch * distance
      ];
      let eye = restingEye;
      let center = [0, 0, 0];
      let fieldOfView = Math.PI / (compactLayout?.matches ? 4 : 3.15);
      if (entryFlight) {
        const progress = entryFlight.easedProgress || 0;
        const target = entryFlight.position;
        const approachVector = [
          restingEye[0] - target[0],
          restingEye[1] - target[1],
          restingEye[2] - target[2]
        ];
        const approachLength = Math.hypot(...approachVector) || 1;
        const arrivalEye = target.map((value, axis) => value + approachVector[axis] / approachLength * 1.18);
        eye = restingEye.map((value, axis) => value + (arrivalEye[axis] - value) * progress);
        center = target.map(value => value * progress);
        fieldOfView += progress * .16;
      }
      const projection = perspective(fieldOfView, width / Math.max(height, 1), .1, 120);
      const view = lookAt(eye, center, [0, 1, 0]);
      viewProjection = multiply(projection, view);
      return { eye, projection, view };
    }

    function updatePlanetPositions(time) {
      planets.forEach((planet) => {
        planet.position = [100, 100, 100];
        planet.screenX = -100;
        planet.screenY = -100;
      });
      const gradePlanets = visiblePlanets();
      const gradeSlots = { blue: 0, green: 0 };
      const gradePopulations = gradePlanets.reduce((counts, planet) => {
        counts[planet.grade] = (counts[planet.grade] || 0) + 1;
        return counts;
      }, {});
      gradePlanets.forEach((planet) => {
        const motion = reducedMotion ? 0 : time * planet.speed;
        const orbitIndex = planet.grade === 'green' ? 1 : 0;
        const orbit = ORBIT_CONFIGS[orbitIndex];
        const slot = gradeSlots[planet.grade]++;
        const population = gradePopulations[planet.grade] || 1;
        const angle = slot / population * Math.PI * 2 + orbit.phase + motion;
        planet.position = orbitPoint(angle, orbitIndex);
      });
    }

    function projectPlanets() {
      visiblePlanets().forEach((planet) => {
        const clip = transformPoint(viewProjection, planet.position);
        if (clip[3] <= 0) {
          planet.screenX = -100;
          planet.screenY = -100;
          return;
        }
        const normalizedX = clip[0] / clip[3];
        const normalizedY = clip[1] / clip[3];
        planet.screenX = (normalizedX * .5 + .5) * width;
        planet.screenY = (-normalizedY * .5 + .5) * height;
        planet.screenRadius = Math.max(18, planet.radius * 760 / clip[3]);
      });
    }

    function bindAttribute(programValue, name, buffer, size) {
      const location = gl.getAttribLocation(programValue, name);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(location);
      gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
    }

    function drawStars(time) {
      gl.useProgram(starProgram);
      bindAttribute(starProgram, 'aPosition', starPositionBuffer, 3);
      bindAttribute(starProgram, 'aBrightness', starBrightnessBuffer, 1);
      gl.uniformMatrix4fv(gl.getUniformLocation(starProgram, 'uViewProjection'), false, viewProjection);
      gl.uniform1f(gl.getUniformLocation(starProgram, 'uTime'), time);
      gl.drawArrays(gl.POINTS, 0, starBrightness.length);
    }

    function drawOrbits(matrices) {
      gl.useProgram(sphereProgram);
      ringMeshes.forEach((mesh, orbitIndex) => {
        const ringColor = ORBIT_CONFIGS[orbitIndex].color;
        bindAttribute(sphereProgram, 'aPosition', mesh.positionBuffer, 3);
        bindAttribute(sphereProgram, 'aNormal', mesh.normalBuffer, 3);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);
        gl.uniformMatrix4fv(gl.getUniformLocation(sphereProgram, 'uProjection'), false, matrices.projection);
        gl.uniformMatrix4fv(gl.getUniformLocation(sphereProgram, 'uView'), false, matrices.view);
        gl.uniformMatrix4fv(gl.getUniformLocation(sphereProgram, 'uModel'), false, modelMatrix([0, 0, 0], 1, 0));
        gl.uniform3fv(gl.getUniformLocation(sphereProgram, 'uColor'), ringColor);
        gl.uniform3fv(gl.getUniformLocation(sphereProgram, 'uCamera'), matrices.eye);
        gl.uniform1f(gl.getUniformLocation(sphereProgram, 'uSelected'), .08);
        gl.drawElements(gl.TRIANGLES, mesh.indexCount, gl.UNSIGNED_SHORT, 0);
      });
    }

    function drawSphere(position, radius, color, selected, rotation, matrices) {
      gl.useProgram(sphereProgram);
      bindAttribute(sphereProgram, 'aPosition', spherePositionBuffer, 3);
      bindAttribute(sphereProgram, 'aNormal', sphereNormalBuffer, 3);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereIndexBuffer);
      const model = modelMatrix(position, radius, rotation);
      gl.uniformMatrix4fv(gl.getUniformLocation(sphereProgram, 'uProjection'), false, matrices.projection);
      gl.uniformMatrix4fv(gl.getUniformLocation(sphereProgram, 'uView'), false, matrices.view);
      gl.uniformMatrix4fv(gl.getUniformLocation(sphereProgram, 'uModel'), false, model);
      gl.uniform3fv(gl.getUniformLocation(sphereProgram, 'uColor'), color);
      gl.uniform3fv(gl.getUniformLocation(sphereProgram, 'uCamera'), matrices.eye);
      gl.uniform1f(gl.getUniformLocation(sphereProgram, 'uSelected'), selected ? 1 : 0);
      gl.drawElements(gl.TRIANGLES, sphere.indices.length, gl.UNSIGNED_SHORT, 0);
    }

    function drawSelectionRing(planet, time) {
      const pulse = .67 + Math.sin(time * 3.2) * .035;
      const color = planet.grade === 'green' ? [.32, 1, .7, .78] : [.3, .78, 1, .8];
      gl.useProgram(lineProgram);
      bindAttribute(lineProgram, 'aPosition', selectionRingBuffer, 3);
      gl.uniformMatrix4fv(
        gl.getUniformLocation(lineProgram, 'uMatrix'),
        false,
        multiply(viewProjection, modelMatrix(planet.position, pulse, time * .55))
      );
      gl.uniform4fv(gl.getUniformLocation(lineProgram, 'uColor'), color);
      gl.depthMask(false);
      gl.drawArrays(gl.LINE_STRIP, 0, selectionRingVertices.length / 3);
      gl.depthMask(true);
    }

    function render(milliseconds) {
      if (disposed) return;
      frameId = window.requestAnimationFrame(render);
      if (!document.body.classList.contains('in-lobby')) return;

      resize();
      const time = milliseconds * .001;
      if (!entryFlight && touchArmedPlanet < 0) updatePlanetPositions(time);
      if (entryFlight) {
        const linearProgress = Math.min(1, (milliseconds - entryFlight.startedAt) / entryFlight.duration);
        entryFlight.easedProgress = 1 - Math.pow(1 - linearProgress, 3);
      }
      const matrices = cameraMatrices();
      projectPlanets();

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      gl.depthMask(false);
      drawStars(time);
      gl.depthMask(true);
      if (!entryFlight || entryFlight.easedProgress < .7) drawOrbits(matrices);
      const coreColor = activeGrade === 'green' ? [.08, .78, .5] : (activeGrade === 'all' ? [.08, .62, .72] : [.04, .5, 1]);
      if (!entryFlight || entryFlight.easedProgress < .62) {
        drawSphere([0, 0, 0], 1.12, coreColor, true, time * .09, matrices);
      }

      const orderedPlanets = visiblePlanets().slice().sort((a, b) => a.position[2] - b.position[2]);
      orderedPlanets.forEach((planet) => {
        if (entryFlight && entryFlight.easedProgress > .58 && planet.index !== entryFlight.index) return;
        const selected = planet.index === activePlanet || planet.index === hoveredPlanet;
        const gradeColor = planet.grade === 'green' ? [.08, .8, .5] : [.04, .5, 1];
        drawSphere(
          planet.position,
          .4 * (selected ? 1.25 : 1),
          activeGrade === 'all' ? gradeColor : coreColor,
          selected,
          time * (.12 + planet.index * .008),
          matrices
        );
      });
      const highlightedPlanet = planets[entryFlight?.index ?? activePlanet];
      if (highlightedPlanet && (!entryFlight || entryFlight.easedProgress < .72)) {
        drawSelectionRing(highlightedPlanet, time);
      }

      if (entryFlight && entryFlight.easedProgress >= 1 && !entryFlight.committed) {
        entryFlight.committed = true;
        const flight = entryFlight;
        document.body.classList.add('classroom-arriving');
        entryFlight.planet.button?.click();
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            if (entryFlight === flight) document.body.classList.add('galaxy-portal-revealing');
          });
        });
        arrivalTimer = window.setTimeout(() => {
          if (entryFlight === flight) cancelEntry();
        }, 900);
      }
    }

    function startPlanetEntry(index) {
      const planet = planets[index];
      if (!planet || entryFlight || disposed || document.body.classList.contains('galaxy-reappearing')) return;
      selectPlanet(index, false);
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        planet.button?.click();
        return;
      }
      const rect = canvas.getBoundingClientRect();
      document.body.style.setProperty('--galaxy-entry-x', `${rect.left + planet.screenX}px`);
      document.body.style.setProperty('--galaxy-entry-y', `${rect.top + planet.screenY}px`);
      document.body.classList.remove('galaxy-warping');
      document.body.classList.add('galaxy-entering');
      canvas.dataset.entryState = 'flying';
      canvas.setAttribute('aria-busy', 'true');
      canvas.style.cursor = 'wait';
      if (flightStatus) flightStatus.textContent = 'WARP ROUTE LOCKED';
      entryFlight = {
        index,
        planet,
        position: planet.position.slice(),
        startedAt: performance.now(),
        duration: 1240,
        easedProgress: 0,
        committed: false
      };
      const flight = entryFlight;
      portalTimer = window.setTimeout(() => {
        if (entryFlight === flight) document.body.classList.add('galaxy-portal-open');
      }, 650);
    }

    function hitTest(event) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      let best = -1;
      let bestDistance = Infinity;
      visiblePlanets().forEach((planet) => {
        const distanceToPlanet = Math.hypot(x - planet.screenX, y - planet.screenY);
        const hitRadius = Math.max(planet.screenRadius + 14, 38);
        if (distanceToPlanet <= hitRadius && distanceToPlanet < bestDistance) {
          best = planet.index;
          bestDistance = distanceToPlanet;
        }
      });
      return best;
    }

    canvas.addEventListener('pointerdown', (event) => {
      if (entryFlight) return;
      dragging = true;
      dragDistance = 0;
      pressedPlanet = hitTest(event);
      if (event.pointerType !== 'touch' && pressedPlanet < 0 && Date.now() - lastHoverTime < 1500 && Math.hypot(event.clientX - lastHoverPoint[0], event.clientY - lastHoverPoint[1]) < 52) {
        pressedPlanet = activePlanet;
      }
      lastPointer = [event.clientX, event.clientY];
      canvas.setPointerCapture(event.pointerId);
    });
    canvas.addEventListener('pointermove', (event) => {
      if (entryFlight) return;
      if (dragging) {
        const deltaX = event.clientX - lastPointer[0];
        const deltaY = event.clientY - lastPointer[1];
        yaw -= deltaX * .006;
        pitch = Math.max(-.72, Math.min(.72, pitch - deltaY * .004));
        dragDistance += Math.abs(deltaX) + Math.abs(deltaY);
        lastPointer = [event.clientX, event.clientY];
        hoveredPlanet = -1;
        return;
      }
      hoveredPlanet = hitTest(event);
      canvas.style.cursor = hoveredPlanet >= 0 ? 'pointer' : 'grab';
      if (hoveredPlanet >= 0) {
        lastHoverPoint = [event.clientX, event.clientY];
        lastHoverTime = Date.now();
        selectPlanet(hoveredPlanet, true);
      }
    });
    canvas.addEventListener('pointerup', (event) => {
      if (entryFlight) return;
      const releasedPlanet = hitTest(event);
      const previouslyArmedPlanet = touchArmedPlanet;
      const clicked = dragDistance < 8 ? (releasedPlanet >= 0 ? releasedPlanet : pressedPlanet) : -1;
      dragging = false;
      pressedPlanet = -1;
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
      if (
        event.pointerType === 'touch' &&
        dragDistance < 8 &&
        previouslyArmedPlanet >= 0 &&
        releasedPlanet === previouslyArmedPlanet
      ) {
        touchArmedPlanet = -1;
        delete canvas.dataset.touchArmed;
        startPlanetEntry(previouslyArmedPlanet);
        return;
      }
      if (clicked >= 0) {
        selectPlanet(clicked, true);
        if (event.pointerType === 'touch' && touchArmedPlanet !== clicked) {
          touchArmedPlanet = clicked;
          canvas.dataset.touchArmed = String(clicked);
          if (flightStatus) flightStatus.textContent = 'TAP AGAIN TO ENTER';
          if (targetMeta) targetMeta.textContent = `${targetMeta.textContent} · 한 번 더 터치하면 입장`;
          return;
        }
        touchArmedPlanet = -1;
        delete canvas.dataset.touchArmed;
        startPlanetEntry(clicked);
      } else if (event.pointerType === 'touch') {
        touchArmedPlanet = -1;
        delete canvas.dataset.touchArmed;
        clearPlanetPreview();
        if (flightStatus) flightStatus.textContent = '11 CLASSROOMS ONLINE';
      }
    });
    canvas.addEventListener('pointercancel', () => { dragging = false; });
    canvas.addEventListener('pointerleave', () => {
      if (!dragging) {
        hoveredPlanet = -1;
        canvas.style.cursor = 'grab';
      }
    });
    canvas.addEventListener('wheel', (event) => {
      event.preventDefault();
      if (entryFlight) return;
      distance = Math.max(10, Math.min(29, distance + event.deltaY * .012));
    }, { passive: false });
    canvas.addEventListener('keydown', (event) => {
      if (entryFlight) return;
      const keyboardPlanets = visiblePlanets();
      if (!keyboardPlanets.length) return;
      const currentSlot = keyboardPlanets.findIndex((planet) => planet.index === activePlanet);
      if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(event.key)) {
        event.preventDefault();
        const direction = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1;
        const nextSlot = currentSlot < 0 ? 0 : (currentSlot + direction + keyboardPlanets.length) % keyboardPlanets.length;
        selectPlanet(keyboardPlanets[nextSlot].index, false);
      } else if (event.key === 'Enter' && activePlanet >= 0) {
        event.preventDefault();
        startPlanetEntry(activePlanet);
      }
    });
    canvas.addEventListener('focus', () => {
      if (activePlanet < 0) selectPlanet(visiblePlanets()[0]?.index ?? -1, false);
    });

    planets.forEach((planet) => {
      planet.card.addEventListener('pointerenter', () => selectPlanet(planet.index, false));
      planet.card.addEventListener('focusin', () => selectPlanet(planet.index, false));
    });

    gradeButtons.forEach((button) => {
      button.addEventListener('click', () => applyGrade(button.dataset.galaxyGrade || 'all'));
    });
    if (enterSelected) {
      enterSelected.disabled = true;
      enterSelected.addEventListener('click', () => {
        if (activePlanet >= 0) startPlanetEntry(activePlanet);
      });
    }

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pagehide', () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      cancelEntry();
    });
    window.addEventListener('pageshow', () => {
      if (!disposed || gl.isContextLost()) return;
      disposed = false;
      resize();
      frameId = window.requestAnimationFrame(render);
    });
    canvas.addEventListener('webglcontextlost', (event) => {
      event.preventDefault();
      disposed = true;
      window.cancelAnimationFrame(frameId);
      cancelEntry();
      showFallback();
    });
    applyGrade('all');
    resize();
    frameId = window.requestAnimationFrame(render);
  };
})();
