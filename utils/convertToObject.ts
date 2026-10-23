export default function convertToSerializableObject<T extends object>(leanDocument: T): T {
  const record = leanDocument as Record<string, unknown>;

  for (const key of Object.keys(record)) {
    const value = record[key] as { toJSON?: unknown; toString?: () => string } | null | undefined;
    if (value && typeof value.toJSON === "function" && typeof value.toString === "function") {
      record[key] = value.toString();
    }
  }

  return leanDocument;
}
