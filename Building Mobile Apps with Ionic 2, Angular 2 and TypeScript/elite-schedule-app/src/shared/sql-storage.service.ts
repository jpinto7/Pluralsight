import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';

@Injectable()
export class SqlStorage {
  private db: SQLite;

  constructor() {}

  getAll() {
    return this.db.executeSql('SELECT key, value FROM kv', []).then(data => {
      let results = [];
      for (let i = 0; i < data.rows.length; i++) {
        results.push(JSON.parse(data.rows.item(i).value));
      }
      return results;
    });
  }

  get(key: String) {
    return this.db.executeSql('select key, value from kv where key = ? limit 1', [key]).then(data => {
      if (data.rows.length > 0) {
        return JSON.parse(data.rows.item(0).value);
      }
    });
  }

  remove(key: String) {
    return this.db.executeSql('delete from kv where key = ?', [key]);
  }

  set(key: String, value: String) {
    return this.db.executeSql('insert or replace into kv(key, value) values (?, ?)', [key, value]).then(data => {
      if (data.rows.length > 0) {
        return JSON.parse(data.rows.item(0).value);
      }
    });
  }

  initializeDatabase() {
    this.db = new SQLite();
    return this.db.openDatabase({ name: 'data.db', location: 'default' }).then((db) => {
      return this.db.executeSql('CREATE TABLE IF NOT EXISTS kv (key text primary key, value text)', []);
    });
  }
}
