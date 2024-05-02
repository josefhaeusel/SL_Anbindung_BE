'use strict';

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

const NAMESPACE = 'scale-components';

let scopeId;
let contentRef;
let hostTagName;
let useNativeShadowDom = false;
let checkSlotFallbackVisibility = false;
let checkSlotRelocate = false;
let isSvgMode = false;
let queuePending = false;
const win = typeof window !== 'undefined' ? window : {};
const doc = win.document || { head: {} };
const H = (win.HTMLElement || class {
});
const plt = {
    $flags$: 0,
    $resourcesUrl$: '',
    jmp: (h) => h(),
    raf: (h) => requestAnimationFrame(h),
    ael: (el, eventName, listener, opts) => el.addEventListener(eventName, listener, opts),
    rel: (el, eventName, listener, opts) => el.removeEventListener(eventName, listener, opts),
    ce: (eventName, opts) => new CustomEvent(eventName, opts),
};
const supportsShadow = true;
const promiseResolve = (v) => Promise.resolve(v);
const supportsConstructibleStylesheets = /*@__PURE__*/ (() => {
        try {
            new CSSStyleSheet();
            return typeof new CSSStyleSheet().replace === 'function';
        }
        catch (e) { }
        return false;
    })()
    ;
const addHostEventListeners = (elm, hostRef, listeners, attachParentListeners) => {
    if (listeners) {
        listeners.map(([flags, name, method]) => {
            const target = getHostListenerTarget(elm, flags) ;
            const handler = hostListenerProxy(hostRef, method);
            const opts = hostListenerOpts(flags);
            plt.ael(target, name, handler, opts);
            (hostRef.$rmListeners$ = hostRef.$rmListeners$ || []).push(() => plt.rel(target, name, handler, opts));
        });
    }
};
const hostListenerProxy = (hostRef, methodName) => (ev) => {
    try {
        {
            if (hostRef.$flags$ & 256 /* isListenReady */) {
                // instance is ready, let's call it's member method for this event
                hostRef.$lazyInstance$[methodName](ev);
            }
            else {
                (hostRef.$queuedListeners$ = hostRef.$queuedListeners$ || []).push([methodName, ev]);
            }
        }
    }
    catch (e) {
        consoleError(e);
    }
};
const getHostListenerTarget = (elm, flags) => {
    if (flags & 4 /* TargetDocument */)
        return doc;
    if (flags & 8 /* TargetWindow */)
        return win;
    return elm;
};
// prettier-ignore
const hostListenerOpts = (flags) => (flags & 2 /* Capture */) !== 0;
const CONTENT_REF_ID = 'r';
const ORG_LOCATION_ID = 'o';
const SLOT_NODE_ID = 's';
const TEXT_NODE_ID = 't';
const HYDRATE_ID = 's-id';
const HYDRATED_STYLE_ID = 'sty-id';
const HYDRATE_CHILD_ID = 'c-id';
const HYDRATED_CSS = '{visibility:hidden}.hydrated{visibility:inherit}';
const XLINK_NS = 'http://www.w3.org/1999/xlink';
const createTime = (fnName, tagName = '') => {
    {
        return () => {
            return;
        };
    }
};
const uniqueTime = (key, measureText) => {
    {
        return () => {
            return;
        };
    }
};
const rootAppliedStyles = new WeakMap();
const registerStyle = (scopeId, cssText, allowCS) => {
    let style = styles.get(scopeId);
    if (supportsConstructibleStylesheets && allowCS) {
        style = (style || new CSSStyleSheet());
        style.replace(cssText);
    }
    else {
        style = cssText;
    }
    styles.set(scopeId, style);
};
const addStyle = (styleContainerNode, cmpMeta, mode, hostElm) => {
    let scopeId = getScopeId(cmpMeta);
    const style = styles.get(scopeId);
    // if an element is NOT connected then getRootNode() will return the wrong root node
    // so the fallback is to always use the document for the root node in those cases
    styleContainerNode = styleContainerNode.nodeType === 11 /* DocumentFragment */ ? styleContainerNode : doc;
    if (style) {
        if (typeof style === 'string') {
            styleContainerNode = styleContainerNode.head || styleContainerNode;
            let appliedStyles = rootAppliedStyles.get(styleContainerNode);
            let styleElm;
            if (!appliedStyles) {
                rootAppliedStyles.set(styleContainerNode, (appliedStyles = new Set()));
            }
            if (!appliedStyles.has(scopeId)) {
                if (styleContainerNode.host &&
                    (styleElm = styleContainerNode.querySelector(`[${HYDRATED_STYLE_ID}="${scopeId}"]`))) {
                    // This is only happening on native shadow-dom, do not needs CSS var shim
                    styleElm.innerHTML = style;
                }
                else {
                    {
                        styleElm = doc.createElement('style');
                        styleElm.innerHTML = style;
                    }
                    styleContainerNode.insertBefore(styleElm, styleContainerNode.querySelector('link'));
                }
                if (appliedStyles) {
                    appliedStyles.add(scopeId);
                }
            }
        }
        else if (!styleContainerNode.adoptedStyleSheets.includes(style)) {
            styleContainerNode.adoptedStyleSheets = [...styleContainerNode.adoptedStyleSheets, style];
        }
    }
    return scopeId;
};
const attachStyles = (hostRef) => {
    const cmpMeta = hostRef.$cmpMeta$;
    const elm = hostRef.$hostElement$;
    const flags = cmpMeta.$flags$;
    const endAttachStyles = createTime('attachStyles', cmpMeta.$tagName$);
    const scopeId = addStyle(elm.shadowRoot ? elm.shadowRoot : elm.getRootNode(), cmpMeta);
    if (flags & 10 /* needsScopedEncapsulation */) {
        // only required when we're NOT using native shadow dom (slot)
        // or this browser doesn't support native shadow dom
        // and this host element was NOT created with SSR
        // let's pick out the inner content for slot projection
        // create a node to represent where the original
        // content was first placed, which is useful later on
        // DOM WRITE!!
        elm['s-sc'] = scopeId;
        elm.classList.add(scopeId + '-h');
    }
    endAttachStyles();
};
const getScopeId = (cmp, mode) => 'sc-' + (cmp.$tagName$);
const convertScopedToShadow = (css) => css.replace(/\/\*!@([^\/]+)\*\/[^\{]+\{/g, '$1{');
/**
 * Default style mode id
 */
/**
 * Reusable empty obj/array
 * Don't add values to these!!
 */
const EMPTY_OBJ = {};
/**
 * Namespaces
 */
const SVG_NS = 'http://www.w3.org/2000/svg';
const HTML_NS = 'http://www.w3.org/1999/xhtml';
const isDef = (v) => v != null;
const isComplexType = (o) => {
    // https://jsperf.com/typeof-fn-object/5
    o = typeof o;
    return o === 'object' || o === 'function';
};
/**
 * Production h() function based on Preact by
 * Jason Miller (@developit)
 * Licensed under the MIT License
 * https://github.com/developit/preact/blob/master/LICENSE
 *
 * Modified for Stencil's compiler and vdom
 */
// const stack: any[] = [];
// export function h(nodeName: string | d.FunctionalComponent, vnodeData: d.PropsType, child?: d.ChildType): d.VNode;
// export function h(nodeName: string | d.FunctionalComponent, vnodeData: d.PropsType, ...children: d.ChildType[]): d.VNode;
const h = (nodeName, vnodeData, ...children) => {
    let child = null;
    let key = null;
    let slotName = null;
    let simple = false;
    let lastSimple = false;
    const vNodeChildren = [];
    const walk = (c) => {
        for (let i = 0; i < c.length; i++) {
            child = c[i];
            if (Array.isArray(child)) {
                walk(child);
            }
            else if (child != null && typeof child !== 'boolean') {
                if ((simple = typeof nodeName !== 'function' && !isComplexType(child))) {
                    child = String(child);
                }
                if (simple && lastSimple) {
                    // If the previous child was simple (string), we merge both
                    vNodeChildren[vNodeChildren.length - 1].$text$ += child;
                }
                else {
                    // Append a new vNode, if it's text, we create a text vNode
                    vNodeChildren.push(simple ? newVNode(null, child) : child);
                }
                lastSimple = simple;
            }
        }
    };
    walk(children);
    if (vnodeData) {
        // normalize class / classname attributes
        if (vnodeData.key) {
            key = vnodeData.key;
        }
        if (vnodeData.name) {
            slotName = vnodeData.name;
        }
        {
            const classData = vnodeData.className || vnodeData.class;
            if (classData) {
                vnodeData.class =
                    typeof classData !== 'object'
                        ? classData
                        : Object.keys(classData)
                            .filter((k) => classData[k])
                            .join(' ');
            }
        }
    }
    if (typeof nodeName === 'function') {
        // nodeName is a functional component
        return nodeName(vnodeData === null ? {} : vnodeData, vNodeChildren, vdomFnUtils);
    }
    const vnode = newVNode(nodeName, null);
    vnode.$attrs$ = vnodeData;
    if (vNodeChildren.length > 0) {
        vnode.$children$ = vNodeChildren;
    }
    {
        vnode.$key$ = key;
    }
    {
        vnode.$name$ = slotName;
    }
    return vnode;
};
const newVNode = (tag, text) => {
    const vnode = {
        $flags$: 0,
        $tag$: tag,
        $text$: text,
        $elm$: null,
        $children$: null,
    };
    {
        vnode.$attrs$ = null;
    }
    {
        vnode.$key$ = null;
    }
    {
        vnode.$name$ = null;
    }
    return vnode;
};
const Host = {};
const isHost = (node) => node && node.$tag$ === Host;
const vdomFnUtils = {
    forEach: (children, cb) => children.map(convertToPublic).forEach(cb),
    map: (children, cb) => children.map(convertToPublic).map(cb).map(convertToPrivate),
};
const convertToPublic = (node) => ({
    vattrs: node.$attrs$,
    vchildren: node.$children$,
    vkey: node.$key$,
    vname: node.$name$,
    vtag: node.$tag$,
    vtext: node.$text$,
});
const convertToPrivate = (node) => {
    if (typeof node.vtag === 'function') {
        const vnodeData = Object.assign({}, node.vattrs);
        if (node.vkey) {
            vnodeData.key = node.vkey;
        }
        if (node.vname) {
            vnodeData.name = node.vname;
        }
        return h(node.vtag, vnodeData, ...(node.vchildren || []));
    }
    const vnode = newVNode(node.vtag, node.vtext);
    vnode.$attrs$ = node.vattrs;
    vnode.$children$ = node.vchildren;
    vnode.$key$ = node.vkey;
    vnode.$name$ = node.vname;
    return vnode;
};
/**
 * Production setAccessor() function based on Preact by
 * Jason Miller (@developit)
 * Licensed under the MIT License
 * https://github.com/developit/preact/blob/master/LICENSE
 *
 * Modified for Stencil's compiler and vdom
 */
const setAccessor = (elm, memberName, oldValue, newValue, isSvg, flags) => {
    if (oldValue !== newValue) {
        let isProp = isMemberInElement(elm, memberName);
        let ln = memberName.toLowerCase();
        if (memberName === 'class') {
            const classList = elm.classList;
            const oldClasses = parseClassList(oldValue);
            const newClasses = parseClassList(newValue);
            classList.remove(...oldClasses.filter((c) => c && !newClasses.includes(c)));
            classList.add(...newClasses.filter((c) => c && !oldClasses.includes(c)));
        }
        else if (memberName === 'style') {
            // update style attribute, css properties and values
            {
                for (const prop in oldValue) {
                    if (!newValue || newValue[prop] == null) {
                        if (prop.includes('-')) {
                            elm.style.removeProperty(prop);
                        }
                        else {
                            elm.style[prop] = '';
                        }
                    }
                }
            }
            for (const prop in newValue) {
                if (!oldValue || newValue[prop] !== oldValue[prop]) {
                    if (prop.includes('-')) {
                        elm.style.setProperty(prop, newValue[prop]);
                    }
                    else {
                        elm.style[prop] = newValue[prop];
                    }
                }
            }
        }
        else if (memberName === 'key')
            ;
        else if (memberName === 'ref') {
            // minifier will clean this up
            if (newValue) {
                newValue(elm);
            }
        }
        else if ((!isProp ) &&
            memberName[0] === 'o' &&
            memberName[1] === 'n') {
            // Event Handlers
            // so if the member name starts with "on" and the 3rd characters is
            // a capital letter, and it's not already a member on the element,
            // then we're assuming it's an event listener
            if (memberName[2] === '-') {
                // on- prefixed events
                // allows to be explicit about the dom event to listen without any magic
                // under the hood:
                // <my-cmp on-click> // listens for "click"
                // <my-cmp on-Click> // listens for "Click"
                // <my-cmp on-ionChange> // listens for "ionChange"
                // <my-cmp on-EVENTS> // listens for "EVENTS"
                memberName = memberName.slice(3);
            }
            else if (isMemberInElement(win, ln)) {
                // standard event
                // the JSX attribute could have been "onMouseOver" and the
                // member name "onmouseover" is on the window's prototype
                // so let's add the listener "mouseover", which is all lowercased
                memberName = ln.slice(2);
            }
            else {
                // custom event
                // the JSX attribute could have been "onMyCustomEvent"
                // so let's trim off the "on" prefix and lowercase the first character
                // and add the listener "myCustomEvent"
                // except for the first character, we keep the event name case
                memberName = ln[2] + memberName.slice(3);
            }
            if (oldValue) {
                plt.rel(elm, memberName, oldValue, false);
            }
            if (newValue) {
                plt.ael(elm, memberName, newValue, false);
            }
        }
        else {
            // Set property if it exists and it's not a SVG
            const isComplex = isComplexType(newValue);
            if ((isProp || (isComplex && newValue !== null)) && !isSvg) {
                try {
                    if (!elm.tagName.includes('-')) {
                        const n = newValue == null ? '' : newValue;
                        // Workaround for Safari, moving the <input> caret when re-assigning the same valued
                        if (memberName === 'list') {
                            isProp = false;
                        }
                        else if (oldValue == null || elm[memberName] != n) {
                            elm[memberName] = n;
                        }
                    }
                    else {
                        elm[memberName] = newValue;
                    }
                }
                catch (e) { }
            }
            /**
             * Need to manually update attribute if:
             * - memberName is not an attribute
             * - if we are rendering the host element in order to reflect attribute
             * - if it's a SVG, since properties might not work in <svg>
             * - if the newValue is null/undefined or 'false'.
             */
            let xlink = false;
            {
                if (ln !== (ln = ln.replace(/^xlink\:?/, ''))) {
                    memberName = ln;
                    xlink = true;
                }
            }
            if (newValue == null || newValue === false) {
                if (newValue !== false || elm.getAttribute(memberName) === '') {
                    if (xlink) {
                        elm.removeAttributeNS(XLINK_NS, memberName);
                    }
                    else {
                        elm.removeAttribute(memberName);
                    }
                }
            }
            else if ((!isProp || flags & 4 /* isHost */ || isSvg) && !isComplex) {
                newValue = newValue === true ? '' : newValue;
                if (xlink) {
                    elm.setAttributeNS(XLINK_NS, memberName, newValue);
                }
                else {
                    elm.setAttribute(memberName, newValue);
                }
            }
        }
    }
};
const parseClassListRegex = /\s/;
const parseClassList = (value) => (!value ? [] : value.split(parseClassListRegex));
const updateElement = (oldVnode, newVnode, isSvgMode, memberName) => {
    // if the element passed in is a shadow root, which is a document fragment
    // then we want to be adding attrs/props to the shadow root's "host" element
    // if it's not a shadow root, then we add attrs/props to the same element
    const elm = newVnode.$elm$.nodeType === 11 /* DocumentFragment */ && newVnode.$elm$.host
        ? newVnode.$elm$.host
        : newVnode.$elm$;
    const oldVnodeAttrs = (oldVnode && oldVnode.$attrs$) || EMPTY_OBJ;
    const newVnodeAttrs = newVnode.$attrs$ || EMPTY_OBJ;
    {
        // remove attributes no longer present on the vnode by setting them to undefined
        for (memberName in oldVnodeAttrs) {
            if (!(memberName in newVnodeAttrs)) {
                setAccessor(elm, memberName, oldVnodeAttrs[memberName], undefined, isSvgMode, newVnode.$flags$);
            }
        }
    }
    // add new & update changed attributes
    for (memberName in newVnodeAttrs) {
        setAccessor(elm, memberName, oldVnodeAttrs[memberName], newVnodeAttrs[memberName], isSvgMode, newVnode.$flags$);
    }
};
const createElm = (oldParentVNode, newParentVNode, childIndex, parentElm) => {
    // tslint:disable-next-line: prefer-const
    const newVNode = newParentVNode.$children$[childIndex];
    let i = 0;
    let elm;
    let childNode;
    let oldVNode;
    if (!useNativeShadowDom) {
        // remember for later we need to check to relocate nodes
        checkSlotRelocate = true;
        if (newVNode.$tag$ === 'slot') {
            if (scopeId) {
                // scoped css needs to add its scoped id to the parent element
                parentElm.classList.add(scopeId + '-s');
            }
            newVNode.$flags$ |= newVNode.$children$
                ? // slot element has fallback content
                    2 /* isSlotFallback */
                : // slot element does not have fallback content
                    1 /* isSlotReference */;
        }
    }
    if (newVNode.$text$ !== null) {
        // create text node
        elm = newVNode.$elm$ = doc.createTextNode(newVNode.$text$);
    }
    else if (newVNode.$flags$ & 1 /* isSlotReference */) {
        // create a slot reference node
        elm = newVNode.$elm$ =
            doc.createTextNode('');
    }
    else {
        if (!isSvgMode) {
            isSvgMode = newVNode.$tag$ === 'svg';
        }
        // create element
        elm = newVNode.$elm$ = (doc.createElementNS(isSvgMode ? SVG_NS : HTML_NS, newVNode.$flags$ & 2 /* isSlotFallback */
                ? 'slot-fb'
                : newVNode.$tag$)
            );
        if (isSvgMode && newVNode.$tag$ === 'foreignObject') {
            isSvgMode = false;
        }
        // add css classes, attrs, props, listeners, etc.
        {
            updateElement(null, newVNode, isSvgMode);
        }
        if (isDef(scopeId) && elm['s-si'] !== scopeId) {
            // if there is a scopeId and this is the initial render
            // then let's add the scopeId as a css class
            elm.classList.add((elm['s-si'] = scopeId));
        }
        if (newVNode.$children$) {
            for (i = 0; i < newVNode.$children$.length; ++i) {
                // create the node
                childNode = createElm(oldParentVNode, newVNode, i, elm);
                // return node could have been null
                if (childNode) {
                    // append our new node
                    elm.appendChild(childNode);
                }
            }
        }
        {
            if (newVNode.$tag$ === 'svg') {
                // Only reset the SVG context when we're exiting <svg> element
                isSvgMode = false;
            }
            else if (elm.tagName === 'foreignObject') {
                // Reenter SVG context when we're exiting <foreignObject> element
                isSvgMode = true;
            }
        }
    }
    {
        elm['s-hn'] = hostTagName;
        if (newVNode.$flags$ & (2 /* isSlotFallback */ | 1 /* isSlotReference */)) {
            // remember the content reference comment
            elm['s-sr'] = true;
            // remember the content reference comment
            elm['s-cr'] = contentRef;
            // remember the slot name, or empty string for default slot
            elm['s-sn'] = newVNode.$name$ || '';
            // check if we've got an old vnode for this slot
            oldVNode = oldParentVNode && oldParentVNode.$children$ && oldParentVNode.$children$[childIndex];
            if (oldVNode && oldVNode.$tag$ === newVNode.$tag$ && oldParentVNode.$elm$) {
                // we've got an old slot vnode and the wrapper is being replaced
                // so let's move the old slot content back to it's original location
                putBackInOriginalLocation(oldParentVNode.$elm$, false);
            }
        }
    }
    return elm;
};
const putBackInOriginalLocation = (parentElm, recursive) => {
    plt.$flags$ |= 1 /* isTmpDisconnected */;
    const oldSlotChildNodes = parentElm.childNodes;
    for (let i = oldSlotChildNodes.length - 1; i >= 0; i--) {
        const childNode = oldSlotChildNodes[i];
        if (childNode['s-hn'] !== hostTagName && childNode['s-ol']) {
            // // this child node in the old element is from another component
            // // remove this node from the old slot's parent
            // childNode.remove();
            // and relocate it back to it's original location
            parentReferenceNode(childNode).insertBefore(childNode, referenceNode(childNode));
            // remove the old original location comment entirely
            // later on the patch function will know what to do
            // and move this to the correct spot in need be
            childNode['s-ol'].remove();
            childNode['s-ol'] = undefined;
            checkSlotRelocate = true;
        }
        if (recursive) {
            putBackInOriginalLocation(childNode, recursive);
        }
    }
    plt.$flags$ &= ~1 /* isTmpDisconnected */;
};
const addVnodes = (parentElm, before, parentVNode, vnodes, startIdx, endIdx) => {
    let containerElm = ((parentElm['s-cr'] && parentElm['s-cr'].parentNode) || parentElm);
    let childNode;
    if (containerElm.shadowRoot && containerElm.tagName === hostTagName) {
        containerElm = containerElm.shadowRoot;
    }
    for (; startIdx <= endIdx; ++startIdx) {
        if (vnodes[startIdx]) {
            childNode = createElm(null, parentVNode, startIdx, parentElm);
            if (childNode) {
                vnodes[startIdx].$elm$ = childNode;
                containerElm.insertBefore(childNode, referenceNode(before) );
            }
        }
    }
};
const removeVnodes = (vnodes, startIdx, endIdx, vnode, elm) => {
    for (; startIdx <= endIdx; ++startIdx) {
        if ((vnode = vnodes[startIdx])) {
            elm = vnode.$elm$;
            callNodeRefs(vnode);
            {
                // we're removing this element
                // so it's possible we need to show slot fallback content now
                checkSlotFallbackVisibility = true;
                if (elm['s-ol']) {
                    // remove the original location comment
                    elm['s-ol'].remove();
                }
                else {
                    // it's possible that child nodes of the node
                    // that's being removed are slot nodes
                    putBackInOriginalLocation(elm, true);
                }
            }
            // remove the vnode's element from the dom
            elm.remove();
        }
    }
};
const updateChildren = (parentElm, oldCh, newVNode, newCh) => {
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let idxInOld = 0;
    let i = 0;
    let oldEndIdx = oldCh.length - 1;
    let oldStartVnode = oldCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    let newEndIdx = newCh.length - 1;
    let newStartVnode = newCh[0];
    let newEndVnode = newCh[newEndIdx];
    let node;
    let elmToMove;
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (oldStartVnode == null) {
            // Vnode might have been moved left
            oldStartVnode = oldCh[++oldStartIdx];
        }
        else if (oldEndVnode == null) {
            oldEndVnode = oldCh[--oldEndIdx];
        }
        else if (newStartVnode == null) {
            newStartVnode = newCh[++newStartIdx];
        }
        else if (newEndVnode == null) {
            newEndVnode = newCh[--newEndIdx];
        }
        else if (isSameVnode(oldStartVnode, newStartVnode)) {
            patch(oldStartVnode, newStartVnode);
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];
        }
        else if (isSameVnode(oldEndVnode, newEndVnode)) {
            patch(oldEndVnode, newEndVnode);
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        else if (isSameVnode(oldStartVnode, newEndVnode)) {
            // Vnode moved right
            if ((oldStartVnode.$tag$ === 'slot' || newEndVnode.$tag$ === 'slot')) {
                putBackInOriginalLocation(oldStartVnode.$elm$.parentNode, false);
            }
            patch(oldStartVnode, newEndVnode);
            parentElm.insertBefore(oldStartVnode.$elm$, oldEndVnode.$elm$.nextSibling);
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        else if (isSameVnode(oldEndVnode, newStartVnode)) {
            // Vnode moved left
            if ((oldStartVnode.$tag$ === 'slot' || newEndVnode.$tag$ === 'slot')) {
                putBackInOriginalLocation(oldEndVnode.$elm$.parentNode, false);
            }
            patch(oldEndVnode, newStartVnode);
            parentElm.insertBefore(oldEndVnode.$elm$, oldStartVnode.$elm$);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];
        }
        else {
            // createKeyToOldIdx
            idxInOld = -1;
            {
                for (i = oldStartIdx; i <= oldEndIdx; ++i) {
                    if (oldCh[i] && oldCh[i].$key$ !== null && oldCh[i].$key$ === newStartVnode.$key$) {
                        idxInOld = i;
                        break;
                    }
                }
            }
            if (idxInOld >= 0) {
                elmToMove = oldCh[idxInOld];
                if (elmToMove.$tag$ !== newStartVnode.$tag$) {
                    node = createElm(oldCh && oldCh[newStartIdx], newVNode, idxInOld, parentElm);
                }
                else {
                    patch(elmToMove, newStartVnode);
                    oldCh[idxInOld] = undefined;
                    node = elmToMove.$elm$;
                }
                newStartVnode = newCh[++newStartIdx];
            }
            else {
                // new element
                node = createElm(oldCh && oldCh[newStartIdx], newVNode, newStartIdx, parentElm);
                newStartVnode = newCh[++newStartIdx];
            }
            if (node) {
                {
                    parentReferenceNode(oldStartVnode.$elm$).insertBefore(node, referenceNode(oldStartVnode.$elm$));
                }
            }
        }
    }
    if (oldStartIdx > oldEndIdx) {
        addVnodes(parentElm, newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].$elm$, newVNode, newCh, newStartIdx, newEndIdx);
    }
    else if (newStartIdx > newEndIdx) {
        removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
};
const isSameVnode = (vnode1, vnode2) => {
    // compare if two vnode to see if they're "technically" the same
    // need to have the same element tag, and same key to be the same
    if (vnode1.$tag$ === vnode2.$tag$) {
        if (vnode1.$tag$ === 'slot') {
            return vnode1.$name$ === vnode2.$name$;
        }
        {
            return vnode1.$key$ === vnode2.$key$;
        }
    }
    return false;
};
const referenceNode = (node) => {
    // this node was relocated to a new location in the dom
    // because of some other component's slot
    // but we still have an html comment in place of where
    // it's original location was according to it's original vdom
    return (node && node['s-ol']) || node;
};
const parentReferenceNode = (node) => (node['s-ol'] ? node['s-ol'] : node).parentNode;
const patch = (oldVNode, newVNode) => {
    const elm = (newVNode.$elm$ = oldVNode.$elm$);
    const oldChildren = oldVNode.$children$;
    const newChildren = newVNode.$children$;
    const tag = newVNode.$tag$;
    const text = newVNode.$text$;
    let defaultHolder;
    if (text === null) {
        {
            // test if we're rendering an svg element, or still rendering nodes inside of one
            // only add this to the when the compiler sees we're using an svg somewhere
            isSvgMode = tag === 'svg' ? true : tag === 'foreignObject' ? false : isSvgMode;
        }
        // element node
        {
            if (tag === 'slot')
                ;
            else {
                // either this is the first render of an element OR it's an update
                // AND we already know it's possible it could have changed
                // this updates the element's css classes, attrs, props, listeners, etc.
                updateElement(oldVNode, newVNode, isSvgMode);
            }
        }
        if (oldChildren !== null && newChildren !== null) {
            // looks like there's child vnodes for both the old and new vnodes
            updateChildren(elm, oldChildren, newVNode, newChildren);
        }
        else if (newChildren !== null) {
            // no old child vnodes, but there are new child vnodes to add
            if (oldVNode.$text$ !== null) {
                // the old vnode was text, so be sure to clear it out
                elm.textContent = '';
            }
            // add the new vnode children
            addVnodes(elm, null, newVNode, newChildren, 0, newChildren.length - 1);
        }
        else if (oldChildren !== null) {
            // no new child vnodes, but there are old child vnodes to remove
            removeVnodes(oldChildren, 0, oldChildren.length - 1);
        }
        if (isSvgMode && tag === 'svg') {
            isSvgMode = false;
        }
    }
    else if ((defaultHolder = elm['s-cr'])) {
        // this element has slotted content
        defaultHolder.parentNode.textContent = text;
    }
    else if (oldVNode.$text$ !== text) {
        // update the text content for the text only vnode
        // and also only if the text is different than before
        elm.data = text;
    }
};
const updateFallbackSlotVisibility = (elm) => {
    // tslint:disable-next-line: prefer-const
    const childNodes = elm.childNodes;
    let childNode;
    let i;
    let ilen;
    let j;
    let slotNameAttr;
    let nodeType;
    for (i = 0, ilen = childNodes.length; i < ilen; i++) {
        childNode = childNodes[i];
        if (childNode.nodeType === 1 /* ElementNode */) {
            if (childNode['s-sr']) {
                // this is a slot fallback node
                // get the slot name for this slot reference node
                slotNameAttr = childNode['s-sn'];
                // by default always show a fallback slot node
                // then hide it if there are other slots in the light dom
                childNode.hidden = false;
                for (j = 0; j < ilen; j++) {
                    nodeType = childNodes[j].nodeType;
                    if (childNodes[j]['s-hn'] !== childNode['s-hn'] || slotNameAttr !== '') {
                        // this sibling node is from a different component OR is a named fallback slot node
                        if (nodeType === 1 /* ElementNode */ && slotNameAttr === childNodes[j].getAttribute('slot')) {
                            childNode.hidden = true;
                            break;
                        }
                    }
                    else {
                        // this is a default fallback slot node
                        // any element or text node (with content)
                        // should hide the default fallback slot node
                        if (nodeType === 1 /* ElementNode */ ||
                            (nodeType === 3 /* TextNode */ && childNodes[j].textContent.trim() !== '')) {
                            childNode.hidden = true;
                            break;
                        }
                    }
                }
            }
            // keep drilling down
            updateFallbackSlotVisibility(childNode);
        }
    }
};
const relocateNodes = [];
const relocateSlotContent = (elm) => {
    // tslint:disable-next-line: prefer-const
    let childNode;
    let node;
    let hostContentNodes;
    let slotNameAttr;
    let relocateNodeData;
    let j;
    let i = 0;
    const childNodes = elm.childNodes;
    const ilen = childNodes.length;
    for (; i < ilen; i++) {
        childNode = childNodes[i];
        if (childNode['s-sr'] && (node = childNode['s-cr']) && node.parentNode) {
            // first got the content reference comment node
            // then we got it's parent, which is where all the host content is in now
            hostContentNodes = node.parentNode.childNodes;
            slotNameAttr = childNode['s-sn'];
            for (j = hostContentNodes.length - 1; j >= 0; j--) {
                node = hostContentNodes[j];
                if (!node['s-cn'] && !node['s-nr'] && node['s-hn'] !== childNode['s-hn']) {
                    // let's do some relocating to its new home
                    // but never relocate a content reference node
                    // that is suppose to always represent the original content location
                    if (isNodeLocatedInSlot(node, slotNameAttr)) {
                        // it's possible we've already decided to relocate this node
                        relocateNodeData = relocateNodes.find((r) => r.$nodeToRelocate$ === node);
                        // made some changes to slots
                        // let's make sure we also double check
                        // fallbacks are correctly hidden or shown
                        checkSlotFallbackVisibility = true;
                        node['s-sn'] = node['s-sn'] || slotNameAttr;
                        if (relocateNodeData) {
                            // previously we never found a slot home for this node
                            // but turns out we did, so let's remember it now
                            relocateNodeData.$slotRefNode$ = childNode;
                        }
                        else {
                            // add to our list of nodes to relocate
                            relocateNodes.push({
                                $slotRefNode$: childNode,
                                $nodeToRelocate$: node,
                            });
                        }
                        if (node['s-sr']) {
                            relocateNodes.map((relocateNode) => {
                                if (isNodeLocatedInSlot(relocateNode.$nodeToRelocate$, node['s-sn'])) {
                                    relocateNodeData = relocateNodes.find((r) => r.$nodeToRelocate$ === node);
                                    if (relocateNodeData && !relocateNode.$slotRefNode$) {
                                        relocateNode.$slotRefNode$ = relocateNodeData.$slotRefNode$;
                                    }
                                }
                            });
                        }
                    }
                    else if (!relocateNodes.some((r) => r.$nodeToRelocate$ === node)) {
                        // so far this element does not have a slot home, not setting slotRefNode on purpose
                        // if we never find a home for this element then we'll need to hide it
                        relocateNodes.push({
                            $nodeToRelocate$: node,
                        });
                    }
                }
            }
        }
        if (childNode.nodeType === 1 /* ElementNode */) {
            relocateSlotContent(childNode);
        }
    }
};
const isNodeLocatedInSlot = (nodeToRelocate, slotNameAttr) => {
    if (nodeToRelocate.nodeType === 1 /* ElementNode */) {
        if (nodeToRelocate.getAttribute('slot') === null && slotNameAttr === '') {
            return true;
        }
        if (nodeToRelocate.getAttribute('slot') === slotNameAttr) {
            return true;
        }
        return false;
    }
    if (nodeToRelocate['s-sn'] === slotNameAttr) {
        return true;
    }
    return slotNameAttr === '';
};
const callNodeRefs = (vNode) => {
    {
        vNode.$attrs$ && vNode.$attrs$.ref && vNode.$attrs$.ref(null);
        vNode.$children$ && vNode.$children$.map(callNodeRefs);
    }
};
const renderVdom = (hostRef, renderFnResults) => {
    const hostElm = hostRef.$hostElement$;
    const cmpMeta = hostRef.$cmpMeta$;
    const oldVNode = hostRef.$vnode$ || newVNode(null, null);
    const rootVnode = isHost(renderFnResults) ? renderFnResults : h(null, null, renderFnResults);
    hostTagName = hostElm.tagName;
    if (cmpMeta.$attrsToReflect$) {
        rootVnode.$attrs$ = rootVnode.$attrs$ || {};
        cmpMeta.$attrsToReflect$.map(([propName, attribute]) => (rootVnode.$attrs$[attribute] = hostElm[propName]));
    }
    rootVnode.$tag$ = null;
    rootVnode.$flags$ |= 4 /* isHost */;
    hostRef.$vnode$ = rootVnode;
    rootVnode.$elm$ = oldVNode.$elm$ = (hostElm.shadowRoot || hostElm );
    {
        scopeId = hostElm['s-sc'];
    }
    {
        contentRef = hostElm['s-cr'];
        useNativeShadowDom = (cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */) !== 0;
        // always reset
        checkSlotFallbackVisibility = false;
    }
    // synchronous patch
    patch(oldVNode, rootVnode);
    {
        // while we're moving nodes around existing nodes, temporarily disable
        // the disconnectCallback from working
        plt.$flags$ |= 1 /* isTmpDisconnected */;
        if (checkSlotRelocate) {
            relocateSlotContent(rootVnode.$elm$);
            let relocateData;
            let nodeToRelocate;
            let orgLocationNode;
            let parentNodeRef;
            let insertBeforeNode;
            let refNode;
            let i = 0;
            for (; i < relocateNodes.length; i++) {
                relocateData = relocateNodes[i];
                nodeToRelocate = relocateData.$nodeToRelocate$;
                if (!nodeToRelocate['s-ol']) {
                    // add a reference node marking this node's original location
                    // keep a reference to this node for later lookups
                    orgLocationNode =
                        doc.createTextNode('');
                    orgLocationNode['s-nr'] = nodeToRelocate;
                    nodeToRelocate.parentNode.insertBefore((nodeToRelocate['s-ol'] = orgLocationNode), nodeToRelocate);
                }
            }
            for (i = 0; i < relocateNodes.length; i++) {
                relocateData = relocateNodes[i];
                nodeToRelocate = relocateData.$nodeToRelocate$;
                if (relocateData.$slotRefNode$) {
                    // by default we're just going to insert it directly
                    // after the slot reference node
                    parentNodeRef = relocateData.$slotRefNode$.parentNode;
                    insertBeforeNode = relocateData.$slotRefNode$.nextSibling;
                    orgLocationNode = nodeToRelocate['s-ol'];
                    while ((orgLocationNode = orgLocationNode.previousSibling)) {
                        refNode = orgLocationNode['s-nr'];
                        if (refNode && refNode['s-sn'] === nodeToRelocate['s-sn'] && parentNodeRef === refNode.parentNode) {
                            refNode = refNode.nextSibling;
                            if (!refNode || !refNode['s-nr']) {
                                insertBeforeNode = refNode;
                                break;
                            }
                        }
                    }
                    if ((!insertBeforeNode && parentNodeRef !== nodeToRelocate.parentNode) ||
                        nodeToRelocate.nextSibling !== insertBeforeNode) {
                        // we've checked that it's worth while to relocate
                        // since that the node to relocate
                        // has a different next sibling or parent relocated
                        if (nodeToRelocate !== insertBeforeNode) {
                            if (!nodeToRelocate['s-hn'] && nodeToRelocate['s-ol']) {
                                // probably a component in the index.html that doesn't have it's hostname set
                                nodeToRelocate['s-hn'] = nodeToRelocate['s-ol'].parentNode.nodeName;
                            }
                            // add it back to the dom but in its new home
                            parentNodeRef.insertBefore(nodeToRelocate, insertBeforeNode);
                        }
                    }
                }
                else {
                    // this node doesn't have a slot home to go to, so let's hide it
                    if (nodeToRelocate.nodeType === 1 /* ElementNode */) {
                        nodeToRelocate.hidden = true;
                    }
                }
            }
        }
        if (checkSlotFallbackVisibility) {
            updateFallbackSlotVisibility(rootVnode.$elm$);
        }
        // done moving nodes around
        // allow the disconnect callback to work again
        plt.$flags$ &= ~1 /* isTmpDisconnected */;
        // always reset
        relocateNodes.length = 0;
    }
};
const getElement = (ref) => (getHostRef(ref).$hostElement$ );
const createEvent = (ref, name, flags) => {
    const elm = getElement(ref);
    return {
        emit: (detail) => {
            return emitEvent(elm, name, {
                bubbles: !!(flags & 4 /* Bubbles */),
                composed: !!(flags & 2 /* Composed */),
                cancelable: !!(flags & 1 /* Cancellable */),
                detail,
            });
        },
    };
};
/**
 * Helper function to create & dispatch a custom Event on a provided target
 * @param elm the target of the Event
 * @param name the name to give the custom Event
 * @param opts options for configuring a custom Event
 * @returns the custom Event
 */
const emitEvent = (elm, name, opts) => {
    const ev = plt.ce(name, opts);
    elm.dispatchEvent(ev);
    return ev;
};
const attachToAncestor = (hostRef, ancestorComponent) => {
    if (ancestorComponent && !hostRef.$onRenderResolve$ && ancestorComponent['s-p']) {
        ancestorComponent['s-p'].push(new Promise((r) => (hostRef.$onRenderResolve$ = r)));
    }
};
const scheduleUpdate = (hostRef, isInitialLoad) => {
    {
        hostRef.$flags$ |= 16 /* isQueuedForUpdate */;
    }
    if (hostRef.$flags$ & 4 /* isWaitingForChildren */) {
        hostRef.$flags$ |= 512 /* needsRerender */;
        return;
    }
    attachToAncestor(hostRef, hostRef.$ancestorComponent$);
    // there is no ancestor component or the ancestor component
    // has already fired off its lifecycle update then
    // fire off the initial update
    const dispatch = () => dispatchHooks(hostRef, isInitialLoad);
    return writeTask(dispatch) ;
};
const dispatchHooks = (hostRef, isInitialLoad) => {
    const endSchedule = createTime('scheduleUpdate', hostRef.$cmpMeta$.$tagName$);
    const instance = hostRef.$lazyInstance$ ;
    let promise;
    if (isInitialLoad) {
        {
            hostRef.$flags$ |= 256 /* isListenReady */;
            if (hostRef.$queuedListeners$) {
                hostRef.$queuedListeners$.map(([methodName, event]) => safeCall(instance, methodName, event));
                hostRef.$queuedListeners$ = null;
            }
        }
        {
            promise = safeCall(instance, 'componentWillLoad');
        }
    }
    else {
        {
            promise = safeCall(instance, 'componentWillUpdate');
        }
    }
    {
        promise = then(promise, () => safeCall(instance, 'componentWillRender'));
    }
    endSchedule();
    return then(promise, () => updateComponent(hostRef, instance, isInitialLoad));
};
const updateComponent = async (hostRef, instance, isInitialLoad) => {
    // updateComponent
    const elm = hostRef.$hostElement$;
    const endUpdate = createTime('update', hostRef.$cmpMeta$.$tagName$);
    const rc = elm['s-rc'];
    if (isInitialLoad) {
        // DOM WRITE!
        attachStyles(hostRef);
    }
    const endRender = createTime('render', hostRef.$cmpMeta$.$tagName$);
    {
        callRender(hostRef, instance);
    }
    if (rc) {
        // ok, so turns out there are some child host elements
        // waiting on this parent element to load
        // let's fire off all update callbacks waiting
        rc.map((cb) => cb());
        elm['s-rc'] = undefined;
    }
    endRender();
    endUpdate();
    {
        const childrenPromises = elm['s-p'];
        const postUpdate = () => postUpdateComponent(hostRef);
        if (childrenPromises.length === 0) {
            postUpdate();
        }
        else {
            Promise.all(childrenPromises).then(postUpdate);
            hostRef.$flags$ |= 4 /* isWaitingForChildren */;
            childrenPromises.length = 0;
        }
    }
};
const callRender = (hostRef, instance, elm) => {
    try {
        instance = instance.render() ;
        {
            hostRef.$flags$ &= ~16 /* isQueuedForUpdate */;
        }
        {
            hostRef.$flags$ |= 2 /* hasRendered */;
        }
        {
            {
                // looks like we've got child nodes to render into this host element
                // or we need to update the css class/attrs on the host element
                // DOM WRITE!
                {
                    renderVdom(hostRef, instance);
                }
            }
        }
    }
    catch (e) {
        consoleError(e, hostRef.$hostElement$);
    }
    return null;
};
const postUpdateComponent = (hostRef) => {
    const tagName = hostRef.$cmpMeta$.$tagName$;
    const elm = hostRef.$hostElement$;
    const endPostUpdate = createTime('postUpdate', tagName);
    const instance = hostRef.$lazyInstance$ ;
    const ancestorComponent = hostRef.$ancestorComponent$;
    {
        safeCall(instance, 'componentDidRender');
    }
    if (!(hostRef.$flags$ & 64 /* hasLoadedComponent */)) {
        hostRef.$flags$ |= 64 /* hasLoadedComponent */;
        {
            // DOM WRITE!
            addHydratedFlag(elm);
        }
        {
            safeCall(instance, 'componentDidLoad');
        }
        endPostUpdate();
        {
            hostRef.$onReadyResolve$(elm);
            if (!ancestorComponent) {
                appDidLoad();
            }
        }
    }
    else {
        {
            safeCall(instance, 'componentDidUpdate');
        }
        endPostUpdate();
    }
    {
        hostRef.$onInstanceResolve$(elm);
    }
    // load events fire from bottom to top
    // the deepest elements load first then bubbles up
    {
        if (hostRef.$onRenderResolve$) {
            hostRef.$onRenderResolve$();
            hostRef.$onRenderResolve$ = undefined;
        }
        if (hostRef.$flags$ & 512 /* needsRerender */) {
            nextTick(() => scheduleUpdate(hostRef, false));
        }
        hostRef.$flags$ &= ~(4 /* isWaitingForChildren */ | 512 /* needsRerender */);
    }
    // ( •_•)
    // ( •_•)>⌐■-■
    // (⌐■_■)
};
const appDidLoad = (who) => {
    // on appload
    // we have finish the first big initial render
    {
        addHydratedFlag(doc.documentElement);
    }
    nextTick(() => emitEvent(win, 'appload', { detail: { namespace: NAMESPACE } }));
};
const safeCall = (instance, method, arg) => {
    if (instance && instance[method]) {
        try {
            return instance[method](arg);
        }
        catch (e) {
            consoleError(e);
        }
    }
    return undefined;
};
const then = (promise, thenFn) => {
    return promise && promise.then ? promise.then(thenFn) : thenFn();
};
const addHydratedFlag = (elm) => elm.classList.add('hydrated')
    ;
const initializeClientHydrate = (hostElm, tagName, hostId, hostRef) => {
    const endHydrate = createTime('hydrateClient', tagName);
    const shadowRoot = hostElm.shadowRoot;
    const childRenderNodes = [];
    const slotNodes = [];
    const shadowRootNodes = shadowRoot ? [] : null;
    const vnode = (hostRef.$vnode$ = newVNode(tagName, null));
    if (!plt.$orgLocNodes$) {
        initializeDocumentHydrate(doc.body, (plt.$orgLocNodes$ = new Map()));
    }
    hostElm[HYDRATE_ID] = hostId;
    hostElm.removeAttribute(HYDRATE_ID);
    clientHydrate(vnode, childRenderNodes, slotNodes, shadowRootNodes, hostElm, hostElm, hostId);
    childRenderNodes.map((c) => {
        const orgLocationId = c.$hostId$ + '.' + c.$nodeId$;
        const orgLocationNode = plt.$orgLocNodes$.get(orgLocationId);
        const node = c.$elm$;
        if (orgLocationNode && supportsShadow && orgLocationNode['s-en'] === '') {
            orgLocationNode.parentNode.insertBefore(node, orgLocationNode.nextSibling);
        }
        if (!shadowRoot) {
            node['s-hn'] = tagName;
            if (orgLocationNode) {
                node['s-ol'] = orgLocationNode;
                node['s-ol']['s-nr'] = node;
            }
        }
        plt.$orgLocNodes$.delete(orgLocationId);
    });
    if (shadowRoot) {
        shadowRootNodes.map((shadowRootNode) => {
            if (shadowRootNode) {
                shadowRoot.appendChild(shadowRootNode);
            }
        });
    }
    endHydrate();
};
const clientHydrate = (parentVNode, childRenderNodes, slotNodes, shadowRootNodes, hostElm, node, hostId) => {
    let childNodeType;
    let childIdSplt;
    let childVNode;
    let i;
    if (node.nodeType === 1 /* ElementNode */) {
        childNodeType = node.getAttribute(HYDRATE_CHILD_ID);
        if (childNodeType) {
            // got the node data from the element's attribute
            // `${hostId}.${nodeId}.${depth}.${index}`
            childIdSplt = childNodeType.split('.');
            if (childIdSplt[0] === hostId || childIdSplt[0] === '0') {
                childVNode = {
                    $flags$: 0,
                    $hostId$: childIdSplt[0],
                    $nodeId$: childIdSplt[1],
                    $depth$: childIdSplt[2],
                    $index$: childIdSplt[3],
                    $tag$: node.tagName.toLowerCase(),
                    $elm$: node,
                    $attrs$: null,
                    $children$: null,
                    $key$: null,
                    $name$: null,
                    $text$: null,
                };
                childRenderNodes.push(childVNode);
                node.removeAttribute(HYDRATE_CHILD_ID);
                // this is a new child vnode
                // so ensure its parent vnode has the vchildren array
                if (!parentVNode.$children$) {
                    parentVNode.$children$ = [];
                }
                // add our child vnode to a specific index of the vnode's children
                parentVNode.$children$[childVNode.$index$] = childVNode;
                // this is now the new parent vnode for all the next child checks
                parentVNode = childVNode;
                if (shadowRootNodes && childVNode.$depth$ === '0') {
                    shadowRootNodes[childVNode.$index$] = childVNode.$elm$;
                }
            }
        }
        // recursively drill down, end to start so we can remove nodes
        for (i = node.childNodes.length - 1; i >= 0; i--) {
            clientHydrate(parentVNode, childRenderNodes, slotNodes, shadowRootNodes, hostElm, node.childNodes[i], hostId);
        }
        if (node.shadowRoot) {
            // keep drilling down through the shadow root nodes
            for (i = node.shadowRoot.childNodes.length - 1; i >= 0; i--) {
                clientHydrate(parentVNode, childRenderNodes, slotNodes, shadowRootNodes, hostElm, node.shadowRoot.childNodes[i], hostId);
            }
        }
    }
    else if (node.nodeType === 8 /* CommentNode */) {
        // `${COMMENT_TYPE}.${hostId}.${nodeId}.${depth}.${index}`
        childIdSplt = node.nodeValue.split('.');
        if (childIdSplt[1] === hostId || childIdSplt[1] === '0') {
            // comment node for either the host id or a 0 host id
            childNodeType = childIdSplt[0];
            childVNode = {
                $flags$: 0,
                $hostId$: childIdSplt[1],
                $nodeId$: childIdSplt[2],
                $depth$: childIdSplt[3],
                $index$: childIdSplt[4],
                $elm$: node,
                $attrs$: null,
                $children$: null,
                $key$: null,
                $name$: null,
                $tag$: null,
                $text$: null,
            };
            if (childNodeType === TEXT_NODE_ID) {
                childVNode.$elm$ = node.nextSibling;
                if (childVNode.$elm$ && childVNode.$elm$.nodeType === 3 /* TextNode */) {
                    childVNode.$text$ = childVNode.$elm$.textContent;
                    childRenderNodes.push(childVNode);
                    // remove the text comment since it's no longer needed
                    node.remove();
                    if (!parentVNode.$children$) {
                        parentVNode.$children$ = [];
                    }
                    parentVNode.$children$[childVNode.$index$] = childVNode;
                    if (shadowRootNodes && childVNode.$depth$ === '0') {
                        shadowRootNodes[childVNode.$index$] = childVNode.$elm$;
                    }
                }
            }
            else if (childVNode.$hostId$ === hostId) {
                // this comment node is specifcally for this host id
                if (childNodeType === SLOT_NODE_ID) {
                    // `${SLOT_NODE_ID}.${hostId}.${nodeId}.${depth}.${index}.${slotName}`;
                    childVNode.$tag$ = 'slot';
                    if (childIdSplt[5]) {
                        node['s-sn'] = childVNode.$name$ = childIdSplt[5];
                    }
                    else {
                        node['s-sn'] = '';
                    }
                    node['s-sr'] = true;
                    if (shadowRootNodes) {
                        // browser support shadowRoot and this is a shadow dom component
                        // create an actual slot element
                        childVNode.$elm$ = doc.createElement(childVNode.$tag$);
                        if (childVNode.$name$) {
                            // add the slot name attribute
                            childVNode.$elm$.setAttribute('name', childVNode.$name$);
                        }
                        // insert the new slot element before the slot comment
                        node.parentNode.insertBefore(childVNode.$elm$, node);
                        // remove the slot comment since it's not needed for shadow
                        node.remove();
                        if (childVNode.$depth$ === '0') {
                            shadowRootNodes[childVNode.$index$] = childVNode.$elm$;
                        }
                    }
                    slotNodes.push(childVNode);
                    if (!parentVNode.$children$) {
                        parentVNode.$children$ = [];
                    }
                    parentVNode.$children$[childVNode.$index$] = childVNode;
                }
                else if (childNodeType === CONTENT_REF_ID) {
                    // `${CONTENT_REF_ID}.${hostId}`;
                    if (shadowRootNodes) {
                        // remove the content ref comment since it's not needed for shadow
                        node.remove();
                    }
                    else {
                        hostElm['s-cr'] = node;
                        node['s-cn'] = true;
                    }
                }
            }
        }
    }
    else if (parentVNode && parentVNode.$tag$ === 'style') {
        const vnode = newVNode(null, node.textContent);
        vnode.$elm$ = node;
        vnode.$index$ = '0';
        parentVNode.$children$ = [vnode];
    }
};
const initializeDocumentHydrate = (node, orgLocNodes) => {
    if (node.nodeType === 1 /* ElementNode */) {
        let i = 0;
        for (; i < node.childNodes.length; i++) {
            initializeDocumentHydrate(node.childNodes[i], orgLocNodes);
        }
        if (node.shadowRoot) {
            for (i = 0; i < node.shadowRoot.childNodes.length; i++) {
                initializeDocumentHydrate(node.shadowRoot.childNodes[i], orgLocNodes);
            }
        }
    }
    else if (node.nodeType === 8 /* CommentNode */) {
        const childIdSplt = node.nodeValue.split('.');
        if (childIdSplt[0] === ORG_LOCATION_ID) {
            orgLocNodes.set(childIdSplt[1] + '.' + childIdSplt[2], node);
            node.nodeValue = '';
            // useful to know if the original location is
            // the root light-dom of a shadow dom component
            node['s-en'] = childIdSplt[3];
        }
    }
};
/**
 * Parse a new property value for a given property type.
 *
 * While the prop value can reasonably be expected to be of `any` type as far as TypeScript's type checker is concerned,
 * it is not safe to assume that the string returned by evaluating `typeof propValue` matches:
 *   1. `any`, the type given to `propValue` in the function signature
 *   2. the type stored from `propType`.
 *
 * This function provides the capability to parse/coerce a property's value to potentially any other JavaScript type.
 *
 * Property values represented in TSX preserve their type information. In the example below, the number 0 is passed to
 * a component. This `propValue` will preserve its type information (`typeof propValue === 'number'`). Note that is
 * based on the type of the value being passed in, not the type declared of the class member decorated with `@Prop`.
 * ```tsx
 * <my-cmp prop-val={0}></my-cmp>
 * ```
 *
 * HTML prop values on the other hand, will always a string
 *
 * @param propValue the new value to coerce to some type
 * @param propType the type of the prop, expressed as a binary number
 * @returns the parsed/coerced value
 */
const parsePropertyValue = (propValue, propType) => {
    // ensure this value is of the correct prop type
    if (propValue != null && !isComplexType(propValue)) {
        if (propType & 4 /* Boolean */) {
            // per the HTML spec, any string value means it is a boolean true value
            // but we'll cheat here and say that the string "false" is the boolean false
            return propValue === 'false' ? false : propValue === '' || !!propValue;
        }
        if (propType & 2 /* Number */) {
            // force it to be a number
            return parseFloat(propValue);
        }
        if (propType & 1 /* String */) {
            // could have been passed as a number or boolean
            // but we still want it as a string
            return String(propValue);
        }
        // redundant return here for better minification
        return propValue;
    }
    // not sure exactly what type we want
    // so no need to change to a different type
    return propValue;
};
const getValue = (ref, propName) => getHostRef(ref).$instanceValues$.get(propName);
const setValue = (ref, propName, newVal, cmpMeta) => {
    // check our new property value against our internal value
    const hostRef = getHostRef(ref);
    const elm = hostRef.$hostElement$ ;
    const oldVal = hostRef.$instanceValues$.get(propName);
    const flags = hostRef.$flags$;
    const instance = hostRef.$lazyInstance$ ;
    newVal = parsePropertyValue(newVal, cmpMeta.$members$[propName][0]);
    // explicitly check for NaN on both sides, as `NaN === NaN` is always false
    const areBothNaN = Number.isNaN(oldVal) && Number.isNaN(newVal);
    const didValueChange = newVal !== oldVal && !areBothNaN;
    if ((!(flags & 8 /* isConstructingInstance */) || oldVal === undefined) && didValueChange) {
        // gadzooks! the property's value has changed!!
        // set our new value!
        hostRef.$instanceValues$.set(propName, newVal);
        if (instance) {
            // get an array of method names of watch functions to call
            if (cmpMeta.$watchers$ && flags & 128 /* isWatchReady */) {
                const watchMethods = cmpMeta.$watchers$[propName];
                if (watchMethods) {
                    // this instance is watching for when this property changed
                    watchMethods.map((watchMethodName) => {
                        try {
                            // fire off each of the watch methods that are watching this property
                            instance[watchMethodName](newVal, oldVal, propName);
                        }
                        catch (e) {
                            consoleError(e, elm);
                        }
                    });
                }
            }
            if ((flags & (2 /* hasRendered */ | 16 /* isQueuedForUpdate */)) === 2 /* hasRendered */) {
                // looks like this value actually changed, so we've got work to do!
                // but only if we've already rendered, otherwise just chill out
                // queue that we need to do an update, but don't worry about queuing
                // up millions cuz this function ensures it only runs once
                scheduleUpdate(hostRef, false);
            }
        }
    }
};
const proxyComponent = (Cstr, cmpMeta, flags) => {
    if (cmpMeta.$members$) {
        if (Cstr.watchers) {
            cmpMeta.$watchers$ = Cstr.watchers;
        }
        // It's better to have a const than two Object.entries()
        const members = Object.entries(cmpMeta.$members$);
        const prototype = Cstr.prototype;
        members.map(([memberName, [memberFlags]]) => {
            if ((memberFlags & 31 /* Prop */ ||
                    ((flags & 2 /* proxyState */) && memberFlags & 32 /* State */))) {
                // proxyComponent - prop
                Object.defineProperty(prototype, memberName, {
                    get() {
                        // proxyComponent, get value
                        return getValue(this, memberName);
                    },
                    set(newValue) {
                        // proxyComponent, set value
                        setValue(this, memberName, newValue, cmpMeta);
                    },
                    configurable: true,
                    enumerable: true,
                });
            }
            else if (flags & 1 /* isElementConstructor */ &&
                memberFlags & 64 /* Method */) {
                // proxyComponent - method
                Object.defineProperty(prototype, memberName, {
                    value(...args) {
                        const ref = getHostRef(this);
                        return ref.$onInstancePromise$.then(() => ref.$lazyInstance$[memberName](...args));
                    },
                });
            }
        });
        if ((flags & 1 /* isElementConstructor */)) {
            const attrNameToPropName = new Map();
            prototype.attributeChangedCallback = function (attrName, _oldValue, newValue) {
                plt.jmp(() => {
                    const propName = attrNameToPropName.get(attrName);
                    //  In a web component lifecycle the attributeChangedCallback runs prior to connectedCallback
                    //  in the case where an attribute was set inline.
                    //  ```html
                    //    <my-component some-attribute="some-value"></my-component>
                    //  ```
                    //
                    //  There is an edge case where a developer sets the attribute inline on a custom element and then
                    //  programmatically changes it before it has been upgraded as shown below:
                    //
                    //  ```html
                    //    <!-- this component has _not_ been upgraded yet -->
                    //    <my-component id="test" some-attribute="some-value"></my-component>
                    //    <script>
                    //      // grab non-upgraded component
                    //      el = document.querySelector("#test");
                    //      el.someAttribute = "another-value";
                    //      // upgrade component
                    //      customElements.define('my-component', MyComponent);
                    //    </script>
                    //  ```
                    //  In this case if we do not unshadow here and use the value of the shadowing property, attributeChangedCallback
                    //  will be called with `newValue = "some-value"` and will set the shadowed property (this.someAttribute = "another-value")
                    //  to the value that was set inline i.e. "some-value" from above example. When
                    //  the connectedCallback attempts to unshadow it will use "some-value" as the initial value rather than "another-value"
                    //
                    //  The case where the attribute was NOT set inline but was not set programmatically shall be handled/unshadowed
                    //  by connectedCallback as this attributeChangedCallback will not fire.
                    //
                    //  https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
                    //
                    //  TODO(STENCIL-16) we should think about whether or not we actually want to be reflecting the attributes to
                    //  properties here given that this goes against best practices outlined here
                    //  https://developers.google.com/web/fundamentals/web-components/best-practices#avoid-reentrancy
                    if (this.hasOwnProperty(propName)) {
                        newValue = this[propName];
                        delete this[propName];
                    }
                    else if (prototype.hasOwnProperty(propName) &&
                        typeof this[propName] === 'number' &&
                        this[propName] == newValue) {
                        // if the propName exists on the prototype of `Cstr`, this update may be a result of Stencil using native
                        // APIs to reflect props as attributes. Calls to `setAttribute(someElement, propName)` will result in
                        // `propName` to be converted to a `DOMString`, which may not be what we want for other primitive props.
                        return;
                    }
                    this[propName] = newValue === null && typeof this[propName] === 'boolean' ? false : newValue;
                });
            };
            // create an array of attributes to observe
            // and also create a map of html attribute name to js property name
            Cstr.observedAttributes = members
                .filter(([_, m]) => m[0] & 15 /* HasAttribute */) // filter to only keep props that should match attributes
                .map(([propName, m]) => {
                const attrName = m[1] || propName;
                attrNameToPropName.set(attrName, propName);
                if (m[0] & 512 /* ReflectAttr */) {
                    cmpMeta.$attrsToReflect$.push([propName, attrName]);
                }
                return attrName;
            });
        }
    }
    return Cstr;
};
const initializeComponent = async (elm, hostRef, cmpMeta, hmrVersionId, Cstr) => {
    // initializeComponent
    if ((hostRef.$flags$ & 32 /* hasInitializedComponent */) === 0) {
        {
            // we haven't initialized this element yet
            hostRef.$flags$ |= 32 /* hasInitializedComponent */;
            // lazy loaded components
            // request the component's implementation to be
            // wired up with the host element
            Cstr = loadModule(cmpMeta);
            if (Cstr.then) {
                // Await creates a micro-task avoid if possible
                const endLoad = uniqueTime();
                Cstr = await Cstr;
                endLoad();
            }
            if (!Cstr.isProxied) {
                // we've never proxied this Constructor before
                // let's add the getters/setters to its prototype before
                // the first time we create an instance of the implementation
                {
                    cmpMeta.$watchers$ = Cstr.watchers;
                }
                proxyComponent(Cstr, cmpMeta, 2 /* proxyState */);
                Cstr.isProxied = true;
            }
            const endNewInstance = createTime('createInstance', cmpMeta.$tagName$);
            // ok, time to construct the instance
            // but let's keep track of when we start and stop
            // so that the getters/setters don't incorrectly step on data
            {
                hostRef.$flags$ |= 8 /* isConstructingInstance */;
            }
            // construct the lazy-loaded component implementation
            // passing the hostRef is very important during
            // construction in order to directly wire together the
            // host element and the lazy-loaded instance
            try {
                new Cstr(hostRef);
            }
            catch (e) {
                consoleError(e);
            }
            {
                hostRef.$flags$ &= ~8 /* isConstructingInstance */;
            }
            {
                hostRef.$flags$ |= 128 /* isWatchReady */;
            }
            endNewInstance();
            fireConnectedCallback(hostRef.$lazyInstance$);
        }
        if (Cstr.style) {
            // this component has styles but we haven't registered them yet
            let style = Cstr.style;
            const scopeId = getScopeId(cmpMeta);
            if (!styles.has(scopeId)) {
                const endRegisterStyles = createTime('registerStyles', cmpMeta.$tagName$);
                registerStyle(scopeId, style, !!(cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */));
                endRegisterStyles();
            }
        }
    }
    // we've successfully created a lazy instance
    const ancestorComponent = hostRef.$ancestorComponent$;
    const schedule = () => scheduleUpdate(hostRef, true);
    if (ancestorComponent && ancestorComponent['s-rc']) {
        // this is the initial load and this component it has an ancestor component
        // but the ancestor component has NOT fired its will update lifecycle yet
        // so let's just cool our jets and wait for the ancestor to continue first
        // this will get fired off when the ancestor component
        // finally gets around to rendering its lazy self
        // fire off the initial update
        ancestorComponent['s-rc'].push(schedule);
    }
    else {
        schedule();
    }
};
const fireConnectedCallback = (instance) => {
    {
        safeCall(instance, 'connectedCallback');
    }
};
const connectedCallback = (elm) => {
    if ((plt.$flags$ & 1 /* isTmpDisconnected */) === 0) {
        const hostRef = getHostRef(elm);
        const cmpMeta = hostRef.$cmpMeta$;
        const endConnected = createTime('connectedCallback', cmpMeta.$tagName$);
        if (!(hostRef.$flags$ & 1 /* hasConnected */)) {
            // first time this component has connected
            hostRef.$flags$ |= 1 /* hasConnected */;
            let hostId;
            {
                hostId = elm.getAttribute(HYDRATE_ID);
                if (hostId) {
                    if (cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */) {
                        const scopeId = addStyle(elm.shadowRoot, cmpMeta);
                        elm.classList.remove(scopeId + '-h', scopeId + '-s');
                    }
                    initializeClientHydrate(elm, cmpMeta.$tagName$, hostId, hostRef);
                }
            }
            if (!hostId) {
                // initUpdate
                // if the slot polyfill is required we'll need to put some nodes
                // in here to act as original content anchors as we move nodes around
                // host element has been connected to the DOM
                if ((cmpMeta.$flags$ & (4 /* hasSlotRelocation */ | 8 /* needsShadowDomShim */))) {
                    setContentReference(elm);
                }
            }
            {
                // find the first ancestor component (if there is one) and register
                // this component as one of the actively loading child components for its ancestor
                let ancestorComponent = elm;
                while ((ancestorComponent = ancestorComponent.parentNode || ancestorComponent.host)) {
                    // climb up the ancestors looking for the first
                    // component that hasn't finished its lifecycle update yet
                    if ((ancestorComponent.nodeType === 1 /* ElementNode */ &&
                        ancestorComponent.hasAttribute('s-id') &&
                        ancestorComponent['s-p']) ||
                        ancestorComponent['s-p']) {
                        // we found this components first ancestor component
                        // keep a reference to this component's ancestor component
                        attachToAncestor(hostRef, (hostRef.$ancestorComponent$ = ancestorComponent));
                        break;
                    }
                }
            }
            // Lazy properties
            // https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
            if (cmpMeta.$members$) {
                Object.entries(cmpMeta.$members$).map(([memberName, [memberFlags]]) => {
                    if (memberFlags & 31 /* Prop */ && elm.hasOwnProperty(memberName)) {
                        const value = elm[memberName];
                        delete elm[memberName];
                        elm[memberName] = value;
                    }
                });
            }
            {
                initializeComponent(elm, hostRef, cmpMeta);
            }
        }
        else {
            // not the first time this has connected
            // reattach any event listeners to the host
            // since they would have been removed when disconnected
            addHostEventListeners(elm, hostRef, cmpMeta.$listeners$);
            // fire off connectedCallback() on component instance
            fireConnectedCallback(hostRef.$lazyInstance$);
        }
        endConnected();
    }
};
const setContentReference = (elm) => {
    // only required when we're NOT using native shadow dom (slot)
    // or this browser doesn't support native shadow dom
    // and this host element was NOT created with SSR
    // let's pick out the inner content for slot projection
    // create a node to represent where the original
    // content was first placed, which is useful later on
    const contentRefElm = (elm['s-cr'] = doc.createComment(''));
    contentRefElm['s-cn'] = true;
    elm.insertBefore(contentRefElm, elm.firstChild);
};
const disconnectedCallback = (elm) => {
    if ((plt.$flags$ & 1 /* isTmpDisconnected */) === 0) {
        const hostRef = getHostRef(elm);
        const instance = hostRef.$lazyInstance$ ;
        {
            if (hostRef.$rmListeners$) {
                hostRef.$rmListeners$.map((rmListener) => rmListener());
                hostRef.$rmListeners$ = undefined;
            }
        }
        {
            safeCall(instance, 'disconnectedCallback');
        }
    }
};
const patchCloneNode = (HostElementPrototype) => {
    const orgCloneNode = HostElementPrototype.cloneNode;
    HostElementPrototype.cloneNode = function (deep) {
        const srcNode = this;
        const isShadowDom = srcNode.shadowRoot && supportsShadow ;
        const clonedNode = orgCloneNode.call(srcNode, isShadowDom ? deep : false);
        if (!isShadowDom && deep) {
            let i = 0;
            let slotted, nonStencilNode;
            const stencilPrivates = [
                's-id',
                's-cr',
                's-lr',
                's-rc',
                's-sc',
                's-p',
                's-cn',
                's-sr',
                's-sn',
                's-hn',
                's-ol',
                's-nr',
                's-si',
            ];
            for (; i < srcNode.childNodes.length; i++) {
                slotted = srcNode.childNodes[i]['s-nr'];
                nonStencilNode = stencilPrivates.every((privateField) => !srcNode.childNodes[i][privateField]);
                if (slotted) {
                    {
                        clonedNode.appendChild(slotted.cloneNode(true));
                    }
                }
                if (nonStencilNode) {
                    clonedNode.appendChild(srcNode.childNodes[i].cloneNode(true));
                }
            }
        }
        return clonedNode;
    };
};
const bootstrapLazy = (lazyBundles, options = {}) => {
    const endBootstrap = createTime();
    const cmpTags = [];
    const exclude = options.exclude || [];
    const customElements = win.customElements;
    const head = doc.head;
    const metaCharset = /*@__PURE__*/ head.querySelector('meta[charset]');
    const visibilityStyle = /*@__PURE__*/ doc.createElement('style');
    const deferredConnectedCallbacks = [];
    const styles = /*@__PURE__*/ doc.querySelectorAll(`[${HYDRATED_STYLE_ID}]`);
    let appLoadFallback;
    let isBootstrapping = true;
    let i = 0;
    Object.assign(plt, options);
    plt.$resourcesUrl$ = new URL(options.resourcesUrl || './', doc.baseURI).href;
    {
        // If the app is already hydrated there is not point to disable the
        // async queue. This will improve the first input delay
        plt.$flags$ |= 2 /* appLoaded */;
    }
    {
        for (; i < styles.length; i++) {
            registerStyle(styles[i].getAttribute(HYDRATED_STYLE_ID), convertScopedToShadow(styles[i].innerHTML), true);
        }
    }
    lazyBundles.map((lazyBundle) => {
        lazyBundle[1].map((compactMeta) => {
            const cmpMeta = {
                $flags$: compactMeta[0],
                $tagName$: compactMeta[1],
                $members$: compactMeta[2],
                $listeners$: compactMeta[3],
            };
            {
                cmpMeta.$members$ = compactMeta[2];
            }
            {
                cmpMeta.$listeners$ = compactMeta[3];
            }
            {
                cmpMeta.$attrsToReflect$ = [];
            }
            {
                cmpMeta.$watchers$ = {};
            }
            const tagName = cmpMeta.$tagName$;
            const HostElement = class extends HTMLElement {
                // StencilLazyHost
                constructor(self) {
                    // @ts-ignore
                    super(self);
                    self = this;
                    registerHost(self, cmpMeta);
                    if (cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */) {
                        // this component is using shadow dom
                        // and this browser supports shadow dom
                        // add the read-only property "shadowRoot" to the host element
                        // adding the shadow root build conditionals to minimize runtime
                        {
                            {
                                self.attachShadow({ mode: 'open' });
                            }
                        }
                    }
                }
                connectedCallback() {
                    if (appLoadFallback) {
                        clearTimeout(appLoadFallback);
                        appLoadFallback = null;
                    }
                    if (isBootstrapping) {
                        // connectedCallback will be processed once all components have been registered
                        deferredConnectedCallbacks.push(this);
                    }
                    else {
                        plt.jmp(() => connectedCallback(this));
                    }
                }
                disconnectedCallback() {
                    plt.jmp(() => disconnectedCallback(this));
                }
                componentOnReady() {
                    return getHostRef(this).$onReadyPromise$;
                }
            };
            {
                patchCloneNode(HostElement.prototype);
            }
            cmpMeta.$lazyBundleId$ = lazyBundle[0];
            if (!exclude.includes(tagName) && !customElements.get(tagName)) {
                cmpTags.push(tagName);
                customElements.define(tagName, proxyComponent(HostElement, cmpMeta, 1 /* isElementConstructor */));
            }
        });
    });
    {
        visibilityStyle.innerHTML = cmpTags + HYDRATED_CSS;
        visibilityStyle.setAttribute('data-styles', '');
        head.insertBefore(visibilityStyle, metaCharset ? metaCharset.nextSibling : head.firstChild);
    }
    // Process deferred connectedCallbacks now all components have been registered
    isBootstrapping = false;
    if (deferredConnectedCallbacks.length) {
        deferredConnectedCallbacks.map((host) => host.connectedCallback());
    }
    else {
        {
            plt.jmp(() => (appLoadFallback = setTimeout(appDidLoad, 30)));
        }
    }
    // Fallback appLoad event
    endBootstrap();
};
const Fragment = (_, children) => children;
const hostRefs = new WeakMap();
const getHostRef = (ref) => hostRefs.get(ref);
const registerInstance = (lazyInstance, hostRef) => hostRefs.set((hostRef.$lazyInstance$ = lazyInstance), hostRef);
const registerHost = (elm, cmpMeta) => {
    const hostRef = {
        $flags$: 0,
        $hostElement$: elm,
        $cmpMeta$: cmpMeta,
        $instanceValues$: new Map(),
    };
    {
        hostRef.$onInstancePromise$ = new Promise((r) => (hostRef.$onInstanceResolve$ = r));
    }
    {
        hostRef.$onReadyPromise$ = new Promise((r) => (hostRef.$onReadyResolve$ = r));
        elm['s-p'] = [];
        elm['s-rc'] = [];
    }
    addHostEventListeners(elm, hostRef, cmpMeta.$listeners$);
    return hostRefs.set(elm, hostRef);
};
const isMemberInElement = (elm, memberName) => memberName in elm;
const consoleError = (e, el) => (0, console.error)(e, el);
const cmpModules = /*@__PURE__*/ new Map();
const loadModule = (cmpMeta, hostRef, hmrVersionId) => {
    // loadModuleImport
    const exportName = cmpMeta.$tagName$.replace(/-/g, '_');
    const bundleId = cmpMeta.$lazyBundleId$;
    const module = cmpModules.get(bundleId) ;
    if (module) {
        return module[exportName];
    }
    
    if (!hmrVersionId || !BUILD.hotModuleReplacement) {
      const processMod = importedModule => {
        cmpModules.set(bundleId, importedModule);
        return importedModule[exportName];
      }
      switch(bundleId) {
        
        case 'app-logo.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './app-logo.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-accordion.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-accordion.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-alert.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-alert.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-app-footer.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-app-footer.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-app-shell.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-app-shell.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-breadcrumb.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-breadcrumb.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-callout.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-callout.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-carousel.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-carousel.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-chart-stack-card.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-chart-stack-card.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-checkbox-group.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-checkbox-group.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-chip.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-chip.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-collapsible.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-collapsible.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-data-grid.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-data-grid.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-date-picker.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-date-picker.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-divider.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-divider.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-dropdown.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-dropdown.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-grid.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-grid.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-grid-item.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-grid-item.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-add.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-add.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-add-card.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-add-card.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-arrange.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-arrange.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-arrow-down.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-arrow-down.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-arrow-left.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-arrow-left.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-arrow-right.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-arrow-right.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-arrow-up.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-arrow-up.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-auto-login.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-auto-login.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-backspace.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-backspace.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-backward.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-backward.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-changelog.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-changelog.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-circle-add.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-circle-add.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-compare.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-compare.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-copy-paste.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-copy-paste.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-cut-paste.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-cut-paste.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-disabled-microphone.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-disabled-microphone.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-download.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-download.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-download-from-cloud.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-download-from-cloud.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-drag-and-drop.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-drag-and-drop.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-edit.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-edit.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-export.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-export.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-fast-forward.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-fast-forward.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-fast-forward-nb.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-fast-forward-nb.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-filter.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-filter.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-filter-2.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-filter-2.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-forward.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-forward.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-full-screen.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-full-screen.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-import.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-import.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-install.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-install.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-launch.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-launch.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-light-dark-mode.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-light-dark-mode.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-link.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-link.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-logout.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-logout.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-loop.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-loop.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-microphone.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-microphone.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-minimize-screen.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-minimize-screen.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-minus-circle.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-minus-circle.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-more.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-more.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-move.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-move.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-mute.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-mute.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-notification.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-notification.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-pause.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-pause.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-pause-nb.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-pause-nb.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-pin.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-pin.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-play.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-play.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-play-nb.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-play-nb.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-pop-up-window.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-pop-up-window.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-power.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-power.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-previous-nb.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-previous-nb.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-print.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-print.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-publish.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-publish.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-random.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-random.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-record-nb.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-record-nb.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-refresh.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-refresh.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-remove.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-remove.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-reply.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-reply.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-reply-all.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-reply-all.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-reply-forward.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-reply-forward.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-restart.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-restart.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-search.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-search.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-send.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-send.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-share.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-share.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-shopping-cart.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-shopping-cart.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-show-password.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-show-password.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-sound-on.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-sound-on.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-star.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-star.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-stream-on.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-stream-on.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-thumbs-down.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-thumbs-down.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-thumbs-up.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-thumbs-up.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-tiles-add.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-tiles-add.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-upload.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-upload.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-upload-to-cloud.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-upload-to-cloud.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-volume-down.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-volume-down.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-volume-up.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-volume-up.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-zoom-in.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-zoom-in.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-zoom-out.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-zoom-out.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-alert-antivirus-protection.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-alert-antivirus-protection.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-alert-compliance.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-alert-compliance.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-alert-cyber-security.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-alert-cyber-security.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-alert-help.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-alert-help.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-alert-high-priority-email.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-alert-high-priority-email.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-alert-imprint-dataprivacy.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-alert-imprint-dataprivacy.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-alert-legal.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-alert-legal.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-alert-network-disrupted.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-alert-network-disrupted.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-alert-password-breaking.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-alert-password-breaking.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-alert-security.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-alert-security.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-alert-traffic-disruption.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-alert-traffic-disruption.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-alert-unknown.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-alert-unknown.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-communication-available.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-communication-available.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-communication-blog.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-communication-blog.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-communication-call-incoming.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-communication-call-incoming.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-communication-call-outgoing.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-communication-call-outgoing.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-communication-chat.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-communication-chat.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-communication-chat-badge.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-communication-chat-badge.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-communication-email.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-communication-email.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-communication-end-call.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-communication-end-call.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-communication-feedback.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-communication-feedback.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-communication-flight-mode.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-communication-flight-mode.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-communication-happy-person.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-communication-happy-person.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-communication-inbox.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-communication-inbox.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-communication-landing-mobile-contact-client.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-communication-landing-mobile-contact-client.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-communication-loyalty-earned.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-communication-loyalty-earned.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-communication-loyalty-lost.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-communication-loyalty-lost.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-communication-mail-opened.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-communication-mail-opened.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-communication-message.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-communication-message.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-communication-message-incoming.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-communication-message-incoming.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-communication-message-outgoing.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-communication-message-outgoing.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-communication-mms-incoming.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-communication-mms-incoming.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-communication-mms-outgoing.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-communication-mms-outgoing.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-communication-mobile-phone-number.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-communication-mobile-phone-number.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-communication-network-signal.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-communication-network-signal.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-communication-new-email.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-communication-new-email.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-communication-outbox.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-communication-outbox.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-communication-phone-number.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-communication-phone-number.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-communication-recipient.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-communication-recipient.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-communication-save-emails-to-drafts.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-communication-save-emails-to-drafts.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-communication-sms.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-communication-sms.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-communication-spam.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-communication-spam.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-communication-voice-message.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-communication-voice-message.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-2fa-google-auth.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-2fa-google-auth.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-achievement.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-achievement.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-android.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-android.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-apple.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-apple.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-applications.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-applications.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-available-keychain.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-available-keychain.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-bank.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-bank.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-biometric.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-biometric.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-birthday.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-birthday.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-bookmark.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-bookmark.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-clipboard.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-clipboard.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-clock.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-clock.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-cloud-security.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-cloud-security.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-code-scanner.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-code-scanner.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-color-selection.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-color-selection.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-country.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-country.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-credit-card.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-credit-card.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-data-visualisation.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-data-visualisation.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-delivery.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-delivery.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-digital-banking.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-digital-banking.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-digital-media.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-digital-media.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-discount.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-discount.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-e-sim.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-e-sim.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-eu.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-eu.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-face-mask.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-face-mask.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-features.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-features.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-flexible-tariffs.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-flexible-tariffs.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-folder.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-folder.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-food.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-food.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-gender-diverse.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-gender-diverse.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-gender-female.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-gender-female.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-gender-male.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-gender-male.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-half-rating.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-half-rating.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-heart.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-heart.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-height.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-height.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-history.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-history.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-hour-glass.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-hour-glass.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-iban.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-iban.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-id.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-id.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-in-stock.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-in-stock.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-international.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-international.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-international-sms.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-international-sms.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-interview.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-interview.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-key.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-key.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-language.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-language.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-lock.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-lock.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-loyalty.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-loyalty.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-media-folder.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-media-folder.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-money-at.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-money-at.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-music.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-music.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-news.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-news.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-out-of-stock.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-out-of-stock.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-person-walking.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-person-walking.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-prepaid-activate.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-prepaid-activate.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-price-tag.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-price-tag.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-ratings.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-ratings.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-route.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-route.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-rss.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-rss.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-shop.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-shop.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-signal.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-signal.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-sim-card.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-sim-card.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-smile.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-smile.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-sort-indicator-mini-down.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-sort-indicator-mini-down.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-sort-indicator-up-mini.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-sort-indicator-up-mini.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-status-inactive.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-status-inactive.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-status-recurring.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-status-recurring.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-stopwatch.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-stopwatch.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-support-chat.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-support-chat.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-sustainable.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-sustainable.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-tariffs.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-tariffs.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-threats.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-threats.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-todo-list.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-todo-list.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-transport.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-transport.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-unlock.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-unlock.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-voucher.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-voucher.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-waiting.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-waiting.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-content-wallet.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-content-wallet.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-add-device.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-add-device.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-camera.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-camera.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-change-camera.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-change-camera.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-computer.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-computer.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-device-controller.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-device-controller.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-device-ethernet.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-device-ethernet.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-device-mesh.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-device-mesh.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-device-phone.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-device-phone.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-device-router.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-device-router.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-device-tv.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-device-tv.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-device-watch.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-device-watch.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-dongle.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-dongle.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-fax.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-fax.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-fixed-line-services.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-fixed-line-services.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-game-controller.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-game-controller.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-media-receiver.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-media-receiver.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-mobile-data.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-mobile-data.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-mobile-devices-combination.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-mobile-devices-combination.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-mobile-equipment.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-mobile-equipment.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-mobile-phone-insurance.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-mobile-phone-insurance.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-mobile-services.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-mobile-services.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-no-camera.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-no-camera.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-phone-with-mobile-plan.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-phone-with-mobile-plan.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-phone-without-mobile-plan.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-phone-without-mobile-plan.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-photo-camera.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-photo-camera.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-remote-controller.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-remote-controller.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-replacement-mobilephone.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-replacement-mobilephone.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-screen-rotate.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-screen-rotate.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-server.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-server.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-smart-speaker.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-smart-speaker.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-tablet.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-tablet.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-tv-and-mobile.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-tv-and-mobile.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-twitching-closed-state.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-twitching-closed-state.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-device-twitching-open-state.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-device-twitching-open-state.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-home-home.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-home-home.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-home-internet-at-home.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-home-internet-at-home.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-home-iot.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-home-iot.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-home-light-bulb.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-home-light-bulb.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-home-network-secure.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-home-network-secure.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-home-no-wifi.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-home-no-wifi.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-home-power-socket.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-home-power-socket.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-home-preferred-wifi.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-home-preferred-wifi.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-home-reduced-wifi.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-home-reduced-wifi.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-home-slow-wifi.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-home-slow-wifi.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-home-smarthome.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-home-smarthome.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-home-unable-to-connect-to-router.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-home-unable-to-connect-to-router.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-home-wifi.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-home-wifi.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-home-wifi-connected.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-home-wifi-connected.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-home-wifi-connection-error.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-home-wifi-connection-error.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-home-wifi-manual-login.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-home-wifi-manual-login.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-home-wifi-no-wired-internet.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-home-wifi-no-wired-internet.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-navigation-circle-top-up.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-navigation-circle-top-up.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-navigation-external-link.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-navigation-external-link.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-navigation-internal-link.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-navigation-internal-link.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-navigation-left-condensed.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-navigation-left-condensed.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-navigation-location.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-navigation-location.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-navigation-map.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-navigation-map.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-navigation-my-location.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-navigation-my-location.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-navigation-right-condensed.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-navigation-right-condensed.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-navigation-start.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-navigation-start.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-navigation-top-up.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-navigation-top-up.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-process-order-status.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-process-order-status.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-process-processing.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-process-processing.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-process-sepa-transaction.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-process-sepa-transaction.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-service-devices-service.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-service-devices-service.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-service-maintanance.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-service-maintanance.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-service-manual.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-service-manual.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-service-one-time-password.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-service-one-time-password.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-service-services.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-service-services.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-service-support.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-service-support.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-service-vpn.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-service-vpn.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-t-product-2fa-telekom-app.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-t-product-2fa-telekom-app.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-t-product-magenta-cloud.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-t-product-magenta-cloud.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-t-product-magenta-tv.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-t-product-magenta-tv.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-t-product-magentaone.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-t-product-magentaone.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-t-product-measure-internet-speed.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-t-product-measure-internet-speed.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-t-product-seamless-connectivity.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-t-product-seamless-connectivity.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-t-product-telekom-1t1.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-t-product-telekom-1t1.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-t-product-telekom-plan.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-t-product-telekom-plan.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-t-product-telekom-shop-b.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-t-product-telekom-shop-b.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-t-product-usage.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-t-product-usage.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-t-product-voice.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-t-product-voice.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-user-file-admin.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-user-file-admin.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-user-file-analytics.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-user-file-analytics.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-user-file-attachment.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-user-file-attachment.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-user-file-audio-file.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-user-file-audio-file.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-user-file-billing.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-user-file-billing.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-user-file-boy.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-user-file-boy.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-user-file-bussines-users.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-user-file-bussines-users.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-user-file-communities.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-user-file-communities.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-user-file-contacts.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-user-file-contacts.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-user-file-contacts-from-cloud.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-user-file-contacts-from-cloud.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-user-file-contracts.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-user-file-contracts.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-user-file-draft-file.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-user-file-draft-file.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-user-file-families.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-user-file-families.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-user-file-family.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-user-file-family.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-user-file-file.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-user-file-file.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-user-file-file-collection.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-user-file-file-collection.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-user-file-girl.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-user-file-girl.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-user-file-handshake.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-user-file-handshake.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-user-file-html-file.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-user-file-html-file.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-user-file-id-card.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-user-file-id-card.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-user-file-image-file.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-user-file-image-file.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-user-file-logout.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-user-file-logout.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-user-file-man.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-user-file-man.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-user-file-pdf-file.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-user-file-pdf-file.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-user-file-switch-users.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-user-file-switch-users.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-user-file-videos.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-user-file-videos.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-user-file-woman.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-user-file-woman.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-weather-cloudy.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-weather-cloudy.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-weather-cloudy-rain.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-weather-cloudy-rain.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-weather-cloudy-sleet.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-weather-cloudy-sleet.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-weather-cloudy-snow.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-weather-cloudy-snow.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-weather-cloudy-thunder-rain.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-weather-cloudy-thunder-rain.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-weather-cloudy-thunder-snow.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-weather-cloudy-thunder-snow.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-weather-heavy-sleet.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-weather-heavy-sleet.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-weather-heavy-snow.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-weather-heavy-snow.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-weather-moon-clear.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-weather-moon-clear.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-weather-moon-cloudy-a.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-weather-moon-cloudy-a.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-weather-moon-cloudy-b.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-weather-moon-cloudy-b.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-weather-moon-rain.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-weather-moon-rain.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-weather-moon-sleet.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-weather-moon-sleet.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-weather-moon-snow.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-weather-moon-snow.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-weather-moon-thunder-rain.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-weather-moon-thunder-rain.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-weather-moon-thunder-snow.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-weather-moon-thunder-snow.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-weather-overcast.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-weather-overcast.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-weather-rain.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-weather-rain.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-weather-sunny.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-weather-sunny.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-weather-thunder-rain.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-weather-thunder-rain.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-weather-thunder-snow.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-weather-thunder-snow.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-input.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-input.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-list.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-list.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-list-item.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-list-item.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-loading-spinner.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-loading-spinner.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-menu-flyout-divider.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-menu-flyout-divider.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-modal.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-modal.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-notification.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-notification.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-notification-banner.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-notification-banner.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-notification-message.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-notification-message.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-notification-toast.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-notification-toast.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-radio-button.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-radio-button.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-radio-button-group.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-radio-button-group.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-rating-stars.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-rating-stars.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-segment.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-segment.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-segmented-button.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-segmented-button.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-sidebar-nav.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-sidebar-nav.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-sidebar-nav-collapsible.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-sidebar-nav-collapsible.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-sidebar-nav-item.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-sidebar-nav-item.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-slider.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-slider.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-ssr-slot-fix.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-ssr-slot-fix.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-tab-header.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-tab-header.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-tab-nav.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-tab-nav.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-tab-panel.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-tab-panel.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-table.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-table.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-telekom-app-shell.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-telekom-app-shell.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-telekom-footer-data-back-compat.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-telekom-footer-data-back-compat.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-telekom-footer-extended-navigation.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-telekom-footer-extended-navigation.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-telekom-footer-extended-navigation-column.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-telekom-footer-extended-navigation-column.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-telekom-header-data-back-compat.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-telekom-header-data-back-compat.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-telekom-profile-menu.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-telekom-profile-menu.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-textarea.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-textarea.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-toast.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-toast.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-toggle-button.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-toggle-button.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-toggle-group.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-toggle-group.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-tooltip.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-tooltip.cjs.entry.js')); }).then(processMod, consoleError);
        case 'duet-date-picker_2.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './duet-date-picker_2.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-app-header.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-app-header.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-card.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-card.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-dropdown-select_13.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-dropdown-select_13.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-favorite.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-favorite.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-menu_7.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-menu_7.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-telekom-footer_2.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-telekom-footer_2.cjs.entry.js')); }).then(processMod, consoleError);
        case 'app-mega-menu_7.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './app-mega-menu_7.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-badge_5.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-badge_5.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-checkbox_2.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-checkbox_2.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-navigation-collapse-up.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-navigation-collapse-up.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-navigation-double-left_2.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-navigation-double-left_2.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-circle-close_2.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-circle-close_2.cjs.entry.js')); }).then(processMod, consoleError);
        case 'app-navigation-user-menu_3.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './app-navigation-user-menu_3.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-link.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-link.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-close.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-close.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-button_2.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-button_2.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-helper-text.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-helper-text.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-navigation-collapse-down.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-navigation-collapse-down.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-logo_2.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-logo_2.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-navigation-left.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-navigation-left.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-checkmark.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-checkmark.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-navigation-right.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-navigation-right.cjs.entry.js')); }).then(processMod, consoleError);
        case 'scale-icon-action-success_3.cjs':
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
            /* webpackMode: "lazy" */
            './scale-icon-action-success_3.cjs.entry.js')); }).then(processMod, consoleError);
      }
    }
    return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
    /* @vite-ignore */
    /* webpackInclude: /\.entry\.js$/ */
    /* webpackExclude: /\.system\.entry\.js$/ */
    /* webpackMode: "lazy" */
    `./${bundleId}.entry.js${''}`)); }).then((importedModule) => {
        {
            cmpModules.set(bundleId, importedModule);
        }
        return importedModule[exportName];
    }, consoleError);
};
const styles = new Map();
const queueDomReads = [];
const queueDomWrites = [];
const queueTask = (queue, write) => (cb) => {
    queue.push(cb);
    if (!queuePending) {
        queuePending = true;
        if (write && plt.$flags$ & 4 /* queueSync */) {
            nextTick(flush);
        }
        else {
            plt.raf(flush);
        }
    }
};
const consume = (queue) => {
    for (let i = 0; i < queue.length; i++) {
        try {
            queue[i](performance.now());
        }
        catch (e) {
            consoleError(e);
        }
    }
    queue.length = 0;
};
const flush = () => {
    // always force a bunch of medium callbacks to run, but still have
    // a throttle on how many can run in a certain time
    // DOM READS!!!
    consume(queueDomReads);
    // DOM WRITES!!!
    {
        consume(queueDomWrites);
        if ((queuePending = queueDomReads.length > 0)) {
            // still more to do yet, but we've run out of time
            // let's let this thing cool off and try again in the next tick
            plt.raf(flush);
        }
    }
};
const nextTick = /*@__PURE__*/ (cb) => promiseResolve().then(cb);
const writeTask = /*@__PURE__*/ queueTask(queueDomWrites, true);

exports.Fragment = Fragment;
exports.H = H;
exports.Host = Host;
exports.NAMESPACE = NAMESPACE;
exports.bootstrapLazy = bootstrapLazy;
exports.createEvent = createEvent;
exports.getElement = getElement;
exports.h = h;
exports.promiseResolve = promiseResolve;
exports.registerInstance = registerInstance;
