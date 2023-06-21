import Keycloak from "keycloak-js";

const keycloak = new Keycloak('../keycloak.json')

const initKeycloak = () => {
    keycloak.init({
        onLoad: "login-required",
        checkLoginIframe: false
    })
        .then((authenticated) => {
            if (authenticated) {

            }

            sessionStorage.setItem("userid", keycloak.idTokenParsed.userid )
            sessionStorage.setItem("token", keycloak.token )

        }).catch(console.error);
};

const doLogout = keycloak.logout;





const LoginService = {
    initKeycloak,
    doLogout,


}

export default LoginService;