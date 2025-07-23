import { SQLiteDatabase } from 'expo-sqlite';

type Migration = {
  version: number;
  up: (db: SQLiteDatabase) => Promise<void>;
};

export const migrations: Migration[] = [
  {
    version: 1,
    up: async (db) => {
      await db.execAsync(`
        CREATE TABLE circle (
          id TEXT PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          colour_hex TEXT NOT NULL
        );

        CREATE TABLE person (
          id TEXT PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          circle_id TEXT NOT NULL REFERENCES circle(id)
        );

        CREATE TABLE special_date_type (
          id TEXT PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          emoji TEXT NOT NULL
        );

        CREATE TABLE special_date (
          id TEXT PRIMARY KEY NOT NULL,
          person_id TEXT NOT NULL REFERENCES person(id),
          type_id TEXT NOT NULL REFERENCES special_date_type(id),
          month INTEGER NOT NULL,
          day INTEGER NOT NULL,
          year INTEGER
        );
      `);
    },
  },
];

function checkMigrations(): void {
  const versions = migrations.map(m => m.version);
  if (versions.some(v => !Number.isInteger(v) || v <= 0)) {
    throw new Error('Migration versions must be positive integers');
  }
  const uniqueVersions = new Set(versions);
  if (versions.length !== uniqueVersions.size) {
    throw new Error('Migration versions must be unique');
  }
  const maxVersion = Math.max(...versions);
  if (versions.length !== maxVersion) {
    throw new Error('Migration versions must be sequential starting from 1');
  }
}

export async function runMigrations(db: SQLiteDatabase) {
  // TODO: run only in development
  checkMigrations();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS _migrations (
      version INTEGER PRIMARY KEY,
      applied_at TEXT NOT NULL
    );
  `);

  const result = await db.getAllAsync<{ version: number }>(`
    SELECT MAX(version) as version FROM _migrations;
  `);
  const lastVersion = result?.[0]?.version ?? 0;

  const toRun = [...migrations].filter(m => m.version > lastVersion).sort((a, b) => a.version - b.version);
  console.log(`Migrations to run: ${toRun.length}`);

  for (const migration of toRun) {
    await db.withTransactionAsync(async () => {
      await migration.up(db);
      await db.runAsync(
        'INSERT INTO _migrations (version, applied_at) VALUES (?, ?);',
        [migration.version, new Date().toISOString()],
      );
    });
  }
}
