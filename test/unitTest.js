const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const assert = chai.assert;
const expect = chai.expect;

chai.use(sinonChai);

const Pokemon = require("../unit/class/pokemon.js");
const PokemonList = require("../unit/class/pokemonList.js");

describe('Тестирование класса Pokemon', () => {

    describe('Тестирование функции show()', () => {
        let pokemon;

        before(() => {
            pokemon = new Pokemon("Пикачу", 3);
            sinon.spy(console, 'log');
        });

        after(() => {
            console.log.restore();
        });

        it('console.log должен быть вызван единожды', () => {
            pokemon.show();
            assert.equal(console.log.calledOnce, true);
            assert.equal(console.log.calledWith('Покемон - Пикачу, уровень - 3'), true);
        });

    });
});

describe('Тестирование класса PokemonList', () => {

    let pokemonList;

    const addFirst = (list) => {
        list.add("Сквиртл", 1);
    }

    const addNext = (list) => {
        list.add("Вартортл", 2);
        list.add("Бластойз", 3);
    }

    const addAll = (list) => {
        addFirst(list);
        addNext(list);
    }

    describe('Тестирование функции add()', () => {

        before(() => {
            pokemonList = new PokemonList();
        });

        it('Добавление Сквиртла в пустой список', () => {
            addFirst(pokemonList);
            assert.deepEqual(pokemonList, [{name: "Сквиртл", level: 1}])
            assert.equal(pokemonList.length, 1);
        });

        it('Добавление Вартортла и Бластойза в существующий список', () => {
            addNext(pokemonList);
            assert.deepEqual(pokemonList, [
                {name: "Сквиртл", level: 1},
                {name: "Вартортл", level: 2},
                {name: "Бластойз", level: 3}
            ]);
            assert.equal(pokemonList.length, 3);
        });

    });

    describe('Тестирование функции show()', () => {

        before(() => {
            pokemonList = new PokemonList();
            addAll(pokemonList);
            sinon.spy(console, 'log');
        });

        after(() => {
            console.log.restore();
        });

        it('Вывод пустого списка покемонов', () => {
            new PokemonList().show();
            assert.equal(console.log.calledWith('Всего покемонов - 0'), true);
        });

        it('Вывод списка 3 покемонов', () => {
            pokemonList.show();
            assert.equal(console.log.calledWith('Всего покемонов - 3'), true);
            assert.equal(console.log.calledWith('Покемон - Сквиртл, уровень - 1'), true);
            assert.equal(console.log.calledWith('Покемон - Вартортл, уровень - 2'), true);
            assert.equal(console.log.calledWith('Покемон - Бластойз, уровень - 3'), true);
        });

    });

    describe('Тестирование функции max()', () => {

        before(() => {
            pokemonList = new PokemonList();
            addAll(pokemonList);
        });

        it('Должен вернуть покемона максимального уровня из списка', () => {
            let pokemonMax = pokemonList.max();
            assert.deepEqual(pokemonMax, {name: "Бластойз", level: 3})
        });

        it('undefined если список покемонов пуст', () => {
            let pokemonMax = new PokemonList().max();
            assert.equal(pokemonMax, undefined)
        });
    });

});