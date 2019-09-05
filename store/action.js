const save_user = (user) => {
    return {
        type: "SET_USER",
        data: user
    }
}

const remove_user = () => {
    return {
        type: "REMOVE_USER"
    }
}

export {
    save_user,
    remove_user
}