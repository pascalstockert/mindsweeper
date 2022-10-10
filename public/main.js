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
    [bomb, bomb, empty, empty, empty, empty, empty, empty],
    [empty, bomb, empty, empty, empty, empty, empty, empty],
    [empty, empty, empty, empty, empty, empty, empty, empty],
    [empty, empty, empty, empty, bomb, empty, empty, empty],
    [empty, empty, empty, empty, bomb, empty, empty, empty],
    [empty, empty, empty, empty, empty, empty, empty, empty],
    [empty, empty, empty, empty, empty, empty, empty, empty],
    [empty, empty, empty, empty, empty, empty, empty, empty],
];
new _classes_Map_class__WEBPACK_IMPORTED_MODULE_2__.Map(domFieldRef, fieldArray.map((fieldRow, y) => {
    return fieldRow.map((field, x) => {
        return new _classes_Field_class__WEBPACK_IMPORTED_MODULE_1__.Field(field, { x, y });
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
/* harmony import */ var _Map_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Map.class */ "./ts/classes/Map.class.ts");


class Field {
    constructor(type, coordinates) {
        this.type = type;
        this.coordinates = coordinates;
        const tagRef = document.createElement('img');
        tagRef.src = '/assets/hidden.png';
        tagRef.draggable = false;
        tagRef.style.userSelect = 'none';
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
            console.log(_Map_class__WEBPACK_IMPORTED_MODULE_1__.Map.countAdjescentBombs(_Map_class__WEBPACK_IMPORTED_MODULE_1__.Map.map, this.coordinates.x, this.coordinates.y));
            this.isRevealed = true;
            this.tagRef.src = _ImageLoader_class__WEBPACK_IMPORTED_MODULE_0__.ImageLoader.getCachedUrl(`assets/${this.type}.png`);
            this.tagRef.onclick = () => { };
        }
    }
    highlight() {
        this.tagRef.style.border = '2px solid rgba(0, 255, 255, 0.4)';
        this.tagRef.style.boxSizing = 'border-box';
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
        Map.map = fieldArray;
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
    static countAdjescentBombs(map, x, y) {
        // Move index of clicked position for easier looping
        x -= 1;
        y -= 1;
        const [height, width] = [map.length, map[0].length];
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            if (x + i % 3 >= 0 && // Cover left out-of-bounds
                y + i / 3 >= 0 && // Cover top out-of-bounds
                x + i % 3 < width && // Cover right out-of-bounds
                y + i / 3 < height // Cover bottom out-of-bounds
            ) {
                sum += Number(map[y + Math.floor(i / 3)][x + i % 3].type === _types_FieldTypes_enum__WEBPACK_IMPORTED_MODULE_0__.FieldTypes.bomb);
            }
        }
        return sum;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQU8sMEJBQTBCO2dCQUMvQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLElBQUksNEJBQTRCO2dCQUNqRCxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUcsNkJBQTZCO2NBQ2xEO2dCQUNBLEdBQUcsSUFBSSxNQUFNLENBQUUsR0FBRyxDQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUMsR0FBRyxDQUFDLENBQUUsQ0FBRSxDQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFFLENBQUMsSUFBSSxLQUFLLG1FQUFlLENBQUUsQ0FBQzthQUN2RjtTQUVGO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0NBRUY7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1REQsSUFBWSxVQUtYO0FBTEQsV0FBWSxVQUFVO0lBQ3BCLCtCQUFpQjtJQUNqQiw2QkFBZTtJQUNmLDJCQUFhO0lBQ2IsMkJBQWE7QUFDZixDQUFDLEVBTFcsVUFBVSxLQUFWLFVBQVUsUUFLckI7QUFFRCxJQUFZLHFCQUtYO0FBTEQsV0FBWSxxQkFBcUI7SUFDL0IscURBQTRCO0lBQzVCLG1EQUEwQjtJQUMxQixpREFBd0I7SUFDeEIsaURBQXdCO0FBQzFCLENBQUMsRUFMVyxxQkFBcUIsS0FBckIscUJBQXFCLFFBS2hDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXMtdGVzdC8uL3RzL2FwcC50cyIsIndlYnBhY2s6Ly9tcy10ZXN0Ly4vdHMvY2xhc3Nlcy9GaWVsZC5jbGFzcy50cyIsIndlYnBhY2s6Ly9tcy10ZXN0Ly4vdHMvY2xhc3Nlcy9JbWFnZUxvYWRlci5jbGFzcy50cyIsIndlYnBhY2s6Ly9tcy10ZXN0Ly4vdHMvY2xhc3Nlcy9NYXAuY2xhc3MudHMiLCJ3ZWJwYWNrOi8vbXMtdGVzdC8uL3RzL3R5cGVzL0ZpZWxkVHlwZXMuZW51bS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGaWVsZFR5cGVzIH0gZnJvbSAnLi90eXBlcy9GaWVsZFR5cGVzLmVudW0nO1xyXG5pbXBvcnQgeyBGaWVsZCB9IGZyb20gJy4vY2xhc3Nlcy9GaWVsZC5jbGFzcyc7XHJcbmltcG9ydCB7IE1hcCB9IGZyb20gJy4vY2xhc3Nlcy9NYXAuY2xhc3MnO1xyXG5cclxuY29uc3QgZG9tRmllbGRSZWYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmllbGQtb2YtZmF0ZScpIGFzIEhUTUxEaXZFbGVtZW50O1xyXG5cclxuLyoqXHJcbiAqIDR4NCB0ZXN0LWZpZWxkXHJcbiAqL1xyXG5jb25zdCB7IGVtcHR5LCBib21iIH0gPSBGaWVsZFR5cGVzO1xyXG5jb25zdCBmaWVsZEFycmF5OiBGaWVsZFR5cGVzW11bXSA9IFtcclxuICBbIGJvbWIsIGJvbWIsIGVtcHR5LCBlbXB0eSwgZW1wdHksIGVtcHR5LCBlbXB0eSwgZW1wdHkgXSxcclxuICBbIGVtcHR5LCBib21iLCBlbXB0eSwgZW1wdHksIGVtcHR5LCBlbXB0eSwgZW1wdHksIGVtcHR5IF0sXHJcbiAgWyBlbXB0eSwgZW1wdHksIGVtcHR5LCBlbXB0eSwgZW1wdHksIGVtcHR5LCBlbXB0eSwgZW1wdHkgXSxcclxuICBbIGVtcHR5LCBlbXB0eSwgZW1wdHksIGVtcHR5LCBib21iLCBlbXB0eSwgZW1wdHksIGVtcHR5IF0sXHJcbiAgWyBlbXB0eSwgZW1wdHksIGVtcHR5LCBlbXB0eSwgYm9tYiwgZW1wdHksIGVtcHR5LCBlbXB0eSBdLFxyXG4gIFsgZW1wdHksIGVtcHR5LCBlbXB0eSwgZW1wdHksIGVtcHR5LCBlbXB0eSwgZW1wdHksIGVtcHR5IF0sXHJcbiAgWyBlbXB0eSwgZW1wdHksIGVtcHR5LCBlbXB0eSwgZW1wdHksIGVtcHR5LCBlbXB0eSwgZW1wdHkgXSxcclxuICBbIGVtcHR5LCBlbXB0eSwgZW1wdHksIGVtcHR5LCBlbXB0eSwgZW1wdHksIGVtcHR5LCBlbXB0eSBdLFxyXG5cclxuXTtcclxuXHJcbm5ldyBNYXAoXHJcbiAgZG9tRmllbGRSZWYsXHJcbiAgZmllbGRBcnJheS5tYXAoICggZmllbGRSb3c6IEZpZWxkVHlwZXNbXSwgeTogbnVtYmVyICkgPT4ge1xyXG4gICAgcmV0dXJuIGZpZWxkUm93Lm1hcCggKCBmaWVsZDogRmllbGRUeXBlcywgeDogbnVtYmVyICkgPT4ge1xyXG4gICAgICByZXR1cm4gbmV3IEZpZWxkKCBmaWVsZCwgeyB4LCB5IH0gKTtcclxuICAgIH0gKVxyXG4gIH0gKVxyXG4pXHJcbiIsImltcG9ydCB7IEZpZWxkVHlwZXMgfSBmcm9tICcuLi90eXBlcy9GaWVsZFR5cGVzLmVudW0nO1xyXG5pbXBvcnQgeyBJbWFnZUxvYWRlciB9IGZyb20gJy4vSW1hZ2VMb2FkZXIuY2xhc3MnO1xyXG5pbXBvcnQgeyBNYXAgfSBmcm9tICcuL01hcC5jbGFzcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgRmllbGQge1xyXG4gIHB1YmxpYyB0eXBlOiBGaWVsZFR5cGVzO1xyXG4gIHByaXZhdGUgaXNSZXZlYWxlZDogYm9vbGVhbjtcclxuICBwcml2YXRlIGlzRmxhZ2dlZDogYm9vbGVhbjtcclxuICBwcml2YXRlIHRhZ1JlZjogSFRNTEltYWdlRWxlbWVudDtcclxuICBwcml2YXRlIGNvb3JkaW5hdGVzOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKCB0eXBlOiBGaWVsZFR5cGVzLCBjb29yZGluYXRlczogeyB4OiBudW1iZXIsIHk6IG51bWJlciB9ICkge1xyXG4gICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIHRoaXMuY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlcztcclxuXHJcbiAgICBjb25zdCB0YWdSZWYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnaW1nJyApO1xyXG4gICAgdGFnUmVmLnNyYyA9ICcvYXNzZXRzL2hpZGRlbi5wbmcnO1xyXG4gICAgdGFnUmVmLmRyYWdnYWJsZSA9IGZhbHNlO1xyXG4gICAgdGFnUmVmLnN0eWxlLnVzZXJTZWxlY3QgPSAnbm9uZSc7XHJcbiAgICB0YWdSZWYuY2xhc3NMaXN0LmFkZCggJ2ZpZWxkJyApO1xyXG4gICAgdGFnUmVmLm9uY2xpY2sgPSB0aGlzLnJldmVhbC5iaW5kKCB0aGlzICk7XHJcbiAgICB0YWdSZWYuYWRkRXZlbnRMaXN0ZW5lciggJ2NvbnRleHRtZW51JywgdGhpcy5mbGFnLmJpbmQoIHRoaXMgKSApO1xyXG4gICAgdGhpcy50YWdSZWYgPSB0YWdSZWZcclxuICB9XHJcblxyXG4gIGZsYWcoIGV2ZW50OiBNb3VzZUV2ZW50ICk6IHZvaWQge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBpZiAoIHRoaXMuaXNSZXZlYWxlZCApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggdGhpcy5pc0ZsYWdnZWQgKSB7XHJcbiAgICAgIHRoaXMudGFnUmVmLnNyYyA9IEltYWdlTG9hZGVyLmdldENhY2hlZFVybCggdGhpcy5pc1JldmVhbGVkID8gYGFzc2V0cy8ke3RoaXMudHlwZX0ucG5nYCA6ICcvYXNzZXRzL2hpZGRlbi5wbmcnICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnRhZ1JlZi5zcmMgPSBJbWFnZUxvYWRlci5nZXRDYWNoZWRVcmwoIGBhc3NldHMvZmxhZy5wbmdgICk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pc0ZsYWdnZWQgPSAhdGhpcy5pc0ZsYWdnZWQ7XHJcbiAgfVxyXG5cclxuICByZXZlYWwoKTogdm9pZCB7XHJcbiAgICBpZiAoICF0aGlzLmlzRmxhZ2dlZCApIHtcclxuICAgICAgY29uc29sZS5sb2coIE1hcC5jb3VudEFkamVzY2VudEJvbWJzKCBNYXAubWFwLCB0aGlzLmNvb3JkaW5hdGVzLngsIHRoaXMuY29vcmRpbmF0ZXMueSApICk7XHJcbiAgICAgIHRoaXMuaXNSZXZlYWxlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMudGFnUmVmLnNyYyA9IEltYWdlTG9hZGVyLmdldENhY2hlZFVybCggYGFzc2V0cy8ke3RoaXMudHlwZX0ucG5nYCApO1xyXG4gICAgICB0aGlzLnRhZ1JlZi5vbmNsaWNrID0gKCkgPT4ge307XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoaWdobGlnaHQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnRhZ1JlZi5zdHlsZS5ib3JkZXIgPSAnMnB4IHNvbGlkIHJnYmEoMCwgMjU1LCAyNTUsIDAuNCknO1xyXG4gICAgdGhpcy50YWdSZWYuc3R5bGUuYm94U2l6aW5nID0gJ2JvcmRlci1ib3gnO1xyXG4gIH1cclxuXHJcbiAgZ2V0VGFnUmVmKCk6IEhUTUxJbWFnZUVsZW1lbnQge1xyXG4gICAgcmV0dXJuIHRoaXMudGFnUmVmO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgSW1hZ2VMb2FkZXIge1xyXG4gIHN0YXRpYyBjYWNoZWRCbG9iVXJsczoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7fVxyXG5cclxuICBzdGF0aWMgcHJlbG9hZEltYWdlcyguLi5pbWFnZXM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICBpbWFnZXMuZm9yRWFjaChpbWFnZVVybCA9PiB7XHJcbiAgICAgIGZldGNoKCBpbWFnZVVybCApXHJcbiAgICAgICAgLnRoZW4oIHJlcyA9PiByZXMuYmxvYigpIClcclxuICAgICAgICAudGhlbiggYmxvYiA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNhY2hlZEJsb2JVcmxzWyBpbWFnZVVybCBdID0gVVJMLmNyZWF0ZU9iamVjdFVSTCggYmxvYiBhcyBCbG9iICk7XHJcbiAgICAgICAgfSApO1xyXG4gICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICBpbWFnZS5zcmMgPSBpbWFnZVVybDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldENhY2hlZFVybCggdXJsOiBzdHJpbmcgKTogc3RyaW5nIHtcclxuICAgIGlmICggdXJsIGluIHRoaXMuY2FjaGVkQmxvYlVybHMgKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNhY2hlZEJsb2JVcmxzWyB1cmwgXTtcclxuICAgIH1cclxuICAgIHRoaXMucHJlbG9hZEltYWdlcyggdXJsICk7XHJcbiAgICByZXR1cm4gdXJsO1xyXG4gIH1cclxufSIsImltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi9GaWVsZC5jbGFzcyc7XHJcbmltcG9ydCB7IEZpZWxkVHlwZUltYWdlU291cmNlcywgRmllbGRUeXBlcyB9IGZyb20gJy4uL3R5cGVzL0ZpZWxkVHlwZXMuZW51bSc7XHJcbmltcG9ydCB7IEltYWdlTG9hZGVyIH0gZnJvbSAnLi9JbWFnZUxvYWRlci5jbGFzcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgTWFwIHtcclxuICBkb21GaWVsZFJlZjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgc3RhdGljIG1hcDogRmllbGRbXVtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGRvbUZpZWxkUmVmOiBIVE1MRGl2RWxlbWVudCxcclxuICAgIGZpZWxkQXJyYXk6IEZpZWxkW11bXSxcclxuICApIHtcclxuICAgIE1hcC5tYXAgPSBmaWVsZEFycmF5O1xyXG5cclxuICAgIEltYWdlTG9hZGVyLnByZWxvYWRJbWFnZXMoXHJcbiAgICAgIEZpZWxkVHlwZUltYWdlU291cmNlc1tGaWVsZFR5cGVzLmhpZGRlbl0sXHJcbiAgICAgIEZpZWxkVHlwZUltYWdlU291cmNlc1tGaWVsZFR5cGVzLmVtcHR5XSxcclxuICAgICAgRmllbGRUeXBlSW1hZ2VTb3VyY2VzW0ZpZWxkVHlwZXMuYm9tYl0sXHJcbiAgICAgIEZpZWxkVHlwZUltYWdlU291cmNlc1tGaWVsZFR5cGVzLmZsYWddLFxyXG4gICAgKVxyXG5cclxuICAgIHRoaXMuZG9tRmllbGRSZWYgPSBkb21GaWVsZFJlZjtcclxuXHJcbiAgICBmaWVsZEFycmF5LmZvckVhY2goIHJvdyA9PiB7XHJcbiAgICAgIHRoaXMucGFpbnRSb3coIHJvdyApO1xyXG4gICAgfSApO1xyXG4gIH1cclxuXHJcbiAgcGFpbnRSb3coIHJvdzogRmllbGRbXSApOiB2b2lkIHtcclxuICAgIGNvbnN0IGZpZWxkUm93UmVmID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBmaWVsZFJvd1JlZi5jbGFzc0xpc3QuYWRkKCdmaWVsZC1yb3cnKVxyXG4gICAgcm93XHJcbiAgICAgIC5tYXAoIGZpZWxkID0+IGZpZWxkLmdldFRhZ1JlZigpIClcclxuICAgICAgLmZvckVhY2goIGZpZWxkUmVmID0+IGZpZWxkUm93UmVmLmFwcGVuZENoaWxkKCBmaWVsZFJlZiApKTtcclxuICAgIHRoaXMuZG9tRmllbGRSZWYuYXBwZW5kQ2hpbGQoIGZpZWxkUm93UmVmICk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY291bnRBZGplc2NlbnRCb21icyggbWFwOiBGaWVsZFtdW10sIHg6IG51bWJlciwgeTogbnVtYmVyICk6IG51bWJlciB7XHJcbiAgICAvLyBNb3ZlIGluZGV4IG9mIGNsaWNrZWQgcG9zaXRpb24gZm9yIGVhc2llciBsb29waW5nXHJcbiAgICB4IC09IDE7XHJcbiAgICB5IC09IDE7XHJcblxyXG4gICAgY29uc3QgWyBoZWlnaHQsIHdpZHRoIF0gPSBbIG1hcC5sZW5ndGgsIG1hcFswXS5sZW5ndGggXTtcclxuICAgIGxldCBzdW0gPSAwO1xyXG5cclxuICAgIGZvciAoIGxldCBpID0gMDsgaSA8IDk7IGkrKyApIHtcclxuXHJcbiAgICAgIGlmIChcclxuICAgICAgICB4ICsgaSAlIDMgPj0gMCAmJiAgICAvLyBDb3ZlciBsZWZ0IG91dC1vZi1ib3VuZHNcclxuICAgICAgICB5ICsgaSAvIDMgPj0gMCAmJiAgICAvLyBDb3ZlciB0b3Agb3V0LW9mLWJvdW5kc1xyXG4gICAgICAgIHggKyBpICUgMyA8IHdpZHRoICYmIC8vIENvdmVyIHJpZ2h0IG91dC1vZi1ib3VuZHNcclxuICAgICAgICB5ICsgaSAvIDMgPCBoZWlnaHQgICAvLyBDb3ZlciBib3R0b20gb3V0LW9mLWJvdW5kc1xyXG4gICAgICApIHtcclxuICAgICAgICBzdW0gKz0gTnVtYmVyKCBtYXBbIHkgKyBNYXRoLmZsb29yKCBpIC8gMyApIF1bIHggKyBpICUgMyBdLnR5cGUgPT09IEZpZWxkVHlwZXMuYm9tYiApOyAgXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3VtO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiZXhwb3J0IGVudW0gRmllbGRUeXBlcyB7XHJcbiAgaGlkZGVuID0gJ2hpZGRlbicsXHJcbiAgZW1wdHkgPSAnZW1wdHknLFxyXG4gIGJvbWIgPSAnYm9tYicsXHJcbiAgZmxhZyA9ICdmbGFnJyxcclxufVxyXG5cclxuZXhwb3J0IGVudW0gRmllbGRUeXBlSW1hZ2VTb3VyY2VzIHtcclxuICBoaWRkZW4gPSAnYXNzZXRzL2hpZGRlbi5wbmcnLFxyXG4gIGVtcHR5ID0gJ2Fzc2V0cy9lbXB0eS5wbmcnLFxyXG4gIGJvbWIgPSAnYXNzZXRzL2JvbWIucG5nJyxcclxuICBmbGFnID0gJ2Fzc2V0cy9mbGFnLnBuZycsXHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9