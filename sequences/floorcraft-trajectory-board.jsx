import { useState, useRef } from "react";

// ---------- Constants ----------
const FLOOR_W = 30; // metres, x axis
const FLOOR_D = 20; // metres, y axis (depth)
const S = 30;       // px per metre, top view
const M = 24;       // canvas margin px
const VW = FLOOR_W * S + M * 2; // 948
const VH = FLOOR_D * S + M * 2; // 648

// Front-view camera
const EYE_X = 15, D0 = 5, EYE_H = 1.7, F = 460, CX = VW / 2, CY = 210;

const BLUE = "#1A6BAA";
const INK = "#222222";
const RED = "#C0392B";
const LEADER_C = INK;   // leader black
const FOLLOWER_C = RED; // follower red
const TRACK_C = INK;    // trajectory black

// Victor's hand-arranged tango layout, captured 10 Jun 2026 via Copy layout
// Victor's hand-arranged foxtrot layout, captured 10 Jun 2026 via Copy layout
const FOXTROT_LAYOUT = {"leader":{"x":27.066,"y":18.352,"a":-0.785},"follower":{"x":27.914,"y":17.928,"a":2.356},"ghosts":[{"L":{"x":2.076,"y":17.012,"a":-0.785},"F":{"x":2.924,"y":16.588,"a":2.356},"n":1,"name":"facing DC","dir":{"x":0.707,"y":-0.707}},{"L":{"x":5.426,"y":13.662,"a":-0.785},"F":{"x":6.274,"y":13.238,"a":2.356},"n":2,"name":"facing DC","dir":{"x":0.707,"y":-0.707}},{"L":{"x":10.8,"y":12.1,"a":3.142},"F":{"x":9.9,"y":11.8,"a":6.283},"n":3,"name":"backing LOD","dir":{"x":1,"y":0}},{"L":{"x":14.688,"y":12.866,"a":0.785},"F":{"x":15.112,"y":13.714,"a":3.927},"n":4,"name":"facing DW","dir":{"x":0.707,"y":0.707}},{"L":{"x":18.038,"y":16.216,"a":0.785},"F":{"x":18.462,"y":17.064,"a":3.927},"n":5,"name":"facing DW","dir":{"x":0.707,"y":0.707}},{"L":{"x":23.2,"y":18.29,"a":3.142},"F":{"x":22.3,"y":17.99,"a":6.283},"n":6,"name":"backing LOD","dir":{"x":1,"y":0}}],"figLabels":[{"x":4.175,"y":13.975,"text":"Feather Step"},{"x":7.814,"y":11.086,"text":"Reverse Turn"},{"x":12.673,"y":11.135,"text":"Feather Finish"},{"x":16.575,"y":13.815,"text":"Three Step"},{"x":20.214,"y":16.704,"text":"Natural Turn"},{"x":25.12,"y":16.99,"text":"Heel Pull"}],"path":[{"x":2.5,"y":16.8},{"x":2.835,"y":16.465},{"x":3.17,"y":16.13},{"x":3.505,"y":15.795},{"x":3.84,"y":15.46},{"x":4.175,"y":15.125},{"x":4.51,"y":14.79},{"x":4.845,"y":14.455},{"x":5.18,"y":14.12},{"x":5.515,"y":13.785},{"x":5.85,"y":13.45},{"x":5.85,"y":13.45},{"x":6.197,"y":13.133},{"x":6.567,"y":12.853},{"x":6.959,"y":12.611},{"x":7.375,"y":12.405},{"x":7.814,"y":12.236},{"x":8.275,"y":12.105},{"x":8.759,"y":12.011},{"x":9.267,"y":11.953},{"x":9.797,"y":11.933},{"x":10.35,"y":11.95},{"x":10.35,"y":11.95},{"x":10.822,"y":11.963},{"x":11.291,"y":12.004},{"x":11.756,"y":12.071},{"x":12.216,"y":12.164},{"x":12.673,"y":12.285},{"x":13.126,"y":12.432},{"x":13.576,"y":12.607},{"x":14.021,"y":12.808},{"x":14.462,"y":13.035},{"x":14.9,"y":13.29},{"x":14.9,"y":13.29},{"x":15.235,"y":13.625},{"x":15.57,"y":13.96},{"x":15.905,"y":14.295},{"x":16.24,"y":14.63},{"x":16.575,"y":14.965},{"x":16.91,"y":15.3},{"x":17.245,"y":15.635},{"x":17.58,"y":15.97},{"x":17.915,"y":16.305},{"x":18.25,"y":16.64},{"x":18.25,"y":16.64},{"x":18.597,"y":16.957},{"x":18.967,"y":17.237},{"x":19.359,"y":17.479},{"x":19.775,"y":17.685},{"x":20.214,"y":17.854},{"x":20.675,"y":17.985},{"x":21.159,"y":18.079},{"x":21.667,"y":18.137},{"x":22.197,"y":18.157},{"x":22.75,"y":18.14},{"x":22.75,"y":18.14},{"x":23.224,"y":18.14},{"x":23.698,"y":18.14},{"x":24.172,"y":18.14},{"x":24.646,"y":18.14},{"x":25.12,"y":18.14},{"x":25.594,"y":18.14},{"x":26.068,"y":18.14},{"x":26.542,"y":18.14},{"x":27.016,"y":18.14},{"x":27.49,"y":18.14}]};

