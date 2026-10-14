// Translate an SVG path `d` string by (dx, dy). Only absolute coordinates are
// shifted; relative commands (lowercase) keep their offsets. Handles the full
// set of SVG path commands.

const ARGC: Record<string, number> = {
  M: 2, m: 2, L: 2, l: 2, H: 1, h: 1, V: 1, v: 1,
  C: 6, c: 6, S: 4, s: 4, Q: 4, q: 4, T: 2, t: 2,
  A: 7, a: 7, Z: 0, z: 0,
};

const TOKEN_RE = /[a-zA-Z]|-?\d*\.?\d+(?:e[-+]?\d+)?/g;

function shiftArgs(cmd: string, args: number[], dx: number, dy: number): number[] {
  if (cmd !== cmd.toUpperCase()) return args; // relative → no shift
  const s = args.slice();
  switch (cmd.toLowerCase()) {
    case 'm': case 'l': case 't':
      s[0] += dx; s[1] += dy;
      break;
    case 'h':
      s[0] += dx;
      break;
    case 'v':
      s[0] += dy;
      break;
    case 'c':
      s[0] += dx; s[1] += dy; s[2] += dx; s[3] += dy; s[4] += dx; s[5] += dy;
      break;
    case 's': case 'q':
      s[0] += dx; s[1] += dy; s[2] += dx; s[3] += dy;
      break;
    case 'a':
      // rx ry x-axis-rotation large-arc-flag sweep-flag x y → shift only x,y
      s[5] += dx; s[6] += dy;
      break;
  }
  return s;
}

export function translatePath(d: string, dx: number, dy: number): string {
  const tokens = d.match(TOKEN_RE);
  if (!tokens) return d;

  let out = '';
  let cmd = '';
  let i = 0;

  while (i < tokens.length) {
    const tok = tokens[i];
    if (/[a-zA-Z]/.test(tok)) {
      cmd = tok;
      out += tok;
      i++;
      continue;
    }

    const n = ARGC[cmd] ?? 0;
    if (n === 0) { i++; continue; }

    const args: number[] = [];
    for (let k = 0; k < n && i < tokens.length; k++) {
      args.push(parseFloat(tokens[i]));
      i++;
    }

    const shifted = shiftArgs(cmd, args, dx, dy);
    const parts = shifted.map((v) => Number(v.toFixed(4)));
    out += parts.join(' ');
    out += ' ';
  }

  return out.trim();
}
