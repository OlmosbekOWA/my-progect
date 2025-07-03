export const getAccessTocen = () => localStorage.getItem("token")
export const getRefreshToken = () => localStorage.getItem("token")


export const logout = () =>{
    localStorage.removeItem("token")
    window.location.href = "/"
}
