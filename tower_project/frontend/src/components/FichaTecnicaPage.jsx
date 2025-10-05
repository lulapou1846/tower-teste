import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FileText, Calculator, TrendingUp } from 'lucide-react'

const FichaTecnicaPage = ({ user }) => {
  const [selectedProduct, setSelectedProduct] = useState('')
  const [products, setProducts] = useState([])
  const [technicalData, setTechnicalData] = useState({
    productionCost: {
      impostos: { percentage: 0, value: 0 },
      pessoal: { percentage: 0, value: 0 },
      custosOperacionais: { percentage: 0, value: 0 },
      despesas: { percentage: 0, value: 0 },
      margemLucro: { percentage: 0, value: 0 }
    },
    packaging: {
      items: []
    },
    rawMaterials: {
      items: []
    },
    pricing: {
      precificado: { percentage: 100, value: 0 },
      aplicado: { percentage: 100, value: 0 }
    }
  })

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockProducts = [
      { id: 1, name: 'Produto A', code: '001' },
      { id: 2, name: 'Produto B', code: '002' },
      { id: 3, name: 'Produto C', code: '003' }
    ]
    setProducts(mockProducts)
  }, [])

  const costCategories = [
    { key: 'impostos', label: 'IMPOSTOS', color: 'red' },
    { key: 'pessoal', label: 'PESSOAL', color: 'blue' },
    { key: 'custosOperacionais', label: 'CUSTOS OPERACIONAIS', color: 'green' },
    { key: 'despesas', label: 'DESPESAS', color: 'yellow' },
    { key: 'margemLucro', label: 'MARGEM DE LUCRO', color: 'purple' }
  ]

  const handleCostChange = (category, field, value) => {
    setTechnicalData(prev => ({
      ...prev,
      productionCost: {
        ...prev.productionCost,
        [category]: {
          ...prev.productionCost[category],
          [field]: parseFloat(value) || 0
        }
      }
    }))
  }

  const calculateTotalCost = () => {
    return Object.values(technicalData.productionCost).reduce((total, item) => total + item.value, 0)
  }

  const getCostColor = (color) => {
    switch (color) {
      case 'red': return 'text-red-400 bg-red-900/20'
      case 'blue': return 'text-blue-400 bg-blue-900/20'
      case 'green': return 'text-green-400 bg-green-900/20'
      case 'yellow': return 'text-yellow-400 bg-yellow-900/20'
      case 'purple': return 'text-purple-400 bg-purple-900/20'
      default: return 'text-gray-400 bg-gray-900/20'
    }
  }

  return (
    <div className="flex min-h-screen tower-bg">
      <Sidebar user={user} />
      
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-400 mb-2">FICHA TÉCNICA DE DESEMPENHO DO PRODUTO</h1>
        </div>

        {/* Product Selection */}
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger className="tower-input">
                  <SelectValue placeholder="Nome do produto" />
                </SelectTrigger>
                <SelectContent>
                  {products.map(product => (
                    <SelectItem key={product.id} value={product.id.toString()}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Production Costs */}
          <div className="space-y-6">
            {/* Cost Categories */}
            <div className="tower-card rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-4">CUSTO DE PRODUÇÃO</h3>
              <div className="space-y-4">
                {costCategories.map((category) => (
                  <div key={category.key} className={`p-3 rounded-lg ${getCostColor(category.color)}`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{category.label}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00%"
                          value={technicalData.productionCost[category.key].percentage}
                          onChange={(e) => handleCostChange(category.key, 'percentage', e.target.value)}
                          className="tower-input text-xs"
                        />
                      </div>
                      <div>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={technicalData.productionCost[category.key].value}
                          onChange={(e) => handleCostChange(category.key, 'value', e.target.value)}
                          className="tower-input text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Packaging */}
            <div className="tower-card rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-4">EMBALAGEM</h3>
              <div className="overflow-x-auto">
                <table className="w-full tower-table text-xs">
                  <thead>
                    <tr>
                      <th className="text-left p-2 text-gray-300">QTD</th>
                      <th className="text-left p-2 text-gray-300">INSUMOS</th>
                      <th className="text-left p-2 text-gray-300">CUSTO</th>
                      <th className="text-left p-2 text-gray-300">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 text-white">0.00</td>
                      <td className="p-2 text-white">-</td>
                      <td className="p-2 text-white">0.00</td>
                      <td className="p-2 text-white">0.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-3 bg-gray-800 rounded">
                <div className="flex justify-between">
                  <span className="text-white font-medium">Custo da Matéria Prima</span>
                  <span className="text-white">0.00</span>
                </div>
              </div>
            </div>

            {/* Raw Materials */}
            <div className="tower-card rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-4">MATÉRIA PRIMA</h3>
              <div className="overflow-x-auto">
                <table className="w-full tower-table text-xs">
                  <thead>
                    <tr>
                      <th className="text-left p-2 text-gray-300">QTD</th>
                      <th className="text-left p-2 text-gray-300">INSUMOS</th>
                      <th className="text-left p-2 text-gray-300">CUSTO</th>
                      <th className="text-left p-2 text-gray-300">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 text-white">0.00</td>
                      <td className="p-2 text-white">-</td>
                      <td className="p-2 text-white">0.00</td>
                      <td className="p-2 text-white">0.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-3 bg-gray-800 rounded">
                <div className="flex justify-between">
                  <span className="text-white font-medium">Custo da Matéria Prima</span>
                  <span className="text-white">0.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Columns - Pricing Analysis */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {/* Pricing Cards */}
              {[
                { title: 'FATURAMENTO', value: 'R$ 0,00', color: 'green' },
                { title: 'PROMOCIONAL', value: 'R$ 0,00', color: 'yellow' },
                { title: 'PREÇO "C"', value: 'R$ 0,00', color: 'blue' },
                { title: 'PREÇO "V"', value: 'R$ 0,00', color: 'red' }
              ].map((card, index) => (
                <div key={index} className="tower-card rounded-lg p-4 text-center">
                  <h4 className="text-sm font-bold text-gray-300 mb-2">{card.title}</h4>
                  <p className={`text-lg font-bold ${getCostColor(card.color).split(' ')[0]}`}>
                    {card.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Cost Breakdown Table */}
            <div className="tower-card rounded-lg p-6 mb-6">
              <div className="overflow-x-auto">
                <table className="w-full tower-table text-sm">
                  <thead>
                    <tr>
                      <th className="text-left p-3 text-gray-300">ITEM</th>
                      <th className="text-center p-3 text-gray-300">CUSTO DE PRODUÇÃO</th>
                      <th className="text-center p-3 text-gray-300">IMPOSTOS</th>
                      <th className="text-center p-3 text-gray-300">PESSOAL</th>
                      <th className="text-center p-3 text-gray-300">CUSTOS OPERACIONAIS</th>
                      <th className="text-center p-3 text-gray-300">DESPESAS</th>
                      <th className="text-center p-3 text-gray-300">MARGEM DE LUCRO</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 text-white font-medium">FATURAMENTO</td>
                      <td className="p-3 text-white text-center">0.00%</td>
                      <td className="p-3 text-red-400 text-center">0.00%</td>
                      <td className="p-3 text-blue-400 text-center">0.00%</td>
                      <td className="p-3 text-green-400 text-center">0.00%</td>
                      <td className="p-3 text-yellow-400 text-center">0.00%</td>
                      <td className="p-3 text-purple-400 text-center">0.00%</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-white font-medium">PROMOCIONAL</td>
                      <td className="p-3 text-white text-center">0.00%</td>
                      <td className="p-3 text-red-400 text-center">0.00%</td>
                      <td className="p-3 text-blue-400 text-center">0.00%</td>
                      <td className="p-3 text-green-400 text-center">0.00%</td>
                      <td className="p-3 text-yellow-400 text-center">0.00%</td>
                      <td className="p-3 text-purple-400 text-center">0.00%</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-white font-medium">PREÇO "C"</td>
                      <td className="p-3 text-white text-center">0.00%</td>
                      <td className="p-3 text-red-400 text-center">0.00%</td>
                      <td className="p-3 text-blue-400 text-center">0.00%</td>
                      <td className="p-3 text-green-400 text-center">0.00%</td>
                      <td className="p-3 text-yellow-400 text-center">0.00%</td>
                      <td className="p-3 text-purple-400 text-center">0.00%</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-white font-medium">PREÇO "V"</td>
                      <td className="p-3 text-white text-center">0.00%</td>
                      <td className="p-3 text-red-400 text-center">0.00%</td>
                      <td className="p-3 text-blue-400 text-center">0.00%</td>
                      <td className="p-3 text-green-400 text-center">0.00%</td>
                      <td className="p-3 text-yellow-400 text-center">0.00%</td>
                      <td className="p-3 text-purple-400 text-center">0.00%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="tower-card rounded-lg p-6">
                <h3 className="text-lg font-bold text-blue-400 mb-4">PRECIFICADO</h3>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-400 mb-2">100%</p>
                  <p className="text-xl text-white">R$ 0,00</p>
                </div>
              </div>
              
              <div className="tower-card rounded-lg p-6">
                <h3 className="text-lg font-bold text-green-400 mb-4">APLICADO</h3>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-400 mb-2">100%</p>
                  <p className="text-xl text-white">R$ 0,00</p>
                </div>
              </div>
            </div>

            {/* Bottom Summary */}
            <div className="mt-6 tower-card rounded-lg p-6">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-400">FATURAMENTO</p>
                  <p className="text-lg font-bold text-green-400">R$ 0,00</p>
                  <p className="text-xs text-gray-500">0.0%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">MARGEM</p>
                  <p className="text-lg font-bold text-white">R$ 0,00</p>
                  <p className="text-xs text-gray-500">0.0%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">CUSTO</p>
                  <p className="text-lg font-bold text-white">R$ 0,00</p>
                  <p className="text-xs text-gray-500">0.0%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">LUCRO</p>
                  <p className="text-lg font-bold text-white">R$ 0,00</p>
                  <p className="text-xs text-gray-500">0.0%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FichaTecnicaPage
