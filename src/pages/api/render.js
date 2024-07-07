import puppeteer from 'puppeteer';

export default async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle0' });

        const content = await page.content();

        const links = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(link => link.href);
        });

        const styles = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('style')).map(style => style.outerHTML).join('');
        });

        await browser.close();

        res.status(200).json({ content, links, styles });
    } catch (error) {
        console.error('Error rendering the URL:', error);
        res.status(500).json({ error: 'Error rendering the URL' });
    }
}