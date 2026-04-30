import {
  db,
  qualityAreasTable,
  standardsTable,
  strategiesTable,
} from "@workspace/db";
import { SEED_QUALITY_AREAS } from "./seedData";

export async function seedIfEmpty(): Promise<void> {
  const existing = await db.select().from(qualityAreasTable).limit(1);
  if (existing.length > 0) {
    return;
  }

  for (const [areaIndex, qa] of SEED_QUALITY_AREAS.entries()) {
    const [insertedArea] = await db
      .insert(qualityAreasTable)
      .values({
        code: qa.code,
        title: qa.title,
        tagline: qa.tagline,
        description: qa.description,
        sortOrder: areaIndex,
      })
      .returning();

    if (!insertedArea) {
      throw new Error(`Failed to insert quality area ${qa.code}`);
    }

    for (const [stdIndex, std] of qa.standards.entries()) {
      const [insertedStd] = await db
        .insert(standardsTable)
        .values({
          qualityAreaId: insertedArea.id,
          code: std.code,
          title: std.title,
          intent: std.intent,
          whatItMeans: std.whatItMeans,
          keyPractices: std.keyPractices,
          evidenceExamples: std.evidenceExamples,
          sortOrder: stdIndex,
        })
        .returning();

      if (!insertedStd) {
        throw new Error(`Failed to insert standard ${std.code}`);
      }

      for (const [stratIndex, strat] of std.strategies.entries()) {
        await db.insert(strategiesTable).values({
          standardId: insertedStd.id,
          title: strat.title,
          summary: strat.summary,
          steps: strat.steps,
          category: strat.category,
          effort: strat.effort,
          timeEstimate: strat.timeEstimate,
          sortOrder: stratIndex,
        });
      }
    }
  }
}
