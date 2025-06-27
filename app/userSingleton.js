class UserSingleton {
    constructor() {
        if (UserSingleton.instance) {
            return UserSingleton.instance;
        }
        this.user = null; // Aquí se guarda el usuario autenticado
        UserSingleton.instance = this;
    }

    setUser(user) {
        this.user = user;
    }

    getUser() {
        return this.user;
    }

    clearUser() {
        this.user = null;
    }
}

const instance = new UserSingleton();
export default instance;
