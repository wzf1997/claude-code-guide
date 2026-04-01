export interface SourceLineRange {
  start: number;
  end?: number;
}

export function githubUrlToRawUrl(url: string): string {
  const parsed = new URL(url);
  const parts = parsed.pathname.split('/').filter(Boolean);

  if (parts.length < 5 || parts[2] !== 'tree') {
    throw new Error('Unsupported GitHub source URL');
  }

  const [owner, repo, , branch, ...fileParts] = parts;

  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${fileParts.join('/')}`;
}

export function parseLineAnchor(hash: string): SourceLineRange | null {
  const match = hash.match(/^#L(\d+)(?:-L?(\d+))?$/);

  if (!match) {
    return null;
  }

  return {
    start: Number(match[1]),
    end: match[2] ? Number(match[2]) : undefined,
  };
}
