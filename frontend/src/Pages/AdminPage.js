import React from 'react';

function AdminPage() {
    const logout = () => {
        localStorage.setItem("userInfo", null);
        window.location = "/";
    }
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo == null) {
        window.location = "/";
    } else if (!userInfo.isAdmin) {
        window.location = "/user";
    } else {
        return (
            <>
                <div><button onClick={logout}>Logout</button></div>
                <div>
                    <h1>i am admin</h1>
                </div>
            </>
        )
    }
}

export default AdminPage
