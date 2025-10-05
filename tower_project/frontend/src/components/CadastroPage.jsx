import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Search, Edit, Trash2, Package, Layers } from 'lucide-react'

const CadastroPage = ({ user }) => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(null)
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    type: '',
    category_id: '',
    unit_of_measurement: '',
    quantity_packaging: '',
    cost_packaging: '',
    unit_cost: ''
  })

  const stats = {
    totalItems: products.length,
    produtos: products.filter(p => p.type === 'Produto').length,
    insumos: products.filter(p => p.type === 'Insumo').length,
    categorias: categories.length
  }

  useEffect(() => {
    if (user) {
      fetchProducts()
    }
  }, [user])

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:5000/products/${user.id}`)
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const productData = {
        ...formData,
        user_id: user.id,
        code: parseInt(formData.code)
      }

      if (formData.type === 'Insumo') {
        productData.quantity_packaging = parseFloat(formData.quantity_packaging)
        productData.cost_packaging = parseFloat(formData.cost_packaging)
      }

      const response = await fetch('http://localhost:5000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })

      if (response.ok) {
        fetchProducts()
        setIsModalOpen(false)
        resetForm()
        alert('Produto adicionado com sucesso!')
      }
    } catch (error) {
      alert('Erro ao adicionar produto')
    }
  }

  const resetForm = () => {
    setFormData({
      code: '',
      description: '',
      type: '',
      category_id: '',
      unit_of_measurement: '',
      quantity_packaging: '',
      cost_packaging: '',
      unit_cost: ''
    })
    setCurrentProduct(null)
  }

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value })
  }

  const filteredProducts = products.filter(product =>
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.code.toString().includes(searchTerm)
  )

  // Group products by code ranges
  const groupProductsByRange = (products) => {
    const ranges = {}
    products.forEach(product => {
      const code = product.code
      let rangeKey
      if (code >= 1 && code <= 999) rangeKey = '1 - 999'
      else if (code >= 1000 && code <= 1999) rangeKey = '1000 - 1999'
      else if (code >= 2000 && code <= 2999) rangeKey = '2000 - 2999'
      else if (code >= 3000 && code <= 3999) rangeKey = '3000 - 3999'
      else if (code >= 4000 && code <= 4999) rangeKey = '4000 - 4999'
      else rangeKey = '5000+'

      if (!ranges[rangeKey]) ranges[rangeKey] = []
      ranges[rangeKey].push(product)
    })
    return ranges
  }

  const productRanges = groupProductsByRange(filteredProducts)

  return (
    <div className="flex min-h-screen tower-bg">
      <Sidebar user={user} />
      
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">CADASTRAMENTO</h1>
            <p className="text-gray-400">Gerenciamento de Cadastros de produtos e insumos</p>
          </div>
          
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="tower-button">
                <Plus className="h-4 w-4 mr-2" />
                + Novo Item
              </Button>
            </DialogTrigger>
            <DialogContent className="tower-modal max-w-md">
              <DialogHeader>
                <DialogTitle className="text-white">Adicionar Novo Item</DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tipo *
                  </label>
                  <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
                    <SelectTrigger className="tower-input">
                      <SelectValue placeholder="Selecione um tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Produto">Produto</SelectItem>
                      <SelectItem value="Insumo">Insumo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Categoria *
                  </label>
                  <Select value={formData.category_id} onValueChange={(value) => handleChange('category_id', value)}>
                    <SelectTrigger className="tower-input">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Categoria 1</SelectItem>
                      <SelectItem value="2">Categoria 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Descrição *
                  </label>
                  <Input
                    placeholder="Digite a descrição do item"
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="tower-input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Unidade de Medida *
                  </label>
                  <Select value={formData.unit_of_measurement} onValueChange={(value) => handleChange('unit_of_measurement', value)}>
                    <SelectTrigger className="tower-input">
                      <SelectValue placeholder="Selecione uma unidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UN">UN</SelectItem>
                      <SelectItem value="KG">KG</SelectItem>
                      <SelectItem value="L">L</SelectItem>
                      <SelectItem value="M">M</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.type === 'Insumo' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Qtd da Embalagem *
                        </label>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={formData.quantity_packaging}
                          onChange={(e) => handleChange('quantity_packaging', e.target.value)}
                          className="tower-input"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Custo da Embalagem (R$) *
                        </label>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={formData.cost_packaging}
                          onChange={(e) => handleChange('cost_packaging', e.target.value)}
                          className="tower-input"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Custo da Unidade de Medida (R$)
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="R$ 0.00"
                        value={formData.unit_cost}
                        className="tower-input"
                        disabled
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Calculado automaticamente: Custo da Embalagem ÷ Quantidade da Embalagem
                      </p>
                    </div>
                  </>
                )}

                <div className="flex justify-end space-x-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" className="tower-button">
                    <Package className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Buscar por código, descrição, tipo ou categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="tower-input pl-10"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="tower-card rounded-lg p-6 text-center">
            <Package className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-white">{stats.totalItems}</h3>
            <p className="text-gray-400 text-sm">Total de Itens</p>
            <p className="text-xs text-gray-500">Todos os itens cadastrados</p>
          </div>
          
          <div className="tower-card rounded-lg p-6 text-center">
            <Package className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-white">{stats.produtos}</h3>
            <p className="text-gray-400 text-sm">Produtos</p>
            <p className="text-xs text-gray-500">Produtos</p>
          </div>
          
          <div className="tower-card rounded-lg p-6 text-center">
            <Package className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-white">{stats.insumos}</h3>
            <p className="text-gray-400 text-sm">Insumos</p>
            <p className="text-xs text-gray-500">Matérias-primas</p>
          </div>
          
          <div className="tower-card rounded-lg p-6 text-center">
            <Layers className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-white">{stats.categorias}</h3>
            <p className="text-gray-400 text-sm">Categorias</p>
            <p className="text-xs text-gray-500">Grupos de classificação</p>
          </div>
        </div>

        {/* Products Table */}
        <div className="tower-card rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            <Package className="inline h-5 w-5 mr-2" />
            Itens Cadastrados
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full tower-table">
              <thead>
                <tr>
                  <th className="text-left p-3 text-gray-300">Código</th>
                  <th className="text-left p-3 text-gray-300">Descrição</th>
                  <th className="text-left p-3 text-gray-300">Tipo</th>
                  <th className="text-left p-3 text-gray-300">Categoria</th>
                  <th className="text-left p-3 text-gray-300">Unidade</th>
                  <th className="text-left p-3 text-gray-300">Qtd Embalagem</th>
                  <th className="text-left p-3 text-gray-300">Custo da Embalagem</th>
                  <th className="text-left p-3 text-gray-300">Custo Unitário</th>
                  <th className="text-left p-3 text-gray-300">Ações</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(productRanges).map(([range, rangeProducts]) => (
                  <>
                    <tr key={range} className="bg-gray-800">
                      <td colSpan="9" className="p-3 font-bold text-blue-400">
                        Faixa: {range}
                      </td>
                    </tr>
                    {rangeProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-700">
                        <td className="p-3 text-white">{product.code}</td>
                        <td className="p-3 text-white">{product.description}</td>
                        <td className="p-3 text-white">{product.type}</td>
                        <td className="p-3 text-white">Categoria</td>
                        <td className="p-3 text-white">{product.unit_of_measurement}</td>
                        <td className="p-3 text-white">
                          {product.quantity_packaging || '-'}
                        </td>
                        <td className="p-3 text-white">
                          {product.cost_packaging ? `R$ ${product.cost_packaging.toFixed(2)}` : '-'}
                        </td>
                        <td className="p-3 text-white">
                          {product.unit_cost ? `R$ ${product.unit_cost.toFixed(2)}` : '-'}
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-600">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CadastroPage
