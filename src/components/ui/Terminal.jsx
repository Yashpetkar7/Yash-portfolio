import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  aboutContent,
  contactContent,
  educationData,
  experienceData,
  featuredProjectData,
  footerContent,
  heroContent,
  projectsData,
  skillsData,
  socialLinks,
} from '../../data/portfolioData';

const LAB_URL = 'https://yash-portfolio-lab.vercel.app/';
const PROMPT = 'yash@portfolio:~$';

const BANNER = [
  { t: 'ok', s: 'YASH.OS v2.6 — portfolio shell' },
  { t: 'dim', s: `© ${new Date().getFullYear()} ${heroContent.fullName} · ${heroContent.role}` },
  { t: 'txt', s: "Type 'help' to list commands. Tab completes, ↑ recalls." },
];

function line(t, s) {
  return { t, s };
}

function getSocial(label) {
  const item = socialLinks.find((s) => s.label.toLowerCase() === label);
  return item ? item.href : null;
}

const COMMANDS = {
  help: () => [
    line('ok', 'AVAILABLE COMMANDS'),
    line('txt', '  about        who is yash'),
    line('txt', '  projects     selected work'),
    line('txt', '  skills       what he works with'),
    line('txt', '  stack        the full tech stack'),
    line('txt', '  experience   career history'),
    line('txt', '  education    academic background'),
    line('txt', '  status       availability + local time'),
    line('txt', '  contact      email / phone / location'),
    line('txt', '  resume       open the resume'),
    line('txt', '  lab          open the 3D lab site'),
    line('txt', '  github       open GitHub'),
    line('txt', '  linkedin     open LinkedIn'),
    line('txt', '  banner       reprint the banner'),
    line('txt', '  clear        clear the screen'),
    line('txt', '  exit         close the terminal'),
    line('dim', "  …and at least one command HR doesn't know about."),
  ],
  about: () => [
    line('ok', `${heroContent.fullName} — ${heroContent.role}`),
    line('txt', aboutContent.description),
  ],
  whoami: () => COMMANDS.about(),
  projects: () => [
    line('ok', `★ ${featuredProjectData.name}`),
    line('txt', `  ${featuredProjectData.description}`),
    line('dim', `  [${featuredProjectData.tech.join(', ')}]`),
    ...projectsData.flatMap((p) => [
      line('ok', `• ${p.name}`),
      line('txt', `  ${p.description}`),
      line('dim', `  [${p.tech.join(', ')}]`),
    ]),
  ],
  skills: () =>
    skillsData.flatMap((s) => [
      line('ok', `• ${s.label}`),
      line('dim', `  ${s.description}`),
    ]),
  stack: () =>
    skillsData.flatMap((s) => [
      line('ok', `${s.label}`),
      line('txt', `  ${s.icons.map((i) => i.name).join(' · ')}`),
    ]),
  tech: () => COMMANDS.stack(),
  experience: () =>
    experienceData.flatMap((e) => [
      line('ok', `${e.year} — ${e.endYear} · ${e.title}`),
      line('dim', `  ${e.company}`),
      line('txt', `  ${e.description}`),
    ]),
  work: () => COMMANDS.experience(),
  education: () =>
    educationData.flatMap((e) => [
      line('ok', `${e.year} — ${e.endYear} · ${e.title}`),
      line('dim', `  ${e.company}`),
      line('txt', `  ${e.description}`),
    ]),
  edu: () => COMMANDS.education(),
  status: () => {
    const fmt = (tz) =>
      new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit' }).format(new Date());
    return [
      line('ok', '● OPEN TO AI · DATA & PRODUCT STRATEGY ROLES'),
      line('txt', `  ${contactContent.location}`),
      line('dim', `  DXB ${fmt('Asia/Dubai')} · BOM ${fmt('Asia/Kolkata')}`),
    ];
  },
  contact: () => [
    line('ok', 'CONTACT'),
    line('txt', `  email     ${contactContent.email}`),
    line('txt', `  phone     ${contactContent.phone}`),
    line('txt', `  location  ${contactContent.location}`),
    line('dim', "  type 'email' to open your mail client"),
  ],
  email: () => {
    window.location.href = `mailto:${contactContent.email}`;
    return [line('ok', `opening mail → ${contactContent.email}`)];
  },
  resume: () => {
    window.open(footerContent.resume, '_blank', 'noopener');
    return [line('ok', 'opening resume ↗')];
  },
  cv: () => COMMANDS.resume(),
  lab: () => {
    window.open(LAB_URL, '_blank', 'noopener');
    return [line('ok', 'entering the lab ↗')];
  },
  github: () => {
    const url = getSocial('github');
    if (url) window.open(url, '_blank', 'noopener');
    return [line('ok', `github ↗ ${url || 'not found'}`)];
  },
  linkedin: () => {
    const url = getSocial('linkedin');
    if (url) window.open(url, '_blank', 'noopener');
    return [line('ok', `linkedin ↗ ${url || 'not found'}`)];
  },
  banner: () => BANNER,
  ls: () => [line('txt', 'about  projects  skills  experience  education  contact  lab')],
  pwd: () => [line('txt', '/home/yash/portfolio')],
  date: () => [line('txt', new Date().toString())],
};

const COMMAND_NAMES = [...Object.keys(COMMANDS), 'sudo hire-me', 'clear', 'exit'];

