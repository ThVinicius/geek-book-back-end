import agent from './supertestConfig'
import prisma from '../../src/database/db'

describe('Verifica o retorna da rota GET /categories', () => {
  it('verifica se retorna todas as categorias cadastradas', async () => {
    const categories = await prisma.category.findMany({
      select: { id: true, name: true }
    })

    const { status, body } = await agent.get('/categories')

    expect(status).toEqual(200)

    expect(categories).toEqual(body)
  })
})
