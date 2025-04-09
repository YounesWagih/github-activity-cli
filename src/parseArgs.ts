import * as readline from "readline";

export interface ParsedArgs {
    username: string;
    eventType?: string;
    outputFile?: string;
}

function askQuestion(query: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) =>
        rl.question(query, (answer) => {
            rl.close();
            resolve(answer.trim());
        })
    );
}

export async function parseArgs(): Promise<ParsedArgs> {
    const args = process.argv.slice(2);
    let username = args[0];
    let eventType: string | undefined;
    let outputFile: string | undefined;

    if (!username) {
        // Interactive mode
        username = await askQuestion("Enter GitHub username: ");
        const typeInput = await askQuestion("Enter event type (optional): ");
        const outputInput = await askQuestion("Output to file? (y/n): ");

        if (typeInput) eventType = typeInput;
        if (outputInput.toLowerCase() === "y") {
            outputFile = await askQuestion(
                "Enter filename (default: activity.txt): "
            );
            if (!outputFile) outputFile = "activity.txt";
        }
    } else {
        // CLI mode with optional flags
        const typeIndex = args.indexOf("--type");
        const outputIndex = args.indexOf("--output");

        if (typeIndex !== -1) eventType = args[typeIndex + 1];
        if (outputIndex !== -1)
            outputFile = args[outputIndex + 1] || "activity.txt";
    }

    return { username, eventType, outputFile };
}
