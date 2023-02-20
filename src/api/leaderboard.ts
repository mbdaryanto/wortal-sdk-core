import Leaderboard from "../models/leaderboard";
import LeaderboardEntry from "../models/leaderboard-entry";
import { rakutenLeaderboardEntryToWortal, rakutenLeaderboardToWortal } from "../utils/converters";
import { invalidParams, notSupported, rethrowRakuten } from "../utils/error-handler";
import { isValidString } from "../utils/validators";
import { config } from "./index";

/**
 * Gets the leaderboard with the given name. Access the leaderboard API via the Leaderboard returned here.
 * @example
 * Wortal.leaderboard.getLeaderboardAsync('global')
 *  .then(leaderboard => console.log(leaderboard.name());
 * @param name Name of the leaderboard.
 * @throws {ErrorMessage} See error.message for details.
 * <ul>
 * <li>INVALID_PARAM</li>
 * <li>NOT_SUPPORTED</li>
 * <li>RETHROW_FROM_PLATFORM</li>
 * </ul>
 */
export function getLeaderboardAsync(name: string): Promise<Leaderboard> {
    let platform = config.session.platform;
    return Promise.resolve().then(() => {
        if (!isValidString(name)) {
            throw invalidParams("name cannot be null or empty.", "leaderboard.getLeaderboardAsync");
        }

        if (platform === "link" || platform === "viber" || platform === "facebook") {
            return (window as any).wortalGame.getLeaderboardAsync(name)
                .then((result: any) => {
                    return rakutenLeaderboardToWortal(result);
                })
                .catch((e: any) => {
                    if (platform === "link" || platform === "viber") {
                        throw rethrowRakuten(e, "leaderboard.getLeaderboardAsync");
                    } else {
                        throw Error(e);
                    }
                });
        } else {
            throw notSupported("Leaderboard API not currently supported on platform: " + platform, "leaderboard.getLeaderboardAsync");
        }
    });
}

/**
 * Sends an entry to be added to the leaderboard, or updated if already existing. Will only update if the score
 * is a higher than the player's previous entry.
 * @example
 * Wortal.leaderboard.sendEntryAsync('global', 100);
 * @param name Name of the leaderboard.
 * @param score Score for the entry.
 * @param details Optional additional details about the entry.
 * @returns The new entry if one was created, updated entry if the score is higher, or the old entry if no new
 * high score was achieved.
 * @throws {ErrorMessage} See error.message for details.
 * <ul>
 * <li>INVALID_PARAM</li>
 * <li>NOT_SUPPORTED</li>
 * <li>RETHROW_FROM_PLATFORM</li>
 * </ul>
 */
export function sendEntryAsync(name: string, score: number, details: string = ""): Promise<LeaderboardEntry> {
    let platform = config.session.platform;
    return Promise.resolve().then(() => {
        if (!isValidString(name)) {
            throw invalidParams("name cannot be null or empty.", "leaderboard.sendEntryAsync");
        }

        if (platform === "link" || platform === "viber" || platform === "facebook") {
            return (window as any).wortalGame.getLeaderboardAsync(name)
                .then((leaderboard: any) => leaderboard.setScoreAsync(score, details))
                .then((entry: any) => {
                    return rakutenLeaderboardEntryToWortal(entry);
                })
                .catch((e: any) => {
                    if (platform === "link" || platform === "viber") {
                        throw rethrowRakuten(e, "leaderboard.sendEntryAsync");
                    } else {
                        throw Error(e);
                    }
                });
        } else {
            throw notSupported("Leaderboard API not currently supported on platform: " + platform, "leaderboard.sendEntryAsync");
        }
    });
}

/**
 * Gets a list of leaderboard entries in the leaderboard.
 * @example
 * Wortal.leaderboard.getEntriesAsync('global', 10)
 *  .then(entries => console.log(entries);
 * @param name Name of the leaderboard.
 * @param count Number of entries to get.
 * @param offset Offset from the first entry (top rank) to start the count from. Default is 0.
 * @returns Array of LeaderboardEntry.
 * @throws {ErrorMessage} See error.message for details.
 * <ul>
 * <li>INVALID_PARAM</li>
 * <li>NOT_SUPPORTED</li>
 * <li>RETHROW_FROM_PLATFORM</li>
 * </ul>
 */
export function getEntriesAsync(name: string, count: number, offset: number = 0): Promise<LeaderboardEntry[]> {
    let platform = config.session.platform;
    return Promise.resolve().then(() => {
        if (!isValidString(name)) {
            throw invalidParams("name cannot be null or empty.", "leaderboard.getEntriesAsync");
        }

        if (platform === "link" || platform === "viber" || platform === "facebook") {
            return (window as any).wortalGame.getLeaderboardAsync(name)
                .then((leaderboard: any) => leaderboard.getEntriesAsync(count, offset))
                .then((entries: any) => {
                    return entries.map((entry: any) => {
                        return rakutenLeaderboardEntryToWortal(entry)
                    })
                })
                .catch((e: any) => {
                    if (platform === "link" || platform === "viber") {
                        throw rethrowRakuten(e, "leaderboard.getEntriesAsync");
                    } else {
                        throw Error(e);
                    }
                });
        } else {
            throw notSupported("Leaderboard API not currently supported on platform: " + platform, "leaderboard.getEntriesAsync");
        }
    });
}

