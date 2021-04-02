/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkshared"] = self["webpackChunkshared"] || []).push([["src_components_Box_js"],{

/***/ "../api/lib/index.js":
/*!***************************!*\
  !*** ../api/lib/index.js ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

eval("exports.fragments = {\n  user: 'User fragment',\n  cart: 'Cart fragment',\n  zip: 'Zip fragment'\n};\n\n//# sourceURL=webpack://shared/../api/lib/index.js?");

/***/ }),

/***/ "./src/components/Box.js":
/*!*******************************!*\
  !*** ./src/components/Box.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Box\": () => (/* binding */ Box),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../../node_modules/react/index.js\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ \"../../node_modules/styled-components/dist/styled-components.browser.esm.js\");\n/* harmony import */ var api_lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! api/lib */ \"../api/lib/index.js\");\n\n\n\nconsole.log('from shared/Box', api_lib__WEBPACK_IMPORTED_MODULE_1__.fragments);\nvar Box = styled_components__WEBPACK_IMPORTED_MODULE_2__.default.div.withConfig({\n  displayName: \"Box\",\n  componentId: \"xd8uld-0\"\n})([\"background:rgb(238,174,202);background:radial-gradient(circle,rgba(238,174,202,0.4) 0%,rgba(148,187,233,0.4) 100%);color:#333;border-radius:0.5rem;padding:2rem;margin:1rem;opacity:0.9;transition:opacity 0.3s linear;border:3px solid cyan;&:hover{opacity:1;}\"]);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Box);\n\n//# sourceURL=webpack://shared/./src/components/Box.js?");

/***/ })

}]);