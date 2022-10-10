"use strict";
(self["webpackChunkms_test"] = self["webpackChunkms_test"] || []).push([["main"],{

/***/ "./ts/app.ts":
/*!*******************!*\
  !*** ./ts/app.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _types_FieldTypes_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types/FieldTypes.enum */ "./ts/types/FieldTypes.enum.ts");
/* harmony import */ var _classes_Field_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/Field.class */ "./ts/classes/Field.class.ts");
/* harmony import */ var _classes_Map_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/Map.class */ "./ts/classes/Map.class.ts");



const domFieldRef = document.getElementById('field-of-fate');
/**
 * 4x4 test-field
 */
const { empty, bomb } = _types_FieldTypes_enum__WEBPACK_IMPORTED_MODULE_0__.FieldTypes;
const fieldArray = [
    [empty, empty, empty, empty],
    [empty, bomb, empty, empty],
    [empty, empty, empty, empty],
    [empty, empty, empty, bomb],
];
new _classes_Map_class__WEBPACK_IMPORTED_MODULE_2__.Map(domFieldRef, fieldArray.map((fieldRow) => {
    return fieldRow.map((field) => {
        return new _classes_Field_class__WEBPACK_IMPORTED_MODULE_1__.Field(field);
    });
}));


/***/ }),

/***/ "./ts/classes/Field.class.ts":
/*!***********************************!*\
  !*** ./ts/classes/Field.class.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Field": () => (/* binding */ Field)
/* harmony export */ });
/* harmony import */ var _ImageLoader_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ImageLoader.class */ "./ts/classes/ImageLoader.class.ts");

class Field {
    constructor(type) {
        this.type = type;
        const tagRef = document.createElement('img');
        tagRef.src = '/assets/hidden.png';
        tagRef.classList.add('field');
        tagRef.onclick = this.reveal.bind(this);
        tagRef.addEventListener('contextmenu', this.flag.bind(this));
        this.tagRef = tagRef;
    }
    flag(event) {
        event.preventDefault();
        if (this.isRevealed) {
            return;
        }
        if (this.isFlagged) {
            this.tagRef.src = _ImageLoader_class__WEBPACK_IMPORTED_MODULE_0__.ImageLoader.getCachedUrl(this.isRevealed ? `assets/${this.type}.png` : '/assets/hidden.png');
        }
        else {
            this.tagRef.src = _ImageLoader_class__WEBPACK_IMPORTED_MODULE_0__.ImageLoader.getCachedUrl(`assets/flag.png`);
        }
        this.isFlagged = !this.isFlagged;
    }
    reveal() {
        if (!this.isFlagged) {
            this.isRevealed = true;
            this.tagRef.src = _ImageLoader_class__WEBPACK_IMPORTED_MODULE_0__.ImageLoader.getCachedUrl(`assets/${this.type}.png`);
            this.tagRef.onclick = () => { };
        }
    }
    getTagRef() {
        return this.tagRef;
    }
}


/***/ }),

/***/ "./ts/classes/ImageLoader.class.ts":
/*!*****************************************!*\
  !*** ./ts/classes/ImageLoader.class.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageLoader": () => (/* binding */ ImageLoader)
/* harmony export */ });
class ImageLoader {
    static preloadImages(...images) {
        images.forEach(imageUrl => {
            fetch(imageUrl)
                .then(res => res.blob())
                .then(blob => {
                this.cachedBlobUrls[imageUrl] = URL.createObjectURL(blob);
            });
            const image = new Image();
            image.src = imageUrl;
        });
    }
    static getCachedUrl(url) {
        if (url in this.cachedBlobUrls) {
            return this.cachedBlobUrls[url];
        }
        this.preloadImages(url);
        return url;
    }
}
ImageLoader.cachedBlobUrls = {};


/***/ }),

/***/ "./ts/classes/Map.class.ts":
/*!*********************************!*\
  !*** ./ts/classes/Map.class.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Map": () => (/* binding */ Map)