/**
 * Gets the player's entry in the leaderboard.
 * @example
 * Wortal.leaderboard.getPlayerEntryAsync('global')
 *  .then(entry => console.log(entry.rank());
 * @param name Name of the leaderboard.
 * @returns LeaderboardEntry for the player.
 * @throws {ErrorMessage} See error.message for details.
 * <ul>
 * <li>INVALID_PARAM</li>
 * <li>NOT_SUPPORTED</li>
 * <li>RETHROW_FROM_PLATFORM</li>
 * </ul>
 */
export function getPlayerEntryAsync(name: string): Promise<LeaderboardEntry> {
    let platform = config.session.platform;
    return Promise.resolve().then(() => {
        if (!isValidString(name)) {
            throw invalidParams("name cannot be null or empty.", "leaderboard.getPlayerEntryAsync");
        }

        if (platform === "link" || platform === "viber" || platform === "facebook") {
            return (window as any).wortalGame.getLeaderboardAsync(name)
                .then((leaderboard: any) => leaderboard.getPlayerEntryAsync())
                .then((entry: any) => {
                    return rakutenLeaderboardEntryToWortal(entry);
                })
                .catch((e: any) => {
                    if (platform === "link" || platform === "viber") {
                        throw rethrowRakuten(e, "leaderboard.getPlayerEntryAsync");
                    } else {
                        throw Error(e);
                    }
                });
        } else {
            throw notSupported("Leaderboard API not currently supported on platform: " + platform, "leaderboard.getPlayerEntryAsync");
        }
    });
}

/**
 * Gets the total number of entries in the leaderboard.
 * @example
 * Wortal.leaderboard.getEntryCountAsync('global')
 *  .then(entries => console.log(entries);
 * @param name Name of the leaderboard.
 * @returns Number of entries.
 * @throws {ErrorMessage} See error.message for details.
 * <ul>
 * <li>INVALID_PARAM</li>
 * <li>NOT_SUPPORTED</li>
 * <li>RETHROW_FROM_PLATFORM</li>
 * </ul>
 */
export function getEntryCountAsync(name: string): Promise<number> {
    let platform = config.session.platform;
    return Promise.resolve().then(() => {
        if (!isValidString(name)) {
            throw invalidParams("name cannot be null or empty.", "leaderboard.getEntryCountAsync");
        }

        if (platform === "link" || platform === "viber" || platform === "facebook") {
            return (window as any).wortalGame.getLeaderboardAsync(name)
                .then((leaderboard: any) => leaderboard.getEntryCountAsync())
                .then((count: any) => {
                    return count;
                })
                .catch((e: any) => {
                    if (platform === "link" || platform === "viber") {
                        throw rethrowRakuten(e, "leaderboard.getEntryCountAsync");
                    } else {
                        throw Error(e);
                    }
                });
        } else {
            throw notSupported("Leaderboard API not currently supported on platform: " + platform, "leaderboard.getEntryCountAsync");
        }
    });
}

/**
 * Gets a list of leaderboard entries of connected players in the leaderboard.
 * @example
 * Wortal.leaderboard.getConnectedPlayersEntriesAsync('global')
 *  .then(entries => console.log(entries);
 * @param name Name of the leaderboard.
 * @param count Number of entries to get.
 * @param offset Offset from the first entry (top rank) to start the count from. Default is 0.
 * @returns Array of LeaderboardEntry.
 * @throws {ErrorMessage} See error.message for details.
 * <ul>
 * <li>INVALID_PARAM</li>
 * <li>NOT_SUPPORTED</li>
 * <li>RETHROW_FROM_PLATFORM</li>
 * </ul>
 */
export function getConnectedPlayersEntriesAsync(name: string, count: number, offset: number): Promise<LeaderboardEntry[]> {
    let platform = config.session.platform;
    return Promise.resolve().then(() => {
        if (!isValidString(name)) {
            throw invalidParams("name cannot be null or empty.", "leaderboard.getConnectedPlayersEntriesAsync");
        }

        if (platform === "link" || platform === "viber" || platform === "facebook") {
            return (window as any).wortalGame.getLeaderboardAsync(name)
                .then((leaderboard: any) => leaderboard.getConnectedPlayerEntriesAsync(count, offset))
                .then((entries: any) => {
                    return entries.map((entry: any) => {
                        return rakutenLeaderboardEntryToWortal(entry)
                    })
                })
                .catch((e: any) => {
                    if (platform === "link" || platform === "viber") {
                        throw rethrowRakuten(e, "leaderboard.getConnectedPlayersEntriesAsync");
                    } else {
                        throw Error(e);
                    }
                });
        } else {
            throw notSupported("Leaderboard API not currently supported on platform: " + platform, "leaderboard.getConnectedPlayersEntriesAsync");
        }
    });
}
