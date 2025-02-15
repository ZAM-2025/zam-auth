class ZAMAuth {
    async auth(username, password, callback) {
        const response = await fetch(this.server + "/auth", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        });

        let data = await response.json();
        console.log(data);

        if(data.success) {
            window.localStorage.setItem("zam-token", data.message);
        }

        callback(data);
    }

    async authToken(callback) {
        let token = window.localStorage.getItem("zam-token")

        if(token == null) {
            return;
        }

        const response = await fetch(this.server + "/authToken", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                "token": token
            })
        });

        let data = await response.json();
        console.log(data);

        if(!data.success) {
            window.localStorage.removeItem("zam-token");
        }

        callback(data);
    }

    constructor(server) {
        this.server = server;
    }
}