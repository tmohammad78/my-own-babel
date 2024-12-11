import astDefinations from "../astMap.js";


function traverse(node, visitors, parent = null, key = null) {
    if (!node || typeof node !== "object") return;

    const nodeType = astDefinations.get(node.type) || {}
    console.log("----------");
    
    console.log(nodeType, node.type,'nodeType');
    let visitorFuncs = visitors?.[node.type] || {}
    // console.log(JSON.stringify(visitorFuncs),'visitorFuncs');
    

    if (typeof visitorFuncs === 'function') {
        visitorFuncs = {
          enter: visitorFuncs
        }
      }
      console.log(JSON.stringify(visitorFuncs));
      
    visitorFuncs.enter && visitorFuncs.enter(node)

        // biome-ignore lint/complexity/noForEach: <explanation>
    nodeType?.visitor?.forEach(key => {
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