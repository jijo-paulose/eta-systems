import * as service from "./service";
import notification from "../../components/notification";

export default {
    state: {

    },
    reducers: {
        onRequest(state) {
            return {
                ...state,
                loading: true
            };
        },
        onError(state, data ) {
            let err = data && data.message ? data.message :"Please try again later";
            notification("error", err);
            return {
                ...state,
                loading: false
            };
        },
        onSetLocationSuccess(state, data) {
            return {
                ...state,
                loading: false,
                location: data,
            };
        },
        onGetLocationSuccess(state, data) {
            return {
                ...state,
                loading: false,
            };
        },
        onGenarateOrderSuccess(state, data) {
            return {
                ...state,
                loading: false,
                orders: data,
            };
        },
        onListOrderSuccess(state, data) {
            return {
                ...state,
                loading: false,
                orders: data,
            };
        },
        onUpdateOrderSuccess(state, data) {
            return {
                ...state,
                loading: false,
                orders: data,
            };
        },
    },
    effects: {
        async setLocation(payload, rootState) {
            this.onRequest();
            try {
                let res = await service.setLocation(payload);
                this.onSetLocationSuccess(res.data);
                return res;
            } catch (e) {
                this.onError(e);
            }
        },
        async getLocation(payload, rootState) {
            this.onRequest();
            try {
                let res = await service.getLocation(payload);
                this.onGetLocationSuccess(res.data);
                return res;
            } catch (e) {
                this.onError(e);
            }
        },
        async genarateOrder(payload, rootState) {
            console.log('genarateOrder')
            this.onRequest();
            try {
                let res = await service.genarateOrder(payload);
                this.onGenarateOrderSuccess(res.data);
                return res;
            } catch (e) {
                this.onError(e);
            }
        },

        async listOrder(payload, rootState) {
            this.onRequest();
            try {
                let res = await service.listOrder(payload);
                this.onListOrderSuccess(res.data);
                return res;
            } catch (e) {
                this.onError(e);
            }
        },
        async updateOrder(payload, rootState) {
            this.onRequest();
            try {
                let res = await service.updateOrder(payload);
                this.onUpdateOrderSuccess(res.data);
                return res;
            } catch (e) {
                this.onError(e);
            }
        },
       
    }
};
