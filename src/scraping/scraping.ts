import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { ProductBDModel } from '../models/product-db.model';

export class ScrapingClass {
	/**
	 * Url request scraping
	 */
	URL = "https://www.amazon.com.mx/gp/bestsellers/?ref_=nav_cs_bestsellers";
	/**
	 * get data scraping
	 */
	getData = async () => {
		const data = await this.getRawData();
		const $ = cheerio.load(data);
		const result: ProductBDModel[] = [];
		$('div.zg_homeWidget').each((i, el) => {
			const category = $('h3', el).text();
			$(el).find('.zg_homeWidgetItem').each((i, elP) => {
				const classParent = '.p13n-asin';
				const idComplete = $(`${classParent} > .a-link-normal`, elP).attr('href')?.split('/');
				const ratingValue = $('.a-icon-row a.a-link-normal', elP).attr('title')?.split(' ');
				result.push({
					category,
					author: $(`${classParent} div.a-row .a-size-small`, elP).text() || '',
					id: idComplete && idComplete.length >= 3 ? idComplete[3] : '',
					name: $(`${classParent} > a > div`, elP).text().trim(),
					coverImage: $('.a-spacing-mini img.a-dynamic-image', elP).attr('src') || '',
					ratingValue: ratingValue ? ratingValue[0] : '',
					ratingTotal: $('.a-icon-row a.a-size-small', elP).html() || ''
				});
			});
		});
		return result;
	};
	/**
	 * Get data request
	 */
	getRawData = () => {
		return fetch(this.URL)
			.then((response) => response.text())
			.then((data) => {
				return data;
			});
	};
}