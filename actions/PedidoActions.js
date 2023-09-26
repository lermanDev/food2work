import config from "../constants/Config";
import { Buffer } from "buffer";

export const updateFechasAction = (fecha_pedido, fecha_max_pedido) => {
    const date = fecha_pedido;
    const dateTimeFormat = new Intl.DateTimeFormat("es", {
        year: "numeric",
        month: "long",
        day: "2-digit",
    });
    const [
        { value: day },
        ,
        { value: month },
        ,
        { value: year },
    ] = dateTimeFormat.formatToParts(date);

    return {
        type: "UPDATE_FECHAS",
        fecha_pedido,
        fecha_pedido_formateada: `${day} ${month} ${year}`,
        fecha_max_pedido,
    };
};

export const updateMenusDisponiblesFechaAction = (menus_disponibles_fecha) => {
    return {
        type: "UPDATE_MENUS_DISPONIBLES_FECHA",
        menus_disponibles_fecha,
    };
};

export const updateMenusDisponiblesBuscarAction = (
    menus_disponibles_buscar
) => {
    return {
        type: "UPDATE_MENUS_DISPONIBLES_BUSCAR",
        menus_disponibles_buscar,
    };
};

export const pedidoCreado = (success_log) => {
    return {
        type: "MENU_UPDATE",
        success_log,
    };
};

export const limpiaPedidoCreado = () => {
    return {
        type: "MENU_UPDATE_CLEAR",
    };
};

export const updatePedidos = (pedidos) => {
    return {
        type: "UPDATE_PEDIDOS",
        pedidos,
    };
};

export function carga_menus(fecha_pedido, id_direccion, authToken) {
    return async (dispatch) => {
        dispatch({ type: "UPDATING_MENU" });
        var fecha_filtro = new Date(fecha_pedido).toISOString().slice(0, 10);
        // console.log(fecha_filtro, id_direccion, authToken);

        let formData = new FormData();
        formData.append(
            "id_direccion",
            typeof id_direccion == "undefined" ? "" : String(id_direccion)
        );
        formData.append(
            "fecha_pedido",
            typeof fecha_filtro == "undefined" ? "" : String(fecha_filtro)
        );

        /*let formData = new FormData();
        formData.append(
            "id_direccion",
            String(id_direccion),
            //typeof id_direccion == "undefined" ? "" : String(id_direccion),
            "fecha_pedido",
            String(fecha_filtro)
            //typeof fecha_filtro == "undefined" ? "" : String(fecha_filtro)
        );*/

        //primero lo actualizamos en nuestro servidor, después en local
        const response = await fetch(config.API_HOST + "/api/get_menus/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: "token " + authToken,
            },
            body: formData,
        }).catch((error) => {
            // dispatch(errorLogAction(String(error)));
            console.log(error);
            // dispatch({ type: "CLEAR_ERROR_UPDATING" });
        });

        if (response.status !== 200) {
            const data = await response.json();
            // Ha fallado
            // dispatch(errorLogAction(String(data.error)));
            console.log(data.error);
            // dispatch({ type: "CLEAR_ERROR_UPDATING" });
        } else {
            // Ha ido todo correcto refrescamos nuestra información con la nueva
            const data = await response.json();
            // console.log(data.success);
            dispatch(updateMenusDisponiblesFechaAction(data.success));
        }
    };
}

export function busca_menus(
    fecha_pedido,
    id_direccion,
    texto_buscar,
    authToken
) {
    return async (dispatch) => {
        dispatch({ type: "UPDATING_MENU" });
        console.log(texto_buscar);
        var fecha_filtro = new Date(fecha_pedido).toISOString().slice(0, 10);
        // console.log(fecha_filtro, id_direccion, authToken);

        let formData = new FormData();
        formData.append(
            "id_direccion",
            typeof id_direccion == "undefined" ? "" : String(id_direccion)
        );
        formData.append(
            "fecha_pedido",
            typeof fecha_filtro == "undefined" ? "" : String(fecha_filtro)
        );
        formData.append(
            "texto_buscar",
            typeof texto_buscar == "undefined" ? "" : String(texto_buscar)
        );

        /*let formData = new FormData();
        formData.append(
            "id_direccion",
            String(id_direccion),
            //typeof id_direccion == "undefined" ? "" : String(id_direccion),
            "fecha_pedido",
            String(fecha_filtro)
            //typeof fecha_filtro == "undefined" ? "" : String(fecha_filtro)
        );*/

        //primero lo actualizamos en nuestro servidor, después en local
        const response = await fetch(config.API_HOST + "/api/get_menus/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: "token " + authToken,
            },
            body: formData,
        }).catch((error) => {
            // dispatch(errorLogAction(String(error)));
            console.log(error);
            // dispatch({ type: "CLEAR_ERROR_UPDATING" });
        });

        if (response.status !== 200) {
            const data = await response.json();
            // Ha fallado
            // dispatch(errorLogAction(String(data.error)));
            console.log(data.error);
            // dispatch({ type: "CLEAR_ERROR_UPDATING" });
        } else {
            // Ha ido todo correcto refrescamos nuestra información con la nueva
            const data = await response.json();
            // console.log(data.success);
            dispatch(updateMenusDisponiblesBuscarAction(data.success));
        }
    };
}