const TANGO_LAYOUT = {"leader":{"x":27.076,"y":16.962,"a":-0.785},"follower":{"x":27.924,"y":16.538,"a":2.356},"ghosts":[{"L":{"x":3.762,"y":13.146,"a":0.785},"F":{"x":4.186,"y":13.995,"a":3.927},"n":1,"name":"facing DW","dir":{"x":0.707,"y":0.707}},{"L":{"x":7.239,"y":16.521,"a":0.785},"F":{"x":7.664,"y":17.369,"a":3.927},"n":2,"name":"facing DW","dir":{"x":0.707,"y":0.707}},{"L":{"x":8.408,"y":17.696,"a":0.785},"F":{"x":8.832,"y":18.544,"a":3.927},"n":3,"name":"facing DW · PP","dir":{"x":0.707,"y":-0.707}},{"L":{"x":11.23,"y":14.91,"a":0},"F":{"x":12.13,"y":15.21,"a":3.142},"n":4,"name":"facing LOD","dir":{"x":1,"y":0}},{"L":{"x":15.798,"y":14.636,"a":0.785},"F":{"x":16.222,"y":15.484,"a":3.927},"n":5,"name":"facing DW","dir":{"x":0.707,"y":0.707}},{"L":{"x":19.22,"y":17.67,"a":1.571},"F":{"x":18.92,"y":18.57,"a":4.712},"n":6,"name":"facing wall","dir":{"x":1,"y":0}},{"L":{"x":21.822,"y":15.809,"a":2.356},"F":{"x":20.973,"y":16.233,"a":5.498},"n":7,"name":"backing DC","dir":{"x":0.707,"y":-0.707}}],"figLabels":[{"x":5.7,"y":14.121,"text":"Two Walks","rot":0.648,"br":1},{"x":6.904,"y":18.81,"text":"Progressive Link","br":1},{"x":10.388,"y":16.431,"text":"Closed Promenade","br":1},{"x":13.845,"y":13.91,"text":"Open Reverse Turn, Lady Outside","br":2},{"x":17.54,"y":15.44,"text":"Two Walks","br":1},{"x":21.487,"y":17.73,"text":"Tango Rocks","br":1},{"x":24.01,"y":13.967,"text":"Back Corté"}],"path":[{"x":3.974,"y":13.571},{"x":4.317,"y":13.913},{"x":4.662,"y":14.254},{"x":5.007,"y":14.594},{"x":5.353,"y":14.933},{"x":5.7,"y":15.271},{"x":6.048,"y":15.608},{"x":6.398,"y":15.943},{"x":6.748,"y":16.278},{"x":7.099,"y":16.612},{"x":7.452,"y":16.945},{"x":7.452,"y":16.945},{"x":7.569,"y":17.062},{"x":7.686,"y":17.179},{"x":7.803,"y":17.297},{"x":7.92,"y":17.414},{"x":8.037,"y":17.532},{"x":8.153,"y":17.649},{"x":8.27,"y":17.767},{"x":8.387,"y":17.884},{"x":8.503,"y":18.002},{"x":8.62,"y":18.12},{"x":8.62,"y":18.12},{"x":8.926,"y":17.814},{"x":9.232,"y":17.508},{"x":9.538,"y":17.202},{"x":9.844,"y":16.896},{"x":10.15,"y":16.59},{"x":10.456,"y":16.284},{"x":10.762,"y":15.978},{"x":11.068,"y":15.672},{"x":11.374,"y":15.366},{"x":11.68,"y":15.06},{"x":11.68,"y":15.06},{"x":12.113,"y":15.06},{"x":12.546,"y":15.06},{"x":12.979,"y":15.06},{"x":13.412,"y":15.06},{"x":13.845,"y":15.06},{"x":14.278,"y":15.06},{"x":14.711,"y":15.06},{"x":15.144,"y":15.06},{"x":15.577,"y":15.06},{"x":16.01,"y":15.06},{"x":16.01,"y":15.06},{"x":16.316,"y":15.366},{"x":16.622,"y":15.672},{"x":16.928,"y":15.978},{"x":17.234,"y":16.284},{"x":17.54,"y":16.59},{"x":17.846,"y":16.896},{"x":18.152,"y":17.202},{"x":18.458,"y":17.508},{"x":18.764,"y":17.814},{"x":19.07,"y":18.12},{"x":19.07,"y":18.12},{"x":19.375,"y":18.099},{"x":19.665,"y":18.036},{"x":19.938,"y":17.931},{"x":20.195,"y":17.784},{"x":20.435,"y":17.595},{"x":20.66,"y":17.364},{"x":20.869,"y":17.091},{"x":21.061,"y":16.776},{"x":21.237,"y":16.42},{"x":21.397,"y":16.021},{"x":21.397,"y":16.021},{"x":21.85,"y":15.637},{"x":22.337,"y":15.354},{"x":22.859,"y":15.174},{"x":23.417,"y":15.094},{"x":24.01,"y":15.117},{"x":24.637,"y":15.24},{"x":25.3,"y":15.465},{"x":25.998,"y":15.792},{"x":26.732,"y":16.22},{"x":27.5,"y":16.75}]};

// Victor's hand-arranged quickstep layout, captured 10 Jun 2026 via Copy layout
const QUICKSTEP_LAYOUT = {"leader":{"x":26.97,"y":18.137,"a":0.393},"follower":{"x":27.687,"y":18.759,"a":3.534},"ghosts":[{"L":{"x":1.582,"y":14.433,"a":0.785},"F":{"x":2.007,"y":15.282,"a":3.927},"n":1,"name":"facing DW","dir":{"x":0.707,"y":0.707}},{"L":{"x":4.879,"y":18.589,"a":3.142},"F":{"x":3.979,"y":18.289,"a":6.283},"n":2,"name":"backing LOD","dir":{"x":1,"y":0}},{"L":{"x":7.43,"y":18.768,"a":-0.785},"F":{"x":8.278,"y":18.344,"a":2.356},"n":3,"name":"facing DC","dir":{"x":0.707,"y":-0.707}},{"L":{"x":12.124,"y":16.27,"a":3.142},"F":{"x":11.224,"y":15.97,"a":6.283},"n":4,"name":"backing LOD","dir":{"x":1,"y":0}},{"L":{"x":16.896,"y":16.322,"a":-2.669},"F":{"x":16.231,"y":15.646,"a":0.472},"n":5,"name":"backing LOD","dir":{"x":1,"y":0}},{"L":{"x":17.824,"y":18.044,"a":0},"F":{"x":18.724,"y":18.344,"a":3.142},"n":6,"name":"facing LOD","dir":{"x":1,"y":0}},{"L":{"x":21.537,"y":18.16,"a":0},"F":{"x":22.437,"y":18.46,"a":3.142},"n":7,"name":"facing LOD","dir":{"x":1,"y":0}}],"figLabels":[{"x":3.239,"y":15.389,"text":"LF Walk + Half Natural Turn","br":2},{"x":5.862,"y":19.398,"text":"Hesitation"},{"x":8.349,"y":16.429,"text":"Progressive Chasse to Right","rot":-1.044,"br":1},{"x":14.038,"y":15.555,"text":"Lock"},{"x":19.059,"y":16.509,"text":"Tipple Chasse to Right","br":2},{"x":20.082,"y":17.685,"text":"Lock"},{"x":24.358,"y":18.352,"text":"Lock Forward","br":1}],"path":[{"x":1.795,"y":14.858},{"x":2.104,"y":15.176},{"x":2.403,"y":15.504},{"x":2.692,"y":15.84},{"x":2.97,"y":16.185},{"x":3.239,"y":16.539},{"x":3.497,"y":16.901},{"x":3.746,"y":17.273},{"x":3.984,"y":17.653},{"x":4.211,"y":18.041},{"x":4.429,"y":18.439},{"x":4.429,"y":18.439},{"x":4.772,"y":18.44},{"x":5.114,"y":18.444},{"x":5.457,"y":18.45},{"x":5.799,"y":18.458},{"x":6.142,"y":18.468},{"x":6.484,"y":18.481},{"x":6.827,"y":18.496},{"x":7.169,"y":18.514},{"x":7.512,"y":18.534},{"x":7.854,"y":18.556},{"x":7.854,"y":18.556},{"x":8.18,"y":18.243},{"x":8.519,"y":17.946},{"x":8.87,"y":17.664},{"x":9.234,"y":17.397},{"x":9.61,"y":17.146},{"x":9.998,"y":16.91},{"x":10.398,"y":16.69},{"x":10.811,"y":16.484},{"x":11.236,"y":16.295},{"x":11.674,"y":16.12},{"x":11.674,"y":16.12},{"x":12.163,"y":16.119},{"x":12.652,"y":16.115},{"x":13.141,"y":16.108},{"x":13.63,"y":16.098},{"x":14.119,"y":16.086},{"x":14.608,"y":16.071},{"x":15.097,"y":16.053},{"x":15.586,"y":16.033},{"x":16.075,"y":16.01},{"x":16.564,"y":15.984},{"x":16.564,"y":15.984},{"x":16.832,"y":16.006},{"x":17.079,"y":16.072},{"x":17.304,"y":16.183},{"x":17.508,"y":16.337},{"x":17.69,"y":16.536},{"x":17.85,"y":16.779},{"x":17.989,"y":17.067},{"x":18.105,"y":17.398},{"x":18.201,"y":17.774},{"x":18.274,"y":18.194},{"x":18.274,"y":18.194},{"x":18.645,"y":18.195},{"x":19.017,"y":18.199},{"x":19.388,"y":18.204},{"x":19.76,"y":18.213},{"x":20.131,"y":18.223},{"x":20.502,"y":18.236},{"x":20.873,"y":18.251},{"x":21.245,"y":18.268},{"x":21.616,"y":18.288},{"x":21.987,"y":18.31},{"x":21.987,"y":18.31},{"x":22.521,"y":18.311},{"x":23.056,"y":18.316},{"x":23.59,"y":18.322},{"x":24.124,"y":18.332},{"x":24.658,"y":18.344},{"x":25.193,"y":18.36},{"x":25.727,"y":18.377},{"x":26.261,"y":18.398},{"x":26.795,"y":18.421},{"x":27.329,"y":18.448}]};

