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

    async auth(username, password, captchaID, doSet, callback) {
        const response = await fetch(this.server + "/api/user/auth", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                "username": username,
                "password": password,
                "captchaID": captchaID
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

    async newUser(username, password, nome, cognome, type, coord, callback) {
        let token = this.getToken();

        if(token == null) {
            return false;
        }

        const response = await fetch(this.server + "/api/user/new", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                "token": token,
                "username": username,
                "password": password,
                "nome": nome,
                "cognome": cognome,
                "type": type,
                "coord": coord
            })
        });

        let data = await response.json();

        if(callback != undefined && callback != null) {
            callback(data);
        }
    }

    async editUser(username, id, password, nome, cognome, type, coord, callback) {
        let token = this.getToken();

        if(token == null) {
            return false;
        }

        const response = await fetch(this.server + "/api/user/edit", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                "token": token,
                "id": id,
                "username": username,
                "password": password,
                "nome": nome,
                "cognome": cognome,
                "type": type,
                "coord": coord
            })
        });

        let data = await response.json();

        if(callback != undefined && callback != null) {
            callback(data);
        }
    }

    async getUserInfoByType(type, callback) {
        let token = this.getToken();

        if(token == null) {
            return false;
        }

        const response = await fetch(this.server + "/api/user/type", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                "token": token,
                "type": type
            })
        });

        let data = await response.json();

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

    async getActiveAssets(callback) {
        const response = await fetch(this.server + "/api/assets/active", {
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

    async getActiveFloorAssets(floor, callback) {
        const response = await fetch(this.server + "/api/assets/floor-active", {
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

    async book(asset, start, end, callback) {
        let token = this.getToken();

        if(token == null) {
            return false;
        }

        const response = await fetch(this.server + "/api/booking/book", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                "token": token,
                "asset": asset,
                "start": start,
                "end": end
            })
        });

        let data = await response.json();

        if(callback != undefined && callback != null) {
            callback(data);
        }
    }

    async getByAssetCoord(assetID, callback) {
        let token = this.getToken();

        if(token == null) {
            return false;
        }

        const response = await fetch(this.server + "/api/booking/assetfor", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                "token": token,
                "assetID": assetID
            })
        });

        let data = await response.json();

        if(callback != undefined && callback != null) {
            callback(data);
        }
    }

    async getBooked(callback) {
        let token = this.getToken();

        if(token == null) {
            return false;
        }

        const response = await fetch(this.server + "/api/booking/booked", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                "token": token
            })
        });

        let data = await response.json();

        if(callback != undefined && callback != null) {
            callback(data);
        }
    }

    async getBookedBy(userID, callback) {
        let token = this.getToken();

        if(token == null) {
            return false;
        }

        const response = await fetch(this.server + "/api/booking/bookedby", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                "token": token,
                "userID": userID
            })
        });

        let data = await response.json();

        if(callback != undefined && callback != null) {
            callback(data);
        }
    }

    async getActiveBookings(callback) {
        let token = this.getToken();

        if(token == null) {
            return false;
        }

        const response = await fetch(this.server + "/api/booking/active", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                "token": token
            })
        });

        let data = await response.json();

        if(callback != undefined && callback != null) {
            callback(data);
        }
    }

    async getActiveBookingsBy(userID, callback) {
        let token = this.getToken();

        if(token == null) {
            return false;
        }

        const response = await fetch(this.server + "/api/booking/activeby", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                "token": token,
                "userID": userID
            })
        });

        let data = await response.json();

        if(callback != undefined && callback != null) {
            callback(data);
        }
    }

    async getInactiveBookings(callback) {
        let token = this.getToken();

        if(token == null) {
            return false;
        }

        const response = await fetch(this.server + "/api/booking/inactive", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                "token": token
            })
        });

        let data = await response.json();

        if(callback != undefined && callback != null) {
            callback(data);
        }
    }

    async getInactiveBookingsBy(userID, callback) {
        let token = this.getToken();

        if(token == null) {
            return false;
        }

        const response = await fetch(this.server + "/api/booking/inactiveby", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                "token": token,
                "userID": userID
            })
        });

        let data = await response.json();

        if(callback != undefined && callback != null) {
            callback(data);
        }
    }

    async deleteBooking(bookingID, callback) {
        let token = this.getToken();

        if(token == null) {
            return false;
        }

        const response = await fetch(this.server + "/api/booking/delete", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                "token": token,
                "bookingID": bookingID
            })
        });

        let data = await response.json();

        if(callback != undefined && callback != null) {
            callback(data);
        }
    }

    async deleteBookingFor(bookingID, callback) {
        let token = this.getToken();

        if(token == null) {
            return false;
        }

        const response = await fetch(this.server + "/api/booking/deletefor", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                "token": token,
                "bookingID": bookingID
            })
        });

        let data = await response.json();

        if(callback != undefined && callback != null) {
            callback(data);
        }
    }

    async deleteUser(userID, callback) {
        let token = this.getToken();

        if(token == null) {
            return false;
        }

        const response = await fetch(this.server + "/api/user/delete", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                "token": token,
                "userID": userID
            })
        });

        let data = await response.json();

        if(callback != undefined && callback != null) {
            callback(data);
        }
    }

    async editBooking(bookingID, start, end, callback) {
        let token = this.getToken();

        if(token == null) {
            return false;
        }

        const response = await fetch(this.server + "/api/booking/edit", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                "token": token,
                "bookingID": bookingID,
                "start": start,
                "end": end
            })
        });

        let data = await response.json();

        if(callback != undefined && callback != null) {
            callback(data);
        }
    }

    async editBookingFor(bookingID, start, end, callback) {
        let token = this.getToken();

        if(token == null) {
            return false;
        }

        const response = await fetch(this.server + "/api/booking/editfor", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                "token": token,
                "bookingID": bookingID,
                "start": start,
                "end": end
            })
        });

        let data = await response.json();

        if(callback != undefined && callback != null) {
            callback(data);
        }
    }

    async disableAsset(assetID, callback) {
        let token = this.getToken();

        if(token == null) {
            return false;
        }

        const response = await fetch(this.server + "/api/assets/disable", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                "token": token,
                "assetID": assetID
            })
        });

        let data = await response.json();

        if(callback != undefined && callback != null) {
            callback(data);
        }
    }

    async enableAsset(assetID, callback) {
        let token = this.getToken();

        if(token == null) {
            return false;
        }

        const response = await fetch(this.server + "/api/assets/enable", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                "token": token,
                "assetID": assetID
            })
        });

        let data = await response.json();

        if(callback != undefined && callback != null) {
            callback(data);
        }
    }

    async getCoordinatedUsers(callback) {
        let token = this.getToken();

        if(token == null) {
            return false;
        }

        const response = await fetch(this.server + "/api/user/coord", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                "token": token,
            })
        });

        let data = await response.json();

        if(callback != undefined && callback != null) {
            callback(data);
        }
    }

    constructor(server) {
        // Per ora usiamo questo server
        if(server == null || server == undefined) {
            if(Helpers.isDebug()) {
                this.server = "http://" + window.location.hostname + ":8080";
            } else {
                this.server = "http://lab.matthew5pl.net:9091";
            }
        } else {
            this.server = server;
        }
    }
}