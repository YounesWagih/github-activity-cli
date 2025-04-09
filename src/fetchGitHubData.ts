import https from "https";

export type GitHubEvent = {
    type: string;
    repo: { name: string };
    payload: any;
};

export function fetchGitHubEvents(username: string): Promise<GitHubEvent[]> {
    const url = `https://api.github.com/users/${username}/events`;

    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                "User-Agent": "github-activity-cli",
                Accept: "application/vnd.github.v3+json",
            },
        };

        https
            .get(url, options, (res) => {
                let data = "";

                res.on("data", (chunk) => {
                    data += chunk;
                });

                res.on("end", () => {
                    if (res.statusCode === 404) {
                        return reject(new Error("User not found."));
                    }
                    if (res.statusCode !== 200) {
                        return reject(
                            new Error(`GitHub API error: ${res.statusCode}`)
                        );
                    }

                    try {
                        const json = JSON.parse(data);
                        resolve(json);
                    } catch (err) {
                        reject(new Error("Failed to parse JSON."));
                    }
                });
            })
            .on("error", (err) => {
                reject(new Error(`Network error: ${err.message}`));
            });
    });
}
