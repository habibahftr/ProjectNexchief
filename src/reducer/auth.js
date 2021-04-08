let defaultState = {
    isLogin: false,
    userLogin: {
        id: "",
        username: "",
        name: "",
        email: "",
        phone: "",
    }
}

const authReducer = (state = defaultState, action) => {
    console.warn("state: ", state)
    console.warn("action: ", action)
    switch (action.type) {
        case "LOGIN":
            console.log("object")
            return {
                isLogin: true,
                userLogin: {
                    id: action.payload.dataLogin.id,
                    username: action.payload.dataLogin.username,
                    name: action.payload.dataLogin.name,
                    email: action.payload.dataLogin.email,
                    phone: action.payload.dataLogin.phone,
                }

            }
        case "LOGOUT":
            return {
                isLogin: false,
                userLogin:{}
            }

        default:
            return state;
    }
}

export default authReducer