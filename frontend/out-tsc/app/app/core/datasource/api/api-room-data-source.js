import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment';
import * as i0 from "@angular/core";
const API = environment.apiBaseUrl + '/rooms';
export class ApiRoomDataSource {
    http = inject(HttpClient);
    base = API;
    list(query = {}) {
        let params = new HttpParams();
        if (query.campusId) {
            params = params.set('campusId', query.campusId);
        }
        if (query.building) {
            params = params.set('building', query.building);
        }
        if (query.roomType) {
            params = params.set('roomType', query.roomType);
        }
        if (query.search) {
            params = params.set('search', query.search);
        }
        if (query.includeArchived) {
            params = params.set('includeArchived', 'true');
        }
        return this.http.get(this.base, { params });
    }
    options() {
        return this.http.get(this.base + '/options');
    }
    get(id) {
        return this.http.get(this.base + '/' + id);
    }
    create(payload) {
        return this.http.post(this.base, payload);
    }
    update(id, payload) {
        return this.http.put(this.base + '/' + id, payload);
    }
    archive(id) {
        return this.http.post(this.base + '/' + id + '/archive', {});
    }
    restore(id) {
        return this.http.post(this.base + '/' + id + '/restore', {});
    }
    static ɵfac = function ApiRoomDataSource_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiRoomDataSource)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiRoomDataSource, factory: ApiRoomDataSource.ɵfac });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiRoomDataSource, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=api-room-data-source.js.map