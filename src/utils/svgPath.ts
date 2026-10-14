// Transform an SVG path `d` string. Absolute coordinates are scaled by `s` and
// translated by (tx, ty); relative commands (lowercase) are scaled but not
// translated (their offsets live in the same scaled space). Handles the full
// set of SVG path commands.

const ARGC: Record<string, number> = {
  M: 2, m: 2, L: 2, l: 2, H: 1, h: 1, V: 1, v: 1,
  C: 6, c: 6, S: 4, s: 4, Q: 4, q: 4, T: 2, t: 2,
  A: 7, a: 7, Z: 0, z: 0,
};

const TOKEN_RE = /[a-zA-Z]|-?\d*\.?\d+(?:e[-+]?\d+)?/g;

function transformArgs(cmd: string, args: number[], s: number, tx: number, ty: number): number[] {
  const abs = cmd === cmd.toUpperCase();
  const px = abs ? tx : 0;
  const py = abs ? ty : 0;
  const r = args.slice();
  switch (cmd.toLowerCase()) {
    case 'm': case 'l': case 't':
      r[0] = r[0] * s + px; r[1] = r[1] * s + py;
      break;
    case 'h':
      r[0] = r[0] * s + px;
      break;
    case 'v':
      r[0] = r[0] * s + py;
      break;
    case 'c':
      r[0] = r[0] * s + px; r[1] = r[1] * s + py;
      r[2] = r[2] * s + px; r[3] = r[3] * s + py;
      r[4] = r[4] * s + px; r[5] = r[5] * s + py;
      break;
    case 's': case 'q':
      r[0] = r[0] * s + px; r[1] = r[1] * s + py;
      r[2] = r[2] * s + px; r[3] = r[3] * s + py;
      break;
    case 'a':
      r[0] *= s; r[1] *= s; // rx, ry
      r[5] = r[5] * s + px; r[6] = r[6] * s + py; // x, y
      break;
  }
  return r;
}

export function transformPath(d: string, s: number, tx: number, ty: number): string {
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

    const parts = transformArgs(cmd, args, s, tx, ty).map((v) => Number(v.toFixed(4)));
    out += parts.join(' ');
    out += ' ';
  }

  return out.trim();
}

export function translatePath(d: string, dx: number, dy: number): string {
  return transformPath(d, 1, dx, dy);
}
