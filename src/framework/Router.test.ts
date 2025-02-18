import { expect } from "chai";
import Router from "./Router";
import Block, { Props } from "./Block";
import Route from "./Route";
import Sinon from "sinon";

class TestingBlock extends Block{
    constructor(props:Props){
        super('div', props)
    }
}

describe('Router', function() {
    let router : Router;
    this.beforeAll(() => {
        router = new Router('#app');
    })
    
    it('Роутер должен регистрировать маршрут use()', () => {
        router.use('/test', TestingBlock)
        expect(router.routes.length).to.equal(1)
    })
    it('Роутер должен возвращать маршрут getRoute()', () => {
        const route = router.getRoute('/test');
        expect(route).to.be.instanceOf(Route);
    })
    it('Роутер должен переходить по маршруту go()', () => {
        const pushStateStub = Sinon.stub(global.window.history, 'pushState');
        const onRouteStub = Sinon.stub(router, '_onRoute')
        router.go('/test')
        expect(pushStateStub.calledOnce).to.be.true
        expect(onRouteStub.calledOnce).to.be.true
    })

    this.afterAll(() => {
        Sinon.restore()
    })
})
