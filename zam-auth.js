class ZAMAuth {
    getToken() {
        window.localStorage.getItem("zam-token");
    }
    
    clearToken() {
        window.localStorage.removeItem("zam-token");
    }

    setToken(value) {
        window.localStorage.setItem("zam-token", value);
    }

    async auth(username, password, doSet, callback) {
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
        if(data.success && doSet == true) {
            this.setToken(data.message);
        }

        if(callback != undefined && callback != null) {
            callback(data);
        }
    }

    async authToken(callback) {
        let token = this.getToken();

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
        if(!data.success) {
            this.clearToken();
        }

        if(callback != undefined && callback != null) {
            callback(data);
        }
    }

    constructor(server) {
        this.server = server;
    }
}