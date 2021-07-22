import { describe } from 'mocha';
import { expect } from 'chai';
import { ScrapingClass } from './scraping';

describe('ScrapingClass', () => {
    let scraping: ScrapingClass;

    beforeEach(() => {
        scraping = new ScrapingClass();
    });

    it('should be url equal AWS', () => {
        expect(scraping.URL).to.eq("https://www.amazon.com.mx/gp/bestsellers/?ref_=nav_cs_bestsellers");
    });

    it('Should be get data', async () => {
        const data = await scraping.getData();
        expect(data.length > 0).to.eq(true);
    });
});
