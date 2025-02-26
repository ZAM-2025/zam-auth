class ZAMAuth {
    getToken() {
        return window.localStorage.getItem("zam-token");
    }
    
    clearToken() {
        return window.localStorage.removeItem("zam-token");
    }

    setToken(value) {
        return window.localStorage.setItem("zam-token", value);
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
            return false;
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

    async logout(callback) {
        let token = this.getToken();

        if(token == null) {
            return false;
        }

        const response = await fetch(this.server + "/logout", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                "token": token
            })
        });

        let data = await response.json();
        if(data.success) {
            this.clearToken();
        }

        if(callback != undefined && callback != null) {
            callback(data);
        }
    }

    async getUserInfo(callback) {
        let token = this.getToken();

        if(token == null) {
            return false;
        }

        const response = await fetch(this.server + "/getUserInfo", {
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