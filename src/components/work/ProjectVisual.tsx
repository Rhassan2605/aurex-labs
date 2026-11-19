import type { ProjectVisual as VisualKind } from "@/content/projects";

/**
 * Illustrated, resolution-independent project visuals (SVG).
 * Used for sample concepts until real screenshots are supplied via `images`.
 */

type Props = { kind: VisualKind; accent: string; title: string; className?: string; uid?: string };

const INK = "#0d0e15";
const PANEL = "#151622";
const PANEL_2 = "#1d1e2d";
const LINE = "rgba(255,255,255,0.08)";
const SOFT = "rgba(245,243,250,0.16)";
const SOFTER = "rgba(245,243,250,0.08)";

function Backdrop({ id, accent }: { id: string; accent: string }) {
  return (
    <>
      <defs>
        <radialGradient id={`${id}-glow`} cx="70%" cy="20%" r="80%">
          <stop offset="0" stopColor={accent} stopOpacity="0.45" />
          <stop offset="0.5" stopColor={accent} stopOpacity="0.08" />
          <stop offset="1" stopColor={INK} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-accent`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e4d9ff" />
          <stop offset="0.5" stopColor={accent} />
          <stop offset="1" stopColor="#4b25c2" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill={INK} />
      <rect width="800" height="500" fill={`url(#${id}-glow)`} />
    </>
  );
}

function Browser({ x, y, w, h, children }: { x: number; y: number; w: number; h: number; children?: React.ReactNode }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="14" fill={PANEL} stroke={LINE} />
      <rect x={x} y={y} width={w} height="30" rx="14" fill={PANEL_2} />
      <rect x={x} y={y + 16} width={w} height="14" fill={PANEL_2} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={x + 18 + i * 14} cy={y + 15} r="4" fill={SOFT} />
      ))}
      <rect x={x + w / 2 - 90} y={y + 9} width="180" height="12" rx="6" fill={SOFTER} />
      {children}
    </g>
  );
}

function Phone({ x, y, w = 170, h = 340, children }: { x: number; y: number; w?: number; h?: number; children?: React.ReactNode }) {
  return (
    <g>
      <rect x={x - 6} y={y - 6} width={w + 12} height={h + 12} rx="34" fill="#07080c" stroke={LINE} />
      <rect x={x} y={y} width={w} height={h} rx="28" fill={PANEL} />
      <rect x={x + w / 2 - 26} y={y + 10} width="52" height="12" rx="6" fill="#07080c" />
      {children}
    </g>
  );
}

function Site({ id, accent }: { id: string; accent: string }) {
  return (
    <>
      <Browser x={90} y={56} w={620} h={392}>
        <rect x={114} y={104} width="70" height="10" rx="5" fill={SOFT} />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={470 + i * 52} y={106} width="38" height="6" rx="3" fill={SOFTER} />
        ))}
        <rect x={114} y={150} width="230" height="22" rx="4" fill="rgba(245,243,250,0.85)" />
        <rect x={114} y={182} width="190" height="22" rx="4" fill="rgba(245,243,250,0.85)" />
        <rect x={114} y={222} width="210" height="7" rx="3.5" fill={SOFT} />
        <rect x={114} y={236} width="170" height="7" rx="3.5" fill={SOFT} />
        <rect x={114} y={264} width="96" height="28" rx="14" fill={`url(#${id}-accent)`} />
        {/* Hero image: abstract architecture */}
        <rect x={380} y={140} width="306" height="180" rx="10" fill={PANEL_2} />
        <g clipPath={`url(#${id}-clip)`}>
          <rect x={380} y={140} width="306" height="180" fill={`url(#${id}-accent)`} opacity="0.35" />
          <polygon points="420,320 420,200 470,175 470,320" fill="rgba(245,243,250,0.75)" />
          <polygon points="470,320 470,175 540,205 540,320" fill="rgba(245,243,250,0.4)" />
          <polygon points="555,320 555,235 610,215 610,320" fill="rgba(245,243,250,0.6)" />
          <polygon points="610,320 610,215 660,240 660,320" fill="rgba(245,243,250,0.25)" />
          <rect x={380} y={300} width="306" height="20" fill={INK} opacity="0.5" />
        </g>
        <defs>
          <clipPath id={`${id}-clip`}>
            <rect x={380} y={140} width="306" height="180" rx="10" />
          </clipPath>
        </defs>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={114 + i * 145} y={344} width="132" height="78" rx="8" fill={PANEL_2} />
            <rect x={114 + i * 145} y={344} width="132" height="50" rx="8" fill={accent} opacity={0.12 + i * 0.07} />
            <rect x={124 + i * 145} y={404} width="70" height="6" rx="3" fill={SOFT} />
          </g>
        ))}
      </Browser>
    </>
  );
}

