import { GitHubEvent } from "./fetchGitHubData";
import { c, color } from "./utils/color";

export function formatEvent(event: GitHubEvent): string {
    const repo = event.repo.name;
    const type = event.type;
    const payload = event.payload;

    switch (type) {
        case "PushEvent":
            const commits = payload.commits?.length ?? 0;
            return c(`🚀 Pushed ${commits} commit(s) to ${repo}`, color.green);

        case "IssuesEvent":
            const action = payload.action;
            const issue = payload.issue?.title ?? "";
            return c(`🐛 ${action} issue "${issue}" in ${repo}`, color.yellow);

        case "WatchEvent":
            return c(`⭐ Starred ${repo}`, color.cyan);

        case "ForkEvent":
            return c(`🍴 Forked ${repo}`, color.magenta);

        case "CreateEvent":
            return c(
                `📁 Created ${payload.ref_type} "${payload.ref}" in ${repo}`,
                color.bright
            );

        default:
            return c(`📌 ${type} in ${repo}`, color.gray);
    }
}

export function formatEvents(events: GitHubEvent[]): string[] {
    return events.map(formatEvent);
}
