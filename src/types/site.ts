type Site = {
    uri: string;
};

enum SiteConnectionStatus {
    UNKNOWN = "Unknown",
    CHECKING = "Checking...",
    AVAILABLE = "Available",
    OFFLINE = "Offline",
    UNAUTHORIZED = "Unauthorized",
    ERROR = "Error",
}


export type { Site };
export { SiteConnectionStatus };