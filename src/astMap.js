const astDefinations = new Map()

astDefinations.set('Program', {
    visitor: ['body'],
    isBlock: true
});

astDefinations.set('VariableDeclaration', {
    visitor: ['declarations']
})

astDefinations.set('VariableDeclarator', {
    visitor: ['id', 'init']
});

astDefinations.set('Identifier', {
    visitor: []
});

export default astDefinations