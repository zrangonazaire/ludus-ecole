import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment';
import * as i0 from "@angular/core";
const API = environment.apiBaseUrl + '/campuses';
export class ApiCampusDataSource {
    http = inject(HttpClient);
    base = API;
    list(includeArchived = false) {
        let params = new HttpParams();
        if (includeArchived) {
            params = params.set('includeArchived', 'true');
        }
        return this.http.get(this.base, { params });
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
    static ɵfac = function ApiCampusDataSource_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiCampusDataSource)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiCampusDataSource, factory: ApiCampusDataSource.ɵfac });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiCampusDataSource, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=api-campus-data-source.js.map