// Victor's hand-arranged Waltz 1 layout, captured 10 Jun 2026 via Copy layout
const WALTZ1_LAYOUT = {"leader":{"x":24.787,"y":16.303,"a":0.8},"follower":{"x":25.199,"y":17.158,"a":3.941},"ghosts":[{"L":{"x":2.179,"y":14.227,"a":0.785},"F":{"x":2.603,"y":15.075,"a":3.927},"n":1,"name":"facing DW","dir":{"x":0.707,"y":0.707}},{"L":{"x":6.743,"y":18.813,"a":3.142},"F":{"x":5.843,"y":18.513,"a":6.283},"n":2,"name":"backing LOD","dir":{"x":1,"y":0}},{"L":{"x":10.573,"y":18.987,"a":-0.785},"F":{"x":11.421,"y":18.563,"a":2.356},"n":3,"name":"facing DC","dir":{"x":0.707,"y":-0.707}},{"L":{"x":13.295,"y":16.212,"a":-2.551},"F":{"x":12.715,"y":15.462,"a":0.59},"n":4,"name":"backing LOD","dir":{"x":1,"y":0}},{"L":{"x":15.802,"y":15.008,"a":3.931},"F":{"x":15.38,"y":14.158,"a":7.072},"n":5,"name":"backing LOD","dir":{"x":1,"y":0}},{"L":{"x":21.603,"y":13.876,"a":2.163},"F":{"x":20.853,"y":14.456,"a":5.305},"n":6,"name":"wall/DW (67.5°)","dir":{"x":1,"y":0}}],"figLabels":[{"x":5.037,"y":15.814,"text":"Half Natural","br":1},{"x":8.529,"y":19.32,"text":"Hesitation"},{"x":10.937,"y":16.917,"text":"Half Reverse","br":1},{"x":13.948,"y":14.737,"text":"Weave"},{"x":17.936,"y":13.585,"text":"Outside Change to PP","br":1},{"x":23.571,"y":14.123,"text":"Chasse from PP","br":1}],"path":[{"x":2.391,"y":14.651},{"x":2.786,"y":15.047},{"x":3.18,"y":15.445},{"x":3.573,"y":15.843},{"x":3.965,"y":16.243},{"x":4.356,"y":16.643},{"x":4.745,"y":17.045},{"x":5.134,"y":17.448},{"x":5.521,"y":17.852},{"x":5.908,"y":18.257},{"x":6.293,"y":18.663},{"x":6.293,"y":18.663},{"x":6.764,"y":18.664},{"x":7.234,"y":18.667},{"x":7.704,"y":18.673},{"x":8.175,"y":18.681},{"x":8.645,"y":18.691},{"x":9.116,"y":18.703},{"x":9.586,"y":18.718},{"x":10.056,"y":18.735},{"x":10.527,"y":18.754},{"x":10.997,"y":18.775},{"x":10.997,"y":18.775},{"x":11.244,"y":18.519},{"x":11.48,"y":18.255},{"x":11.706,"y":17.982},{"x":11.922,"y":17.701},{"x":12.128,"y":17.411},{"x":12.324,"y":17.113},{"x":12.509,"y":16.807},{"x":12.685,"y":16.492},{"x":12.85,"y":16.168},{"x":13.005,"y":15.837},{"x":13.005,"y":15.837},{"x":13.289,"y":15.824},{"x":13.568,"y":15.786},{"x":13.841,"y":15.724},{"x":14.108,"y":15.636},{"x":14.37,"y":15.523},{"x":14.626,"y":15.385},{"x":14.875,"y":15.223},{"x":15.12,"y":15.035},{"x":15.358,"y":14.822},{"x":15.591,"y":14.583},{"x":15.591,"y":14.583},{"x":16.156,"y":14.579},{"x":16.721,"y":14.567},{"x":17.285,"y":14.546},{"x":17.849,"y":14.517},{"x":18.413,"y":14.479},{"x":18.977,"y":14.433},{"x":19.54,"y":14.379},{"x":20.103,"y":14.316},{"x":20.665,"y":14.245},{"x":21.228,"y":14.166},{"x":21.228,"y":14.166},{"x":21.675,"y":14.191},{"x":22.107,"y":14.268},{"x":22.523,"y":14.396},{"x":22.924,"y":14.576},{"x":23.308,"y":14.807},{"x":23.677,"y":15.089},{"x":24.03,"y":15.422},{"x":24.367,"y":15.807},{"x":24.688,"y":16.243},{"x":24.993,"y":16.73}]};

// ---------- Geometry helpers ----------
const px = (mx) => M + mx * S;
const py = (my) => M + my * S;

function fwd(a) { return { x: Math.cos(a), y: Math.sin(a) }; }
function rightOf(a) { return { x: -Math.sin(a), y: Math.cos(a) }; }

