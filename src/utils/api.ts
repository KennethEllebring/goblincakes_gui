export interface FetchOptions {
    method?: "GET" | "POST" | "PATCH" | "DELETE";
    body?: BodyInit | null;
    headers?: HeadersInit;
    credentials?: RequestCredentials;
}

export async function fetchData<T>(
    url: string,
    options?: FetchOptions,
): Promise<T> {
    try {
        // Set default method to 'GET' if not specified
        const method = options?.method || "GET";

        // Configure fetch request with dynamic options
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                ...options?.headers, // Spread any additional headers
            },
            body:
                method !== "GET" && method !== "DELETE" ? options?.body : null, // Include body if method is POST or PATCH
            credentials: options?.credentials || "same-origin", // Include credentials as specified
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Handle different content types returned from the server
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return (await response.json()) as T;
        } else {
            throw new Error("Received non-JSON response from server");
        }
    } catch (error) {
        console.error("Failed to fetch data:", error);
        throw error;
    }
}
