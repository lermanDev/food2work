import config from "../constants/Config";
import { Buffer } from "buffer";

export const updatePerfilAction = (
    nombre,
    apellido,
    id_empresa,
    notificaciones,
    metodo_pago,
    direccion_defecto
) => {
    return {
        type: "UPDATE_PERFIL",
        nombre,
        apellido,
        id_empresa,
        notificaciones,
        metodo_pago,
        direccion_defecto,
    };
};

export const updateNombreAction = (nombre, apellido) => {
    return {
        type: "UPDATE_PERFIL",
        nombre,
        apellido,
    };
};

export const loadPerfilAction = (
    usuario,
    nombre,
    apellido,
    id_empresa,
    empresa_info,
    notificaciones,
    metodo_pago,
    metodo_pago_posibles,
    direccion_defecto,
    direcciones
) => {
    return {
        type: "LOAD_PERFIL",
        usuario,
        nombre,
        apellido,
        id_empresa,
        empresa_info,
        notificaciones,
        metodo_pago,
        metodo_pago_posibles,
        direccion_defecto,
        direcciones,
    };
};

export const errorLogAction = (error_log) => {
    return {
        type: "ERROR_UPDATING",
        error_log,
    };
};

export function update_perfil(
    nombre,
    apellido,
    id_empresa,
    notificaciones,
    metodo_pago,
    direccion_defecto,
    hash_usuario
) {
    return async (dispatch) => {
        dispatch({ type: "UPDATING_PERFIL" });
        let formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("apellido", apellido);
        formData.append("id_empresa", id_empresa);
        formData.append("notificaciones", notificaciones);
        formData.append("metodo_pago", metodo_pago[0]);
        formData.append("direccion_defecto", direccion_defecto);

        //primero lo actualizamos en nuestro servidor, después en local
        const response = await fetch(config.API_HOST + "/api/update_user/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: "token " + hash_usuario,
            },
            body: formData,
        }).catch((error) => {
            console.log(error);
            // dispatch(loginAction("", String(error)));
        });

        if (response.status !== 200) {
            const data = await response.json();
            // Ha fallado
            //dispatch(errorLogAction(String(data.error)));
            dispatch(errorLogAction(String(data.error)));
            console.log(data.error);
            dispatch({ type: "CLEAR_ERROR_UPDATING" });
        } else {
            // Ha ido todo correcto refrescamos nuestra información con la nueva
            const data = await response.json();
            dispatch(load_perfil(hash_usuario));
        }
    };
}

export function load_perfil(hash_usuario) {
    return async (dispatch) => {
        dispatch({ type: "LOADING_PERFIL" });

        //primero lo actualizamos en nuestro servidor, después en local
        const response = await fetch(config.API_HOST + "/api/get_usuario/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "token " + hash_usuario,
            },
        }).catch((error) => {
            console.log(error);
            // dispatch(loginAction("", String(error)));
        });

        if (response.status !== 200) {
            const data = await response.json();
            // Ha fallado
            //dispatch(errorLogAction(String(data.error)));
            console.log(data.error);
        } else {
            // Ha ido todo correcto refrescamos nuestra información con la nueva
            const data = await response.json();
            //console.log(data);
            dispatch(
                loadPerfilAction(
                    data.success.correo,
                    data.success.nombre,
                    data.success.apellido,
                    data.success.id_empresa,
                    data.success.empresa_info,
                    data.success.notificaciones,
                    data.success.metodo_pago,
                    data.success.metodo_pago_posibles,
                    data.success.direccion_defecto,
                    data.success.direcciones
                )
            );
        }
    };
}

export function updateNombre(nombre_local, apellido_local, authToken) {
    return async (dispatch) => {
        dispatch({ type: "UPDATING_PERFIL" });

        let formData = new FormData();
        formData.append("nombre", nombre_local);
        formData.append("apellido", apellido_local);
        formData.append("id_empresa", "");
        formData.append("notificaciones", "");
        formData.append("metodo_pago", "");
        formData.append("direccion_defecto", "");

        //primero lo actualizamos en nuestro servidor, después en local
        const response = await fetch(config.API_HOST + "/api/update_user/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: "token " + authToken,
            },
            body: formData,
        }).catch((error) => {
            console.log(error);
        });

        if (response.status !== 200) {
            const data = await response.json();
            // Ha fallado
            dispatch(errorLogAction(String(data.error)));
            console.log(data.error);
        } else {
            // Ha ido todo correcto refrescamos nuestra información con la nueva
            const data = await response.json();
            dispatch(load_perfil(authToken));
        }
    };
}

