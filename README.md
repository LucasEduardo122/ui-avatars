# ui-avatars (NestJS + DDD)

> **Aviso importante**: Este repositório existe **exclusivamente para estudos** de NestJS e **conceitos de DDD (Domain‑Driven Design)**. **Não** é um produto final, nem pretende competir com serviços de avatar. O foco é praticar camadas, DTOs, validações e uma arquitetura organizada.

Este README explica o objetivo, como rodar o app, a rota disponível e exemplos de requisição.

---

## 🎯 Objetivo do projeto

* Treinar **NestJS** (controllers, providers, pipes, validation, etc.).
* Exercitar **DDD** em nível introdutório (camadas de domínio/aplicação/infra, DTOs, value objects, casos de uso).
* Expor uma rota simples para **gerar/retornar avatares** com base em parâmetros validados.

> A implementação pode variar (ex.: geração on‑the‑fly, cache, cores, tamanhos). O que importa aqui é a **estrutura** e a **disciplina de camadas**.

---

## 🧱 Arquitetura (visão rápida)

* **domain/**: contratos, entidades/value objects (ex.: `Nome`, `CorHex`).
* **application/**: casos de uso (ex.: `RetornarAvatarUseCase`).
* **infrastructure/**: adapters/serviços (ex.: serviço de imagem), controladores HTTP.
* **interfaces/**: DTOs, validadores, mapeadores.

*(Os nomes/pastas podem mudar conforme sua organização; o ponto é separar responsabilidades.)*

---

## 🔒 DTO de entrada

A rota usa o seguinte **DTO** (class‑validator):

```ts
export class RetornarAvatarDTO {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  nome: string

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(6)
  cor_conte: string

  @IsString()
  @IsOptional()
  tamanho_imagem: string

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(6)
  cor_imagem: string
}
```

**Observações:**

* `cor_conte` e `cor_imagem` devem ser **hex** sem `#` (ex.: `000000`, `FFFFFF`).
* `tamanho_imagem` é **opcional**. Sugestão de valores comuns: `64`, `128`, `256` (como string).
* `nome` precisa de **mínimo 3 caracteres**.

---

## 🚏 Rota disponível

* **Endpoint**: `GET /avatars/`
* **Parâmetros (query)**: `nome`, `cor_conte`, `cor_imagem`, `tamanho_imagem?`
* **Resposta**: imagem (ex.: `image/png`), ou redirecionamento/stream conforme sua implementação.

### Exemplos

**GET (curl):**

```bash
curl "http://localhost:3000/avatars?nome=Lux%20Silva&cor_conte=FFFFFF&cor_imagem=3B82F6&tamanho_imagem=256" -o avatar.png
```

**GET (navegador):**

```
http://localhost:3000/avatars?nome=Lux%20Silva&cor_conte=FFFFFF&cor_imagem=111827&tamanho_imagem=128
```

**Possível POST (se exposto por você)**

> Se preferir aceitar **JSON** no corpo (além de query), mapeie o DTO no controller.

```bash
curl -X POST http://localhost:3000/avatars \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Lux Silva",
    "cor_conte": "FFFFFF",
    "cor_imagem": "111827",
    "tamanho_imagem": "256"
  }' -o avatar.png
```

---

## ▶️ Como rodar o projeto (dev)

Certifique‑se de ter **Node.js LTS** (>= 18.x) e um gerenciador de pacotes.

### 1) Instalar dependências

Escolha **um** dos gestores abaixo:

**npm**

```bash
npm install
```

**pnpm**

```bash
pnpm install
```

**yarn**

```bash
yarn install
```

**bun**

```bash
bun install
```

### 2) Rodar em desenvolvimento

> O projeto expõe o script **`start:dev`** (Nest `--watch`).

**npm**

```bash
npm run start:dev
```

**pnpm**

```bash
pnpm start:dev
```

**yarn**

```bash
yarn start:dev
```

**bun**

```bash
bun run start:dev
```

Com o servidor no ar, acesse:

```
http://localhost:3000/avatars?nome=Lux&cor_conte=FFFFFF&cor_imagem=111827&tamanho_imagem=128
```

---

## 🚀 Build & produção (opcional)

**Compilar:**

```bash
# npm
npm run build
# pnpm
yarn build
# yarn
yarn build
# bun
bun run build
```

**Start em produção (após build):**

```bash
# npm
npm run start:prod
# pnpm
pnpm start:prod
# yarn
yarn start:prod
# bun
bun run start:prod
```

> Em produção, configure variáveis de ambiente (ex.: porta, flags de cache), se sua implementação exigir.

---

## 🧪 Validação & erros comuns

* **400 Bad Request** se `nome` tiver < 3 chars.
* **400 Bad Request** se `cor_conte`/`cor_imagem` não tiverem entre **3 e 6** chars hexadecimais.
* **Dica**: crie **Value Objects** (`CorHex`, `Nome`) para encapsular validações e manter o domínio limpo.

---

## 📚 DDD — o que observar

* **Casos de uso** desacoplados do framework (chamados pelo controller).
* **DTOs** apenas na borda (HTTP). Dentro do domínio, converta para **value objects**/entidades.
* **Serviços de infra** (ex.: desenhar avatar, cache, storage) injetados por **interfaces**.

> O propósito não é “perfeição”, e sim **praticar a mentalidade** DDD com NestJS.

---

## 📝 Licença & propósito

* **Licença**: defina conforme sua preferência (ex.: MIT) — a intenção é **estudo**.
* **Uso comercial**: não recomendado neste estágio.

---

## 💜 Créditos

Feito para estudos por **Lucas Eduardo.**
