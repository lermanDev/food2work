const initialState = {
    fecha_pedido: "",
    fecha_pedido_formateada: "",
    fecha_max_pedido: "",
    menus_disponibles_fecha: {
        PLATOS: [],
        ENSALADAS: [],
        TAPAS: [],
        BEBIDAS: [],
        POSTRES: [],
    },
    menus_disponibles_buscar: {},
    pedidos: [],
    actualizando_pedidos: false,
    actualizando_menus: false,

    error_log: "",
    success_log: "",
};

const PedidoReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_FECHA_PEDIDO":
            return {
                ...state,
                fecha_pedido: action.fecha_pedido,
                actualizando_menus: false,
            };
        case "UPDATE_PEDIDOS":
            return {
                ...state,
                pedidos: action.pedidos,
                actualizando_menus: false,
            };
        case "UPDATE_MENUS_DISPONIBLES_FECHA":
            return {
                ...state,
                menus_disponibles_fecha: action.menus_disponibles_fecha,
                menus_disponibles_buscar: [],
                actualizando_menus: false,
            };
        case "UPDATE_MENUS_DISPONIBLES_BUSCAR":
            return {
                ...state,
                menus_disponibles_buscar: action.menus_disponibles_buscar,
                menus_disponibles_fecha: [],
                actualizando_menus: false,
            };
        case "UPDATE_FECHA_PEDIDO":
            return {
                ...state,
                fecha_pedido: action.fecha_pedido,
                actualizando_menus: false,
            };
        case "UPDATE_FECHA_MAX_PEDIDO":
            return {
                ...state,
                fecha_max_pedido: action.fecha_max_pedido,
                actualizando_menus: false,
            };
        case "UPDATE_FECHAS":
            return {
                ...state,
                fecha_pedido: action.fecha_pedido,
                fecha_pedido_formateada: action.fecha_pedido_formateada,
                fecha_max_pedido: action.fecha_max_pedido,
                actualizando_menus: false,
            };
        case "UPDATING_MENU":
            return {
                ...state,
                actualizando_menus: true,
            };
        case "MENU_UPDATE":
            return {
                ...state,
                success_log: action.success_log,
                actualizando_menus: false,
            };
        case "UPDATING_PEDIDOS":
            return {
                ...state,
                actualizando_pedidos: true,
            };
        case "UPDATE_PEDIDOS":
            return {
                ...state,
                pedidos: action.pedidos,
                actualizando_pedidos: false,
            };
        case "MENU_UPDATE_CLEAR":
            return {
                ...state,
                success_log: "",
            };
        case "ERROR_UPDATING":
            return {
                ...state,
                error_log: action.error_log,
                actualizando_pedidos: false,
                actualizando_menus: false,
            };
        case "LIMPIA_MENUS":
            return {
                ...state,
                menus_disponibles_buscar: [],
                menus_disponibles_fecha: [],
                actualizando_menus: false,
            };
        case "CLEAR_ERROR_UPDATING":
            return {
                ...state,
                error_log: "",
                actualizando_pedidos: false,
                actualizando_menus: false,
            };
        default:
            return state;
    }
};

export default PedidoReducer;