function App({ id, accent }: { id: string; accent: string }) {
  const ring = 2 * Math.PI * 46;
  return (
    <>
      <Phone x={200} y={70}>
        <rect x={222} y={110} width="70" height="9" rx="4.5" fill={SOFT} />
        <rect x={222} y={128} width="110" height="16" rx="4" fill="rgba(245,243,250,0.85)" />
        <circle cx={285} cy={220} r="46" fill="none" stroke={SOFTER} strokeWidth="10" />
        <circle
          cx={285}
          cy={220}
          r="46"
          fill="none"
          stroke={`url(#${id}-accent)`}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${ring * 0.68} ${ring}`}
          transform="rotate(-90 285 220)"
        />
        <rect x={262} y={212} width="46" height="16" rx="4" fill="rgba(245,243,250,0.85)" />
        <rect x={222} y={292} width="126" height="40" rx="20" fill={`url(#${id}-accent)`} />
        <rect x={258} y={308} width="54" height="8" rx="4" fill="rgba(9,10,15,0.7)" />
        <rect x={200} y={370} width="170" height="40" fill={PANEL_2} />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={235 + i * 50} cy={390} r="6" fill={i === 1 ? accent : SOFT} />
        ))}
      </Phone>
      <Phone x={430} y={90}>
        <rect x={452} y={130} width="90" height="16" rx="4" fill="rgba(245,243,250,0.85)" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x={452} y={162 + i * 44} width="126" height="34" rx="10" fill={PANEL_2} />
            <circle cx={470} cy={179 + i * 44} r="8" fill={i < 3 ? accent : "none"} stroke={i < 3 ? "none" : SOFT} strokeWidth="1.5" />
            <rect x={486} y={175 + i * 44} width={60 - i * 6} height="7" rx="3.5" fill={SOFT} />
          </g>
        ))}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect key={i} x={454 + i * 17} y={392 - [16, 26, 20, 34, 28, 38, 30][i]} width="10" height={[16, 26, 20, 34, 28, 38, 30][i]} rx="3" fill={accent} opacity={0.35 + i * 0.09} />
        ))}
      </Phone>
    </>
  );
}

function Dashboard({ id, accent }: { id: string; accent: string }) {
  const bars = [52, 74, 60, 96, 82, 118, 104, 132, 120, 146];
  return (
    <Browser x={70} y={50} w={660} h={400}>
      <rect x={70} y={80} width="120" height="370" fill={PANEL_2} opacity="0.6" />
      <rect x={90} y={100} width="60" height="10" rx="5" fill={SOFT} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={90} y={136 + i * 30} width={i === 1 ? 82 : 64} height="14" rx="7" fill={i === 1 ? accent : SOFTER} opacity={i === 1 ? 0.8 : 1} />
      ))}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={210 + i * 170} y={100} width="156" height="74" rx="10" fill={PANEL_2} />
          <rect x={224 + i * 170} y={114} width="56" height="7" rx="3.5" fill={SOFT} />
          <rect x={224 + i * 170} y={132} width="82" height="18" rx="4" fill="rgba(245,243,250,0.85)" />
          <rect x={224 + i * 170} y={158} width="36" height="7" rx="3.5" fill={accent} opacity="0.8" />
        </g>
      ))}
      <rect x={210} y={190} width="326" height="240" rx="10" fill={PANEL_2} />
      {bars.map((b, i) => (
        <rect key={i} x={232 + i * 30} y={410 - b} width="16" height={b} rx="4" fill={`url(#${id}-accent)`} opacity={0.45 + i * 0.05} />
      ))}
      <rect x={550} y={190} width="156" height="240" rx="10" fill={PANEL_2} />
      <circle cx={628} cy={270} r="44" fill="none" stroke={SOFTER} strokeWidth="14" />
      <circle cx={628} cy={270} r="44" fill="none" stroke={accent} strokeWidth="14" strokeDasharray="190 400" transform="rotate(-90 628 270)" />
      <circle cx={628} cy={270} r="44" fill="none" stroke="#e4d9ff" strokeWidth="14" strokeDasharray="60 400" strokeDashoffset="-196" transform="rotate(-90 628 270)" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx={572} cy={350 + i * 24} r="5" fill={[accent, "#e4d9ff", SOFT][i]} />
          <rect x={584} y={346 + i * 24} width={80 - i * 12} height="7" rx="3.5" fill={SOFT} />
        </g>
      ))}
    </Browser>
  );
}