/* harmony export */ });
/* harmony import */ var _types_FieldTypes_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types/FieldTypes.enum */ "./ts/types/FieldTypes.enum.ts");
/* harmony import */ var _ImageLoader_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ImageLoader.class */ "./ts/classes/ImageLoader.class.ts");


class Map {
    constructor(domFieldRef, fieldArray) {
        _ImageLoader_class__WEBPACK_IMPORTED_MODULE_1__.ImageLoader.preloadImages(_types_FieldTypes_enum__WEBPACK_IMPORTED_MODULE_0__.FieldTypeImageSources[_types_FieldTypes_enum__WEBPACK_IMPORTED_MODULE_0__.FieldTypes.hidden], _types_FieldTypes_enum__WEBPACK_IMPORTED_MODULE_0__.FieldTypeImageSources[_types_FieldTypes_enum__WEBPACK_IMPORTED_MODULE_0__.FieldTypes.empty], _types_FieldTypes_enum__WEBPACK_IMPORTED_MODULE_0__.FieldTypeImageSources[_types_FieldTypes_enum__WEBPACK_IMPORTED_MODULE_0__.FieldTypes.bomb], _types_FieldTypes_enum__WEBPACK_IMPORTED_MODULE_0__.FieldTypeImageSources[_types_FieldTypes_enum__WEBPACK_IMPORTED_MODULE_0__.FieldTypes.flag]);
        this.domFieldRef = domFieldRef;
        fieldArray.forEach(row => {
            this.paintRow(row);
        });
    }
    paintRow(row) {
        const fieldRowRef = document.createElement('div');
        fieldRowRef.classList.add('field-row');
        row
            .map(field => field.getTagRef())
            .forEach(fieldRef => fieldRowRef.appendChild(fieldRef));
        this.domFieldRef.appendChild(fieldRowRef);
    }
}


/***/ }),

/***/ "./ts/types/FieldTypes.enum.ts":
/*!*************************************!*\
  !*** ./ts/types/FieldTypes.enum.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FieldTypeImageSources": () => (/* binding */ FieldTypeImageSources),
