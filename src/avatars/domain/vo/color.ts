export class ColorAvatarVO {
  private color: string

  constructor(color: string) {
    this.color = color.startsWith("#") ? color.slice(1) : color // remove o #
    this.verificar()
  }

  get value() {
    return `#${this.color}`
  }

  private verificar() {
    const regex = /^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/
    if (!regex.test(this.color)) {
      throw new Error(`Cor inválida: "${this.color}". Use formatos como "fff" ou "ffffff"`)
    }
  }
}
