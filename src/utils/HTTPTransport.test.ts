import Sinon, { SinonFakeXMLHttpRequest } from "sinon";
import HTTPTransport from "./HTTPTransport"
import { expect } from "chai";

describe('HTTPTransport', function() {
    let testAPI : HTTPTransport;
    let xhr;
    let requests: SinonFakeXMLHttpRequest[];
    this.beforeAll(()=>{
        testAPI = new HTTPTransport()

        xhr = Sinon.useFakeXMLHttpRequest();
        requests = [];
        xhr.onCreate = function(xhr) {
            requests.push(xhr)
        }

    })
    it('get-запрос должен вызывать request', ()=>{
        const xhrSpy = Sinon.spy(testAPI, 'request')

        testAPI.get('/test', { data: { someData: 'someValue' } })
        expect(xhrSpy.calledOnce).to.be.true
    })
    it('post-запрос должен вызывать request', ()=>{
        const xhrSpy = Sinon.spy(testAPI, 'request')

        testAPI.post('/test', { data: { someData: 'someValue' } })
        expect(xhrSpy.calledOnce).to.be.true
    })
    it('put-запрос должен вызывать request', ()=>{
        const xhrSpy = Sinon.spy(testAPI, 'request')

        testAPI.put('/test', { data: { someData: 'someValue' } })
        expect(xhrSpy.calledOnce).to.be.true
    })

    this.afterEach(()=>{
        Sinon.restore()
    })
})