function Brand({ id, accent }: { id: string; accent: string }) {
  return (
    <>
      {/* Coffee bag */}
      <g transform="translate(110 70)">
        <path d="M30 0h170l20 40v300H10V40z" fill="#efe9fb" />
        <path d="M30 0h170l20 40H10z" fill="#dcd2f3" />
        <circle cx="115" cy="160" r="54" fill={INK} />
        <path d="M115 122c-22 12-22 64 0 76 22-12 22-64 0-76z" fill={`url(#${id}-accent)`} />
        <path d="M115 128v64" stroke={INK} strokeWidth="3" />
        <rect x="55" y="240" width="120" height="12" rx="3" fill={INK} />
        <rect x="75" y="262" width="80" height="7" rx="3.5" fill={INK} opacity="0.5" />
        <rect x="88" y="300" width="54" height="16" rx="8" fill={accent} opacity="0.85" />
      </g>
      {/* Business card */}
      <g transform="rotate(-8 520 170)">
        <rect x={400} y={92} width="250" height="146" rx="12" fill={PANEL_2} stroke={LINE} />
        <circle cx={438} cy={130} r="16" fill={`url(#${id}-accent)`} />
        <rect x={420} y={188} width="110" height="10" rx="5" fill="rgba(245,243,250,0.85)" />
        <rect x={420} y={206} width="78" height="7" rx="3.5" fill={SOFT} />
      </g>
      {/* Palette */}
      {["#090a0f", "#3b2a1f", accent, "#e4d9ff", "#f5f3fa"].map((c, i) => (
        <circle key={c + i} cx={430 + i * 52} cy={318} r="20" fill={c} stroke={LINE} />
      ))}
      {/* Type specimen */}
      <text x={420} y={420} fill="rgba(245,243,250,0.9)" style={{ font: "700 64px var(--font-display), sans-serif" }}>
        Aa
      </text>
      <rect x={524} y={378} width="150" height="9" rx="4.5" fill={SOFT} />
      <rect x={524} y={396} width="120" height="7" rx="3.5" fill={SOFTER} />
      <rect x={524} y={410} width="136" height="7" rx="3.5" fill={SOFTER} />
    </>
  );
}

function Campaign({ id, accent }: { id: string; accent: string }) {
  return (
    <>
      <g transform="rotate(-9 230 260)">
        <rect x={120} y={80} width="220" height="320" rx="10" fill="#120f22" stroke={LINE} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={120} y={110 + i * 22} width="220" height="10" fill={accent} opacity={0.15 + i * 0.12} />
        ))}
        <text x={140} y={330} fill="#f5f3fa" style={{ font: "700 56px var(--font-display), sans-serif", letterSpacing: "-2px" }}>
          FORM
        </text>
        <rect x={140} y={352} width="90" height="7" rx="3.5" fill={SOFT} />
      </g>
      <g transform="rotate(4 520 250)">
        <rect x={400} y={60} width="240" height="350" rx="10" fill={`url(#${id}-accent)`} />
        <circle cx={520} cy={190} r="80" fill="none" stroke={INK} strokeWidth="18" />
        <circle cx={520} cy={190} r="36" fill={INK} />
        <text x={420} y={350} fill={INK} style={{ font: "700 46px var(--font-display), sans-serif", letterSpacing: "-1.5px" }}>
          SOUND
        </text>
        <rect x={420} y={370} width="120" height="8" rx="4" fill={INK} opacity="0.6" />
      </g>
      <g transform="rotate(-2 690 380)">
        <rect x={620} y={300} width="120" height="160" rx="10" fill="#f5f3fa" />
        <path d="M640 330h80M640 346h56" stroke={INK} strokeWidth="6" strokeLinecap="round" />
        <path d="M650 420l30-30 30 30" fill="none" stroke={accent} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </>
  );
}

