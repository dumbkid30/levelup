// AmbitionBox Scraper - Updated
import { chromium, type Page } from "playwright";

export interface CompanyInsights {
    rating?: string;
    pros?: string[];
    cons?: string[];
    salaryInsights?: string;
    reviewUrl?: string;
    salaryUrl?: string;
    reviewsDetails?: ReviewSnippet[];
    salaryRows?: string[];
}

export interface ReviewSnippet {
    rating?: string;
    title?: string;
    likes?: string;
    dislikes?: string;
    location?: string;
    date?: string;
}

async function autoScroll(page: Page, steps: number = 3, distance: number = 1200, pauseMs: number = 800) {
    for (let i = 0; i < steps; i++) {
        await page.mouse.wheel(0, distance);
        await page.waitForTimeout(pauseMs);
    }
}

async function dismissCookieBanner(page: Page) {
    const selectors = [
        "#onetrust-accept-btn-handler",
        "button[aria-label=\"Accept\"]",
        "text=Accept All",
        "text=Accept",
        "text=I Agree",
        "text=Agree",
    ];

    for (const selector of selectors) {
        const button = await page.$(selector);
        if (button) {
            await button.click().catch(() => { });
            break;
        }
    }
}

function normalizeCompanySlug(companyName: string): string {
    return companyName
        .toLowerCase()
        .trim()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .replace(/--+/g, "-");
}

export function buildAmbitionBoxLinks(companyName: string): {
    slug: string;
    reviewUrl: string;
    salaryUrl: string;
} {
    const slug = normalizeCompanySlug(companyName);
    return {
        slug,
        reviewUrl: `https://www.ambitionbox.com/reviews/${slug}-reviews`,
        salaryUrl: `https://www.ambitionbox.com/salaries/${slug}-salaries`,
    };
}

function deriveSalaryUrl(reviewUrl: string, fallbackSlug?: string): string {
    const cleanUrl = reviewUrl.split("?")[0].replace(/\/$/, "");
    const match = cleanUrl.match(/\/reviews\/([^/]+)$/);
    if (match) {
        const slug = match[1].replace(/-reviews$/, "");
        if (slug) {
            return `https://www.ambitionbox.com/salaries/${slug}-salaries`;
        }
    }
    if (fallbackSlug) {
        return `https://www.ambitionbox.com/salaries/${fallbackSlug}-salaries`;
    }
    if (cleanUrl.includes("/reviews/")) {
        return cleanUrl.replace("/reviews/", "/salaries/");
    }
    return `${cleanUrl}/salaries`;
}

