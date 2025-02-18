import { expect } from 'chai'
import Handlebars from 'handlebars'

describe('Handlebars', () => {
    let hbs = Handlebars

    it('Должен компилировать шаблон и возвращать верстку', () => {
        const template = '<div>{{sampleText}}</div>'
        const result = hbs.compile(template)({ sampleText: 'Пример текста' })
        expect(result).to.equal('<div>Пример текста</div>')
    })
})