export function updatePassword(usuario, old_password, new_password, authToken) {
    return async (dispatch) => {
        dispatch({ type: "UPDATING_PERFIL" });

        let formData = new FormData();
        formData.append("usuario", usuario);
        formData.append("old_password", old_password);
        formData.append("new_password", new_password);

        console.log(usuario, old_password, new_password);

        //primero lo actualizamos en nuestro servidor, después en local
        const response = await fetch(
            config.API_HOST + "/api/change_password/",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: "token " + authToken,
                },
                body: formData,
            }
        ).catch((error) => {
            dispatch(errorLogAction(String(error)));
            console.log(error);
            dispatch({ type: "CLEAR_ERROR_UPDATING" });
        });

        if (response.status !== 200) {
            const data = await response.json();
            // Ha fallado
            dispatch(errorLogAction(String(data.error)));
            console.log(data.error);
            dispatch({ type: "CLEAR_ERROR_UPDATING" });
        } else {
            // Ha ido todo correcto refrescamos nuestra información con la nueva
            const data = await response.json();
            dispatch({ type: "CLEAR_ERROR_UPDATING" });
            dispatch(load_perfil(authToken));
        }
    };
}

export function add_direccion(
    idDireccion,
    nombreDireccion,
    telefonoDireccion,
    ciudadDireccion,
    direccionDireccion,
    anotacionDireccion,
    codigoPostalDireccion,
    authToken
) {
    return async (dispatch) => {
        dispatch({ type: "UPDATING_PERFIL" });

        let formData = new FormData();
        formData.append(
            "id_direccion",
            typeof idDireccion == "undefined" ? "" : idDireccion
        );
        formData.append(
            "nombre_direccion",
            typeof nombreDireccion == "undefined" ? "" : nombreDireccion
        );
        formData.append(
            "telefono",
            typeof telefonoDireccion == "undefined" ? "" : telefonoDireccion
        );
        formData.append(
            "ciudad",
            typeof ciudadDireccion == "undefined" ? "" : ciudadDireccion
        );
        formData.append(
            "direccion",
            typeof direccionDireccion == "undefined" ? "" : direccionDireccion
        );
        formData.append(
            "anotaciones",
            typeof anotacionDireccion == "undefined" ? "" : anotacionDireccion
        );
        formData.append(
            "codigo_postal",
            typeof codigoPostalDireccion == "undefined"
                ? ""
                : codigoPostalDireccion
        );

        console.log(
            idDireccion,
            nombreDireccion,
            telefonoDireccion,
            ciudadDireccion,
            direccionDireccion,
            anotacionDireccion,
            codigoPostalDireccion,
            authToken
        );

        //primero lo actualizamos en nuestro servidor, después en local
        const response = await fetch(
            config.API_HOST + "/api/modifica_direccion/",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: "token " + authToken,
                },
                body: formData,
            }
        ).catch((error) => {
            dispatch(errorLogAction(String(error)));
            console.log(error);
            dispatch({ type: "CLEAR_ERROR_UPDATING" });
        });

        if (response.status !== 200) {
            const data = await response.json();
            // Ha fallado
            dispatch(errorLogAction(String(data.error)));
            console.log(data.error);
            dispatch({ type: "CLEAR_ERROR_UPDATING" });
        } else {
            // Ha ido todo correcto refrescamos nuestra información con la nueva
            const data = await response.json();
            dispatch({ type: "CLEAR_ERROR_UPDATING" });
            dispatch(load_perfil(authToken));
        }
    };
}

export function delete_direccion(idDireccion, authToken) {
    return async (dispatch) => {
        dispatch({ type: "UPDATING_PERFIL" });

        let formData = new FormData();
        formData.append(
            "id_direccion",
            typeof idDireccion == "undefined" ? "" : idDireccion
        );

        console.log(idDireccion, authToken);

        //primero lo actualizamos en nuestro servidor, después en local
        const response = await fetch(
            config.API_HOST + "/api/delete_direccion/",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: "token " + authToken,
                },
                body: formData,
            }
        ).catch((error) => {
            dispatch(errorLogAction(String(error)));
            console.log(error);
            dispatch({ type: "CLEAR_ERROR_UPDATING" });
            dispatch(load_perfil(authToken));
        });

        if (response.status !== 200) {
            const data = await response.json();
            // Ha fallado
            dispatch(errorLogAction(String(data.error)));
            console.log(data.error);
            dispatch({ type: "CLEAR_ERROR_UPDATING" });
            dispatch(load_perfil(authToken));
        } else {
            // Ha ido todo correcto refrescamos nuestra información con la nueva
            const data = await response.json();
            dispatch({ type: "CLEAR_ERROR_UPDATING" });
            dispatch(load_perfil(authToken));
        }
    };
}
