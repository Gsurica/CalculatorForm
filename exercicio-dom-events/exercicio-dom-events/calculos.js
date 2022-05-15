/* Desenvolva aqui a rotina */

"use strict"

const valorBase = document.getElementById("valor_base")
const valorTransporte = document.getElementById("valor_transporte")
const valorAlimentacao = document.getElementById("valor_alimentacao")
const valorReceita = document.getElementById("valor_receita")
const valorAutomovel = document.getElementById("valor_automovel")
const faltas = document.getElementById("faltas")
const descontosTotal = document.getElementById("valor_descontos")
const valorTotal = document.getElementById("valor_total")

const createObjectNumber = (vb, vt, va, vr, vau, fa, dt, vtl) => {
    return {
        vb: vb,
        vt: vt,
        va: va,
        vr: vr,
        vau: vau,
        fa: fa,
        dt: dt,
        vtl: vtl
    }
}

const setObjectNumber = () => createObjectNumber(valorBase.value, valorTransporte.value, valorAlimentacao.value,
                                                valorReceita.value, valorAutomovel.value, faltas.value, descontosTotal.value,
                                                valorTotal.value)

const saveOnLocalStorage = (numbers) => {
    const dbNumber = new Array()
    dbNumber.push(numbers)
    localStorage.setItem("numbers", JSON.stringify(dbNumber))
}

const readNumberObject = () => JSON.parse(localStorage.getItem("numbers"))

const sumNumberObject = () => {

    const numbersDB = readNumberObject()
    const firstSumOfNumbers = numbersDB.map(n => {
        const firstNumber = Number(n.vb)
        const secondNumber = Number(n.vt)
        const thirdNumber = Number(n.va) 

        return (firstNumber + secondNumber + thirdNumber)
    })

    firstSumOfNumbers.forEach(element => valorReceita.value = element)

    const secondSumOfNumbers = numbersDB.map(n => {
        const firstNumber = Number(n.vau)
        const secondNumber = Number(n.fa)

        return (firstNumber + secondNumber)
    })

    secondSumOfNumbers.forEach(element => descontosTotal.value = element)

    const totalCalc = numbersDB.map(n => {
        const firstCalc = Number(n.vr)
        const secondCalc = Number(n.dt)

        return (firstCalc - secondCalc)
    })

    totalCalc.forEach(element => valorTotal.value = element)

}

const loadNumbers = () => {
    const numbersDB = readNumberObject()
    numbersDB.forEach(n => {
        const a = n.vb
        const b = n.vt
        const c = n.va
        const d = n.vr 
        const e = n.vau 
        const f = n.fa 
        const g = n.dt 
        const h = n.vtl

        valorBase.value = a
        valorTransporte.value = b
        valorAlimentacao.value = c
        valorReceita.value = d
        valorAutomovel.value = e
        faltas.value = f
        descontosTotal.value = g
        valorTotal.value = h

    })
}

loadNumbers()

const button = document.getElementById("btn__calcular")

button.addEventListener("click", () => {
    saveOnLocalStorage(setObjectNumber())
    sumNumberObject()
})

window.addEventListener("blur", () => {
    saveOnLocalStorage(setObjectNumber())
    sumNumberObject()
})