/* harmony export */   "FieldTypes": () => (/* binding */ FieldTypes)
/* harmony export */ });
var FieldTypes;
(function (FieldTypes) {
    FieldTypes["hidden"] = "hidden";
    FieldTypes["empty"] = "empty";
    FieldTypes["bomb"] = "bomb";
    FieldTypes["flag"] = "flag";
})(FieldTypes || (FieldTypes = {}));
var FieldTypeImageSources;
(function (FieldTypeImageSources) {
    FieldTypeImageSources["hidden"] = "assets/hidden.png";
    FieldTypeImageSources["empty"] = "assets/empty.png";
    FieldTypeImageSources["bomb"] = "assets/bomb.png";
    FieldTypeImageSources["flag"] = "assets/flag.png";
})(FieldTypeImageSources || (FieldTypeImageSources = {}));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./ts/app.ts"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFO1lBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUUsR0FBRyxDQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFFLENBQUM7SUFDTixDQUFDO0lBRUQsUUFBUSxDQUFFLEdBQVk7UUFDcEIsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsRCxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7UUFDdEMsR0FBRzthQUNBLEdBQUcsQ0FBRSxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBRTthQUNqQyxPQUFPLENBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFFLFFBQVEsQ0FBRSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUUsV0FBVyxDQUFFLENBQUM7SUFDOUMsQ0FBQztDQUVGOzs7Ozs7Ozs7Ozs7Ozs7O0FDbENELElBQVksVUFLWDtBQUxELFdBQVksVUFBVTtJQUNwQiwrQkFBaUI7SUFDakIsNkJBQWU7SUFDZiwyQkFBYTtJQUNiLDJCQUFhO0FBQ2YsQ0FBQyxFQUxXLFVBQVUsS0FBVixVQUFVLFFBS3JCO0FBRUQsSUFBWSxxQkFLWDtBQUxELFdBQVkscUJBQXFCO0lBQy9CLHFEQUE0QjtJQUM1QixtREFBMEI7SUFDMUIsaURBQXdCO0lBQ3hCLGlEQUF3QjtBQUMxQixDQUFDLEVBTFcscUJBQXFCLEtBQXJCLHFCQUFxQixRQUtoQyIsInNvdXJjZXMiOlsid2VicGFjazovL21zLXRlc3QvLi90cy9hcHAudHMiLCJ3ZWJwYWNrOi8vbXMtdGVzdC8uL3RzL2NsYXNzZXMvRmllbGQuY2xhc3MudHMiLCJ3ZWJwYWNrOi8vbXMtdGVzdC8uL3RzL2NsYXNzZXMvSW1hZ2VMb2FkZXIuY2xhc3MudHMiLCJ3ZWJwYWNrOi8vbXMtdGVzdC8uL3RzL2NsYXNzZXMvTWFwLmNsYXNzLnRzIiwid2VicGFjazovL21zLXRlc3QvLi90cy90eXBlcy9GaWVsZFR5cGVzLmVudW0udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmllbGRUeXBlcyB9IGZyb20gJy4vdHlwZXMvRmllbGRUeXBlcy5lbnVtJztcclxuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuL2NsYXNzZXMvRmllbGQuY2xhc3MnO1xyXG5pbXBvcnQgeyBNYXAgfSBmcm9tICcuL2NsYXNzZXMvTWFwLmNsYXNzJztcclxuXHJcbmNvbnN0IGRvbUZpZWxkUmVmID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpZWxkLW9mLWZhdGUnKSBhcyBIVE1MRGl2RWxlbWVudDtcclxuXHJcbi8qKlxyXG4gKiA0eDQgdGVzdC1maWVsZFxyXG4gKi9cclxuY29uc3QgeyBlbXB0eSwgYm9tYiB9ID0gRmllbGRUeXBlcztcclxuY29uc3QgZmllbGRBcnJheTogRmllbGRUeXBlc1tdW10gPSBbXHJcbiAgWyBlbXB0eSwgZW1wdHksIGVtcHR5LCBlbXB0eSBdLFxyXG4gIFsgZW1wdHksIGJvbWIsIGVtcHR5LCBlbXB0eSBdLFxyXG4gIFsgZW1wdHksIGVtcHR5LCBlbXB0eSwgZW1wdHkgXSxcclxuICBbIGVtcHR5LCBlbXB0eSwgZW1wdHksIGJvbWIgXSxcclxuXTtcclxuXHJcbm5ldyBNYXAoXHJcbiAgZG9tRmllbGRSZWYsXHJcbiAgZmllbGRBcnJheS5tYXAoICggZmllbGRSb3c6IEZpZWxkVHlwZXNbXSApID0+IHtcclxuICAgIHJldHVybiBmaWVsZFJvdy5tYXAoICggZmllbGQ6IEZpZWxkVHlwZXMgKSA9PiB7XHJcbiAgICAgIHJldHVybiBuZXcgRmllbGQoIGZpZWxkICk7XHJcbiAgICB9IClcclxuICB9IClcclxuKVxyXG4iLCJpbXBvcnQgeyBGaWVsZFR5cGVzIH0gZnJvbSAnLi4vdHlwZXMvRmllbGRUeXBlcy5lbnVtJztcclxuaW1wb3J0IHsgSW1hZ2VMb2FkZXIgfSBmcm9tICcuL0ltYWdlTG9hZGVyLmNsYXNzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBGaWVsZCB7XHJcbiAgcHJpdmF0ZSB0eXBlOiBGaWVsZFR5cGVzO1xyXG4gIHByaXZhdGUgaXNSZXZlYWxlZDogYm9vbGVhbjtcclxuICBwcml2YXRlIGlzRmxhZ2dlZDogYm9vbGVhbjtcclxuICBwcml2YXRlIHRhZ1JlZjogSFRNTEltYWdlRWxlbWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoIHR5cGU6IEZpZWxkVHlwZXMgKSB7XHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG5cclxuICAgIGNvbnN0IHRhZ1JlZiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdpbWcnICk7XHJcbiAgICB0YWdSZWYuc3JjID0gJy9hc3NldHMvaGlkZGVuLnBuZyc7XHJcbiAgICB0YWdSZWYuY2xhc3NMaXN0LmFkZCggJ2ZpZWxkJyApO1xyXG4gICAgdGFnUmVmLm9uY2xpY2sgPSB0aGlzLnJldmVhbC5iaW5kKCB0aGlzICk7XHJcbiAgICB0YWdSZWYuYWRkRXZlbnRMaXN0ZW5lciggJ2NvbnRleHRtZW51JywgdGhpcy5mbGFnLmJpbmQoIHRoaXMgKSApO1xyXG4gICAgdGhpcy50YWdSZWYgPSB0YWdSZWZcclxuICB9XHJcblxyXG4gIGZsYWcoIGV2ZW50OiBNb3VzZUV2ZW50ICk6IHZvaWQge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBpZiAoIHRoaXMuaXNSZXZlYWxlZCApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggdGhpcy5pc0ZsYWdnZWQgKSB7XHJcbiAgICAgIHRoaXMudGFnUmVmLnNyYyA9IEltYWdlTG9hZGVyLmdldENhY2hlZFVybCggdGhpcy5pc1JldmVhbGVkID8gYGFzc2V0cy8ke3RoaXMudHlwZX0ucG5nYCA6ICcvYXNzZXRzL2hpZGRlbi5wbmcnICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnRhZ1JlZi5zcmMgPSBJbWFnZUxvYWRlci5nZXRDYWNoZWRVcmwoIGBhc3NldHMvZmxhZy5wbmdgICk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pc0ZsYWdnZWQgPSAhdGhpcy5pc0ZsYWdnZWQ7XHJcbiAgfVxyXG5cclxuICByZXZlYWwoKTogdm9pZCB7XHJcbiAgICBpZiAoICF0aGlzLmlzRmxhZ2dlZCApIHtcclxuICAgICAgdGhpcy5pc1JldmVhbGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy50YWdSZWYuc3JjID0gSW1hZ2VMb2FkZXIuZ2V0Q2FjaGVkVXJsKCBgYXNzZXRzLyR7dGhpcy50eXBlfS5wbmdgICk7XHJcbiAgICAgIHRoaXMudGFnUmVmLm9uY2xpY2sgPSAoKSA9PiB7fTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFRhZ1JlZigpOiBIVE1MSW1hZ2VFbGVtZW50IHtcclxuICAgIHJldHVybiB0aGlzLnRhZ1JlZjtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIEltYWdlTG9hZGVyIHtcclxuICBzdGF0aWMgY2FjaGVkQmxvYlVybHM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge31cclxuXHJcbiAgc3RhdGljIHByZWxvYWRJbWFnZXMoLi4uaW1hZ2VzOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgaW1hZ2VzLmZvckVhY2goaW1hZ2VVcmwgPT4ge1xyXG4gICAgICBmZXRjaCggaW1hZ2VVcmwgKVxyXG4gICAgICAgIC50aGVuKCByZXMgPT4gcmVzLmJsb2IoKSApXHJcbiAgICAgICAgLnRoZW4oIGJsb2IgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jYWNoZWRCbG9iVXJsc1sgaW1hZ2VVcmwgXSA9IFVSTC5jcmVhdGVPYmplY3RVUkwoIGJsb2IgYXMgQmxvYiApO1xyXG4gICAgICAgIH0gKTtcclxuICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgaW1hZ2Uuc3JjID0gaW1hZ2VVcmw7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRDYWNoZWRVcmwoIHVybDogc3RyaW5nICk6IHN0cmluZyB7XHJcbiAgICBpZiAoIHVybCBpbiB0aGlzLmNhY2hlZEJsb2JVcmxzICkge1xyXG4gICAgICByZXR1cm4gdGhpcy5jYWNoZWRCbG9iVXJsc1sgdXJsIF07XHJcbiAgICB9XHJcbiAgICB0aGlzLnByZWxvYWRJbWFnZXMoIHVybCApO1xyXG4gICAgcmV0dXJuIHVybDtcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBGaWVsZCB9IGZyb20gJy4vRmllbGQuY2xhc3MnO1xyXG5pbXBvcnQgeyBGaWVsZFR5cGVJbWFnZVNvdXJjZXMsIEZpZWxkVHlwZXMgfSBmcm9tICcuLi90eXBlcy9GaWVsZFR5cGVzLmVudW0nO1xyXG5pbXBvcnQgeyBJbWFnZUxvYWRlciB9IGZyb20gJy4vSW1hZ2VMb2FkZXIuY2xhc3MnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1hcCB7XHJcbiAgZG9tRmllbGRSZWY6IEhUTUxEaXZFbGVtZW50O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGRvbUZpZWxkUmVmOiBIVE1MRGl2RWxlbWVudCxcclxuICAgIGZpZWxkQXJyYXk6IEZpZWxkW11bXSxcclxuICApIHtcclxuICAgIEltYWdlTG9hZGVyLnByZWxvYWRJbWFnZXMoXHJcbiAgICAgIEZpZWxkVHlwZUltYWdlU291cmNlc1tGaWVsZFR5cGVzLmhpZGRlbl0sXHJcbiAgICAgIEZpZWxkVHlwZUltYWdlU291cmNlc1tGaWVsZFR5cGVzLmVtcHR5XSxcclxuICAgICAgRmllbGRUeXBlSW1hZ2VTb3VyY2VzW0ZpZWxkVHlwZXMuYm9tYl0sXHJcbiAgICAgIEZpZWxkVHlwZUltYWdlU291cmNlc1tGaWVsZFR5cGVzLmZsYWddLFxyXG4gICAgKVxyXG5cclxuICAgIHRoaXMuZG9tRmllbGRSZWYgPSBkb21GaWVsZFJlZjtcclxuXHJcbiAgICBmaWVsZEFycmF5LmZvckVhY2goIHJvdyA9PiB7XHJcbiAgICAgIHRoaXMucGFpbnRSb3coIHJvdyApO1xyXG4gICAgfSApO1xyXG4gIH1cclxuXHJcbiAgcGFpbnRSb3coIHJvdzogRmllbGRbXSApOiB2b2lkIHtcclxuICAgIGNvbnN0IGZpZWxkUm93UmVmID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBmaWVsZFJvd1JlZi5jbGFzc0xpc3QuYWRkKCdmaWVsZC1yb3cnKVxyXG4gICAgcm93XHJcbiAgICAgIC5tYXAoIGZpZWxkID0+IGZpZWxkLmdldFRhZ1JlZigpIClcclxuICAgICAgLmZvckVhY2goIGZpZWxkUmVmID0+IGZpZWxkUm93UmVmLmFwcGVuZENoaWxkKCBmaWVsZFJlZiApKTtcclxuICAgIHRoaXMuZG9tRmllbGRSZWYuYXBwZW5kQ2hpbGQoIGZpZWxkUm93UmVmICk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJleHBvcnQgZW51bSBGaWVsZFR5cGVzIHtcclxuICBoaWRkZW4gPSAnaGlkZGVuJyxcclxuICBlbXB0eSA9ICdlbXB0eScsXHJcbiAgYm9tYiA9ICdib21iJyxcclxuICBmbGFnID0gJ2ZsYWcnLFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBGaWVsZFR5cGVJbWFnZVNvdXJjZXMge1xyXG4gIGhpZGRlbiA9ICdhc3NldHMvaGlkZGVuLnBuZycsXHJcbiAgZW1wdHkgPSAnYXNzZXRzL2VtcHR5LnBuZycsXHJcbiAgYm9tYiA9ICdhc3NldHMvYm9tYi5wbmcnLFxyXG4gIGZsYWcgPSAnYXNzZXRzL2ZsYWcucG5nJyxcclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=