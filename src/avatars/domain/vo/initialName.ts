export class InitialNameVO {
    private nome: string

    constructor(nome: string) {
        this.nome = nome;
        this.iniciais()
    }

    get value() {
        return this.nome
    }

    private iniciais() {
        try {
            const parts = this.nome.trim().split(' ')
            const iniciais = parts.length === 1
                ? parts[0][0].toUpperCase()
                : parts[0][0].toUpperCase() + parts[1][0].toUpperCase()

            return this.nome = iniciais
        } catch (error) {
            throw new Error(`Iniciais inválida: "${this.nome}"."`)
        }
    }
}