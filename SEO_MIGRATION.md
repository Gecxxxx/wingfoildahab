# SEO migration checklist

## URL mapping

| Old URL | New URL / action |
| --- | --- |
| `/` | `/` |
| `/en` | `/` (301) |
| `/ru` | `/ru/` |
| `/12` | `/ru/` (301) |
| `/equipment1` | `/equipment-ru/` (301) |
| `/equipment-en` | `/equipment/` (301) |
| `/equipment` | `/equipment/` |
| `/equipment-ru` | `/equipment-ru/` |
| `/organizers` | `/organizers/` |
| `/organizers-ru` | `/organizers-ru/` |
| `/page62420279.html` | `/organizers-ru/` (301) |
| `/wingfoil_courses` | `/ru/#classes-packages` (301) |
| `/why-bb-talkin` | Restored as a code-native article |
| `/why-bb-talkin-en` | Restored as a code-native article |
| `/history-of-wingfoil` | Restored as a code-native article |
| `/history-of-wingfoil-en` | Restored as a code-native article |
| `/wingfoil-racing-freestyle` | Restored as a code-native article |
| `/wingfoil-racing-freestyle-en` | Restored as a code-native article |
| `/wingfoil-for-beginners` | Restored as a code-native article |
| Two remaining article URLs | Temporarily removed; return 404 until rebuilt |
| Blank, test and unrelated pages | 404; do not include in sitemap |

## Domain cutover

1. Deploy this version and verify every sitemap URL on the Pages preview.
2. Add both `wingfoildahab.com` and `www.wingfoildahab.com` as Pages custom domains.
3. Change DNS only after Cloudflare reports both custom domains as active.
4. Add a Cloudflare Bulk Redirect from `wingfoildahab.pages.dev` to `https://wingfoildahab.com`, preserving path and query string.
5. Verify the production `robots.txt`, `sitemap.xml`, canonical URLs, language alternates and redirects.
6. Submit `https://wingfoildahab.com/sitemap.xml` in Google Search Console and Yandex Webmaster.
7. Keep all 301 redirects for at least one year and preferably permanently.
8. Monitor 404s, indexing and search traffic weekly for the first eight weeks.

Do not remove the old Tilda project until DNS, HTTPS, redirects, forms and the Telegram bot have all been verified on the custom domain.