export function crea_pedido(
    cantidad,
    id_direccion,
    authToken,
    id_componente_menu,
    fecha_pedido
) {
    return async (dispatch) => {
        dispatch({ type: "UPDATING_MENU" });
        /*console.log(
            cantidad,
            id_direccion,
            authToken,
            id_componente_menu,
            fecha_pedido
        );*/

        let formData = new FormData();
        formData.append("cantidad", cantidad);
        formData.append("id_direccion", id_direccion);
        formData.append("id_componente_menu", id_componente_menu);
        formData.append("fecha_pedido", fecha_pedido);

        // console.log(formData);

        //primero lo actualizamos en nuestro servidor, después en local
        const response = await fetch(config.API_HOST + "/api/crea_pedido/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: "token " + authToken,
            },
            body: formData,
        }).catch((error) => {
            // dispatch(errorLogAction(String(error)));
            console.log(error);
            // dispatch({ type: "CLEAR_ERROR_UPDATING" });
        });

        if (response.status !== 200) {
            const data = await response.json();
            // Ha fallado
            // dispatch(errorLogAction(String(data.error)));
            console.log(data.error);
            // dispatch({ type: "CLEAR_ERROR_UPDATING" });
        } else {
            // Ha ido todo correcto refrescamos nuestra información con la nueva
            const data = await response.json();
            // console.log(data.success);
            dispatch(pedidoCreado(data.success));
            // dispatch(updateMenusDisponiblesFechaAction(data.success));
        }
    };
}

export function get_pedidos(fecha, authToken) {
    return async (dispatch) => {
        dispatch({ type: "UPDATING_PEDIDOS" });
        // console.log(fecha, authToken);

        let formData = new FormData();

        if (typeof fecha.dateString == "undefined") {
            formData.append("fecha", fecha);
        } else {
            formData.append("fecha", fecha.dateString);
        }

        //console.log(formData);

        //primero lo actualizamos en nuestro servidor, después en local
        const response = await fetch(config.API_HOST + "/api/get_pedidos/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: "token " + authToken,
            },
            body: formData,
        }).catch((error) => {
            // dispatch(errorLogAction(String(error)));
            console.log(error);
            // dispatch({ type: "CLEAR_ERROR_UPDATING" });
        });

        if (response.status !== 200) {
            const data = await response.json();
            // Ha fallado
            // dispatch(errorLogAction(String(data.error)));
            console.log(data.error);
            // dispatch({ type: "CLEAR_ERROR_UPDATING" });
        } else {
            // Ha ido todo correcto refrescamos nuestra información con la nueva
            const data = await response.json();
            //console.log(data.success);
            dispatch(updatePedidos(data.success));

            //ispatch(pedidoCreado(data.success));
            // dispatch(updateMenusDisponiblesFechaAction(data.success));
        }
    };
}

export function borra_pedido(id_pedido, authToken) {
    return async (dispatch) => {
        dispatch({ type: "UPDATING_PEDIDOS" });
        //console.log(fecha, authToken);

        let formData = new FormData();
        formData.append("id_pedido", id_pedido);

        //console.log(formData);

        //primero lo actualizamos en nuestro servidor, después en local
        const response = await fetch(config.API_HOST + "/api/borra_pedido/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: "token " + authToken,
            },
            body: formData,
        }).catch((error) => {
            // dispatch(errorLogAction(String(error)));
            console.log(error);
            // dispatch({ type: "CLEAR_ERROR_UPDATING" });
        });

        if (response.status !== 200) {
            const data = await response.json();
            // Ha fallado
            // dispatch(errorLogAction(String(data.error)));
            console.log(data.error);
            // dispatch({ type: "CLEAR_ERROR_UPDATING" });
        } else {
            // Ha ido todo correcto refrescamos nuestra información con la nueva
            const data = await response.json();
            // console.log(data.success);
            const fecha = new Date();
            dispatch(get_pedidos(fecha.toISOString().split("T")[0], authToken));

            //ispatch(pedidoCreado(data.success));
            // dispatch(updateMenusDisponiblesFechaAction(data.success));
        }
    };
}
