import EventBus from "./EventBus";
import { v4 as makeID } from "uuid";
import Handlebars from 'handlebars';
import isEqual from "../utils/isEqual";
import cloneDeep from "../utils/cloneDeep";

export type Props = Record<string | symbol, any>;

export type ClassType = {
  new(propsAndChildren: Props): Block
};

 export type Indexed<T = unknown> = {
  [key in string]: T;
};

export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDU: "flow:component-did-update",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render"
  };

  private _element: HTMLElement | null = null;
  protected children: Record<string, Block>;
  protected tagName: string = '';
  protected props: Props = {};

  protected lists: Record<string, Props[]> | Record<string, Block[]> = {};

  private eventBus: ()=> EventBus;
  protected _id = makeID();


  constructor(tagName:string = "div", propsAndChildren:Props = {}) {
    const {children={}, props={}, lists={}} = this._getChildren(propsAndChildren);

    const eventBus = new EventBus();
    this.eventBus = () => eventBus;

    this.props = this._makePropsProxy(props);
    this.children = children;
    this.lists = lists;

    this.tagName = tagName;

    this._id = makeID();

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
    eventBus.emit(Block.EVENTS.FLOW_RENDER);
    eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _addAttributes() {
    const {attr = {}} = this.props as {attr: Record<string, string>};
    Object.entries(attr).forEach(([key, value]) => {
      this._element?.setAttribute(key, value as string)
    })
  }

  private _addEvents() {
    const {events={}} = this.props as  {events: Record<string, ()=> void>};

    Object.entries(events).forEach(([key, value])=>{
      this._element?.addEventListener(key, value)
    })
  }

  private _removeEvents() {
    const {events={}} = this.props as  {events: Record<string, ()=> void>};

    Object.keys(events).forEach(eventName=>{
      this._element?.removeEventListener(eventName, events[eventName])
    })
  }

  private _createResources() {
    this._element = this._createDocumentElement(this.tagName);
  }

  private init() {
    this._createResources();
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  // Может переопределять пользователь, необязательно трогать
  protected componentDidMount() {}

  protected dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = isEqual(oldProps, newProps);
    if(!response){
      this._render();
      this.componentDidUpdate();
    }
  }

  // Может переопределять пользователь, необязательно трогать
  protected componentDidUpdate() {}

  public setProps = (nextProps : Props) => {

    if (!nextProps) {
      return;
    }

    const {lists, children}  = this._getChildren(nextProps);
    Object.assign(this.lists, lists);
    Object.assign(this.children, children);
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _getChildren(propsAndChildren : Props) {
    const children: Record<string, Block> = {};
    const props: Props = {};
    const lists: Record<string, Props[]> |Record<string, Block[]> = {};
    
    Object.entries(propsAndChildren).forEach(([key,value])=>{
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value;
      } else {
        props[key] = value;
      }
    })
    return {children, props, lists}
  }

  private _isBlocksArray(array: any[] | Block[]) {
    return array.every(item => item instanceof Block);
  }

  public compile (template : string, props : Props) {

    const propsAndStubs = {...props};
    
    const listsID = makeID();

    //создаем заглушки
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });
    Object.entries(this.lists).forEach(([key, array])=>{
      
      if(this._isBlocksArray(array)){
        propsAndStubs[key]=[];
        array.forEach(child=>{
          propsAndStubs[key].push(`<div data-id="__l_${child._id}"></div>`)
        })
      } else {
        propsAndStubs[key] = array;
      }

    })

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    //контент для дочерних компонентов
    Object.values(this.children).forEach((child)=>{
      const dummy = fragment.content.querySelector(`[data-id='${child._id}']`);
      if(dummy){
        dummy.replaceWith(child.getContent() as Node)
      }
    })

    //контент для списков
    Object.values(this.lists).forEach(array=>{

      const listCont = this._createDocumentElement('template') as HTMLTemplateElement;
      if(this._isBlocksArray(array)){
        array.forEach(child=>{
          const dummy = fragment.content.querySelector(`[data-id='__l_${child._id}']`);
          if(dummy){
            dummy.replaceWith(child.getContent());
          }
        })
      } else {
        array.forEach(child => {
          listCont.content.append(`${child}`);
        })
        const dummy =fragment.content.querySelector(`[data-id="__l_${listsID}"]`);
        if(dummy){
          dummy.replaceWith(listCont.content);
        }
        
      }
    })
    
    return fragment.content;

  }
  private _render() {
    const block = this.compile(this.render(), this.props);
    this._removeEvents();
    if(this._element){
      this._element.innerHTML = '';
      this._element.append(block);
    }

    this._addAttributes();
    this._addEvents();
  }
  

  // Может переопределять пользователь, необязательно трогать
  protected render() {
    return '';
  }

  public getContent() {
    return this._element;
  }

  private _makePropsProxy(props:Props) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;

    return new Proxy(props, {
      get(target, prop){
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value){
        const oldTarget = cloneDeep(target);
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('нет доступа');
      },
    });
  }

  private _createDocumentElement(tagName: string): HTMLTemplateElement | HTMLElement {
    if (tagName === 'template') {
      return document.createElement('template') as HTMLTemplateElement;
    }
    return document.createElement(tagName);
  }

  public show() {
    const content = this.getContent();
    if(content){
      content.style.display = 'block'; // .display = 'block';
    }
      
  }

  public hide() {
    const content = this.getContent();
    if(content){
      content.style.display = 'none';
    }
  }

}

