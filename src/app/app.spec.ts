import { describe } from 'mocha';
import { expect } from 'chai';
import { App } from './app';
import { SqliteDB } from '../sqlite-db/sqlite-db';

describe('App', () => {
    let appScr: App;
    let db: SqliteDB;

    beforeEach(() => {
        appScr = new App();
        db = new SqliteDB();
    });

    it('should init db', () => {
        expect(appScr.initDB()).to.instanceOf(Promise);
    });
});