export default function Terminal({ disabled = false }) {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState(BANNER);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const hireTimers = useRef([]);

  // Global shortcuts: "/" or "`" opens (outside form fields), Escape closes
  useEffect(() => {
    const onKey = (e) => {
      if (disabled) return;
      const tag = (e.target.tagName || '').toLowerCase();
      const typing = tag === 'input' || tag === 'textarea' || e.target.isContentEditable;
      if (!open && !typing && (e.key === '/' || e.key === '`')) {
        e.preventDefault();
        setOpen(true);
      } else if (open && e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, disabled]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    else {
      hireTimers.current.forEach(clearTimeout);
      hireTimers.current = [];
    }
  }, [open]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, open]);

  const append = useCallback((newLines) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  const runHireMe = useCallback(() => {
    const steps = [
      [200, line('dim', 'requesting elevated privileges… granted.')],
      [700, line('txt', 'scanning candidate: yash_petkar')],
      [1300, line('txt', '  ✓ ships real systems (LLM dashboards, full-stack, ops)')],
      [1800, line('txt', '  ✓ co-founded + bootstrapped a startup')],
      [2300, line('txt', '  ✓ AI in Business @ SP Jain, Dubai')],
      [2900, line('ok', 'VERDICT: HIRE. opening mail client…')],
    ];
    steps.forEach(([delay, l]) => {
      hireTimers.current.push(setTimeout(() => append([l]), delay));
    });
    hireTimers.current.push(
      setTimeout(() => {
        window.location.href = `mailto:${contactContent.email}?subject=Let's talk`;
      }, 3600),
    );
  }, [append]);

  const execute = useCallback(
    (raw) => {
      const cmd = raw.trim();
      if (!cmd) return;
      setCmdHistory((prev) => [cmd, ...prev].slice(0, 50));
      setHistoryIdx(-1);

      const echo = line('cmd', cmd);
      const lower = cmd.toLowerCase();

      if (lower === 'clear' || lower === 'cls') {
        setLines([]);
        return;
      }
      if (lower === 'exit' || lower === 'quit') {
        setOpen(false);
        return;
      }
      if (lower === 'sudo hire-me' || lower === 'hire-me' || lower === 'sudo hire me') {
        append([echo]);
        runHireMe();
        return;
      }
      const handler = COMMANDS[lower];
      if (handler) {
        append([echo, ...handler()]);
      } else {
        append([echo, line('err', `command not found: ${cmd} — try 'help'`)]);
      }
    },
    [append, runHireMe],
  );

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
    } else if (e.key === 'Enter') {
      execute(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, cmdHistory.length - 1);
      if (cmdHistory[next]) {
        setHistoryIdx(next);
        setInput(cmdHistory[next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = historyIdx - 1;
      setHistoryIdx(next);
      setInput(next >= 0 ? cmdHistory[next] : '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = COMMAND_NAMES.find((c) => c.startsWith(input.toLowerCase()) && c !== input.toLowerCase());
      if (match) setInput(match);
    }
  };

  const toneClass = {
    cmd: 'text-on-surface',
    ok: 'text-primary',
    dim: 'text-on-surface-variant/60',
    err: 'text-error',
    txt: 'text-on-surface-variant',
  };

  return (
    <>
      {/* Launcher (all viewports; the only way in on touch) */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open terminal"
          className="fixed bottom-6 left-6 z-30 font-mono text-[10px] tracking-[0.2em] uppercase text-primary border border-primary/40 bg-surface/80 backdrop-blur px-3 py-2 hover:bg-primary hover:text-black transition-colors duration-200"
        >
          &gt;_ terminal
        </button>
      )}

      <AnimatePresence>
        {open ? (
          <motion.div
            key="terminal-backdrop"
            className="fixed inset-0 z-[890] bg-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        ) : null}
        {open ? (
          <motion.div
            key="terminal"
            role="dialog"
            aria-label="Portfolio terminal"
            // Centering lives on this static wrapper; framer only animates the inner
            // panel — framer owns `transform`, so Tailwind translate classes get wiped
            className="fixed inset-x-3 bottom-3 md:inset-x-0 md:bottom-8 z-[900] md:flex md:justify-center pointer-events-none"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pointer-events-auto w-full md:w-[720px] max-w-full border border-primary/30 bg-black/90 backdrop-blur-xl shadow-[0_0_60px_rgba(184,253,75,0.08)]">
              {/* Title bar */}
              <div className="flex items-center justify-between pl-4 border-b border-primary/20">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary">yash.os — shell</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close terminal"
                  className="font-mono text-sm text-on-surface-variant hover:text-primary hover:bg-primary/10 px-4 py-2.5"
                >
                  ✕
                </button>
              </div>

              {/* Output */}
              <div
                ref={scrollRef}
                data-lenis-prevent
                className="h-[46vh] md:h-80 overflow-y-auto px-4 py-3 font-mono text-[12px] md:text-[13px] leading-relaxed"
                onClick={() => inputRef.current?.focus()}
              >
                {lines.map((l, i) =>
                  l.t === 'cmd' ? (
                    <div key={i} className="mt-2">
                      <span className="text-primary">{PROMPT}</span>{' '}
                      <span className="text-on-surface">{l.s}</span>
                    </div>
                  ) : (
                    <div key={i} className={`whitespace-pre-wrap ${toneClass[l.t] || toneClass.txt}`}>{l.s}</div>
                  ),
                )}

                {/* Prompt */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-primary shrink-0">{PROMPT}</span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    spellCheck={false}
                    autoCapitalize="off"
                    autoComplete="off"
                    aria-label="Terminal command input"
                    className="flex-1 bg-transparent outline-none border-none text-on-surface min-w-0"
                    style={{ caretColor: '#b8fd4b' }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
