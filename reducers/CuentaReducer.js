const initialState = {
    usuario: "",

    nombre: "",
    apellido: "",

    id_empresa: "",
    empresa_info: [],

    notificaciones: true,

    metodo_pago: ["", ""],
    metodo_pago_posibles: [],

    direccion_defecto: 0,
    direcciones: [],

    actualizando_usuario: false,
    cargando_usuario: false,

    error_log: "",
};

const CuentaReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATING_PERFIL":
            return {
                ...state,
                actualizando_usuario: true,
            };
        case "LOADING_PERFIL":
            return {
                ...state,
                cargando_usuario: true,
            };
        case "UPDATE_PERFIL":
            return {
                ...state,
                nombre: action.nombre,
                apellido: action.apellido,
                id_empresa: action.id_empresa,
                notificaciones: action.notificaciones,
                metodo_pago: action.metodo_pago,
                direccion_defecto: action.direccion_defecto,
                actualizando_usuario: false,
            };
        case "UPDATE_NOMBRE":
            return {
                ...state,
                nombre: action.nombre,
                apellido: action.apellido,
                actualizando_usuario: false,
            };
        case "LOAD_PERFIL":
            return {
                ...state,
                usuario: action.usuario,
                nombre: action.nombre,
                apellido: action.apellido,
                id_empresa: action.id_empresa,
                empresa_info: action.empresa_info,
                notificaciones: action.notificaciones,
                metodo_pago: action.metodo_pago,
                metodo_pago_posibles: action.metodo_pago_posibles,
                direccion_defecto: action.direccion_defecto,
                direcciones: action.direcciones,
                cargando_usuario: false,
                actualizando_usuario: false,
            };
        case "UPDATE_DIRECCIONES_POSIBLES":
            return {
                ...state,
                direcciones: action.direcciones,
                actualizando_usuario: false,
            };
        case "ERROR_UPDATING":
            return {
                ...state,
                error_log: action.error_log,
                actualizando_usuario: false,
            };
        case "CLEAR_ERROR_UPDATING":
            return {
                ...state,
                error_log: "",
                actualizando_usuario: false,
            };
        default:
            return state;
    }
};

export default CuentaReducer;
