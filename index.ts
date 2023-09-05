/**
 * Planter
 *
 * Add default appointments to Harvest Time Tracking using the harvest API.
 *
 * The initial version of this program was written by Bing:
 *
 * > This program makes HTTP requests to the Harvest API. It defines an
 * > interface `Task` that represents a Harvest time tracking task with a
 * > `projectId` and a `taskName`. The `createTimeTrackingTasks`
 * > function takes an array of `Task` objects and uses the Harvest API to
 * > create time tracking tasks for each one. The Harvest access token and
 * > account ID are retrieved from environment variables.
 *
 */

import fetch from "node-fetch";
import ecsFormat from "@elastic/ecs-pino-format";
import { pino } from "pino";

const logger = pino(ecsFormat());

interface TimeEntry {
  notes?: string;
  task_id: number;
}

const harvestAccessToken = process.env.HARVEST_ACCESS_TOKEN;
const harvestAccountId = process.env.HARVEST_ACCOUNT_ID;
const project_id = parseInt(process.env.HARVEST_PROJECT_ID ?? "", 10);

async function createTimeEntries(entries: TimeEntry[]) {
  for (const entry of entries) {
    try {
      const response = await fetch(
        `https://api.harvestapp.com/v2/time_entries`,
        {
          method: "POST",
          headers: {
            "Harvest-Account-Id": harvestAccountId,
            Authorization: `Bearer ${harvestAccessToken}`,
            "User-Agent": "Harvest API Example",
            "Content-Type": "application/json",
          } as HeadersInit,
          body: JSON.stringify({
            ...entry,
            project_id,
            spent_date: new Date().toISOString(),
          }),
        }
      );
      logger.info({
        "http.response.status_code": response.status,
        "service.name": "planter",
        message: "Created time entry",
      });
    } catch (exception: any) {
      logger.error({ message: exception.message, "service.name": "planter" });
    }
  }
}

const adminTaskId = 1942976;
const developmentTaskId = 1963224;
const educationTaskId = 11372825;
const tasks: TimeEntry[] = [
  { task_id: adminTaskId },
  { task_id: adminTaskId, notes: "Email" },
  { task_id: adminTaskId, notes: "Slack" },
  { task_id: developmentTaskId, notes: "Prioritization" },
  { task_id: educationTaskId, notes: "Reading" },
];
createTimeEntries(tasks);