export async function scrapeAmbitionBox(companyName: string): Promise<CompanyInsights | null> {
    let browser;
    try {
        browser = await chromium.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-blink-features=AutomationControlled"]
        });
        const context = await browser.newContext({
            userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            viewport: { width: 1280, height: 720 },
            extraHTTPHeaders: {
                "Accept-Language": "en-US,en;q=0.9",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                "Referer": "https://www.google.com/",
                "Upgrade-Insecure-Requests": "1",
                "Sec-Ch-Ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
                "Sec-Ch-Ua-Mobile": "?0",
                "Sec-Ch-Ua-Platform": "\"Windows\"",
            }
        });
        await context.addInitScript(() => {
            const safeDefine = (target: any, key: string, value: any) => {
                try {
                    Object.defineProperty(target, key, { get: () => value });
                } catch {
                    // ignore if property is not configurable
                }
            };

            safeDefine(navigator, "webdriver", undefined);
            safeDefine(navigator, "languages", ["en-US", "en"]);
            safeDefine(navigator, "platform", "Win32");
            safeDefine(navigator, "plugins", [1, 2, 3, 4, 5]);
            safeDefine(window, "chrome", { runtime: {} });
        });
        const page = await context.newPage();

        // 1. Try direct AmbitionBox slugs first
        const { slug, reviewUrl: directReviewUrl } = buildAmbitionBoxLinks(companyName);
        console.log(`[AmbitionBox Scraper] Generated slug: ${slug}`);

        const candidateReviewUrls = [
            directReviewUrl,
            `https://www.ambitionbox.com/reviews/${slug}`,
        ];

        let url: string | null = null;
        for (const candidate of candidateReviewUrls) {
            try {
                const res = await page.goto(candidate, { waitUntil: "domcontentloaded", timeout: 8000 });
                const status = res?.status();
                const title = await page.title();
                const finalUrl = page.url();
                console.log(`[AmbitionBox Scraper] Candidate: ${candidate} | Status: ${status} | Title: ${title}`);

                if (status === 403) {
                    console.warn(`[AmbitionBox Scraper] Blocked (403) visiting ${candidate}`);
                    continue;
                }

                if (status && status < 400 && title && !/Page Not Found|404|error/i.test(title)) {
                    url = finalUrl || candidate;
                    break;
                }
            } catch (_e) {
                console.log(`[AmbitionBox Scraper] Error visiting ${candidate}: ${_e}`);
            }
        }

        // 2. Fallback: search Google
        if (!url) {
            console.log(`[AmbitionBox Scraper] Searching Google for: ${companyName}`);
            try {
                const searchUrl = `https://www.google.com/search?q=${encodeURIComponent("site:ambitionbox.com " + companyName + " reviews")}`;
                await page.goto(searchUrl, { waitUntil: "domcontentloaded", timeout: 10000 });

                const linkSelector = "a[href*=\"ambitionbox.com/reviews\"]";
                await page.waitForSelector(linkSelector, { timeout: 5000 });

                const hrefs = await page.$$eval(linkSelector, (els) => els.map(el => (el as HTMLAnchorElement).href));
                url = hrefs.find(h => !h.includes("google.com/url")) || null;

            } catch (e) {
                console.log("[AmbitionBox Scraper] No AmbitionBox link found via Google search.");
            }
        }

        if (!url) {
            console.log("[AmbitionBox Scraper] Could not determine company URL.");
            return null;
        }

        console.log(`[AmbitionBox Scraper] Final Target URL: ${url}`);

        // 3. Visit the AmbitionBox reviews page
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });

        // Give the SPA some time to fetch and render dynamic content
        try {
            await page.waitForLoadState("networkidle", { timeout: 10000 });
        } catch {
            // ignore; we'll still try to scrape whatever is available
        }
        await dismissCookieBanner(page);
        await autoScroll(page);

        // Wait for key content to ensure page is loaded
        try {
            await page.waitForSelector(".company-info, .rating-val, h1, h2", { timeout: 8000 });
        } catch (_e) {
            console.log("Wait for selector failed, proceeding anyway...");
        }
        await page
            .waitForSelector(".review-card, .ab-review-card, .review-item, [itemprop=\"review\"]", { timeout: 8000 })
            .catch(() => { });

        // 4. Extract Data
        const finalReviewUrl = page.url() || url;
        const salaryUrl = deriveSalaryUrl(finalReviewUrl, slug);
        const data: CompanyInsights = { reviewUrl: finalReviewUrl, salaryUrl };

        // Rating
        try {
            // Prefer the overall rating that AmbitionBox puts in the page title
            // e.g. "Hyperpure Reviews ... | Rated 3.6/5 | AmbitionBox"
            try {
                const title = await page.title();
                const match = title.match(/(\d\.\d)\s*\/\s*5/);
                if (match) {
                    data.rating = match[1];
                }
            } catch {
                // ignore
            }

            // Fallback: look for rating elements on the page
            if (!data.rating) {
                const ratingSelectors = [
                    ".company-info .rating-val",
                    ".company-info__rating",
                    ".company-header .avg-rating",
                    "span.rating-val",
                    "div.rating-val",
                    "span.avg-rating",
                    "meta[itemprop=\"ratingValue\"]",
                ];

                for (const sel of ratingSelectors) {
                    const el = await page.$(sel);
                    if (el) {
                        const text = sel.startsWith("meta")
                            ? await el.getAttribute("content")
                            : await el.innerText();
                        const cleaned = (text || "").trim();
                        // Rating should be a decimal between 1.0 and 5.0 (usually 3.0-4.8)
                        if (cleaned && /^[1-5](\.\d+)?$/.test(cleaned) && parseFloat(cleaned) >= 1 && parseFloat(cleaned) <= 5) {
                            data.rating = cleaned;
                            break;
                        }
                    }
                }
            }
        } catch (_e) {
            console.log("Failed to extract rating");
        }

        // Pros / Cons
        try {
            const result = await page.evaluate(() => {
                const JUNK_KEYWORDS = [
                    "80 Lakh+",
                    "4 Crore+",
                    "10 Lakh+",
                    "1.5 Crore+",
                    "Users",
                    "Reviews",
                    "Salaries",
                    "Interviews",
                ];

                const isJunk = (text: string) => {
                    const t = text.toLowerCase();
                    // Filter out obvious global counters and marketing text
                    const simpleCounterRegex = /^\s*\d+(?:\.\d+)?\s*(lakh|lakhs|crore|crores)\+\s*$/i;
                    if (simpleCounterRegex.test(t)) return true;
                    return JUNK_KEYWORDS.some((k) => t.includes(k.toLowerCase()));
                };

                const getItems = (type: string) => {
                    const sections = Array.from(
                        document.querySelectorAll(
                            "div.content-wrapper, div.review-content, div.ab-chip-container, .card, .pros-cons"
                        )
                    );
                    const validPoints: string[] = [];

                    sections.forEach((sec) => {
                        const text = sec.textContent?.toLowerCase() || "";
                        if (
                            (type === "pros" && (text.includes("pros") || text.includes("likes"))) ||
                            (type === "cons" && (text.includes("cons") || text.includes("dislikes")))
                        ) {
                            const chips = Array.from(
                                sec.querySelectorAll(
                                    ".ab-chip, li, span.body-small, p.description, .chip, .point"
                                )
                            );
                            chips.forEach((c) => {
                                const content = c.textContent?.trim() || "";
                                if (content && !isJunk(content)) validPoints.push(content);
                            });
                        }
                    });

                    return [...new Set(validPoints)]
                        .filter(
                            (t) =>
                                t.length > 5 &&
                                t.length < 150 &&
                                !/Pros|Cons|Likes|Dislikes/i.test(t)
                        )
                        .slice(0, 5);
                };

                return {
                    pros: getItems("pros"),
                    cons: getItems("cons"),
                };
            });

            if (result.pros?.length) data.pros = result.pros;
            if (result.cons?.length) data.cons = result.cons;
        } catch (_e) {
            console.log("Failed to extract pros/cons");
        }

        // Detailed review snippets
        try {
            const snippets = await page.evaluate(() => {
                type Snippet = { rating?: string; title?: string; likes?: string };
                const results: Snippet[] = [];
                const seen = new Set<string>();
                const snippetLimit = 3;

                const pushSnippet = (rating?: string, title?: string, body?: string) => {
                    const cleanedBody = (body || "").replace(/\s+/g, " ").trim();
                    if (!cleanedBody) return;
                    const trimmedTitle = (title || "Review").trim();
                    const trimmedRating = (rating || "").toString().trim();
                    const key = `${trimmedRating}|${trimmedTitle}|${cleanedBody.slice(0, 80)}`;
                    if (seen.has(key)) return;
                    seen.add(key);
                    results.push({
                        rating: trimmedRating || undefined,
                        title: trimmedTitle || undefined,
                        likes: cleanedBody.length > 150 ? `${cleanedBody.slice(0, 150)}...` : cleanedBody,
                    });
                };

                const cards = Array.from(
                    document.querySelectorAll(
                        ".review-card, .ab-review-card, .review-item, div[itemprop=\"review\"]"
                    )
                );
                cards.slice(0, snippetLimit).forEach((card) => {
                    const rating = card
                        .querySelector(
                            ".rating-val, .avg-rating, span[class*=\"rating\"], div[class*=\"rating\"]"
                        )
                        ?.textContent?.trim();
                    const title = card
                        .querySelector(
                            ".review-title, h2, h3, .bold-title-m"
                        )
                        ?.textContent?.trim();
                    const body = card
                        .querySelector(
                            ".review-description, .description, .review-body, .body-small, .review-text"
                        )
                        ?.textContent?.trim();

                    pushSnippet(rating || undefined, title || undefined, body || undefined);
                });

                if (results.length < snippetLimit) {
                    const parseJson = (text: string) => {
                        try {
                            return JSON.parse(text);
                        } catch {
                            return null;
                        }
                    };

                    const jsonItems: any[] = [];
                    const scripts = Array.from(document.querySelectorAll("script[type=\"application/ld+json\"]"));

                    scripts.forEach((script) => {
                        const data = parseJson(script.textContent || "");
                        if (!data) return;
                        if (Array.isArray(data)) {
                            jsonItems.push(...data);
                        } else if (data["@graph"]) {
                            jsonItems.push(...data["@graph"]);
                        } else {
                            jsonItems.push(data);
                        }
                    });

                    const reviewItems: any[] = [];
                    const collectReviews = (obj: any) => {
                        if (!obj || typeof obj !== "object") return;
                        const review = obj.review || obj.reviews;
                        if (review) {
                            if (Array.isArray(review)) {
                                reviewItems.push(...review);
                            } else {
                                reviewItems.push(review);
                            }
                        }
                        if (obj.itemReviewed) collectReviews(obj.itemReviewed);
                        if (Array.isArray(obj["@graph"])) {
                            obj["@graph"].forEach(collectReviews);
                        }
                    };

                    jsonItems.forEach(collectReviews);
                    for (const review of reviewItems) {
                        if (results.length >= snippetLimit) break;
                        const rating =
                            review?.reviewRating?.ratingValue ||
                            review?.reviewRating ||
                            review?.ratingValue ||
                            review?.rating;
                        const title = review?.name || review?.headline || review?.title;
                        const body = review?.reviewBody || review?.description || review?.reviewText;
                        pushSnippet(rating ? String(rating) : undefined, title, body);
                    }
                }

                return results;
            });
            if (snippets.length) data.reviewsDetails = snippets;
        } catch (_e) {
            console.log("Failed to extract reviews");
        }

        // Salary insights
        if (salaryUrl) {
            try {
                await page.goto(salaryUrl, { waitUntil: "domcontentloaded", timeout: 20000 });
                try {
                    await page.waitForLoadState("networkidle", { timeout: 10000 });
                } catch {
                    // ignore; attempt scrape with whatever is rendered
                }
                await dismissCookieBanner(page);
                await autoScroll(page);
                await page
                    .waitForSelector(".salary-card, .salary-row, main, .salary-list", { timeout: 8000 })
                    .catch(() => { });

                const salaryInfo = await page.evaluate(() => {
                    const JUNK_KEYWORDS = [
                        "80 Lakh+",
                        "4 Crore+",
                        "10 Lakh+",
                        "1.5 Crore+",
                        "Users",
                        "Reviews",
                        "Salaries",
                        "Interviews",
                        "Explore Salaries",
                        "AmbitionBox",
                    ];

                    const simpleCounterRegex = /^\s*\d+(?:\.\d+)?\s*(lakh|lakhs|crore|crores)\+\s*$/i;

                    const isJunk = (text: string) => {
                        const t = text.toLowerCase();
                        if (simpleCounterRegex.test(t)) return true;
                        // Be a bit less aggressive here: require multiple junk keywords
                        const count = JUNK_KEYWORDS.filter((k) =>
                            t.includes(k.toLowerCase())
                        ).length;
                        return count >= 2;
                    };

                    const salaryRegex = /(\u20B9|INR|LPA|Lakhs?|per annum|per year|per month)/i;

                    // Prioritize actual salary cards/rows
                    const containers = Array.from(document.querySelectorAll(".salary-card, .salary-row, .salary-detail-card, .salary-list-item"));
                    let candidates: string[] = [];

                    if (containers.length > 0) {
                        candidates = containers
                            .map((c) => c.textContent?.replace(/\s+/g, " ").trim())
                            .filter((t): t is string => Boolean(t) && !isJunk(t) && salaryRegex.test(t));
                    }

                    // Fallback to text scanning but with much stricter junk filtering
                    if (candidates.length === 0) {
                        candidates = Array.from(document.querySelectorAll("div, p, span, td"))
                            .map((el) => el.textContent?.replace(/\s+/g, " ").trim())
                            .filter((t): t is string => {
                                if (!t || t.length > 120 || t.length < 5) return false;
                                if (isJunk(t)) return false;
                                return salaryRegex.test(t) && /\d/.test(t);
                            });
                    }

                    // Script data fallback (JSON-LD / Next data)
                    if (candidates.length === 0) {
                        const fromScripts: string[] = [];
                        const seen = new Set<string>();
                        const maxNodes = 4000;
                        const maxStrings = 20;
                        let visited = 0;

                        const parseJson = (text: string) => {
                            try {
                                return JSON.parse(text);
                            } catch {
                                return null;
                            }
                        };

                        const collectStrings = (root: any) => {
                            const stack = [root];
                            while (stack.length && visited < maxNodes && fromScripts.length < maxStrings) {
                                const node = stack.pop();
                                visited += 1;
                                if (typeof node === "string") {
                                    const text = node.replace(/\s+/g, " ").trim();
                                    if (
                                        text &&
                                        text.length < 120 &&
                                        salaryRegex.test(text) &&
                                        /\d/.test(text) &&
                                        !isJunk(text) &&
                                        !seen.has(text)
                                    ) {
                                        seen.add(text);
                                        fromScripts.push(text);
                                    }
                                    continue;
                                }
                                if (Array.isArray(node)) {
                                    for (const item of node) stack.push(item);
                                    continue;
                                }
                                if (node && typeof node === "object") {
                                    for (const value of Object.values(node)) stack.push(value);
                                }
                            }
                        };

                        const nextDataText = document.querySelector("#__NEXT_DATA__")?.textContent;
                        if (nextDataText) {
                            const parsed = parseJson(nextDataText);
                            if (parsed) collectStrings(parsed);
                        }

                        const ldScripts = Array.from(document.querySelectorAll("script[type=\"application/ld+json\"]"));
                        for (const script of ldScripts) {
                            const parsed = parseJson(script.textContent || "");
                            if (!parsed) continue;
                            if (Array.isArray(parsed)) {
                                parsed.forEach(collectStrings);
                            } else if (parsed["@graph"]) {
                                parsed["@graph"].forEach(collectStrings);
                            } else {
                                collectStrings(parsed);
                            }
                        }

                        candidates = fromScripts;
                    }

                    const ranges = [...new Set(candidates)].slice(0, 12);
                    const highlight =
                        ranges.find((r) => /(average|avg|median|typical|range)/i.test(r)) || ranges[0] || "";

                    return {
                        salaryRows: ranges.slice(0, 10),
                        highlight
                    };
                });

                if (salaryInfo.salaryRows?.length) {
                    // Final safety check on results
                    data.salaryRows = salaryInfo.salaryRows.filter(
                        (r) => !/Reviews|Salaries|Interviews|Users/i.test(r)
                    );
                    data.salaryInsights = salaryInfo.highlight;

                    // If highlight was filtered out, pick another one
                    if (!data.salaryInsights && data.salaryRows.length > 0) {
                        data.salaryInsights = data.salaryRows[0];
                    }
                }

            } catch (_e) {
                console.log("Failed to extract salary");
            }
        }

        console.log(
            "[AmbitionBox Scraper] Extracted counts => rating:",
            data.rating,
            "pros:",
            data.pros?.length || 0,
            "cons:",
            data.cons?.length || 0,
            "review snippets:",
            data.reviewsDetails?.length || 0,
            "salary rows:",
            data.salaryRows?.length || 0
        );

        return data;

    } catch (error) {
        console.error("[AmbitionBox Scraper] Setup Error:", error);
        return null;
    } finally {
        if (browser) await browser.close();
    }
}
