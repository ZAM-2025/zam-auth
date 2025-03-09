let ZAMUserType = {
    DIPENDENTE: "DIPENDENTE",
    COORDINATORE: "COORDINATORE",
    GESTORE: "GESTORE"
}

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
        const response = await fetch(this.server + "/api/user/auth", {
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

        const response = await fetch(this.server + "/api/user/token", {
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

        const response = await fetch(this.server + "/api/user/logout", {
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

        const response = await fetch(this.server + "/api/user/info", {
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
    
    async getAllAssets(callback) {
        const response = await fetch(this.server + "/api/assets/all", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        });

        let data = await response.json();

        if(callback != undefined && callback != null) {
            callback(data);
        }
    }

    async getFloorAssets(floor, callback) {
        const response = await fetch(this.server + "/api/assets/floor", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                "floor": floor
            })
        });

        let data = await response.json();

        if(callback != undefined && callback != null) {
            callback(data);
        }
    }

    async getBookingsByAsset(id, callback) {
        const response = await fetch(this.server + "/api/booking/asset", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                "id": id
            })
        });

        let data = await response.json();

        if(callback != undefined && callback != null) {
            callback(data);
        }
    }

    constructor(server) {
        if(server == null || server == undefined) {
            this.server = "http://localhost:8080";
        } else {
            this.server = server;
        }
    }
}