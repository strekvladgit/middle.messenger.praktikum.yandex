import { expect } from "chai";
import Block, { Props } from "./Block";

class TestingBlock extends Block{
    constructor(props:Props){
        super('div', props)
    }

    public getChildren(){
        return this.children;
    }

    public getEventBus(){
        return this.eventBus;
    }
}

class ChildBlock extends Block{
    constructor(props:Props){
        super('div', props)
    }
}

describe('Block', function() {
    let testBlock : TestingBlock;
    this.beforeAll(()=>{
        testBlock = new TestingBlock({child: new ChildBlock({}), someprop: 'someprop', attr:{class:'someClass'}});
    })

    it('Компонент хранит в себе дочерние компоненты в children', ()=>{
        const child = testBlock.getChildren()
        expect(child.child).to.be.instanceOf(Block)
    })
    it('Компонент инициализирует EventBus', ()=>{
        const eventBus = testBlock.getEventBus()
        expect(eventBus).to.exist
    })
    it('Компонент возвращает элемент getContent()', ()=>{
        const elem = testBlock.getContent();
        expect(elem).to.exist
    })
    it('Компонент добавляет аттрибуты в html блок', ()=>{
        const elem = testBlock.getContent();
        const className = elem?.classList.contains('someClass')
        expect(className).to.be.true
    })

})
