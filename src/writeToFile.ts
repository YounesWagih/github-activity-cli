import fs from "fs";

export function writeToFile(filePath: string, lines: string[]): void {
    const content = lines.join("\n") + "\n";

    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error(`❌ Failed to write to ${filePath}:`, err.message);
        } else {
            console.log(`\n💾 Output saved to ${filePath}`);
        }
    });
}