function Seo({ id, accent }: { id: string; accent: string }) {
  return (
    <>
      <rect x={80} y={70} width="380" height="360" rx="16" fill={PANEL} stroke={LINE} />
      <rect x={104} y={96} width="332" height="40" rx="20" fill={PANEL_2} stroke={LINE} />
      <circle cx={128} cy={116} r="8" fill="none" stroke={SOFT} strokeWidth="2.5" />
      <path d="M134 122l6 6" stroke={SOFT} strokeWidth="2.5" strokeLinecap="round" />
      <rect x={148} y={112} width="150" height="8" rx="4" fill={SOFT} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            x={104}
            y={158 + i * 86}
            width="332"
            height="72"
            rx="12"
            fill={i === 0 ? "rgba(144,101,248,0.12)" : "transparent"}
            stroke={i === 0 ? accent : "transparent"}
            strokeOpacity="0.6"
          />
          <rect x={120} y={172 + i * 86} width="110" height="6" rx="3" fill={SOFT} />
          <rect x={120} y={186 + i * 86} width={230 - i * 30} height="12" rx="4" fill={i === 0 ? "#c9b6ff" : "rgba(245,243,250,0.6)"} />
          <rect x={120} y={206 + i * 86} width="280" height="6" rx="3" fill={SOFTER} />
          <rect x={120} y={218 + i * 86} width="220" height="6" rx="3" fill={SOFTER} />
        </g>
      ))}
      <rect x={490} y={120} width="240" height="260" rx="16" fill={PANEL} stroke={LINE} />
      <rect x={512} y={142} width="90" height="8" rx="4" fill={SOFT} />
      <rect x={512} y={160} width="120" height="18" rx="4" fill="rgba(245,243,250,0.85)" />
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={512} x2={708} y1={220 + i * 36} y2={220 + i * 36} stroke={LINE} />
      ))}
      <path d="M512 332 L548 318 L584 324 L620 290 L656 270 L692 236 L708 226 L708 340 L512 340Z" fill={accent} opacity="0.18" />
      <path d="M512 332 L548 318 L584 324 L620 290 L656 270 L692 236 L708 226" fill="none" stroke={`url(#${id}-accent)`} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={708} cy={226} r="6" fill="#e4d9ff" />
    </>
  );
}

const scenes = { site: Site, app: App, dashboard: Dashboard, brand: Brand, campaign: Campaign, seo: Seo } as const;

export function ProjectVisual({ kind, accent, title, className, uid }: Props) {
  const Scene = scenes[kind];
  const id = `pv-${(uid ?? kind).replace(/[^a-z0-9-]/gi, "")}`;
  return (
    <svg
      viewBox="0 0 800 500"
      className={className}
      role="img"
      aria-label={`Illustrated preview for ${title}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <Backdrop id={id} accent={accent} />
      <Scene id={id} accent={accent} />
    </svg>
  );
}

/** A simplified mobile screen of the same concept, for responsive showcases. */
export function ProjectPhoneVisual({ kind, accent, title, className }: Props) {
  const id = `pp-${kind}`;
  return (
    <svg viewBox="0 0 390 800" className={className} role="img" aria-label={`Mobile view illustration for ${title}`}>
      <defs>
        <linearGradient id={`${id}-a`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e4d9ff" />
          <stop offset="0.5" stopColor={accent} />
          <stop offset="1" stopColor="#4b25c2" />
        </linearGradient>
        <radialGradient id={`${id}-g`} cx="80%" cy="0%" r="90%">
          <stop offset="0" stopColor={accent} stopOpacity="0.35" />
          <stop offset="1" stopColor={INK} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="390" height="800" fill={INK} />
      <rect width="390" height="800" fill={`url(#${id}-g)`} />
      <rect x="24" y="56" width="64" height="10" rx="5" fill={SOFT} />
      <rect x="326" y="52" width="40" height="18" rx="9" fill={SOFTER} />
      <rect x="24" y="110" width="300" height="30" rx="6" fill="rgba(245,243,250,0.88)" />
      <rect x="24" y="150" width="220" height="30" rx="6" fill="rgba(245,243,250,0.88)" />
      <rect x="24" y="200" width="320" height="9" rx="4.5" fill={SOFT} />
      <rect x="24" y="218" width="260" height="9" rx="4.5" fill={SOFT} />
      <rect x="24" y="250" width="150" height="44" rx="22" fill={`url(#${id}-a)`} />
      <rect x="24" y="320" width="342" height="220" rx="18" fill={PANEL_2} />
      <rect x="24" y="320" width="342" height="220" rx="18" fill={`url(#${id}-a)`} opacity={kind === "brand" || kind === "campaign" ? 0.55 : 0.25} />
      {kind === "dashboard" || kind === "seo" ? (
        <path d="M48 500 L110 470 L170 480 L230 430 L290 410 L342 360" fill="none" stroke="#f5f3fa" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      ) : kind === "app" ? (
        <circle cx="195" cy="430" r="62" fill="none" stroke="#f5f3fa" strokeWidth="12" strokeDasharray="260 400" transform="rotate(-90 195 430)" strokeLinecap="round" />
      ) : (
        <circle cx="195" cy="430" r="58" fill="rgba(245,243,250,0.75)" />
      )}
      {[0, 1].map((i) => (
        <g key={i}>
          <rect x={24 + i * 177} y="564" width="165" height="150" rx="16" fill={PANEL_2} />
          <rect x={40 + i * 177} y="580" width="133" height="80" rx="10" fill={accent} opacity={0.2 + i * 0.15} />
          <rect x={40 + i * 177} y="676" width="90" height="8" rx="4" fill={SOFT} />
        </g>
      ))}
    </svg>
  );
}
