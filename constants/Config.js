export default {
    API_HOST:
        process.env.NODE_ENV === "development"
            ? "http://51.91.104.35:8000"
            : "https://api.xavi.net",
};

/*"http://51.91.104.35:8000"*/
/*"http://127.0.0.1:8000"*/
