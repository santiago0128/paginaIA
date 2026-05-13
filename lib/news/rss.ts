export type NewsTopic = "ia" | "tecnologia" | "startups";

export type NewsItem = {
  id: string;
  title: string;
  url: string;
  source: string;
  publishedAt: string | null;
  excerpt: string;
  topic: NewsTopic;
};

const DAILY_NEWS_REVALIDATE_SECONDS = 60 * 60 * 24;
const DAILY_NEWS_WINDOW_MS = DAILY_NEWS_REVALIDATE_SECONDS * 1000;

type NewsFeed = {
  topic: NewsTopic;
  label: string;
  url: string;
};

const NEWS_FEEDS: NewsFeed[] = [
  {
    topic: "ia",
    label: "IA",
    url: googleNewsUrl("inteligencia artificial OR IA OR OpenAI OR ChatGPT OR Claude OR Gemini when:1d"),
  },
  {
    topic: "tecnologia",
    label: "Tecnología",
    url: googleNewsUrl("tecnología OR ciberseguridad OR chips OR software when:1d"),
  },
  {
    topic: "startups",
    label: "Startups",
    url: googleNewsUrl("startups tecnología OR venture capital OR empresas IA when:1d"),
  },
];

function googleNewsUrl(query: string): string {
  const params = new URLSearchParams({
    q: query,
    hl: "es-419",
    gl: "CO",
    ceid: "CO:es-419",
  });
  return `https://news.google.com/rss/search?${params.toString()}`;
}

function readTag(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match?.[1] ?? "";
}

function stripCdata(value: string): string {
  return value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1");
}

function decodeEntities(value: string): string {
  return stripCdata(value)
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([a-f0-9]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .trim();
}

function plainText(value: string): string {
  return decodeEntities(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function readSource(xml: string, fallback: string): string {
  const source = plainText(readTag(xml, "source"));
  return source || fallback;
}

function readLink(xml: string): string {
  return decodeEntities(readTag(xml, "link"));
}

function parseDate(value: string): string | null {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function parseItems(xml: string, feed: NewsFeed): NewsItem[] {
  const items = xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? [];

  return items.map((item) => {
    const title = plainText(readTag(item, "title"));
    const url = readLink(item);
    const publishedAt = parseDate(readTag(item, "pubDate"));
    const excerpt = plainText(readTag(item, "description"));
    const source = readSource(item, feed.label);

    return {
      id: `${feed.topic}:${url || title}`,
      title,
      url,
      source,
      publishedAt,
      excerpt,
      topic: feed.topic,
    };
  }).filter((item) => item.title && item.url);
}

function isRecentDailyItem(item: NewsItem): boolean {
  if (!item.publishedAt) return true;
  const publishedTime = new Date(item.publishedAt).getTime();
  return Date.now() - publishedTime <= DAILY_NEWS_WINDOW_MS;
}

async function fetchFeed(feed: NewsFeed): Promise<NewsItem[]> {
  const response = await fetch(feed.url, {
    headers: {
      "User-Agent": "Noxis/1.0",
    },
    next: { revalidate: DAILY_NEWS_REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) return [];

  const xml = await response.text();
  return parseItems(xml, feed);
}

function uniqueByUrl(items: NewsItem[]): NewsItem[] {
  const seen = new Set<string>();
  const unique: NewsItem[] = [];

  for (const item of items) {
    if (seen.has(item.url)) continue;
    seen.add(item.url);
    unique.push(item);
  }

  return unique;
}

export async function getDailyNews(limit = 36): Promise<NewsItem[]> {
  const results = await Promise.allSettled(NEWS_FEEDS.map((feed) => fetchFeed(feed)));
  const items = results.flatMap((result) => (result.status === "fulfilled" ? result.value : []));

  return uniqueByUrl(items)
    .filter(isRecentDailyItem)
    .sort((a, b) => {
      const left = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const right = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return right - left;
    })
    .slice(0, limit);
}
