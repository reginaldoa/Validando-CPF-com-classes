//705.484.450-52   070.987.720-03 443.607.518-42

class CPF{
    constructor(cpfenviado){
        this.cpfenviado = cpfenviado;
        Object.defineProperty(this,'cpflimpo',{
            enumerable: true,
            configurable: false,
            writable: false,
            value: cpfenviado.replace(/\D+/g, '')
        })
    }

    gerarnovocpf(){
        const cpfsemdigito = this.cpflimpo.slice(0,-2)
        const digito1 = CPF.gerardigito(cpfsemdigito)
        const digito2 = CPF.gerardigito(cpfsemdigito + digito1)

        this.novocpf = cpfsemdigito + digito1 + digito2;
        return `Dig: ${digito1}. Dig: ${digito2}.  CPF completo: ${this.novocpf}`
    }

    static gerardigito(cpfsemdigito){
        let total = 0;
        let reverso = cpfsemdigito.length  + 1;

        for(let stringnumerica of cpfsemdigito){
            total += reverso * Number(stringnumerica)
            reverso--
        }

        const digito =  11-(total %11)
        return digito <= 9 ? digito : '0'
    }


    issequencia(){
        return this.cpflimpo.charAt(0).repeat(11) == this.cpflimpo;
    }

    validandocpf(){
        if(!this.cpflimpo) return false
        if(typeof this.cpflimpo !== 'string') return false
        if(this.issequencia()) return false
        this.gerarnovocpf()

        return this.novocpf === this.cpflimpo
    }
}


const cpf = new CPF('070.987.720-03')

if(cpf.validandocpf()){
    console.log("CPF válido.")
}else{
    console.log("CPF inválido.")
}