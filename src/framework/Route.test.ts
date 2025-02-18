import { expect } from "chai";
import Block, { Props } from "./Block";
import Route from "./Route";

class TestingBlock extends Block{
    constructor(props:Props){
        super('div', props)
    }
}

describe('Route', function() {
    let route : Route;
    this.beforeAll(() => {
        route = new Route('/test', TestingBlock, {rootQuery: '#app'});
    })
    it('Роут должен возвращать false если запрашиваемый путь не подходит match()', ()=>{
        const response = route.match('/test123');
        expect(route._pathname).to.not.equal('/test123')
        expect(response).to.equal(false)
    })
    it('Роут должен возвращать true если запрашиваемый путь соответствует match()', ()=>{
        const response = route.match('/test');
        expect(route._pathname).to.equal('/test');
        expect(response).to.equal(true)
    })
    it('Роут должен рендерить страницу render()', ()=>{
        const rendered = route.render()
        expect(rendered).to.equal(true)
    })
    it('Роут должен очищать хранимую в себе страницу leave()', ()=>{
        route.leave()
        expect(route._block).to.equal(null)
    })
})
