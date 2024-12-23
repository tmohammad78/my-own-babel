import astDefinations from "../astMap.js";


function traverse(node, visitors, parent = null, key = null) {
    if (!node || typeof node !== "object") return;

    // const nodeType = astDefinations.get(node.type) || {}
    let visitorFuncs = visitors?.[node.type] || {}
    

    if (typeof visitorFuncs === 'function') {
        visitorFuncs = {
          enter: visitorFuncs
        }
      }
      
    visitorFuncs.enter && visitorFuncs.enter(node)

    Object.keys(node).forEach(key => {
        const prop = node[key]
        console.log(prop,'pop');
        if (Array.isArray(prop)) {
            prop.forEach((childNode, index) => {
                traverse(childNode, visitors, node[key], index)
            })
          } else {
            traverse(prop, visitors, node, key);
          }
    })
}   

export default traverse;