function closedFollower(L) {
  const f = fwd(L.a), r = rightOf(L.a);
  return {
    x: L.x + f.x * 0.9 + r.x * 0.3,
    y: L.y + f.y * 0.9 + r.y * 0.3,
    a: L.a + Math.PI,
  };
}

function clampPos(p) {
  return {
    ...p,
    x: Math.min(FLOOR_W - 0.3, Math.max(0.3, p.x)),
    y: Math.min(FLOOR_D - 0.3, Math.max(0.3, p.y)),
  };
}

// Front-view projection (floor plane z = 0; viewer stands centred, 5 m before the near edge)
function proj(x, y, z) {
  const d = y + D0;
  return { sx: CX + (x - EYE_X) * F / d, sy: CY + (EYE_H - z) * F / d, k: F / d };
}
function unproj(sx, sy) {
  if (sy < CY + 8) return null;
  const d = EYE_H * F / (sy - CY);
  return { x: EYE_X + (sx - CX) * d / F, y: d - D0 };
}

// ---------- Component ----------
export default function FloorcraftBoard() {
  const initL = { x: 4, y: 10, a: 0 };
  const [leader, setLeader] = useState(initL);
  const [follower, setFollower] = useState(closedFollower(initL));
  const [mode, setMode] = useState("couple");     // couple | individual
  const [view, setView] = useState("top");        // top | front
  const [path, setPath] = useState([]);           // [{x,y}]
  const [ghosts, setGhosts] = useState([]);       // [{L,F,n}]
  const [figLabels, setFigLabels] = useState([]); // [{x,y,text}] figure names between stamps
  const svgRef = useRef(null);
  const dragRef = useRef(null);
  const seqRef = useRef(null); // figure names of the loaded sequence, for path rebuilds
  const [selLabel, setSelLabel] = useState(null); // index of the selected figure label
  const [exportText, setExportText] = useState(null); // serialized layout for copy-paste
  const [selGhost, setSelGhost] = useState(null); // index of the selected ghost (for rotation)

  const cc = { x: (leader.x + follower.x) / 2, y: (leader.y + follower.y) / 2 };

  // ----- pointer plumbing -----
  function toSvg(e) {
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  }
  function toMetersTop(e) {
    const p = toSvg(e);
    return { x: (p.x - M) / S, y: (p.y - M) / S };
  }

  function pushPath(c) {
    setPath((old) => {
      const last = old[old.length - 1];
      if (last && Math.hypot(last.x - c.x, last.y - c.y) < 0.08) return old;
      return [...old, { x: c.x, y: c.y }];
    });
  }

  function startDrag(e, type, idx) {
    e.stopPropagation();
    e.preventDefault();
    let m;
    if (view === "top") m = toMetersTop(e);
    else {
      const p = toSvg(e);
      m = unproj(p.x, p.y);
      if (!m) return;
    }
    const centre = { x: (leader.x + follower.x) / 2, y: (leader.y + follower.y) / 2 };
    dragRef.current = {
      type, m0: m, idx,
      L0: { ...leader }, F0: { ...follower },
      G0: idx != null && ghosts[idx]
        ? { L: { ...ghosts[idx].L }, F: { ...ghosts[idx].F } } : null,
      c0: centre,
      a0: Math.atan2(m.y - centre.y, m.x - centre.x),
    };
    if ((type === "label" || type === "rotLabel") && idx != null && figLabels[idx]) {
      dragRef.current.Lb0 = { ...figLabels[idx] };
      dragRef.current.a0l = Math.atan2(m.y - figLabels[idx].y, m.x - figLabels[idx].x);
    }
    if (type === "rotGhost" && idx != null && ghosts[idx]) {
      const g = ghosts[idx];
      const gc = { x: (g.L.x + g.F.x) / 2, y: (g.L.y + g.F.y) / 2 };
      dragRef.current.gc0 = gc;
      dragRef.current.a0g = Math.atan2(m.y - gc.y, m.x - gc.x);
    }
  }

  function onMove(e) {
    const d = dragRef.current;
    if (!d) return;
    let m;
    if (view === "top") m = toMetersTop(e);
    else {
      const p = toSvg(e);
      m = unproj(p.x, p.y);
      if (!m) return;
    }
    const dx = m.x - d.m0.x, dy = m.y - d.m0.y;

    if (d.type === "couple") {
      const L = clampPos({ ...d.L0, x: d.L0.x + dx, y: d.L0.y + dy });
      const Fo = clampPos({ ...d.F0, x: d.F0.x + dx, y: d.F0.y + dy });
      setLeader(L); setFollower(Fo);
      pushPath({ x: (L.x + Fo.x) / 2, y: (L.y + Fo.y) / 2 });
    } else if (d.type === "rotate") {
      const a1 = Math.atan2(m.y - d.c0.y, m.x - d.c0.x);
      const da = a1 - d.a0;
      const rot = (P) => {
        const rx = P.x - d.c0.x, ry = P.y - d.c0.y;
        return clampPos({
          x: d.c0.x + rx * Math.cos(da) - ry * Math.sin(da),
          y: d.c0.y + rx * Math.sin(da) + ry * Math.cos(da),
          a: P.a + da,
        });
      };
      setLeader(rot(d.L0)); setFollower(rot(d.F0));
    } else if (d.type === "leader" || d.type === "follower") {
      const base = d.type === "leader" ? d.L0 : d.F0;
      const np = clampPos({ ...base, x: base.x + dx, y: base.y + dy });
      if (d.type === "leader") {
        setLeader(np);
        pushPath({ x: (np.x + follower.x) / 2, y: (np.y + follower.y) / 2 });
      } else {
        setFollower(np);
        pushPath({ x: (leader.x + np.x) / 2, y: (np.y + leader.y) / 2 });
      }
    } else if (d.type === "ghost") {
      setGhosts((gs) => gs.map((g, j) => j === d.idx ? {
        ...g,
        L: { ...d.G0.L, x: d.G0.L.x + dx, y: d.G0.L.y + dy },
        F: { ...d.G0.F, x: d.G0.F.x + dx, y: d.G0.F.y + dy },
      } : g));
    } else if (d.type === "rotGhost") {
      const ang = Math.atan2(m.y - d.gc0.y, m.x - d.gc0.x);
      const da = ang - d.a0g;
      const rotP = (P) => {
        const rx = P.x - d.gc0.x, ry = P.y - d.gc0.y;
        return {
          x: d.gc0.x + rx * Math.cos(da) - ry * Math.sin(da),
          y: d.gc0.y + rx * Math.sin(da) + ry * Math.cos(da),
          a: P.a + da,
        };
      };
      setGhosts((gs) => gs.map((g, j) => j === d.idx
        ? { ...g, L: rotP(d.G0.L), F: rotP(d.G0.F) } : g));
    } else if (d.type === "label") {
      setFigLabels((ls) => ls.map((l, j) =>
        j === d.idx ? { ...l, x: d.Lb0.x + dx, y: d.Lb0.y + dy } : l));
    } else if (d.type === "rotLabel") {
      const ang = Math.atan2(m.y - d.Lb0.y, m.x - d.Lb0.x);
      const rot = (d.Lb0.rot || 0) + ((ang - d.a0l) * 180) / Math.PI;
      setFigLabels((ls) => ls.map((l, j) => (j === d.idx ? { ...l, rot } : l)));
    } else if (d.type === "rotL") {
      setLeader({ ...d.L0, a: Math.atan2(m.y - d.L0.y, m.x - d.L0.x) });
    } else if (d.type === "rotF") {
      setFollower({ ...d.F0, a: Math.atan2(m.y - d.F0.y, m.x - d.F0.x) });
    }
  }

  function onUp() { dragRef.current = null; }

  // ----- actions -----
  const stamp = () =>
    setGhosts((g) => [...g, { L: { ...leader }, F: { ...follower }, n: g.length + 1 }]);
  const undoStamp = () => setGhosts((g) => g.slice(0, -1));
  const resetHold = () => setFollower(closedFollower(leader));
  const resetAll = () => {
    setLeader(initL); setFollower(closedFollower(initL));
    setPath([]); setGhosts([]); setFigLabels([]);
  };

  // ----- Slow Foxtrot preset -----
  // LOD = +x along the bottom long wall; facing DC = -45°, facing DW = +45°, backing LOD = 180°.
  function coupleFromCentre(c, a) {
    const f = fwd(a), r = rightOf(a);
    const ox = f.x * 0.45 + r.x * 0.15, oy = f.y * 0.45 + r.y * 0.15;
    return {
      L: { x: c.x - ox, y: c.y - oy, a },
      F: { x: c.x + ox, y: c.y + oy, a: a + Math.PI },
    };
  }

  function loadSequence(states, figNames) {
    const n = states.length - 1; // number of figures/segments
    seqRef.current = { figNames };
    // ghosts at the start and at every figure transition; live couple at the end
    const newGhosts = states.slice(0, n).map((s, i) => {
      const cp = coupleFromCentre(s.c, s.a);
      return { L: cp.L, F: cp.F, n: i + 1, name: s.name, dir: s.dir };
    });
    // curved path: quadratic Bezier per figure, control point along initial travel direction
    const pts = [];
    const labels = [];
    for (let i = 0; i < n; i++) {
      const p0 = states[i].c, p1 = states[i + 1].c, d = states[i].dir;
      const dist = Math.hypot(p1.x - p0.x, p1.y - p0.y);
      const ctl = { x: p0.x + d.x * dist * 0.5, y: p0.y + d.y * dist * 0.5 };
      for (let t = 0; t <= 10; t++) {
        const u = t / 10, v = 1 - u;
        pts.push({
          x: v * v * p0.x + 2 * v * u * ctl.x + u * u * p1.x,
          y: v * v * p0.y + 2 * v * u * ctl.y + u * u * p1.y,
        });
      }
      // figure name at the curve midpoint, lifted off the line
      labels.push({
        x: 0.25 * p0.x + 0.5 * ctl.x + 0.25 * p1.x,
        y: 0.25 * p0.y + 0.5 * ctl.y + 0.25 * p1.y - 1.15,
        text: figNames[i],
      });
    }
    const end = coupleFromCentre(states[n].c, states[n].a);
    setGhosts(newGhosts);
    setFigLabels(labels);
    setPath(pts);
    setLeader(end.L);
    setFollower(end.F);
  }

  function pathFromStamps() {
    if (ghosts.length === 0) return;
    const centres = ghosts.map((g) => ({
      x: (g.L.x + g.F.x) / 2, y: (g.L.y + g.F.y) / 2, dir: g.dir || null,
    }));
    centres.push({ x: cc.x, y: cc.y, dir: null });
    const pts = [];
    const labels = [];
    const names = seqRef.current && seqRef.current.figNames.length === centres.length - 1
      ? seqRef.current.figNames : null;
    for (let i = 0; i < centres.length - 1; i++) {
      const p0 = centres[i], p1 = centres[i + 1];
      const dist = Math.hypot(p1.x - p0.x, p1.y - p0.y) || 0.001;
      const d = p0.dir || { x: (p1.x - p0.x) / dist, y: (p1.y - p0.y) / dist };
      const ctl = { x: p0.x + d.x * dist * 0.5, y: p0.y + d.y * dist * 0.5 };
      for (let t = 0; t <= 10; t++) {
        const u = t / 10, v = 1 - u;
        pts.push({
          x: v * v * p0.x + 2 * v * u * ctl.x + u * u * p1.x,
          y: v * v * p0.y + 2 * v * u * ctl.y + u * u * p1.y,
        });
      }
      if (names) labels.push({
        x: 0.25 * p0.x + 0.5 * ctl.x + 0.25 * p1.x,
        y: 0.25 * p0.y + 0.5 * ctl.y + 0.25 * p1.y - 1.15,
        text: names[i],
        rot: figLabels[i] ? figLabels[i].rot : 0,
        br: figLabels[i] ? figLabels[i].br : 0,
      });
    }
    setPath(pts);
    if (names) setFigLabels(labels);
  }

  function exportLayout() {
    const data = JSON.stringify(
      { leader, follower, ghosts, figLabels, path }, null, 1);
    setExportText(data);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(data).catch(() => {});
    }
  }

  const Q2 = Math.SQRT1_2;
  const DCd = { x: Q2, y: -Q2 }, DWd = { x: Q2, y: Q2 }, LODd = { x: 1, y: 0 };

  function loadFoxtrotDemo() {
    // Victor's exact arrangement (ghosts, labels, path) baked from his Copy layout export.
    const d = JSON.parse(JSON.stringify(FOXTROT_LAYOUT));
    seqRef.current = {
      figNames: ["Feather Step", "Reverse Turn", "Feather Finish",
                 "Three Step", "Natural Turn", "Heel Pull"],
    };
    setGhosts(d.ghosts);
    setFigLabels(d.figLabels);
    setPath(d.path);
    setLeader(d.leader);
    setFollower(d.follower);
  }

  function loadTangoDemo() {
    // Victor's exact arrangement (ghosts, labels, path) baked from his Copy layout export.
    const d = JSON.parse(JSON.stringify(TANGO_LAYOUT));
    seqRef.current = {
      figNames: ["Two Walks", "Progressive Link", "Closed Promenade",
                 "Open Reverse Turn, Lady Outside", "Two Walks", "Tango Rocks", "Back Corté"],
    };
    setGhosts(d.ghosts);
    setFigLabels(d.figLabels);
    setPath(d.path);
    setLeader(d.leader);
    setFollower(d.follower);
  }

  function loadQuickstepDemo() {
    // Victor's exact arrangement (ghosts, labels, path) baked from his Copy layout export.
    const d = JSON.parse(JSON.stringify(QUICKSTEP_LAYOUT));
    seqRef.current = {
      figNames: ["LF Walk + Half Natural Turn", "Hesitation", "Progressive Chasse to Right",
                 "Lock", "Tipple Chasse to Right", "Lock", "Lock Forward"],
    };
    setGhosts(d.ghosts);
    setFigLabels(d.figLabels);
    setPath(d.path);
    setLeader(d.leader);
    setFollower(d.follower);
  }

  function loadWaltz1Demo() {
    // Stamps 1-3 from Victor's arrangement; Basic Weave split into
    // Half Reverse / Weave / Outside Change to PP; ends facing wall.
    const d = JSON.parse(JSON.stringify(WALTZ1_LAYOUT));
    seqRef.current = {
      figNames: ["Half Natural", "Hesitation", "Half Reverse", "Weave",
                 "Outside Change to PP", "Chasse from PP"],
    };
    setGhosts(d.ghosts);
    setFigLabels(d.figLabels);
    setPath(d.path);
    setLeader(d.leader);
    setFollower(d.follower);
  }

  // ----- top-view dancer glyph -----
  function TopDancer({ p, color, ghost, drag, rotHandle }) {
    const deg = (p.a * 180) / Math.PI;
    return (
      <g opacity={ghost ? 0.45 : 1}>
        <g transform={`translate(${px(p.x)},${py(p.y)}) rotate(${deg})`}
           onPointerDown={drag} style={{ cursor: drag ? "grab" : "default" }}>
          {/* shoulders (long axis perpendicular to facing) — oversized, not to floor scale */}
          <ellipse cx="0" cy="0" rx={0.3 * S} ry={0.81 * S} fill={color} stroke="#fff" strokeWidth="2" />
          {/* head */}
          <circle cx="0" cy="0" r={0.2 * S} fill={color} stroke="#fff" strokeWidth="2" />
          {/* facing tick */}
          <line x1={0.24 * S} y1="0" x2={0.55 * S} y2="0" stroke={color} strokeWidth="4" strokeLinecap="round" />
          {/* invisible fat hit area */}
          <circle cx="0" cy="0" r={1.0 * S} fill="transparent" />
        </g>
        {rotHandle && (
          <g onPointerDown={rotHandle} style={{ cursor: "alias" }}>
            <line x1={px(p.x)} y1={py(p.y)}
                  x2={px(p.x + Math.cos(p.a) * 1.6)} y2={py(p.y + Math.sin(p.a) * 1.6)}
                  stroke={color} strokeWidth="1" strokeDasharray="3 3" />
            <circle cx={px(p.x + Math.cos(p.a) * 1.6)} cy={py(p.y + Math.sin(p.a) * 1.6)}
                    r="9" fill="#fff" stroke={color} strokeWidth="2" />
          </g>
        )}
      </g>
    );
  }

  // ----- front-view dancer glyph -----
  function FrontDancer({ p, color, ghost, drag, label }) {
    const b = proj(p.x, p.y, 0);
    const sh = proj(p.x, p.y, 1.45);
    const hd = proj(p.x, p.y, 1.6);
    const w = 1.26 * b.k;
    return (
      <g opacity={ghost ? 0.4 : 1} onPointerDown={drag}
         style={{ cursor: drag ? "grab" : "default" }}>
        <ellipse cx={b.sx} cy={b.sy} rx={w * 0.7} ry={w * 0.16} fill="#000" opacity="0.12" />
        <rect x={b.sx - w / 2} y={sh.sy} width={w} height={b.sy - sh.sy}
              rx={w * 0.4} fill={color} stroke="#fff" strokeWidth="1.5" />
        <circle cx={hd.sx} cy={hd.sy - 0.3 * b.k} r={0.3 * b.k} fill={color} stroke="#fff" strokeWidth="1.5" />
        {label != null && (
          <g>
            <circle cx={hd.sx} cy={hd.sy - 1.0 * b.k} r={Math.max(10, 0.22 * b.k)} fill="#fff" stroke={BLUE} strokeWidth="1.5" />
            <text x={hd.sx} y={hd.sy - 1.0 * b.k + 4} textAnchor="middle"
                  fontSize={Math.max(11, 0.24 * b.k)} fill={BLUE} fontWeight="700">{label}</text>
          </g>
        )}
        <rect x={b.sx - w} y={hd.sy - 0.7 * b.k} width={w * 2} height={b.sy - hd.sy + 0.7 * b.k} fill="transparent" />
      </g>
    );
  }

  // ----- grids -----
  const topGrid = [];
  for (let i = 0; i <= FLOOR_W; i++)
    topGrid.push(<line key={"v" + i} x1={px(i)} y1={py(0)} x2={px(i)} y2={py(FLOOR_D)}
      stroke={i % 5 === 0 ? "#cfc9bd" : "#e8e5de"} strokeWidth={i % 5 === 0 ? 1.4 : 0.7} />);
  for (let j = 0; j <= FLOOR_D; j++)
    topGrid.push(<line key={"h" + j} x1={px(0)} y1={py(j)} x2={px(FLOOR_W)} y2={py(j)}
      stroke={j % 5 === 0 ? "#cfc9bd" : "#e8e5de"} strokeWidth={j % 5 === 0 ? 1.4 : 0.7} />);

  const frontGrid = [];
  for (let i = 0; i <= FLOOR_W; i += 1) {
    const a = proj(i, 0, 0), b = proj(i, FLOOR_D, 0);
    frontGrid.push(<line key={"fv" + i} x1={a.sx} y1={a.sy} x2={b.sx} y2={b.sy}
      stroke={i % 5 === 0 ? "#cfc9bd" : "#eceae4"} strokeWidth={i % 5 === 0 ? 1.2 : 0.6} />);
  }
  for (let j = 0; j <= FLOOR_D; j += 1) {
    const a = proj(0, j, 0), b = proj(FLOOR_W, j, 0);
    frontGrid.push(<line key={"fh" + j} x1={a.sx} y1={a.sy} x2={b.sx} y2={b.sy}
      stroke={j % 5 === 0 ? "#cfc9bd" : "#eceae4"} strokeWidth={j % 5 === 0 ? 1.2 : 0.6} />);
  }
  const fc = [proj(0, 0, 0), proj(FLOOR_W, 0, 0), proj(FLOOR_W, FLOOR_D, 0), proj(0, FLOOR_D, 0)];

  // sorted far → near for front view
  const frontItems = [];
  ghosts.forEach((g) => {
    frontItems.push({ y: g.L.y, el: (k) => <FrontDancer key={k} p={g.L} color={LEADER_C} ghost label={g.n} /> });
    frontItems.push({ y: g.F.y, el: (k) => <FrontDancer key={k} p={g.F} color={FOLLOWER_C} ghost /> });
  });
  frontItems.push({
    y: leader.y,
    el: (k) => <FrontDancer key={k} p={leader} color={LEADER_C}
      drag={(e) => startDrag(e, mode === "couple" ? "couple" : "leader")} />,
  });
  frontItems.push({
    y: follower.y,
    el: (k) => <FrontDancer key={k} p={follower} color={FOLLOWER_C}
      drag={(e) => startDrag(e, mode === "couple" ? "couple" : "follower")} />,
  });
  frontItems.sort((a, b) => b.y - a.y);

  // ----- UI bits -----
  const Seg = ({ value, set, opts }) => (
    <div style={{ display: "inline-flex", border: `1.5px solid ${INK}`, borderRadius: 6, overflow: "hidden" }}>
      {opts.map(([v, lbl]) => (
        <button key={v} onClick={() => set(v)} style={{
          padding: "7px 14px", border: "none", cursor: "pointer",
          fontFamily: "inherit", fontWeight: 600, fontSize: 13,
          background: value === v ? INK : "#fff", color: value === v ? "#fff" : INK,
        }}>{lbl}</button>
      ))}
    </div>
  );
  const Btn = ({ onClick, children, primary }) => (
    <button onClick={onClick} style={{
      padding: "7px 14px", borderRadius: 6, cursor: "pointer",
      fontFamily: "inherit", fontWeight: 600, fontSize: 13,
      border: `1.5px solid ${primary ? BLUE : "#b9b4a8"}`,
      background: primary ? BLUE : "#fff", color: primary ? "#fff" : INK,
    }}>{children}</button>
  );

  return (
    <div style={{
      fontFamily: "Montserrat, -apple-system, 'Segoe UI', sans-serif",
      background: "#fdfcfa", minHeight: "100vh", padding: "16px 18px", color: INK,
    }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap", marginBottom: 10 }}>
        <div style={{ fontWeight: 800, fontSize: 18, letterSpacing: 0.5 }}>
          <span style={{ color: BLUE }}>Dance</span> PRAKTIKA
        </div>
        <div style={{ fontSize: 13, color: "#666" }}>
          Floorcraft board · 30 m × 20 m · trajectory of the couple's centre
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 10 }}>
        <Seg value={view} set={setView} opts={[["top", "Ceiling view"], ["front", "Floor view"]]} />
        <Seg value={mode} set={setMode} opts={[["couple", "Couple unit"], ["individual", "Individual"]]} />
        <Btn primary onClick={stamp}>Stamp position ({ghosts.length})</Btn>
        <Btn onClick={undoStamp}>Undo stamp</Btn>
        <Btn onClick={() => { setGhosts([]); setFigLabels([]); }}>Clear stamps</Btn>
        <Btn onClick={() => setPath([])}>Clear path</Btn>
        <Btn onClick={resetHold}>Re-form hold</Btn>
        <Btn onClick={resetAll}>Reset all</Btn>
        <Btn primary onClick={loadFoxtrotDemo}>Foxtrot</Btn>
        <Btn primary onClick={loadTangoDemo}>Tango</Btn>
        <Btn primary onClick={loadQuickstepDemo}>Quickstep</Btn>
        <Btn primary onClick={loadWaltz1Demo}>Waltz 1</Btn>
        <Btn onClick={pathFromStamps}>Path from stamps</Btn>
        <Btn onClick={exportLayout}>Copy layout</Btn>
      </div>

      {exportText != null && (
        <div style={{ marginBottom: 10, maxWidth: 1100 }}>
          <div style={{ fontSize: 12.5, marginBottom: 4 }}>
            Layout copied to clipboard (if permitted). Otherwise select the text below and copy it,
            then paste it to Claude to bake these positions into the preset.
          </div>
          <textarea readOnly value={exportText} onFocus={(e) => e.target.select()}
                    style={{ width: "100%", height: 110, fontFamily: "monospace",
                             fontSize: 11, border: "1.5px solid #b9b4a8", borderRadius: 6,
                             padding: 6 }} />
          <button onClick={() => setExportText(null)} style={{
            marginTop: 4, padding: "5px 12px", borderRadius: 6, cursor: "pointer",
            fontFamily: "inherit", fontWeight: 600, fontSize: 12,
            border: "1.5px solid #b9b4a8", background: "#fff", color: INK }}>Close</button>
        </div>
      )}

      <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`}
           style={{ width: "100%", maxWidth: 1100, display: "block", background: "#fff", border: "1px solid #ddd8cc", borderRadius: 8, touchAction: "none" }}
           onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp}>

        {view === "top" && (
          <g>
            <rect x={px(0)} y={py(0)} width={FLOOR_W * S} height={FLOOR_D * S} fill="#f7f5f0"
                  onPointerDown={() => { setSelLabel(null); setSelGhost(null); }} />
            {topGrid}
            <rect x={px(0)} y={py(0)} width={FLOOR_W * S} height={FLOOR_D * S} fill="none" stroke={INK} strokeWidth="2" />
            {/* LOD arrows, counter-clockwise on screen */}
            {[
              [px(14), py(FLOOR_D) + 14, 0], [px(FLOOR_W) + 14, py(11), -90],
              [px(16), py(0) - 8, 180], [px(0) - 14, py(9), 90],
            ].map(([x, y, r], i) => (
              <text key={i} x={x} y={y} fontSize="13" fill="#8a8478"
                    transform={`rotate(${r} ${x} ${y})`} textAnchor="middle">LOD ⟶</text>
            ))}
            {/* trajectory */}
            {path.length > 1 && (
              <polyline points={path.map((p) => `${px(p.x)},${py(p.y)}`).join(" ")}
                        fill="none" stroke={TRACK_C} strokeWidth="2.5" strokeOpacity="0.6"
                        strokeLinejoin="round" strokeLinecap="round" />
            )}
            {/* ghosts */}
            {ghosts.map((g, i) => {
              const gx = (g.L.x + g.F.x) / 2, gy = (g.L.y + g.F.y) / 2;
              return (
                <g key={i}>
                  <g onPointerDown={(e) => { setSelGhost(i); startDrag(e, "ghost", i); }}
                     style={{ cursor: "grab" }}>
                    <TopDancer p={g.L} color={LEADER_C} ghost />
                    <TopDancer p={g.F} color={FOLLOWER_C} ghost />
                    <circle cx={px(gx)} cy={py(gy)} r="10" fill="#fff" stroke={BLUE} strokeWidth="1.5" />
                    <text x={px(gx)} y={py(gy) + 4} textAnchor="middle" fontSize="11"
                          fontWeight="700" fill={BLUE}>{g.n}</text>
                  </g>
                  {selGhost === i && (
                    <g onPointerDown={(e) => startDrag(e, "rotGhost", i)}
                       style={{ cursor: "alias" }}>
                      <line x1={px(gx)} y1={py(gy)}
                            x2={px(gx + Math.cos(g.L.a) * 2.3)}
                            y2={py(gy + Math.sin(g.L.a) * 2.3)}
                            stroke={BLUE} strokeWidth="1.2" strokeDasharray="3 3" />
                      <circle cx={px(gx + Math.cos(g.L.a) * 2.3)}
                              cy={py(gy + Math.sin(g.L.a) * 2.3)}
                              r="10" fill="#fff" stroke={BLUE} strokeWidth="2.5" />
                    </g>
                  )}
                </g>
              );
            })}
            {/* figure names between stamps: tap to select, drag to move,
                right handle rotates, left button cycles the line break */}
            {figLabels.map((l, i) => {
              const words = l.text.split(" ");
              const br = l.br || 0;
              const lines = br > 0 && br < words.length
                ? [words.slice(0, br).join(" "), words.slice(br).join(" ")]
                : [l.text];
              const sel = selLabel === i;
              const LX = px(l.x), LY = py(l.y);
              return (
                <g key={"fl" + i} transform={`rotate(${l.rot || 0} ${LX} ${LY})`}>
                  <g onPointerDown={(e) => { setSelLabel(i); startDrag(e, "label", i); }}
                     style={{ cursor: "grab" }}>
                    {sel && (
                      <rect x={LX - 70} y={LY - 10 - (lines.length - 1) * 8}
                            width="140" height={16 + (lines.length - 1) * 16}
                            fill="none" stroke={BLUE} strokeOpacity="0.4"
                            strokeDasharray="4 3" rx="4" />
                    )}
                    {lines.map((ln, k) => (
                      <text key={k} x={LX}
                            y={LY + (k - (lines.length - 1) / 2) * 15 + 4}
                            textAnchor="middle" fontSize="14" fontWeight="700"
                            fill={BLUE} stroke="#fff" strokeWidth="4"
                            paintOrder="stroke">{ln}</text>
                    ))}
                  </g>
                  {sel && (
                    <g>
                      <circle cx={LX + 84} cy={LY} r="10" fill="#fff" stroke={BLUE}
                              strokeWidth="2"
                              onPointerDown={(e) => startDrag(e, "rotLabel", i)}
                              style={{ cursor: "alias" }} />
                      <text x={LX + 84} y={LY + 4} textAnchor="middle" fontSize="11"
                            fill={BLUE} fontWeight="700" pointerEvents="none">{"\u21bb"}</text>
                      <g onPointerDown={(e) => {
                           e.stopPropagation(); e.preventDefault();
                           setFigLabels((ls) => ls.map((x, j) => j === i
                             ? { ...x, br: ((x.br || 0) + 1) % x.text.split(" ").length }
                             : x));
                         }} style={{ cursor: "pointer" }}>
                        <circle cx={LX - 84} cy={LY} r="10" fill="#fff" stroke={BLUE}
                                strokeWidth="2" />
                        <text x={LX - 84} y={LY + 4} textAnchor="middle" fontSize="11"
                              fill={BLUE} fontWeight="700">{"\u21b5"}</text>
                      </g>
                    </g>
                  )}
                </g>
              );
            })}
            {/* couple drag zone + rotation handle (couple mode) */}
            {mode === "couple" && (
              <g>
                <circle cx={px(cc.x)} cy={py(cc.y)} r={1.7 * S}
                        fill={BLUE} fillOpacity="0.07" stroke={BLUE} strokeOpacity="0.35"
                        strokeDasharray="4 4"
                        onPointerDown={(e) => startDrag(e, "couple")} style={{ cursor: "grab" }} />
                <g onPointerDown={(e) => startDrag(e, "rotate")} style={{ cursor: "alias" }}>
                  <line x1={px(cc.x)} y1={py(cc.y)}
                        x2={px(cc.x + Math.cos(leader.a) * 2.5)} y2={py(cc.y + Math.sin(leader.a) * 2.5)}
                        stroke={BLUE} strokeWidth="1.2" strokeDasharray="3 3" />
                  <circle cx={px(cc.x + Math.cos(leader.a) * 2.5)} cy={py(cc.y + Math.sin(leader.a) * 2.5)}
                          r="11" fill="#fff" stroke={BLUE} strokeWidth="2.5" />
                </g>
              </g>
            )}
            {/* dancers */}
            <TopDancer p={leader} color={LEADER_C}
              drag={mode === "individual" ? (e) => startDrag(e, "leader") : (e) => startDrag(e, "couple")}
              rotHandle={mode === "individual" ? (e) => startDrag(e, "rotL") : null} />
            <TopDancer p={follower} color={FOLLOWER_C}
              drag={mode === "individual" ? (e) => startDrag(e, "follower") : (e) => startDrag(e, "couple")}
              rotHandle={mode === "individual" ? (e) => startDrag(e, "rotF") : null} />
            {/* common centre */}
            <circle cx={px(cc.x)} cy={py(cc.y)} r="4" fill="#fff" stroke={BLUE} strokeWidth="2" />
          </g>
        )}

        {view === "front" && (
          <g>
            <rect x="0" y="0" width={VW} height={CY} fill="#fbfaf7" />
            <polygon points={fc.map((p) => `${p.sx},${p.sy}`).join(" ")} fill="#f7f5f0" stroke={INK} strokeWidth="1.5" />
            {frontGrid}
            {path.length > 1 && (
              <polyline points={path.map((p) => { const q = proj(p.x, p.y, 0); return `${q.sx},${q.sy}`; }).join(" ")}
                        fill="none" stroke={TRACK_C} strokeWidth="2" strokeOpacity="0.6"
                        strokeLinejoin="round" strokeLinecap="round" />
            )}
            {frontItems.map((it, i) => it.el(i))}
            <text x={VW - 14} y={CY - 10} textAnchor="end" fontSize="12" fill="#8a8478">
              horizon — drag dancers on the floor below it
            </text>
          </g>
        )}
      </svg>

      <div style={{ fontSize: 12.5, color: "#666", marginTop: 8, maxWidth: 1100, lineHeight: 1.5 }}>
        <b>Couple unit:</b> drag the dashed circle to travel; drag the outer handle to rotate the couple
        (amount of turn). <b>Individual:</b> drag each dancer; small handle ahead of each sets facing.
        <b> Stamp position</b> leaves a numbered ghost — stamp before and after each figure;
        ghosts stay draggable in ceiling view, and <b>Path from stamps</b> redraws the
        trajectory (and figure labels) through wherever you have placed them.
        Tap a figure name to select it: drag to move, the {"\u21bb"} handle rotates it,
        and {"\u21b5"} moves words to a second line (tap repeatedly to cycle the break point).
        Rotation handles are available in ceiling view; in floor view you can travel and stamp.
        The blue line is the path of the couple's common centre.
      </div>
    </div>
  );
}
