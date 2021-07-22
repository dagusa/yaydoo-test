import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { ProductBDModel } from '../models/product-db.model';

export class SqliteDB {

	table = 'tbl6';
	/**
	 * Open conection sqlite
	 */
	connect = async () => {
		return await open({
			filename: '/tmp/database.db',
			driver: sqlite3.Database
		});
	}
	/**
	 * Create table with this.table name
	 */
	createTable = async () => {
		console.log('Creating table:', this.table)
		const db = await this.connect();
		return await db.exec(`CREATE TABLE ${this.table} (
			id TEXT primary key not null,
			category TEXT,
			author TEXT,
			name TEXT,
			coverImage TEXT,
			ratingValue TEXT,
			ratingTotal TEXT
		)`);
	}
	/**
	 * try insert all products in array
	 * @param data array products
	 */
	insertProducts = async (data: Array<ProductBDModel>) => {
		const errorInsert: string[] = [];
		const inserted: string[] = [];
		data.forEach(async product => {
			try {
				await this.insertProduct(product);
				inserted.push(product.id);
			} catch (err) {
				errorInsert.push(product.id);
			}
		});
		return {
			inserted,
			errorInsert,
			insertedCount: inserted.length,
			errorCount: errorInsert.length
		}
	}
	/**
	 * insert one product
	 * @param product data product for db
	 */
	insertProduct = async (product: ProductBDModel) => {
		const arrayInsert = [
			product.category,
			product.author,
			product.id,
			product.name,
			product.coverImage,
			product.ratingValue,
			product.ratingTotal,
		]
		const db = await this.connect();
		await db.run(`INSERT INTO ${this.table}(category, author, id, name, coverImage, ratingValue, ratingTotal) VALUES (?, ?, ?, ?, ?, ?, ?)`, arrayInsert);
		return true
	}
	/**
	 * Get all products in DB
	 */
	getAll = async () => {
		const db = await this.connect();
		const result = await db.all(`SELECT * FROM ${this.table}`);
		return result;
	}
}