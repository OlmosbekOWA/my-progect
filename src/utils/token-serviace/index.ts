export const getAccessTocen = () => localStorage.getItem("token")
export const getRefreshToken = () => localStorage.getItem("token")

export const setItemToken = (item:string, tokin:any) => localStorage.setItem(item, tokin)


export const logout = () =>{
    localStorage.removeItem("token")
    window.location.href = "/"
}

