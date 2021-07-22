import { ResultModel } from "../models/product.model";
import { ScrapingClass } from "../scraping/scraping";
import { SqliteDB } from "../sqlite-db/sqlite-db";
import { UtilsClass } from "../utils/utils";

export class App {
	db: SqliteDB;
	constructor() {
		this.db = new SqliteDB();
	}
	/**
	 * Create DB sqlite
	 */
	initDB = async () => {
		return await this.db.createTable();
	}
	/**
	 * Get data request, save products and build json return
	 * Try create table if not exist
	 */
	startScraping = async () => {
		try {
			await this.db.createTable();
		} catch (error) { };
		const scraping = new ScrapingClass();
		const data = await scraping.getData();
		const resultInsert = await this.db.insertProducts(data);
		return {
			insert: resultInsert,
			data: await this.getData()
		}
	}

	getData = async () => {
		const utils = new UtilsClass();
		const dataAllDB = await this.db.getAll();
		return utils.groupProducts(dataAllDB) as ResultModel[];
	}


}