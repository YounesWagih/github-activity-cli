import { parseArgs } from "./parseArgs";
import { fetchGitHubEvents } from "./fetchGitHubData";
import { formatEvents } from "./formatOutput";
import { writeToFile } from "./writeToFile";

async function main() {
    const { username, eventType, outputFile } = await parseArgs();

    try {
        const events = await fetchGitHubEvents(username);

        const filtered = eventType
            ? events.filter((event) => event.type === eventType)
            : events;

        if (filtered.length === 0) {
            console.log(
                `No events found for ${username}${
                    eventType ? ` with type ${eventType}` : ""
                }`
            );
            return;
        }

        console.log(`\n🧾 Showing recent events for ${username}:\n`);
        const formatted = formatEvents(filtered);
        formatted.forEach((event) => console.log("  " + event));

        if (outputFile) writeToFile(outputFile, formatted);
    } catch (err: any) {
        console.error("❌ Error:", err.message);
    }
}

main();
