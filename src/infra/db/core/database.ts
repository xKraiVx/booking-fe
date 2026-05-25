import Dexie, { type Table } from "dexie";

export class Database extends Dexie {
  users!: Table<unknown>;

  constructor() {
    super("BookingDatabase");
    this.version(1).stores({
      users: "++id, email",
    });
  }
}
